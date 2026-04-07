import React, { useEffect } from 'react';
import { X } from 'lucide-react';

interface BaseModalProps {
  isOpen: boolean;
  onClose: () => void;
  title: string;
  children: React.ReactNode;
  footer?: React.ReactNode;
  maxWidth?: string;
}

const BaseModal: React.FC<BaseModalProps> = ({
  isOpen,
  onClose,
  title,
  children,
  footer,
  maxWidth = 'max-w-md',
}) => {
  // Prevent body scroll when modal is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = 'unset';
    }
    return () => {
      document.body.style.overflow = 'unset';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6">
      {/* Backdrop */}
      <div 
        className="absolute inset-0 bg-black/40 backdrop-blur-sm transition-opacity animate-in fade-in duration-200" 
        onClick={onClose}
      />
      
      {/* Modal Content */}
      <div 
        className={`relative w-full ${maxWidth} transform rounded-2xl bg-white shadow-2xl transition-all animate-in zoom-in-95 fade-in duration-200 ease-out flex flex-col`}
      >
        {/* Header */}
        <div className="flex items-center justify-between border-b border-gray-100 px-6 py-4">
          <h3 className="text-[16px] font-bold text-gray-900">{title}</h3>
          <button
            onClick={onClose}
            className="rounded-lg p-1 text-gray-400 transition-colors hover:bg-gray-100 hover:text-gray-600 outline-none"
          >
            <X size={18} />
          </button>
        </div>

        {/* Body */}
        <div className="px-6 py-6 overflow-y-auto max-h-[70vh]">
          {children}
        </div>

        {/* Footer */}
        {footer && (
          <div className="border-t border-gray-100 bg-gray-50/50 px-6 py-4 rounded-b-2xl">
            {footer}
          </div>
        )}
      </div>
    </div>
  );
};

export default BaseModal;
