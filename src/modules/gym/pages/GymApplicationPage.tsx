import React, { useState } from "react";
import toast from "react-hot-toast";
import { CheckCircle2 } from "lucide-react";
import SectionCard from "../components/SectionCard";
import GymInfoForm from "../components/GymInfoForm";
import OwnerDetailsForm from "../components/OwnerDetailsForm";
import CategoryRequest from "../components/CategoryRequest";
import FacilitiesForm from "../components/FacilitiesForm";
import DocumentUpload from "../components/DocumentUpload";
import BankDetailsForm from "../components/BankDetailsForm";
import Button from "../../../components/ui/Button";
import type { GymApplicationData } from "../types/gym.types";
import { submitGymApplication } from "../services/gymService";
import { useNavigate } from "react-router-dom";

const INITIAL_STATE: GymApplicationData = {
  gymName: "",
  city: "",
  fullAddress: "",
  contactPhone: "",
  officialEmail: "",
  ownerName: "",
  ownerContact: "",
  ownerEmail: "",
  category: "STANDARD",
  facilities: [],
  documents: {
    businessRegistration: null,
    ownerIdentityProof: null,
    addressProof: null,
    gymLicense: null,
    gymInsurance: null,
  },
  bankDetails: {
    accountHolder: "",
    bankName: "",
    accountNumber: "",
    ifscCode: "",
  },
  agreedToTerms: false,
};

const GymApplicationPage = () => {
  const navigate = useNavigate()
  const [formData, setFormData] = useState<GymApplicationData>(INITIAL_STATE);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [isSubmitted, setIsSubmitted] = useState(false);

  const updateField = (field: string, value: any) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
  };

  const updateBankDetails = (field: string, value: string) => {
    setFormData((prev) => ({
      ...prev,
      bankDetails: { ...prev.bankDetails, [field]: value },
    }));
  };

  const updateDocuments = (field: string, file: File | null) => {
    setFormData((prev) => ({
      ...prev,
      documents: { ...prev.documents, [field]: file },
    }));
  };

  const isFormValid = () => {
    const requiredFields = [
      formData.gymName, formData.city, formData.fullAddress,
      formData.contactPhone, formData.officialEmail, formData.ownerName,
      formData.ownerContact, formData.ownerEmail,
      formData.bankDetails.accountHolder, formData.bankDetails.bankName,
      formData.bankDetails.accountNumber, formData.bankDetails.ifscCode,
    ];
    
    const requiredFiles = [
      formData.documents.businessRegistration,
      formData.documents.ownerIdentityProof,
      formData.documents.addressProof,
      formData.documents.gymLicense,
    ];

    const allFieldsFilled = requiredFields.every((f) => f.trim().length > 0);
    const allFilesUploaded = requiredFiles.every((f) => f !== null);
    
    return allFieldsFilled && allFilesUploaded && formData.agreedToTerms;
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!isFormValid()) {
      toast.error("Please fill in all required fields and upload mandatory documents.");
      return;
    }

    try {
      setIsSubmitting(true);
      await submitGymApplication(formData);
      setIsSubmitted(true);
      // window.scrollTo({ top: 0, behavior: 'smooth' });
      navigate('/gym/pending-approval')
    } catch (error: any) {
      const message = error.response?.data?.message || "Failed to submit application. Please check your connection.";
      toast.error(message, {
        duration: 5000,
        icon: '⚠️'
      });
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isSubmitted) {
    return (
      <div className="min-h-screen bg-gray-50 flex items-center justify-center p-4">
        <div className="bg-white rounded-[40px] shadow-2xl p-12 text-center max-w-lg border border-gray-100 scale-in shadow-flex-primary/5">
          <div className="w-20 h-20 bg-flex-primary/10 rounded-full flex items-center justify-center mx-auto mb-8">
            <CheckCircle2 className="w-10 h-10 text-flex-primary" />
          </div>
          <h1 className="text-3xl font-extrabold text-gray-900 mb-4 tracking-tight">Application Submitted!</h1>
          <p className="text-gray-500 font-medium leading-relaxed mb-10">
            Thank you for applying to partner with FlexPass. Our team will review your details and get back to you within 2-3 business days.
          </p>
          <Button label="Back to Home" onClick={() => { window.location.href = "/"; }} />
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col items-center py-20 px-4">
      {/* Header Info */}
      <div className="text-center mb-16 max-w-2xl px-4 animate-fade-in-down">
        <h1 className="text-4xl sm:text-5xl font-extrabold text-[#111827] mb-5 tracking-tight">Apply to Partner with FlexPass</h1>
        <p className="text-lg text-[#6B7280] font-medium leading-relaxed">
          Apply to list your gym and reach members across multiple cities. Join our growing network of premium fitness centers.
        </p>
      </div>

      <form onSubmit={handleSubmit} className="w-full max-w-4xl space-y-6 animate-fade-in-up">
        {/* Section 1 */}
        <SectionCard number={1} title="Gym Information">
          <GymInfoForm data={formData} onChange={updateField} />
        </SectionCard>

        {/* Section 2 */}
        <SectionCard number={2} title="Owner / Representative Details">
          <OwnerDetailsForm data={formData} onChange={updateField} />
        </SectionCard>

        {/* Section 3 */}
        <SectionCard number={3} title="Gym Category Request">
          <CategoryRequest 
            value={formData.category} 
            onChange={(val) => updateField("category", val)} 
          />
        </SectionCard>

        {/* Section 4 */}
        <SectionCard number={4} title="Facilities & Standards">
          <FacilitiesForm 
            selected={formData.facilities} 
            onChange={(val) => updateField("facilities", val)} 
          />
        </SectionCard>

        {/* Section 5 */}
        <SectionCard number={5} title="Document Uploads">
          <div className="grid grid-cols-1 gap-8">
            <DocumentUpload 
              label="Business Registration Certificate" 
              required
              subtext="PDF or Image (Max 5MB)"
              file={formData.documents.businessRegistration}
              onFileSelect={(file) => updateDocuments("businessRegistration", file)}
            />
            <DocumentUpload 
              label="Owner Identity Proof (Aadhar/PAN/Passport)" 
              required
              subtext="Clear identity and address details"
              file={formData.documents.ownerIdentityProof}
              onFileSelect={(file) => updateDocuments("ownerIdentityProof", file)}
            />
            <DocumentUpload 
              label="Address Proof of Gym" 
              required
              subtext="Electricity Bill / Rental Agreement"
              file={formData.documents.addressProof}
              onFileSelect={(file) => updateDocuments("addressProof", file)}
            />
            <DocumentUpload 
              label="Gym License / Local Authority Approval" 
              required
              subtext="Must be valid and unexpired"
              file={formData.documents.gymLicense}
              onFileSelect={(file) => updateDocuments("gymLicense", file)}
            />
            <DocumentUpload 
              label="Gym Insurance Certificate (Optional)" 
              subtext="Mandatory for Premium category"
              file={formData.documents.gymInsurance}
              onFileSelect={(file) => updateDocuments("gymInsurance", file)}
            />
          </div>
        </SectionCard>

        {/* Section 6 */}
        <SectionCard number={6} title="Bank Details (For Payouts)">
          <BankDetailsForm data={formData.bankDetails} onChange={updateBankDetails} />
        </SectionCard>

        {/* Section 7 */}
        <SectionCard number={7} title="Confirmation & Submission">
          <div className="space-y-10">
            <label className="flex items-center gap-4 bg-gray-50/50 border border-gray-100 p-6 rounded-2xl cursor-pointer group transition-all hover:bg-white hover:border-flex-primary/20">
              <div className="relative flex items-center justify-center">
                <input
                  type="checkbox"
                  checked={formData.agreedToTerms}
                  onChange={(e) => updateField("agreedToTerms", e.target.checked)}
                  className="peer h-6 w-6 cursor-pointer appearance-none rounded-lg border border-gray-200 bg-white checked:bg-flex-primary checked:border-flex-primary transition-all duration-200"
                />
                <svg
                  className="absolute h-4 w-4 text-white opacity-0 peer-checked:opacity-100 transition-opacity pointer-events-none"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                  strokeWidth="3.5"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" d="M5 13l4 4L19 7" />
                </svg>
              </div>
              <span className="text-sm font-medium text-gray-600 leading-relaxed group-hover:text-gray-900 transition-colors">
                I confirm that the information provided is accurate and valid. I understand that FlexPass will verify these details before approving the partnership application.
              </span>
            </label>

            <div className="flex flex-col items-center gap-5 pt-4">
              <div className="w-full max-w-sm">
                <Button 
                  label="Submit Application"
                  type="submit"
                  loading={isSubmitting}
                  showArrow={!isSubmitting}
                />
              </div>
              <p className="text-xs text-gray-400 font-medium">
                Our team will review your application and get back to you within 2-3 business days.
              </p>
            </div>
          </div>
        </SectionCard>
      </form>
    </div>
  );
};

export default GymApplicationPage;
