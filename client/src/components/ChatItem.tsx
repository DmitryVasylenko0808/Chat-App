import React from "react";
import { NavLink } from "react-router-dom";
import { Chat } from "../types/Chat";
import { useAuth } from "../hooks/useAuth";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

type ChatItemProps = {
  data: Chat;
};

const ChatItem = ({ data }: ChatItemProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const otherUser = data.members.find((members) => members._id !== user?._id);
  const otherUserAvatarSrc = otherUser?.avatarUrl
    ? `${IMAGES_URL}/${otherUser.avatarUrl}`
    : NULL_IMAGES_URL;

  const itemParagraphClassName = clsx("text-lg font-medium", {
    "text-chat-item": theme === "light",
    "text-white": theme === "dark",
  });

  return (
    <NavLink
      to={`/chat/${data._id}`}
      className="py-3 px-6 flex items-center gap-4 hover:bg-chat-blue-normal/20"
    >
      <img
        src={otherUserAvatarSrc}
        className="w-14 h-14 rounded-full"
        alt={`${otherUser?.login}`}
      />
      <p className={itemParagraphClassName}>
        {otherUser?.firstName} {otherUser?.secondName}
      </p>
    </NavLink>
  );
};

export default ChatItem;
