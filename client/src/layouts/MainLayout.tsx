import React, { useEffect } from "react";
import { Outlet } from "react-router";
import { useAppSelector } from "../redux/hooks";
import { io } from "socket.io-client";
import SideBar from "../components/SideBar";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-auto">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
