import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURRENT_IRS_RATES, calculateDeduction, formatRate, IRSRates } from "@/config/irsRates";
import { TrendingUp, TrendingDown, ArrowRight } from "lucide-react";

interface DeductionComparisonProps {
  businessMiles: number;
  customRates: IRSRates;
}

export const DeductionComparison = ({ businessMiles, customRates }: DeductionComparisonProps) => {
  const officialDeduction = calculateDeduction(businessMiles, CURRENT_IRS_RATES.business);
  const customDeduction = calculateDeduction(businessMiles, customRates.business);
  const difference = customDeduction - officialDeduction;
  const percentDifference = officialDeduction > 0 ? ((difference / officialDeduction) * 100) : 0;
  
  const isHigher = difference > 0;
  const isEqual = Math.abs(difference) < 0.01;
  
  return (
    <Card className="border-primary/20 bg-gradient-to-br from-primary/5 to-accent/5">
      <CardHeader>
        <CardTitle className="text-xl text-primary flex items-center gap-2">
          <ArrowRight className="h-5 w-5" />
          Rate Comparison Analysis
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {/* Official IRS Rate */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Official IRS Rate ({CURRENT_IRS_RATES.year})
            </div>
            <div className="p-4 bg-background rounded-lg border border-border">
              <div className="text-xs text-muted-foreground mb-1">
                Rate: {formatRate(CURRENT_IRS_RATES.business)}/mile
              </div>
              <div className="text-2xl font-bold text-foreground">
                ${officialDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {businessMiles.toFixed(2)} miles × {formatRate(CURRENT_IRS_RATES.business)}
              </div>
            </div>
          </div>

          {/* Custom Rate */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Your Custom Rate
            </div>
            <div className="p-4 bg-primary/5 rounded-lg border border-primary/20">
              <div className="text-xs text-muted-foreground mb-1">
                Rate: {formatRate(customRates.business)}/mile
              </div>
              <div className="text-2xl font-bold text-primary">
                ${customDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
              </div>
              <div className="text-xs text-muted-foreground mt-1">
                {businessMiles.toFixed(2)} miles × {formatRate(customRates.business)}
              </div>
            </div>
          </div>

          {/* Difference */}
          <div className="space-y-2">
            <div className="text-sm font-medium text-muted-foreground">
              Difference
            </div>
            <div className={`p-4 rounded-lg border ${
              isEqual 
                ? 'bg-muted/50 border-border' 
                : isHigher 
                  ? 'bg-green-50 dark:bg-green-950/20 border-green-200 dark:border-green-800' 
                  : 'bg-orange-50 dark:bg-orange-950/20 border-orange-200 dark:border-orange-800'
            }`}>
              <div className="flex items-center gap-2 mb-1">
                {!isEqual && (
                  isHigher ? (
                    <TrendingUp className="h-4 w-4 text-green-600 dark:text-green-400" />
                  ) : (
                    <TrendingDown className="h-4 w-4 text-orange-600 dark:text-orange-400" />
                  )
                )}
                <span className="text-xs text-muted-foreground">
                  {isEqual ? 'Same' : isHigher ? 'Higher' : 'Lower'}
                </span>
              </div>
              <div className={`text-2xl font-bold ${
                isEqual 
                  ? 'text-muted-foreground' 
                  : isHigher 
                    ? 'text-green-600 dark:text-green-400' 
                    : 'text-orange-600 dark:text-orange-400'
              }`}>
                {isEqual ? '$0.00' : (
                  <>
                    {isHigher ? '+' : ''}${Math.abs(difference).toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
                  </>
                )}
              </div>
              {!isEqual && (
                <div className="text-xs text-muted-foreground mt-1">
                  {Math.abs(percentDifference).toFixed(1)}% {isHigher ? 'more' : 'less'}
                </div>
              )}
            </div>
          </div>
        </div>

        <div className="mt-4 p-3 bg-muted/30 rounded-lg">
          <p className="text-sm text-muted-foreground">
            <strong className="text-foreground">Note:</strong> {
              isEqual 
                ? 'Your custom rate matches the official IRS rate.' 
                : isHigher 
                  ? 'Your custom rate results in a higher deduction than the official IRS rate. Ensure this is appropriate for your situation.' 
                  : 'Your custom rate results in a lower deduction than the official IRS rate. This may be more conservative.'
            } Always consult a tax professional for guidance.
          </p>
        </div>
      </CardContent>
    </Card>
  );
};
