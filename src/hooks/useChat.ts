// hooks/useChat.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChat, getAllChats, sendMessage } from "@/services/chat";
import { toast } from "sonner";
import { SendMessageData } from "@/types";

export const useChats = ({
  page = 1,
  limit = 10,
}: {
  page: number;
  limit: number;
}) => {
  return useQuery({
    queryKey: ["chats", page, limit],
    queryFn: () => getAllChats({ page, limit }),
  });
};

export const useChat = (chatId: string) => {
  return useQuery({
    queryKey: ["chat", chatId],
    queryFn: () => getChat(chatId),
    enabled: !!chatId,
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: (data: SendMessageData) => sendMessage(data),
    onSuccess: (data) => {
      const newMessage = data?.data;

      queryClient
        .getQueriesData({ queryKey: ["chats"] })
        .forEach(([queryKey, prevData]: [any, any]) => {
          if (!prevData) return;

          const updatedData = {
            ...prevData,
            data: {
              ...prevData.data,
              chats: prevData.data.chats.map((chat: any) =>
                chat._id === newMessage.chatId
                  ? { ...chat, lastMessage: newMessage }
                  : chat
              ),
            },
          };

          queryClient.setQueryData(queryKey, updatedData);
        });

      queryClient.setQueryData(["chat", newMessage.chatId], (prev: any) => {
        const prevMessages = prev?.data?.messages || [];
        return {
          ...prev,
          data: {
            ...prev.data,
            messages: [newMessage, ...prevMessages],
          },
        };
      });
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
