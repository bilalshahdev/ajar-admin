"use client";

import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import User from "./user";

const Navbar = () => {
  return (
    <div className="w-full h-16 sticky top-0 z-20 bg-header flex items-center justify-between px-4">
      <SidebarTrigger />
      <div className="flex items-center gap-4">
        <User />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
