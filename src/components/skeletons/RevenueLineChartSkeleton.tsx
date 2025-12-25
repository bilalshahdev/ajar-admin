"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent } from "@/components/ui/card";

export default function RevenueLineChartSkeleton() {
  return (
    <Card>
      <CardContent className="p-4">
        <div className="col-span-2 md:col-span-4">
          <div className="rounded-lg py-2 h-[300px] flex flex-col justify-between">
            <Skeleton className="h-full w-full rounded-lg opacity-70" />
          </div>
          <div className="mt-2 space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-3 w-48" />
            <Skeleton className="h-3 w-24" />
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
