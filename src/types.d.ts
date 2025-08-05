import { IconType } from "react-icons/lib";
// types/leaflet-draw.d.ts
import "leaflet";
declare module "leaflet" {
  namespace Control {
    class Draw extends Control {
      constructor(options?: any);
    }
  }

  namespace Draw {
    namespace Event {
      const CREATED: string;
      const EDITED: string;
      const DELETED: string;
    }
  }
}

interface NavMenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

type MenuItem = {
  href: string;
  label: string;
};

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

interface Pagination {
  total: number;
  page: number;
  limit: number;
}

interface UserStats {
  totalUsers: number;
  totalAdmins: number;
  totalNormalUsers: number;
  totalActiveUsers: number;
  totalInactiveUsers: number;
  totalBlockedUsers: number;
  totalUnblockedUsers: number;
}

type DashboardStat = {
  title: string;
  value: number | string;
  icon: IconType;
  bgColor: string;
};

interface User {
  _id: string;
  name: string;
  phone: string;
  email: string;
  image?: string;
  joinedDate?: Date;
  status?: string;
}

type Login = {
  email: string;
  password: string;
  role: "admin" | "staff";
};

type Signup = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  user_type: "admin";
  phone?: string;
  dob?: string;
  nationality?: string;
  image?: File;
};

type ErrorFieldDetail = {
  path: string[];
  message: string;
};

type ErrorDetails = {
  message: string;
  errors?: ErrorFieldDetail[] | null; // More specific type for errors
  statusCode?: number | null;
};

type AsyncResponse<T> = {
  data: T | null; // Data can be null in case of error
  error: ErrorDetails | null;
  status: "success" | "error";
};

// Specific type for user data returned on successful login
interface UserDetailsFromLogin {
  _id: string; // Assuming _id from login response is a string
  email?: string;
  name?: string;
  // other fields that might be part of the user object in login response
}

interface LoginSuccessData {
  data: {
    token: string;
    user: UserDetailsFromLogin;
  };
}

export interface Polygon {
  lat: number;
  lng: number;
  _id: string;
}

export interface ZoneLanguage {
  locale: string;
  translations: {
    name: string;
  };
  _id: string;
}

export interface SubCategory {
  _id: string;
  name: string;
  thumbnail: string;
  icon: string;
  description: string;
  language: string;
  type: string;
  category: string;
  languages: any[]; // refine later if needed
  slug: string;
  createdAt: string;
  updatedAt: string;
  __v: number;
  id: string;
}

export interface Zone {
  _id: string;
  name: string;
  currency: string;
  language: string;
  subCategories: SubCategory[];
  polygons: Polygon[][];
  languages: ZoneLanguage[];
  createdAt: string;
  updatedAt: string;
  __v: number;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  category?: Category;
  type: string;
  slug: string;
  thumbnail?: string;
  icon?: string;
  createdAt: Date;
  updatedAt: Date;
}

// types/ZoneSettings.ts

export type CommissionType = "fixed" | "percentage";

export interface Commission {
  type: CommissionType;
  leaser: number | { min: number; max: number };
  renter: number | { min: number; max: number };
}

export interface SubcategorySettings {
  subcategory: string;
  fields: string[];
  commission: Commission;
  tax: number;
  expiry: string; // ISO string for date
}

export interface ZoneSettingsFormData {
  zone: string;
  subcategories: SubcategorySettings[];
}

export interface RentalUser {
  _id: string;
  name: string;
  profilePic: string;
}

export interface Subcategory {
  name: string;
  category: {
    name: string;
  };
}

interface RentalRequest {
  _id: string;
  name: string;
  description: string;
  price: number;
  images: string[];
  date: string;
  status: string;
  subcategory: Subcategory;
  leaser: RentalUser;
  renter: RentalUser;
}

type TicketStatus = "active" | "pending" | "rejected";
type Priority = "Low" | "Medium" | "High";

interface Ticket {
  _id: string;
  sender: string;
  email: string;
  subject: string;
  description?: string;
  createdAt: string; // Date of complaint
  status: TicketStatus;
  group?: string;
  assignedTo?: string;
  priority?: Priority;
  response?: string;
  complainant?: {
    name: string;
    profilePic: string;
  };
}

type RefundStatus = "pending" | "approved" | "rejected";

interface RefundRequest {
  _id: string;
  listing: string;
  user: string;
  dateSubmitted: string;
  amount: number;
  status: RefundStatus;
}

interface Faq {
  _id: string;
  question: string;
  answer: string;
  order: number;
}

interface Contact {
  _id: string;
  phone: string;
  email: string;
  address: string;
  order: number;
}

interface Query {
  _id: string;
  sentBy: User;
  sentTo: User;
  title: string;
  description: string;
  status: string;
  createdAt?: Date;
}

export interface Message {
  _id: string;
  chatId: string;
  sender: User;
  receiver: User;
  body: string;
  deliveredAt?: Date;
  readAt?: Date;
  createdAt: Date;
  updatedAt?: Date;
}

export interface Chat {
  _id: string;
  participants: User[]; // usually 2 in 1-on-1 chat
  latestMessage?: Message;
  unreadCount?: {
    [userId: string]: number;
  };
  createdAt: Date;
  updatedAt: Date;
}
