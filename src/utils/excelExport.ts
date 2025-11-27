import * as XLSX from "xlsx";
import { NormalizedTrip, MonthlySummary } from "@/types/trip";

export function exportToExcel(trips: NormalizedTrip[], summaries: MonthlySummary[]) {
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Sheet 1: All Trips
  const tripsData = trips.map(trip => ({
    Date: trip.date,
    "Start Time": trip.startTimeLocal,
    "End Time": trip.endTimeLocal,
    "Duration (min)": trip.durationMinutes,
    "Distance (Miles)": trip.distanceMiles,
    Purpose: trip.purpose,
    Notes: trip.notes,
    "Start Coord": trip.startCoord,
    "End Coord": trip.endCoord,
  }));
  
  const ws1 = XLSX.utils.json_to_sheet(tripsData);
  
  // Set column widths
  ws1['!cols'] = [
    { wch: 12 }, // Date
    { wch: 12 }, // Start Time
    { wch: 12 }, // End Time
    { wch: 14 }, // Duration
    { wch: 16 }, // Distance
    { wch: 12 }, // Purpose
    { wch: 30 }, // Notes
    { wch: 20 }, // Start Coord
    { wch: 20 }, // End Coord
  ];
  
  XLSX.utils.book_append_sheet(wb, ws1, "Trips");
  
  // Sheet 2: Monthly Summary
  const summaryData = summaries.map(s => ({
    Month: s.month,
    "Business Miles": s.businessMiles.toFixed(2),
    "Personal Miles": s.personalMiles.toFixed(2),
    "Medical Miles": s.medicalMiles.toFixed(2),
    "Charitable Miles": s.charitableMiles.toFixed(2),
    "Other Miles": s.otherMiles.toFixed(2),
    "Total Miles": s.totalMiles.toFixed(2),
  }));
  
  const ws2 = XLSX.utils.json_to_sheet(summaryData);
  
  // Set column widths
  ws2['!cols'] = [
    { wch: 10 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
  ];
  
  XLSX.utils.book_append_sheet(wb, ws2, "Monthly Summary");
  
  // Generate filename with current date
  const filename = `MilesFocus-Report-${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Write file
  XLSX.writeFile(wb, filename);
}
