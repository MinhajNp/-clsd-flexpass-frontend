import { useNavigate } from "react-router-dom";
import { jwtDecode } from "jwt-decode";

interface TokenPayload {
  userId: string;
  role: string;
  isApproved?: boolean;
}

export const useRedirect = () => {
  const navigate = useNavigate();

  const getRedirectPath = (token: string, user?: any): string => {
    try {
      const decoded = jwtDecode<TokenPayload>(token);
      const { role, isApproved } = decoded;

      switch (role) {
        case "PLATFORM_ADMIN":
          return "/admin";
        case "GYM_ADMIN":
          return isApproved ? "/gym-admin" : "/gym/pending-approval";
        case "USER":
          return user?.active_membership && user.active_membership !== "no_plan" ? "/dashboard" : "/";
        default:
          return "/dashboard";
      }
    } catch (error) {
      console.error("Failed to decode token:", error);
      return "/auth";
    }
  };

  const performRedirect = (token: string, user?: any) => {
    const path = getRedirectPath(token, user);
    navigate(path);
  };

  return { performRedirect, getRedirectPath };
};
