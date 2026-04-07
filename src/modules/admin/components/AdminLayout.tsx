import { NavLink, useNavigate } from 'react-router-dom';
import { clsx } from 'clsx';
import {
  LayoutDashboard,
  Building2,
  Users,
  CreditCard,
  CalendarCheck,
  BarChart3,
  Settings2,
  Banknote,
  Star,
  Headphones,
  Settings,
  Bell,
  LogOut,
  FileCheck
} from 'lucide-react';
import type { ReactNode } from 'react';
import { useState } from 'react';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';


// ─── Nav Item Config ──────────────────────────────────────────────────────────

interface NavItem {
  label: string;
  to: string;
  icon: ReactNode;
}

const NAV_ITEMS: NavItem[] = [
  { label: 'Dashboard',            to: '/admin',                  icon: <LayoutDashboard size={17} /> },
  { label: 'Gyms',                 to: '/admin/gyms',             icon: <Building2 size={17} /> },
  { label: 'Partnership Applications', to: '/admin/applications', icon: <FileCheck size={17} /> },
  { label: 'Users',                to: '/admin/users',            icon: <Users size={17} /> },
  { label: 'Membership Plans',     to: '/admin/membership-plans', icon: <CreditCard size={17} /> },
  { label: 'Bookings',             to: '/admin/bookings',         icon: <CalendarCheck size={17} /> },
  { label: 'Revenue',              to: '/admin/revenue',          icon: <BarChart3 size={17} /> },
  { label: 'Payout Configuration', to: '/admin/payout-config',   icon: <Settings2 size={17} /> },
  { label: 'Payouts',              to: '/admin/payouts',          icon: <Banknote size={17} /> },
  { label: 'Review',               to: '/admin/review',           icon: <Star size={17} /> },
  { label: 'Support',              to: '/admin/support',          icon: <Headphones size={17} /> },
  { label: 'System Settings',      to: '/admin/settings',         icon: <Settings size={17} /> },
];

// ─── Sidebar ──────────────────────────────────────────────────────────────────

const Sidebar = () => (
  <aside className="flex h-screen w-[220px] flex-shrink-0 flex-col bg-[#1C2B30] text-white">
    {/* Logo */}
    <div className="flex items-center gap-3 px-5 py-[18px] border-b border-white/[0.08]">
      <div className="flex h-8 w-8 items-center justify-center rounded-lg bg-[#2D5A53]">
        <svg
          xmlns="http://www.w3.org/2000/svg"
          viewBox="0 0 24 24"
          fill="none"
          stroke="white"
          strokeWidth="2.5"
          strokeLinecap="round"
          strokeLinejoin="round"
          className="w-[14px] h-[14px]"
        >
          <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
        </svg>
      </div>
      <div className="leading-tight">
        <p className="text-[13px] font-bold text-white">FlexPass</p>
        <p className="text-[10px] font-medium text-[#4ECDC4] uppercase tracking-[0.12em]">Platform Admin</p>
      </div>
    </div>

    {/* Nav Links */}
    <nav className="flex-1 overflow-y-auto px-3 py-3 space-y-[2px]">
      {NAV_ITEMS.map((item) => (
        <NavLink
          key={item.to}
          to={item.to}
          end={item.to === '/admin'}
          className={({ isActive }) =>
            clsx(
              'flex items-center gap-3 rounded-lg px-3 py-[9px] text-[13px] font-medium transition-all duration-150',
              isActive
                ? 'bg-[#2D5A53] text-white'
                : 'text-[#8FA3A0] hover:bg-white/[0.06] hover:text-white'
            )
          }
        >
          {({ isActive }) => (
            <>
              <span className={clsx('flex-shrink-0 transition-colors', isActive ? 'text-white' : 'text-[#5C7A76]')}>
                {item.icon}
              </span>
              <span>{item.label}</span>
            </>
          )}
        </NavLink>
      ))}
    </nav>

    {/* Version Footer */}
    <div className="border-t border-white/[0.08] px-5 py-3.5">
      <p className="text-[11px] text-[#4A6460] font-medium">v2.4.0 • FlexPass Admin</p>
    </div>
  </aside>
);

// ─── Top Header ───────────────────────────────────────────────────────────────

interface TopHeaderProps {
  title: string;
  onLogoutClick: () => void;
}

const TopHeader = ({ title, onLogoutClick }: TopHeaderProps) => {


  return (
    <header className="flex h-[60px] flex-shrink-0 items-center justify-between border-b border-gray-100 bg-white px-6">
      <h1 className="text-lg font-bold text-gray-800 tracking-tight">{title}</h1>

      <div className="flex items-center gap-3">
        {/* Notification Bell */}
        <button
          id="admin-notifications-btn"
          className="relative flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-gray-100 hover:text-gray-600 transition-colors"
          aria-label="Notifications"
        >
          <Bell size={17} />
          <span className="absolute right-1.5 top-1.5 h-[7px] w-[7px] rounded-full bg-red-500 ring-[1.5px] ring-white" />
        </button>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-200" />

        {/* Avatar placeholder */}
        <div className="flex h-8 w-8 items-center justify-center rounded-full border border-gray-200 bg-gray-100 text-gray-500">
          <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="currentColor" className="w-4 h-4">
            <path fillRule="evenodd" d="M7.5 6a4.5 4.5 0 119 0 4.5 4.5 0 01-9 0zM3.751 20.105a8.25 8.25 0 0116.498 0 .75.75 0 01-.437.695A18.683 18.683 0 0112 22.5c-2.786 0-5.433-.608-7.812-1.7a.75.75 0 01-.437-.695z" clipRule="evenodd" />
          </svg>
        </div>

        {/* User Info */}
        <div className="leading-tight">
          <p className="text-[12px] font-semibold text-gray-800">Admin User</p>
          <p className="text-[11px] text-gray-400 font-medium">Super Admin</p>
        </div>

        {/* Divider */}
        <div className="h-5 w-px bg-gray-200" />

        {/* Logout */}
        <button
          id="admin-logout-btn"
          onClick={onLogoutClick}
          className="flex h-8 w-8 items-center justify-center rounded-full text-gray-400 hover:bg-red-50 hover:text-red-500 transition-colors"
          aria-label="Logout"
        >
          <LogOut size={16} />
        </button>
      </div>
    </header>
  );
};

// ─── Admin Layout ─────────────────────────────────────────────────────────────

interface AdminLayoutProps {
  children: ReactNode;
  title?: string;
}

const AdminLayout = ({ children, title = 'Dashboard' }: AdminLayoutProps) => {
  const navigate = useNavigate();
  const [isLogoutModalOpen, setIsLogoutModalOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem('accessToken');
    navigate('/auth');
  };

  return (
    <div className="flex h-screen overflow-hidden bg-[#F5F7FA]">
      <Sidebar />
      <div className="flex flex-1 flex-col overflow-hidden min-w-0">
        <TopHeader title={title} onLogoutClick={() => setIsLogoutModalOpen(true)} />
        <main className="flex-1 overflow-y-auto p-6">
          {children}
        </main>
      </div>

      <ConfirmationModal
        isOpen={isLogoutModalOpen}
        onClose={() => setIsLogoutModalOpen(false)}
        onConfirm={handleLogout}
        title="Confirm Logout"
        message="Are you sure you want to log out of the FlexPass Admin panel?"
        confirmText="Logout"
        type="danger"
      />
    </div>
  );
};

export default AdminLayout;
