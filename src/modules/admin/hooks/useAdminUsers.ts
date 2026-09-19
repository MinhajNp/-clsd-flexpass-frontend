import { useCallback, useEffect, useState } from 'react';
import { toast } from 'react-hot-toast';
import * as adminService from '../services/adminService';
import type { AdminUser, AdminUserStatus, MembershipPlan } from '../types/admin.types';

// ─── Filter state type ────────────────────────────────────────────────────────

export interface UserFilters {
  search: string;
  plan: MembershipPlan | 'All';
  status: AdminUserStatus | 'All';
}

const normalizeStatus = (status: string): AdminUserStatus => {
  const s = (status || '').toLowerCase();
  if (s === 'active') return 'Active';
  return 'Suspended';
};

// ─── Hook ─────────────────────────────────────────────────────────────────────

export const useAdminUsers = () => {
  const [users, setUsers]           = useState<AdminUser[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [loading, setLoading]       = useState(true);
  const [filters, setFilters]       = useState<UserFilters>({
    search: '',
    plan: 'All',
    status: 'All',
  });
  const limit = 10;


  // ── Fetch ─────────────────────────────────────────────────────────────────

  const fetchUsers = useCallback(async (page: number = 1) => {
    setLoading(true);
    try {
      const { data, totalCount: total } = await adminService.fetchAllUsers(page, limit);
      const normalizedData = data.map(u => ({
        ...u,
        status: normalizeStatus(u.status)
      }));
      setUsers(normalizedData);
      setTotalCount(total);
      setCurrentPage(page);
    } catch (error) {
      console.error("Failed to fetch users:", error);
      toast.error('Failed to load users from the server.');
      setUsers([]);
      setTotalCount(0);
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    fetchUsers(1); // Fetch first page on mount
  }, [fetchUsers]);
  
  // Refetch when filters change (reset to page 1)
  useEffect(() => {
    fetchUsers(1);
  }, [filters, fetchUsers]);

  const handlePageChange = (page: number) => {
    fetchUsers(page);
  };

  // ── Toggle status (optimistic) ────────────────────────────────────────────

  const toggleUserStatus = useCallback(async (userId: string) => {
    const user = users.find((u) => u.id === userId);
    if (!user || user.isUpdating) return;

    const nextStatus: AdminUserStatus =
      user.status === 'Active' ? 'Suspended' : 'Active';
    const actionTerm = nextStatus === 'Suspended' ? 'suspended' : 'activated';

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

  return {
    users: users, 
    totalCount,
    currentPage,
    onPageChange: handlePageChange,
    limit,
    loading,
    filters,
    setFilters,
    toggleUserStatus,
    refetch: () => fetchUsers(currentPage),
  };
};
