"use client";

import { Skeleton } from "@/components/ui/skeleton";

const RecaptchaFormSkeleton = () => {
  return (
    <div className="space-y-6 border rounded-lg p-6">
      {/* Heading */}
      <Skeleton className="h-5 w-72" />

      {/* Switch */}
      <Skeleton className="h-6 w-20" />

      {/* Input Fields */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
        <div className="space-y-2">
          <Skeleton className="h-4 w-24" /> {/* Label */}
          <Skeleton className="h-10 w-full" /> {/* Input */}
        </div>
      </div>

      {/* Instructions list */}
      <div className="space-y-2">
        {Array.from({ length: 7 }).map((_, i) => (
          <Skeleton key={i} className="h-4 w-full" />
        ))}
      </div>

      {/* Save Button */}
      <div className="flex justify-end">
        <Skeleton className="h-10 w-24" />
      </div>
    </div>
  );
};

export default RecaptchaFormSkeleton;
