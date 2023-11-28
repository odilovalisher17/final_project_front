// PrivateRoute.js
import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "./AuthContext";
import Cookies from "js-cookie";

function PrivateRoute({ children }) {
  const { isLoggedIn } = useAuth();
  const token = Cookies.get("authToken");

  return isLoggedIn || token ? children : <Navigate to="/login" />;
}

export default PrivateRoute;
