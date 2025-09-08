"use client";

import Loader from "@/components/Loader";
import { useUser } from "@/hooks/useAuth";
import { checkStaffAccess, getAuthInfo } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  const { refetch, isFetching } = useUser();

  useEffect(() => {
    const checkAuth = async () => {
      const { token, expired, role } = getAuthInfo();

      if (pathname.startsWith("/auth")) {
        setIsVerified(true);
        return;
      }

      if (!token || expired) {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
        toast.error("Your session has expired. Please login again.");
        router.replace("/auth/login");
        setIsVerified(false);
        return;
      }

      try {
        const user = await refetch();
        const permissions = user?.data?.data?.user?.allowAccess?.permissions;

        if (role === "staff") {
          if (permissions) {
            console.log("inside if of allow user permission");
            localStorage.setItem("permissions", JSON.stringify(permissions));
          }

          const { allowed, fallbackPath } = checkStaffAccess(pathname);
          if (!allowed && fallbackPath) {
            router.replace(fallbackPath);
            toast.error("You are not allowed to access this page.");
            return;
          }
        }

        setIsVerified(true);
      } catch (err) {
        setIsVerified(false);
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");
        router.replace("/auth/login");
      }
    };

    checkAuth();
  }, [pathname, router, refetch]);

  if (isVerified === null || isFetching) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="border-aqua" />
      </div>
    );
  }

  return <>{children}</>;
}
