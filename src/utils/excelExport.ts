import * as XLSX from "xlsx";
import { NormalizedTrip, MonthlySummary, TripPurpose } from "@/types/trip";
import { CURRENT_IRS_RATES, calculateDeduction } from "@/config/irsRates";

// AI-Focus brand colors
const NAVY_BLUE = "15314D"; // RGB(21, 49, 77)
const GREY = "919CA7"; // RGB(145, 156, 167)
const DARK_GREY = "404040"; // RGB(64, 64, 64)
const WHITE = "FFFFFF";

export function exportToExcel(
  trips: NormalizedTrip[], 
  summaries: MonthlySummary[], 
  month: string = "", 
  purposes: TripPurpose[] = ["Business", "Personal", "Medical", "Charitable", "Other", "Unassigned"]
) {
  // Filter trips by month and purposes
  let filteredTrips = trips;
  
  if (month) {
    filteredTrips = filteredTrips.filter(t => t.date.startsWith(month));
  }
  
  filteredTrips = filteredTrips.filter(t => purposes.includes(t.purpose));
  
  // Create a new workbook
  const wb = XLSX.utils.book_new();
  
  // Add branding header rows
  const brandingRows = [
    ["MilesFocus", "", "", "", "", "", "", "", "", "", ""],
    ["Mileage Tracking Made Simple", "", "", "", "", "", "", "", "", "", ""],
    ["AI-Focus Technologies", "", "", "", "", "", "", "", "", "", ""],
    ["", "", "", "", "", "", "", "", "", "", ""],
  ];
  
  // Sheet 1: Filtered Trips
  const tripsData = filteredTrips.map(trip => ({
    Date: trip.date,
    "Start Time": trip.startTimeLocal,
    "End Time": trip.endTimeLocal,
    "Duration (min)": trip.durationMinutes,
    "Distance (Miles)": trip.distanceMiles,
    From: trip.startAddress,
    To: trip.endAddress,
    Purpose: trip.purpose,
    Notes: trip.notes,
    "Start Coord": trip.startCoord,
    "End Coord": trip.endCoord,
  }));
  
  // Combine branding and data
  const ws1 = XLSX.utils.aoa_to_sheet(brandingRows);
  XLSX.utils.sheet_add_json(ws1, tripsData, { origin: "A5" });
  
  // Style the branding header
  ws1['A1'].s = {
    font: { bold: true, sz: 18, color: { rgb: NAVY_BLUE } },
    alignment: { vertical: "center", horizontal: "left" }
  };
  ws1['A2'].s = {
    font: { sz: 11, color: { rgb: GREY } },
    alignment: { vertical: "center", horizontal: "left" }
  };
  ws1['A3'].s = {
    font: { sz: 10, color: { rgb: DARK_GREY } },
    alignment: { vertical: "center", horizontal: "left" }
  };
  
  // Style the data header row (row 5)
  const headerRange = XLSX.utils.decode_range(ws1['!ref'] || "A1");
  for (let col = headerRange.s.c; col <= headerRange.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 4, c: col });
    if (!ws1[cellAddress]) continue;
    ws1[cellAddress].s = {
      fill: { fgColor: { rgb: NAVY_BLUE } },
      font: { bold: true, color: { rgb: WHITE } },
      alignment: { vertical: "center", horizontal: "center" }
    };
  }
  
  // Set column widths
  ws1['!cols'] = [
    { wch: 12 }, // Date
    { wch: 12 }, // Start Time
    { wch: 12 }, // End Time
    { wch: 14 }, // Duration
    { wch: 16 }, // Distance
    { wch: 40 }, // From
    { wch: 40 }, // To
    { wch: 12 }, // Purpose
    { wch: 30 }, // Notes
    { wch: 20 }, // Start Coord
    { wch: 20 }, // End Coord
  ];
  
  // Add disclaimer footer to Trips sheet
  const tripsLastDataRow = 4 + filteredTrips.length;
  const tripsDisclaimerRow = tripsLastDataRow + 2;
  
  XLSX.utils.sheet_add_aoa(ws1, [
    [""],
    ["LEGAL DISCLAIMER:"],
    ["MilesFocus provides mileage calculations based on publicly available IRS mileage rates."],
    ["This tool does not provide tax, legal, or financial advice. All deduction amounts shown are estimates only."],
    ["Please consult a qualified tax professional for personalized guidance."]
  ], { origin: `A${tripsDisclaimerRow}` });
  
  // Style trips disclaimer
  const tripsDisclaimerHeaderCell = `A${tripsDisclaimerRow + 1}`;
  if (ws1[tripsDisclaimerHeaderCell]) {
    ws1[tripsDisclaimerHeaderCell].s = {
      font: { bold: true, sz: 10, color: { rgb: DARK_GREY } },
    };
  }
  
  for (let i = 0; i < 3; i++) {
    const cellAddress = `A${tripsDisclaimerRow + 2 + i}`;
    if (ws1[cellAddress]) {
      ws1[cellAddress].s = {
        font: { sz: 9, color: { rgb: GREY } },
      };
    }
  }
  
  XLSX.utils.book_append_sheet(wb, ws1, "Trips");
  
  // Sheet 2: Monthly Summary with branding
  const summaryBrandingRows = [
    ["MilesFocus - Monthly Summary", "", "", "", "", "", ""],
    ["AI-Focus Technologies", "", "", "", "", "", ""],
    ["", "", "", "", "", "", ""],
  ];
  
  const summaryData = summaries.map(s => ({
    Month: s.month,
    "Business Miles": s.businessMiles.toFixed(2),
    "Personal Miles": s.personalMiles.toFixed(2),
    "Medical Miles": s.medicalMiles.toFixed(2),
    "Charitable Miles": s.charitableMiles.toFixed(2),
    "Other Miles": s.otherMiles.toFixed(2),
    "Total Miles": s.totalMiles.toFixed(2),
    "IRS Business Rate": `$${CURRENT_IRS_RATES.business.toFixed(2)}`,
    "Estimated Deduction": `$${calculateDeduction(s.businessMiles, CURRENT_IRS_RATES.business).toFixed(2)}`,
  }));
  
  // Combine branding and summary data
  const ws2 = XLSX.utils.aoa_to_sheet(summaryBrandingRows);
  XLSX.utils.sheet_add_json(ws2, summaryData, { origin: "A4" });
  
  // Style the summary branding header
  ws2['A1'].s = {
    font: { bold: true, sz: 14, color: { rgb: NAVY_BLUE } },
    alignment: { vertical: "center", horizontal: "left" }
  };
  ws2['A2'].s = {
    font: { sz: 10, color: { rgb: DARK_GREY } },
    alignment: { vertical: "center", horizontal: "left" }
  };
  
  // Style the summary header row (row 4)
  const summaryHeaderRange = XLSX.utils.decode_range(ws2['!ref'] || "A1");
  for (let col = summaryHeaderRange.s.c; col <= summaryHeaderRange.e.c; col++) {
    const cellAddress = XLSX.utils.encode_cell({ r: 3, c: col });
    if (!ws2[cellAddress]) continue;
    ws2[cellAddress].s = {
      fill: { fgColor: { rgb: NAVY_BLUE } },
      font: { bold: true, color: { rgb: WHITE } },
      alignment: { vertical: "center", horizontal: "center" }
    };
  }
  
  // Set column widths
  ws2['!cols'] = [
    { wch: 10 },
    { wch: 16 },
    { wch: 16 },
    { wch: 16 },
    { wch: 18 },
    { wch: 14 },
    { wch: 14 },
    { wch: 18 },
    { wch: 20 },
  ];
  
  // Add disclaimer footer rows
  const lastDataRow = 3 + summaryData.length;
  const disclaimerRow = lastDataRow + 2;
  
  XLSX.utils.sheet_add_aoa(ws2, [
    [""],
    ["LEGAL DISCLAIMER:"],
    ["MilesFocus provides mileage calculations based on publicly available IRS mileage rates."],
    ["This tool does not provide tax, legal, or financial advice. All deduction amounts shown are estimates only."],
    ["Please consult a qualified tax professional for personalized guidance."]
  ], { origin: `A${disclaimerRow}` });
  
  // Style disclaimer header
  const disclaimerHeaderCell = `A${disclaimerRow + 1}`;
  if (ws2[disclaimerHeaderCell]) {
    ws2[disclaimerHeaderCell].s = {
      font: { bold: true, sz: 10, color: { rgb: DARK_GREY } },
    };
  }
  
  // Style disclaimer text
  for (let i = 0; i < 3; i++) {
    const cellAddress = `A${disclaimerRow + 2 + i}`;
    if (ws2[cellAddress]) {
      ws2[cellAddress].s = {
        font: { sz: 9, color: { rgb: GREY } },
      };
    }
  }
  
  XLSX.utils.book_append_sheet(wb, ws2, "Monthly Summary");
  
  // Generate filename with current date
  const monthSuffix = month ? `-${month}` : "";
  const filename = `MilesFocus-Report${monthSuffix}-${new Date().toISOString().split('T')[0]}.xlsx`;
  
  // Write file with styling enabled
  XLSX.writeFile(wb, filename, { cellStyles: true });
}
