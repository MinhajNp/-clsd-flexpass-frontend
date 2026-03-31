import { api } from '../../../api/axios';
import type { AdminUser } from '../types/admin.types';

// ─── Legacy (used by useAdmin hook) ──────────────────────────────────────────

import type { User } from '../../auth/types/auth.types';

export const getUsers = async (): Promise<User[]> => {
  const res = await api.get('/admin/users');
  return res.data.data;
};

export const blockUser = async (userId: string) => {
  await api.patch(`/admin/users/${userId}/block`);
};

export const unblockUser = async (userId: string) => {
  await api.patch(`/admin/users/${userId}/unblock`);
};

// ─── User Management (AdminUser) ─────────────────────────────────────────────

/**
 * Fetch full admin user list
 * GET /admin/users
 */
export const fetchAllUsers = async (): Promise<AdminUser[]> => {
  const res = await api.get('/admin/users');
  return res.data.data;
};

/**
 * Fetch realtime dashboard stats
 * GET /admin/dashboard/stats
 */
export const fetchDashboardStats = async (): Promise<any> => {
  const res = await api.get('/admin/dashboard/stats');
  return res.data.data;
};

/**
 * Toggle a user's status between Active ↔ Suspended.
 * PATCH /admin/users/:userId/status
 */
export const updateUserStatus = async (
  userId: string,
  currentStatus: 'Active' | 'Suspended'
): Promise<void> => {
  const action = currentStatus === 'Active' ? 'suspend' : 'activate';
  await api.patch(`/admin/users/${userId}/status`, { action });
};
