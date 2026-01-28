// lib/axios/base.ts
import axios from "axios";
import { baseUrl } from "@/config/constants";

const isBrowser = typeof window !== "undefined";

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

// Multipart Axios instance (for image/file uploads)
export const multiPartApi = axios.create({
  baseURL: `${baseUrl}/api`,
  withCredentials: true,
  headers: {
    // No need to set Content-Type manually for multipart/form-data
    // axios handles it automatically when you use FormData
  },
});

// Optional: attach same interceptor to axiosMultipart (if needed)
multiPartApi.interceptors.request.use((config) => {
  if (isBrowser) {
    const token = localStorage.getItem("token");
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
  }
  return config;
});
