import type { User } from "../../types/auth.types";
import { api } from "../axios";

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get("/admin/users");
  console.log(res.data.data)
  return res.data.data; // normalize
};

export const blockUser = async (userId: string) => {
  await api.patch(`/admin/users/${userId}/block`);
};

export const unblockUser = async (userId: string) => {
  await api.patch(`/admin/users/${userId}/unblock`);
};