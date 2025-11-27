import jsPDF from "jspdf";
import autoTable from "jspdf-autotable";
import { NormalizedTrip, MonthlySummary, TripPurpose } from "@/types/trip";
import milesFocusLogo from "@/assets/miles-focus-logo-v1-notext.png";
import { CURRENT_IRS_RATES, calculateDeduction, formatRate, IRSRates } from "@/config/irsRates";

export function exportToPDF(
  trips: NormalizedTrip[], 
  summaries: MonthlySummary[], 
  months: string[],
  purposes: TripPurpose[] = ["Business", "Personal", "Medical", "Charitable", "Other", "Unassigned"],
  customRates: IRSRates | null = null,
  rangeLabel: string = "All Months"
) {
  const activeRates = customRates || CURRENT_IRS_RATES;
  const isCustom = customRates !== null;
  const doc = new jsPDF();
  
  // AI-Focus brand colors
  const navyBlue: [number, number, number] = [21, 49, 77]; // #15314D
  const grey: [number, number, number] = [145, 156, 167]; // #919CA7
  const darkGrey: [number, number, number] = [64, 64, 64]; // #404040
  
  // Header with logo and branding
  doc.setFillColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.rect(0, 0, 220, 35, 'F');
  
  // Add logo image
  try {
    doc.addImage(milesFocusLogo, 'PNG', 10, 8, 20, 20);
  } catch (e) {
    console.error('Failed to add logo to PDF:', e);
  }
  
  doc.setTextColor(255, 255, 255);
  doc.setFontSize(22);
  doc.text("MilesFocus", 35, 18);
  
  doc.setFontSize(10);
  doc.text("Mileage Tracking Made Simple", 35, 25);
  
  // Title
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.setFontSize(16);
  doc.text(`Mileage Log - ${rangeLabel}`, 15, 48);
  
  // Filter trips by months and purposes
  let filteredTrips = trips;
  if (months.length > 0) {
    filteredTrips = filteredTrips.filter(t => {
      return months.some(month => {
        const [monthName, year] = month.split(" ");
        return t.date.includes(monthName) && t.date.includes(year);
      });
    });
  }
  
  filteredTrips = filteredTrips.filter(t => purposes.includes(t.purpose));
  
  // Calculate summary from filtered trips
  const summary = {
    businessMiles: filteredTrips.filter(t => t.purpose === "Business").reduce((sum, t) => sum + t.distanceMiles, 0),
    personalMiles: filteredTrips.filter(t => t.purpose === "Personal").reduce((sum, t) => sum + t.distanceMiles, 0),
    medicalMiles: filteredTrips.filter(t => t.purpose === "Medical").reduce((sum, t) => sum + t.distanceMiles, 0),
    charitableMiles: filteredTrips.filter(t => t.purpose === "Charitable").reduce((sum, t) => sum + t.distanceMiles, 0),
    otherMiles: filteredTrips.filter(t => t.purpose === "Other").reduce((sum, t) => sum + t.distanceMiles, 0),
    totalMiles: filteredTrips.reduce((sum, t) => sum + t.distanceMiles, 0),
  };
  
  // Monthly Summary Box
  doc.setFontSize(12);
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.text("Monthly Summary", 15, 58);
  
  doc.setFontSize(10);
  doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
  let yPos = 65;
  doc.text(`Business Miles: ${summary.businessMiles.toFixed(2)}`, 15, yPos);
  yPos += 6;
  doc.text(`Personal Miles: ${summary.personalMiles.toFixed(2)}`, 15, yPos);
  yPos += 6;
  doc.text(`Medical Miles: ${summary.medicalMiles.toFixed(2)}`, 15, yPos);
  yPos += 6;
  doc.text(`Charitable Miles: ${summary.charitableMiles.toFixed(2)}`, 15, yPos);
  yPos += 6;
  doc.text(`Other Miles: ${summary.otherMiles.toFixed(2)}`, 15, yPos);
  yPos += 6;
  doc.setFont(undefined, 'bold');
  doc.text(`Total Miles: ${summary.totalMiles.toFixed(2)}`, 15, yPos);
  doc.setFont(undefined, 'normal');
  
  // IRS Rates & Estimated Deduction Section
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.text(isCustom ? "Custom Mileage Rates & Estimated Deduction" : "IRS Standard Mileage Rates & Estimated Deduction", 15, yPos);
  
  yPos += 7;
  doc.setFontSize(10);
  doc.setTextColor(darkGrey[0], darkGrey[1], darkGrey[2]);
  doc.text(`Business: ${formatRate(activeRates.business)}/mile  •  Medical: ${formatRate(activeRates.medical)}/mile  •  Charitable: ${formatRate(activeRates.charitable)}/mile`, 15, yPos);
  
  yPos += 8;
  const businessDeduction = calculateDeduction(summary.businessMiles, activeRates.business);
  doc.setFont(undefined, 'bold');
  doc.setFontSize(14);
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.text(`Estimated Business Deduction: $${businessDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}`, 15, yPos);
  
  yPos += 5;
  doc.setFont(undefined, 'normal');
  doc.setFontSize(9);
  doc.setTextColor(grey[0], grey[1], grey[2]);
  doc.text(`(Based on ${isCustom ? 'custom' : `${activeRates.year} IRS`} rate: ${formatRate(activeRates.business)}/mile)`, 15, yPos);
  
  // Business Trips Table
  yPos += 10;
  doc.setFontSize(12);
  doc.setTextColor(navyBlue[0], navyBlue[1], navyBlue[2]);
  doc.text("Business Trips", 15, yPos);
  
  const businessTrips = filteredTrips.filter(t => t.purpose === "Business");
  
  // Color mapping for purposes (matching app colors)
  const purposeColors: Record<string, [number, number, number]> = {
    Business: [219, 234, 254], // blue-50
    Medical: [240, 253, 244], // green-50
    Charitable: [250, 245, 255], // purple-50
    Personal: [249, 250, 251], // gray-50
    Other: [255, 247, 237], // orange-50
    Unassigned: [254, 252, 232], // yellow-50
  };
  
  const purposeTextColors: Record<string, [number, number, number]> = {
    Business: [29, 78, 216], // blue-700
    Medical: [21, 128, 61], // green-700
    Charitable: [126, 34, 206], // purple-700
    Personal: [55, 65, 81], // gray-700
    Other: [194, 65, 12], // orange-700
    Unassigned: [161, 98, 7], // yellow-700
  };
  
  const tableData = businessTrips.map(trip => [
    trip.date,
    trip.startTimeLocal,
    trip.endTimeLocal,
    trip.startAddress,
    trip.endAddress,
    trip.distanceMiles.toFixed(2),
    trip.purpose, // Add purpose column
    trip.notes || "-",
  ]);
  
  autoTable(doc, {
    startY: yPos + 5,
    head: [["Date", "Start Time", "End Time", "From", "To", "Miles", "Purpose", "Notes"]],
    body: tableData,
    theme: "striped",
    headStyles: {
      fillColor: navyBlue,
      textColor: [255, 255, 255],
      fontSize: 9,
      fontStyle: "bold",
    },
    alternateRowStyles: {
      fillColor: [245, 247, 250],
    },
    styles: {
      fontSize: 8,
      textColor: darkGrey,
    },
    columnStyles: {
      0: { cellWidth: 20 },
      1: { cellWidth: 18 },
      2: { cellWidth: 18 },
      3: { cellWidth: 32 },
      4: { cellWidth: 32 },
      5: { cellWidth: 16 },
      6: { cellWidth: 22 }, // Purpose column
      7: { cellWidth: 'auto' },
    },
    margin: { bottom: 50 },
    didParseCell: function(data) {
      // Color the Purpose column cells
      if (data.section === 'body' && data.column.index === 6) {
        const purpose = data.cell.text[0];
        const bgColor = purposeColors[purpose] || [255, 255, 255];
        const textColor = purposeTextColors[purpose] || darkGrey;
        
        data.cell.styles.fillColor = bgColor;
        data.cell.styles.textColor = textColor;
        data.cell.styles.fontStyle = 'bold';
        data.cell.styles.fontSize = 8;
      }
    },
  });
  
  // Footer with Disclaimer
  const pageCount = doc.getNumberOfPages();
  for (let i = 1; i <= pageCount; i++) {
    doc.setPage(i);
    
    // Disclaimer
    doc.setFontSize(7);
    doc.setTextColor(grey[0], grey[1], grey[2]);
    const disclaimerText = "MilesFocus provides mileage calculations based on publicly available IRS rates. This tool does not provide tax, legal, or financial advice. " +
      "All deduction amounts shown are estimates only. Please consult a qualified tax professional for personalized guidance.";
    const disclaimerLines = doc.splitTextToSize(disclaimerText, doc.internal.pageSize.getWidth() - 30);
    doc.text(
      disclaimerLines,
      15,
      doc.internal.pageSize.getHeight() - 20
    );
    
    // Generated by line with links
    doc.setFontSize(8);
    doc.setTextColor(grey[0], grey[1], grey[2]);
    
    const footerY = doc.internal.pageSize.getHeight() - 10;
    const pageWidth = doc.internal.pageSize.getWidth();
    const centerX = pageWidth / 2;
    
    // Calculate text positions for links
    const footerText = "Generated by MilesFocus • ";
    const aiText = "AI-Focus Technologies";
    const midText = " • Built by ";
    const sujitText = "Sujit Gangadharan";
    
    // Measure text widths
    const footerWidth = doc.getTextWidth(footerText);
    const aiWidth = doc.getTextWidth(aiText);
    const midWidth = doc.getTextWidth(midText);
    const sujitWidth = doc.getTextWidth(sujitText);
    const totalWidth = footerWidth + aiWidth + midWidth + sujitWidth;
    
    // Starting X position (centered)
    let currentX = centerX - (totalWidth / 2);
    
    // Draw text parts
    doc.text(footerText, currentX, footerY);
    currentX += footerWidth;
    
    // AI-Focus link (underlined)
    doc.textWithLink(aiText, currentX, footerY, { url: "https://www.ai-focus.org" });
    doc.setDrawColor(grey[0], grey[1], grey[2]);
    doc.line(currentX, footerY + 0.5, currentX + aiWidth, footerY + 0.5);
    currentX += aiWidth;
    
    doc.text(midText, currentX, footerY);
    currentX += midWidth;
    
    // Sujit link (underlined)
    doc.textWithLink(sujitText, currentX, footerY, { url: "https://www.sujitg.com" });
    doc.line(currentX, footerY + 0.5, currentX + sujitWidth, footerY + 0.5);
  }
  
  // Save the PDF
  const sanitizedLabel = rangeLabel.replace(/[^a-zA-Z0-9]/g, "-").replace(/-+/g, "-");
  const filename = `MilesFocus-IRS-Report-${sanitizedLabel}-${new Date().toISOString().split('T')[0]}.pdf`;
  doc.save(filename);
}
