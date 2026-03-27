import { useEffect, useState } from "react";
import * as adminService from "../services/adminService";
import type { User } from "../../auth/types/auth.types";

export const useAdmin = () => {
  const [users, setUsers] = useState<User[]>([]);
  const [loading, setLoading] = useState(false);

  const fetchUsers = async () => {
    try {
      setLoading(true);
      const data = await adminService.getUsers();
      setUsers(data);
    } finally {
      setLoading(false);
    }
  };

  const toggleStatus = async (userId: string, currentStatus: string) => {
    if (currentStatus === "ACTIVE") {
      console.log(userId);
      await adminService.blockUser(userId);
    } else {
      console.log(userId);
      await adminService.unblockUser(userId);
    }

    // update UI optimistically
    setUsers((prev) =>
      prev.map((user) =>
        user.id === userId
          ? { ...user, status: user.status === "ACTIVE" ? "BLOCKED" : "ACTIVE" }
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
    fetchUsers,
  };
};
