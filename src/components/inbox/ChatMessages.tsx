"use client";

import { useAuth } from "@/context/AuthContext";
import { useChat } from "@/hooks/useChat";
import { socket } from "@/lib/socket";
import { cn } from "@/lib/utils";
import { Message } from "@/types";
import { useSearchParams } from "next/navigation";
import { useCallback, useEffect, useRef, useState } from "react";
import { useDispatch } from "react-redux";
import { Avatar } from "../Avatar";
import ResponseError from "../ResponseError";
import ResStatus from "../ResStatus";
import { Small, XS } from "../Typography";
import ChatBubble from "./ChatBubble";
import MessageInput from "./MessageInput";
import { updateChat } from "@/lib/store/slices/chatsSlice";

const ChatMessages = ({ className }: { className?: string }) => {
  const { userId } = useAuth();
  const dispatch = useDispatch();

  const searchParams = useSearchParams();
  const chatId = searchParams.get("id");
  const { data, isLoading, error } = useChat(chatId || "");
  const { messages: allMessages = [], receiver } = data?.data || {};

  const [messages, setMessages] = useState<Message[]>([]);
  const [isChatActive, setIsChatActive] = useState(false);

  const updateLastMessage = useCallback(
    (lastMessage: Message) => {
      dispatch(
        updateChat({
          chatId: lastMessage.chatId,
          lastMessage,
        })
      );
    },
    [dispatch]
  );

  // 📌 Load initial messages
  useEffect(() => {
    if (allMessages.length) {
      setMessages((prev) => {
        if (prev.length > 0) return prev;
        return [...allMessages].reverse();
      });
    }
  }, [allMessages]);

  // 📌 Socket listeners
  useEffect(() => {
    if (!socket || !chatId) return;

    // Join chat room when component mounts
    socket?.emit("chat:join", { chatId });
    setIsChatActive(true);

    // Message sent successfully
    const handleMessageSent = (message: Message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === message._id);
        if (!exists) {
          return [...prev, message];
        }
        return prev;
      });
      updateLastMessage(message);
    };

    // New message received
    const handleMessageReceived = (message: Message) => {
      setMessages((prev) => {
        const exists = prev.some((msg) => msg._id === message._id);
        if (!exists) {
          return [...prev, message];
        }
        return prev;
      });
      updateLastMessage(message);

      // Only mark as delivered if chat is active and visible
      if (isChatActive && document.visibilityState === "visible") {
        socket?.emit("message:deliver", { messageId: message._id });
      }
    };

    // Message delivered confirmation
    const handleMessageDelivered = (data: {
      messageId: string;
      deliveredAt: Date;
    }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, deliveredAt: new Date(data.deliveredAt) }
            : msg
        )
      );
    };

    // Message read confirmation
    const handleMessageRead = (data: { messageId: string; readAt: Date }) => {
      setMessages((prev) =>
        prev.map((msg) =>
          msg._id === data.messageId
            ? { ...msg, readAt: new Date(data.readAt) }
            : msg
        )
      );
    };

    // Register event listeners
    socket?.on("message:sent", handleMessageSent);
    socket?.on("message:received", handleMessageReceived);
    socket?.on("message:delivered", handleMessageDelivered);
    socket?.on("message:read", handleMessageRead);

    return () => {
      socket?.off("message:sent", handleMessageSent);
      socket?.off("message:received", handleMessageReceived);
      socket?.off("message:delivered", handleMessageDelivered);
      socket?.off("message:read", handleMessageRead);

      // Leave chat room when component unmounts
      socket?.emit("chat:leave", { chatId });
      setIsChatActive(false);
    };
  }, [chatId, isChatActive, updateLastMessage]);

  const messagesEndRef = useRef<HTMLDivElement>(null);

  const handleSend = (text: string) => {
    if (!socket || !receiver) return;

    socket?.emit("message:send", {
      chatId: chatId || "",
      receiver: receiver._id,
      text,
    });
  };

  // Auto-scroll to bottom
  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" });
  }, [messages.length]);

  // Handle page visibility changes - only mark as read if chat is active
  useEffect(() => {
    const handleVisibilityChange = () => {
      if (document.visibilityState === "visible" && socket && isChatActive) {
        // Mark received messages as delivered
        const undeliveredMessages = messages.filter(
          (msg) => msg.receiver._id === userId && !msg.deliveredAt
        );

        undeliveredMessages.forEach((msg) => {
          socket?.emit("message:deliver", { messageId: msg._id });
        });

        // Mark delivered messages as read ONLY if chat is active
        const unreadMessages = messages.filter(
          (msg) => msg.receiver._id === userId && msg.deliveredAt && !msg.readAt
        );

        if (unreadMessages.length > 0) {
          unreadMessages.forEach((msg) => {
            socket?.emit("message:read", { messageId: msg._id });
          });
        }
      }
    };

    document.addEventListener("visibilitychange", handleVisibilityChange);
    return () => {
      document.removeEventListener("visibilitychange", handleVisibilityChange);
    };
  }, [messages, userId, isChatActive]);

  if (!chatId) {
    return <ResStatus text="Select a chat to start" />;
  }
  if (isLoading) {
    return <ResStatus text="Loading..." />;
  }
  if (error) {
    return <ResponseError error={error?.message || "Something went wrong"} />;
  }

  return (
    <div className={cn("flex flex-col h-full overflow-y-auto", className)}>
      {messages.length > 0 ? (
        <>
          {/* Chat header */}
          <div className="flex items-center gap-4 bg-muted p-4 rounded sticky top-0 z-10">
            <Avatar
              image={receiver?.profilePicture || ""}
              name={receiver?.name || ""}
            />
            <div className="flex flex-col">
              <Small className="font-medium">{receiver?.name}</Small>
              <XS className="text-muted-foreground">{receiver?.email}</XS>
            </div>
          </div>

          {/* Messages */}
          <div className="space-y-3 px-4 mt-4">
            {messages.map((msg: Message) => (
              <ChatBubble
                key={msg._id}
                message={msg}
                isSender={msg.sender?._id === userId}
              />
            ))}
            <div ref={messagesEndRef} />
          </div>
        </>
      ) : (
        <ResStatus text="Start the conversation!" />
      )}

      {/* Input */}
      <MessageInput className="w-full flex-1" onSend={handleSend} />
    </div>
  );
};

export default ChatMessages;
