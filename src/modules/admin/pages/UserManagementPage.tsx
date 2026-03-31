import { Search, SlidersHorizontal, RefreshCw } from 'lucide-react';
import AdminLayout from '../components/AdminLayout';
import UserTable from '../components/UserTable';
import { useAdminUsers } from '../hooks/useAdminUsers';
import type { MembershipPlan, AdminUserStatus } from '../types/admin.types';

// ─── Filter option sets ────────────────────────────────────────────────────────

const PLAN_OPTIONS: Array<{ label: string; value: MembershipPlan | 'All' }> = [
  { label: 'All Plans',  value: 'All'      },
  { label: 'Premium',    value: 'Premium'  },
  { label: 'Standard',   value: 'Standard' },
  { label: 'Basic',      value: 'Basic'    },
  { label: 'No Plan',    value: 'No Plan'  },
];

const STATUS_OPTIONS: Array<{ label: string; value: AdminUserStatus | 'All' }> = [
  { label: 'All Status',  value: 'All'       },
  { label: 'Active',      value: 'Active'    },
  { label: 'Suspended',   value: 'Suspended' },
];

// ─── Stat pill ─────────────────────────────────────────────────────────────────

interface PillProps { label: string; value: string | number; color: string; }
const StatPill = ({ label, value, color }: PillProps) => (
  <div className="flex items-center gap-2 rounded-lg bg-white px-4 py-2 shadow-sm border border-gray-100">
    <span className={`h-2 w-2 rounded-full ${color}`} />
    <span className="text-[13px] text-gray-500">{label}:</span>
    <span className="text-[13px] font-bold text-gray-800">{value}</span>
  </div>
);

// ─── Page ──────────────────────────────────────────────────────────────────────

const UserManagementPage = () => {
  const {
    users,
    totalCount,
    loading,
    filters,
    setFilters,
    toggleUserStatus,
    refetch,
  } = useAdminUsers();

  const activeCount    = users.filter((u) => u.status === 'Active').length;
  const suspendedCount = users.filter((u) => u.status === 'Suspended').length;

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) =>
    setFilters((f) => ({ ...f, search: e.target.value }));

  const handlePlanChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, plan: e.target.value as MembershipPlan | 'All' }));

  const handleStatusChange = (e: React.ChangeEvent<HTMLSelectElement>) =>
    setFilters((f) => ({ ...f, status: e.target.value as AdminUserStatus | 'All' }));

  const clearFilters = () =>
    setFilters({ search: '', plan: 'All', status: 'All' });

  const hasActiveFilters =
    filters.search !== '' || filters.plan !== 'All' || filters.status !== 'All';

  return (
    <AdminLayout title="User Management">
      <div className="space-y-5 max-w-[1280px]">

        {/* ── Page header ──────────────────────────────────────────────── */}
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div>
            <h2 className="text-[18px] font-bold text-gray-900">User Management</h2>
            <p className="mt-0.5 text-[13px] text-gray-400">
              Manage all registered platform users and their memberships.
            </p>
          </div>

          {/* Stats pills */}
          <div className="flex flex-wrap items-center gap-2">
            <StatPill label="Total"     value={totalCount}    color="bg-gray-400"     />
            <StatPill label="Active"    value={activeCount}   color="bg-emerald-400"  />
            <StatPill label="Suspended" value={suspendedCount} color="bg-red-400"     />
          </div>
        </div>

        {/* ── Search & Filter bar ───────────────────────────────────────── */}
        <div
          className="flex flex-wrap items-center gap-3 rounded-xl bg-white p-4 shadow-sm"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}
        >
          {/* Search input */}
          <div className="relative flex-1 min-w-[200px]">
            <Search
              size={15}
              className="absolute left-3.5 top-1/2 -translate-y-1/2 text-gray-400"
            />
            <input
              id="user-search-input"
              type="text"
              placeholder="Search by name or email…"
              value={filters.search}
              onChange={handleSearchChange}
              className="w-full rounded-lg border border-gray-200 bg-gray-50 py-2.5 pl-9 pr-4 text-[13px] text-gray-700 placeholder-gray-400 outline-none transition focus:border-[#2D5A53]/40 focus:bg-white focus:ring-2 focus:ring-[#2D5A53]/10"
            />
          </div>

          {/* Divider icon */}
          <SlidersHorizontal size={15} className="text-gray-300 flex-shrink-0" />

          {/* Plan filter */}
          <select
            id="user-plan-filter"
            value={filters.plan}
            onChange={handlePlanChange}
            className="rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-[13px] text-gray-600 outline-none transition focus:border-[#2D5A53]/40 focus:ring-2 focus:ring-[#2D5A53]/10 cursor-pointer"
          >
            {PLAN_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Status filter */}
          <select
            id="user-status-filter"
            value={filters.status}
            onChange={handleStatusChange}
            className="rounded-lg border border-gray-200 bg-gray-50 py-2.5 px-3 text-[13px] text-gray-600 outline-none transition focus:border-[#2D5A53]/40 focus:ring-2 focus:ring-[#2D5A53]/10 cursor-pointer"
          >
            {STATUS_OPTIONS.map((o) => (
              <option key={o.value} value={o.value}>{o.label}</option>
            ))}
          </select>

          {/* Clear filters */}
          {hasActiveFilters && (
            <button
              id="clear-filters-btn"
              onClick={clearFilters}
              className="text-[12px] font-semibold text-gray-400 hover:text-gray-600 transition-colors px-1"
            >
              Clear
            </button>
          )}

          {/* Spacer */}
          <div className="flex-1" />

          {/* Refresh */}
          <button
            id="refresh-users-btn"
            onClick={refetch}
            disabled={loading}
            className="flex items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3.5 py-2.5 text-[13px] font-semibold text-gray-500 hover:bg-gray-50 hover:text-gray-700 transition-colors disabled:opacity-40"
          >
            <RefreshCw size={13} className={loading ? 'animate-spin' : ''} />
            Refresh
          </button>
        </div>

        {/* ── Table card ────────────────────────────────────────────────── */}
        <div
          className="rounded-xl bg-white shadow-sm overflow-hidden"
          style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
        >
          {/* Card header */}
          <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
            <div>
              <h3 className="text-[15px] font-semibold text-gray-800">All Users</h3>
              <p className="text-[12px] text-gray-400 mt-0.5">
                {loading
                  ? 'Loading…'
                  : `Showing ${users.length} of ${totalCount} users`}
              </p>
            </div>
          </div>

          {/* Table */}
          <UserTable
            users={users}
            loading={loading}
            onToggleStatus={toggleUserStatus}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default UserManagementPage;
