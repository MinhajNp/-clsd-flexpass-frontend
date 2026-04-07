import { useState, useEffect } from 'react';
import * as gymAdminService from '../services/gymAdminService';

export interface DashboardStats {
  totalSlots: number;
  bookedSlots: number;
  primaryAuto: number;
  trainersAvailable: number;
}

export interface Slot {
  timeWindow: string;
  capacity: number;
  booked: number;
  available: number;
  status: 'Full' | 'Filling Fast' | 'Open';
}

export interface CheckIn {
  id: string;
  userId: {
    id: string;
    name: string;
    avatar?: string;
  };
  checkInType: string;
  status: 'Allowed' | 'Denied';
  createdAt: string;
}

export const useGymDashboard = (gymId: string) => {
  const [stats, setStats] = useState<DashboardStats | null>(null);
  const [slots, setSlots] = useState<Slot[]>([]);
  const [checkIns, setCheckIns] = useState<CheckIn[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchData = async () => {
    try {
      const [sData, slData, ciData] = await Promise.all([
        gymAdminService.fetchDashboardStats(gymId),
        gymAdminService.fetchTodaySlots(gymId),
        gymAdminService.fetchRecentCheckIns(gymId)
      ]);
      setStats(sData);
      setSlots(slData);
      setCheckIns(ciData);
    } catch (err) {
      console.error("Failed to fetch dashboard data", err);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    fetchData();

    // Live Updates Simulation
    const interval = setInterval(() => {
      setSlots(prevSlots => 
        prevSlots.map(slot => {
          if (slot.status === 'Open' && Math.random() > 0.7) {
            const newBooked = slot.booked + 1;
            const newAvailable = slot.capacity - newBooked;
            let newStatus: 'Full' | 'Filling Fast' | 'Open' = 'Open';
            if (newAvailable === 0) newStatus = 'Full';
            else if (newAvailable <= 3) newStatus = 'Filling Fast';
            
            return {
              ...slot,
              booked: newBooked,
              available: newAvailable,
              status: newStatus
            };
          }
          return slot;
        })
      );
    }, 5000); // Update every 5 seconds

    return () => clearInterval(interval);
  }, [gymId]);

  return { stats, slots, checkIns, isLoading, refetch: fetchData };
};
