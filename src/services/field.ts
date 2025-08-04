// /services/field.ts
import { api } from "@/lib/axios";

export const getFields = async () => {
  const response = await api.get("/fields");
  return response.data;
};

export const getField = async (fieldId: string) => {
  const response = await api.get(`/fields/${fieldId}`);
  return response.data;
};

export const addField = async (fieldData: any) => {
  const response = await api.post("/fields", fieldData);
  return response.data;
};

export const updateField = async (fieldId: string, fieldData: any) => {
  const response = await api.patch(`/fields/${fieldId}`, fieldData);
  return response.data;
};

export const deleteField = async (fieldId: string) => {
  const response = await api.delete(`/fields/${fieldId}`);
  return response.data;
};
