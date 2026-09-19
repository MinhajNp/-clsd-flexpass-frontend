import React, { useEffect, useState } from 'react';
import { useSearchParams, useNavigate } from 'react-router-dom';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';
import { z } from 'zod';
import { ShieldCheck, Mail, Building, Lock, User } from 'lucide-react';
import Loader from '../../../components/ui/Loader';
import { verifyRegistrationToken, completeRegistration } from '../services/gymService';
import Input from '../../../components/ui/Input';
import Button from '../../../components/ui/Button';
import { toast } from 'react-hot-toast';

const registrationSchema = z.object({
  adminFullName: z.string().min(3, "Full name must be at least 3 characters"),
  adminContactNumber: z.string().regex(/^[0-9+]{10,15}$/, "Invalid contact number format"),
  password: z.string().min(8, "Password must be at least 8 characters"),
  confirmPassword: z.string().min(8, "Password must be at least 8 characters")
}).refine((data) => data.password === data.confirmPassword, {
  message: "Passwords don't match",
  path: ["confirmPassword"],
});

type RegistrationFormData = z.infer<typeof registrationSchema>;

const RegistrationCompletion: React.FC = () => {
  const [searchParams] = useSearchParams();
  const navigate = useNavigate();
  const token = searchParams.get('token');
  
  const [isValidating, setIsValidating] = useState(true);
  const [gymInfo, setGymInfo] = useState<{ gymName: string, email: string } | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);

  const { register, handleSubmit, formState: { errors } } = useForm<RegistrationFormData>({
    resolver: zodResolver(registrationSchema)
  });

  useEffect(() => {
    const validateToken = async () => {
      if (!token) {
        toast.error("Invalid or missing registration token");
        navigate('/auth');
        return;
      }

      try {
        const data = await verifyRegistrationToken(token);
        setGymInfo(data);
      } catch (error) {
        console.error("Token verification failed:", error);
        toast.error("Invalid or expired registration link");
        navigate('/auth'); // Or an "Expired Link" page
      } finally {
        setIsValidating(false);
      }
    };

    validateToken();
  }, [token, navigate]);

  const onSubmit = async (data: RegistrationFormData) => {
    if (!token) return;

    try {
      setIsSubmitting(true);
      await completeRegistration({
        token,
        password: data.password,
        adminFullName: data.adminFullName,
        adminContactNumber: data.adminContactNumber
      });
      toast.success("Registration completed successfully!");
      navigate('/auth'); // Or direct to /gym/dashboard if auto-login is implemented
    } catch (error: any) {
      toast.error(error.response?.data?.message || "Failed to complete registration");
    } finally {
      setIsSubmitting(false);
    }
  };

  if (isValidating) {
    return (
      <div className="flex flex-col items-center justify-center min-h-screen bg-gray-50">
        <Loader size="lg" variant="primary" className="mb-4" />
        <p className="text-gray-600 font-medium tracking-tight">Verifying your secure link...</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col lg:flex-row min-h-screen bg-white">
      {/* Left Panel: Brand & Visuals */}
      <div className="hidden lg:flex lg:w-1/2 bg-[#2D5A53] p-16 flex-col justify-between relative overflow-hidden">
        {/* Abstract background subtle glow */}
        <div className="absolute top-[-10%] right-[-10%] w-96 h-96 bg-[#3B7A71] rounded-full blur-[120px] opacity-20" />
        
        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-16">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-white/10 backdrop-blur-md shadow-inner">
               <svg
                xmlns="http://www.w3.org/2000/svg"
                viewBox="0 0 24 24"
                fill="none"
                stroke="white"
                strokeWidth="2.5"
                strokeLinecap="round"
                strokeLinejoin="round"
                className="w-5 h-5"
              >
                <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
              </svg>
            </div>
            <span className="text-2xl font-bold text-white tracking-tight">FlexPass</span>
          </div>

          <div className="max-w-md">
            <h1 className="text-5xl font-extrabold text-white leading-[1.1] mb-6">
              Set up your <br />
              <span className="text-[#4ECDC4]">gym account</span>
            </h1>
            <p className="text-[#B2D1CD] text-lg leading-relaxed font-medium">
              Complete your setup to start receiving FlexPass members. Manage bookings, track visits, and grow your revenue.
            </p>
          </div>
        </div>

        {/* Floating Verified Graphic */}
        <div className="relative z-10 mt-auto flex items-center justify-center pb-8">
           <div className="bg-[#1C3E38] rounded-3xl p-8 w-full max-w-sm shadow-2xl border border-white/5 relative group">
              <div className="absolute -top-6 -right-4 bg-white rounded-full py-2 px-5 shadow-2xl flex items-center gap-2 transform transition-transform group-hover:scale-105 duration-300">
                <ShieldCheck className="h-5 w-5 text-[#2D5A53]" />
                <span className="text-[#2D5A53] font-bold text-sm tracking-tight">Verified Partner</span>
              </div>
              
              <div className="space-y-6 opacity-60">
                <div className="flex items-end gap-3">
                  <div className="w-12 h-16 bg-[#3B7A71] rounded-lg animate-pulse" />
                  <div className="w-12 h-24 bg-[#4ECDC4] rounded-lg animate-pulse delay-75" />
                  <div className="w-12 h-12 bg-[#3B7A71] rounded-lg animate-pulse delay-150" />
                  <div className="w-12 h-32 bg-[#2D5A53] border border-white/10 rounded-lg animate-pulse delay-300" />
                  <div className="w-12 h-40 bg-blue-500 rounded-lg shadow-[0_0_20px_rgba(59,130,246,0.3)]" />
                </div>
                <div className="flex gap-4">
                  <div className="h-10 w-full bg-[#254F49] rounded-xl" />
                  <div className="h-10 w-full bg-[#254F49] rounded-xl" />
                </div>
              </div>
           </div>
        </div>
      </div>

      {/* Right Panel: Form */}
      <div className="flex-1 flex flex-col justify-center p-8 sm:p-20 lg:p-24 bg-white overflow-y-auto">
        <div className="max-w-md w-full mx-auto">
          
          {/* Gym Verification Card */}
          <div className="bg-[#F0F7F6] border border-[#DCEBE9] rounded-2xl p-6 mb-10 group transition-all duration-300 hover:shadow-lg hover:shadow-[#2D5A53]/5">
            <div className="flex items-center gap-3 mb-5">
               <div className="h-10 w-10 rounded-xl bg-white flex items-center justify-center text-[#2D5A53] shadow-sm">
                 <Building className="h-5 w-5" />
               </div>
               <span className="text-[#2D5A53] font-bold text-sm uppercase tracking-wider">Gym Details (Verified)</span>
            </div>
            
            <div className="space-y-4">
              <div>
                <p className="text-[11px] font-bold text-[#8FA3A0] uppercase tracking-widest mb-1">Gym Name</p>
                <p className="text-lg font-bold text-gray-900 leading-tight">{gymInfo?.gymName || "PowerHouse Fitness"}</p>
              </div>
              <div>
                <p className="text-[11px] font-bold text-[#8FA3A0] uppercase tracking-widest mb-1">Official Email</p>
                <div className="flex items-center gap-2 text-gray-700 font-semibold">
                  <Mail className="h-4 w-4 text-[#8FA3A0]" />
                  <span>{gymInfo?.email || "admin@powerhouse.com"}</span>
                </div>
              </div>
            </div>
          </div>

          <form onSubmit={handleSubmit(onSubmit)} className="space-y-8">
            {/* Admin Details Section */}
            <div className="space-y-6">
              <div className="flex items-center justify-between mb-2">
                <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2">
                  <User className="h-5 w-5 text-[#2D5A53]" />
                  Admin Details
                </h3>
                <span className="bg-gray-100 text-gray-500 text-[11px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">Step 1 of 1</span>
              </div>
              
              <Input
                label="Admin Full Name"
                placeholder="e.g. John Doe"
                {...register('adminFullName')}
                error={errors.adminFullName?.message}
                required
              />

              <Input
                label="Contact Number"
                placeholder="+1 (555) 000-0000"
                {...register('adminContactNumber')}
                error={errors.adminContactNumber?.message}
                required
              />
            </div>

            {/* Security Section */}
            <div className="space-y-6">
              <h3 className="text-lg font-bold text-gray-900 tracking-tight flex items-center gap-2 mb-2">
                <Lock className="h-5 w-5 text-[#2D5A53]" />
                Security
              </h3>
              
              <Input
                label="Create Password"
                type="password"
                placeholder="Min. 8 characters"
                {...register('password')}
                error={errors.password?.message}
                required
              />

              <Input
                label="Confirm Password"
                type="password"
                placeholder="Re-enter password"
                {...register('confirmPassword')}
                error={errors.confirmPassword?.message}
                required
              />
            </div>

            <div className="pt-4">
              <Button
                type="submit"
                label="Activate Gym Account"
                loading={isSubmitting}
                fullWidth
                showArrow
              />
              <p className="mt-6 text-center text-gray-400 text-xs flex items-center justify-center gap-2 font-medium">
                <Lock className="h-3 w-3" />
                This link is private and valid for one-time use.
              </p>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default RegistrationCompletion;
