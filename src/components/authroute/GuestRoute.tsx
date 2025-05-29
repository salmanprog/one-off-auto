// src/components/authroute/GuestRoute.tsx
import React from "react";
import { Navigate } from "react-router-dom";

const GuestRoute = ({ children }: { children: JSX.Element }) => {
  const isAuthenticated = !!localStorage.getItem("session");

  return isAuthenticated ? <Navigate to="/" replace /> : children;
};

export default GuestRoute;
