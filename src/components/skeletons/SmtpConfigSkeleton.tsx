import { Skeleton } from "@/components/ui/skeleton";

const SmtpConfigSkeleton = () => {
  return (
    <div className="border rounded-md p-4">
      {/* Tabs */}
      <div className="flex gap-4 mb-4">
        <Skeleton className="h-8 w-28 rounded-md" />
        <Skeleton className="h-8 w-28 rounded-md" />
      </div>

      {/* SMTP Config Form */}
      <div className="space-y-6 mt-4">
        <Skeleton className="h-6 w-40" />
        <div className="grid md:grid-cols-2 gap-4">
          {Array.from({ length: 8 }).map((_, i) => (
            <div key={i} className="space-y-2">
              <Skeleton className="h-4 w-32" />
              <Skeleton className="h-10 w-full" />
            </div>
          ))}
        </div>
        <div className="flex justify-end">
          <Skeleton className="h-10 w-32" />
        </div>
      </div>
    </div>
  );
};

export default SmtpConfigSkeleton;
