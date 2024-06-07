import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../contexts/SocketContext";
import ChatHeader from "../components/ChatHeader";
import MessagesList from "../components/MessagesList";
import AddMessage from "../components/AddMessage";
import { useAuth } from "../hooks/useAuth";

const ChatPage = () => {
  const { id } = useParams();
  const { user } = useAuth();

  const context = useContext(SocketContext);

  useEffect(() => {
    if (id) {
      context?.joinChat(id);
      context?.getMessages(id);
    }

    return () => {
      context?.leaveChat(id!);
    };
  }, [id, user]);

  return (
    <div className="h-full bg-chat-bg flex flex-col">
      <ChatHeader chat={context?.currentChat} />
      <MessagesList messages={context?.messages || []} />
      <AddMessage />
    </div>
  );
};

export default ChatPage;
