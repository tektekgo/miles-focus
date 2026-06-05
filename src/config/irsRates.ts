/**
 * IRS Standard Mileage Rates
 * Source: https://www.irs.gov/tax-professionals/standard-mileage-rates
 *
 * To add a new tax year, add an entry to IRS_RATES_BY_YEAR and update CURRENT_YEAR.
 */

export interface IRSRates {
  year: number;
  business: number; // Rate per mile
  medical: number;  // Rate per mile (also applies to moving)
  charitable: number; // Rate per mile
}

export const IRS_RATES_BY_YEAR: Record<number, IRSRates> = {
  2026: { year: 2026, business: 0.725, medical: 0.205, charitable: 0.14 },
  2025: { year: 2025, business: 0.70,  medical: 0.21,  charitable: 0.14 },
  2024: { year: 2024, business: 0.67,  medical: 0.21,  charitable: 0.14 },
  2023: { year: 2023, business: 0.655, medical: 0.22,  charitable: 0.14 },
  2022: { year: 2022, business: 0.625, medical: 0.22,  charitable: 0.14 },
};

export const CURRENT_YEAR = 2026;
export const CURRENT_IRS_RATES: IRSRates = IRS_RATES_BY_YEAR[CURRENT_YEAR];

export const AVAILABLE_YEARS = Object.keys(IRS_RATES_BY_YEAR)
  .map(Number)
  .sort((a, b) => b - a);

export function getRatesForYear(year: number): IRSRates {
  return IRS_RATES_BY_YEAR[year] || CURRENT_IRS_RATES;
}

export const IRS_RATES_SOURCE_URL = "https://www.irs.gov/tax-professionals/standard-mileage-rates";

/**
 * Calculate estimated deduction based on miles and rate
 */
export function calculateDeduction(miles: number, ratePerMile: number): number {
  return miles * ratePerMile;
}

/**
 * Format rate for display (e.g., 0.70 -> "70¢", 0.725 -> "72.5¢")
 */
export function formatRate(rate: number): string {
  const cents = rate * 100;
  const rounded = Math.round(cents * 10) / 10;
  return `${rounded % 1 === 0 ? rounded.toFixed(0) : rounded.toFixed(1)}¢`;
}
