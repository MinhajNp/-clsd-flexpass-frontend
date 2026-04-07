import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import toast from 'react-hot-toast';
import { 
  ArrowLeft, FileText, ExternalLink, 
  MapPin, Phone, Mail, Building, Wifi, 
  AlertCircle, Trash2, Check, Crown
} from 'lucide-react';
import Loader from '../../../components/ui/Loader';
import AdminLayout from '../components/AdminLayout';
import { useGymApplicationById } from '../hooks/useGymApplicationById';
import { 
  updateGymApplicationStatus, 
  approveGymApplication, 
  rejectGymApplication 
} from '../services/adminService';
import Badge from '../../../components/ui/Badge';
import Button from '../../../components/ui/Button';

const ApplicationDetail: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const { application, isLoading, error } = useGymApplicationById(id);
  
  const [sessionApprovedDocs, setSessionApprovedDocs] = useState<Record<string, boolean>>({});
  const [selectedCategory, setSelectedCategory] = useState<'BASIC' | 'STANDARD' | 'PREMIUM'>('BASIC');
  const [isRejecting, setIsRejecting] = useState(false);
  const [rejectionReason, setRejectionReason] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);

  const BASE_URL = "http://localhost:5000";

  // Initialize sessionApprovedDocs and category when application loads
  useEffect(() => {
    if (application) {
      if (application.documents) {
        const initial: Record<string, boolean> = {};
        application.documents.forEach((doc: any, index: number) => {
          initial[`doc-${index}`] = doc.status === 'APPROVED';
        });
        setSessionApprovedDocs(initial);
      }
      if (application.category) {
        setSelectedCategory(application.category as any);
      }
    }
  }, [application]);

  const toggleDocApproval = async (index: number) => {
    const docKey = `doc-${index}`;
    const newState = !sessionApprovedDocs[docKey];
    
    // Update local session state
    setSessionApprovedDocs(prev => ({ ...prev, [docKey]: newState }));

    // Send update to backend for this specific document
    try {
      const updatedDocs = [...application.documents];
      updatedDocs[index] = { ...updatedDocs[index], status: newState ? 'APPROVED' : 'PENDING' };
      
      await updateGymApplicationStatus(id!, { 
        documents: updatedDocs,
        status: 'UNDER_REVIEW' // Move to under review as soon as admin starts checking
      });
      
    } catch (err) {
      console.error('Failed to update document status', err);
      // Revert local state on error
      setSessionApprovedDocs(prev => ({ ...prev, [docKey]: !newState }));
    }
  };

  const handleActivate = async () => {
    try {
      setIsSubmitting(true);
      await approveGymApplication(id!, selectedCategory);
      toast.success('Gym application approved successfully!');
      navigate('/admin/applications');
    } catch (err) {
      console.error('Failed to activate gym', err);
      toast.error('Failed to approve application');
    } finally {
      setIsSubmitting(false);
    }
  };

  const handleReject = async () => {
    if (!rejectionReason.trim()) return;
    try {
      setIsSubmitting(true);
      await rejectGymApplication(id!, rejectionReason);
      toast.success('Gym application rejected');
      navigate('/admin/applications');
    } catch (err) {
      console.error('Failed to reject application', err);
      toast.error('Failed to reject application');
    } finally {
      setIsSubmitting(false);
      setIsRejecting(false);
    }
  };

  const allDocsApproved = application?.documents?.every((_doc: any, index: number) => sessionApprovedDocs[`doc-${index}`]);

  if (isLoading) {
    return (
      <AdminLayout title="Review Application">
        <div className="flex items-center justify-center min-h-[60vh]">
          <Loader size="lg" variant="primary" />
        </div>
      </AdminLayout>
    );
  }

  if (error || !application) {
    return (
      <AdminLayout title="Review Application">
        <div className="bg-red-50 text-red-600 p-4 rounded-xl flex items-center gap-3">
          <AlertCircle className="h-5 w-5" />
          <p>{error || 'Application not found'}</p>
        </div>
      </AdminLayout>
    );
  }

  return (
    <AdminLayout title="Review Application">
      <div className="space-y-6 max-w-[1200px] pb-20">
        
        {/* Back Button */}
        <button 
          onClick={() => navigate('/admin/applications')}
          className="flex items-center gap-2 text-gray-400 hover:text-[#2D5A53] transition-colors font-medium mb-2"
        >
          <ArrowLeft className="h-4 w-4" />
          Back to Applications
        </button>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-6">
          
          {/* Left Column: Gym Identity & Facilities */}
          <div className="lg:col-span-2 space-y-6">
            
            {/* Gym Identity Card */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <div className="flex justify-between items-start mb-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900">{application.gymName || application.name}</h2>
                  <p className="text-gray-500 mt-1 uppercase tracking-wider text-xs font-bold">
                    Requested Category: <span className="text-[#2D5A53] ml-1">{application.category}</span>
                  </p>
                </div>
                <Badge 
                  label={application.status.replace('_', ' ')} 
                  variant={application.status === 'PENDING' ? 'orange' : application.status === 'APPROVED' ? 'green' : 'blue'} 
                  className="px-4 py-1.5"
                />
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <MapPin className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Full Address</p>
                    <p className="text-sm font-medium text-gray-800">{application.fullAddress || application.location}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Phone className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Contact Number</p>
                    <p className="text-sm font-medium text-gray-800">{application.contactPhone || application.phone}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Mail className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Email Address</p>
                    <p className="text-sm font-medium text-gray-800">{application.officialEmail || application.email}</p>
                  </div>
                </div>
                <div className="flex items-start gap-3 p-3 rounded-xl bg-gray-50 border border-gray-100">
                  <Building className="h-5 w-5 text-gray-400 mt-1" />
                  <div>
                    <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight">Application Date</p>
                    <p className="text-sm font-medium text-gray-800">{new Date(application.createdAt).toLocaleDateString('en-GB', { day: '2-digit', month: 'long', year: 'numeric' })}</p>
                  </div>
                </div>
              </div>

              <div className="mt-6">
                <p className="text-[11px] font-bold text-gray-400 uppercase tracking-tight mb-2">Description</p>
                <div className="bg-gray-50 rounded-xl p-4 border border-gray-100">
                  <p className="text-sm text-gray-700 leading-relaxed">
                    {application.description || "No description provided."}
                  </p>
                </div>
              </div>
            </div>

            {/* Category Setting Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Crown className="h-5 w-5 text-[#2D5A53]" />
                Assign Gym Category
              </h3>
              <p className="text-sm text-gray-500 mb-6">
                Based on document verification and facility check, assign the final functional category for this gym. 
                The applicant requested <span className="font-bold text-[#2D5A53]">{application.category}</span>.
              </p>
              
              <div className="grid grid-cols-3 gap-4">
                {(['BASIC', 'STANDARD', 'PREMIUM'] as const).map((cat) => (
                  <button
                    key={cat}
                    onClick={() => setSelectedCategory(cat)}
                    className={`relative p-4 rounded-2xl border-2 transition-all flex flex-col items-center gap-2 group ${
                      selectedCategory === cat 
                        ? 'border-[#2D5A53] bg-[#F0F7F6]' 
                        : 'border-gray-100 bg-white hover:border-gray-200'
                    }`}
                  >
                    {selectedCategory === cat && (
                      <div className="absolute -top-2 -right-2 bg-[#2D5A53] text-white p-1 rounded-full shadow-lg">
                        <Check className="h-3 w-3" />
                      </div>
                    )}
                    <span className={`text-sm font-bold tracking-tight ${selectedCategory === cat ? 'text-[#2D5A53]' : 'text-gray-500 group-hover:text-gray-700'}`}>
                      {cat}
                    </span>
                  </button>
                ))}
              </div>
            </div>

            {/* Facilities Section */}
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <Wifi className="h-5 w-5 text-[#2D5A53]" />
                Facilities
              </h3>
              <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-3">
                {application.facilities?.map((facility: string, idx: number) => (
                  <div key={idx} className="flex items-center gap-2 px-3 py-2 rounded-lg bg-[#F0F7F6] text-[#2D5A53] border border-[#DCEBE9]">
                    <Check className="h-3 w-3" />
                    <span className="text-sm font-semibold">{facility}</span>
                  </div>
                ))}
              </div>
            </div>

          </div>

          {/* Right Column: Document Verification */}
          <div className="space-y-6">
            <div className="bg-white rounded-2xl p-6 shadow-sm border border-gray-100 sticky top-6">
              <h3 className="text-lg font-bold text-gray-900 mb-4 flex items-center gap-2">
                <FileText className="h-5 w-5 text-[#2D5A53]" />
                Document Verification
              </h3>
              <div className="space-y-4">
                {application.documents?.map((doc: any, idx: number) => (
                  <div 
                    key={idx} 
                    className={`flex flex-col gap-3 p-4 rounded-2xl border transition-all ${
                      sessionApprovedDocs[`doc-${idx}`] 
                        ? 'bg-[#F0FDF4] border-[#BBF7D0]' 
                        : 'bg-white border-gray-100'
                    }`}
                  >
                    <div className="flex items-center justify-between">
                      <div className="flex items-center gap-3">
                        <div className={`p-2 rounded-lg ${sessionApprovedDocs[`doc-${idx}`] ? 'bg-green-100 text-green-600' : 'bg-gray-100 text-gray-500'}`}>
                          <FileText className="h-4 w-4" />
                        </div>
                        <span className="text-sm font-bold text-gray-800">{doc.name}</span>
                      </div>
                      <a 
                        href={doc.url?.startsWith('http') ? doc.url : `${BASE_URL}${doc.url}`} 
                        target="_blank" 
                        rel="noreferrer"
                        className="text-gray-400 hover:text-[#2D5A53] transition-colors"
                        title="View Document"
                      >
                        <ExternalLink className="h-4 w-4" />
                      </a>
                    </div>
                    
                    <div className="flex items-center justify-between pt-2 border-t border-dashed border-gray-200">
                      <span className="text-[12px] font-semibold text-gray-400">
                        {sessionApprovedDocs[`doc-${idx}`] ? 'Document Verified' : 'Awaiting Review'}
                      </span>
                      <label className="relative inline-flex items-center cursor-pointer">
                        <input 
                          type="checkbox" 
                          className="sr-only peer" 
                          checked={sessionApprovedDocs[`doc-${idx}`] || false}
                          onChange={() => toggleDocApproval(idx)}
                        />
                        <div className="w-10 h-5 bg-gray-200 peer-focus:outline-none rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-4 after:w-4 after:transition-all peer-checked:bg-[#2D5A53]"></div>
                      </label>
                    </div>
                  </div>
                ))}
              </div>

              {/* Action Buttons */}
              <div className="mt-8 pt-6 border-t border-gray-100 space-y-3">
                <Button
                  variant="primary"
                  fullWidth
                  disabled={!allDocsApproved || isSubmitting}
                  loading={isSubmitting && !isRejecting}
                  onClick={handleActivate}
                  className={!allDocsApproved ? 'opacity-50 grayscale' : ''}
                >
                  {allDocsApproved ? 'Activate Gym' : 'Approve All Docs to Activate'}
                </Button>
                <Button
                  variant="ghost"
                  fullWidth
                  className="text-red-500 hover:bg-red-50"
                  onClick={() => setIsRejecting(true)}
                  disabled={isSubmitting}
                >
                  <Trash2 className="h-4 w-4 mr-2" />
                  Reject Application
                </Button>
              </div>
            </div>
          </div>

        </div>
      </div>

      {/* Rejection Modal */}
      {isRejecting && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50 backdrop-blur-sm p-4">
          <div className="bg-white rounded-3xl p-8 max-w-md w-full shadow-2xl animate-in fade-in zoom-in duration-200">
            <h3 className="text-xl font-bold text-gray-900 mb-2">Reject Application</h3>
            <p className="text-gray-500 text-sm mb-6">
              Please provide a reason for rejecting <span className="font-bold text-gray-700">{application.name}</span>. This will be sent to the gym owner.
            </p>
            
            <textarea
              value={rejectionReason}
              onChange={(e) => setRejectionReason(e.target.value)}
              placeholder="e.g. Documents are blurry, GST mismatch..."
              className="w-full h-32 p-4 rounded-2xl border border-gray-200 focus:outline-none focus:ring-2 focus:ring-red-500/20 focus:border-red-500 transition-all resize-none mb-6 text-sm"
            />
            
            <div className="flex gap-3">
              <Button
                variant="secondary"
                fullWidth
                onClick={() => setIsRejecting(false)}
              >
                Cancel
              </Button>
              <Button
                variant="danger"
                fullWidth
                disabled={!rejectionReason.trim() || isSubmitting}
                loading={isSubmitting}
                onClick={handleReject}
              >
                Submit Rejection
              </Button>
            </div>
          </div>
        </div>
      )}
    </AdminLayout>
  );
};

export default ApplicationDetail;
