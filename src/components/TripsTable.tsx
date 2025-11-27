import { useState } from "react";
import { NormalizedTrip, TripPurpose } from "@/types/trip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";
import { Checkbox } from "@/components/ui/checkbox";
import { Button } from "@/components/ui/button";
import { CheckSquare, ListFilter } from "lucide-react";

interface TripsTableProps {
  trips: NormalizedTrip[];
  onTripUpdate: (tripId: string, updates: Partial<NormalizedTrip>) => void;
  selectedMonth: string;
  showUnassignedOnly?: boolean;
  onToggleUnassignedOnly?: () => void;
}

const purposeOptions: TripPurpose[] = [
  "Unassigned",
  "Business",
  "Personal",
  "Medical",
  "Charitable",
  "Other",
];

const getPurposeColor = (purpose: TripPurpose) => {
  switch (purpose) {
    case "Business": return "bg-blue-500/10 text-blue-700 border-blue-300";
    case "Medical": return "bg-green-500/10 text-green-700 border-green-300";
    case "Charitable": return "bg-purple-500/10 text-purple-700 border-purple-300";
    case "Personal": return "bg-gray-500/10 text-gray-700 border-gray-300";
    case "Other": return "bg-orange-500/10 text-orange-700 border-orange-300";
    default: return "bg-yellow-500/10 text-yellow-700 border-yellow-300"; // Unassigned
  }
};

export const TripsTable = ({ trips, onTripUpdate, selectedMonth, showUnassignedOnly = false, onToggleUnassignedOnly }: TripsTableProps) => {
  const [selectedTripIds, setSelectedTripIds] = useState<Set<string>>(new Set());
  const [bulkPurpose, setBulkPurpose] = useState<TripPurpose>("Business");

  let filteredTrips = selectedMonth === "all" 
    ? trips 
    : trips.filter(t => t.date.startsWith(selectedMonth));
  
  if (showUnassignedOnly) {
    filteredTrips = filteredTrips.filter(t => t.purpose === "Unassigned");
  }

  const allSelected = filteredTrips.length > 0 && filteredTrips.every(trip => selectedTripIds.has(trip.id));
  const someSelected = selectedTripIds.size > 0 && !allSelected;

  const toggleSelectAll = () => {
    if (allSelected) {
      setSelectedTripIds(new Set());
    } else {
      setSelectedTripIds(new Set(filteredTrips.map(t => t.id)));
    }
  };

  const toggleTripSelection = (tripId: string) => {
    const newSelected = new Set(selectedTripIds);
    if (newSelected.has(tripId)) {
      newSelected.delete(tripId);
    } else {
      newSelected.add(tripId);
    }
    setSelectedTripIds(newSelected);
  };

  const handleBulkAssign = () => {
    selectedTripIds.forEach(tripId => {
      onTripUpdate(tripId, { purpose: bulkPurpose });
    });
    setSelectedTripIds(new Set());
  };

  const unassignedCount = (selectedMonth === "all" ? trips : trips.filter(t => t.date.startsWith(selectedMonth)))
    .filter(t => t.purpose === "Unassigned").length;

  return (
    <Card className="overflow-hidden">
      {/* Inline filter bar */}
      <div className="bg-muted/50 border-b px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
        <div className="flex items-center gap-2 text-sm text-muted-foreground">
          <span className="font-medium text-foreground">
            {filteredTrips.length} trip{filteredTrips.length !== 1 ? 's' : ''}
          </span>
          {selectedMonth !== "all" && (
            <span>in {selectedMonth}</span>
          )}
          {unassignedCount > 0 && (
            <span className="text-yellow-600 dark:text-yellow-500">
              ({unassignedCount} unassigned)
            </span>
          )}
        </div>
        {onToggleUnassignedOnly && (
          <Button 
            variant={showUnassignedOnly ? "default" : "outline"}
            onClick={onToggleUnassignedOnly}
            size="sm"
          >
            <ListFilter className="mr-2 h-4 w-4" />
            {showUnassignedOnly ? "Show All" : "Unassigned Only"}
          </Button>
        )}
      </div>
      
      {selectedTripIds.size > 0 && (
        <div className="bg-primary/10 border-b px-4 py-3 flex items-center justify-between gap-4 flex-wrap">
          <div className="flex items-center gap-3">
            <CheckSquare className="h-5 w-5 text-primary" />
            <span className="font-medium text-foreground">
              {selectedTripIds.size} trip{selectedTripIds.size !== 1 ? 's' : ''} selected
            </span>
          </div>
          <div className="flex items-center gap-3">
            <span className="text-sm text-muted-foreground">Assign purpose:</span>
            <Select value={bulkPurpose} onValueChange={(value) => setBulkPurpose(value as TripPurpose)}>
              <SelectTrigger className="w-[140px]">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                {purposeOptions.map(purpose => (
                  <SelectItem key={purpose} value={purpose}>
                    {purpose}
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
            <Button onClick={handleBulkAssign} size="sm">
              Apply to Selected
            </Button>
            <Button 
              onClick={() => setSelectedTripIds(new Set())} 
              variant="ghost" 
              size="sm"
            >
              Clear
            </Button>
          </div>
        </div>
      )}
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold w-[50px]">
                <Checkbox
                  checked={allSelected}
                  onCheckedChange={toggleSelectAll}
                  aria-label="Select all trips"
                  className="border-primary-foreground data-[state=checked]:bg-primary-foreground data-[state=checked]:text-primary"
                  ref={(el) => {
                    if (el) {
                      (el as any).indeterminate = someSelected;
                    }
                  }}
                />
              </TableHead>
              <TableHead className="text-primary-foreground font-semibold">Date</TableHead>
              <TableHead className="text-primary-foreground font-semibold">From</TableHead>
              <TableHead className="text-primary-foreground font-semibold">To</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Start Time</TableHead>
              <TableHead className="text-primary-foreground font-semibold">End Time</TableHead>
              <TableHead className="text-primary-foreground font-semibold text-right">Miles</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Purpose</TableHead>
              <TableHead className="text-primary-foreground font-semibold">Notes</TableHead>
            </TableRow>
          </TableHeader>
          <TableBody>
            {filteredTrips.map((trip, index) => (
              <TableRow key={trip.id} className={index % 2 === 0 ? "bg-background" : "bg-muted/30"}>
                <TableCell>
                  <Checkbox
                    checked={selectedTripIds.has(trip.id)}
                    onCheckedChange={() => toggleTripSelection(trip.id)}
                    aria-label={`Select trip on ${trip.date}`}
                  />
                </TableCell>
                <TableCell className="font-medium">{trip.date}</TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate" title={trip.startAddress}>
                  {trip.startAddress}
                </TableCell>
                <TableCell className="text-sm text-muted-foreground max-w-[200px] truncate" title={trip.endAddress}>
                  {trip.endAddress}
                </TableCell>
                <TableCell>{trip.startTimeLocal}</TableCell>
                <TableCell>{trip.endTimeLocal}</TableCell>
                <TableCell className="text-right font-mono">{trip.distanceMiles.toFixed(2)}</TableCell>
                <TableCell>
                  <Select
                    value={trip.purpose}
                    onValueChange={(value) => 
                      onTripUpdate(trip.id, { purpose: value as TripPurpose })
                    }
                  >
                    <SelectTrigger className={`w-[140px] ${getPurposeColor(trip.purpose)}`}>
                      <SelectValue />
                    </SelectTrigger>
                    <SelectContent className="bg-background">
                      {purposeOptions.map(purpose => (
                        <SelectItem key={purpose} value={purpose}>
                          {purpose}
                        </SelectItem>
                      ))}
                    </SelectContent>
                  </Select>
                </TableCell>
                <TableCell>
                  <Input
                    value={trip.notes}
                    onChange={(e) => onTripUpdate(trip.id, { notes: e.target.value })}
                    placeholder="Add notes..."
                    className="min-w-[200px]"
                  />
                </TableCell>
              </TableRow>
            ))}
            {filteredTrips.length === 0 && (
              <TableRow>
                <TableCell colSpan={9} className="text-center py-8 text-muted-foreground">
                  No trips found for the selected month.
                </TableCell>
              </TableRow>
            )}
          </TableBody>
        </Table>
      </div>
    </Card>
  );
};
