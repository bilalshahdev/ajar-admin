import { Skeleton } from "@/components/ui/skeleton";

const PaymentSettingsSkeleton = () => {
  return (
    <div className="space-y-8">
      {/* Toggles */}
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {Array.from({ length: 3 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* label */}
            <Skeleton className="h-10 w-full" /> {/* switch */}
          </div>
        ))}
      </div>

      {/* Stripe Details */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {Array.from({ length: 5 }).map((_, i) => (
          <div key={i} className="space-y-2">
            <Skeleton className="h-4 w-32" /> {/* label */}
            <Skeleton className="h-10 w-full" /> {/* input */}
          </div>
        ))}
      </div>

      {/* Action Buttons */}
      <div className="flex gap-4 mt-6 justify-end">
        <Skeleton className="h-10 w-32" />
      </div>
    </div>
  );
};

export default PaymentSettingsSkeleton;
