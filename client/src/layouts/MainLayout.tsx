import React, { useEffect } from "react";
import { Outlet } from "react-router";
import SideBar from "../components/SideBar";
import { socket } from "../socket";

const MainLayout = () => {
  return (
    <div className="flex h-screen">
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
