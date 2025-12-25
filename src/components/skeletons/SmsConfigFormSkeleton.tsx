import { Skeleton } from "@/components/ui/skeleton";

const SmsConfigFormSkeleton = () => {
  return (
    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
      {/* Twilio */}
      <div className="border p-4 rounded shadow space-y-4">
        <Skeleton className="h-5 w-20" /> {/* section title */}
        <Skeleton className="h-6 w-28" /> {/* switch */}
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* label */}
            <Skeleton className="h-10 w-full" /> {/* input */}
          </div>
        ))}
      </div>

      {/* 2Factor */}
      <div className="border p-4 rounded shadow space-y-4">
        <Skeleton className="h-5 w-20" />
        <Skeleton className="h-6 w-28" /> {/* switch */}
        <div className="space-y-2">
          <Skeleton className="h-4 w-32" />
          <Skeleton className="h-10 w-full" />
        </div>
      </div>

      <div className="col-span-full flex justify-end mt-6">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};

export default SmsConfigFormSkeleton;
