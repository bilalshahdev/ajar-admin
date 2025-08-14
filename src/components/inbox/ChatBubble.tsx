"use client";

import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { Avatar } from "../Avatar";
import { XS } from "../Typography";
import MessageStatus from "./MessageStatus";
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
          image={message.sender.profilePicture || undefined}
          name={message.sender?.name}
        />
      )}

      {/* Chat message bubble */}
      <div className="space-y-2">
        <div
          className={cn(
            "max-w-sm px-4 py-2 rounded-lg text-sm shadow-sm",
            isSender
              ? "bg-blue text-white ml-auto rounded-br-none"
              : "bg-card text-secondary-foreground mr-auto rounded-bl-none"
          )}
        >
          <p> {message.body}</p>
          <XS
            className={cn(isSender ? "text-gray-200" : "text-muted-foreground")}
          >
            {message.createdAt.toLocaleString()}
          </XS>
        </div>
        <MessageStatus message={message} className="size-2" />
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
