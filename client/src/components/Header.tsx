import React from "react";
import { Link } from "react-router-dom";
import { RiMessage3Fill, RiSunFill } from "react-icons/ri";
import { RiMoonFill } from "react-icons/ri";
import Button from "./Button";
import { useTheme } from "../hooks/useTheme";

const Header = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggleTheme = () => toggleTheme();

  return (
    <div className="py-5 flex justify-between">
      <h1 className="flex items-center text-2xl text-chat-blue-normal font-semibold">
        <Link to="/" className="inline-flex items-center gap-3">
          <RiMessage3Fill className="text-4xl" />
          Chat App
        </Link>
      </h1>
      <Button onClick={handleToggleTheme} variant="theme">
        {theme === "dark" ? <RiSunFill size={28} /> : <RiMoonFill size={28} />}
      </Button>
    </div>
  );
};

export default Header;
