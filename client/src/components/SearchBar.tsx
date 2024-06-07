import React, { useEffect, useState } from "react";
import { BiSearch } from "react-icons/bi";
import { useLazySearchUsersQuery } from "../api/users/usersApi";
import SearchList from "./SearchList";

const SearchBar = () => {
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

  return (
    <div className="relative mb-6 p-2 border-2 rounded-xl flex items-center gap-2.5 text-chat-gray-strength">
      <BiSearch className="text-chat-gray-light" size={22} />
      <input
        className="block w-full outline-none"
        placeholder="Search people"
        onChange={handleChange}
      />
      {searchValue && data && <SearchList data={data} />}
    </div>
  );
};

export default SearchBar;
