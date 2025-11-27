/**
 * IRS Standard Mileage Rates
 * Update these values annually when IRS publishes new rates
 * Source: https://www.irs.gov/tax-professionals/standard-mileage-rates
 */

export interface IRSRates {
  year: number;
  business: number; // Rate per mile
  medical: number;  // Rate per mile (also applies to moving)
  charitable: number; // Rate per mile
}

export const CURRENT_IRS_RATES: IRSRates = {
  year: 2025,
  business: 0.70,    // 70 cents per mile
  medical: 0.21,     // 21 cents per mile
  charitable: 0.14,  // 14 cents per mile
};

export const IRS_RATES_SOURCE_URL = "https://www.irs.gov/tax-professionals/standard-mileage-rates";

/**
 * Calculate estimated deduction based on miles and rate
 */
export function calculateDeduction(miles: number, ratePerMile: number): number {
  return miles * ratePerMile;
}

/**
 * Format rate for display (e.g., 0.70 -> "70¢")
 */
export function formatRate(rate: number): string {
  return `${Math.round(rate * 100)}¢`;
}
