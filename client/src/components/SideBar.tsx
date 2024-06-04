import React from "react";
import Logo from "./Logo";
import SearchBar from "./SearchBar";
import ChatsList from "./ChatsList";
import LogOut from "./LogOut";

const SideBar = () => {
  return (
    <div className="w-sidebar h-full border-r flex flex-col">
      <div className="px-6">
        <Logo />
        <SearchBar />
      </div>
      <ChatsList />
      <LogOut />
    </div>
  );
};

export default SideBar;
