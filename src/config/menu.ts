import { NavMenuItem, MenuItem } from "@/types";
import { Briefcase, Home, Info, Mail } from "lucide-react";
import {
  FaTachometerAlt,
  FaUserCog,
  FaShapes,
  FaVectorSquare,
  FaUsers,
  FaClipboardList,
  FaMoneyCheckAlt,
  FaChartBar,
  FaBuilding,
  FaQuestionCircle,
} from "react-icons/fa";

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
    title: "Financial Settings",
    path: "/financial-settings",
    icon: FaMoneyCheckAlt,
  },
  {
    title: "Analytics & Restrictions",
    path: "/analytics-restrictions",
    icon: FaChartBar,
  },
  { title: "Administration", path: "/administration", icon: FaBuilding },
  { title: "Help & Support", path: "/help-support", icon: FaQuestionCircle },
];

// Navigation items with icons
export const navMenu: MenuItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/skills", label: "skills", icon: Info },
  { href: "/services", label: "services", icon: Briefcase },
  { href: "/projects", label: "projects", icon: Briefcase },
  { href: "/contact", label: "contact", icon: Mail },
];
