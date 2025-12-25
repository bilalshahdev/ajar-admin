// services/businessSettings.ts

import { api } from "@/lib/axios";
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
