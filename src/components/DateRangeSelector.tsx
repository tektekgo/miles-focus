import { useState } from "react";
import { Button } from "@/components/ui/button";
import { Popover, PopoverContent, PopoverTrigger } from "@/components/ui/popover";
import { Checkbox } from "@/components/ui/checkbox";
import { Calendar, ChevronDown } from "lucide-react";
import { cn } from "@/lib/utils";

export interface DateRange {
  type: "all" | "month" | "months" | "quarter" | "ytd" | "days" | "taxYear";
  value: string | string[] | number;
  label: string;
}

interface DateRangeSelectorProps {
  availableMonths: string[];
  selectedRange: DateRange;
  onRangeChange: (range: DateRange) => void;
}

const getCurrentYear = () => new Date().getFullYear();
const getCurrentMonth = () => new Date().getMonth(); // 0-indexed

export const DateRangeSelector = ({
  availableMonths,
  selectedRange,
  onRangeChange,
}: DateRangeSelectorProps) => {
  const [open, setOpen] = useState(false);
  const [activeTab, setActiveTab] = useState<string>("presets");
  const [selectedMonths, setSelectedMonths] = useState<string[]>([]);

  // Filter out "all" from available months for multi-select
  const monthsOnly = availableMonths.filter(m => m !== "all");

  // Get unique years from available months
  const availableYears = [...new Set(monthsOnly.map(m => {
    const parts = m.split(" ");
    return parseInt(parts[1]);
  }))].sort((a, b) => b - a);

  const handlePresetSelect = (range: DateRange) => {
    onRangeChange(range);
    setOpen(false);
  };

  const handleMonthToggle = (month: string) => {
    const newSelection = selectedMonths.includes(month)
      ? selectedMonths.filter(m => m !== month)
      : [...selectedMonths, month];
    setSelectedMonths(newSelection);
  };

  const applyMultiMonthSelection = () => {
    if (selectedMonths.length === 0) {
      onRangeChange({ type: "all", value: "all", label: "All Months" });
    } else if (selectedMonths.length === 1) {
      onRangeChange({ type: "month", value: selectedMonths[0], label: selectedMonths[0] });
    } else {
      onRangeChange({ 
        type: "months", 
        value: selectedMonths, 
        label: `${selectedMonths.length} months selected` 
      });
    }
    setOpen(false);
  };

  // Calculate quarter months based on available data
  const getQuarterMonths = (quarter: number, year: number): string[] => {
    const quarterMonthMap: Record<number, string[]> = {
      1: ["January", "February", "March"],
      2: ["April", "May", "June"],
      3: ["July", "August", "September"],
      4: ["October", "November", "December"],
    };
    return quarterMonthMap[quarter].map(m => `${m} ${year}`).filter(m => monthsOnly.includes(m));
  };

  // Get YTD months
  const getYTDMonths = (year: number): string[] => {
    const currentMonth = getCurrentMonth();
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    const ytdMonths: string[] = [];
    for (let i = 0; i <= currentMonth; i++) {
      const monthStr = `${monthNames[i]} ${year}`;
      if (monthsOnly.includes(monthStr)) {
        ytdMonths.push(monthStr);
      }
    }
    return ytdMonths;
  };

  // Get tax year months (previous year for tax filing)
  const getTaxYearMonths = (year: number): string[] => {
    const monthNames = ["January", "February", "March", "April", "May", "June", 
                        "July", "August", "September", "October", "November", "December"];
    return monthNames.map(m => `${m} ${year}`).filter(m => monthsOnly.includes(m));
  };

  const tabs = [
    { id: "presets", label: "Quick Select" },
    { id: "months", label: "By Month" },
    { id: "quarters", label: "Quarters" },
    { id: "custom", label: "Custom" },
  ];

  return (
    <Popover open={open} onOpenChange={setOpen}>
      <PopoverTrigger asChild>
        <Button variant="outline" className="w-[220px] justify-between">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4" />
            <span className="truncate">{selectedRange.label}</span>
          </div>
          <ChevronDown className="h-4 w-4 opacity-50" />
        </Button>
      </PopoverTrigger>
      <PopoverContent className="w-[340px] p-0" align="start">
        {/* Tab Navigation */}
        <div className="flex border-b">
          {tabs.map(tab => (
            <button
              key={tab.id}
              onClick={() => setActiveTab(tab.id)}
              className={cn(
                "flex-1 px-3 py-2 text-sm font-medium transition-colors",
                activeTab === tab.id
                  ? "border-b-2 border-primary text-primary"
                  : "text-muted-foreground hover:text-foreground"
              )}
            >
              {tab.label}
            </button>
          ))}
        </div>

        <div className="p-3 max-h-[320px] overflow-y-auto">
          {/* Presets Tab */}
          {activeTab === "presets" && (
            <div className="space-y-2">
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handlePresetSelect({ type: "all", value: "all", label: "All Months" })}
              >
                All Months
              </Button>
              
              <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                Recent
              </div>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handlePresetSelect({ type: "days", value: 30, label: "Last 30 Days" })}
              >
                Last 30 Days
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handlePresetSelect({ type: "days", value: 60, label: "Last 60 Days" })}
              >
                Last 60 Days
              </Button>
              <Button
                variant="ghost"
                className="w-full justify-start"
                onClick={() => handlePresetSelect({ type: "days", value: 90, label: "Last 90 Days" })}
              >
                Last 90 Days
              </Button>

              {availableYears.length > 0 && (
                <>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                    Year to Date
                  </div>
                  {availableYears.slice(0, 2).map(year => {
                    const ytdMonths = getYTDMonths(year);
                    if (ytdMonths.length === 0) return null;
                    return (
                      <Button
                        key={`ytd-${year}`}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handlePresetSelect({ 
                          type: "ytd", 
                          value: ytdMonths, 
                          label: `YTD ${year}` 
                        })}
                      >
                        YTD {year} ({ytdMonths.length} months)
                      </Button>
                    );
                  })}
                </>
              )}

              {availableYears.length > 0 && (
                <>
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider pt-2">
                    Tax Year
                  </div>
                  {availableYears.slice(0, 2).map(year => {
                    const taxMonths = getTaxYearMonths(year);
                    if (taxMonths.length === 0) return null;
                    return (
                      <Button
                        key={`tax-${year}`}
                        variant="ghost"
                        className="w-full justify-start"
                        onClick={() => handlePresetSelect({ 
                          type: "taxYear", 
                          value: taxMonths, 
                          label: `Tax Year ${year}` 
                        })}
                      >
                        Tax Year {year} ({taxMonths.length} months)
                      </Button>
                    );
                  })}
                </>
              )}
            </div>
          )}

          {/* Single Month Tab */}
          {activeTab === "months" && (
            <div className="space-y-1">
              {monthsOnly.length === 0 ? (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No months available
                </p>
              ) : (
                monthsOnly.map(month => (
                  <Button
                    key={month}
                    variant="ghost"
                    className={cn(
                      "w-full justify-start",
                      selectedRange.type === "month" && selectedRange.value === month && "bg-primary/10"
                    )}
                    onClick={() => handlePresetSelect({ type: "month", value: month, label: month })}
                  >
                    {month}
                  </Button>
                ))
              )}
            </div>
          )}

          {/* Quarters Tab */}
          {activeTab === "quarters" && (
            <div className="space-y-3">
              {availableYears.map(year => (
                <div key={year} className="space-y-1">
                  <div className="text-xs font-semibold text-muted-foreground uppercase tracking-wider">
                    {year}
                  </div>
                  <div className="grid grid-cols-2 gap-2">
                    {[1, 2, 3, 4].map(q => {
                      const qMonths = getQuarterMonths(q, year);
                      if (qMonths.length === 0) return null;
                      return (
                        <Button
                          key={`q${q}-${year}`}
                          variant="outline"
                          size="sm"
                          className="justify-start"
                          onClick={() => handlePresetSelect({ 
                            type: "quarter", 
                            value: qMonths, 
                            label: `Q${q} ${year}` 
                          })}
                        >
                          Q{q} ({qMonths.length} mo)
                        </Button>
                      );
                    })}
                  </div>
                </div>
              ))}
              {availableYears.length === 0 && (
                <p className="text-sm text-muted-foreground py-4 text-center">
                  No quarters available
                </p>
              )}
            </div>
          )}

          {/* Custom Multi-Month Tab */}
          {activeTab === "custom" && (
            <div className="space-y-3">
              <p className="text-sm text-muted-foreground">
                Select multiple months:
              </p>
              <div className="space-y-2 max-h-[200px] overflow-y-auto">
                {monthsOnly.map(month => (
                  <div key={month} className="flex items-center space-x-2">
                    <Checkbox
                      id={`multi-${month}`}
                      checked={selectedMonths.includes(month)}
                      onCheckedChange={() => handleMonthToggle(month)}
                    />
                    <label
                      htmlFor={`multi-${month}`}
                      className="text-sm cursor-pointer flex-1"
                    >
                      {month}
                    </label>
                  </div>
                ))}
              </div>
              <Button 
                className="w-full" 
                onClick={applyMultiMonthSelection}
                disabled={selectedMonths.length === 0}
              >
                Apply Selection ({selectedMonths.length})
              </Button>
            </div>
          )}
        </div>
      </PopoverContent>
    </Popover>
  );
};
