import React from "react";
import { useAuth } from "../hooks/useAuth";
import { BiSolidLogOut } from "react-icons/bi";

const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <div className="mt-auto bg-chat-blue-normal">
      <button
        onClick={logOut}
        className="py-5 px-6 text-4xl text-white font-semibold bg-inherit hover:bg-chat-blue-active active:bg-chat-blue-active"
        aria-label="log out"
      >
        <BiSolidLogOut />
      </button>
    </div>
  );
};

export default LogOut;
