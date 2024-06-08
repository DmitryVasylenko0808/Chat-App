import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { useParams } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocketContext } from "../contexts/SocketContext";
import clsx from "clsx";
import { useTheme } from "../hooks/useTheme";

const sendMessageSchema = z.object({
  body: z.string().min(1, "Text is required"),
});

type AddMessageFields = z.infer<typeof sendMessageSchema>;

const AddMessage = () => {
  const { id } = useParams();
  const { theme } = useTheme();

  const context = useContext(SocketContext);

  const { register, handleSubmit, reset } = useForm<AddMessageFields>({
    resolver: zodResolver(sendMessageSchema),
  });

  useEffect(() => {
    reset();
  }, [id]);

  const submitHandler = (data: AddMessageFields) => {
    if (id) {
      context?.sendMessage({ ...data, chatId: id });
      reset();
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
        {...register("body")}
        className={inputClassName}
        placeholder="Type a message..."
      />
      <Button type="submit" size="normal">
        Send
      </Button>
    </form>
  );
};

export default AddMessage;
