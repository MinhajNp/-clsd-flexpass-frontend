import React from 'react';
import BaseModal from './BaseModal';
import Button from './Button';
import { AlertCircle, Trash2, ShieldAlert } from 'lucide-react';

export type ConfirmationType = 'danger' | 'warning' | 'info';

interface ConfirmationModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: ConfirmationType;
  isLoading?: boolean;
}

const ConfirmationModal: React.FC<ConfirmationModalProps> = ({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirm',
  cancelText = 'Cancel',
  type = 'info',
  isLoading = false,
}) => {
  const getIcon = () => {
    switch (type) {
      case 'danger':
        return <Trash2 className="h-6 w-6 text-red-600" />;
      case 'warning':
        return <ShieldAlert className="h-6 w-6 text-amber-600" />;
      case 'info':
        return <AlertCircle className="h-6 w-6 text-blue-600" />;
      default:
        return <AlertCircle className="h-6 w-6 text-blue-600" />;
    }
  };

  const getIconBg = () => {
    switch (type) {
      case 'danger':
        return 'bg-red-50';
      case 'warning':
        return 'bg-amber-50';
      case 'info':
        return 'bg-blue-50';
      default:
        return 'bg-blue-50';
    }
  };

  const getConfirmVariant = () => {
    switch (type) {
      case 'danger':
        return 'danger';
      case 'warning':
        return 'primary';
      case 'info':
        return 'primary';
      default:
        return 'primary';
    }
  };

  const footer = (
    <div className="flex items-center justify-end gap-3 w-full">
      <Button
        variant="secondary"
        onClick={onClose}
        disabled={isLoading}
        className="px-6 py-2.5 text-[14px] font-semibold text-gray-600 hover:bg-gray-100 transition-all border border-gray-200"
      >
        {cancelText}
      </Button>
      <Button
        variant={getConfirmVariant() as any}
        onClick={onConfirm}
        loading={isLoading}
        className={`px-6 py-2.5 text-[14px] font-semibold text-white transition-all shadow-md active:scale-95 ${
          type === 'danger' ? 'bg-red-600 hover:bg-red-700' : 'bg-[#2D5A53] hover:bg-[#234741]'
        }`}
      >
        {confirmText}
      </Button>
    </div>
  );

  return (
    <BaseModal
      isOpen={isOpen}
      onClose={onClose}
      title={title}
      footer={footer}
      maxWidth="max-w-md"
    >
      <div className="flex items-start gap-4">
        <div className={`flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full ${getIconBg()}`}>
          {getIcon()}
        </div>
        <div className="flex-1">
          <p className="mt-2 text-[14px] leading-relaxed text-gray-500">
            {message}
          </p>
        </div>
      </div>
    </BaseModal>
  );
};

export default ConfirmationModal;
