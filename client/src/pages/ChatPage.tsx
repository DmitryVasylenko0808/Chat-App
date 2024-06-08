import React, { useContext, useEffect } from "react";
import { useParams } from "react-router";
import { SocketContext } from "../contexts/SocketContext";
import ChatHeader from "../components/ChatHeader";
import MessagesList from "../components/MessagesList";
import AddMessage from "../components/AddMessage";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const ChatPage = () => {
  const { id } = useParams();
  const { user } = useAuth();
  const { theme } = useTheme();

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

  const className = clsx("h-full bg-chat-bg flex flex-col", {
    "bg-chat-bg": theme === "light",
    "bg-chat-dark-200": theme === "dark",
  });

  return (
    <div className={className}>
      <ChatHeader chat={context?.currentChat} />
      <MessagesList messages={context?.messages || []} />
      <AddMessage />
    </div>
  );
};

export default ChatPage;
