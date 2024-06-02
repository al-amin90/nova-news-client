import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Shared/Loader";
import useRole from "../Hooks/useRole";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isLoading] = useRole();

  if (loading || isLoading) {
    return <Loader></Loader>;
  }

  if (isAdmin && user) {
    return children;
  }
  return <Navigate to="/" replace="true"></Navigate>;
};

export default AdminRouter;
