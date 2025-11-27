import { useState } from "react";
import { NormalizedTrip, TripPurpose } from "@/types/trip";
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Input } from "@/components/ui/input";
import { Card } from "@/components/ui/card";

interface TripsTableProps {
  trips: NormalizedTrip[];
  onTripUpdate: (tripId: string, updates: Partial<NormalizedTrip>) => void;
  selectedMonth: string;
}

const purposeOptions: TripPurpose[] = [
  "Unassigned",
  "Business",
  "Personal",
  "Medical",
  "Charitable",
  "Other",
];

export const TripsTable = ({ trips, onTripUpdate, selectedMonth }: TripsTableProps) => {
  const filteredTrips = selectedMonth === "all" 
    ? trips 
    : trips.filter(t => t.date.startsWith(selectedMonth));

  return (
    <Card className="overflow-hidden">
      <div className="overflow-x-auto">
        <Table>
          <TableHeader>
            <TableRow className="bg-primary hover:bg-primary">
              <TableHead className="text-primary-foreground font-semibold">Date</TableHead>
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
                <TableCell className="font-medium">{trip.date}</TableCell>
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
                <TableCell colSpan={6} className="text-center py-8 text-muted-foreground">
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
