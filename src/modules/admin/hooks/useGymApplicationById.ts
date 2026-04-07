import { useState, useEffect } from 'react';
import { fetchGymApplicationById } from '../services/adminService';

export const useGymApplicationById = (id: string | undefined) => {
  const [application, setApplication] = useState<any>(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  const loadApplication = async () => {
    if (!id) return;
    try {
      setIsLoading(true);
      const data = await fetchGymApplicationById(id);
      setApplication(data);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch application');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplication();
  }, [id]);

  return { application, isLoading, error, refetch: loadApplication };
};
