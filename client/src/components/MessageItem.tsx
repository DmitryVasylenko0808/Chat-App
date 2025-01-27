import React from "react";
import { Message } from "../types/Message";
import { useAuth } from "../hooks/useAuth";
import { useTheme } from "../hooks/useTheme";
import ReactTimeAgo from "react-time-ago";
import clsx from "clsx";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";

type MessageItemProps = {
  data: Message;
};

const MessageItem = ({ data }: MessageItemProps) => {
  const { user } = useAuth();
  const { theme } = useTheme();

  const senderAvatarSrc = data.sender?.avatarUrl
    ? `${IMAGES_URL}/${data.sender.avatarUrl}`
    : NULL_IMAGES_URL;

  const isFromMe = data.sender._id === user?._id;

  const messageContainerClassName = clsx("flex gap-3.5", {
    "flex-row-reverse 2xl:flex-row": isFromMe,
  });

  const messageMetaClassName = clsx("mb-3 flex items-center gap-4", {
    "flex-row-reverse 2xl:flex-row": isFromMe,
    "text-white": theme === "dark",
  });

  const messageParentBoxClassName = clsx("flex justify-start", {
    "justify-end 2xl:justify-start": isFromMe,
  });

  const messageBoxClassName = clsx(
    "px-6 py-4 inline-block 2xl:rounded-xl 2xl:rounded-tl-none font-light text-lg",
    {
      "bg-chat-blue-normal text-white rounded-xl rounded-tr-none": isFromMe,
      "rounded-xl rounded-tl-none": !isFromMe,
      "bg-white": !isFromMe && theme === "light",
      "bg-[#3b3b3b] text-white": !isFromMe && theme === "dark",
    }
  );

  return (
    <div className={messageContainerClassName}>
      <img
        src={senderAvatarSrc}
        className="w-12 h-12 rounded-full bg-[#3b3b3b]"
        alt="none"
      />
      <div className="">
        <div className={messageMetaClassName}>
          <span className="font-medium">
            {data.sender.firstName} {data.sender.secondName}
          </span>
          <span className="font-light text-xs text-chat-gray-light">
            <ReactTimeAgo date={data.createdAt} updateInterval={60} />
          </span>
        </div>
        <div className={messageParentBoxClassName}>
          <div className={messageBoxClassName}>{data.body}</div>
        </div>
      </div>
    </div>
  );
};

export default MessageItem;
