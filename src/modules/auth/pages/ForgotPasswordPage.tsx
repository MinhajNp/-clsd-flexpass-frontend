import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { ArrowLeft, Shield } from "lucide-react";
import { useAuth } from "../hooks/useAuth";
import FormInput from "../../../components/auth/FormInput";

// Teal connections icon
const ConnectionsIcon = () => (
  <svg
    xmlns="http://www.w3.org/2000/svg"
    viewBox="0 0 24 24"
    fill="none"
    stroke="currentColor"
    strokeWidth="2"
    strokeLinecap="round"
    strokeLinejoin="round"
    className="w-6 h-6 text-flex-primary"
  >
    <path d="M12 2v4M12 18v4M4.93 4.93l2.83 2.83M16.24 16.24l2.83 2.83M2 12h4M18 12h4M4.93 19.07l2.83-2.83M16.24 7.76l2.83-2.83" />
    <circle cx="12" cy="12" r="4" />
  </svg>
);

const ForgotPasswordPage = () => {
  const navigate = useNavigate();
  const { handleForgotPassword, loading } = useAuth();
  const [email, setEmail] = useState("");
  const [error, setError] = useState("");

  const onSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    if (!email) {
      setError("Please enter your email address.");
      return;
    }

    try {
      setError("");
      await handleForgotPassword(email);
      // Navigate to OTP page in "reset" mode
      navigate("/otp", { state: { email, mode: "reset" } });
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "Failed to process request.";
      setError(message);
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans relative">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 z-10">
        
        {/* Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-flex-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <ConnectionsIcon />
          </div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-2 tracking-tight">
            Forgot Your Password?
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Enter your registered email and we'll send you a OTP
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col gap-6 pb-2">
          
          <FormInput
            type="email"
            id="email"
            label="Email Address"
            placeholder="your.email@example.com"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />

          <div className="bg-[#f8fafc] rounded-xl p-4 flex items-start gap-3">
            <Shield className="w-5 h-5 text-flex-primary flex-shrink-0 mt-0.5" />
            <p className="text-sm text-gray-500 leading-relaxed font-medium">
              We'll send a secure OTP to your email.
            </p>
          </div>

          {error && (
             <div className="text-center">
                <p className="text-sm text-red-500 bg-red-50 py-2 rounded-lg">{error}</p>
             </div>
          )}

          <button
            type="submit"
            disabled={!email || loading}
            className="w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6 font-semibold text-sm transition-all duration-300 ease-in-out bg-flex-primary text-white hover:bg-[#26504A] shadow-md shadow-flex-primary/20 hover:shadow-lg hover:-translate-y-0.5 disabled:opacity-70 disabled:cursor-not-allowed"
          >
            {loading ? "Sending..." : "Send OTP"}
          </button>
        </form>

        <div className="mt-8 pt-6 border-t border-gray-100 flex justify-center">
          <Link 
            to="/auth" 
            className="flex items-center gap-2 text-sm font-medium text-gray-500 hover:text-gray-900 transition-colors"
          >
            <ArrowLeft className="w-4 h-4" />
            Back to Login
          </Link>
        </div>
      </div>

      <div className="mt-8 text-center text-xs text-gray-400">
        Need help? <a href="#" className="font-semibold text-flex-primary hover:underline">Contact Support</a>
      </div>
    </div>
  );
};

export default ForgotPasswordPage;
