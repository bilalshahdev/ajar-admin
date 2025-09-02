"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { Avatar } from "../Avatar";
import { XS } from "../Typography";
import MessageStatus from "./MessageStatus";
import { format } from "date-fns";

interface ChatBubbleProps {
  message: Message;
  isSender: boolean; // true if current user is the sender
}

const ChatBubble: React.FC<ChatBubbleProps> = ({ message, isSender }) => {
  return (
    <div
      className={cn(
        "flex items-start gap-3 w-full",
        isSender ? "justify-end" : "justify-start"
      )}
    >
      {/* Left-side avatar for receiver */}
      {!isSender && (
        <Avatar
          image={message.sender?.profilePicture || undefined}
          name={message.sender?.name}
        />
      )}

      {/* Chat message bubble */}
      <div className="space-y-2">
        <div
          className={cn(
            "min-w-48 max-w-sm px-4 py-2 rounded-lg text-sm shadow-sm",
            isSender
              ? "bg-blue text-white ml-auto rounded-br-none"
              : "bg-card text-secondary-foreground mr-auto rounded-bl-none"
          )}
        >
          <p>{message.text}</p>
          <XS
            className={cn(
              "text-[10px] text-end",
              isSender ? "text-gray-200" : "text-muted-foreground"
            )}
          >
            {format(new Date(message.createdAt), "hh:mm a")}
          </XS>
        </div>

        {/* Show message status ONLY for sender */}
        {/* Show message status ONLY for sender */}
        {isSender && (
          <MessageStatus
            message={message}
            className={cn(
              "size-2",
              message.deliveredAt ? "text-blue-500" : "text-gray-400"
            )}
          />
        )}
      </div>

      {/* Right-side avatar for sender */}
      {isSender && (
        <Avatar
          image={message.sender.profilePicture || undefined}
          name={message.sender.name}
        />
      )}
    </div>
  );
};

export default ChatBubble;
