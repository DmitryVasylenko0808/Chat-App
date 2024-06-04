import React from "react";
import { NavLink } from "react-router-dom";
import { Chat } from "../types/Chat";
import { useAuth } from "../hooks/useAuth";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";

type ChatItemProps = {
  data: Chat;
};

const ChatItem = ({ data }: ChatItemProps) => {
  const { user } = useAuth();

  const otherUser = data.members.find((members) => members._id !== user?._id);
  const otherUserAvatarSrc = otherUser?.avatarUrl
    ? `${IMAGES_URL}/${otherUser.avatarUrl}`
    : NULL_IMAGES_URL;

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
      <p className="text-lg font-medium text-chat-item">
        {otherUser?.firstName} {otherUser?.secondName}
      </p>
    </NavLink>
  );
};

export default ChatItem;
