import React, { useEffect } from "react";
import SideBar from "../components/SideBar";
import { Outlet } from "react-router";
import { useTheme } from "../hooks/useTheme";
import clsx from "clsx";

const MainLayout = () => {
  const { theme } = useTheme();

  const mainLayoutClassName = clsx("flex h-screen", {
    "bg-chat-dark-300": theme === "dark",
  });

  return (
    <div className={mainLayoutClassName}>
      <SideBar />
      <div className="flex-1">
        <Outlet />
      </div>
    </div>
  );
};

export default MainLayout;
