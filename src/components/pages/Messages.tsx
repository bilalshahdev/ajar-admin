"use client";

import { useState } from "react";
import ChatInfo from "../inbox/ChatInfo";
import ChatMessages from "../inbox/ChatMessages";
import Chats from "../inbox/Chats";

const Inbox = () => {
  const [chatId, setChatId] = useState<string | null>(null);

  return (
    <div className="flex flex-1 h-[65vh]">
      <Chats
        chatId={chatId}
        setChatId={setChatId}
        className="w-1/3 border rounded p-2 shadow-sm"
      />
      <ChatMessages
        chatId={chatId}
        className="w-full border rounded shadow-sm"
      />
      {/* <ChatInfo className="w-1/4 border rounded p-2 shadow-sm" /> */}
    </div>
  );
};

export default Inbox;
