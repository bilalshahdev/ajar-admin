// hooks/useChat.ts

import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import { getChat, getAllChats, sendMessage } from "@/services/chat";
import { toast } from "sonner";

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
  });
};

export const useSendMessage = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({
      receiverId,
      message,
    }: {
      receiverId: string;
      message: string;
    }) => sendMessage(receiverId, message),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["chats"] });
      toast.success("Message sent successfully");
    },
    onError: (error: any) => {
      toast.error(error?.response?.data?.message || "Something went wrong");
    },
  });
};
