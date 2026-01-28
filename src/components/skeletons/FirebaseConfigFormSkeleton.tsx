"use client";

import { Skeleton } from "@/components/ui/skeleton";

const FirebaseConfigFormSkeleton = () => {
  return (
    <div className="space-y-6">
      {/* Service file content */}
      <div className="space-y-2">
        <Skeleton className="h-4 w-40" />
        <Skeleton className="h-10 w-full" />
      </div>

      {/* Other Inputs */}
      <div className="grid md:grid-cols-3 gap-4">
        {Array.from({ length: 7 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" />
            <Skeleton className="h-10 w-full" />
          </div>
        ))}
      </div>

      <div className="flex justify-end gap-2">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default FirebaseConfigFormSkeleton;
