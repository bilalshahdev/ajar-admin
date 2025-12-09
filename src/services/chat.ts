// services/messages.ts

import { api } from "@/lib/axios";
import {
  ApiResponse,
  Chat,
  Message,
  Pagination,
  SendMessageData,
  User,
} from "@/types";

type GetChatsResponse = ApiResponse<
  Pagination & {
    chats: Chat[];
  }
>;

type GetChatResponse = ApiResponse<
  Pagination & {
    messages: Message[];
    receiver: User;
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

export const getChat = async (
  chatId: string,
  page = 1,
  limit = 10
): Promise<GetChatResponse> => {
  const response = await api.get(
    `/chats/${chatId}/messages?page=${page}&limit=${limit}`
  );
  return response.data;
};

export const sendMessage = async (data: SendMessageData) => {
  const response = await api.post("/chats/send-message", data);
  return response.data;
};
