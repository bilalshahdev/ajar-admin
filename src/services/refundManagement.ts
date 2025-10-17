// types/refundManagement.ts

import { api } from "@/lib/axios";

export const getRefundRequests = async ({
  page,
  limit,
}: {
  page: number;
  limit: number;
}) => {
  const response = await api.get(
    `/refund-requests?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const getRefundRequest = async (id: string) => {
  const response = await api.get(`/refund-requests/${id}`);
  return response.data;
};

export const updateRefundRequest = async (id: string, data: any) => {
  const response = await api.put(`/refund-requests/${id}`, data);
  return response.data;
};

export const deleteRefundRequest = async (id: string) => {
  const response = await api.delete(`/refund-requests/${id}`);
  return response.data;
};

export const getRefundPolicy = async ({
  zone,
  subCategory,
}: {
  zone: string;
  subCategory: string;
}) => {
  const response = await api.get(`/refund-policies/${zone}/${subCategory}`);
  return response.data;
};

export const saveRefundPolicy = async ({
  zone,
  subCategory,
  data,
}: {
  zone: string;
  subCategory: string;
  data: any;
}) => {
  const response = await api.patch(
    `/refund-policies/${zone}/${subCategory}`,
    data
  );
  return response.data;
};
