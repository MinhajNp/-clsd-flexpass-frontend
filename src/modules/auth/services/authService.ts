
import { api } from "../../../api/axios";
import type {
  LoginDto,
  RegisterDto,
  RegisterResponse,
  VerifyOtpDto,
} from "../types/auth.types";
import type { AxiosResponse } from "axios";


export const register = (data: RegisterDto): Promise<AxiosResponse<RegisterResponse>> => {
  return api.post("/auth/register", data);
};

export const verifyOtp = (data: VerifyOtpDto) =>
  api.post("/auth/verify-otp", data);

export const login = async (data: LoginDto) => {
  const res = await api.post("/auth/login", data);
  return res.data.data; // accessToken is nested: data.data.accessToken
};

export const logout = async () => {
  await api.post("/auth/logout");
};

export const forgotPassword = async (email: string) => {
  const res = await api.post("/auth/forgot-password", { email });
  return res.data;
};

export const resetPassword = async (data: {
  email: string;
  otp: string;
  newPassword: string;
}) => {
  const res = await api.post("/auth/reset-password", data);
  return res.data;
};
