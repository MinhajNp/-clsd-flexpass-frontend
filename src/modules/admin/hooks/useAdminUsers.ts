import { useCallback, useEffect, useMemo, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as adminService from '../services/adminService';
import type { AdminUser, AdminUserStatus, MembershipPlan } from '../types/admin.types';

// ─── Filter state type ────────────────────────────────────────────────────────

export interface UserFilters {
  search: string;
  plan: MembershipPlan | 'All';
  status: AdminUserStatus | 'All';
}

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAdminUsers = () => {
  const [users, setUsers]     = useState<AdminUser[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState<UserFilters>({
    search: '',
    plan: 'All',
    status: 'All',
  });

  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchUsers = useCallback(async () => {
    setLoading(true);
    try {
      const data = await adminService.fetchAllUsers();
      setUsers(data);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error('Failed to load users from the server.');
      setUsers([]);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers();
  }, [fetchUsers]);

  // ── Toggle status (optimistic) ────────────────────────────────────────────

  const toggleUserStatus = useCallback(async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user || user.isUpdating) return;

    const nextStatus: AdminUserStatus =
      user.status === 'Active' ? 'Suspended' : 'Active';
    const actionTerm = nextStatus === 'Suspended' ? 'blocked' : 'unblocked';

    // Optimistic UI update
    setUsers((prev) =>
      prev.map((u) =>
        u.id === userId ? { ...u, status: nextStatus, isUpdating: true } : u
      )
    );

    try {
      await adminService.updateUserStatus(userId, user.status);
      toast.success(`User successfully ${actionTerm}.`);
      // Confirm — clear the lock
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId ? { ...u, isUpdating: false } : u
        )
      );
    } catch {
      toast.error('Failed to update user status.');
      // Rollback on error
      setUsers((prev) =>
        prev.map((u) =>
          u.id === userId
            ? { ...u, status: user.status, isUpdating: false }
            : u
        )
      );
    }
  }, [users]);

  // ── Derived: filtered list ────────────────────────────────────────────────

  const filtered = useMemo(() => {
    const q = filters.search.toLowerCase();
    return users.filter((u) => {
      const matchesSearch =
        !q ||
        u.name.toLowerCase().includes(q) ||
        u.email.toLowerCase().includes(q);
      const matchesPlan =
        filters.plan === 'All' || u.membershipPlan === filters.plan;
      const matchesStatus =
        filters.status === 'All' || u.status === filters.status;
      return matchesSearch && matchesPlan && matchesStatus;
    });
  }, [users, filters]);

  return {
    users: filtered,
    totalCount: users.length,
    loading,
    filters,
    setFilters,
    toggleUserStatus,
    refetch: fetchUsers,
  };
};
