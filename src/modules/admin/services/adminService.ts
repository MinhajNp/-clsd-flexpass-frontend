import { api } from '../../../api/axios';
import type { AdminUser, AdminUserStatus } from '../types/admin.types';

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
export const fetchAllUsers = async (page: number = 1, limit: number = 10): Promise<{ data: AdminUser[], totalCount: number }> => {
  const res = await api.get('/admin/users', { params: { page, limit } });
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

// ─── Gym Management ───────────────────────────────────────────────────────────

export const fetchGymManagementStats = async (): Promise<any> => {
  const res = await api.get('/admin/gyms/stats');
  return res.data.data;
};

export const fetchPartnerGyms = async (page: number = 1, limit: number = 10): Promise<{ data: any[], totalCount: number }> => {
  const res = await api.get('/admin/gyms', { params: { page, limit } });
  return res.data.data;
};

export const updateGymStatus = async (gymId: string, action: string): Promise<any> => {
  const res = await api.patch(`/admin/gyms/${gymId}/status`, { action });
  return res.data.data;
};


/**
 * Toggle a user's status between Active ↔ Suspended.
 * PATCH /admin/users/:userId/status
 */
export const updateUserStatus = async (
  userId: string,
  currentStatus: AdminUserStatus
): Promise<void> => {
  const action = currentStatus === 'Active' ? 'suspend' : 'activate';
  await api.patch(`/admin/users/${userId}/status`, { action });
};

// ─── Partnership Applications ────────────────────────────────────────────────

export const fetchGymApplications = async (page: number = 1, limit: number = 10): Promise<{ data: any[], totalCount: number }> => {
  const res = await api.get('/gyms/admin/applications', { params: { page, limit } });
  return res.data.data;
};

export const fetchGymApplicationById = async (id: string): Promise<any> => {
  const res = await api.get(`/gyms/admin/applications/${id}`);
  return res.data.data;
};

export const updateGymApplicationStatus = async (id: string, data: any): Promise<any> => {
  const res = await api.patch(`/gyms/admin/applications/${id}/status`, data);
  return res.data.data;
};

export const approveGymApplication = async (id: string, category: string): Promise<any> => {
  const res = await api.patch(`/gyms/admin/${id}/approve`, { category });
  return res.data.data;
};

export const rejectGymApplication = async (id: string, reason: string): Promise<any> => {
  const res = await api.patch(`/gyms/admin/${id}/reject`, { reason });
  return res.data.data;
};
