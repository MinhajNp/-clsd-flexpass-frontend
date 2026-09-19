import React from 'react';
import Loader from './Loader';

interface LoadingScreenProps {
  message?: string;
  subtext?: string;
}

/**
 * Premium full-viewport loading overlay with backdrop blur effects.
 * Designed for major transitions (e.g., Auth redirections, initial boot).
 */
const LoadingScreen: React.FC<LoadingScreenProps> = ({ 
  message = "Preparing your Workspace",
  subtext = "Getting everything ready for your session..." 
}) => {
  return (
    <div className="fixed inset-0 z-[100] flex flex-col items-center justify-center bg-white/60 backdrop-blur-md transition-all duration-700 animate-in fade-in">
      <div className="flex flex-col items-center gap-8 p-12 bg-white rounded-3xl shadow-2xl border border-gray-100 transform scale-110">
        <div className="relative">
          {/* Branded background glow effect */}
          <div className="absolute -inset-4 bg-[#4ECDC4]/10 blur-2xl rounded-full animate-pulse" />
          
          <Loader 
            size="xl" 
            variant="primary" 
          />
        </div>
        
        {(message || subtext) && (
          <div className="text-center animate-pulse duration-[2000ms]">
            {message && (
              <h3 className="text-xl font-bold text-gray-900 mb-2 tracking-tight">
                {message}
              </h3>
            )}
            {subtext && (
              <p className="text-[13px] text-gray-500 font-medium max-w-[220px] leading-relaxed opacity-70">
                {subtext}
              </p>
            )}
          </div>
        )}
      </div>
      
      {/* Footer Branding */}
      <div className="absolute bottom-10 left-0 right-0 flex justify-center opacity-30 select-none pointer-events-none">
        <div className="flex items-center gap-2">
          <svg viewBox="0 0 24 24" className="h-4 w-4 fill-gray-400">
            <path d="M13 2L3 14h9l-1 8 10-12h-9l1-8z" />
          </svg>
          <span className="text-[11px] font-bold tracking-[0.2em] uppercase text-gray-400">
            FlexPass Secure Access
          </span>
        </div>
      </div>
    </div>
  );
};

export default LoadingScreen;
