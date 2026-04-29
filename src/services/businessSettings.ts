// services/businessSettings.ts

import { api, multiPartApi } from "@/lib/axios";
import { ApiResponse, SettingsPageName } from "@/types";

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
  // ✅ If FormData (file upload) → use multiPartApi, don't wrap
  if (data instanceof FormData) {
    const response = await multiPartApi.patch(`/businessSetting/${pageName}`, data);
    return response.data;
  }

  // Regular JSON settings
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
