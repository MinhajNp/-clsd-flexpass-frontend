import { clsx } from 'clsx';
import Badge from '../../../components/ui/Badge';
import type { BadgeVariant } from '../../../components/ui/Badge';
import type { AdminUser, MembershipPlan, AdminUserStatus } from '../types/admin.types';

// ─── Badge variant maps ───────────────────────────────────────────────────────

const PLAN_VARIANT: Record<MembershipPlan, BadgeVariant> = {
  Premium:  'purple',
  Standard: 'blue',
  Basic:    'gray',
  'No Plan': 'gray',
};

const STATUS_VARIANT: Record<AdminUserStatus, BadgeVariant> = {
  Active:    'green',
  Suspended: 'red',
};

// ─── Date formatter ───────────────────────────────────────────────────────────

const formatDate = (iso: string): string => {
  if (iso === 'N/A') return 'N/A';
  const d = new Date(iso);
  return d.toLocaleDateString('en-IN', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  });
};

// ─── Skeleton row ─────────────────────────────────────────────────────────────

const SkeletonRow = () => (
  <tr className="animate-pulse">
    {[...Array(7)].map((_, i) => (
      <td key={i} className="px-6 py-4">
        <div className="h-4 rounded bg-gray-100" style={{ width: i === 0 ? '70%' : i === 6 ? '60%' : '50%' }} />
        {i === 0 && <div className="mt-1.5 h-3 rounded bg-gray-100 w-9/12" />}
      </td>
    ))}
  </tr>
);

// ─── Empty state ──────────────────────────────────────────────────────────────

const EmptyState = () => (
  <tr>
    <td colSpan={7} className="px-6 py-16 text-center">
      <div className="flex flex-col items-center gap-2">
        <svg className="w-10 h-10 text-gray-200" fill="none" viewBox="0 0 24 24" stroke="currentColor" strokeWidth={1.5}>
          <path strokeLinecap="round" strokeLinejoin="round" d="M15 19.128a9.38 9.38 0 002.625.372 9.337 9.337 0 004.121-.952 4.125 4.125 0 00-7.533-2.493M15 19.128v-.003c0-1.113-.285-2.16-.786-3.07M15 19.128v.106A12.318 12.318 0 018.624 21c-2.331 0-4.512-.645-6.374-1.766l-.001-.109a6.375 6.375 0 0111.964-3.07M12 6.375a3.375 3.375 0 11-6.75 0 3.375 3.375 0 016.75 0zm8.25 2.25a2.625 2.625 0 11-5.25 0 2.625 2.625 0 015.25 0z" />
        </svg>
        <p className="text-sm font-semibold text-gray-400">No users found</p>
        <p className="text-xs text-gray-300">Try adjusting your search or filters</p>
      </div>
    </td>
  </tr>
);

// ─── Component ────────────────────────────────────────────────────────────────

interface UserTableProps {
  users: AdminUser[];
  loading: boolean;
  onToggleStatus: (userId: string) => void;
}

const UserTable = ({ users, loading, onToggleStatus }: UserTableProps) => {
  const HEADERS = [
    'Name',
    'Email Address',
    'Membership Plan',
    'Expiry Date',
    'Total Check-ins',
    'Status',
    'Actions',
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        {/* ── Head ── */}
        <thead>
          <tr className="border-b border-gray-100 bg-gray-50/70">
            {HEADERS.map((h) => (
              <th
                key={h}
                className="px-6 py-3.5 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 whitespace-nowrap"
              >
                {h}
              </th>
            ))}
          </tr>
        </thead>

        {/* ── Body ── */}
        <tbody className="divide-y divide-gray-50">
          {loading ? (
            [...Array(6)].map((_, i) => <SkeletonRow key={i} />)
          ) : users.length === 0 ? (
            <EmptyState />
          ) : (
            users.map((user) => (
              <tr
                key={user.id}
                className="hover:bg-gray-50/60 transition-colors"
              >
                {/* Name + Email stacked */}
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="font-semibold text-gray-800 text-[13px]">{user.name}</p>
                  <p className="text-[12px] text-gray-400 mt-0.5">{user.email}</p>
                </td>

                {/* Email (hidden — already in name col, kept for search compatibility) */}
                <td className="px-6 py-4 text-[13px] text-gray-500 whitespace-nowrap">
                  {user.email}
                </td>

                {/* Plan badge */}
                <td className="px-6 py-4">
                  <Badge label={user.membershipPlan} variant={PLAN_VARIANT[user.membershipPlan]} />
                </td>

                {/* Expiry date */}
                <td className="px-6 py-4 text-[13px] text-gray-500 whitespace-nowrap">
                  {formatDate(user.expiryDate)}
                </td>

                {/* Total check-ins */}
                <td className="px-6 py-4 text-[13px] font-medium text-gray-700 text-center">
                  {user.totalCheckins.toLocaleString('en-IN')}
                </td>

                {/* Status badge */}
                <td className="px-6 py-4">
                  <Badge label={user.status} variant={STATUS_VARIANT[user.status]} />
                </td>

                {/* Toggle action button */}
                <td className="px-6 py-4">
                  <button
                    id={`toggle-user-${user.id}`}
                    disabled={user.isUpdating}
                    onClick={() => onToggleStatus(user.id)}
                    className={clsx(
                      'inline-flex items-center gap-1.5 rounded-lg border px-3 py-1.5 text-[12px] font-semibold transition-all',
                      'disabled:opacity-50 disabled:cursor-not-allowed',
                      user.status === 'Active'
                        ? 'border-red-200 text-red-600 hover:bg-red-50'
                        : 'border-[#2D5A53]/30 text-[#2D5A53] hover:bg-[#2D5A53]/5'
                    )}
                  >
                    {user.isUpdating ? (
                      <>
                        <svg className="animate-spin h-3 w-3" viewBox="0 0 24 24" fill="none">
                          <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                          <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                        </svg>
                        <span>Updating…</span>
                      </>
                    ) : user.status === 'Active' ? (
                      'Block'
                    ) : (
                      'Unblock'
                    )}
                  </button>
                </td>
              </tr>
            ))
          )}
        </tbody>
      </table>
    </div>
  );
};

export default UserTable;
