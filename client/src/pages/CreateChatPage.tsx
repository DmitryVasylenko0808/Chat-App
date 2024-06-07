import React, { useEffect } from "react";
import { useGetChatByMembersQuery } from "../api/chats/chatsApi";
import { useNavigate, useParams } from "react-router";
import { useLazyGetUserByIdQuery } from "../api/users/usersApi";
import CreateChat from "../components/CreateChat";

const CreateChatPage = () => {
  const { receiverId } = useParams();
  const navigate = useNavigate();

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

  return (
    <div className="h-full bg-chat-bg flex flex-col">
      <div className="flex-1 flex justify-center items-center text-xl text-chat-gray-light">
        Start messaging with {receiverData?.firstName}{" "}
        {receiverData?.secondName}
      </div>
      <CreateChat />
    </div>
  );
};

export default CreateChatPage;
