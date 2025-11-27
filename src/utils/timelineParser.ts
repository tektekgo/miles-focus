import { GoogleTimelineActivity, NormalizedTrip, MonthlySummary } from "@/types/trip";

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
    // Parse coordinate string (format may vary, handle common formats)
    const latLngMatch = coordString.match(/(-?\d+\.?\d*)[,\s]+(-?\d+\.?\d*)/);
    if (!latLngMatch) {
      return coordString; // Return original if can't parse
    }

    const [, lat, lon] = latLngMatch;
    
    // Add delay to respect rate limits (1 req/sec)
    await new Promise(resolve => setTimeout(resolve, 1000));
    
    const response = await fetch(
      `https://nominatim.openstreetmap.org/reverse?format=json&lat=${lat}&lon=${lon}`,
      {
        headers: {
          'User-Agent': 'MilesFocus/1.0 (AI-Focus Technologies)'
        }
      }
    );

    if (!response.ok) {
      return coordString;
    }

    const data = await response.json();
    const address = data.display_name || coordString;
    
    // Cache the result
    addressCache.set(coordString, address);
    
    return address;
  } catch (error) {
    console.error('Geocoding error:', error);
    return coordString; // Fallback to coordinates
  }
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

export async function parseGoogleTimeline(jsonData: GoogleTimelineActivity[]): Promise<NormalizedTrip[]> {
  const trips: NormalizedTrip[] = [];
  
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
        purpose: "Unassigned",
        notes: "",
      });
    }
  });
  
  // Sort by date (newest first)
  trips.sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime());
  
  // Second pass: geocode addresses (async)
  for (const trip of trips) {
    trip.startAddress = await reverseGeocode(trip.startCoord);
    trip.endAddress = await reverseGeocode(trip.endCoord);
  }
  
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
