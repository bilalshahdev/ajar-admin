"use client";
import { Message } from "@/types";
import { cn } from "@/lib/utils";
import { FaCheck, FaCheckDouble } from "react-icons/fa";
const MessageStatus = ({
  message,
  className,
}: {
  message: Message;
  className?: string;
}) => {
  const status = () => {
    if (message?.readAt) {
      return "read";
    }
    if (message?.deliveredAt) {
      return "delivered";
    }

    return "sent";
  };

  switch (status()) {
    case "sent":
      return <FaCheck className={cn("text-gray-500", className)} />;
    case "delivered":
      return <FaCheckDouble className={cn("text-gray-500", className)} />;
    case "read":
      return <FaCheckDouble className={cn("text-blue-500", className)} />;
    default:
      return null;
  }
};

export default MessageStatus;
