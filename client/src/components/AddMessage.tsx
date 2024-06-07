import React, { useContext, useEffect } from "react";
import Button from "./Button";
import { useParams } from "react-router";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { SocketContext } from "../contexts/SocketContext";

const sendMessageSchema = z.object({
  body: z.string().min(1, "Text is required"),
});

type AddMessageFields = z.infer<typeof sendMessageSchema>;

const AddMessage = () => {
  const { id } = useParams();

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

  return (
    <form
      className="py-5 px-12 flex bg-white"
      onSubmit={handleSubmit(submitHandler)}
    >
      <input
        {...register("body")}
        className="w-full outline-none font-light text-2xl text-chat-gray-normal"
        placeholder="Type a message..."
      />
      <Button type="submit" size="normal">
        Send
      </Button>
    </form>
  );
};

export default AddMessage;
