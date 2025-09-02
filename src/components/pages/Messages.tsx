"use client";

import { useRouter, useSearchParams } from "next/navigation";
import ChatMessages from "../inbox/ChatMessages";
import Chats from "../inbox/Chats";

const Inbox = () => {
  const searchParams = useSearchParams();
  const router = useRouter();
  const chatId = searchParams.get("id");

  const setChatId = (id: string | null) => {
    if (id) {
      router.push(`/messages?id=${id}`);
    } else {
      router.push(`/messages`);
    }
  };

  return (
    <div className="flex flex-1 h-[65vh]">
      <Chats
        chatId={chatId}
        setChatId={setChatId}
        className="w-1/3 border rounded p-2 shadow-sm"
      />
      <ChatMessages className="w-2/3 border rounded shadow-sm" />
      {/* <ChatInfo className="w-1/4 border rounded p-2 shadow-sm" /> */}
    </div>
  );
};

export default Inbox;
