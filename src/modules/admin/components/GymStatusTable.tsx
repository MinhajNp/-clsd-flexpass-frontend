import { MoveRight, Wrench } from 'lucide-react';
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

// ─── Format Helpers ────────────────────────────────────────────────────────────

const formatDate = (isoStr: string) => {
  if (!isoStr || isoStr === 'N/A') return 'N/A';
  const d = new Date(isoStr);
  if (isNaN(d.getTime())) return 'N/A';
  
  return d.toLocaleDateString('en-IN', {
    day:   '2-digit',
    month: 'short',
    year:  'numeric',
  });
};

// ─── Component ────────────────────────────────────────────────────────────────

interface GymStatusTableProps {
  rows: GymOverviewRow[];
  onToggleStatus?: (gymId: string, currentStatus: GymStatus) => void;
}

const GymStatusTable = ({ rows, onToggleStatus }: GymStatusTableProps) => (
  <div id="gym-status-overview" className="rounded-2xl bg-white shadow-sm overflow-hidden" style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08)' }}>
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
            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Gym &amp; Location</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Category</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Joined Date</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Status</th>
            <th className="px-6 py-3.5 text-left text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Emergency Mode</th>
            <th className="px-6 py-3.5 text-right text-[11px] font-bold uppercase tracking-wider text-[#8FA3A0] bg-[#F9FAFB]/50">Actions</th>
          </tr>
        </thead>
        <tbody className="divide-y divide-gray-50">
          {rows.map((gym) => (
            <tr key={gym.id} className="hover:bg-gray-50/70 transition-colors group">
              {/* Gym Name & City */}
              <td className="px-6 py-4">
                <div className="flex flex-col">
                  <span className="font-bold text-[14px] text-gray-900">{gym.name}</span>
                  <span className="text-[12px] font-medium text-gray-400 mt-0.5">{gym.city}</span>
                </div>
              </td>
              
              {/* Category */}
              <td className="px-6 py-4">
                <Badge label={gym.category} variant={CATEGORY_VARIANT[gym.category]} />
              </td>

              {/* Joined Date */}
              <td className="px-6 py-4 whitespace-nowrap">
                <span className="text-[13px] font-medium text-gray-600">{formatDate(gym.joinedAt)}</span>
              </td>

              {/* Status */}
              <td className="px-6 py-4">
                <Badge label={gym.status} variant={STATUS_VARIANT[gym.status]} />
              </td>

              {/* Emergency Mode */}
              <td className="px-6 py-4">
                {gym.isEmergencyMode ? (
                  <div 
                    className="group-emergency relative flex items-center gap-2 cursor-help"
                    title="Gym is under maintenance"
                  >
                    <div className="relative flex h-2.5 w-2.5">
                      <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-red-400 opacity-75" />
                      <span className="relative inline-flex rounded-full h-2.5 w-2.5 bg-red-500" />
                    </div>
                    <span className="text-[12px] font-semibold text-red-600 flex items-center gap-1.5 bg-red-50 px-2 py-0.5 rounded-md border border-red-100">
                      <Wrench size={11} className="text-red-500" /> Maintenance
                    </span>
                  </div>
                ) : (
                  <div className="flex items-center gap-2" title="Gym operating normally">
                    <span className="h-2 w-2 rounded-full bg-emerald-400" />
                    <span className="text-[12px] font-medium text-gray-400">Normal</span>
                  </div>
                )}
              </td>

              {/* Actions */}
              <td className="px-6 py-4">
                <div className="flex items-center justify-end gap-5">
                  {/* Status Toggle Button */}
                  {gym.status === 'Active' ? (
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(gym.id, gym.status)}
                      className="text-[13px] font-semibold text-red-500 hover:text-red-600 hover:underline underline-offset-2 transition-all"
                    >
                      Suspend
                    </button>
                  ) : (
                    <button
                      onClick={() => onToggleStatus && onToggleStatus(gym.id, gym.status)}
                      className="text-[13px] font-semibold text-[#2D5A53] hover:text-[#224842] hover:underline underline-offset-2 transition-all"
                    >
                      Activate
                    </button>
                  )}

                  {/* View Details Link */}
                  <button
                    id={`view-gym-details-${gym.id}`}
                    className="flex h-[32px] items-center gap-1.5 rounded-lg border border-gray-200 bg-white px-3 text-[12px] font-semibold text-gray-600 hover:border-[#2D5A53]/30 hover:bg-[#2D5A53]/5 hover:text-[#2D5A53] transition-all"
                  >
                    <span>Details</span>
                    <MoveRight size={13} className="opacity-70 transition-transform group-hover:translate-x-0.5" />
                  </button>
                </div>
              </td>

            </tr>
          ))}
        </tbody>
      </table>
    </div>
  </div>
);

export default GymStatusTable;
