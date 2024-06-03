import React from "react";
import { useAuth } from "../hooks/useAuth";

const NoChatPage = () => {
  const { logOut } = useAuth();

  return <button onClick={logOut}>NoChatPage</button>;
};

export default NoChatPage;
