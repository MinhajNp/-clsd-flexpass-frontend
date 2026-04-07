import { useState } from "react";
import toast from "react-hot-toast";
import * as authService from "../services/authService";
import type { LoginDto, RegisterDto, VerifyOtpDto } from "../types/auth.types";


export const useAuth = () => {
  const [loading, setLoading] = useState(false);

  const handleRegister = async (data: RegisterDto) => {
    try {
      setLoading(true);
      return await authService.register(data);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "Something went wrong";
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
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "Login failed";
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  const handleGoogleLogin = async (idToken: string) => {
    try {
      setLoading(true);
      return await authService.googleLogin(idToken);
    } catch (error: unknown) {
      const err = error as { response?: { data?: { message?: string } } };
      const message = err.response?.data?.message || "Google login failed";
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

  const handleForgotPassword = async (email: string) => {
    try {
      setLoading(true);
      return await authService.forgotPassword(email);
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      throw new Error(error.response?.data?.message || "Failed");
    } finally {
      setLoading(false);
    }
  };

  const handleResetPassword = async (data: {
    email: string;
    otp: string;
    newPassword: string;
  }) => {
    try {
      setLoading(true);
      return await authService.resetPassword(data);
    } finally {
      setLoading(false);
    }
  };

  const handleResendOtp = async (email: string) => {
    try {
      setLoading(true);
      const data = await authService.resendOtp(email);
      toast.success(data?.message || "OTP sent successfully");
      return data;
    } catch (err: unknown) {
      const error = err as { response?: { data?: { message?: string } } };
      const message = error.response?.data?.message || "Failed to resend OTP";
      toast.error(message);
      throw new Error(message);
    } finally {
      setLoading(false);
    }
  };

  return {
    loading,
    handleRegister,
    handleVerifyOtp,
    handleLogin,
    handleGoogleLogin,
    handleLogout,
    handleForgotPassword,
    handleResetPassword,
    handleResendOtp,
  };
};
