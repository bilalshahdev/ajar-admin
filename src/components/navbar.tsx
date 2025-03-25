"use client";

import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";

const Navbar = () => {
  return (
    <div className="w-full h-16 sticky top-0 z-20 bg-signature flex items-center justify-between px-4">
      <SidebarTrigger />
      <ThemeToggle />
    </div>
  );
};

export default Navbar;
