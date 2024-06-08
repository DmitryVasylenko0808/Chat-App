import React, { useContext } from "react";
import ChatItem from "./ChatItem";
import { SocketContext } from "../contexts/SocketContext";

const ChatsList = () => {
  const context = useContext(SocketContext);

  return (
    <div className="flex-1 flex flex-col">
      <h2 className="mb-2 px-6 text-xs text-chat-gray-light font-medium">
        All messages
      </h2>
      <div className="flex-1 flex flex-col overflow-y-scroll no-scrollbar">
        {context?.chats.map((c) => (
          <ChatItem data={c} key={c._id} />
        ))}
      </div>
    </div>
  );
};

export default ChatsList;
