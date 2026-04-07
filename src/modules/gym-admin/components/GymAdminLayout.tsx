import React from 'react';
import { 
  LayoutDashboard, 
  CheckCircle2, 
  CalendarRange, 
  Users, 
  BookOpen, 
  IndianRupee, 
  Star, 
  Settings, 
  Bell, 
  UserCircle,
  LogOut,
} from 'lucide-react';
import { NavLink, Outlet, useNavigate } from 'react-router-dom';

const GymAdminLayout: React.FC = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    localStorage.removeItem("userRole");
    navigate("/auth");
  };

  const navLinks = [
    { icon: <LayoutDashboard size={20} />, label: 'Dashboard', path: '/gym-admin' },
    { icon: <CheckCircle2 size={20} />, label: 'Check-ins', path: '/gym-admin/check-ins' },
    { icon: <CalendarRange size={20} />, label: 'Slot Management', path: '/gym-admin/slots' },
    { icon: <Users size={20} />, label: 'Trainers', path: '/gym-admin/trainers' },
    { icon: <BookOpen size={20} />, label: 'Bookings', path: '/gym-admin/bookings' },
    { icon: <IndianRupee size={20} />, label: 'Earnings', path: '/gym-admin/earnings' },
    { icon: <Star size={20} />, label: 'Reviews', path: '/gym-admin/reviews' },
    { icon: <Settings size={20} />, label: 'Settings', path: '/gym-admin/settings' },
  ];

  return (
    <div className="flex h-screen bg-[#F8FAFC]">
      {/* Sidebar */}
      <aside className="w-[260px] bg-white border-r border-gray-100 flex flex-col">
        <div className="p-6 flex items-center gap-3">
          <div className="w-8 h-8 bg-[#2D5A53] rounded-lg flex items-center justify-center">
             <span className="text-white font-bold text-xl">F</span>
          </div>
          <span className="text-xl font-bold text-gray-900">FlexPass</span>
        </div>

        <nav className="flex-1 px-4 py-2 space-y-1">
          {navLinks.map((link) => (
            <NavLink
              key={link.path}
              to={link.path}
              className={({ isActive }) => `
                flex items-center gap-3 px-4 py-3 rounded-xl text-[14px] font-medium transition-all
                ${isActive 
                  ? 'bg-[#2D5A53]/5 text-[#2D5A53]' 
                  : 'text-gray-500 hover:bg-gray-50 hover:text-gray-900'}
              `}
            >
              {link.icon}
              {link.label}
            </NavLink>
          ))}
        </nav>

        {/* Support Status */}
        <div className="p-4 mx-4 mb-6 bg-[#F8FAFC] rounded-xl border border-gray-100">
           <p className="text-[12px] text-gray-500 font-medium mb-1">Support Status</p>
           <div className="flex items-center gap-2">
             <div className="w-2 h-2 rounded-full bg-emerald-500" />
             <span className="text-[13px] font-semibold text-gray-800">Online</span>
           </div>
        </div>
      </aside>

      {/* Main Content */}
      <main className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <header className="h-[80px] bg-white border-b border-gray-100 px-8 flex items-center justify-between">
          <div>
             <h1 className="text-xl font-bold text-gray-900">FlexFit Downtown</h1>
             <p className="text-[13px] text-gray-500">123 Main St, City Center</p>
          </div>

          <div className="flex items-center gap-6">
            <span className="text-[14px] text-gray-500 font-medium">Friday, January 30</span>
            
            <div className="flex items-center gap-3 border-l border-gray-100 pl-6">
              <button className="p-2 text-gray-400 hover:text-gray-600 relative">
                <Bell size={22} />
                <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 rounded-full border-2 border-white" />
              </button>
              
              <div onClick={handleLogout} className="flex items-center gap-3 cursor-pointer group">
                <div className="w-10 h-10 rounded-full bg-gray-100 flex items-center justify-center text-gray-400 group-hover:bg-gray-200 transition-all">
                  <UserCircle size={28} />
                </div>
                <LogOut size={20} className="text-gray-400 group-hover:text-red-500 transition-colors" />
              </div>
            </div>
          </div>
        </header>

        {/* Page Body */}
        <div className="flex-1 overflow-y-auto p-8">
           <Outlet />
        </div>
      </main>
    </div>
  );
};

export default GymAdminLayout;
