import { ReactNode, createContext, useEffect } from "react";
import { Socket, io } from "socket.io-client";
import { useAppSelector } from "../redux/hooks";
import { useAuth } from "../hooks/useAuth";

export const SocketContext = createContext<Socket | null>(null);

type SocketContextProviderProps = {
  children: ReactNode;
};

const SocketContextProvider = ({ children }: SocketContextProviderProps) => {
  const { user } = useAuth();

  const socket = io("http://localhost:3001", {
    autoConnect: false,
    query: {
      userId: user?._id,
    },
  });

  useEffect(() => {
    if (user) {
      socket.connect();
    }
  }, [user]);

  return (
    <SocketContext.Provider value={socket}>{children}</SocketContext.Provider>
  );
};

export default SocketContextProvider;
