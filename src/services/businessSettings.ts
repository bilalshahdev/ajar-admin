// services/businessSettings.ts

import { api } from "@/lib/axios";
import { SettingsPageName } from "@/types";

// Business Information
// Payment Methods
// SMS Module
// Mail Config
// Map API’s
// Socials Logins
// Recaptcha
// Firebase

// response type/interface

interface ApiResponse<T> {
  success: boolean;
  message: string;
  data: T;
}

type BusinessSettingsResponse = ApiResponse<any>;

export const getBusinessSettings = async (
  pageName: SettingsPageName
): Promise<BusinessSettingsResponse> => {
  const response = await api.get(`/businessSetting/${pageName}`);
  return response.data;
};

export const saveBusinessSettings = async (
  pageName: SettingsPageName,
  data: any
): Promise<any> => {
  const response = await api.patch(`/businessSetting/${pageName}`, {
    pageSettings: data,
  });
  return response.data;
};

export const deleteBusinessSettings = async (
  pageName: SettingsPageName
): Promise<any> => {
  const response = await api.delete(`/businessSetting/${pageName}`);
  return response.data;
};
