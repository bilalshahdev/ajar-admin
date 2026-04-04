import { Skeleton } from "@/components/ui/skeleton";
import ChartCard from "../dashboard/ChartCard";

const SeasonalChartSkeleton = () => {
  return (
    <ChartCard className="w-full space-y-4">
      {/* Header */}
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-3 w-16" />
          <Skeleton className="h-5 w-40" />
        </div>
        <div className="flex flex-col items-end space-y-1">
          <Skeleton className="h-3 w-10" />
          <Skeleton className="h-5 w-14" />
        </div>
      </div>

      {/* Inner Card */}
      <ChartCard className="bg-card border p-4 space-y-4">
        {/* Simulated grouped bar chart — 12 months, 4 bars each */}
        <div className="h-[280px] w-full flex items-end justify-between gap-1">
          {Array.from({ length: 12 }).map((_, month) => (
            <div key={month} className="flex items-end gap-[2px] flex-1">
              {Array.from({ length: 4 }).map((_, week) => (
                <Skeleton
                  key={week}
                  className="flex-1 rounded-sm"
                  style={{
                    height: `${50 + Math.random() * 180}px`,
                    opacity: 1 - week * 0.2,
                  }}
                />
              ))}
            </div>
          ))}
        </div>

        {/* X-axis month labels */}
        <div className="flex justify-between">
          {["Jan","Feb","Mar","Apr","May","Jun","Jul","Aug","Sep","Oct","Nov","Dec"].map((m) => (
            <Skeleton key={m} className="h-3 w-5" />
          ))}
        </div>

        {/* Legend */}
        <div className="flex items-center gap-4 pt-1">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex items-center gap-1.5">
              <Skeleton className="h-2 w-2 rounded-full" />
              <Skeleton className="h-3 w-10" />
            </div>
          ))}
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default SeasonalChartSkeleton;