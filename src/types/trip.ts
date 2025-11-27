export type TripPurpose = "Business" | "Personal" | "Medical" | "Charitable" | "Other" | "Unassigned";

export interface NormalizedTrip {
  id: string;
  date: string; // YYYY-MM-DD format
  startTimeLocal: string;
  endTimeLocal: string;
  durationMinutes: number;
  distanceMiles: number;
  startCoord: string;
  endCoord: string;
  purpose: TripPurpose;
  notes: string;
}

export interface MonthlySummary {
  month: string; // YYYY-MM format
  businessMiles: number;
  personalMiles: number;
  medicalMiles: number;
  charitableMiles: number;
  otherMiles: number;
  totalMiles: number;
}

export interface GoogleTimelineActivity {
  endTime: string;
  startTime: string;
  activity?: {
    probability: string;
    end: string;
    topCandidate: {
      type: string;
      probability: string;
    };
    distanceMeters: string;
    start: string;
  };
  visit?: any;
}
