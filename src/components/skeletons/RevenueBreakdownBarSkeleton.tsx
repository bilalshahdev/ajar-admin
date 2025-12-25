"use client";

import { Card, CardContent } from "@/components/ui/card";
import { Skeleton } from "@/components/ui/skeleton";

export default function RevenueBreakdownBarSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        {/* Header */}
        <div className="flex justify-between mb-4">
          <div>
            <Skeleton className="h-4 w-40 mb-2" />
            <Skeleton className="h-3 w-28" />
          </div>
        </div>

        {/* Chart Skeleton */}
        <div className="relative h-[220px] flex items-end justify-between space-x-16 m-8">
          {Array.from({ length: 4 }).map((_, i) => (
            <div key={i} className="flex flex-col items-center flex-1">
              {/* Bar */}
              <Skeleton
                className="w-full rounded-t-md"
                style={{
                  height: `${Math.floor(Math.random() * 120) + 40}px`, // random heights for realism
                }}
              />
              {/* Label */}
              <Skeleton className="h-3 w-20 mt-2" />
            </div>
          ))}
        </div>
      </CardContent>
    </Card>
  );
}
