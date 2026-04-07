import Loader from '../../../components/ui/Loader';
import AdminLayout from '../components/AdminLayout';
import GymStatusTable from '../components/GymStatusTable';
import { usePartnerGymData } from '../hooks/usePartnerGymData';
import PaginationFooter from '../../../components/ui/PaginationFooter';
import ConfirmationModal from '../../../components/ui/ConfirmationModal';
import { useState } from 'react';


// ─── Stat Card Component ──────────────────────────────────────────────────────

interface StatCardProps {
  id: string;
  title: string;
  value: string;
  subtitle: string;
}

const StatCard = ({ id, title, value, subtitle }: StatCardProps) => (
  <div
    id={id}
    className="flex flex-col justify-between rounded-xl bg-white p-6 shadow-sm"
    style={{ boxShadow: '0 1px 3px rgba(0,0,0,0.08), 0 1px 2px rgba(0,0,0,0.04)' }}
  >
    <p className="text-[13px] font-medium text-gray-400 mb-3">{title}</p>
    <div>
      <p className="text-[26px] font-bold text-gray-900 leading-tight tracking-tight">{value}</p>
      <p className="mt-1 text-[12px] text-[#6B7280] font-normal">{subtitle}</p>
    </div>
  </div>
);

// ─── Gym Management Page ──────────────────────────────────────────────────────

const GymManagementPage = () => {
  const { 
    stats, 
    partnerGyms, 
    totalCount,
    currentPage,
    onPageChange,
    limit,
    isLoading, 
    toggleGymStatus 
  } = usePartnerGymData();

  const [confirmModal, setConfirmModal] = useState<{
    isOpen: boolean;
    gymId: string | null;
    currentStatus: string | null;
  }>({
    isOpen: false,
    gymId: null,
    currentStatus: null,
  });

  const handleToggleStatus = (gymId: string, currentStatus: string) => {
    setConfirmModal({
      isOpen: true,
      gymId,
      currentStatus,
    });
  };

  const handleConfirmToggle = async () => {
    if (confirmModal.gymId && confirmModal.currentStatus) {
      await toggleGymStatus(confirmModal.gymId, confirmModal.currentStatus);
    }
    setConfirmModal(prev => ({ ...prev, isOpen: false }));
  };


  if (isLoading) {
    return (
      <AdminLayout title="Partner Gym Management">
        <div className="flex h-[60vh] w-full items-center justify-center">
          <Loader size="lg" variant="primary" />
        </div>
      </AdminLayout>
    );
  }

  // Safe fallback if API errors to prevent layout crash
  const safeStats = stats || { totalGyms: 0, premiumCount: 0, standardCount: 0, basicCount: 0 };

  return (
    <AdminLayout title="Partner Gym Management">
      <div className="mx-auto max-w-[1280px] space-y-6">

        {/* ── Row 1: Four Gym Metric Cards ───────────── */}
        <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-4">
          <StatCard
            id="stat-total-gyms"
            title="Total Partner Gyms"
            value={safeStats.totalGyms.toLocaleString('en-IN')}
            subtitle="Registered platform gyms"
          />
          <StatCard
            id="stat-premium-gyms"
            title="Premium Gyms"
            value={safeStats.premiumCount.toLocaleString('en-IN')}
            subtitle="Premium tier gyms"
          />
          <StatCard
            id="stat-standard-gyms"
            title="Standard Gyms"
            value={safeStats.standardCount.toLocaleString('en-IN')}
            subtitle="Standard tier gyms"
          />
          <StatCard
            id="stat-basic-gyms"
            title="Basic Gyms"
            value={safeStats.basicCount.toLocaleString('en-IN')}
            subtitle="Basic tier gyms"
          />
        </div>

        {/* ── Row 2: Gym Status Table ONLY ────────────────────────────────── */}
        <div className="rounded-xl bg-white shadow-sm overflow-hidden border border-gray-100">
          <GymStatusTable rows={partnerGyms} onToggleStatus={handleToggleStatus} />
          
          <PaginationFooter 
            currentPage={currentPage}
            totalCount={totalCount}
            limit={limit}
            onPageChange={onPageChange}
            loading={isLoading}
          />
        </div>

        <ConfirmationModal
          isOpen={confirmModal.isOpen}
          onClose={() => setConfirmModal(prev => ({ ...prev, isOpen: false }))}
          onConfirm={handleConfirmToggle}
          title={confirmModal.currentStatus === 'Active' ? 'Suspend Gym' : 'Activate Gym'}
          message={`Are you sure you want to ${
            confirmModal.currentStatus === 'Active' ? 'suspend' : 'activate'
          } this gym? ${
            confirmModal.currentStatus === 'Active' 
              ? 'This will prevent users from booking slots at this gym.' 
              : 'This will allow users to resume booking slots.'
          }`}
          type={confirmModal.currentStatus === 'Active' ? 'danger' : 'info'}
          confirmText={confirmModal.currentStatus === 'Active' ? 'Suspend Gym' : 'Activate Gym'}
        />


      </div>
    </AdminLayout>
  );
};

export default GymManagementPage;
