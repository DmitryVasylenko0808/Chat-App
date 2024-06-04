import React from "react";
import { BiSearch } from "react-icons/bi";

const SearchBar = () => {
  return (
    <div className="mb-6 p-2 border-2 rounded-xl flex items-center gap-2.5 text-chat-gray-strength">
      <BiSearch className="text-chat-gray-light" size={22} />
      <input
        className="block w-full outline-none"
        placeholder="Search people"
      />
    </div>
  );
};

export default SearchBar;
