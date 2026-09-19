import { useState, useEffect, useCallback } from 'react';
import { toast } from 'react-hot-toast';
import { fetchGymManagementStats, fetchPartnerGyms, updateGymStatus } from '../services/adminService';
import type { GymOverviewRow, GymStatus } from '../types/admin.types';

const normalizeGymStatus = (status: string): GymStatus => {
  const s = (status || '').toLowerCase();
  if (s === 'active' || s === 'approved') return 'Active';
  if (s === 'pending') return 'Pending';
  return 'Suspended';
};

export interface PartnerGymStats {
  totalGyms: number;
  premiumCount: number;
  standardCount: number;
  basicCount: number;
}

export const usePartnerGymData = () => {
  const [stats, setStats] = useState<PartnerGymStats | null>(null);
  const [partnerGyms, setPartnerGyms] = useState<GymOverviewRow[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);
  const limit = 10;


  const loadData = useCallback(async (page: number = 1) => {
    try {
      setIsLoading(true);
      const [statsData, gymsResponse] = await Promise.all([
        fetchGymManagementStats(),
        fetchPartnerGyms(page, limit)
      ]);
      setStats(statsData);
      const normalizedGyms = gymsResponse.data.map((gym: any) => ({
        ...gym,
        status: normalizeGymStatus(gym.status)
      }));
      setPartnerGyms(normalizedGyms);
      setTotalCount(gymsResponse.totalCount);
      setCurrentPage(page);
      setError(null);
    } catch (err: any) {
      console.error("Partner Gym API Error:", err);
      toast.error('Failed to load partner gyms data from server.');
      setError(err);
    } finally {
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    loadData(1);
  }, [loadData]);

  const handlePageChange = (page: number) => {
    loadData(page);
  };

  // Optimistic UI Status Toggle
  const toggleGymStatus = async (gymId: string, currentStatus: string) => {
    // Prevent toggling if already actively pending
    // Mapping: If Active -> Suspend. If Pending/Suspended -> Activate
    const newAction = currentStatus === 'Active' ? 'suspend' : 'activate';
    const newResolvedStatus = currentStatus === 'Active' ? 'Suspended' : 'Active';

    // 1. Optimistic Update Local State
    const previousGyms = [...partnerGyms];
    setPartnerGyms(prev => prev.map(gym => 
      gym.id === gymId ? { ...gym, status: newResolvedStatus as any } : gym
    ));

    const toastId = toast.loading('Updating gym status...');

    try {
      // 2. Fire backend
      await updateGymStatus(gymId, newAction);
      toast.success('Gym status successfully updated', { id: toastId });
    } catch (error) {
      console.error("Failed to update status", error);
      // 3. Rollback on failure
      setPartnerGyms(previousGyms);
      toast.error('Failed to update status. Reverting changes.', { id: toastId });
    }
  };

  return { 
    stats, 
    partnerGyms, 
    totalCount,
    currentPage,
    onPageChange: handlePageChange,
    limit,
    isLoading, 
    error,
    toggleGymStatus,
    refreshData: () => loadData(currentPage)
  };
};
