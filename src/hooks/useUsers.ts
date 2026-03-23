import { useEffect, useState } from "react";
import * as userService from "../api/services/user.service";
import type { User } from "../types/auth.types";


export const useUsers = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await userService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId: string, currentStatus: string) => {
  if (currentStatus === "ACTIVE") {
    console.log(userId)
    await userService.blockUser(userId);
  } else {
     console.log(userId)
    await userService.unblockUser(userId);
  }

  // update UI
  setUsers((prev) =>
    prev.map((user) =>
      user.id === userId
        ? {
            ...user,
            status:
              user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE",
          }
        : user
    )
  );
};

  useEffect(() => {
    console.log("fetchUsers triggered");
    fetchUsers();
  }, []);

  return {
    users,
    loading,
    toggleStatus,
    fetchUsers
  };
};