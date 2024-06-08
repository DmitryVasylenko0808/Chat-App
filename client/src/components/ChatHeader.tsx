import React from "react";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";
import { Chat } from "../types/Chat";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

type ChatHeaderProps = {
  chat?: Chat | null;
};

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const receiver = chat?.members.find((member) => member._id !== user?._id);
  const receiverAvatarSrc = receiver?.avatarUrl
    ? `${IMAGES_URL}/${receiver.avatarUrl}`
    : NULL_IMAGES_URL;

  const className = clsx("px-12 py-4 border-b", {
    "bg-white text-chat-gray-strength": theme === "light",
    "bg-chat-dark-300 text-white border-chat-dark-border": theme === "dark",
  });

  return (
    <div className={className}>
      <div className="flex items-center gap-4">
        <img
          src={receiverAvatarSrc}
          className="w-14 h-14 rounded-full"
          alt="null"
        />
        <h2 className="font-medium text-xl">
          {receiver?.firstName} {receiver?.secondName}
        </h2>
      </div>
    </div>
  );
};

export default ChatHeader;
