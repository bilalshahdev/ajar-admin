import { Skeleton } from "@/components/ui/skeleton";

const StatsSkeleton = () => {
  const placeholderCards = Array.from({ length: 6 });

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
      {placeholderCards.map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-2xl border bg-white dark:bg-zinc-900 p-4 shadow-sm"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" /> {/* Title */}
            <Skeleton className="h-6 w-16" /> {/* Value */}
          </div>
          <Skeleton className="h-10 w-10 rounded-full" /> {/* Icon circle */}
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
