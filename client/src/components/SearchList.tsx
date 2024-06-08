import React from "react";
import { SearchUsersDto } from "../api/users/dto/SearchUserDto";
import { Link } from "react-router-dom";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

type SearchListProps = {
  data: SearchUsersDto;
};

const SearchList = ({ data }: SearchListProps) => {
  const { theme } = useTheme();

  const className = clsx(
    "absolute top-full left-0 z-10 w-full border-x border-b flex flex-col",
    {
      "bg-white": theme === "light",
      "bg-chat-dark-200 border-chat-dark-border": theme === "dark",
    }
  );

  const itemParagraphClassName = clsx("text-lg font-medium", {
    "text-chat-item": theme === "light",
    "text-white": theme === "dark",
  });

  return (
    <div className={className}>
      {data.map((item) => (
        <Link
          to={`/chat-create/${item._id}`}
          className="py-3 px-6 flex items-center gap-4 bg-inherit hover:bg-chat-blue-normal/20"
          key={item._id}
        >
          <img
            src={
              item?.avatarUrl
                ? `${IMAGES_URL}/${item.avatarUrl}`
                : NULL_IMAGES_URL
            }
            className="w-14 h-14 rounded-full"
            alt={`${item.login}`}
          />
          <p className={itemParagraphClassName}>
            {item.firstName} {item.secondName}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchList;
