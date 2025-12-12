// ========================================
// HOOK PARA TOAST NOTIFICATIONS
// ========================================

import { toast } from 'sonner';

interface ToastOptions {
  duration?: number;
  position?: 'top-left' | 'top-right' | 'bottom-left' | 'bottom-right' | 'top-center' | 'bottom-center';
}

/**
 * Hook para mostrar notificaciones toast
 * 
 * @example
 * const { showSuccess, showError } = useToast();
 * 
 * showSuccess('Cliente creado exitosamente');
 * showError('Error al crear cliente');
 */
export function useToast() {
  const showSuccess = (message: string, options?: ToastOptions) => {
    toast.success(message, options);
  };

  const showError = (message: string, options?: ToastOptions) => {
    toast.error(message, options);
  };

  const showInfo = (message: string, options?: ToastOptions) => {
    toast.info(message, options);
  };

  const showWarning = (message: string, options?: ToastOptions) => {
    toast.warning(message, options);
  };

  const showLoading = (message: string, options?: ToastOptions) => {
    return toast.loading(message, options);
  };

  const dismiss = (toastId?: string | number) => {
    toast.dismiss(toastId);
  };

  return {
    showSuccess,
    showError,
    showInfo,
    showWarning,
    showLoading,
    dismiss,
  };
}
