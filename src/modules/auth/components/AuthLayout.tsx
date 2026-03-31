import { Link, useNavigate, useLocation } from "react-router-dom";
import { useState, useEffect } from "react";
import Button from "../../../components/ui/Button";
import { 
  Search, Bell, User, Crown, LogOut 
} from "lucide-react";

// Custom Social Icons to avoid lucide-react version issues (Fallback if others fail)
const TwitterIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M22 4s-.7 2.1-2 3.4c1.6 10-9.4 17.3-18 11.6 2.2.1 4.4-.6 6-2C3 15.5.5 9.6 3 5c2.2 2.6 5.6 4.1 9 4-.9-4.2 4-6.6 7-3.8 1.1 0 3-1.2 3-1.2z"/></svg>
);
const InstagramIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><rect width="20" height="20" x="2" y="2" rx="5" ry="5"/><path d="M16 11.37A4 4 0 1 1 12.63 8 4 4 0 0 1 16 11.37z"/><line x1="17.5" x2="17.51" y1="6.5" y2="6.5"/></svg>
);
const FacebookIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M18 2h-3a5 5 0 0 0-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 0 1 1-1h3z"/></svg>
);
const LinkedinIcon = ({ className }: { className?: string }) => (
  <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className={className}><path d="M16 8a6 6 0 0 1 6 6v7h-4v-7a2 2 0 0 0-2-2 2 2 0 0 0-2 2v7h-4v-7a6 6 0 0 1 6-6z"/><rect width="4" height="12" x="2" y="9"/><circle cx="4" cy="4" r="2"/></svg>
);

// FlexPass Logo match
const FlexPassLogo = ({ className = "" }: { className?: string }) => (
  <Link to="/" className={`flex items-center gap-2.5 ${className}`}>
    <div className="w-8 h-8 sm:w-9 sm:h-9 bg-flex-primary rounded-xl flex items-center justify-center shrink-0">
      <svg
        xmlns="http://www.w3.org/2000/svg"
        viewBox="0 0 24 24"
        fill="none"
        stroke="white"
        strokeWidth="2.5"
        strokeLinecap="round"
        strokeLinejoin="round"
        className="w-4 h-4 sm:w-[18px] sm:h-[18px]"
      >
        <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
      </svg>
    </div>
    <span className="text-xl sm:text-[22px] font-bold text-gray-900 tracking-tight">FlexPass</span>
  </Link>
);

const Header = () => {
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  useEffect(() => {
    // Simple check for access token to toggle header states
    setIsLoggedIn(!!localStorage.getItem("accessToken"));
  }, []);

  const handleLogout = () => {
    localStorage.removeItem("accessToken");
    setIsLoggedIn(false);
    navigate("/auth");
  };

  return (
    <header className="sticky top-0 w-full bg-white/90 backdrop-blur-md z-50 border-b border-gray-100">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
        
        <FlexPassLogo />

        {isLoggedIn ? (
          // Logged-in Header State
          <div className="flex-1 flex items-center justify-end md:gap-8 gap-4 ml-6 lg:ml-12">
            
            {/* Search Bar - Centers on desktop */}
            <div className="hidden md:flex flex-1 max-w-md relative group">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4.5 h-4.5 text-gray-400 group-focus-within:text-flex-primary transition-colors" />
              <input 
                type="text" 
                placeholder="Search gyms, classes, trainers..."
                className="w-full bg-gray-50 border border-transparent focus:border-flex-primary/30 focus:bg-white rounded-2xl py-2.5 pl-11 pr-4 text-sm transition-all outline-none"
              />
            </div>

            <div className="flex items-center gap-4 lg:gap-6">
              {/* Pro Member Badge */}
              <div className="hidden sm:flex items-center gap-2 bg-yellow-50 border border-yellow-100 px-3.5 py-1.5 rounded-full">
                <Crown className="w-4 h-4 text-yellow-600 fill-yellow-600" />
                <span className="text-xs font-bold text-yellow-700 whitespace-nowrap">Pro Member</span>
              </div>

              {/* Notification Bell */}
              <button className="relative p-2 text-gray-500 hover:text-gray-900 transition-colors">
                <Bell className="w-5.5 h-5.5" />
                <span className="absolute top-2 right-2.5 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
              </button>

              {/* Profile & Logout Group */}
              <div className="flex items-center gap-3 pl-2 border-l border-gray-100">
                <div className="w-9 h-9 sm:w-10 sm:h-10 bg-flex-primary rounded-full flex items-center justify-center text-white cursor-pointer hover:opacity-90 transition-opacity">
                  <User className="w-5 h-5 sm:w-6 sm:h-6" />
                </div>
                <button 
                  onClick={handleLogout}
                  className="flex items-center gap-1.5 text-xs font-bold text-gray-500 hover:text-red-500 transition-colors px-2 py-1"
                >
                  <LogOut className="w-3.5 h-3.5" />
                  Logout
                </button>
              </div>
            </div>
          </div>
        ) : (
          // Public Header State
          <>
            <nav className="hidden md:flex items-center gap-8">
              <Link to="/" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Home</Link>
              <a href="#how-it-works" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">How It Works</a>
              <Link to="/partner/apply" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">For Gyms</Link>
              <Link to="/auth" className="text-sm font-medium text-gray-600 hover:text-gray-900 transition-colors">Login</Link>
            </nav>

            <div className="flex items-center gap-4">
              <div className="w-[130px]">
                <Button
                  label="Get Started"
                  showArrow={false}
                  onClick={() => navigate("/auth")}
                />
              </div>
            </div>
          </>
        )}
        
      </div>
    </header>
  );
};

const Footer = () => {
  return (
    <footer className="w-full bg-white border-t border-gray-100 py-12 lg:py-16 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col md:flex-row justify-between items-start gap-8">
        
        <div className="flex flex-col gap-4 max-w-sm">
          <FlexPassLogo />
          <p className="text-sm text-gray-500 leading-relaxed max-w-xs mt-2">
            The smartest way to access gyms across your city. One membership, endless possibilities.
          </p>
        </div>

        <div className="flex flex-col gap-6 w-full md:w-auto mt-6 md:mt-0">
          <div className="flex items-center justify-start md:justify-end gap-6 text-gray-400">
            <a href="#" className="hover:text-flex-primary transition-colors"><TwitterIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-flex-primary transition-colors"><InstagramIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-flex-primary transition-colors"><FacebookIcon className="w-5 h-5" /></a>
            <a href="#" className="hover:text-flex-primary transition-colors"><LinkedinIcon className="w-5 h-5" /></a>
          </div>
          
          <div className="flex flex-wrap items-center justify-start md:justify-end gap-6 mt-4 md:mt-16">
            <span className="text-xs text-gray-400">© 2026 FlexPass Inc. All rights reserved.</span>
            <div className="hidden md:block w-px h-3 bg-gray-200"></div>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">About</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Contact</a>
            <a href="#" className="text-xs text-gray-400 hover:text-gray-600 transition-colors">Terms & Privacy</a>
          </div>
        </div>
        
      </div>
    </footer>
  );
};

export const AuthLayout = ({ children }: { children: React.ReactNode }) => {
  const location = useLocation();

  // Admin pages handle their own layout (sidebar + admin header) — exclude public chrome
  const isAdminPage = location.pathname.startsWith('/admin');
  const isExactAuthPages = ["/auth", "/otp", "/forgot-password", "/reset-password"].includes(location.pathname);

  if (isAdminPage) {
    return <>{children}</>;
  }

  return (
    <div className="min-h-screen flex flex-col bg-white overflow-x-hidden font-sans">
      {!isExactAuthPages && <Header />}
      <main className="flex-1 flex flex-col w-full h-full">
        {children}
      </main>
      {!isExactAuthPages && <Footer />}
    </div>
  );
};
