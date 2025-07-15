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

type DashboardStat = {
  title: string;
  value: number | string;
  icon: IconType;
  bgColor: string;
};

interface User {
  _id: number;
  userId: string;
  phone: string;
  email: string;
  joinedDate: Date;
  status: string;
}

// {
//   "email" : "a@b.com",
//  "password" : "0000000",
//  "role" : "user"
// }

type Login = {
  email: string;
  password: string;
  role: "user" | "admin";
};

type Signup = {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  user_type: "user" | "admin";
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
  token: string;
  user: UserDetailsFromLogin;
}

interface Zone {
  _id: string;
  name: string;
  country: string;
  currency: string;
  timeZone: string;
  language: string;
  radius: number;
  latlong: number[];
  thumbnail: string;
  status: string;
  adminNotes: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Category {
  _id: string;
  name: string;
  description?: string;
  categoryId?: string;
  type: string;
  slug: string;
  thumbnail?: string;
  icon?: string;
  zoneId: string;
  status: string;
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
