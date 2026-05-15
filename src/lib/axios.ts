// lib/axios/base.ts
import axios from "axios";
import { baseUrl } from "@/config/constants";
import { markLogout } from "@/utils/auth";
import { toast } from "sonner";

const isBrowser = typeof window !== "undefined";

const handleBlocked = () => {
  if (isBrowser) {
    markLogout()
    toast.error("Your account has been blocked. Please contact support.");
    localStorage.clear();
    window.location.href = "/auth/login";
  }
};

const responseInterceptor = (error: any) => {
  if (error?.response?.status === 403) {
    const code = error?.response?.data?.code;
    if (code === "EMPLOYEE_BLOCKED" || code === "USER_BLOCKED") {
      handleBlocked();
    }
  }
  return Promise.reject(error);
};

// Standard Axios instance (for JSON requests)
export const api = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

// Request interceptor to include Bearer token (client-side only)
api.interceptors.request.use((config) => {
  if (isBrowser) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

api.interceptors.response.use(
  (response) => response,
  responseInterceptor
);

// Multipart Axios instance (for image/file uploads)
export const multiPartApi = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
});

multiPartApi.interceptors.request.use((config) => {
  if (isBrowser) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});

multiPartApi.interceptors.response.use(
  (response) => response,
  responseInterceptor
);