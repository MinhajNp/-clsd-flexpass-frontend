import { useState, useEffect } from 'react';
import { fetchGymApplications } from '../services/adminService';

export const useGymApplications = () => {
  const [applications, setApplications] = useState<any[]>([]);
  const [totalCount, setTotalCount] = useState(0);
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const limit = 10;


  const loadApplications = async (page: number = 1) => {
    try {
      setIsLoading(true);
      const data = await fetchGymApplications(page, limit);
      setApplications(data.data);
      setTotalCount(data.totalCount);
      setCurrentPage(page);
      setError(null);
    } catch (err: any) {
      setError(err.message || 'Failed to fetch applications');
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadApplications(1);
  }, []);

  const handlePageChange = (page: number) => {
    loadApplications(page);
  };

  return { 
    applications, 
    totalCount, 
    currentPage, 
    onPageChange: handlePageChange, 
    limit, 
    isLoading, 
    error, 
    refetch: () => loadApplications(currentPage) 
  };
};
