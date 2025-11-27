# MilesFocus

**AI-Focus Technologies Branded Mileage Extractor**

MilesFocus is a professional web application that extracts driving mileage from Google Timeline JSON exports and generates IRS-ready reports in both PDF and Excel formats.

![AI-Focus Technologies](src/assets/ai-focus-logo.png)

## Features

- 📤 **Simple Upload**: Drag & drop or select your Google Timeline JSON file
- 🚗 **Smart Extraction**: Automatically identifies and extracts only driving segments
- ✏️ **Interactive Review**: Edit trip purposes and add notes directly in the table
- 📊 **Monthly Summaries**: View mileage breakdowns by category (Business, Personal, Medical, Charitable, Other)
- 💰 **IRS Rate Information**: Display current IRS standard mileage rates with automatic yearly updates
- 🧮 **Deduction Estimates**: Calculate estimated business mileage deductions based on official IRS rates
- 📑 **Excel Export**: Generate comprehensive reports with trip details, monthly summaries, IRS rates, and estimated deductions
- 📄 **IRS-Ready PDFs**: Professional PDF reports formatted for tax documentation with rate information and disclaimers
- ⚖️ **Legal Disclaimers**: Proper legal disclaimers included in UI and all exports
- 🔒 **Privacy First**: All processing happens locally in your browser - no data uploads

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with AI-Focus brand colors
- **UI Components**: shadcn/ui
- **Excel Export**: SheetJS (xlsx)
- **PDF Export**: jsPDF + jspdf-autotable
- **Icons**: Lucide React

## AI-Focus Brand Colors

- **Navy Blue**: #15314D (Primary)
- **Grey**: #919CA7 (Secondary)
- **Dark Grey**: #404040 (Neutral)
- **Orange**: Accent color for highlights

## Getting Started

### Prerequisites

- Node.js 18+ and npm

### Installation

```bash
# Clone the repository
git clone https://github.com/tektekgo/milesfocus.git

# Navigate to project directory
cd milesfocus

# Install dependencies
npm install

# Start development server
npm run dev
```

The application will be available at `http://localhost:8080`

### Building for Production

```bash
npm run build
```

## How to Use

1. **Export Your Google Timeline**
   - Go to [Google Takeout](https://takeout.google.com/)
   - Select "Location History" (JSON format)
   - Download your data

2. **Upload to MilesFocus**
   - Open the application
   - Drag & drop or select your `location-history.json` file
   - Wait for the parser to extract driving segments

3. **Review & Categorize**
   - Review the extracted trips in the interactive table
   - Set each trip's purpose using the dropdown (Business, Personal, Medical, Charitable, Other)
   - Add notes as needed
   - Filter by month to focus on specific periods

4. **Review IRS Rates & Estimated Deductions**
   - View current IRS standard mileage rates
   - See estimated business mileage deductions automatically calculated
   - Based on official IRS rates that update annually

5. **Export Reports**
   - **Excel**: Complete trip log with separate sheets including trips, monthly summaries, IRS rates, and estimated deductions
   - **PDF**: IRS-ready format showing business trips, monthly totals, rate information, and estimated deductions with legal disclaimers

## Data Structure

### Normalized Trip Object

```typescript
{
  id: string;
  date: string; // YYYY-MM-DD
  startTimeLocal: string;
  endTimeLocal: string;
  durationMinutes: number;
  distanceMiles: number; // Converted from meters
  startCoord: string; // geo:lat,lon format
  endCoord: string;
  purpose: "Business" | "Personal" | "Medical" | "Charitable" | "Other" | "Unassigned";
  notes: string;
}
```

### Monthly Summary

```typescript
{
  month: string; // YYYY-MM
  businessMiles: number;
  personalMiles: number;
  medicalMiles: number;
  charitableMiles: number;
  otherMiles: number;
  totalMiles: number;
}
```

## IRS Rate Management

MilesFocus includes built-in IRS standard mileage rates that need to be updated annually:

### Current Rates (2025)
- **Business**: 70¢ per mile
- **Medical/Moving**: 21¢ per mile  
- **Charitable**: 14¢ per mile

### How to Update IRS Rates Annually

When the IRS publishes new rates (typically in December for the following year):

1. Open `src/config/irsRates.ts`
2. Update the `CURRENT_IRS_RATES` object:
   ```typescript
   export const CURRENT_IRS_RATES: IRSRates = {
     year: 2026,        // Update year
     business: 0.72,    // Update rates (example)
     medical: 0.22,
     charitable: 0.14,
   };
   ```
3. Commit and deploy the changes
4. All calculations, exports, and displays will automatically use the new rates

### Official Source
Rates are sourced from: [IRS Standard Mileage Rates](https://www.irs.gov/tax-professionals/standard-mileage-rates)

## Architecture

```
src/
├── assets/           # Logo and static assets
├── components/       # React components
│   ├── Header.tsx
│   ├── FileUpload.tsx
│   ├── TripsTable.tsx
│   ├── MonthlySummary.tsx
│   ├── IRSRatesPanel.tsx
│   ├── EstimatedDeduction.tsx
│   └── Footer.tsx
├── config/          # Configuration files
│   └── irsRates.ts  # IRS mileage rates (update annually)
├── types/           # TypeScript type definitions
│   └── trip.ts
├── utils/           # Utility functions
│   ├── timelineParser.ts  # JSON parsing logic
│   ├── excelExport.ts     # Excel generation
│   └── pdfExport.ts       # PDF generation
└── pages/
    └── Index.tsx    # Main application page
```

## Future Roadmap (SaaS Features)

- 🔐 **User Authentication**: Save and sync trip data across devices
- ☁️ **Cloud Storage**: Store historical mileage data
- 📱 **Mobile App**: Native iOS/Android applications
- 🔄 **Automatic Sync**: Direct integration with Google Timeline API
- 📈 **Analytics Dashboard**: Yearly trends and insights
- 🧾 **Tax Estimator**: Calculate potential deductions
- 👥 **Multi-User**: Team/business accounts with role management
- 🔗 **Integrations**: QuickBooks, Xero, and other accounting software
- 📧 **Scheduled Reports**: Automatic monthly email reports

## Privacy & Security

- **No server uploads**: All processing happens in your browser
- **No data storage**: Files are not saved or transmitted
- **No tracking**: No analytics or user tracking
- **Open source**: Fully transparent code

## License

© 2025 AI-Focus Technologies. All rights reserved.

## Support

For support or questions, please contact AI-Focus Technologies.

---

**Built with ❤️ by AI-Focus Technologies**
