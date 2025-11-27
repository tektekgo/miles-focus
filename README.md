# MilesFocus

**AI-Focus Technologies Branded Mileage Extractor**

MilesFocus is a professional web application that extracts driving mileage from Google Timeline JSON exports and generates IRS-ready reports in both PDF and Excel formats.

![AI-Focus Technologies](src/assets/ai-focus-logo.png)

## Features

- 📤 **Simple Upload**: Drag & drop or select your Google Timeline JSON file
- 🚗 **Smart Extraction**: Automatically identifies and extracts only driving segments
- ✏️ **Interactive Review**: Edit trip purposes and add notes directly in the table
- 📊 **Monthly Summaries**: View mileage breakdowns by category (Business, Personal, Medical, Charitable, Other)
- 📑 **Excel Export**: Generate comprehensive reports with trip details and monthly summaries
- 📄 **IRS-Ready PDFs**: Professional PDF reports formatted for tax documentation
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

4. **Export Reports**
   - **Excel**: Complete trip log with separate sheets for trips and monthly summaries
   - **PDF**: IRS-ready format showing business trips and monthly totals

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

## Architecture

```
src/
├── assets/           # Logo and static assets
├── components/       # React components
│   ├── Header.tsx
│   ├── FileUpload.tsx
│   ├── TripsTable.tsx
│   └── MonthlySummary.tsx
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
