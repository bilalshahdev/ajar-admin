// /services/users.ts

import { api } from "@/lib/axios";
import { ApiResponse, Pagination, UserStats, UserStatus } from "@/types";

export interface User {
  _id: string;
  name?: string;
  email: string;
  phone: string;
  status: string;
}

interface GetUsersData {
  users: User[];
  pagination: Pagination;
  stats: UserStats;
}

type GetUsersResponse = ApiResponse<GetUsersData>;

export const getUsers = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<GetUsersResponse> => {
  const response = await api.get(`/users/all?page=${page}&limit=${limit}`);
  return response.data;
};

// Get single user
export const getUser = async (
  userId: string
): Promise<{ success: boolean; message: string; data: User }> => {
  const response = await api.get(`/users/${userId}`);
  return response.data;
};

// Search users
export const searchUsers = async (
  query: string
): Promise<{ success: boolean; message: string; data: User[] }> => {
  const response = await api.get(`/users/search?query=${query}`);
  return response.data;
};

// Add user
export const addUser = async (
  userData: Partial<User>
): Promise<{ success: boolean; message: string; data: User }> => {
  const response = await api.post("/users", userData);
  return response.data;
};

// Update user
export const updateUser = async (
  userId: string,
  userData: Partial<User>
): Promise<{ success: boolean; message: string; data: User }> => {
  const response = await api.patch(`/users/${userId}`, userData);
  return response.data;
};

export const updateUserStatus = async (
  userId: string,
  status: UserStatus
): Promise<{ success: boolean; message: string; data: User }> => {
  const response = await api.patch(`/users/${userId}/status`, { status });
  return response.data;
};

// Delete user
export const deleteUser = async (
  userId: string
): Promise<{ success: boolean; message: string; data: { _id: string } }> => {
  const response = await api.delete(`/users/${userId}`);
  return response.data;
};
