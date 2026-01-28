"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Separator } from "@/components/ui/separator";

const TicketDetailSkeleton = () => {
  return (
    <div className="space-y-6">
      <Card>
        <CardHeader>
          <CardTitle className="text-xl font-semibold flex justify-between items-center">
            <Skeleton className="h-6 w-32" />
            <Skeleton className="h-6 w-20" />
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-6">
          {/* Booking Details */}
          <div>
            <Skeleton className="h-5 w-36 mb-2" />
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4">
              {Array.from({ length: 6 }).map((_, i) => (
                <Skeleton key={i} className="h-4 w-40" />
              ))}
            </div>
          </div>

          {/* User Info */}
          <div>
            <Skeleton className="h-5 w-32 mb-2" />
            <Separator className="my-2" />
            <div className="flex items-center gap-4">
              <Skeleton className="h-14 w-14 rounded-full" />
              <div className="space-y-2">
                <Skeleton className="h-4 w-32" />
                <Skeleton className="h-3 w-40" />
                <Skeleton className="h-3 w-36" />
              </div>
            </div>
          </div>

          {/* Issue */}
          <div>
            <Skeleton className="h-5 w-28 mb-2" />
            <Separator className="my-2" />
            <div className="space-y-2">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-56" />
              <Skeleton className="h-4 w-28" />
            </div>
          </div>

          {/* Meta */}
          <div>
            <Skeleton className="h-5 w-24 mb-2" />
            <Separator className="my-2" />
            <div className="grid grid-cols-2 gap-4">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-4 w-40" />
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
};

export default TicketDetailSkeleton;
