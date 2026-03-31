import { MoveRight } from 'lucide-react';
import Badge from '../../../components/ui/Badge';
import type { BadgeVariant } from '../../../components/ui/Badge';
import type { GymCategory, GymOverviewRow, GymStatus } from '../types/admin.types';

// ─── Badge variant maps ───────────────────────────────────────────────────────

const CATEGORY_VARIANT: Record<GymCategory, BadgeVariant> = {
  Premium:  'purple',
  Standard: 'blue',
  Basic:    'gray',
};

const STATUS_VARIANT: Record<GymStatus, BadgeVariant> = {
  Active:    'green',
  Pending:   'orange',
  Suspended: 'red',
};

// ─── Component ────────────────────────────────────────────────────────────────

interface GymStatusTableProps {
  rows: GymOverviewRow[];
}

const GymStatusTable = ({ rows }: GymStatusTableProps) => (
  <div id="gym-status-overview" className="rounded-2xl bg-white shadow-sm overflow-hidden">
    {/* Card Header */}
    <div className="flex items-center justify-between px-6 py-4 border-b border-gray-100">
      <h2 className="text-[15px] font-semibold text-gray-800">Gym Status Overview</h2>
      <a
        href="/admin/gyms"
        id="view-all-gyms-link"
        className="flex items-center gap-1 text-[13px] font-semibold text-[#2D5A53] hover:text-[#224842] transition-colors"
      >
        View All Gyms
        <MoveRight size={14} />
      </a>
    </div>

    {/* Table */}
    <div className="overflow-x-auto">
      <table className="w-full text-sm">
        <thead>
          <tr className="border-b border-gray-100">
            <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60">Gym Name</th>
            <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60">City</th>
            <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60">Category</th>
            <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60">Status</th>
            <th className="px-6 py-3 text-left text-[11px] font-semibold uppercase tracking-wider text-gray-400 bg-gray-50/60">Action</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((gym) => (
            <tr key={gym.id} className="hover:bg-gray-50/70 transition-colors">
              <td className="px-6 py-3.5">
                <span className="font-medium text-gray-800">{gym.name}</span>
              </td>
              <td className="px-6 py-3.5 text-gray-500 text-[13px]">{gym.city}</td>
              <td className="px-6 py-3.5">
                <Badge label={gym.category} variant={CATEGORY_VARIANT[gym.category]} />
              </td>
              <td className="px-6 py-3.5">
                <Badge label={gym.status} variant={STATUS_VARIANT[gym.status]} />
              </td>
              <td className="px-6 py-3.5">
                <button
                  id={`view-gym-btn-${gym.id}`}
                  className="flex items-center gap-1 text-[13px] font-semibold text-[#2D5A53] hover:text-[#224842] transition-colors group"
                >
                  View Gym
                  <MoveRight size={13} className="transition-transform group-hover:translate-x-0.5" />
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default GymStatusTable;
