"use client";

import Loader from "@/components/Loader";
import { jwtDecode } from "jwt-decode";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";

interface DecodedToken {
  id: string;
  role: "admin" | "staff";
  iat: number;
  exp: number;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState<boolean | null>(null);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");

      // ✅ Always allow auth pages
      if (pathname.startsWith("/auth")) {
        setIsVerified(true);
        return;
      }

      if (!token) {
        setIsVerified(false);
        router.replace("/auth/login");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;

        if (decoded.exp < now || decoded.role !== "admin") {
          setIsVerified(false);
          router.replace("/auth/login");
          return;
        }

        setIsVerified(true);
      } catch (error) {
        console.log("Auth error:", error);
        localStorage.removeItem("token");
        localStorage.removeItem("role");
        localStorage.removeItem("userid");

        setIsVerified(false);
        router.replace("/auth/login");
      }
    };

    checkAuth();
  }, [pathname, router]);

  // ✅ null means "still checking", false means "unauthorized"
  if (isVerified === null) {
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="border-aqua" />
      </div>
    );
  }

  return <>{children}</>;
}
