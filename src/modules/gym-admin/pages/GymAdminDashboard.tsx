import React from 'react';
import { 
  QrCode, 
  Clock, 
  Calendar, 
  Building2, 
  UserPlus, 
  CheckCircle, 
  XCircle,
  MoreVertical,
  Activity,
  Users
} from 'lucide-react';
import { useGymDashboard } from '../hooks/useGymDashboard';
import Button from '../../../components/ui/Badge'; // Actually using Badge for now or mock Button

const StatCard = ({ title, value, icon, bgColor, iconColor }: any) => (
  <div className="bg-white p-6 rounded-2xl shadow-sm border border-gray-50 flex items-center justify-between">
    <div>
      <p className="text-[14px] font-medium text-gray-500 mb-1">{title}</p>
      <p className="text-[28px] font-bold text-gray-900">{value}</p>
    </div>
    <div className={`w-12 h-12 rounded-xl ${bgColor} flex items-center justify-center ${iconColor}`}>
      {icon}
    </div>
  </div>
);

const GymAdminDashboard: React.FC = () => {
  const { stats, slots, checkIns, isLoading } = useGymDashboard('mock-gym-id');

  const getStatusBadge = (status: string) => {
    const variants = {
      'Full': 'bg-red-50 text-red-600 border-red-100',
      'Filling Fast': 'bg-orange-50 text-orange-600 border-orange-100',
      'Open': 'bg-emerald-50 text-emerald-600 border-emerald-100'
    };
    return (
      <span className={`px-3 py-1 rounded-full text-[12px] font-bold border ${variants[status as keyof typeof variants]}`}>
        {status}
      </span>
    );
  };

  if (isLoading) return <div className="flex items-center justify-center min-h-[400px]">Loading...</div>;

  return (
    <div className="space-y-8 max-w-[1200px]">
      
      {/* 1. Check-in Quick Action Banner */}
      <div className="bg-white p-8 rounded-3xl shadow-sm border border-gray-50 flex items-center justify-between">
        <div className="flex items-center gap-6">
          <div className="w-16 h-16 bg-blue-50 rounded-2xl flex items-center justify-center text-blue-500">
            <QrCode size={32} />
          </div>
          <div>
            <h2 className="text-xl font-bold text-gray-900">Ready for check-in?</h2>
            <p className="text-gray-500 text-[15px] mt-1">Scan member QR codes to validate entry instantly.</p>
          </div>
        </div>
        <button className="bg-[#2D5A53] hover:bg-[#234741] text-white px-8 py-4 rounded-2xl font-bold flex items-center gap-3 transition-all">
          <QrCode size={20} />
          Scan QR to Check-in
          <ChevronRight size={18} />
        </button>
      </div>

      {/* 2. Operational Stat Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <StatCard 
          title="Today's Total Slots" 
          value={stats?.totalSlots || 48} 
          icon={<Clock size={24} />} 
          bgColor="bg-emerald-50" 
          iconColor="text-emerald-500" 
        />
        <StatCard 
          title="Booked Slots" 
          value={stats?.bookedSlots || 32} 
          icon={<Calendar size={24} />} 
          bgColor="bg-blue-50" 
          iconColor="text-blue-500" 
        />
        <StatCard 
          title="Primary Gym Auto" 
          value={stats?.primaryAuto || 18} 
          icon={<Building2 size={24} />} 
          bgColor="bg-teal-50" 
          iconColor="text-teal-500" 
        />
        <StatCard 
          title="Trainers Available" 
          value={stats?.trainersAvailable || 6} 
          icon={<UserPlus size={24} />} 
          bgColor="bg-orange-50" 
          iconColor="text-orange-500" 
        />
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* 3. Today's Slot Status Table */}
        <div className="lg:col-span-2 bg-white rounded-3xl shadow-sm border border-gray-50 overflow-hidden">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Today's Slot Status</h3>
            <span className="flex items-center gap-2 bg-emerald-50 text-emerald-600 px-3 py-1.5 rounded-lg text-[12px] font-bold">
              <Activity size={14} className="animate-pulse" />
              Live Updates
            </span>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead>
                <tr className="text-[12px] font-bold text-gray-400 uppercase tracking-wider">
                  <th className="px-8 py-4">Time Window</th>
                  <th className="px-8 py-4">Capacity</th>
                  <th className="px-8 py-4">Booked</th>
                  <th className="px-8 py-4">Available</th>
                  <th className="px-8 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-gray-50">
                {slots.map((slot, idx) => (
                  <tr key={idx} className="hover:bg-gray-50/50 transition-colors">
                    <td className="px-8 py-5 text-[14px] font-bold text-gray-700">{slot.timeWindow}</td>
                    <td className="px-8 py-5 text-[14px] font-medium text-gray-500">{slot.capacity}</td>
                    <td className="px-8 py-5 text-[14px] font-bold text-gray-900">{slot.booked}</td>
                    <td className="px-8 py-5 text-[14px] font-medium text-gray-500">{slot.available}</td>
                    <td className="px-8 py-5">{getStatusBadge(slot.status)}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* 4. Recent Check-ins Widget */}
        <div className="bg-white rounded-3xl shadow-sm border border-gray-50 flex flex-col">
          <div className="px-8 py-6 border-b border-gray-50 flex items-center justify-between">
            <h3 className="text-lg font-bold text-gray-900">Recent Check-ins</h3>
            <button className="text-[#2D5A53] font-bold text-[13px] hover:underline">View all</button>
          </div>
          <div className="flex-1 p-6 space-y-6">
            {checkIns.length > 0 ? checkIns.map((checkIn) => (
              <div key={checkIn.id} className="flex items-center justify-between">
                <div className="flex items-center gap-4">
                  <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 font-bold overflow-hidden">
                    {checkIn.userId.avatar ? <img src={checkIn.userId.avatar} alt={checkIn.userId.name} /> : checkIn.userId.name.charAt(0)}
                  </div>
                  <div>
                    <h4 className="text-[14px] font-bold text-gray-900">{checkIn.userId.name}</h4>
                    <p className="text-[12px] text-gray-400 font-medium">
                      {new Date(checkIn.createdAt).toLocaleTimeString([], { hour: '2-digit', minute: '2-digit' })} • 
                      <span className="ml-1 text-[#2D5A53] bg-[#2D5A53]/5 px-1.5 py-0.5 rounded text-[10px] uppercase">{checkIn.checkInType}</span>
                    </p>
                  </div>
                </div>
                <div className="flex items-center gap-2">
                   {checkIn.status === 'Allowed' ? (
                     <>
                       <CheckCircle size={18} className="text-emerald-500" />
                       <span className="text-[13px] font-bold text-emerald-600">Allowed</span>
                     </>
                   ) : (
                     <>
                       <XCircle size={18} className="text-red-500" />
                       <span className="text-[13px] font-bold text-red-600">Denied</span>
                     </>
                   )}
                </div>
              </div>
            )) : (
              <div className="flex flex-col items-center justify-center h-full text-gray-400 space-y-2 py-10">
                 <Users size={32} />
                 <p className="text-sm font-medium">No check-ins yet today.</p>
              </div>
            )}
          </div>
          <button className="w-full py-5 border-t border-gray-50 text-gray-400 text-[13px] font-medium hover:text-gray-900 transition-all">
            View full check-in history →
          </button>
        </div>
      </div>
    </div>
  );
};

// Helper for chevron right in button
const ChevronRight = ({ size }: { size: number }) => (
  <svg width={size} height={size} viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round">
    <path d="M9 18l6-6-6-6" />
  </svg>
);

export default GymAdminDashboard;
