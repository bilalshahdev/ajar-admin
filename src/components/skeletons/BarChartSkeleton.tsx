import { Skeleton } from "@/components/ui/skeleton";
import ChartCard from "../dashboard/ChartCard";

const BarChartSkeleton = () => {
  return (
    <ChartCard className="space-y-4 h-full">
      {/* Header */}
      <div className="flex items-center justify-between capitalize">
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-3 w-24" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      {/* Inner Card */}
      <ChartCard className="bg-card border p-0">
        {/* Title Bar */}
        <div className="flex items-center gap-2 border-b p-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        {/* Chart Section */}
        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-28" />
            <Skeleton className="h-4 w-32" />
          </div>

          {/* Simulated Bar Chart */}
          <div className="h-[200px] w-full flex justify-between items-end gap-2">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton
                key={i}
                className="w-8 rounded-md bg-muted"
                style={{ height: `${40 + Math.random() * 150}px` }}
              />
            ))}
          </div>

          {/* Footer Trend Info */}
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default BarChartSkeleton;
