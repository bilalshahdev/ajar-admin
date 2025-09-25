import { MenuItem, NavMenuItem } from "@/types";
import {
  FaChartBar,
  FaClipboardList,
  FaEnvelope,
  FaList,
  FaMoneyCheckAlt,
  FaQuestion,
  FaShapes,
  FaTicketAlt,
  FaUndo,
  FaUserFriends,
  FaUsers,
  FaVectorSquare,
} from "react-icons/fa";
import { MdOutlineDashboard } from "react-icons/md";
import { PiQuestionMarkFill } from "react-icons/pi";
import { TbAdjustmentsHorizontal } from "react-icons/tb";

export const sidebarMenu: NavMenuItem[] = [
  { title: "Dashboard", path: "/", icon: MdOutlineDashboard },
  { title: "Zone Management", path: "/zone-management", icon: FaVectorSquare },
  {
    title: "Category Management",
    path: "/category-management",
    icon: FaShapes,
  },
  {
    title: "Field Management",
    path: "/field-management",
    icon: TbAdjustmentsHorizontal,
  },
  { title: "User Verification", path: "/user-verification", icon: FaUsers },
  { title: "Rental Listing", path: "/rental-listing", icon: FaClipboardList },
  {
    title: "Business Settings",
    path: "/business-settings",
    icon: FaMoneyCheckAlt,
  },
  { title: "Tickets", path: "/tickets", icon: FaTicketAlt },
  { title: "Refund Management", path: "/refund-management", icon: FaUndo },
  {
    title: "Employee Management",
    path: "/employee-management",
    icon: FaUserFriends,
  },
  {
    title: "Analytics",
    path: "/analytics",
    icon: FaChartBar,
  },
  { title: "Messages", path: "/messages", icon: FaEnvelope },
  { title: "Help & Support", path: "/help-support", icon: FaQuestion },
  { title: "FAQs", path: "/faqs", icon: PiQuestionMarkFill },
  { title: "Dropdowns", path: "/dropdowns", icon: FaList },
  // { title: "Administration", path: "/administration", icon: FaBuilding },
];

// Navigation items with icons
export const navMenu: MenuItem[] = [
  { path: "/user-verification", title: "User" },
  { path: "/analytics", title: "reports" },
  { path: "/rental-listing", title: "listing" },
  { path: "/rental-policies", title: "rental policies" },
];

export const businessNavMenu: MenuItem[] = [
  { path: "/", title: "Business Information" },
  { path: "/payment-methods", title: "Payment Methods" },
  { path: "/sms-module", title: "SMS Module" },
  { path: "/mail-config", title: "Mail Config" },
  { path: "/map-apis", title: "Map API’s" },
  { path: "/social-logins", title: "Socials Logins" },
  { path: "/recaptcha", title: "Recaptcha" },
  { path: "/firebase", title: "Firebase" },
  // { path: "/storage", title: "Storage" },
];
