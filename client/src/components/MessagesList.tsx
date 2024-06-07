import React, { useEffect, useRef } from "react";
import { Message } from "../types/Message";
import MessageItem from "./MessageItem";

type MessagesListProps = {
  messages: Message[];
};

const MessagesList = ({ messages }: MessagesListProps) => {
  const bottomRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    bottomRef.current?.scrollIntoView({ behavior: "smooth" });

    console.log("list");
  }, [messages]);

  return (
    <div className="flex-1 px-12 py-4 flex flex-col space-y-5 overflow-y-scroll no-scrollbar">
      {messages.map((m) => (
        <MessageItem data={m} key={m._id} />
      ))}
      <div ref={bottomRef} />
    </div>
  );
};

export default MessagesList;
