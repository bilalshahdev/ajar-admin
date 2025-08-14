"use client";

import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
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
  const chats = useAppSelector((state: RootState) => state.chats.chats);

  return (
    <div className={cn("space-y-2 overflow-y-auto", className)}>
      <div className="text-lg font-semibold">Chats</div>
      {chats.map((chat) => {
        const otherUser = chat.participants.find(
          (p) => p._id !== currentUserId
        );
        const latestMessage = chat.latestMessage;
        const isCurrentChat = chatId === chat._id;

        return (
          <div
            key={chat._id}
            onClick={() => setChatId(chat._id)}
            className={cn(
              "flex items-center gap-3 p-3 rounded-md transition-all cursor-pointer hover:bg-muted",
              isCurrentChat && "bg-gradient-to-r from-blue to-aqua"
            )}
          >
            <Avatar image={otherUser?.profilePicture || undefined} name={otherUser?.name || ""} />
            <div
              className={cn(
                "flex flex-col overflow-hidden",
                isCurrentChat && "text-white"
              )}
            >
              <Small className="font-medium truncate">{otherUser?.name}</Small>
              <XS className={cn("truncate", isCurrentChat && "text-white")}>
                {latestMessage?.body}
              </XS>
              <XS
                className={cn(
                  "text-xs text-muted-foreground mt-0.5",
                  isCurrentChat && "text-white"
                )}
              >
                {latestMessage &&
                  getCompactTimeAgo(new Date(latestMessage.createdAt))}
              </XS>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default Chats;
