"use client";

import { Skeleton } from "@/components/ui/skeleton";

const MapApiFormSkeleton = () => {
  return (
    <div className="space-y-6">
      <div className="grid md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-40" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-48" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      </div>

      <div className="flex justify-end">
        <Skeleton className="h-10 w-24" /> {/* Button */}
      </div>
    </div>
  );
};

export default MapApiFormSkeleton;
