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
import { useEffect, useState } from "react";
import MyImage from "./my-image";

export default function Sidebar() {
  const pathname = usePathname();
  const [currentPath, setCurrentPath] = useState(pathname);
  const { openMobile, setOpenMobile, isMobile } = useSidebar();

  const [isLogoutDialogOpen, setIsLogoutDialogOpen] = useState(false);

  const isMenuActive = (path: string) => {
    return pathname === path;
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
      <SidebarHeader className="h-16 bg-signature">
        <Link href="/" className={`h-full flex items-center`}>
          <SidebarMenuButton className="text-xl hover:bg-transparent cursor-pointer">
            <MyImage
              src="/images/brand.png"
              width={100}
              height={100}
              alt="logo"
              className="invert brightness-0"
            />
          </SidebarMenuButton>
        </Link>
      </SidebarHeader>
      <SidebarContent className="flex flex-col justify-between my-2">
        <SidebarGroup>
          <SidebarMenu className="flex flex-col gap-2">
            {sidebarMenu.map((item: NavMenuItem) => (
              <SidebarMenuItem key={item.path}>
                <SidebarMenuButton
                  tooltip={item.title}
                  isActive={isMenuActive(item.path)}
                  asChild
                >
                  <Link href={item.path}>
                    <item.icon />
                    <span>{item.title}</span>
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
