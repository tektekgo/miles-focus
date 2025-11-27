import { Database, Globe, HardDrive, AlertTriangle, MapPin } from "lucide-react";
import { GeocodingStats as GeocodingStatsType } from "@/utils/timelineParser";
import { cn } from "@/lib/utils";

interface GeocodingStatsProps {
  stats: GeocodingStatsType;
  className?: string;
}

export const GeocodingStats = ({ stats, className }: GeocodingStatsProps) => {
  const { totalAddresses, uniqueAddresses, freshApiCalls, memoryCacheHits, browserCacheHits, errors } = stats;
  
  // Don't show if no geocoding happened
  if (totalAddresses === 0) return null;
  
  const items = [
    {
      icon: MapPin,
      label: "Total Addresses",
      value: totalAddresses,
      sublabel: `${uniqueAddresses} unique`,
      color: "text-muted-foreground",
      bgColor: "bg-muted/50",
    },
    {
      icon: Globe,
      label: "Fresh API Calls",
      value: freshApiCalls,
      sublabel: "New lookups",
      color: "text-emerald-600 dark:text-emerald-400",
      bgColor: "bg-emerald-50 dark:bg-emerald-950/30",
    },
    {
      icon: HardDrive,
      label: "Browser Cache",
      value: browserCacheHits,
      sublabel: "HTTP cached",
      color: "text-blue-600 dark:text-blue-400",
      bgColor: "bg-blue-50 dark:bg-blue-950/30",
    },
    {
      icon: Database,
      label: "Memory Cache",
      value: memoryCacheHits,
      sublabel: "Session cached",
      color: "text-purple-600 dark:text-purple-400",
      bgColor: "bg-purple-50 dark:bg-purple-950/30",
    },
  ];
  
  // Only show errors if there are any
  if (errors > 0) {
    items.push({
      icon: AlertTriangle,
      label: "Errors/Fallbacks",
      value: errors,
      sublabel: "Using coords",
      color: "text-amber-600 dark:text-amber-400",
      bgColor: "bg-amber-50 dark:bg-amber-950/30",
    });
  }
  
  return (
    <div className={cn("bg-card border rounded-lg p-4", className)}>
      <div className="flex items-center gap-2 mb-3">
        <MapPin className="h-4 w-4 text-primary" />
        <h4 className="font-medium text-sm text-foreground">Geocoding Summary</h4>
      </div>
      
      <div className="grid grid-cols-2 md:grid-cols-4 lg:grid-cols-5 gap-3">
        {items.map((item) => (
          <div 
            key={item.label}
            className={cn(
              "flex items-center gap-2 px-3 py-2 rounded-md",
              item.bgColor
            )}
          >
            <item.icon className={cn("h-4 w-4 flex-shrink-0", item.color)} />
            <div className="min-w-0">
              <div className={cn("text-lg font-semibold leading-none", item.color)}>
                {item.value}
              </div>
              <div className="text-xs text-muted-foreground truncate mt-0.5">
                {item.sublabel}
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <p className="text-xs text-muted-foreground mt-3">
        {browserCacheHits > 0 && freshApiCalls === 0 
          ? "✨ All addresses loaded from browser cache (instant)" 
          : freshApiCalls > 0 
            ? `🌐 ${freshApiCalls} new address${freshApiCalls > 1 ? 'es' : ''} fetched from LocationIQ API`
            : memoryCacheHits > 0 
              ? "💾 All addresses loaded from session memory"
              : "📍 Addresses shown as coordinates (no API key configured)"
        }
      </p>
    </div>
  );
};
