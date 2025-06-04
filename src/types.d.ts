import { IconType } from "react-icons/lib";

interface NavMenuItem {
  title: string;
  path: string;
  icon: React.ElementType;
}

type MenuItem = {
  href: string;
  label: string;
  icon: ElementType;
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
  isBlocked: boolean;
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
