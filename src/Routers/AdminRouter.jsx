import React from "react";
import { Navigate, useLocation } from "react-router-dom";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Shared/Loader";
import useRole from "../Hooks/useRole";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const [isAdmin, isLoading] = useRole();
  const location = useLocation();

  if (loading) {
    return <Loader></Loader>;
  }

  if (user) {
    return children;
  }
  return (
    <Navigate to="/login" state={location.pathname} replace="true"></Navigate>
  );
};

export default AdminRouter;
