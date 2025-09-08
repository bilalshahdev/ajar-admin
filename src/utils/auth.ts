// utils/auth.ts
import { navMenu, sidebarMenu } from "@/config/menu";
import { Permission } from "@/types";
import { jwtDecode } from "jwt-decode";

export interface DecodedToken {
  exp: number;
  userId: string;
  role: string;
}

export interface AuthInfo {
  token: string | null;
  expired: boolean;
  userId?: string;
  role?: string;
  permissions?: Permission[];
}

export function getAuthInfo(): AuthInfo {
  if (typeof window === "undefined")
    return {
      token: null,
      expired: true,
    };
  const token = localStorage.getItem("token");
  const permissions = localStorage.getItem("permissions");

  if (!token) {
    return {
      token: null,
      expired: true,
    };
  }

  try {
    const decoded: DecodedToken = jwtDecode(token);
    const now = Date.now() / 1000;

    const expired = decoded.exp < now;

    return {
      token,
      expired,
      userId: decoded.userId,
      role: decoded.role,
      permissions: JSON.parse(permissions || "[]"),
    };
  } catch (error) {
    console.error("Invalid token:", error);
    return {
      token: null,
      expired: true,
    };
  }
}

const adminOperations = ["create", "read", "update", "delete"];

export const getSidebarMenu = () => {
  const { role, permissions } = getAuthInfo();
  if (role === "admin") {
    return sidebarMenu;
  }

  return sidebarMenu.filter((menuItem) =>
    permissions?.some((perm: any) =>
      perm.access === "stats"
        ? menuItem.path === "/"
        : perm.access && menuItem.path?.includes(perm.access)
    )
  );
};

export const allowedOperations = (path: string) => {
  const { role, permissions } = getAuthInfo();
  if (role === "admin") {
    return adminOperations;
  }
  return permissions?.find(
    (perm: any) => perm.access && path?.includes(perm.access)
  )?.operations;
};

export const getNavMenu = () => {
  const { role, permissions } = getAuthInfo();
  if (role === "admin") {
    return navMenu;
  }
  return navMenu.filter((menuItem) =>
    permissions?.some(
      (perm: any) => perm.access && menuItem.path?.includes(perm.access)
    )
  );
};

interface StaffAccessResult {
  allowed: boolean;
  fallbackPath: string | null;
}

export const checkStaffAccess = (pathname: string): StaffAccessResult => {
  const { role } = getAuthInfo();

  if (role !== "staff") {
    return {
      allowed: true,
      fallbackPath: null,
    };
  }

  const menu = [getSidebarMenu(), getNavMenu()].flat();

  const baseMenuItem = menu.find((item) => pathname.includes(item.path));
  const hasBaseAccess = !!baseMenuItem;

  const operations = allowedOperations(pathname);

  const isAddPage = pathname.includes("/add");
  const isEditPage = pathname.includes("/edit");

  let allowed = false;

  if (hasBaseAccess) {
    if (isAddPage && operations?.includes("create")) {
      allowed = true;
    } else if (isEditPage && operations?.includes("update")) {
      allowed = true;
    } else if (!isAddPage && !isEditPage) {
      allowed = true;
    }
  }

  return {
    allowed,
    fallbackPath: allowed ? null : baseMenuItem?.path ?? menu[0].path,
  };
};
