"use client";

import StatsSkeleton from "../skeletons/StatsSkeleton";
import RevenueLineChartSkeleton from "../skeletons/RevenueLineChartSkeleton";
import RevenueBreakdownBarSkeleton from "../skeletons/RevenueBreakdownBarSkeleton";
import { Skeleton } from "@/components/ui/skeleton";

const AnalyticsSkeleton = () => {
  return (
    <div className="space-y-6 p-4">
      <div className="flex justify-end">
        <Skeleton className="h-10 w-40 rounded-md" />
      </div>
      <StatsSkeleton length={4} className="lg:grid-cols-4" />
      <RevenueLineChartSkeleton />
      <div className="grid grid-cols-1 md:grid-cols- gap-4">
        <RevenueBreakdownBarSkeleton />
      </div>
    </div>
  );
};

export default AnalyticsSkeleton;
