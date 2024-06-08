import React from "react";
import { useAuth } from "../hooks/useAuth";
import { BiSolidLogOut } from "react-icons/bi";
import Button from "./Button";

const LogOut = () => {
  const { logOut } = useAuth();

  return (
    <div className="mt-auto bg-chat-blue-normal">
      <Button onClick={logOut} variant="logout" aria-label="log out">
        <BiSolidLogOut size={32} />
      </Button>
    </div>
  );
};

export default LogOut;
