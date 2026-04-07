import { api as axios } from '../../../api/axios';

const API_URL = "http://localhost:5000/api/gyms"; // Adjust accordingly

export const fetchDashboardStats = async (gymId: string) => {
  const res = await axios.get(`${API_URL}/${gymId}/dashboard/stats`);
  return res.data.data;
};

export const fetchTodaySlots = async (gymId: string) => {
  const res = await axios.get(`${API_URL}/${gymId}/slots/today`);
  return res.data.data;
};

export const fetchRecentCheckIns = async (gymId: string) => {
  const res = await axios.get(`${API_URL}/${gymId}/check-ins/recent`);
  return res.data.data;
};

export const processCheckIn = async (gymId: string, userId: string, type: string) => {
  const res = await axios.post(`${API_URL}/${gymId}/check-in`, { userId, type });
  return res.data.data;
};
