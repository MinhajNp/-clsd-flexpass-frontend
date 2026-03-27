import { useLocation, useNavigate, Link } from "react-router-dom";
import { useState, useEffect } from "react";
import { useAuth } from "../hooks/useAuth";
import OtpInput from "../components/OtpInput";
import { ArrowLeft } from "lucide-react";
import { clsx } from "clsx";

type LocationState = {
  email: string;
  mode?: "verify" | "reset";
};

const maskEmail = (email: string) => {
  if (!email) return "";
  const [localPart, domain] = email.split("@");
  if (localPart.length <= 2) return `${localPart}***@${domain}`;
  return `${localPart.substring(0, 2)}***@${domain}`;
};

// Teal connections icon matching the mockup
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

const OtpPage = () => {
  const location = useLocation();
  const navigate = useNavigate();

  const state = location.state as LocationState;
  const email = state?.email;
  const mode = state?.mode || "verify";

  const { handleVerifyOtp, handleResendOtp, loading } = useAuth();

  const [otp, setOtp] = useState("");
  const [error, setError] = useState("");
  const [timeLeft, setTimeLeft] = useState(() => {
    if (!email) return 30;
    const stored = localStorage.getItem(`otp_timer_${email}`);
    if (stored) {
      const expiration = parseInt(stored, 10);
      const remaining = Math.ceil((expiration - Date.now()) / 1000);
      if (remaining > 0) return remaining;
    }
    localStorage.setItem(`otp_timer_${email}`, (Date.now() + 30000).toString());
    return 30;
  });

  useEffect(() => {
    if (timeLeft <= 0) return;
    const timerId = setInterval(() => {
      setTimeLeft((prev) => prev - 1);
    }, 1000);
    return () => clearInterval(timerId);
  }, [timeLeft]);

  const formatTime = (seconds: number) => {
    return `${seconds}s`;
  };

  if (!email) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gray-50 flex-col gap-4">
        <p className="text-gray-500">Invalid access. Please register or login again.</p>
        <Link to="/auth" className="text-flex-primary hover:underline font-medium">
          Go to Authentication Page
        </Link>
      </div>
    );
  }

  const isOtpComplete = otp.length === 6;

  const onSubmit = async (e?: React.FormEvent) => {
    if (e) e.preventDefault();
    if (!isOtpComplete) return;

    if (mode === "reset") {
      navigate("/reset-password", { state: { email, otp } });
      return;
    }

    try {
      setError("");
      await handleVerifyOtp({ email, otp });
      navigate("/"); // Successful OTP verification logically goes to landing page now
    } catch (err: unknown) {
      const message = err instanceof Error ? err.message : "OTP verification failed";
      setError(message);
    }
  };

  const handleResend = async () => {
    if (timeLeft > 0) return;
    
    if (email) {
      try {
        await handleResendOtp(email);
        localStorage.setItem(`otp_timer_${email}`, (Date.now() + 30000).toString());
        setTimeLeft(30); // Reset timer to 30s
      } catch (err) {
        // UI feedback is handled by toast in useAuth hook
      }
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-[#f8fafc] px-4 font-sans relative">
      <div className="w-full max-w-[440px] bg-white rounded-3xl shadow-[0_8px_30px_rgb(0,0,0,0.04)] sm:p-10 p-6 z-10">
        
        {/* Icon Header */}
        <div className="flex flex-col items-center mb-8">
          <div className="w-14 h-14 bg-flex-primary/10 rounded-2xl flex items-center justify-center mb-6">
            <ConnectionsIcon />
          </div>
          <h1 className="text-2xl sm:text-[26px] font-bold text-gray-900 mb-2 tracking-tight">
            Verify Your Account
          </h1>
          <p className="text-sm text-gray-500 text-center">
            Enter the 6-digit code sent to <span className="text-gray-900 font-medium tracking-wide">{maskEmail(email)}</span>
          </p>
        </div>

        <form onSubmit={onSubmit} className="flex flex-col pb-4">
          <OtpInput 
            length={6} 
            value={otp} 
            onChange={setOtp} 
          />

          <div className="text-center mb-8 flex flex-col items-center gap-2">
             <button 
                type="button" 
                onClick={handleResend}
                disabled={timeLeft > 0 || loading}
                className={clsx(
                  "text-sm font-semibold transition-colors",
                  timeLeft > 0 
                    ? "text-gray-400 cursor-not-allowed" 
                    : "text-[#4e6ce4] hover:text-[#3b54b4]"
                )}
              >
                {timeLeft > 0 ? `Resend in ${formatTime(timeLeft)}` : "Resend OTP"}
             </button>
          </div>

          {error && (
             <div className="mb-4 text-center">
                <p className="text-sm text-red-500 bg-red-50 py-2 rounded-lg">{error}</p>
             </div>
          )}

          {/* Dynamic Button */}
          <button
            type="submit"
            disabled={!isOtpComplete || loading}
            className={clsx(
              "w-full flex items-center justify-center gap-2 rounded-xl py-3.5 px-6",
              "font-semibold text-sm transition-all duration-300 ease-in-out",
              isOtpComplete
                ? "bg-flex-primary text-white hover:bg-[#26504A] shadow-md shadow-flex-primary/20 hover:shadow-lg hover:-translate-y-0.5"
                : "bg-[#e2e8f0] text-[#94a3b8] cursor-not-allowed"
            )}
          >
            {loading ? "Verifying..." : "Verify OTP"}
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

export default OtpPage;
