"use client";

import { useChats } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { Chat, User } from "@/types";
import getCompactTimeAgo from "@/utils/getCompactTime";
import { Avatar } from "../Avatar";
import { Small, XS } from "../Typography";

const Chats = ({
  chatId,
  setChatId,
  className,
}: {
  chatId: string | null;
  setChatId: (id: string | null) => void;
  className?: string;
}) => {
  const currentUserId = "2";
  const {
    data: chatsData,
    isLoading,
    error,
  } = useChats({ page: 1, limit: 10 });

  // const chats = allChats || [];
  const chats = chatsData?.data?.chats || [];
  return (
    <div className={cn("space-y-2 overflow-y-auto", className)}>
      <div className="text-lg font-semibold">Chats</div>
      {isLoading ? (
        <Small className="text-muted-foreground">Loading...</Small>
      ) : error ? (
        <Small className="text-red-500">
          {error.message || "Something went wrong"}{" "}
        </Small>
      ) : (
        chats.map((chat: Chat) => {
          const otherUser = chat.participants.find(
            (p: User) => p._id !== currentUserId
          );
          const lastMessage = chat.lastMessage;
          const isCurrentChat = chatId === chat._id;

          return (
            <div
              key={chat._id}
              onClick={() => setChatId(chat._id)} // ✅ will now push to /messages?id=chatId
              className={cn(
                "flex items-center gap-3 p-3 rounded-md transition-all cursor-pointer hover:bg-muted",
                isCurrentChat && "bg-gradient-to-r from-blue to-aqua"
              )}
            >
              <Avatar
                image={otherUser?.profilePicture || undefined}
                name={otherUser?.name || ""}
              />
              <div
                className={cn(
                  "flex flex-col overflow-hidden",
                  isCurrentChat && "text-white"
                )}
              >
                <Small className="font-medium truncate">
                  {otherUser?.name}
                </Small>
                <XS className={cn("truncate", isCurrentChat && "text-white")}>
                  {lastMessage?.text}
                </XS>
                <XS
                  className={cn(
                    "text-xs text-muted-foreground mt-0.5",
                    isCurrentChat && "text-white"
                  )}
                >
                  {lastMessage &&
                    getCompactTimeAgo(new Date(lastMessage.createdAt))}
                </XS>
              </div>
            </div>
          );
        })
      )}
    </div>
  );
};

export default Chats;
