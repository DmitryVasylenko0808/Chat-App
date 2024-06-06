import React from "react";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";
import { Chat } from "../types/Chat";
import { useAuth } from "../hooks/useAuth";

type ChatHeaderProps = {
  chat?: Chat;
};

const ChatHeader = ({ chat }: ChatHeaderProps) => {
  const { user } = useAuth();

  const receiver = chat?.members.find((member) => member._id !== user?._id);
  const receiverAvatarSrc = receiver?.avatarUrl
    ? `${IMAGES_URL}/${receiver.avatarUrl}`
    : NULL_IMAGES_URL;

  return (
    <div className="px-12 py-4 bg-white border-b">
      <div className="flex items-center gap-4">
        <img
          src={receiverAvatarSrc}
          className="w-14 h-14 rounded-full"
          alt="null"
        />
        <div className="">
          <h2 className="font-medium text-xl text-chat-gray-strength">
            {receiver?.firstName} {receiver?.secondName}
          </h2>
        </div>
      </div>
    </div>
  );
};

export default ChatHeader;
