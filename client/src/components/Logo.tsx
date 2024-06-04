import React from "react";
import { Link } from "react-router-dom";

const Logo = () => {
  return (
    <div className="pt-5 pb-7">
      <h1 className="text-2xl text-chat-blue-normal font-semibold">
        <Link to="/">Chat App</Link>
      </h1>
    </div>
  );
};

export default Logo;
