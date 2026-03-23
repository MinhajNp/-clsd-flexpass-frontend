export type RegisterDto = {
  name: string;
  email: string;
  password: string;
};

export type VerifyOtpDto = {
  email: string;
  otp: string;
};

export type RegisterResponse = {
  success: boolean;
  message: string;
};

export type LoginDto = {
  email: string;
  password: string;
};

export type LoginResponse = {
  requiresOtp?: boolean;
  accessToken?: string;
  message: string;
};

export type User = {
  id: string;
  name: string;
  email: string;
  status: "ACTIVE" | "BLOCKED";
};