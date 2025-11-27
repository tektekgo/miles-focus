import { useState } from "react";
import { Header } from "@/components/Header";
import { FileUpload } from "@/components/FileUpload";
import { TripsTable } from "@/components/TripsTable";
import { MonthlySummary } from "@/components/MonthlySummary";
import { Button } from "@/components/ui/button";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Alert, AlertDescription } from "@/components/ui/alert";
import { Download, FileSpreadsheet, FileText, Filter, AlertCircle } from "lucide-react";
import { GoogleTimelineActivity, NormalizedTrip, TripPurpose } from "@/types/trip";
import { parseGoogleTimeline, calculateMonthlySummaries } from "@/utils/timelineParser";
import { exportToExcel } from "@/utils/excelExport";
import { exportToPDF } from "@/utils/pdfExport";
import { useToast } from "@/hooks/use-toast";

const Index = () => {
  const [rawData, setRawData] = useState<GoogleTimelineActivity[] | null>(null);
  const [trips, setTrips] = useState<NormalizedTrip[]>([]);
  const [selectedMonth, setSelectedMonth] = useState<string>("all");
  const [selectedPurposes, setSelectedPurposes] = useState<TripPurpose[]>(["Business", "Personal", "Medical", "Charitable", "Other"]);
  const [isGeocoding, setIsGeocoding] = useState(false);
  const [geocodingProgress, setGeocodingProgress] = useState({ current: 0, total: 0 });
  const { toast } = useToast();
  
  const allPurposes: TripPurpose[] = ["Business", "Personal", "Medical", "Charitable", "Other", "Unassigned"];

  const handleDataLoaded = async (data: GoogleTimelineActivity[]) => {
    setRawData(data);
    setIsGeocoding(true);
    
    toast({
      title: "Processing...",
      description: "Extracting trips and geocoding addresses...",
    });
    
    const parsedTrips = await parseGoogleTimeline(data, (current, total) => {
      setGeocodingProgress({ current, total });
    });
    
    setTrips(parsedTrips);
    setIsGeocoding(false);
    setGeocodingProgress({ current: 0, total: 0 });
    
    toast({
      title: "Trips Extracted!",
      description: `Found ${parsedTrips.length} driving trips in your timeline.`,
    });
  };

  const handleTripUpdate = (tripId: string, updates: Partial<NormalizedTrip>) => {
    setTrips(prev => 
      prev.map(trip => trip.id === tripId ? { ...trip, ...updates } : trip)
    );
  };

  const summaries = trips.length > 0 ? calculateMonthlySummaries(trips) : [];
  
  const availableMonths = ["all", ...summaries.map(s => s.month)];

  const handleExportExcel = () => {
    if (trips.length === 0) {
      toast({
        title: "No Data",
        description: "Please upload a timeline file first.",
        variant: "destructive",
      });
      return;
    }
    
    exportToExcel(trips, summaries, selectedMonth === "all" ? "" : selectedMonth, selectedPurposes);
    toast({
      title: "Excel Exported!",
      description: "Your mileage report has been downloaded.",
    });
  };

  const handleExportPDF = () => {
    if (trips.length === 0) {
      toast({
        title: "No Data",
        description: "Please upload a timeline file first.",
        variant: "destructive",
      });
      return;
    }
    
    exportToPDF(trips, summaries, selectedMonth === "all" ? "" : selectedMonth, selectedPurposes);
    toast({
      title: "PDF Exported!",
      description: "Your IRS-ready report has been downloaded.",
    });
  };
  
  const togglePurpose = (purpose: TripPurpose) => {
    setSelectedPurposes(prev => 
      prev.includes(purpose)
        ? prev.filter(p => p !== purpose)
        : [...prev, purpose]
    );
  };

  return (
    <div className="min-h-screen flex flex-col bg-background">
      <Header />
      
      <main className="flex-1 container mx-auto px-4 py-8">
        {!rawData ? (
          <div className="max-w-2xl mx-auto mt-12">
            <div className="text-center mb-8">
              <h2 className="text-3xl font-bold text-foreground mb-3">
                Welcome to MilesFocus
              </h2>
              <p className="text-lg text-muted-foreground">
                Extract and organize your driving mileage from Google Timeline
              </p>
            </div>
            <FileUpload onDataLoaded={handleDataLoaded} />
            
            <div className="mt-12 space-y-4 text-sm text-muted-foreground">
              <h3 className="font-semibold text-foreground">How it works:</h3>
              <ol className="list-decimal list-inside space-y-2 ml-2">
                <li>Export your Google Timeline data as JSON</li>
                <li>Upload the file using the form above</li>
                <li>Review and categorize your trips</li>
                <li>Export IRS-ready reports in PDF or Excel format</li>
              </ol>
            </div>
          </div>
        ) : (
          <div className="space-y-6">
            {isGeocoding && (
              <div className="bg-card border rounded-lg p-6">
                <div className="flex items-center gap-4">
                  <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-primary"></div>
                  <div className="flex-1">
                    <h3 className="font-semibold text-foreground mb-1">
                      Geocoding Addresses...
                    </h3>
                    <p className="text-sm text-muted-foreground">
                      Processing {geocodingProgress.current} of {geocodingProgress.total} addresses
                    </p>
                    <div className="mt-2 w-full bg-muted rounded-full h-2">
                      <div 
                        className="bg-primary h-2 rounded-full transition-all duration-300"
                        style={{ 
                          width: `${geocodingProgress.total > 0 ? (geocodingProgress.current / geocodingProgress.total) * 100 : 0}%` 
                        }}
                      />
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {!isGeocoding && (
              <Alert className="bg-primary/10 border-primary">
                <AlertCircle className="h-5 w-5 text-primary" />
                <AlertDescription className="text-base font-medium text-foreground ml-2">
                  <strong>Important:</strong> Select a purpose for each trip row below. Only trips with assigned purposes will be included in your exports.
                </AlertDescription>
              </Alert>
            )}
            
            <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4">
              <div>
                <h2 className="text-2xl font-bold text-foreground">Your Trips</h2>
                <p className="text-muted-foreground">
                  {trips.length} driving trips extracted
                </p>
              </div>
              
              <div className="flex flex-wrap items-center gap-3">
                <Select value={selectedMonth} onValueChange={setSelectedMonth}>
                  <SelectTrigger className="w-[180px]">
                    <SelectValue placeholder="Select month" />
                  </SelectTrigger>
                  <SelectContent>
                    {availableMonths.map(month => (
                      <SelectItem key={month} value={month}>
                        {month === "all" ? "All Months" : month}
                      </SelectItem>
                    ))}
                  </SelectContent>
                </Select>
                
                <Popover>
                  <PopoverTrigger asChild>
                    <Button variant="outline" size="default">
                      <Filter className="mr-2 h-4 w-4" />
                      Purposes ({selectedPurposes.length})
                    </Button>
                  </PopoverTrigger>
                  <PopoverContent className="w-56" align="start">
                    <div className="space-y-2">
                      <h4 className="font-semibold text-sm">Export Purposes</h4>
                      {allPurposes.map(purpose => (
                        <div key={purpose} className="flex items-center space-x-2">
                          <Checkbox
                            id={purpose}
                            checked={selectedPurposes.includes(purpose)}
                            onCheckedChange={() => togglePurpose(purpose)}
                          />
                          <label
                            htmlFor={purpose}
                            className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70 cursor-pointer"
                          >
                            {purpose}
                          </label>
                        </div>
                      ))}
                    </div>
                  </PopoverContent>
                </Popover>
                
                <Button onClick={handleExportExcel} variant="outline">
                  <FileSpreadsheet className="mr-2 h-4 w-4" />
                  Export Excel
                </Button>
                
                <Button onClick={handleExportPDF} variant="default">
                  <FileText className="mr-2 h-4 w-4" />
                  Export IRS PDF
                </Button>
              </div>
            </div>

            <MonthlySummary summaries={summaries} selectedMonth={selectedMonth} />
            
            <TripsTable 
              trips={trips} 
              onTripUpdate={handleTripUpdate}
              selectedMonth={selectedMonth}
            />

            <div className="flex justify-center pt-4">
              <Button
                variant="ghost"
                onClick={() => {
                  setRawData(null);
                  setTrips([]);
                  setSelectedMonth("all");
                }}
              >
                Upload Different File
              </Button>
            </div>
          </div>
        )}
      </main>

      <footer className="border-t py-6 bg-card">
        <div className="container mx-auto px-4 text-center text-sm text-muted-foreground">
          <p>© 2025 AI-Focus Technologies • MilesFocus</p>
          <p className="mt-1">Your data is processed locally and never leaves your device.</p>
        </div>
      </footer>
    </div>
  );
};

export default Index;
