import { Skeleton } from "@/components/ui/skeleton";

type TableSkeletonProps = {
  cols?: number;
  rows?: number;
};

const TableSkeleton = ({ cols = 6, rows = 12 }: TableSkeletonProps) => {
  return (
    <div className="border rounded-xl overflow-hidden w-full">
      <div className="grid grid-cols-1">
        {/* Table Header */}
        <div className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] bg-muted/40 p-2 gap-2">
          {Array.from({ length: cols }).map((_, colIndex) => (
            <Skeleton key={colIndex} className="h-4 w-full" />
          ))}
        </div>

        {/* Table Rows */}
        {Array.from({ length: rows }).map((_, rowIndex) => (
          <div
            key={rowIndex}
            className="grid grid-cols-[repeat(auto-fit,minmax(100px,1fr))] border-t p-2 items-center gap-2"
          >
            {Array.from({ length: cols }).map((_, colIndex) => (
              <Skeleton key={colIndex} className="h-4 w-full" />
            ))}
          </div>
        ))}
      </div>
    </div>
  );
};

export default TableSkeleton;
