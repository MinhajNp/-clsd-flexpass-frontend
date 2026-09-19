import type { JSX } from "react";
import { Navigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

type Props = {
  children: JSX.Element;
  allowedRoles?: string[];
};

interface TokenPayload {
  userId: string;
  role: string;
}

const ProtectedRoute = ({ children, allowedRoles }: Props) => {
  const token = localStorage.getItem("accessToken");

  if (!token) {
    return <Navigate to="/auth" replace />;
  }

  try {
    const decoded = jwtDecode<TokenPayload>(token);
    const userRole = decoded.role;

    if (allowedRoles && !allowedRoles.includes(userRole)) {
      // If user's role is not allowed for this route, redirect them to unauthorized or login
      return <Navigate to="/auth" replace />;
    }
  } catch (error) {
    console.error("Token decoding failed:", error);
    localStorage.removeItem("accessToken");
    return <Navigate to="/auth" replace />;
  }

  return children;
};

export default ProtectedRoute;
