import { GoogleTimelineActivity, NormalizedTrip, MonthlySummary, TripPurpose } from "@/types/trip";

const METERS_TO_MILES = 1609.34;

export interface GeocodingStats {
  totalAddresses: number;
  uniqueAddresses: number;
  freshApiCalls: number;
  memoryCacheHits: number;
  browserCacheHits: number;
  errors: number;
}

// Keywords that indicate vehicle/driving activity
const VEHICLE_KEYWORDS = [
  "vehicle",
  "car",
  "passenger vehicle",
  "driving",
  "automobile",
];

// Cache for geocoded addresses to avoid duplicate API calls
const addressCache = new Map<string, string>();

// Track geocoding statistics
let geocodingStats: GeocodingStats = {
  totalAddresses: 0,
  uniqueAddresses: 0,
  freshApiCalls: 0,
  memoryCacheHits: 0,
  browserCacheHits: 0,
  errors: 0,
};

export function getGeocodingStats(): GeocodingStats {
  return { ...geocodingStats };
}

export function resetGeocodingStats(): void {
  geocodingStats = {
    totalAddresses: 0,
    uniqueAddresses: 0,
    freshApiCalls: 0,
    memoryCacheHits: 0,
    browserCacheHits: 0,
    errors: 0,
  };
}

// Round coordinates to 3 decimal places for better cache hits (~100m precision)
function normalizeCoordString(coordString: string): string {
  const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (!latLngMatch) return coordString;
  const lat = parseFloat(latLngMatch[1]).toFixed(3);
  const lon = parseFloat(latLngMatch[2]).toFixed(3);
  return `geo:${lat},${lon}`;
}

async function reverseGeocode(coordString: string, trackStats: boolean = true): Promise<{ address: string; source: 'memory' | 'browser' | 'api' | 'fallback' }> {
  // Normalize coordinate for better cache hits
  const normalizedCoord = normalizeCoordString(coordString);
  
  // Check memory cache first (using normalized coordinates)
  if (addressCache.has(normalizedCoord)) {
    if (trackStats) geocodingStats.memoryCacheHits++;
    return { address: addressCache.get(normalizedCoord)!, source: 'memory' };
  }
  
  try {
    // Parse coordinate string (format: "geo:lat,lon")
    const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (!latLngMatch) {
      console.warn('Could not parse coordinate:', coordString);
      if (trackStats) geocodingStats.errors++;
      return { address: formatCoordinate(coordString), source: 'fallback' };
    }

    const [, lat, lon] = latLngMatch;
    
    // Get LocationIQ API key from environment
    const apiKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
    if (!apiKey) {
      console.warn('LocationIQ API key not configured, using coordinate fallback');
      const fallback = formatCoordinate(coordString);
      addressCache.set(normalizedCoord, fallback);
      if (trackStats) geocodingStats.errors++;
      return { address: fallback, source: 'fallback' };
    }
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
    
    const startTime = performance.now();
    
    // Use LocationIQ API (supports CORS, 2 req/sec on free tier)
    const response = await fetch(
      `https://us1.locationiq.com/v1/reverse?key=${apiKey}&lat=${lat}&lon=${lon}&format=json`,
      {
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);
    
    const elapsed = performance.now() - startTime;
    // If response is very fast (<50ms), it's likely from browser cache
    const isBrowserCache = elapsed < 50;

    if (!response.ok) {
      console.warn('LocationIQ API error:', response.status);
      const fallback = formatCoordinate(coordString);
      addressCache.set(normalizedCoord, fallback);
      if (trackStats) geocodingStats.errors++;
      return { address: fallback, source: 'fallback' };
    }

    const data = await response.json();
    
    // Build a shorter, more readable address
    let address = '';
    if (data.address) {
      const parts = [];
      if (data.address.house_number && data.address.road) {
        parts.push(`${data.address.house_number} ${data.address.road}`);
      } else if (data.address.road) {
        parts.push(data.address.road);
      }
      if (data.address.city || data.address.town || data.address.village) {
        parts.push(data.address.city || data.address.town || data.address.village);
      }
      if (data.address.state) {
        parts.push(data.address.state);
      }
      address = parts.join(', ');
    }
    
    if (!address && data.display_name) {
      address = data.display_name.split(',').slice(0, 3).join(',').trim();
    }
    
    if (!address) {
      address = formatCoordinate(coordString);
    }
    
    // Cache the result using normalized coordinates
    addressCache.set(normalizedCoord, address);
    
    if (trackStats) {
      if (isBrowserCache) {
        geocodingStats.browserCacheHits++;
      } else {
        geocodingStats.freshApiCalls++;
      }
    }
    
    return { address, source: isBrowserCache ? 'browser' : 'api' };
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Geocoding timeout for:', coordString);
    } else {
      console.error('Geocoding error:', error);
    }
    const fallback = formatCoordinate(coordString);
    addressCache.set(normalizedCoord, fallback);
    if (trackStats) geocodingStats.errors++;
    return { address: fallback, source: 'fallback' };
  }
}

// Format coordinate string in a more readable way
function formatCoordinate(coordString: string): string {
  const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (latLngMatch) {
    const lat = parseFloat(latLngMatch[1]).toFixed(4);
    const lon = parseFloat(latLngMatch[2]).toFixed(4);
    return `${lat}, ${lon}`;
  }
  return coordString;
}

function isDrivingActivity(activity: GoogleTimelineActivity): boolean {
  if (!activity.activity?.topCandidate?.type) return false;
  
  const activityType = activity.activity.topCandidate.type.toLowerCase();
  return VEHICLE_KEYWORDS.some(keyword => activityType.includes(keyword));
}

function parseDateTime(isoString: string): { date: string; time: string } {
  const dateObj = new Date(isoString);
  const date = dateObj.toISOString().split('T')[0]; // YYYY-MM-DD
  const time = dateObj.toLocaleTimeString('en-US', { 
    hour: '2-digit', 
    minute: '2-digit',
    hour12: true 
  });
  return { date, time };
}

function calculateDuration(start: string, end: string): number {
  const startTime = new Date(start).getTime();
  const endTime = new Date(end).getTime();
  return Math.round((endTime - startTime) / (1000 * 60)); // minutes
}

export async function parseGoogleTimeline(
  jsonData: GoogleTimelineActivity[],
  defaultPurpose: TripPurpose = "Unassigned",
  onProgress?: (current: number, total: number) => void
): Promise<NormalizedTrip[]> {
  const trips: NormalizedTrip[] = [];
  
  // Reset stats for this parsing session
  resetGeocodingStats();
  
  console.log('Parsing timeline data, total items:', jsonData.length);
  
  // First pass: create trips with coordinates
  jsonData.forEach((item, index) => {
    if (isDrivingActivity(item) && item.activity) {
      const { date, time: startTime } = parseDateTime(item.startTime);
      const { time: endTime } = parseDateTime(item.endTime);
      
      const distanceMeters = parseFloat(item.activity.distanceMeters);
      const distanceMiles = Math.round((distanceMeters / METERS_TO_MILES) * 100) / 100;
      
      const durationMinutes = calculateDuration(item.startTime, item.endTime);
      
      trips.push({
        id: `trip-${index}-${Date.now()}`,
        date,
        startTimeLocal: startTime,
        endTimeLocal: endTime,
        durationMinutes,
        distanceMiles,
        startCoord: item.activity.start,
        endCoord: item.activity.end,
        startAddress: "Loading...",
        endAddress: "Loading...",
        purpose: defaultPurpose,
        notes: "",
      });
    }
  });
  
  console.log('Found driving trips:', trips.length);
  
  // Sort by date (newest first)
  trips.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Second pass: geocode addresses sequentially
  console.log('Starting geocoding...');
  
  // Collect all coordinates
  const allCoords = trips.flatMap(trip => [trip.startCoord, trip.endCoord]);
  geocodingStats.totalAddresses = allCoords.length;
  
  // Deduplicate and get unique coords
  const uniqueCoords = [...new Set(allCoords.map(c => normalizeCoordString(c)))];
  geocodingStats.uniqueAddresses = uniqueCoords.length;
  
  // Check which coords are already in memory cache
  const uncachedCoords = uniqueCoords.filter(c => !addressCache.has(c));
  const memoryCacheCount = uniqueCoords.length - uncachedCoords.length;
  geocodingStats.memoryCacheHits = memoryCacheCount;
  
  console.log(`Unique: ${uniqueCoords.length}, Memory cached: ${memoryCacheCount}, Need to fetch: ${uncachedCoords.length}`);
  
  // Process sequentially with progress updates
  for (let i = 0; i < uncachedCoords.length; i++) {
    const coord = uncachedCoords[i];
    
    // Add delay between requests (respect LocationIQ rate limit: 2 req/sec)
    if (i > 0) {
      await new Promise(resolve => setTimeout(resolve, 550));
    }
    
    const originalCoord = allCoords.find(c => normalizeCoordString(c) === coord) || coord;
    await reverseGeocode(originalCoord, true);
    
    // Update progress
    const processedCount = memoryCacheCount + i + 1;
    if (onProgress) onProgress(processedCount, uniqueCoords.length);
  }
  
  // Apply cached addresses to trips
  trips.forEach(trip => {
    const startNorm = normalizeCoordString(trip.startCoord);
    const endNorm = normalizeCoordString(trip.endCoord);
    trip.startAddress = addressCache.get(startNorm) || formatCoordinate(trip.startCoord);
    trip.endAddress = addressCache.get(endNorm) || formatCoordinate(trip.endCoord);
  });
  
  console.log('Geocoding complete, stats:', geocodingStats);
  return trips;
}

export function calculateMonthlySummaries(trips: NormalizedTrip[]): MonthlySummary[] {
  const summaryMap = new Map<string, MonthlySummary>();
  
  trips.forEach(trip => {
    const month = trip.date.substring(0, 7); // YYYY-MM
    
    if (!summaryMap.has(month)) {
      summaryMap.set(month, {
        month,
        businessMiles: 0,
        personalMiles: 0,
        medicalMiles: 0,
        charitableMiles: 0,
        otherMiles: 0,
        totalMiles: 0,
      });
    }
    
    const summary = summaryMap.get(month)!;
    summary.totalMiles += trip.distanceMiles;
    
    switch (trip.purpose) {
      case "Business":
        summary.businessMiles += trip.distanceMiles;
        break;
      case "Personal":
        summary.personalMiles += trip.distanceMiles;
        break;
      case "Medical":
        summary.medicalMiles += trip.distanceMiles;
        break;
      case "Charitable":
        summary.charitableMiles += trip.distanceMiles;
        break;
      case "Other":
        summary.otherMiles += trip.distanceMiles;
        break;
    }
  });
  
  // Convert to array and sort by month (newest first)
  return Array.from(summaryMap.values()).sort((a, b) => b.month.localeCompare(a.month));
}
