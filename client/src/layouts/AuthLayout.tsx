import React from "react";
import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const AuthLayout = () => {
  const { theme } = useTheme();

  const className = clsx(
    "min-h-screen flex flex-col justify-center items-center",
    {
      "bg-chat-dark-300": theme === "dark",
    }
  );

  return (
    <div className={className}>
      <h1 className="mb-8 text-center text-chat-blue-normal text-3xl font-semibold">
        Chat App
      </h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
