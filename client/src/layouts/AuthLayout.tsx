import React from "react";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div className="min-h-screen flex flex-col justify-center items-center">
      <h1 className="mb-8 text-center text-chat-blue-normal text-3xl font-semibold">
        Chat App
      </h1>
      <Outlet />
    </div>
  );
};

export default AuthLayout;
