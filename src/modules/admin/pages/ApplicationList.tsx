import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Search, Filter, ChevronRight } from 'lucide-react';
import Loader from '../../../components/ui/Loader';
import AdminLayout from '../components/AdminLayout';
import { useGymApplications } from '../hooks/useGymApplications';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';
import PaginationFooter from '../../../components/ui/PaginationFooter';


const ApplicationList: React.FC = () => {
  const navigate = useNavigate();
  const { 
    applications, 
    totalCount, 
    currentPage, 
    onPageChange, 
    limit, 
    isLoading 
  } = useGymApplications();


  const getStatusBadge = (status: string) => {
    switch (status) {
      case 'PENDING':
        return <Badge label="Pending Review" variant="orange" />;
      case 'UNDER_REVIEW':
        return <Badge label="Under Review" variant="blue" />;
      case 'REJECTED':
        return <Badge label="Rejected" variant="red" />;
      case 'APPROVED':
        return <Badge label="Approved" variant="green" />;
      default:
        return <Badge label={status} variant="gray" />;
    }
  };

  const getCategoryBadge = (category: string) => {
    switch (category?.toLowerCase()) {
      case 'premium':
        return <Badge label="Premium" variant="purple" />;
      case 'standard':
        return <Badge label="Standard" variant="teal" />;
      case 'basic':
        return <Badge label="Basic" variant="gray" />;
      default:
        return <Badge label={category} variant="gray" />;
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-GB', {
      day: '2-digit',
      month: 'short',
      year: 'numeric',
    });
  };

  if (isLoading) {
    return (
      <AdminLayout title="Partnership Applications">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader size="lg" variant="primary" />
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Partnership Applications">
      <div className="space-y-6 max-w-[1200px]">
        
        {/* Header Actions */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div className="relative flex-1 max-w-md">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-4 w-4 text-gray-400" />
            <input
              type="text"
              placeholder="Search by gym name or city..."
              className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-200 focus:outline-none focus:ring-2 focus:ring-[#2D5A53] focus:border-transparent transition-all"
            />
          </div>
          <div className="flex items-center gap-3">
            <Button variant="secondary" className="flex items-center gap-2">
              <Filter className="h-4 w-4" />
              Filter
            </Button>
          </div>
        </div>

        {/* Applications Table */}
        <div className="bg-white rounded-xl shadow-sm border border-gray-100 overflow-hidden">
          <table className="w-full text-left border-collapse">
            <thead>
              <tr className="bg-gray-50 border-b border-gray-100">
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600">Gym Name</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600">Place/City</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600">Requested Category</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600">Application Date</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600">Status</th>
                <th className="px-6 py-4 text-[13px] font-semibold text-gray-600 text-right">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-50">
              {applications.length > 0 ? (
                applications.map((app) => (
                  <tr key={app.id} className="hover:bg-gray-50 transition-colors group">
                    <td className="px-6 py-4">
                      <p className="font-bold text-gray-900">{app.name}</p>
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-500 text-[14px]">{app.location}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getCategoryBadge(app.category)}
                    </td>
                    <td className="px-6 py-4">
                      <p className="text-gray-600 text-[14px]">{formatDate(app.createdAt)}</p>
                    </td>
                    <td className="px-6 py-4">
                      {getStatusBadge(app.status)}
                    </td>
                    <td className="px-6 py-4 text-right">
                      <Button
                        variant="primary"
                        size="sm"
                        className="bg-[#2D5A53] hover:bg-[#234741] text-white flex items-center gap-2 ml-auto"
                        onClick={() => navigate(`/admin/applications/${app.id}`)}
                      >
                        Review Application
                        <ChevronRight className="h-4 w-4" />
                      </Button>
                    </td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan={6} className="px-6 py-12 text-center text-gray-500">
                    No partnership applications found.
                  </td>
                </tr>
              )}
            </tbody>
          </table>

          <PaginationFooter 
            currentPage={currentPage}
            totalCount={totalCount}
            limit={limit}
            onPageChange={onPageChange}
            loading={isLoading}
          />
        </div>

      </div>
    </AdminLayout>
  );
};

export default ApplicationList;
