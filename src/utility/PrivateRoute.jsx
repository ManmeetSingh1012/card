import React from "react";
import { useSelector } from "react-redux";
import { Outlet, Navigate } from "react-router-dom";

export default function PrivateRoute() {
  const currentUser = useSelector((state) => state.user.status);
  console.log(currentUser);
  return currentUser ? <Outlet /> : <Navigate to="/" />;

  // return currentUser ? <Navigate to="/" /> : <Outlet />;
}
