import { useEffect } from 'react';
import { CheckCircle, XCircle, Info, X } from 'lucide-react';

export type ToastType = 'success' | 'error' | 'info';

interface ToastProps {
  message: string;
  type: ToastType;
  isVisible: boolean;
  onClose: () => void;
  duration?: number;
}

export function Toast({ message, type, isVisible, onClose, duration = 3000 }: ToastProps) {
  useEffect(() => {
    if (isVisible) {
      const timer = setTimeout(() => {
        onClose();
      }, duration);

      return () => clearTimeout(timer);
    }
  }, [isVisible, duration, onClose]);

  if (!isVisible) return null;

  const icons = {
    success: CheckCircle,
    error: XCircle,
    info: Info,
  };

  const colors = {
    success: 'bg-[#38a169] text-white',
    error: 'bg-[#e53e3e] text-white',
    info: 'bg-[#00a3e0] text-white',
  };

  const Icon = icons[type];

  return (
    <div className="fixed top-6 right-6 z-50 animate-slide-in-right">
      <div className={`flex items-center gap-3 ${colors[type]} px-6 py-4 rounded-lg shadow-lg min-w-[300px]`}>
        <Icon className="w-5 h-5 flex-shrink-0" />
        <p className="text-sm flex-1">{message}</p>
        <button
          onClick={onClose}
          className="p-1 hover:bg-white/20 rounded transition-colors"
        >
          <X className="w-4 h-4" />
        </button>
      </div>
    </div>
  );
}
