import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { ExternalLink } from "lucide-react";
import { CURRENT_IRS_RATES, IRS_RATES_SOURCE_URL, formatRate } from "@/config/irsRates";

export const IRSRatesPanel = () => {
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <CardTitle className="text-xl text-primary">
          IRS Standard Mileage Rates (Currently {CURRENT_IRS_RATES.year} Official Rates)
        </CardTitle>
        <CardDescription>
          Rates used for calculating estimated deductions
        </CardDescription>
      </CardHeader>
      <CardContent className="space-y-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Business</div>
            <div className="text-2xl font-bold text-primary">
              {formatRate(CURRENT_IRS_RATES.business)} per mile
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Medical / Moving</div>
            <div className="text-2xl font-bold text-primary">
              {formatRate(CURRENT_IRS_RATES.medical)} per mile
            </div>
          </div>
          <div className="p-4 bg-muted/50 rounded-lg">
            <div className="text-sm text-muted-foreground mb-1">Charitable</div>
            <div className="text-2xl font-bold text-primary">
              {formatRate(CURRENT_IRS_RATES.charitable)} per mile
            </div>
          </div>
        </div>
        
        <div className="flex items-center justify-between pt-2 border-t">
          <p className="text-sm text-muted-foreground">
            Rates will automatically update when the IRS publishes new values.
          </p>
          <a 
            href={IRS_RATES_SOURCE_URL}
            target="_blank"
            rel="noopener noreferrer"
            className="text-sm text-primary hover:underline flex items-center gap-1"
          >
            Official IRS Source
            <ExternalLink className="h-3 w-3" />
          </a>
        </div>
      </CardContent>
    </Card>
  );
};
