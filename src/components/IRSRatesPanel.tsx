import { useState } from "react";
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import { ExternalLink, Edit, Check, X } from "lucide-react";
import { CURRENT_IRS_RATES, IRS_RATES_SOURCE_URL, formatRate, IRSRates } from "@/config/irsRates";

interface IRSRatesPanelProps {
  customRates: IRSRates | null;
  onRatesChange: (rates: IRSRates | null) => void;
}

export const IRSRatesPanel = ({ customRates, onRatesChange }: IRSRatesPanelProps) => {
  const [isEditing, setIsEditing] = useState(false);
  const [editedRates, setEditedRates] = useState<IRSRates>(customRates || CURRENT_IRS_RATES);
  
  const activeRates = customRates || CURRENT_IRS_RATES;
  const isCustom = customRates !== null;
  
  const handleEdit = () => {
    setEditedRates(activeRates);
    setIsEditing(true);
  };
  
  const handleSave = () => {
    onRatesChange(editedRates);
    setIsEditing(false);
  };
  
  const handleCancel = () => {
    setEditedRates(activeRates);
    setIsEditing(false);
  };
  
  const handleReset = () => {
    onRatesChange(null);
    setIsEditing(false);
  };
  
  return (
    <Card className="border-primary/20">
      <CardHeader>
        <div className="flex items-start justify-between">
          <div>
            <CardTitle className="text-xl text-primary">
              {isCustom ? "Custom Mileage Rates" : `IRS Standard Mileage Rates (Currently ${CURRENT_IRS_RATES.year} Official Rates)`}
            </CardTitle>
            <CardDescription>
              Rates used for calculating estimated deductions
            </CardDescription>
          </div>
          <div className="flex gap-2">
            {!isEditing && (
              <Button
                variant="outline"
                size="sm"
                onClick={handleEdit}
              >
                <Edit className="h-4 w-4 mr-1" />
                Edit Rates
              </Button>
            )}
            {isCustom && !isEditing && (
              <Button
                variant="ghost"
                size="sm"
                onClick={handleReset}
              >
                Reset to Official
              </Button>
            )}
          </div>
        </div>
      </CardHeader>
      <CardContent className="space-y-4">
        {isEditing ? (
          <div className="space-y-4">
            <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
              <div className="space-y-2">
                <Label htmlFor="business-rate">Business (per mile)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">$</span>
                  <Input
                    id="business-rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={editedRates.business}
                    onChange={(e) => setEditedRates({ ...editedRates, business: parseFloat(e.target.value) || 0 })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="medical-rate">Medical / Moving (per mile)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">$</span>
                  <Input
                    id="medical-rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={editedRates.medical}
                    onChange={(e) => setEditedRates({ ...editedRates, medical: parseFloat(e.target.value) || 0 })}
                    className="flex-1"
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="charitable-rate">Charitable (per mile)</Label>
                <div className="flex items-center gap-2">
                  <span className="text-lg">$</span>
                  <Input
                    id="charitable-rate"
                    type="number"
                    step="0.01"
                    min="0"
                    max="10"
                    value={editedRates.charitable}
                    onChange={(e) => setEditedRates({ ...editedRates, charitable: parseFloat(e.target.value) || 0 })}
                    className="flex-1"
                  />
                </div>
              </div>
            </div>
            <div className="flex gap-2">
              <Button onClick={handleSave} size="sm">
                <Check className="h-4 w-4 mr-1" />
                Save Custom Rates
              </Button>
              <Button onClick={handleCancel} variant="outline" size="sm">
                <X className="h-4 w-4 mr-1" />
                Cancel
              </Button>
            </div>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Business</div>
              <div className="text-2xl font-bold text-primary">
                {formatRate(activeRates.business)} per mile
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Medical / Moving</div>
              <div className="text-2xl font-bold text-primary">
                {formatRate(activeRates.medical)} per mile
              </div>
            </div>
            <div className="p-4 bg-muted/50 rounded-lg">
              <div className="text-sm text-muted-foreground mb-1">Charitable</div>
              <div className="text-2xl font-bold text-primary">
                {formatRate(activeRates.charitable)} per mile
              </div>
            </div>
          </div>
        )}
        
        {!isEditing && (
          <div className="flex items-center justify-between pt-2 border-t">
            <p className="text-sm text-muted-foreground">
              {isCustom 
                ? "Using custom rates for calculations."
                : "Rates will automatically update when the IRS publishes new values."}
            </p>
            {!isCustom && (
              <a 
                href={IRS_RATES_SOURCE_URL}
                target="_blank"
                rel="noopener noreferrer"
                className="text-sm text-primary hover:underline flex items-center gap-1"
              >
                Official IRS Source
                <ExternalLink className="h-3 w-3" />
              </a>
            )}
          </div>
        )}
      </CardContent>
    </Card>
  );
};
