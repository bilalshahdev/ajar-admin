"use client";

import { useEffect, useRef } from "react";
import { RootState } from "@/lib/store";
import { useAppSelector } from "@/lib/store/hooks";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { Avatar } from "../avatar";
import { Small } from "../typography";
import ChatBubble from "./chat-bubble";
import MessageInput from "./message-input";

const ChatMessages = ({
  chatId,
  className,
}: {
  chatId: string | null;
  className?: string;
}) => {
  const currentUserId = "1";
  const messages = useAppSelector(
    (state: RootState) => state.messages.messages
  );
  const chatMessages = chatId ? getMessagesForChat(chatId, messages) : [];

  const messagesEndRef = useRef<HTMLDivElement>(null);

  // Auto-scroll to bottom when messages change
  useEffect(() => {
    if (messagesEndRef.current) {
      messagesEndRef.current.scrollIntoView({ behavior: "smooth" });
    }
  }, [chatMessages.length]); // Trigger when messages for this chat update

  return (
    <div className={cn("flex flex-col h-full overflow-y-auto", className)}>
      {chatMessages.length > 0 ? (
        <>
          <div className="flex items-center gap-4 bg-muted p-4 rounded sticky top-0 z-10">
            <Avatar
              image={chatMessages[0]?.receiver.image || ""}
              name={chatMessages[0]?.receiver.name || ""}
            />
            <Small className="font-medium">
              {chatMessages[0]?.receiver.name}
            </Small>
          </div>
          <div className={cn("space-y-3 px-4 mt-4")}>
            {chatMessages.map((msg) => (
              <ChatBubble
                key={msg._id}
                message={msg}
                isSender={msg.sender._id === currentUserId}
              />
            ))}
            {/* 👇 this keeps the latest message in view */}
            <div ref={messagesEndRef} />
          </div>
          <MessageInput
            className="w-full flex-1"
            onSend={(text) => console.log("Send:", text)}
          />
        </>
      ) : (
        <div className="flex items-center justify-center h-full">
          <p className="text-muted-foreground">Select a chat to start</p>
        </div>
      )}
    </div>
  );
};

export default ChatMessages;

const getMessagesForChat = (chatId: string, messages: Message[]) => {
  return messages.filter((msg) => msg.chatId === chatId);
};