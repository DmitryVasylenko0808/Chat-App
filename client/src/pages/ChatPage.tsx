import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../contexts/SocketContext";
import ChatHeader from "../components/ChatHeader";
import MessagesList from "../components/MessagesList";

const ChatPage = () => {
  const { id } = useParams();

  const context = useContext(SocketContext);

  useEffect(() => {
    if (id) {
      console.log("joning chat", id);
      context?.joinChat(id);
      context?.getMessages(id);
    }

    return () => {
      console.log("Leavig chat", id);
      context?.leaveChat(id!);
    };
  }, [id]); // null after refresh page !!!

  console.log(context?.currentChat);
  console.log(context?.messages);

  return (
    <div className="h-full bg-chat-bg flex flex-col">
      <ChatHeader chat={context?.currentChat} />
      <MessagesList messages={context?.messages || []} />
    </div>
  );
};

export default ChatPage;
