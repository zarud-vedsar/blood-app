import React from "react";
import { Navigate } from "react-router-dom";
import secureLocalStorage from "react-secure-storage";

const ProtectedRoute = ({ element }) => {
  const loguserid = parseInt(secureLocalStorage.getItem("loguserid"), 10);

  if (isNaN(loguserid) || loguserid <= 0) {
    return <Navigate to="/" replace />;
  }
  return element;
};
export default ProtectedRoute;
