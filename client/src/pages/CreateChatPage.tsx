import React, { useEffect } from "react";
import { useGetChatByMembersQuery } from "../api/chats/chatsApi";
import { useNavigate, useParams } from "react-router";
import { useLazyGetUserByIdQuery } from "../api/users/usersApi";
import CreateChat from "../components/CreateChat";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

const CreateChatPage = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();
  const { theme } = useTheme();

  const { data } = useGetChatByMembersQuery(receiverId as string);
  const [triggetGetUserById, { data: receiverData }] =
    useLazyGetUserByIdQuery();

  useEffect(() => {
    if (data) {
      navigate(`/chat/${data._id}`);

      return;
    }

    if (receiverId) {
      triggetGetUserById(receiverId);
    }
  }, [data, receiverId]);

  const className = clsx("h-full flex flex-col", {
    "bg-chat-bg": theme === "light",
    "bg-chat-dark-200": theme === "dark",
  });

  return (
    <div className={className}>
      <div className="flex-1 flex justify-center items-center text-xl text-chat-gray-light">
        Start messaging with {receiverData?.firstName}{" "}
        {receiverData?.secondName}
      </div>
      <CreateChat />
    </div>
  );
};

export default CreateChatPage;
