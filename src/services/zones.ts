// services/zones.ts

import { api } from "@/lib/axios";
import { Zone } from "@/types";

export interface GetZonesResponse {
  success: boolean;
  message: string;
  data: {
    page: number;
    limit: number;
    total: number;
    zones: Zone[];
  };
}

// Service to get zones
export const getZones = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<GetZonesResponse> => {
  const response = await api.get<GetZonesResponse>(
    `/zones?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getZone = async (zoneId: string) => {
  const response = await api.get(`/zones/${zoneId}`);
  return response.data;
};

// Service to add a new zone
export const addZone = async (zoneData: any) => {
  const response = await api.post("/zones", zoneData);
  return response.data;
};

// update subcategories in zone, zone has subCategories array, that will take subCategory ids
export const updateZoneCategories = async (
  zoneId: string,
  subCategories: string[]
) => {
  const response = await api.patch(`/zones/${zoneId}/subCategories`, {
    subCategories,
  });
  return response.data;
};

// Service to update a zone
export const updateZone = async (zoneId: string, zoneData: any) => {
  const response = await api.patch(`/zones/${zoneId}`, zoneData);
  return response.data;
};

// Service to delete a zone
export const deleteZone = async (zoneId: string) => {
  const response = await api.delete(`/zones/${zoneId}`);
  return response.data;
};
