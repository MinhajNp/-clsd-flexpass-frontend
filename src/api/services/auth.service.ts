import { api } from "../axios";
import type { LoginDto, RegisterDto, RegisterResponse, VerifyOtpDto } from "../../types/auth.types";
import type { AxiosResponse } from "axios";


export const register = (data: RegisterDto): Promise<AxiosResponse<RegisterResponse>> =>{
  return api.post("/auth/register", data);
}

export const verifyOtp = (data: VerifyOtpDto) =>
  api.post("/auth/verify-otp", data);

export const login = async (data: LoginDto) => {
  const res = await api.post("/auth/login", data);
  return res.data.data;  //as accesstoken is nested = data.data.accessToken
};

export const logout = async () => {
  await api.post("/auth/logout");
};