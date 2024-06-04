import React from "react";
import { NavLink } from "react-router-dom";

const ChatItem = () => {
  return (
    <NavLink
      to={`/chat/1`}
      className="py-3 px-6 flex items-center gap-4 hover:bg-chat-blue-normal/20"
    >
      <div className="w-14 h-14 rounded-full bg-gray-400" />
      <p className="text-lg font-medium text-chat-item">Lucas Williams</p>
    </NavLink>
  );
};

export default ChatItem;
