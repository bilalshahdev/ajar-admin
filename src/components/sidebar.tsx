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
import { sidebarMenu } from "@/config/menu";
import { Power } from "lucide-react";
import Link from "next/link";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";
import { NavMenuItem } from "@/types";
import Brand from "./brand";
import GradientIcon from "./gradient-icon";
import { useLocale } from "next-intl";

export default function Sidebar() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);
const locale = useLocale();
  const isMenuActive = (path: string) => {
    return pathname === `/${locale}${path == "/" ? "" : path}`;
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

  return (
    <SidebarComponent collapsible="icon" variant="sidebar">
      <SidebarHeader className="h-16 bg-blue">
        <div className="h-full flex items-center">
          <Brand />
        </div>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between bg-background">
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-2">
            {sidebarMenu.map(({ icon: Icon, path, title }: NavMenuItem) => (
              <SidebarMenuItem key={path}>
                <SidebarMenuButton
                  tooltip={title}
                  isActive={isMenuActive(path)}
                  asChild
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
          <SidebarMenuButton
            className="bg-red-500 hover:bg-red-600 hover:text-white text-white transition-colors"
            onClick={() => setIsLogoutDialogOpen(true)}
          >
            <Power size={16} /> <span>Logout</span>
          </SidebarMenuButton>
        </SidebarFooter>
      </SidebarContent>
    </SidebarComponent>
  );
}
