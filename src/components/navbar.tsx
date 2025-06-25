"use client";

import { navMenu } from "@/config/menu";
import { ThemeToggle } from "./theme-toggle";
import { SidebarTrigger } from "./ui/sidebar";
import User from "./user";
import Link from "next/link";
import { Label } from "./typography";
import LanguageSwitcher from "./language-switcher";

const Navbar = () => {
  return (
    <div className="w-full h-16 sticky top-0 z-20 bg-header flex items-center justify-between px-4">
      <div className="flex items-center gap-8">
        <SidebarTrigger />
        <ul className="hidden lg:flex items-center gap-8">
          {navMenu.map((item) => (
            <li className="capitalize text-white" key={item.label}>
              <Link href={item.href}>
                <Label>{item.label}</Label>
              </Link>
            </li>
          ))}
        </ul>
      </div>
      <div className="flex items-center gap-4">
        <User />
        <LanguageSwitcher />
        <ThemeToggle />
      </div>
    </div>
  );
};

export default Navbar;
