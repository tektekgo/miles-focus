import { AlertCircle } from "lucide-react";

export const Footer = () => {
  return (
    <footer className="bg-muted/30 border-t mt-12">
      <div className="container mx-auto px-4 py-8">
        <div className="flex items-start gap-3 p-4 bg-background rounded-lg border border-muted">
          <AlertCircle className="h-5 w-5 text-muted-foreground mt-0.5 flex-shrink-0" />
          <div className="text-sm text-muted-foreground space-y-1">
            <p className="font-semibold text-foreground">Legal Disclaimer</p>
            <p>
              MilesFocus provides mileage calculations based on publicly available IRS mileage rates.
              This tool does not provide tax, legal, or financial advice.
              All deduction amounts shown are estimates only.
              Please consult a qualified tax professional for personalized guidance.
            </p>
          </div>
        </div>
        <div className="text-center text-sm text-muted-foreground mt-6">
          © {new Date().getFullYear()} AI-Focus Technologies. All rights reserved.
        </div>
      </div>
    </footer>
  );
};
