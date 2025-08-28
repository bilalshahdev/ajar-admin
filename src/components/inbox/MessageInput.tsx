"use client";
import { SendHorizonal, Paperclip, Mic } from "lucide-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { useState } from "react";
import { cn } from "@/lib/utils";

const MessageInput = ({
  onSend,
  className,
  disabled,
  error,
}: {
  onSend: (text: string) => void;
  className?: string;
  disabled?: boolean;
  error?: string;
}) => {
  const [message, setMessage] = useState("");

  const handleSend = () => {
    if (message.trim()) {
      onSend(message.trim());
      setMessage("");
    }
  };

  return (
    <div
      className={cn(
        "flex items-end gap-2 p-4 mt-4 bg-background sticky bottom-0",
        className
      )}
    >
      {/* File upload icon */}
      <Button variant="ghost" size="icon">
        <Paperclip className="h-5 w-5 text-muted-foreground" />
      </Button>

      {/* Voice icon */}
      <Button variant="ghost" size="icon">
        <Mic className="h-5 w-5 text-muted-foreground" />
      </Button>

      {/* Message input */}
      <Input
        value={message}
        onChange={(e) => setMessage(e.target.value)}
        placeholder="Type a message..."
        className="flex-1"
        onKeyDown={(e) => {
          if (e.key === "Enter") handleSend();
        }}
      />

      {/* Send button */}
      <Button
        size="icon"
        variant="button"
        onClick={handleSend}
        disabled={!message.trim() || disabled}
      >
        <SendHorizonal className="h-5 w-5" />
      </Button>
    </div>
  );
};

export default MessageInput;
