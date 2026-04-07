import React from 'react';
import { clsx } from 'clsx';

type LoaderSize    = 'xs' | 'sm' | 'md' | 'lg' | 'xl';
type LoaderVariant = 'primary' | 'secondary' | 'accent' | 'white' | 'gray';

interface LoaderProps {
  size?: LoaderSize;
  variant?: LoaderVariant;
  className?: string;
  withText?: boolean;
}

const SIZE_MAP: Record<LoaderSize, string> = {
  xs: 'h-3 w-3 border-2',
  sm: 'h-5 w-5 border-2',
  md: 'h-8 w-8 border-[2.5px]',
  lg: 'h-12 w-12 border-[3px]',
  xl: 'h-16 w-16 border-[4px]',
};

const VARIANT_MAP: Record<LoaderVariant, string> = {
  primary:   'border-[#2D5A53]/20 border-t-[#2D5A53]',
  secondary: 'border-white/20 border-t-white',
  accent:    'border-[#4ECDC4]/20 border-t-[#4ECDC4]',
  white:     'border-white/30 border-t-white',
  gray:      'border-gray-200 border-t-gray-500',
};

/**
 * Premium, branded loading spinner for FlexPass.
 * Features a dual-rotating layer effect for a sophisticated look.
 */
const Loader: React.FC<LoaderProps> = ({ 
  size = 'md', 
  variant = 'primary', 
  className,
  withText = false
}) => {
  return (
    <div className={clsx('flex flex-col items-center gap-3', className)}>
      <div className="relative">
        {/* Inner static base ring */}
        <div 
          className={clsx(
            'rounded-full opacity-20',
            SIZE_MAP[size].split(' ')[0], 
            SIZE_MAP[size].split(' ')[1],
            'border-[rgba(0,0,0,0.1)] border-solid border-[2px]'
          )} 
        />
        
        {/* Main rotating ring */}
        <div 
          className={clsx(
            'absolute inset-0 animate-spin rounded-full transition-all duration-300',
            SIZE_MAP[size],
            VARIANT_MAP[variant]
          )} 
        />
        
        {/* Pulse inner point (for larger sizes) */}
        {(size === 'lg' || size === 'xl') && (
          <div className="absolute inset-0 flex items-center justify-center">
            <div 
              className={clsx(
                'rounded-full animate-pulse',
                size === 'lg' ? 'h-1.5 w-1.5' : 'h-2 w-2',
                variant === 'primary' ? 'bg-[#2D5A53]' : 'bg-current'
              )} 
            />
          </div>
        )}
      </div>

      {withText && (
        <span className={clsx(
          'text-[13px] font-medium tracking-tight animate-pulse',
          variant === 'primary' ? 'text-gray-600' : 'text-current opacity-70'
        )}>
          Processing...
        </span>
      )}
    </div>
  );
};

export default Loader;
