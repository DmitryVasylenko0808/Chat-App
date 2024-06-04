import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate, Outlet } from "react-router";
import SocketContextProvider from "../contexts/SocketContext";

const RequireAuth = () => {
  const { isAuthenticated } = useAuth();

  if (!isAuthenticated) {
    return <Navigate to="/auth/sign-in" />;
  }

  return (
    <SocketContextProvider>
      <Outlet />
    </SocketContextProvider>
  );
};

export default RequireAuth;
