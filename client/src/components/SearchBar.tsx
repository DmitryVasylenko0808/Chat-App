import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useLazySearchUsersQuery } from "../api/users/usersApi";
import SearchList from "./SearchList";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const SearchBar = () => {
  const { theme } = useTheme();

  const [searchValue, setSearchValue] = useState<string>("");

  const [triggerSearchUsers, { data }] = useLazySearchUsersQuery();

  useEffect(() => {
    const timer = setTimeout(
      () => searchValue && triggerSearchUsers(searchValue),
      500
    );

    return () => clearTimeout(timer);
  }, [searchValue]);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setSearchValue(e.target.value);
  };

  const className = clsx(
    "relative mb-6 p-2 border-2 rounded-xl flex items-center gap-2.5 text-chat-gray-strength",
    {
      "border-chat-gray-light": theme === "dark",
    }
  );

  const inputClassName = clsx("block w-full outline-none bg-inherit", {
    "text-white": theme === "dark",
  });

  return (
    <div className={className}>
      <BiSearch className="text-chat-gray-light" size={22} />
      <input
        className={inputClassName}
        placeholder="Search people"
        onChange={handleChange}
      />
      {searchValue && data && <SearchList data={data} />}
    </div>
  );
};

export default SearchBar;
