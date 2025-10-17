import { Skeleton } from "@/components/ui/skeleton";

export function SocialConfigFormSkeleton() {
  return (
    <div className="space-y-8">
      {/* Google Section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" /> {/* Section Title */}
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" /> {/* Client ID */}
          <Skeleton className="h-10 w-full" /> {/* Client Secret */}
          <Skeleton className="h-6 w-12" /> {/* Enable Switch */}
        </div>
      </div>

      {/* Facebook Section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" /> {/* App ID */}
          <Skeleton className="h-10 w-full" /> {/* App Secret */}
          <Skeleton className="h-6 w-12" /> {/* Enable Switch */}
        </div>
      </div>

      {/* Apple Section */}
      <div>
        <Skeleton className="h-6 w-32 mb-4" />
        <div className="space-y-3">
          <Skeleton className="h-10 w-full" /> {/* Service ID */}
          <Skeleton className="h-10 w-full" /> {/* Team ID */}
          <Skeleton className="h-10 w-full" /> {/* Key ID */}
          <Skeleton className="h-10 w-full" /> {/* Private Key */}
          <Skeleton className="h-6 w-12" /> {/* Enable Switch */}
        </div>
      </div>
    </div>
  );
}
