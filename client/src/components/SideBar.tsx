import React from "react";
import Header from "./Header";
import SearchBar from "./SearchBar";
import ChatsList from "./ChatsList";
import LogOut from "./LogOut";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const SideBar = () => {
  const { theme } = useTheme();

  const className = clsx("w-sidebar h-full border-r flex flex-col", {
    "border-chat-dark-border": theme === "dark",
  });

  return (
    <div className={className}>
      <div className="px-6">
        <Header />
        <SearchBar />
      </div>
      <ChatsList />
      <LogOut />
    </div>
  );
};

export default SideBar;
