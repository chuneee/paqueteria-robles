import { AlertTriangle } from 'lucide-react';

interface ConfirmModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  title: string;
  message: string;
  confirmText?: string;
  cancelText?: string;
  type?: 'danger' | 'warning' | 'info';
}

export function ConfirmModal({
  isOpen,
  onClose,
  onConfirm,
  title,
  message,
  confirmText = 'Confirmar',
  cancelText = 'Cancelar',
  type = 'warning',
}: ConfirmModalProps) {
  if (!isOpen) return null;

  const iconColors = {
    danger: 'text-[#e53e3e]',
    warning: 'text-[#d69e2e]',
    info: 'text-[#00a3e0]',
  };

  const buttonColors = {
    danger: 'bg-[#e53e3e] hover:bg-[#c53030]',
    warning: 'bg-[#d69e2e] hover:bg-[#b7791f]',
    info: 'bg-[#00a3e0] hover:bg-[#0090c9]',
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-md">
        <div className="p-6">
          {/* Icon */}
          <div className="flex justify-center mb-4">
            <div className={`w-16 h-16 rounded-full bg-${type === 'danger' ? '[#e53e3e]' : type === 'warning' ? '[#d69e2e]' : '[#00a3e0]'}/10 flex items-center justify-center`}>
              <AlertTriangle className={`w-8 h-8 ${iconColors[type]}`} />
            </div>
          </div>

          {/* Content */}
          <div className="text-center mb-6">
            <h3 className="text-xl text-[#1a365d] mb-2">{title}</h3>
            <p className="text-sm text-[#9ca3af]">{message}</p>
          </div>

          {/* Actions */}
          <div className="flex items-center gap-3">
            <button
              onClick={onClose}
              className="flex-1 px-6 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              {cancelText}
            </button>
            <button
              onClick={() => {
                onConfirm();
                onClose();
              }}
              className={`flex-1 px-6 py-2.5 text-white rounded-lg transition-colors ${buttonColors[type]}`}
            >
              {confirmText}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
