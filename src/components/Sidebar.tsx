"use client";

import {
  Sidebar as SidebarComponent,
  SidebarContent,
  SidebarFooter,
  SidebarGroup,
  SidebarHeader,
  SidebarMenu,
  SidebarMenuButton,
  SidebarMenuItem,
  useSidebar,
} from "@/components/ui/sidebar";
import { cn } from "@/lib/utils";
import { NavMenuItem } from "@/types";
import { getSidebarMenu } from "@/utils/auth";
import getDirection from "@/utils/getDirection";
import { Power } from "lucide-react";
import { useLocale } from "next-intl";
import Link from "next/link";
import { usePathname, useRouter } from "next/navigation";
import { useEffect, useState } from "react";
import Brand from "./Brand";
import ConfirmDialog from "./ConfirmDialog";
import GradientIcon from "./GradientIcon";

export default function Sidebar({ className }: { className?: string }) {
  const router = useRouter();
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
  const sidebarMenu = getSidebarMenu();
  const locale = useLocale();
  const isMenuActive = (path: string) => {
    const targetPath = `/${locale}${path === "/" ? "" : path}`;
    if (path === "/") {
      return pathname === `/${locale}` || pathname === `/${locale}/`;
    }
    return pathname.startsWith(targetPath);
  };

  useEffect(() => {
    if (pathname !== currentPath) {
      setCurrentPath(pathname);
      if (isMobile && openMobile && !isLogoutDialogOpen) {
        setOpenMobile(false);
      }
    }
  }, [
    pathname,
    currentPath,
    isMobile,
    openMobile,
    setOpenMobile,
    isLogoutDialogOpen,
  ]);

  const dir = getDirection(locale);
  const bgColor = dir === "rtl" ? "bg-aqua" : "bg-blue";

  const handleConfirm = () => {
    localStorage.removeItem("token");
    localStorage.removeItem("permissions");
    router.replace("/auth/login");
  };

  return (
    <SidebarComponent
      className={cn("", className)}
      collapsible="icon"
      variant="sidebar"
      dir={dir}
    >
      <SidebarHeader className={cn("h-16", bgColor)}>
        <div className="h-full flex items-center">
          <Brand />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between bg-background">
        <SidebarGroup className="overflow-y-auto">
          <SidebarMenu className="flex flex-col">
            {sidebarMenu.map(({ icon: Icon, path, title }: NavMenuItem) => (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  tooltip={title}
                  isActive={isMenuActive(path)}
                  asChild
                  className={
                    isMenuActive(path)
                      ? "bg-gradient-to-b from-blue-500/20 to-aqua/20"
                      : "hover:bg-gradient-to-b from-blue-500/20 to-aqua/20"
                  }
                >
                  <Link href={path} className="flex items-center gap-2">
                    {isMenuActive(path) ? (
                      <GradientIcon icon={<Icon />} />
                    ) : (
                      <Icon size={20} className="text-foreground/50" />
                    )}
                    <span>{title}</span>
                  </Link>
                </SidebarMenuButton>
              </SidebarMenuItem>
            ))}
          </SidebarMenu>
        </SidebarGroup>

        {/* Sidebar Footer for Logout */}
        <SidebarFooter>
          <ConfirmDialog
            title="Logout"
            description="Are you sure you want to logout?"
            onConfirm={() => handleConfirm()}
            variant="destructive"
            asChild
          >
            <SidebarMenuButton className="bg-red-500 hover:bg-red-600 hover:text-white text-white transition-colors">
              <Power size={16} /> <span>Logout</span>
            </SidebarMenuButton>
          </ConfirmDialog>
        </SidebarFooter>
      </SidebarContent>
    </SidebarComponent>
  );
}
