import { Users, Building2, CalendarCheck, TrendingUp, Wallet, Clock, XCircle, AlertTriangle, Loader2 } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import GymStatusTable from '../components/GymStatusTable';
import type { AdminDashboardData } from '../types/admin.types';
import { useDashboardData } from '../hooks/useDashboardData';

// ─── Helpers ──────────────────────────────────────────────────────────────────

/** e.g. 840000 → "₹8,40,000" */
const formatINR = (amount: number): string =>
  '₹' + amount.toLocaleString('en-IN');

// ─── Mock Data ────────────────────────────────────────────────────────────────

const DASHBOARD_DATA: AdminDashboardData = {
  stats: {
    totalUsers: 12450,
    activeGyms: 86,
    todaysCheckins: 1230,
    monthlyRevenue: 840000,
    pendingPayouts: 120000,
  },
  revenueSnapshot: {
    totalCollected: 840000,
    collectedGrowthPercent: 12,
    collectedGrowthLabel: 'from last month',
    totalPayable: 680000,
    payableNote: 'Pending disbursement',
    estimatedMargin: 160000,
    estimatedMarginPercent: 19,
  },
  alerts: [
    { id: 'a1', severity: 'warning', count: 3, title: 'Gyms pending approval',  subtitle: 'Review required within 24h'       },
    { id: 'a2', severity: 'danger',  count: 2, title: 'Failed payouts',          subtitle: 'Bank details verification needed' },
    { id: 'a3', severity: 'caution', count: 5, title: 'High no-show rate gyms',  subtitle: 'Exceeds 15% threshold'            },
  ],
  gymOverview: [
    { id: 'g1', name: 'FitZone Mumbai',    city: 'Mumbai',    category: 'Premium',  status: 'Active'    },
    { id: 'g2', name: 'PowerHouse Delhi',  city: 'New Delhi', category: 'Standard', status: 'Active'    },
    { id: 'g3', name: 'FlexFit Bangalore', city: 'Bangalore', category: 'Standard', status: 'Pending'   },
    { id: 'g4', name: 'IronCore Pune',     city: 'Pune',      category: 'Basic',    status: 'Active'    },
    { id: 'g5', name: 'ActiveLife Chennai',city: 'Chennai',   category: 'Premium',  status: 'Suspended' },
  ],
};

// ─── Stat Card ────────────────────────────────────────────────────────────────

interface StatCardProps {
  id: string;
  title: string;
  value: string;
  subtitle: string;
}

const StatCard = ({ id, title, value, subtitle }: StatCardProps) => (
  <div
    id={id}
    className="flex flex-col justify-between rounded-xl bg-white p-5 shadow-sm"
    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
  >
    <p className="text-[13px] font-medium text-gray-400 mb-3">{title}</p>
    <div>
      <p className="text-[26px] font-bold text-gray-900 leading-tight tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-[#6B7280] font-normal">{subtitle}</p>
    </div>
  </div>
);

// ─── Alert config ─────────────────────────────────────────────────────────────

const ALERT_CONFIG = {
  warning: {
    bg:       'bg-[#FFF8F0]',
    border:   'border border-[#FFE5C2]',
    iconWrap: 'bg-[#FFF0D8] text-[#F97316]',
    count:    'text-[#EA580C]',
    title:    'text-[#7C2D12]',
    subtitle: 'text-[#C2692A]',
    Icon:     Clock,
  },
  danger: {
    bg:       'bg-[#FFF6F6]',
    border:   'border border-[#FECACA]',
    iconWrap: 'bg-[#FEE2E2] text-[#EF4444]',
    count:    'text-[#DC2626]',
    title:    'text-[#7F1D1D]',
    subtitle: 'text-[#B45454]',
    Icon:     XCircle,
  },
  caution: {
    bg:       'bg-[#FFFBEB]',
    border:   'border border-[#FDE68A]',
    iconWrap: 'bg-[#FEF3C7] text-[#D97706]',
    count:    'text-[#B45309]',
    title:    'text-[#78350F]',
    subtitle: 'text-[#A16207]',
    Icon:     AlertTriangle,
  },
};

// ─── Admin Dashboard ──────────────────────────────────────────────────────────

const AdminDashboard = () => {
  const { stats: liveStats, isLoading } = useDashboardData();
  const { revenueSnapshot: rev, alerts, gymOverview } = DASHBOARD_DATA;

  const displayStats = liveStats || DASHBOARD_DATA.stats;

  if (isLoading) {
    return (
      <AdminLayout title="Dashboard">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader2 className="h-8 w-8 animate-spin text-[#2D5A53]" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Dashboard">
      <div className="space-y-5 max-w-[1280px]">

        {/* ── Row 1: Stat Cards ──────────────────────────────────────── */}
        <div className="grid grid-cols-2 gap-4 xl:grid-cols-5">
          <StatCard
            id="stat-total-users"
            title="Total Users"
            value={displayStats.totalUsers.toLocaleString('en-IN')}
            subtitle="Registered platform users"
          />
          <StatCard
            id="stat-active-gyms"
            title="Active Gyms"
            value={displayStats.activeGyms.toLocaleString('en-IN')}
            subtitle="Verified & live gyms"
          />
          <StatCard
            id="stat-todays-checkins"
            title="Today's Check-ins"
            value={displayStats.todaysCheckins.toLocaleString('en-IN')}
            subtitle="Across all partner gyms"
          />
          <StatCard
            id="stat-monthly-revenue"
            title="Monthly Revenue"
            value={formatINR(displayStats.monthlyRevenue)}
            subtitle="Current billing cycle"
          />
          <StatCard
            id="stat-pending-payouts"
            title="Pending Gym Payouts"
            value={formatINR(displayStats.pendingPayouts)}
            subtitle="Awaiting disbursement"
          />
        </div>

        {/* ── Row 2: Revenue Snapshot + Alerts ──────────────────────── */}
        <div className="grid grid-cols-1 gap-5 lg:grid-cols-2">

          {/* Revenue & Payout Snapshot */}
          <div
            id="revenue-snapshot-widget"
            className="rounded-xl bg-white shadow-sm overflow-hidden"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-[15px] font-semibold text-gray-800">Revenue &amp; Payout Snapshot</h2>
            </div>

            <div className="p-5 space-y-3">
              {/* Total Collected — Light Blue */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#EEF6FF' }}>
                <p className="text-[11px] font-medium text-[#3B82F6] mb-1">
                  Total Collected from Users (This Month)
                </p>
                <p className="text-[24px] font-bold text-gray-900 leading-tight">
                  {formatINR(rev.totalCollected)}
                </p>
                <p className="mt-1 text-[12px] text-[#3B82F6] font-medium">
                  +{rev.collectedGrowthPercent}% {rev.collectedGrowthLabel}
                </p>
              </div>

              {/* Total Payable — Light Orange */}
              <div className="rounded-lg p-4" style={{ backgroundColor: '#FFF5EC' }}>
                <p className="text-[11px] font-medium text-[#F97316] mb-1">
                  Total Payable to Gyms
                </p>
                <p className="text-[24px] font-bold text-gray-900 leading-tight">
                  {formatINR(rev.totalPayable)}
                </p>
                <p className="mt-1 text-[12px] text-[#F97316] font-medium">
                  {rev.payableNote}
                </p>
              </div>

              {/* Platform Margin */}
              <div className="flex items-center justify-between pt-1 px-1">
                <p className="text-[13px] text-gray-500 font-medium">Estimated Platform Margin</p>
                <div className="flex items-baseline gap-1.5">
                  <span className="text-[15px] font-bold text-[#2D5A53]">
                    {formatINR(rev.estimatedMargin)}
                  </span>
                  <span className="text-[13px] font-semibold text-[#2D5A53]">
                    ({rev.estimatedMarginPercent}%)
                  </span>
                </div>
              </div>
            </div>
          </div>

          {/* Alerts & Flags */}
          <div
            id="alerts-widget"
            className="rounded-xl bg-white shadow-sm overflow-hidden"
            style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
          >
            <div className="px-6 py-4 border-b border-gray-100">
              <h2 className="text-[15px] font-semibold text-gray-800">Alerts &amp; Flags</h2>
            </div>

            <div className="p-5 space-y-3">
              {alerts.map((alert) => {
                const cfg = ALERT_CONFIG[alert.severity];
                const Icon = cfg.Icon;
                return (
                  <div
                    key={alert.id}
                    className={`flex items-start gap-3.5 rounded-lg p-3.5 ${cfg.bg} ${cfg.border}`}
                  >
                    {/* Icon circle */}
                    <div className={`flex h-8 w-8 flex-shrink-0 items-center justify-center rounded-full ${cfg.iconWrap}`}>
                      <Icon size={16} />
                    </div>

                    {/* Text */}
                    <div>
                      <p className={`text-[13px] font-semibold leading-snug ${cfg.title}`}>
                        <span className={`font-bold mr-1 ${cfg.count}`}>{alert.count}</span>
                        {alert.title}
                      </p>
                      <p className={`text-[12px] mt-0.5 font-medium ${cfg.subtitle}`}>
                        {alert.subtitle}
                      </p>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ── Row 3: Gym Status Table ────────────────────────────────── */}
        <GymStatusTable rows={gymOverview} />

      </div>
    </AdminLayout>
  );
};

export default AdminDashboard;
