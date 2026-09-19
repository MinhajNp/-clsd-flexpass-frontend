import { useLocation, useNavigate } from "react-router-dom";
import { useState } from "react";
import { useAuth } from "../hooks/useAuth";
import { Eye, EyeOff, Lock } from "lucide-react";
import FormInput from "../../../components/auth/FormInput";

// FlexPass Logo match
const FlexPassLogo = () => (
  <div className="flex items-center gap-3">
    <div className="w-10 h-10 bg-flex-primary rounded-xl flex items-center justify-center">
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
        <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
        <circle cx="12" cy="12" r="4" />
      </svg>
    </div>
    <span className="text-[22px] font-bold text-gray-900 tracking-tight">FlexPass</span>
  </div>
);

const ResetPasswordPage = () => {
  const { state } = useLocation();
  const navigate = useNavigate();
  const { handleResetPassword, loading } = useAuth();

  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [error, setError] = useState("");

  const email = state?.email;
  const otp = state?.otp;

  if (!email || !otp) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-[#f8fafc] flex-col gap-4">
        <p className="text-gray-500">Invalid reset link. Missing credentials.</p>
        <button 
          onClick={() => navigate("/forgot-password")}
          className="text-flex-primary font-medium hover:underline"
        >
          Request new link
        </button>
      </div>
    );
  }

  const submit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (password !== confirmPassword) {
      setError("Passwords do not match.");
      return;
    }
    if (password.length < 8) {
      setError("Password must be at least 8 characters.");
      return;
    }

    try {
      setError("");
      await handleResetPassword({
        email,
        otp,
        newPassword: password,
      });
      navigate("/auth");
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Something went wrong";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans relative">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="mb-8">
            <FlexPassLogo />
          </div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-2 tracking-tight">
            Reset Your Password
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Create a new password for your FlexPass account
          </p>
        </div>

        <form onSubmit={submit} className="flex flex-col pb-2">
          
          <div className="relative mb-5">
            <FormInput
              type={showPassword ? "text" : "password"}
              id="new-password"
              label="New Password"
              placeholder="Enter your new password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
            />
            <button 
              type="button"
              className="absolute right-4 top-9 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowPassword(!showPassword)}
            >
              {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="relative mb-6">
            <FormInput
              type={showConfirm ? "text" : "password"}
              id="confirm-password"
              label="Confirm New Password"
              placeholder="Confirm your new password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
            />
            <button 
              type="button"
              className="absolute right-4 top-9 text-gray-400 hover:text-gray-600 transition-colors"
              onClick={() => setShowConfirm(!showConfirm)}
            >
              {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
            </button>
          </div>

          <div className="flex items-center gap-2 mb-8 ml-1">
            <div className="w-1.5 h-1.5 rounded-full bg-flex-primary"></div>
            <p className="text-xs text-gray-500 font-medium">Password must be at least 8 characters</p>
          </div>

          {error && (
             <div className="mb-4 text-center">
                <p className="text-sm text-red-500 bg-red-50 py-2 rounded-lg">{error}</p>
             </div>
          )}

          <button
            type="submit"
            disabled={!password || !confirmPassword || loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-semibold text-sm transition-all duration-300 ease-in-out bg-flex-primary text-white hover:bg-[#26504A] shadow-md shadow-flex-primary/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Resetting..." : "Reset Password"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center items-center gap-2">
          <Lock className="w-[18px] h-[18px] text-flex-primary" />
          <p className="text-xs text-gray-500 font-medium tracking-wide">
            This link is valid for a limited time for your security.
          </p>
        </div>

      </div>
    </div>
  );
};

export default ResetPasswordPage;
