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

async function reverseGeocode(coordString: string): Promise<string> {
  // Check cache first
  if (addressCache.has(coordString)) {
    return addressCache.get(coordString)!;
  }

  try {
    // Parse coordinate string (format: "geo:lat,lon")
    const latLngMatch = coordString.match(/geo:(-?\d+\.?\d*),(-?\d+\.?\d*)/);
    if (!latLngMatch) {
      console.warn('Could not parse coordinate:', coordString);
      return formatCoordinate(coordString);
    }

    const [, lat, lon] = latLngMatch;
    
    // Add delay to respect rate limits (1 req/sec)
    await new Promise(resolve => setTimeout(resolve, 1100));
    
    // Use a CORS proxy to access Nominatim
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), 10000);
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}&zoom=18&addressdetails=1`,
      {
        headers: {
          'Accept': 'application/json',
        },
        signal: controller.signal,
      }
    );
    
    clearTimeout(timeoutId);

    if (!response.ok) {
      console.warn('Geocoding API error:', response.status);
      const fallback = formatCoordinate(coordString);
      addressCache.set(coordString, fallback);
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
    
    // Cache the result
    addressCache.set(coordString, address);
    
    return address;
  } catch (error) {
    if (error instanceof Error && error.name === 'AbortError') {
      console.warn('Geocoding timeout for:', coordString);
    } else {
      console.error('Geocoding error:', error);
    }
    const fallback = formatCoordinate(coordString);
    addressCache.set(coordString, fallback);
    return fallback;
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
  
  // Second pass: geocode addresses (async)
  console.log('Starting geocoding...');
  const totalAddresses = trips.length * 2; // start + end for each trip
  let processedAddresses = 0;
  
  for (const trip of trips) {
    trip.startAddress = await reverseGeocode(trip.startCoord);
    processedAddresses++;
    if (onProgress) onProgress(processedAddresses, totalAddresses);
    
    trip.endAddress = await reverseGeocode(trip.endCoord);
    processedAddresses++;
    if (onProgress) onProgress(processedAddresses, totalAddresses);
  }
  
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
