import { useState, useMemo } from "react";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { TripPurpose } from "@/types/trip";
import { CURRENT_IRS_RATES, calculateDeduction, formatRate } from "@/config/irsRates";
import { DollarSign, RefreshCw } from "lucide-react";

const SAMPLE_TRIPS = [
  {
    id: "1",
    date: "2025-01-15",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "456 Client Ave, Cambridge, MA",
    distanceMiles: 12.5,
    purpose: "Business" as TripPurpose,
  },
  {
    id: "2",
    date: "2025-01-16",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "789 Doctor Rd, Brookline, MA",
    distanceMiles: 8.3,
    purpose: "Medical" as TripPurpose,
  },
  {
    id: "3",
    date: "2025-01-17",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "321 Office Park, Newton, MA",
    distanceMiles: 15.7,
    purpose: "Business" as TripPurpose,
  },
  {
    id: "4",
    date: "2025-01-18",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "555 Mall Dr, Dedham, MA",
    distanceMiles: 11.2,
    purpose: "Personal" as TripPurpose,
  },
  {
    id: "5",
    date: "2025-01-19",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "Food Bank, 789 Charity Ln, Somerville, MA",
    distanceMiles: 6.8,
    purpose: "Charitable" as TripPurpose,
  },
  {
    id: "6",
    date: "2025-01-20",
    startAddress: "123 Main St, Boston, MA",
    endAddress: "890 Conference Center, Waltham, MA",
    distanceMiles: 18.4,
    purpose: "Business" as TripPurpose,
  },
];

export const DemoViewer = () => {
  const [trips, setTrips] = useState(SAMPLE_TRIPS);

  const summary = useMemo(() => {
    const businessMiles = trips.filter(t => t.purpose === "Business").reduce((sum, t) => sum + t.distanceMiles, 0);
    const medicalMiles = trips.filter(t => t.purpose === "Medical").reduce((sum, t) => sum + t.distanceMiles, 0);
    const charitableMiles = trips.filter(t => t.purpose === "Charitable").reduce((sum, t) => sum + t.distanceMiles, 0);
    const personalMiles = trips.filter(t => t.purpose === "Personal").reduce((sum, t) => sum + t.distanceMiles, 0);
    const totalMiles = trips.reduce((sum, t) => sum + t.distanceMiles, 0);
    
    return {
      businessMiles,
      medicalMiles,
      charitableMiles,
      personalMiles,
      totalMiles,
      businessDeduction: calculateDeduction(businessMiles, CURRENT_IRS_RATES.business),
    };
  }, [trips]);

  const handlePurposeChange = (tripId: string, newPurpose: TripPurpose) => {
    setTrips(prev => prev.map(trip => 
      trip.id === tripId ? { ...trip, purpose: newPurpose } : trip
    ));
  };

  const resetDemo = () => {
    setTrips(SAMPLE_TRIPS);
  };

  const getPurposeColor = (purpose: TripPurpose) => {
    switch (purpose) {
      case "Business": return "bg-blue-500/10 text-blue-700 border-blue-300";
      case "Medical": return "bg-green-500/10 text-green-700 border-green-300";
      case "Charitable": return "bg-purple-500/10 text-purple-700 border-purple-300";
      case "Personal": return "bg-gray-500/10 text-gray-700 border-gray-300";
      default: return "bg-orange-500/10 text-orange-700 border-orange-300";
    }
  };

  return (
    <div className="space-y-6 animate-fade-in">
      {/* Demo Header */}
      <div className="flex items-center justify-between">
        <div>
          <h3 className="text-2xl font-bold">Interactive Demo</h3>
          <p className="text-sm text-muted-foreground">
            Try changing trip purposes to see calculations update in real-time
          </p>
        </div>
        <Button variant="outline" size="sm" onClick={resetDemo} className="gap-2">
          <RefreshCw className="h-4 w-4" />
          Reset
        </Button>
      </div>

      {/* Summary Cards */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        <Card className="bg-blue-50 border-blue-200">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-blue-900">Business Miles</p>
            <p className="text-3xl font-bold text-blue-700">{summary.businessMiles.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card className="bg-green-50 border-green-200">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-green-900">Medical Miles</p>
            <p className="text-3xl font-bold text-green-700">{summary.medicalMiles.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card className="bg-purple-50 border-purple-200">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-purple-900">Charitable Miles</p>
            <p className="text-3xl font-bold text-purple-700">{summary.charitableMiles.toFixed(1)}</p>
          </CardContent>
        </Card>
        <Card className="bg-primary/10 border-primary/30">
          <CardContent className="pt-6">
            <p className="text-sm font-semibold text-primary">Total Miles</p>
            <p className="text-3xl font-bold text-primary">{summary.totalMiles.toFixed(1)}</p>
          </CardContent>
        </Card>
      </div>

      {/* Estimated Deduction */}
      <Card className="border-primary/20 bg-gradient-to-r from-primary/5 to-primary/10">
        <CardHeader>
          <CardTitle className="flex items-center gap-2 text-primary">
            <DollarSign className="h-5 w-5" />
            Estimated Business Deduction
          </CardTitle>
        </CardHeader>
        <CardContent>
          <div className="text-4xl font-bold text-primary mb-2 transition-all duration-300">
            ${summary.businessDeduction.toLocaleString('en-US', { minimumFractionDigits: 2, maximumFractionDigits: 2 })}
          </div>
          <p className="text-sm text-muted-foreground">
            Based on 2025 IRS standard mileage rate ({formatRate(CURRENT_IRS_RATES.business)}/mile)
          </p>
        </CardContent>
      </Card>

      {/* Trips Table */}
      <Card>
        <CardHeader>
          <CardTitle>Sample Trips</CardTitle>
        </CardHeader>
        <CardContent>
          <div className="overflow-x-auto">
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Date</TableHead>
                  <TableHead>From → To</TableHead>
                  <TableHead className="text-right">Miles</TableHead>
                  <TableHead>Purpose</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {trips.map((trip) => (
                  <TableRow key={trip.id} className="transition-colors">
                    <TableCell className="font-medium">{trip.date}</TableCell>
                    <TableCell className="text-sm">
                      <div className="max-w-xs">
                        <p className="truncate text-muted-foreground">{trip.startAddress}</p>
                        <p className="truncate font-semibold">→ {trip.endAddress}</p>
                      </div>
                    </TableCell>
                    <TableCell className="text-right font-semibold">
                      {trip.distanceMiles.toFixed(1)}
                    </TableCell>
                    <TableCell>
                      <Select
                        value={trip.purpose}
                        onValueChange={(value) => handlePurposeChange(trip.id, value as TripPurpose)}
                      >
                        <SelectTrigger className={`w-[140px] ${getPurposeColor(trip.purpose)}`}>
                          <SelectValue />
                        </SelectTrigger>
                        <SelectContent className="bg-background">
                          <SelectItem value="Business">Business</SelectItem>
                          <SelectItem value="Personal">Personal</SelectItem>
                          <SelectItem value="Medical">Medical</SelectItem>
                          <SelectItem value="Charitable">Charitable</SelectItem>
                          <SelectItem value="Other">Other</SelectItem>
                        </SelectContent>
                      </Select>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
          </div>
        </CardContent>
      </Card>

      {/* Demo Notice */}
      <div className="text-center p-4 bg-muted/50 rounded-lg border">
        <p className="text-sm text-muted-foreground">
          This is a sample demonstration. <strong>Your actual data stays private</strong> and is processed only in your browser.
        </p>
      </div>
    </div>
  );
};
