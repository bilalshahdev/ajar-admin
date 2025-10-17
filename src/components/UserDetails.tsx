// /components/users/UserDetails.tsx
"use client";

import { Skeleton } from "@/components/ui/skeleton";
import { useGetUser } from "@/hooks/useUsers";
import DocumentsTab from "./DocumentsTab";

export default function UserDetailsLazy({ userId }: { userId: string }) {
  const { data, isLoading, error } = useGetUser(userId);

  if (isLoading) return <DetailsSkeleton />;
  if (error) return <div className="text-destructive">Failed to load user</div>;

  const user = data?.data;

  return (
    <DocumentsTab userId={user?._id || ""} documents={user?.documents ?? []} />
  );
}

const DetailsSkeleton = () => (
  <div className="space-y-4">
    <Skeleton className="h-6 w-48" />
    <Skeleton className="h-4 w-64" />
    <Skeleton className="h-10 w-full" />
  </div>
);
