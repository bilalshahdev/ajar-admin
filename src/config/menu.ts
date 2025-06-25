import { MenuItem, NavMenuItem } from "@/types";
import {
  FaBuilding,
  FaChartBar,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaQuestion,
  FaShapes,
  FaTachometerAlt,
  FaUserCog,
  FaUsers,
  FaVectorSquare,
} from "react-icons/fa";
import { PiQuestionMarkFill } from "react-icons/pi";

export const sidebarMenu: NavMenuItem[] = [
  { title: "Dashboard", path: "/", icon: FaTachometerAlt },
  { title: "Zone Management", path: "/zone-management", icon: FaVectorSquare },
  {
    title: "Category Management",
    path: "/category-management",
    icon: FaShapes,
  },
  { title: "Field Management", path: "/field-management", icon: FaUserCog },
  { title: "User Verification", path: "/user-verification", icon: FaUsers },
  { title: "Rental Listing", path: "/rental-listing", icon: FaClipboardList },
  {
    title: "Business Settings",
    path: "/business-settings",
    icon: FaMoneyCheckAlt,
  },
  {
    title: "Analytics & Restrictions",
    path: "/analytics-restrictions",
    icon: FaChartBar,
  },
  { title: "Administration", path: "/administration", icon: FaBuilding },
  { title: "Help & Support", path: "/help-support", icon: FaQuestion },
  {
    title: "FAQs",
    path: "/faqs",
    icon: PiQuestionMarkFill,
  },
];

// Navigation items with icons
export const navMenu: MenuItem[] = [
  { href: "#", label: "leaser" },
  { href: "#", label: "reports" },
  { href: "#", label: "blocked" },
  { href: "#", label: "listing" },
  { href: "#", label: "settings" },
];

// export const navMenu: MenuItem[] = [
//   { href: "/", label: "leaser" },
//   { href: "/reports", label: "reports" },
//   { href: "/blocked", label: "blocked" },
//   { href: "/listing", label: "listing" },
//   { href: "/settings", label: "settings" },
// ];
