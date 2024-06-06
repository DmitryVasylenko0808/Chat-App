import React, { useContext, useEffect, useState } from "react";
import ChatItem from "./ChatItem";
import { SocketContext } from "../contexts/SocketContext";

const ChatsList = () => {
  const context = useContext(SocketContext);

  return (
    <div className="">
      <h2 className="mb-2 px-6 text-xs text-chat-gray-light font-medium">
        All messages
      </h2>
      <div className="flex flex-col h-chatList overflow-y-scroll no-scrollbar">
        {context?.chats.map((c) => (
          <ChatItem data={c} key={c._id} />
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
