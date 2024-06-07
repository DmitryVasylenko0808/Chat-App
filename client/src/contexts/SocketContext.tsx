import { ReactNode, createContext, useEffect, useRef, useState } from "react";
import { Socket, io } from "socket.io-client";
import { useAuth } from "../hooks/useAuth";
import { Chat } from "../types/Chat";
import { Message } from "../types/Message";
import { useNavigate } from "react-router";

export type SocketContextState = {
  chats: Chat[];
  currentChat?: Chat;
  messages?: Message[];

  joinChat: (chatId: string) => void;
  leaveChat: (chatId: string) => void;
  getMessages: (chatid: string) => void;
  sendMessage: (data: { chatId: string; body: string }) => void;
  createChat: (data: { receiverId: string; message: string }) => void;
};

export const SocketContext = createContext<SocketContextState | null>(null);

type SocketContextProviderProps = {
  children: ReactNode;
};

export const SocketContextProvider = ({
  children,
}: SocketContextProviderProps) => {
  const navigate = useNavigate();

  const { token } = useAuth();

  const [chats, setChats] = useState<Chat[]>([]);
  const [currentChat, setCurrentChat] = useState<Chat>();
  const [messages, setMessages] = useState<Message[]>([]);

  const socket = useRef<Socket | null>(null);

  useEffect(() => {
    const handleGetChats = (data: Chat[]) => setChats(data);
    const handleGetOneChat = (data: Chat) => setCurrentChat(data);
    const handleGetMessages = (data: Message[]) => setMessages(data);

    const handleCreatedChat = (chatId: string) => navigate(`/chat/${chatId}`);

    if (token) {
      socket.current = io("http://localhost:3001", {
        autoConnect: false,
        auth: {
          token,
        },
      });

      socket.current.connect();

      socket.current.emit("user:online");

      socket.current.emit("chats:get");
      socket.current.on("chats", handleGetChats);

      socket.current.on("chats:joined", handleGetOneChat);
      socket.current.on("messages", handleGetMessages);

      socket.current.on("chats:created", handleCreatedChat);
    }

    return () => {
      socket.current?.off("chats", handleGetChats);
      socket.current?.off("chats:joined", handleGetOneChat);
      socket.current?.off("messages", handleGetMessages);
      socket.current?.off("chats:created");

      socket.current?.disconnect();
    };
  }, [token]);

  const joinChat = (chatId: string) => {
    socket.current?.emit("chats:join", { chatId });
  };

  const leaveChat = (chatId: string) => {
    socket.current?.emit("chats:leave", { chatId });
  };

  const getMessages = (chatId: string) => {
    socket.current?.emit("messages:get", { chatId });
  };

  const sendMessage = (data: { chatId: string; body: string }) => {
    socket.current?.emit("messages:send", data);
  };

  const createChat = (data: { receiverId: string; message: string }) => {
    socket.current?.emit("chats:create", data);
  };

  return (
    <SocketContext.Provider
      value={{
        chats,
        currentChat,
        messages,
        joinChat,
        leaveChat,
        getMessages,
        sendMessage,
        createChat,
      }}
    >
      {children}
    </SocketContext.Provider>
  );
};
