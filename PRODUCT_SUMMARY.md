# MilesFocus Product Summary

**Prepared for:** Product Management Review  
**Date:** November 2024  
**Version:** 1.1

---

## Executive Summary

MilesFocus is a privacy-first web application that converts Google Timeline location data into organized, IRS-compliant mileage reports. Built by AI-Focus Technologies, it targets independent professionals, small business owners, gig workers, and anyone who needs to track driving mileage for tax deductions.

**Core Value Proposition:** Eliminate manual mileage logging by leveraging location data users already have—transforming raw Google Timeline exports into categorized, exportable reports ready for tax filing.

**Key Differentiator:** Unlike competitors that require continuous app usage or manual entry, MilesFocus works with historical data users have already collected through Google's location services.

---

## Current Features & Capabilities

### 1. Core Workflow

| Feature | Description |
|---------|-------------|
| **File Upload** | Drag-and-drop Google Timeline JSON file upload |
| **Smart Extraction** | Automatically identifies driving trips (filters for vehicle/car/passenger activities) |
| **Reverse Geocoding** | Converts GPS coordinates to human-readable addresses using LocationIQ API |
| **Progress Tracking** | Visual progress bar with estimated time remaining during geocoding |
| **Geocoding Statistics** | Transparency panel showing API calls, cache hits (browser/memory), and fallbacks |
| **Smart Caching** | Multi-layer caching (memory + browser localStorage) to minimize API calls |
| **Force Fresh Geocoding** | Button with tooltip to clear cache and fetch fresh addresses when needed |
| **Local Processing** | All data processed client-side—no server uploads |

### 2. Trip Management

| Feature | Description |
|---------|-------------|
| **6 Purpose Categories** | Business, Personal, Medical, Charitable, Other, Unassigned |
| **Inline Editing** | Edit trip purpose and notes directly in the table |
| **Bulk Assignment** | Select multiple trips and assign the same purpose at once |
| **Default Purpose** | Set a default category for newly uploaded trips |
| **Color-Coded Badges** | Visual purpose identification throughout UI and exports |

### 3. Filtering & Views

| Feature | Description |
|---------|-------------|
| **Date Range Selector** | Flexible date filtering with multiple selection modes |
| **Quick Select Options** | All Months, Last 30/60/90 Days, Year-to-Date, Tax Year |
| **Monthly Selection** | Pick individual months from available data |
| **Quarterly Selection** | Select Q1, Q2, Q3, or Q4 with one click |
| **Custom Multi-Month** | Checkbox selection for any combination of months |
| **Unassigned Filter** | Show only trips needing categorization (dual placement: top + inline) |
| **Purpose Filter** | Filter by trip purpose categories |
| **Purpose Toggle** | Enable/disable purposes for export selection |

### 4. IRS Rate Integration

| Rate Type | 2025 Rate | Purpose |
|-----------|-----------|---------|
| Business | 70¢/mile | Self-employment, business travel |
| Medical/Moving | 21¢/mile | Medical appointments, qualifying moves |
| Charitable | 14¢/mile | Volunteer work for qualified organizations |

**Additional Features:**
- Custom rate editing with "Custom Rates" labeling
- Side-by-side comparison: Official vs. Custom rates
- Real-time estimated deduction calculations

### 5. Export Capabilities

#### PDF Export
- AI-Focus branded header with MilesFocus logo
- Monthly mileage summary by category
- Detailed business trips table (Date, Times, Distance, From/To addresses, Notes)
- IRS rate reference panel
- Estimated business deduction calculation
- Legal disclaimer footer
- Respects date range and purpose filters

#### Excel Export (XLSX)
- **Sheet 1 - Trips:** All trip data with addresses, color-coded purpose cells
- **Sheet 2 - Monthly Summary:** Aggregated totals, IRS rates, estimated deductions
- AI-Focus branding (navy headers, logo)
- Legal disclaimer on both sheets
- Respects date range and purpose filters

### 6. Geocoding System

| Feature | Description |
|---------|-------------|
| **LocationIQ API** | Production geocoding service with higher rate limits |
| **Memory Cache** | In-session coordinate-to-address cache |
| **Browser Cache** | Persistent localStorage cache across sessions |
| **Cache Statistics** | Visual display of API calls vs. cache hits |
| **Rate Limiting** | 550ms delay between API calls (LocationIQ free tier compliance) |
| **Estimated Time** | Progress indicator shows remaining geocoding time |
| **Fallback Handling** | Graceful degradation to coordinates if geocoding fails |
| **Force Refresh** | Clear all caches and re-fetch addresses on demand |

### 7. Supporting Pages & Content

| Page | Purpose |
|------|---------|
| **Landing Page** | Marketing page with interactive demo viewer |
| **FAQ** | 9 common questions about functionality and tax compliance |
| **How IRS Mileage Works** | Educational explainer on IRS rules |
| **About MilesFocus** | Company background and privacy philosophy |
| **Timeline Download Guide** | Step-by-step instructions for exporting Google data |

### 8. User Experience Features

- Dark/Light mode toggle with system preference detection
- Responsive design (mobile-optimized with hamburger menu)
- Interactive sample data demo on landing page
- Prominent legal disclaimers throughout
- Hover animations and micro-interactions
- Consistent design language across all pages
- Navy blue (#15314D) header branding

---

## Proposed Pricing Structure

### Tier Comparison

| Feature | Free | Pro | Business |
|---------|------|-----|----------|
| **Price** | $0 | $9.99/mo or $79/yr | $29.99/mo or $249/yr |
| Uploads per month | 3 | Unlimited | Unlimited |
| Trip history storage | None (session only) | 12 months | Unlimited |
| PDF Export | Watermarked | Full | Full + Custom branding |
| Excel Export | Watermarked | Full | Full + Custom branding |
| Multiple vehicles | ❌ | ✅ | ✅ |
| Cloud sync | ❌ | ✅ | ✅ |
| API Access | ❌ | ❌ | ✅ |
| Team accounts | ❌ | ❌ | ✅ (up to 10 users) |
| Priority support | ❌ | Email | Email + Chat |
| White-label exports | ❌ | ❌ | ✅ |

### Revenue Projections (Conservative)

| Scenario | Free Users | Pro Users | Business Users | MRR |
|----------|------------|-----------|----------------|-----|
| Launch (Month 1) | 500 | 25 | 2 | $310 |
| Month 6 | 2,000 | 150 | 15 | $1,950 |
| Month 12 | 5,000 | 400 | 40 | $5,200 |
| Month 24 | 15,000 | 1,200 | 150 | $16,500 |

*Assumes 5% free-to-Pro conversion, 1% Pro-to-Business upgrade*

---

## Recommended Future Features

### 🔴 High Priority (MVP for SaaS Launch)

These features are **required** before introducing paid tiers:

| Feature | Description | Effort |
|---------|-------------|--------|
| **User Authentication** | Email/password + Google OAuth login | Medium |
| **Cloud Data Storage** | Persist trip data across sessions | Medium |
| **Account Dashboard** | View historical uploads, manage profile | Medium |
| **Stripe Integration** | Payment processing for Pro/Business tiers | Medium |
| **Usage Limits** | Enforce tier-based upload limits | Low |
| **Email System** | Welcome emails, export delivery, reminders | Medium |

**Estimated Timeline:** 6-8 weeks for full SaaS foundation

### 🟡 Medium Priority (Growth Phase)

Features to drive user acquisition and retention:

| Feature | Description | Value |
|---------|-------------|-------|
| **Google Timeline API Integration** | Direct connection without manual export | Reduces friction significantly |
| **Recurring Trip Templates** | Auto-categorize regular routes | Power user feature |
| **Multiple Vehicle Tracking** | Separate logs per vehicle | Fleet owners, families |
| **CSV Import** | Migrate from other mileage apps | Competitor switching |
| **Mobile App** | React Native iOS/Android app | Accessibility |
| **Email Reminders** | Weekly/monthly categorization prompts | Engagement |
| **IRS Rate Alerts** | Notify when rates change annually | Trust builder |

### 🟢 Nice-to-Have (Differentiation)

Features for competitive advantage:

| Feature | Description | Target Segment |
|---------|-------------|----------------|
| **AI Trip Suggestions** | ML-based purpose prediction | All users |
| **Accounting Integration** | QuickBooks, Xero, FreshBooks sync | Small businesses |
| **Receipt Attachment** | Photo upload for expense documentation | Power users |
| **Reimbursement Workflows** | Submit mileage for employer approval | Employees |
| **Audit Trail** | Detailed change logs for compliance | Enterprise |
| **Odometer Tracking** | Manual odometer entry + reconciliation | IRS compliance |
| **Geofencing** | Auto-categorize trips by location | Automation |
| **Annual Summary Reports** | Year-end tax preparation package | Tax season feature |

---

## Technical Roadmap

### Phase 1: SaaS Foundation (Weeks 1-8)

```
Week 1-2: Backend Infrastructure
├── Enable Lovable Cloud (Supabase)
├── Design database schema (users, trips, uploads, subscriptions)
├── Set up authentication (email + Google OAuth)
└── Implement RLS policies

Week 3-4: Core SaaS Features
├── User registration/login flows
├── Cloud trip storage and retrieval
├── Account dashboard UI
└── Historical upload management

Week 5-6: Monetization
├── Stripe integration
├── Subscription management
├── Usage tracking and limits
└── Upgrade prompts

Week 7-8: Polish & Launch
├── Email system (transactional)
├── Onboarding flow
├── Analytics integration
└── Beta testing
```

### Phase 2: Growth Features (Weeks 9-16)

```
├── Google Timeline API integration
├── Recurring trip templates
├── Multiple vehicle support
├── CSV import capability
└── Mobile-responsive improvements
```

### Phase 3: Expansion (Weeks 17-24)

```
├── Mobile app development
├── AI-powered suggestions
├── Accounting integrations
└── Team/organization features
```

---

## Competitive Analysis

### Market Landscape

| Competitor | Pricing | Strengths | Weaknesses |
|------------|---------|-----------|------------|
| **MileIQ** | $5.99/mo | Automatic tracking, popular | Requires constant app usage, battery drain |
| **Everlance** | $8/mo | Auto-tracking + expenses | Complex UI, many upsells |
| **TripLog** | $6/mo | Fleet features | Overwhelming for individuals |
| **Stride** | Free | Simple, integrates with tax filing | Limited features, ad-supported |

### MilesFocus Competitive Advantages

1. **Historical Data Leverage** - Works with data users already have
2. **Privacy-First** - No continuous tracking, local processing option
3. **No Battery Drain** - Uses existing Google data vs. active GPS
4. **IRS-Ready Exports** - Purpose-built for tax compliance
5. **Transparent Pricing** - No hidden upsells or feature gates
6. **Educational Content** - Guides users on IRS requirements
7. **Smart Caching** - Minimizes API costs with multi-layer caching

### Target Market Segments

| Segment | Size | Willingness to Pay | Acquisition Channel |
|---------|------|-------------------|---------------------|
| Gig Workers (Uber, DoorDash) | Large | Medium | SEO, Reddit, Facebook Groups |
| Real Estate Agents | Medium | High | Industry blogs, LinkedIn |
| Sales Representatives | Medium | High | LinkedIn, cold outreach |
| Medical Professionals | Medium | High | Medical forums, associations |
| Small Business Owners | Large | High | Google Ads, accountant referrals |
| Freelancers/Consultants | Large | Medium | Product Hunt, Twitter |

---

## Success Metrics

### Key Performance Indicators (KPIs)

| Metric | Target (Month 6) | Target (Month 12) |
|--------|------------------|-------------------|
| Monthly Active Users | 500 | 2,000 |
| Free-to-Paid Conversion | 5% | 7% |
| Monthly Recurring Revenue | $2,000 | $6,000 |
| Churn Rate (Monthly) | < 8% | < 5% |
| NPS Score | > 40 | > 50 |
| Avg. Revenue Per User | $10 | $12 |

### Tracking Implementation

- Google Analytics 4 for user behavior
- Mixpanel/Amplitude for feature usage
- Stripe Dashboard for revenue metrics
- Customer surveys for NPS

---

## Risk Assessment

| Risk | Likelihood | Impact | Mitigation |
|------|------------|--------|------------|
| Google changes Timeline export format | Medium | High | Monitor Google updates, build format adapters |
| Google deprecates Timeline feature | Low | Critical | Diversify data sources (manual entry, GPS apps) |
| IRS changes record-keeping requirements | Low | Medium | Stay updated on IRS publications |
| Competitor copies approach | Medium | Medium | Build brand loyalty, add unique features |
| Low conversion to paid | Medium | High | A/B test pricing, add value to paid tiers |
| Geocoding API rate limits | Medium | Medium | Multi-layer caching, fallback to coordinates |

---

## Appendix A: Database Schema (Proposed)

```sql
-- Users table
users (
  id UUID PRIMARY KEY,
  email TEXT UNIQUE,
  created_at TIMESTAMP,
  subscription_tier TEXT DEFAULT 'free',
  subscription_status TEXT,
  stripe_customer_id TEXT
)

-- Trips table
trips (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  upload_id UUID REFERENCES uploads(id),
  date DATE,
  start_time TIMESTAMP,
  end_time TIMESTAMP,
  distance_miles DECIMAL,
  start_address TEXT,
  end_address TEXT,
  start_coord TEXT,
  end_coord TEXT,
  purpose TEXT,
  notes TEXT,
  vehicle_id UUID REFERENCES vehicles(id)
)

-- Uploads table
uploads (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  filename TEXT,
  trip_count INTEGER,
  uploaded_at TIMESTAMP
)

-- Vehicles table (Pro+ feature)
vehicles (
  id UUID PRIMARY KEY,
  user_id UUID REFERENCES users(id),
  name TEXT,
  make TEXT,
  model TEXT,
  year INTEGER
)
```

---

## Appendix B: User Journey Map

```
Discovery → Landing Page → Interactive Demo → Sign Up
    ↓
First Upload → Processing → Geocoding (with progress) → Trip Review → Categorization
    ↓
Export (Free: Watermarked) → Upgrade Prompt
    ↓
Upgrade to Pro → Cloud Storage → Historical Access
    ↓
Regular Usage → Monthly Reminders → Annual Reports → Renewal
```

---

## Appendix C: Deployment Architecture

```
Frontend (Vercel)
├── React 18 + TypeScript
├── Vite build system
├── Tailwind CSS + shadcn/ui
└── Client-side processing

External Services
├── LocationIQ API (geocoding, HTTP referrer restricted)
├── Vercel hosting (free tier, auto-deploy from GitHub)
└── GitHub repository (tektekgo/milesfocus)

Environment Configuration
├── VITE_LOCATIONIQ_API_KEY (Vercel env vars)
└── vercel.json (SPA routing rewrites)
```

---

## Next Steps

1. **Review & Prioritize** - Align on MVP feature set for SaaS launch
2. **Technical Scoping** - Detailed effort estimates for Phase 1
3. **Design Sprint** - UX/UI for authentication and dashboard flows
4. **Pricing Validation** - User surveys on willingness to pay
5. **Go-to-Market Planning** - Launch strategy and marketing channels

---

**Document prepared by:** MilesFocus Development Team  
**Contact:** [AI-Focus Technologies](https://www.ai-focus.org)  
**Repository:** [github.com/tektekgo/milesfocus](https://github.com/tektekgo/milesfocus)
