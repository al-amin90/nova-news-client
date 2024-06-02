import React from "react";
import useAuth from "../Hooks/useAuth";
import Loader from "../Pages/Shared/Loader";
import { Navigate, useLocation } from "react-router-dom";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
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

export default PrivateRouter;
