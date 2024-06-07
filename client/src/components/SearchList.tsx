import React from "react";
import { SearchUsersDto } from "../api/users/dto/SearchUserDto";
import { Link } from "react-router-dom";
import { IMAGES_URL, NULL_IMAGES_URL } from "../contants/api";

type SearchListProps = {
  data: SearchUsersDto;
};

const SearchList = ({ data }: SearchListProps) => {
  return (
    <div className="absolute top-full left-0 z-10 w-full bg-white flex flex-col">
      {data.map((item) => (
        <Link
          to={`/chat-create/${item._id}`}
          className="py-3 px-6 flex items-center gap-4 hover:bg-chat-blue-normal/20"
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
          <p className="text-lg font-medium text-chat-item">
            {item.firstName} {item.secondName}
          </p>
        </Link>
      ))}
    </div>
  );
};

export default SearchList;
