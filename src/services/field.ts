// /services/field.ts

export interface GetFieldsListResponse {
  success: boolean;
  message: string;
  data: {
    fields: Field[];
    total: number;
    page: number;
    limit: number;
  };
}

import { api } from "@/lib/axios";
import { ApiResponse, Field } from "@/types";

type FieldResponse = ApiResponse<Field>

export const getFields = async (): Promise<GetFieldsListResponse> => {
  const response = await api.get("/fields");
  return response.data;
};

export const getFieldsList = async (): Promise<GetFieldsListResponse> => {
  const response = await api.get("/fields/list");
  return response.data;
};

export const getField = async (fieldId: string): Promise<FieldResponse> => {
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
