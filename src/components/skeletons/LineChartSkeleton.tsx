import { Skeleton } from "@/components/ui/skeleton";
import ChartCard from "../dashboard/ChartCard";

const LineChartSkeleton = () => {
  return (
    <ChartCard className="space-y-4 h-full">
      <div className="flex items-center justify-between">
        <div className="flex flex-col space-y-1">
          <Skeleton className="h-3 w-20" />
          <Skeleton className="h-5 w-32" />
        </div>
      </div>

      <ChartCard className="bg-card border p-0">
        <div className="flex items-center gap-2 border-b p-2">
          <Skeleton className="h-4 w-4 rounded-full" />
          <Skeleton className="h-4 w-16" />
        </div>

        <div className="p-4 space-y-4">
          <div className="space-y-2">
            <Skeleton className="h-5 w-24" /> {/* H4 */}
            <Skeleton className="h-4 w-32" /> {/* Small */}
          </div>
          <div className="h-[200px] w-full">
            <Skeleton className="h-full w-full" /> {/* Chart area */}
          </div>
          <div className="space-y-1">
            <Skeleton className="h-4 w-28" />
            <Skeleton className="h-3 w-20" />
          </div>
        </div>
      </ChartCard>
    </ChartCard>
  );
};

export default LineChartSkeleton;
