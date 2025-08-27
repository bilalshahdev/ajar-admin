"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/hooks/useChat";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { useRouter, useSearchParams } from "next/navigation";
import { useEffect, useRef } from "react";
import { Avatar } from "../Avatar";
import { Small, XS } from "../Typography";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";

const ChatMessages = ({ className }: { className?: string }) => {
  const { userId } = useAuth();

  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("id"); // ✅ get chatId from URL

  const { data, isLoading, error } = useChat(chatId || "");

  const messages = data?.data?.messages || [];

  console.log({ messages });

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [messages.length]);

  if (!chatId) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-muted-foreground">Select a chat to start</p>
      </div>
    );
  }

  if (isLoading) {
    return (
      <div className="flex items-center justify-center h-full w-full">
        <p className="text-muted-foreground">Loading messages...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex items-center justify-center h-full">
        <p className="text-red-500">Failed to load chat.</p>
      </div>
    );
  }

  return (
    <div className={cn("flex flex-col h-full overflow-y-auto", className)}>
      {messages.length > 0 ? (
        <>
          {/* Chat Header */}
          <div className="flex items-center gap-4 bg-muted p-4 rounded sticky top-0 z-10">
            <Avatar
              image={messages[0]?.receiver.profilePicture || ""}
              name={messages[0]?.receiver.name || ""}
            />
            <div className="flex flex-col">
              <Small className="font-medium">
                {messages[0]?.receiver.name}
              </Small>
              <XS className="text-muted-foreground">
                {messages[0]?.receiver.email}
              </XS>
            </div>
          </div>

          {/* Chat Body */}
          <div className={cn("space-y-3 px-4 mt-4")}>
            {messages.map((msg: Message) => (
              <ChatBubble
                key={msg._id}
                message={msg}
                isSender={msg.sender._id === userId}
              />
            ))}
            {/* keep latest in view */}
            <div ref={messagesEndRef} />
          </div>

          {/* Chat Input */}
          <MessageInput
            className="w-full flex-1"
            onSend={(text) => console.log("Send:", text)}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">
            No messages yet. Start the conversation!
          </p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;
