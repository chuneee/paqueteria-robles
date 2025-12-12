// ========================================
// APP PRINCIPAL
// ========================================

import { RouterProvider } from 'react-router-dom';
import { Toaster } from 'sonner';
import { AuthProvider } from '@/contexts/AuthContext';
import { router } from '@/router';

/**
 * Componente principal de la aplicación
 */
export default function App() {
  return (
    <AuthProvider>
      <RouterProvider router={router} />
      <Toaster position="top-right" richColors />
    </AuthProvider>
  );
}
