import React, { useContext } from "react";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";
import { Chat } from "../types/Chat";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";
import { SocketContext } from "../contexts/SocketContext";
import BadgeOnline from "./BadgeOnline";

type ChatHeaderProps = {
  chat?: Chat | null;
};

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();
  const context = useContext(SocketContext);

  const receiver = chat?.members.find((member) => member._id !== user?._id);
  const receiverAvatarSrc = receiver?.avatarUrl
    ? `${IMAGES_URL}/${receiver.avatarUrl}`
    : NULL_IMAGES_URL;

  const isOnlineReceiver =
    receiver && context?.onlineUsers.includes(receiver._id);

  const className = clsx("px-12 py-4 border-b", {
    "bg-white text-chat-gray-strength": theme === "light",
    "bg-chat-dark-300 text-white border-chat-dark-border": theme === "dark",
  });

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <div className="relative w-14 h-14">
          <img
            src={receiverAvatarSrc}
            className="w-14 h-14 rounded-full"
            alt={`${receiver?.login}`}
          />
          {isOnlineReceiver && <BadgeOnline />}
        </div>
        <div>
          <h2 className="mb-1 font-medium text-xl">
            {receiver?.firstName} {receiver?.secondName}
          </h2>
          <p className="text-sm">
            {isOnlineReceiver ? (
              <span className="text-chat-blue-normal">Online</span>
            ) : (
              <span className="text-chat-gray-light">Offline</span>
            )}
          </p>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
