"use client";

import { Skeleton } from "@/components/ui/skeleton";

const PushNotificationFormSkeleton = () => {
  return (
    <div className="space-y-4">
      <div className="grid md:grid-cols-2 gap-4">
        {Array.from({ length: 6 }).map((_, i) => (
          <div key={i} className="space-y-2 border p-4 rounded-md">
            <div className="flex justify-between items-center">
              <Skeleton className="h-4 w-40" />
              <Skeleton className="h-6 w-10" />
            </div>
            <Skeleton className="h-20 w-full" />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default PushNotificationFormSkeleton;
