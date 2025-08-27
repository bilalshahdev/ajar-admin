// services/messages.ts

import { api } from "@/lib/axios";
import { ApiResponse, Pagination } from "@/types";
import { Chat } from "@/types";

type GetChatsResponse = ApiResponse<
  Pagination & {
    chats: Chat[];
  }
>;

export const getAllChats = async ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}): Promise<GetChatsResponse> => {
  const response = await api.get(`/chats?page=${page}&limit=${limit}`);
  return response.data;
};

export const getChat = async (chatId: string, page = 1, limit = 10) => {
  const response = await api.get(
    `/chats/${chatId}/messages?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const sendMessage = async (receiverId: string, message: string) => {
  const response = await api.post(`/chats/${receiverId}/messages`, { message });
  return response.data;
};
