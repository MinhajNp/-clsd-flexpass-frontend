import { useState, useEffect } from 'react';
import { fetchDashboardStats } from '../services/adminService';
import type { DashboardStats } from '../types/admin.types';
import { toast } from 'react-hot-toast';

export const useDashboardData = () => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [error, setError] = useState<Error | null>(null);

  useEffect(() => {
    let isMounted = true;

    const loadStats = async () => {
      try {
        setIsLoading(true);
        const data = await fetchDashboardStats();
        if (isMounted) {
          setStats(data);
          setError(null);
        }
      } catch (err: any) {
        if (isMounted) {
          setError(err);
          toast.error('Failed to load live dashboard stats.');
        }
      } finally {
        if (isMounted) {
          setIsLoading(false);
        }
      }
    };

    loadStats();

    return () => {
      isMounted = false;
    };
  }, []);

  return { stats, isLoading, error };
};
