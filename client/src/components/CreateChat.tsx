import React, { useContext } from "react";
import { SocketContext } from "../contexts/SocketContext";
import Button from "./Button";
import { useParams } from "react-router";
import { useForm } from "react-hook-form";
import { useTheme } from "../hooks/useTheme";
import { zodResolver } from "@hookform/resolvers/zod";
import { z } from "zod";
import clsx from "clsx";

const createChatSchema = z.object({
  message: z.string().min(1, "Text is required"),
});

type CreateChatFields = z.infer<typeof createChatSchema>;

const CreateChat = () => {
  const { receiverId } = useParams();
  const { theme } = useTheme();

  const context = useContext(SocketContext);

  const { register, handleSubmit } = useForm<CreateChatFields>({
    resolver: zodResolver(createChatSchema),
  });

  const submitHandler = (data: CreateChatFields) => {
    if (receiverId) {
      context?.createChat({ ...data, receiverId });
    }
  };

  const className = clsx("py-5 px-12 flex", {
    "bg-white": theme === "light",
    "bg-chat-dark-300": theme === "dark",
  });

  const inputClassName = clsx(
    "w-full outline-none bg-inherit font-light text-2xl",
    {
      "text-chat-gray-normal": theme === "light",
      "text-white": theme === "dark",
    }
  );

  return (
    <form className={className} onSubmit={handleSubmit(submitHandler)}>
      <input
        {...register("message")}
        className={inputClassName}
        placeholder="Type a message..."
      />
      <Button type="submit" size="normal">
        Send
      </Button>
    </form>
  );
};

export default CreateChat;
