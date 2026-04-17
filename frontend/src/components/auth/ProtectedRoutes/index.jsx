import React, { Children } from "react";
import { Navigate, useLocation } from "react-router";
import { useAuth } from "../../../context/AuthContext";

const ProtectedRoutes = ({ children }) => {
  const { isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  if (!isAuthenticated) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
};

export default ProtectedRoutes;
