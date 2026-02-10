"use client";

import Loader from "@/components/Loader";
import { useUser } from "@/hooks/useAuth";
import {
  checkStaffAccess,
  getAuthInfo,
} from "@/utils/auth";
import { consumeLogoutFlag } from "@/utils/auth";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { toast } from "sonner";

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const [didFetch, setDidFetch] = useState(false);
  const router = useRouter();
  const pathname = usePathname();
  const toastShownRef = useRef(false);

  const { refetch, isFetching } = useUser();

  // ✅ Check if current path is an auth page (ignoring locale prefix)
  const isAuthPage = pathname.includes("/auth/");

  useEffect(() => {
    const checkAuth = async () => {
      // ✅ 1. Early return if on login or signup pages
      if (isAuthPage) {
        setIsVerified(true);
        return;
      }

      const { token, expired, role } = getAuthInfo();

      // 🚪 No token → silent redirect
      if (!token) {
        router.replace("/auth/login");
        setIsVerified(false);
        return;
      }

      // ⏰ Expired token
      if (expired) {
        localStorage.removeItem("token");
        localStorage.removeItem("permissions");

        const isIntentionalLogout = consumeLogoutFlag();

        if (!isIntentionalLogout && !toastShownRef.current) {
          toast.error("Your session has expired. Please login again.");
          toastShownRef.current = true;
        }

        router.replace("/auth/login");
        setIsVerified(false);
        return;
      }

      // ✅ Fetch user only once
      if (!didFetch) {
        try {
          const user = await refetch();
          const permissions = user?.data?.data?.user?.allowAccess?.permissions;

          if (role === "staff" && permissions) {
            localStorage.setItem("permissions", JSON.stringify(permissions));
          }
          setDidFetch(true);
        } catch {
          router.replace("/auth/login");
          setIsVerified(false);
          return;
        }
      }

      // 🔐 Staff access check
      if (role === "staff") {
        const { allowed, fallbackPath } = checkStaffAccess(pathname);
        if (!allowed && fallbackPath) {
          router.replace(fallbackPath);
          return;
        }
      }

      setIsVerified(true);
    };

    checkAuth();
  }, [pathname, router, refetch, didFetch, isAuthPage]);

  // ✅ 2. Loader visibility logic
  if (isVerified === null || (isFetching && !isAuthPage)) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader />
      </div>
    );
  }

  return <>{children}</>;
}