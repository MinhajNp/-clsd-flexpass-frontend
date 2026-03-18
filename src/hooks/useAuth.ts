import { useState } from "react";
import * as authService from "../api/services/auth.service";
import type { LoginDto, RegisterDto, VerifyOtpDto } from "../types/auth.types";


export const useAuth = () => {
  const [loading, setLoading] = useState(false);

const handleRegister = async (data: RegisterDto) => {
  try {
    setLoading(true);
    return await authService.register(data);
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Something went wrong";
    throw new Error(message);
  } finally {
    setLoading(false);
  }
};

  const handleVerifyOtp = async (data: VerifyOtpDto) => {
    try {
      setLoading(true);
      const res = await authService.verifyOtp(data);
      return res.data;
    } finally {
      setLoading(false);
    }
  };

  const handleLogin = async (data: LoginDto) => {
  try {
    setLoading(true);
    return await authService.login(data);
  } catch (error: any) {
    const message =
      error.response?.data?.message || "Login failed";
    throw new Error(message);
  } finally {
    setLoading(false);
  }
};

const handleLogout = async () => {
  try {
    await authService.logout();
  } catch (error) {
    console.error("Logout failed");
  } finally {
    localStorage.removeItem("accessToken");
  }
};

  return {
    loading,
    handleRegister,
    handleVerifyOtp,
    handleLogin,
    handleLogout
  };
};