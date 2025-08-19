"use client";

import { useEffect, useState } from "react";
import { useRouter, usePathname } from "next/navigation";
import { jwtDecode } from "jwt-decode";
import Loader from "@/components/Loader";

interface DecodedToken {
  id: string;
  role: "admin" | "staff";
  iat: number;
  exp: number;
}

export default function AuthGuard({ children }: { children: React.ReactNode }) {
  const [isVerified, setIsVerified] = useState(false);
  const router = useRouter();
  const pathname = usePathname();

  useEffect(() => {
    const checkAuth = () => {
      const token = localStorage.getItem("token");
      if (!token) {
        if (pathname.includes("auth")) {
          setIsVerified(true);
          return;
        }
        router.replace("/auth/login");
        return;
      }

      try {
        const decoded: DecodedToken = jwtDecode(token);
        const now = Date.now() / 1000;
        if (decoded.exp < now || decoded.role !== "admin") {
          router.replace("/auth/login");
          return;
        }
        if (pathname.includes("auth")) {
          router.replace("/");
          setIsVerified(true);
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

  if (!isVerified)
    return (
      <div className="flex items-center justify-center h-screen">
        <Loader className="border-aqua" />
      </div>
    );

  return <>{children}</>;
}
