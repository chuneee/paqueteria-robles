// ========================================
// COMPONENTE DE RUTA PROTEGIDA
// ========================================

import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/contexts/AuthContext';
import { ROUTES } from '@/config/constants';
import type { UserRole } from '@/types';

interface ProtectedRouteProps {
  children: React.ReactNode;
  allowedRoles?: UserRole[];
  redirectTo?: string;
}

/**
 * Componente para proteger rutas que requieren autenticación
 */
export function ProtectedRoute({
  children,
  allowedRoles,
  redirectTo = ROUTES.LOGIN,
}: ProtectedRouteProps) {
  const { isAuthenticated, user, isLoading } = useAuth();
  const location = useLocation();

  // Mostrar loading mientras se verifica la autenticación
  if (isLoading) {
    return (
      <div className="flex items-center justify-center min-h-screen">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-gray-900"></div>
      </div>
    );
  }

  // Redirigir al login si no está autenticado
  if (!isAuthenticated) {
    return <Navigate to={redirectTo} state={{ from: location }} replace />;
  }

  // Verificar roles si se especificaron
  if (allowedRoles && allowedRoles.length > 0 && user) {
    const hasPermission = allowedRoles.includes(user.role);
    
    if (!hasPermission) {
      // Redirigir a su dashboard correspondiente si no tiene permisos
      const defaultRoute = getDefaultRouteForRole(user.role);
      return <Navigate to={defaultRoute} replace />;
    }
  }

  return <>{children}</>;
}

/**
 * Obtener ruta por defecto según el rol del usuario
 */
function getDefaultRouteForRole(role: UserRole): string {
  switch (role) {
    case 'SUPERADMIN':
      return ROUTES.SUPERADMIN_DASHBOARD;
    case 'EMPRESA':
      return ROUTES.EMPRESA_DASHBOARD;
    case 'ADMIN':
      return ROUTES.ADMIN_DASHBOARD;
    default:
      return ROUTES.LOGIN;
  }
}
