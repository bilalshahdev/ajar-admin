// services/dropdowns.ts

import { api } from "@/lib/axios";
import type {
  ApiError,
  ApiSuccessItem,
  Dropdown,
  GetDropdownByIdResponse,
  GetDropdownByNameResponse,
  ListDropdownsQuery,
  ListDropdownsResponse,
} from "@/types";

export const getDropdowns = async (
  params?: ListDropdownsQuery
): Promise<ListDropdownsResponse> => {
  const res = await api.get("/dropdowns", { params });
  return res.data;
};

export const getDropdown = async (
  id: string
): Promise<GetDropdownByIdResponse> => {
  const res = await api.get(`/dropdowns/${id}`);
  return res.data;
};

export const getDropdownByName = async (
  name: string
): Promise<GetDropdownByNameResponse> => {
  const res = await api.get(`/dropdowns/${name}`);
  return res.data;
};

export const createDropdown = async (
  data: Omit<Dropdown, "_id" | "created_at" | "updated_at">
): Promise<ApiSuccessItem<Dropdown> | ApiError> => {
  const res = await api.post("/dropdowns", data);
  return res.data;
};

export const updateDropdown = async (
  id: string,
  data: Partial<Omit<Dropdown, "_id" | "created_at" | "updated_at">>
): Promise<ApiSuccessItem<Dropdown> | ApiError> => {
  const res = await api.patch(`/dropdowns/${id}`, data);
  return res.data;
};

// services/dropdowns.ts

export const addValueToDropdown = async (
  name: string,
  value: { name: string; value: string }
) => {
  const res = await api.post(`/dropdowns/${name}/value`, value);
  return res.data;
};

export const removeValueFromDropdown = async (name: string, value: string) => {
  const res = await api.delete(`/dropdowns/${name}/value/${value}`);
  return res.data;
};

export const deleteDropdown = async (id: string) => {
  const res = await api.delete(`/dropdowns/${id}`);
  return res.data;
};
