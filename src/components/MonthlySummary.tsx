import { MonthlySummary as MonthlySummaryType } from "@/types/trip";
import { Card } from "@/components/ui/card";
import { Briefcase, User, Heart, Gift, FileText, Car } from "lucide-react";

interface MonthlySummaryProps {
  summaries: MonthlySummaryType[];
  selectedMonth: string;
}

export const MonthlySummary = ({ summaries, selectedMonth }: MonthlySummaryProps) => {
  const currentSummary = selectedMonth === "all"
    ? summaries.reduce((acc, curr) => ({
        month: "All",
        businessMiles: acc.businessMiles + curr.businessMiles,
        personalMiles: acc.personalMiles + curr.personalMiles,
        medicalMiles: acc.medicalMiles + curr.medicalMiles,
        charitableMiles: acc.charitableMiles + curr.charitableMiles,
        otherMiles: acc.otherMiles + curr.otherMiles,
        totalMiles: acc.totalMiles + curr.totalMiles,
      }), {
        month: "All",
        businessMiles: 0,
        personalMiles: 0,
        medicalMiles: 0,
        charitableMiles: 0,
        otherMiles: 0,
        totalMiles: 0,
      })
    : summaries.find(s => s.month === selectedMonth) || {
        month: selectedMonth,
        businessMiles: 0,
        personalMiles: 0,
        medicalMiles: 0,
        charitableMiles: 0,
        otherMiles: 0,
        totalMiles: 0,
      };

  const stats = [
    { 
      label: "Business", 
      value: currentSummary.businessMiles, 
      icon: Briefcase,
      color: "text-primary" 
    },
    { 
      label: "Personal", 
      value: currentSummary.personalMiles, 
      icon: User,
      color: "text-secondary" 
    },
    { 
      label: "Medical", 
      value: currentSummary.medicalMiles, 
      icon: Heart,
      color: "text-destructive" 
    },
    { 
      label: "Charitable", 
      value: currentSummary.charitableMiles, 
      icon: Gift,
      color: "text-accent" 
    },
    { 
      label: "Other", 
      value: currentSummary.otherMiles, 
      icon: FileText,
      color: "text-muted-foreground" 
    },
  ];

  return (
    <div className="space-y-6">
      <Card className="p-6 bg-gradient-to-br from-primary to-primary/90 text-primary-foreground">
        <div className="flex items-center gap-3 mb-2">
          <Car className="h-6 w-6" />
          <h3 className="text-lg font-semibold">Total Mileage</h3>
        </div>
        <p className="text-4xl font-bold">{currentSummary.totalMiles.toFixed(2)} mi</p>
        <p className="text-sm text-primary-foreground/80 mt-1">
          {selectedMonth === "all" ? "All Time" : currentSummary.month}
        </p>
      </Card>

      <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-5 gap-4">
        {stats.map((stat) => {
          const Icon = stat.icon;
          return (
            <Card key={stat.label} className="p-4">
              <div className={`flex items-center gap-2 mb-2 ${stat.color}`}>
                <Icon className="h-4 w-4" />
                <p className="text-sm font-medium">{stat.label}</p>
              </div>
              <p className="text-2xl font-bold">{stat.value.toFixed(2)}</p>
              <p className="text-xs text-muted-foreground">miles</p>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
