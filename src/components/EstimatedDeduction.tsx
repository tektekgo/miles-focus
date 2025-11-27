import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { CURRENT_IRS_RATES, calculateDeduction, formatRate } from "@/config/irsRates";
import { DollarSign } from "lucide-react";

interface EstimatedDeductionProps {
  businessMiles: number;
}

export const EstimatedDeduction = ({ businessMiles }: EstimatedDeductionProps) => {
  const deduction = calculateDeduction(businessMiles, CURRENT_IRS_RATES.business);
  
  return (
    <Card className="border-primary/20 bg-primary/5">
      <CardHeader>
        <CardTitle className="flex items-center gap-2 text-primary">
          <DollarSign className="h-5 w-5" />
          Estimated Business Mileage Deduction
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="text-4xl font-bold text-primary mb-2">
          ${deduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
        </div>
        <p className="text-sm text-muted-foreground">
          Based on {CURRENT_IRS_RATES.year} IRS Standard Mileage Rate ({formatRate(CURRENT_IRS_RATES.business)}/mile)
        </p>
        <p className="text-xs text-muted-foreground mt-2 italic">
          This is an estimate only. Consult a tax professional for personalized guidance.
        </p>
      </CardContent>
    </Card>
  );
};
