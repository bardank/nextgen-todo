import React, { FC } from "react";
import PropTypes from "prop-types";
import { useAuthStore } from "../store/auth";
import { Navigate, Outlet, redirect } from "react-router-dom";
import { FullPageLoader } from "./loaders/FullPageLoader";

const ProtectRoutes: FC = () => {
  const { user, loading, isAuthenticated } = useAuthStore();
  if (loading) {
    return <FullPageLoader/>;
  }
  if (user && isAuthenticated && !loading) {
    return <Navigate replace={true} to="/" />;
  }
  return <Outlet />;
};

export default ProtectRoutes;
