import React from "react";
import { Message } from "../types/Message";
import MessageItem from "./MessageItem";

type MessagesListProps = {
  messages: Message[];
};

const MessagesList = ({ messages }: MessagesListProps) => {
  return (
    <div className="px-12 py-4 flex flex-col space-y-5 overflow-y-scroll no-scrollbar">
      {messages.map((m) => (
        <MessageItem data={m} key={m._id} />
      ))}
    </div>
  );
};

export default MessagesList;
