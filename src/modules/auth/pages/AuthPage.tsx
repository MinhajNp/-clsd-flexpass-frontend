import { useState, useEffect } from "react";
import toast from "react-hot-toast";
import { CheckCircle, Smartphone, User } from "lucide-react";
import { clsx } from "clsx";
import FormInput from "../components/FormInput";
import Button from "../../../components/ui/Button";
import { useAuth } from "../hooks/useAuth";
import { Link, useNavigate } from "react-router-dom";
import GoogleLoginButton from "../components/GoogleLoginButton";
import { useRedirect } from "../hooks/useRedirect";
import { useSearchParams } from "react-router-dom";

// ─── Types ─────────────────────────────────────────────────────────────────────
type Mode = "login" | "signup";

interface FormState {
  name: string;
  email: string;
  password: string;
  confirmPassword: string;
  rememberMe: boolean;
}

interface FormErrors {
  name?: string;
  email?: string;
  password?: string;
  confirmPassword?: string;
  general?: string;
}

// ─── Hero features ─────────────────────────────────────────────────────────────
const features = [
  { icon: CheckCircle, text: "Access to 800+ premium gyms" },
  { icon: Smartphone,  text: "Smart booking via mobile app" },
  { icon: User,        text: "Personalized fitness tracking" },
];

// ─── Validator ─────────────────────────────────────────────────────────────────
const validate = (form: FormState, mode: Mode): FormErrors => {
  const errors: FormErrors = {};
  const emailRx = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;

  if (mode === "signup" && !form.name.trim()) {
    errors.name = "Full name is required";
  }
  if (!form.email.trim()) {
    errors.email = "Email is required";
  } else if (!emailRx.test(form.email)) {
    errors.email = "Enter a valid email address";
  }
  if (!form.password) {
    errors.password = "Password is required";
  } else if (form.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  if (mode === "signup") {
    if (!form.confirmPassword) {
      errors.confirmPassword = "Please confirm your password";
    } else if (form.password !== form.confirmPassword) {
      errors.confirmPassword = "Passwords do not match";
    }
  }
  return errors;
};

// ─── Component ─────────────────────────────────────────────────────────────────
const AuthPage = () => {
  const { handleLogin, handleRegister, handleGoogleLogin, loading } = useAuth();
  const { performRedirect } = useRedirect();
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();
  const urlError = searchParams.get('error');

  const [mode, setMode] = useState<Mode>("login");
  const [form, setForm] = useState<FormState>({
    name: "",
    email: "",
    password: "",
    confirmPassword: "",
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isRedirecting, setIsRedirecting] = useState(false);

  useEffect(() => {
    if (urlError === 'blocked') {
      toast.error("Your account has been blocked by an administrator.", { duration: 5000 });
      // Remove the param to avoid repeat toasts
      window.history.replaceState({}, document.title, window.location.pathname);
    }
  }, [urlError]);

  const update = (key: keyof FormState, value: string | boolean) => {
    setForm((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => {
      if (Object.keys(prev).length === 0) return prev;
      const next = { ...prev };
      delete next[key as keyof FormErrors];
      delete next.general;
      if (next.email === " ") delete next.email;
      if (next.password === " ") delete next.password;
      return next;
    });
  };

  const switchMode = (next: Mode) => {
    setMode(next);
    setErrors({});
    setForm({ name: "", email: "", password: "", confirmPassword: "", rememberMe: false });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(form, mode);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});

    try {
      if (mode === "login") {
        const res = await handleLogin({ email: form.email, password: form.password });
        if (res.requiresOtp) {
          navigate("/otp", { state: { email: form.email } });
          return;
        }
        if (res.accessToken && res.user) {
          localStorage.setItem("accessToken", res.accessToken);
          localStorage.setItem("userRole", res.user.role);
          
          setIsRedirecting(true);
          setTimeout(() => {
            performRedirect(res.accessToken, res.user);
          }, 1000);
        }
      } else {
        await handleRegister({ name: form.name, email: form.email, password: form.password });
        navigate("/otp", { state: { email: form.email } });
      }
    } catch (err: any) {
      if (mode === "login") {
        // useAuth hook wraps axios error into a standard Error object with the backend message
        const errorMsg = err.message || "Login Failed";
        toast.error(errorMsg);
        setErrors({ 
          general: errorMsg,
          email: " ",
          password: " "
        });
      } else {
        const message = err.response?.data?.message || err.message || "Something went wrong";
        setErrors({ general: message });
      }
    }
  };

  const handleGoogleSuccess = async (idToken: string) => {
    try {
      const res = await handleGoogleLogin(idToken);
      if (res.accessToken && res.user) {
        localStorage.setItem("accessToken", res.accessToken);
        localStorage.setItem("userRole", res.user.role);
        
        setIsRedirecting(true);
        setTimeout(() => {
          performRedirect(res.accessToken, res.user);
        }, 1000);
      }
    } catch (err: any) {
      const errorMsg = err.message || "Google Authentication Failed";
      toast.error(errorMsg);
      setErrors({ general: errorMsg });
    }
  };

  const isLogin = mode === "login";
  const heading    = isLogin ? "Welcome back"                                   : "Create account";
  const subheading = isLogin ? "Enter your details to access your account"      : "Start your fitness journey today";
  const btnLabel   = isLogin ? "Log In"                                         : "Create Account";

  return (
    <div className="min-h-screen flex relative">

      {/* ── LEFT HERO ─────────────────────────────────────────────────────────── */}
      <aside
        className="hidden lg:flex lg:w-5/12 xl:w-[42%] flex-col justify-between p-10 xl:p-14"
        style={{ background: "linear-gradient(160deg, #2D5A53 0%, #1a3530 45%, #000000 100%)" }}
      >
        <Link to='/'>
        <div className="flex items-center gap-2.5">
          <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
            <svg viewBox="0 0 24 24" className="h-5 w-5 fill-white" aria-hidden="true">
              <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
            </svg>
          </div>
          <span className="text-lg font-bold tracking-tight text-white">FlexPass</span>
        </div>
         </Link>

        <div className="space-y-6">
          <h1 className="text-4xl xl:text-5xl font-extrabold leading-tight text-white">
            Train anywhere<br />with<br />
            <span className="text-[#4ECDC4]">one membership.</span>
          </h1>
          <p className="text-sm text-white/60 leading-relaxed max-w-xs">
            Join thousands of members accessing top gyms, studios, and wellness
            centers across the country. No contracts, just freedom.
          </p>
          <ul className="space-y-4 mt-2">
            {features.map(({ icon: Icon, text }) => (
              <li key={text} className="flex items-center gap-4">
                <span className="flex h-10 w-10 flex-shrink-0 items-center justify-center rounded-xl bg-white/10 backdrop-blur-sm">
                  <Icon className="h-5 w-5 text-white/80" />
                </span>
                <span className="text-sm font-medium text-white/80">{text}</span>
              </li>
            ))}
          </ul>
        </div>

        <p className="text-xs text-white/30">© 2024 FlexPass Inc. All rights reserved.</p>
      </aside>

      {/* ── RIGHT FORM ────────────────────────────────────────────────────────── */}
      <main className="flex flex-1 items-center justify-center bg-gray-50 px-4 py-12 sm:px-8">
        <div className="w-full max-w-md">
          <div className="rounded-3xl bg-white shadow-2xl shadow-black/8 px-8 py-10 sm:px-10">

            <div className="mb-7 text-center">
              <h2 className="text-2xl font-extrabold text-gray-900 tracking-tight">{heading}</h2>
              <p className="mt-1.5 text-sm text-gray-500">{subheading}</p>
            </div>

            <div className="mb-7 flex rounded-xl bg-gray-100 p-1">
              {(["login", "signup"] as Mode[]).map((m) => (
                <button
                  key={m}
                  id={`auth-tab-${m}`}
                  type="button"
                  onClick={() => switchMode(m)}
                  className={clsx(
                    "flex-1 rounded-lg py-2 text-sm font-semibold capitalize transition-all duration-200",
                    mode === m
                      ? "bg-white text-gray-900 shadow-sm"
                      : "text-gray-500 hover:text-gray-700"
                  )}
                >
                  {m === "login" ? "Log In" : "Sign Up"}
                </button>
              ))}
            </div>



            {errors.general && errors.general.toLowerCase().includes("blocked") && (
              <div className="mb-4 rounded-xl bg-red-50 border border-red-100 p-4 animate-in fade-in slide-in-from-top-2 duration-300">
                <div className="flex gap-3">
                  <div className="flex-shrink-0">
                    <svg className="h-5 w-5 text-red-500" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clipRule="evenodd" />
                    </svg>
                  </div>
                  <div>
                    <h3 className="text-sm font-bold text-red-800">User blocked by admin</h3>
                    <p className="mt-1 text-sm text-red-700 leading-relaxed">
                      Your account has been blocked by an administrator. Please contact our support team for more information.
                    </p>
                  </div>
                </div>
              </div>
            )}

            <form id="auth-form" onSubmit={handleSubmit} noValidate className="space-y-5">
              {!isLogin && (
                <FormInput
                  id="auth-name"
                  label="Full Name"
                  placeholder="John Doe"
                  value={form.name}
                  onChange={(e) => update("name", e.target.value)}
                  error={errors.name}
                  autoComplete="name"
                />
              )}

              <FormInput
                id="auth-email"
                label="Email Address"
                type="email"
                placeholder="name@example.com"
                value={form.email}
                onChange={(e) => update("email", e.target.value)}
                error={errors.email}
                autoComplete="email"
              />

              <FormInput
                id="auth-password"
                label="Password"
                type="password"
                placeholder="••••••••"
                value={form.password}
                onChange={(e) => update("password", e.target.value)}
                error={errors.password}
                autoComplete={isLogin ? "current-password" : "new-password"}
              />

              {!isLogin && (
                <FormInput
                  id="auth-confirm-password"
                  label="Confirm Password"
                  type="password"
                  placeholder="••••••••"
                  value={form.confirmPassword}
                  onChange={(e) => update("confirmPassword", e.target.value)}
                  error={errors.confirmPassword}
                  autoComplete="new-password"
                />
              )}

              <div className="flex items-center justify-between">
                <label className="flex cursor-pointer items-center gap-2 text-sm text-gray-600 select-none">
                  <input
                    id="auth-remember-me"
                    type="checkbox"
                    checked={form.rememberMe}
                    onChange={(e) => update("rememberMe", e.target.checked)}
                    className="h-4 w-4 rounded border-gray-300 accent-flex-primary"
                  />
                  Remember me
                </label>
                {isLogin && (
                  <button
                    type="button"
                    id="auth-forgot-password"
                    onClick={() => navigate("/forgot-password")}
                    className="text-sm font-medium text-flex-primary hover:underline"
                  >
                    Forgot password?
                  </button>
                )}
              </div>


              <Button
                id="auth-submit-btn"
                type="submit"
                label={btnLabel}
                loading={loading || isRedirecting}
                showArrow
                fullWidth
              />
            </form>

            <div className="my-6 flex items-center gap-3">
              <div className="h-px flex-1 bg-gray-200" />
              <span className="text-xs font-medium uppercase tracking-widest text-gray-400">or</span>
              <div className="h-px flex-1 bg-gray-200" />
            </div>

            <GoogleLoginButton
              onSuccess={handleGoogleSuccess}
              loading={loading || isRedirecting}
            />

            <p className="mt-6 text-center text-xs text-gray-400 leading-relaxed">
              By continuing you agree to our{" "}
              <a href="#" className="font-medium text-gray-600 underline underline-offset-2 hover:text-flex-primary">
                Terms of Service
              </a>{" "}
              and{" "}
              <a href="#" className="font-medium text-gray-600 underline underline-offset-2 hover:text-flex-primary">
                Privacy Policy
              </a>
              .
            </p>
          </div>
        </div>
      </main>
    </div>
  );
};

export default AuthPage;
