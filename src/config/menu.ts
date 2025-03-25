import { Briefcase, Home, Info, Mail } from "lucide-react";
import { FaCog, FaHome, FaUserAlt } from "react-icons/fa";

export const sidebarMenu: NavMenuItem[] = [
  { title: "Home", path: "/home", icon: FaHome },
  { title: "Profile", path: "/profile", icon: FaUserAlt },
  { title: "Settings", path: "/settings", icon: FaCog },
];

// Navigation items with icons
export const navMenu: MenuItem[] = [
  { href: "/", label: "Home", icon: Home },
  { href: "/skills", label: "skills", icon: Info },
  { href: "/services", label: "services", icon: Briefcase },
  { href: "/projects", label: "projects", icon: Briefcase },
  { href: "/contact", label: "contact", icon: Mail },
];
