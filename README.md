# MilesFocus

**AI-Focus Technologies Branded Mileage Extractor**

MilesFocus is a privacy-first web application that extracts driving mileage from Google Timeline JSON exports and generates IRS-ready reports in both PDF and Excel formats.

![AI-Focus Technologies](src/assets/ai-focus-logo.png)

## Features

### Core Functionality
- 📤 **Simple Upload**: Drag & drop or select your Google Timeline JSON file
- 🚗 **Smart Extraction**: Automatically identifies and extracts only driving segments
- 🗺️ **Reverse Geocoding**: Converts coordinates to human-readable addresses via LocationIQ API
- ✏️ **Interactive Review**: Edit trip purposes and add notes directly in the table
- 📊 **Monthly Summaries**: View mileage breakdowns by category (Business, Personal, Medical, Charitable, Other)
- 🔒 **Privacy First**: All processing happens locally in your browser - no data uploads

### IRS Integration
- 💰 **IRS Rate Information**: Display current IRS standard mileage rates with automatic yearly updates
- 🧮 **Deduction Estimates**: Calculate estimated business mileage deductions based on official IRS rates
- ✏️ **Custom Rates**: Edit rates and compare official vs. custom deductions side-by-side
- ⚖️ **Legal Disclaimers**: Proper legal disclaimers included in UI and all exports

### Advanced Filtering
- 📅 **Flexible Date Selection**: Quick select (Last 30/60/90 days, YTD, Tax Year), by month, quarterly, or custom multi-month
- 🏷️ **Purpose Filtering**: Filter trips by category or show only unassigned trips
- ✅ **Bulk Assignment**: Select multiple trips and assign purposes at once
- ⚙️ **Default Purpose**: Set a default category for newly uploaded trips

### Export Capabilities
- 📑 **Excel Export**: Comprehensive reports with trip details, monthly summaries, IRS rates, and estimated deductions
- 📄 **IRS-Ready PDFs**: Professional PDF reports formatted for tax documentation with rate information and disclaimers
- 🎨 **Color-Coded**: Purpose categories are color-coded across UI and exports

### Geocoding System
- 🌐 **LocationIQ API**: Production-grade geocoding with higher rate limits
- 💾 **Smart Caching**: Multi-layer caching (memory + browser localStorage) minimizes API calls
- 📈 **Geocoding Stats**: Transparency panel showing API calls vs. cache hits
- 🔄 **Force Refresh**: Clear cache and re-fetch addresses when needed
- ⏱️ **Progress Tracking**: Visual progress bar with estimated time remaining

### User Experience
- 🌓 **Dark/Light Mode**: Toggle between themes with system preference detection
- 📱 **Responsive Design**: Mobile-optimized with hamburger menu navigation
- 🎯 **Interactive Demo**: Try the app with sample data on the landing page
- 📚 **Educational Content**: FAQ, IRS guide, and Timeline download instructions

## Tech Stack

- **Frontend**: React 18 + TypeScript
- **Build Tool**: Vite
- **Styling**: Tailwind CSS with AI-Focus brand colors
- **UI Components**: shadcn/ui
- **Excel Export**: SheetJS (xlsx)
- **PDF Export**: jsPDF + jspdf-autotable
- **Icons**: Lucide React
- **Geocoding**: LocationIQ API
- **Hosting**: Vercel

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

### Environment Variables

For production deployment with geocoding:

```bash
VITE_LOCATIONIQ_API_KEY=your_locationiq_api_key
```

Configure this in your Vercel project settings under Environment Variables.

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
   - Watch the geocoding progress with estimated time remaining

3. **Review & Categorize**
   - Review the extracted trips in the interactive table
   - Check geocoding stats to see API usage vs. cache hits
   - Set each trip's purpose using the dropdown (Business, Personal, Medical, Charitable, Other)
   - Use bulk assignment for multiple trips with the same purpose
   - Add notes as needed
   - Use flexible date range selector to filter by period

4. **Review IRS Rates & Estimated Deductions**
   - View current IRS standard mileage rates
   - Edit rates if needed (labeled as "Custom Rates")
   - Compare official vs. custom rate deductions
   - See estimated business mileage deductions automatically calculated

5. **Export Reports**
   - **Excel**: Complete trip log with separate sheets including trips, monthly summaries, IRS rates, and estimated deductions
   - **PDF**: IRS-ready format showing business trips, monthly totals, rate information, and estimated deductions with legal disclaimers

## Project Structure

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
│   ├── DeductionComparison.tsx
│   ├── DateRangeSelector.tsx
│   ├── GeocodingStats.tsx
│   ├── DemoViewer.tsx
│   └── Footer.tsx
├── config/          # Configuration files
│   └── irsRates.ts  # IRS mileage rates (update annually)
├── types/           # TypeScript type definitions
│   └── trip.ts
├── utils/           # Utility functions
│   ├── timelineParser.ts  # JSON parsing + geocoding logic
│   ├── excelExport.ts     # Excel generation
│   └── pdfExport.ts       # PDF generation
└── pages/
    ├── Landing.tsx   # Marketing landing page
    ├── Index.tsx     # Main application page
    ├── FAQ.tsx       # Frequently asked questions
    ├── HowItWorks.tsx # IRS mileage education
    ├── About.tsx     # About MilesFocus
    └── Guide.tsx     # Timeline download guide
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

## Deployment

### Vercel (Recommended)

1. Connect your GitHub repository to Vercel
2. Add environment variable `VITE_LOCATIONIQ_API_KEY` in project settings
3. Configure LocationIQ HTTP Referrer restrictions for your domains
4. Deploy automatically on push

The `vercel.json` file handles SPA routing:
```json
{
  "rewrites": [{ "source": "/(.*)", "destination": "/" }]
}
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
- 🤖 **AI Suggestions**: ML-based trip purpose prediction

## Privacy & Security

- **No server uploads**: All processing happens in your browser
- **No data storage**: Files are not saved or transmitted
- **No tracking**: No analytics or user tracking
- **Open source**: Fully transparent code
- **API key security**: LocationIQ key restricted by HTTP referrer

## License

© 2025 AI-Focus Technologies. All rights reserved.

## Support

For support or questions, please contact AI-Focus Technologies.

---

**Built with ❤️ by AI-Focus Technologies**  
[www.ai-focus.org](https://www.ai-focus.org) | [www.sujitg.com](https://www.sujitg.com)
