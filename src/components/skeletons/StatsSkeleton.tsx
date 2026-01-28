import { Skeleton } from "@/components/ui/skeleton";
import { cn } from "@/lib/utils";

const StatsSkeleton = ({
  length = 6,
  className,
}: {
  length?: number;
  className?: string;
}) => {
  const placeholderCards = Array.from({ length });

  return (
    <div
      className={cn(
        "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4",
        className
      )}
    >
      {placeholderCards.map((_, index) => (
        <div
          key={index}
          className="flex items-center justify-between rounded-2xl border bg-white dark:bg-zinc-900 p-4 shadow-sm"
        >
          <div className="space-y-2">
            <Skeleton className="h-4 w-24" />
            <Skeleton className="h-6 w-16" />
          </div>
          <Skeleton className="h-10 w-10 rounded-full" />
        </div>
      ))}
    </div>
  );
};

export default StatsSkeleton;
