import { GoogleTimelineActivity, NormalizedTrip, MonthlySummary, TripPurpose } from "@/types/trip";

const METERS_TO_MILES = 1609.34;

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

// Round coordinates to 3 decimal places for better cache hits (~100m precision)
function normalizeCoordString(coordString: string): string {
  const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
  if (!latLngMatch) return coordString;
  const lat = parseFloat(latLngMatch[1]).toFixed(3);
  const lon = parseFloat(latLngMatch[2]).toFixed(3);
  return `geo:${lat},${lon}`;
}

async function reverseGeocode(coordString: string): Promise<string> {
  // Normalize coordinate for better cache hits
  const normalizedCoord = normalizeCoordString(coordString);
  
  // Check cache first (using normalized coordinates)
  if (addressCache.has(normalizedCoord)) {
    return addressCache.get(normalizedCoord)!;
  }

  const locationIQKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  
  try {
    // Parse coordinate string (format: "geo:lat,lon")
    const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (!latLngMatch) {
      console.warn('Could not parse coordinate:', coordString);
      return formatCoordinate(coordString);
    }

    const [, lat, lon] = latLngMatch;
    
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 5000);
    
    // Use LocationIQ API if key available, otherwise Nominatim
    const apiUrl = locationIQKey 
      ? `https://us1.locationiq.com/v1/reverse?key=${locationIQKey}&lat=${lat}&lon=${lon}&format=json&addressdetails=1`
      : `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`;
    
    const response = await fetch(apiUrl, {
      headers: {
        'Accept': 'application/json',
      },
      signal: controller.signal,
    });
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Geocoding API error:', response.status);
      const fallback = formatCoordinate(coordString);
      addressCache.set(normalizedCoord, fallback);
      return fallback;
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
      // Use first 3 parts of display_name for shorter address
      address = data.display_name.split(',').slice(0, 3).join(',').trim();
    }
    
    if (!address) {
      address = formatCoordinate(coordString);
    }
    
    // Cache the result using normalized coordinates
    addressCache.set(normalizedCoord, address);
    
    return address;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Geocoding timeout for:', coordString);
    } else {
      console.error('Geocoding error:', error);
    }
    const fallback = formatCoordinate(coordString);
    addressCache.set(normalizedCoord, fallback);
    return fallback;
  }
}

// Batch geocode with concurrency control
async function batchGeocode(coords: string[], concurrency: number = 3): Promise<Map<string, string>> {
  const results = new Map<string, string>();
  const locationIQKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  
  // Log once whether we're using LocationIQ or Nominatim
  console.log(`Geocoding using: ${locationIQKey ? 'LocationIQ' : 'Nominatim (fallback)'}`);
  
  // Deduplicate coordinates
  const uniqueCoords = [...new Set(coords.map(c => normalizeCoordString(c)))];
  const uncachedCoords = uniqueCoords.filter(c => !addressCache.has(c));
  
  console.log(`Unique coordinates: ${uniqueCoords.length}, Uncached: ${uncachedCoords.length}`);
  
  // Process in batches
  for (let i = 0; i < uncachedCoords.length; i += concurrency) {
    const batch = uncachedCoords.slice(i, i + concurrency);
    
    // Add delay between batches (respect rate limits)
    if (i > 0) {
      const delay = locationIQKey ? 600 : 1100; // LocationIQ: 2/sec, Nominatim: 1/sec
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Process batch concurrently
    await Promise.all(batch.map(async (coord) => {
      // Find original coord string that normalizes to this
      const originalCoord = coords.find(c => normalizeCoordString(c) === coord) || coord;
      const address = await reverseGeocode(originalCoord);
      results.set(coord, address);
    }));
  }
  
  // Add cached results
  uniqueCoords.forEach(coord => {
    if (addressCache.has(coord)) {
      results.set(coord, addressCache.get(coord)!);
    }
  });
  
  return results;
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
  
  // Second pass: batch geocode addresses (much faster with parallel processing)
  console.log('Starting batch geocoding...');
  
  // Collect all coordinates
  const allCoords = trips.flatMap(trip => [trip.startCoord, trip.endCoord]);
  const totalAddresses = allCoords.length;
  
  // Use batch geocoding with concurrency
  let processedCount = 0;
  const locationIQKey = import.meta.env.VITE_LOCATIONIQ_API_KEY;
  const concurrency = locationIQKey ? 2 : 1; // LocationIQ can handle more concurrent requests
  
  // Deduplicate and get unique coords
  const uniqueCoords = [...new Set(allCoords.map(c => normalizeCoordString(c)))];
  const uncachedCoords = uniqueCoords.filter(c => !addressCache.has(c));
  
  // Process in batches with progress updates
  for (let i = 0; i < uncachedCoords.length; i += concurrency) {
    const batch = uncachedCoords.slice(i, i + concurrency);
    
    // Add delay between batches
    if (i > 0) {
      const delay = locationIQKey ? 600 : 1100;
      await new Promise(resolve => setTimeout(resolve, delay));
    }
    
    // Process batch concurrently
    await Promise.all(batch.map(async (coord) => {
      const originalCoord = allCoords.find(c => normalizeCoordString(c) === coord) || coord;
      await reverseGeocode(originalCoord);
      processedCount += 2; // Each unique coord typically appears twice (start/end)
      if (onProgress) onProgress(Math.min(processedCount, totalAddresses), totalAddresses);
    }));
  }
  
  // Apply cached addresses to trips
  trips.forEach(trip => {
    const startNorm = normalizeCoordString(trip.startCoord);
    const endNorm = normalizeCoordString(trip.endCoord);
    trip.startAddress = addressCache.get(startNorm) || formatCoordinate(trip.startCoord);
    trip.endAddress = addressCache.get(endNorm) || formatCoordinate(trip.endCoord);
  });
  
  console.log('Geocoding complete, returning trips');
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
