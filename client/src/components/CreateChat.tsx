import React, { useContext } from "react";
import Button from "./Button";
import { z } from "zod";
import { useNavigate, useParams } from "react-router";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocketContext } from "../contexts/SocketContext";

const createChatSchema = z.object({
  message: z.string().min(1, "Text is required"),
});

type CreateChatFields = z.infer<typeof createChatSchema>;

const CreateChat = () => {
  const { receiverId } = useParams();

  const context = useContext(SocketContext);

  const { register, handleSubmit } = useForm<CreateChatFields>({
    resolver: zodResolver(createChatSchema),
  });

  const submitHandler = (data: CreateChatFields) => {
    if (receiverId) {
      context?.createChat({ ...data, receiverId });
    }
  };

  return (
    <form
      className="py-5 px-12 flex bg-white"
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        {...register("message")}
        className="w-full outline-none font-light text-2xl text-chat-gray-normal"
        placeholder="Type a message..."
      />
      <Button type="submit" size="normal">
        Send
      </Button>
    </form>
  );
};

export default CreateChat;
