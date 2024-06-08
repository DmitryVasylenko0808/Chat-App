import React from "react";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const NoChatPage = () => {
  const { theme } = useTheme();

  const className = clsx("h-full bg-chat-bg flex justify-center items-center", {
    "bg-chat-bg": theme === "light",
    "bg-chat-dark-200": theme === "dark",
  });

  return (
    <div className={className}>
      <span className="text-xl text-chat-gray-light">No chat selected</span>
    </div>
  );
};

export default NoChatPage;
