import React from "react";
import ChatItem from "./ChatItem";

const ChatsList = () => {
  return (
    <div className="">
      <h2 className="mb-2 px-6 text-xs text-chat-gray-light font-medium">
        All messages
      </h2>
      <div className="flex flex-col h-chatList overflow-y-scroll no-scrollbar">
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
        <ChatItem />
      </div>
    </div>
  );
};

export default ChatsList;
