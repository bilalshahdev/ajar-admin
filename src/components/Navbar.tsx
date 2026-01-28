"use client";

import { getNavMenu } from "@/utils/auth";
import Link from "next/link";
import LanguageSwitcher from "./LanguageSwitcher";
import { ThemeToggle } from "./ThemeToggle";
import { Label } from "./Typography";
import { SidebarTrigger } from "./ui/sidebar";
import User from "./User";

const Navbar = () => {
  const navMenu = getNavMenu();
  return (
    <div className="w-full h-16 sticky top-0 z-50 bg-header flex items-center justify-between px-4">
      <div className="flex items-center gap-8">
        <SidebarTrigger />
        <ul className="hidden lg:flex items-center gap-8">
          {navMenu.map((item) => (
            <li className="capitalize text-white" key={item.title}>
              <Link href={item.path}>
                <Label>{item.title}</Label>
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
