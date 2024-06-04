import React, { useContext, useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { SocketContext } from "../contexts/SocketContext";
import { Chat } from "../types/Chat";

const ChatsList = () => {
  const socket = useContext(SocketContext);

  const [chats, setChats] = useState<Chat[]>([]);

  useEffect(() => {
    if (socket) {
      socket.emit("chats:get");

      socket.on("chats", (data: Chat[]) => setChats(data));
    }

    return () => {
      socket?.off("chats");
    };
  }, [socket]);

  return (
    <div className="">
      <h2 className="mb-2 px-6 text-xs text-chat-gray-light font-medium">
        All messages
      </h2>
      <div className="flex flex-col h-chatList overflow-y-scroll no-scrollbar">
        {chats.map((c) => (
          <ChatItem data={c} key={c._id} />
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
