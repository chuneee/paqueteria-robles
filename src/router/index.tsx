// ========================================
// CONFIGURACIÓN DE RUTAS
// ========================================

import { createBrowserRouter, Navigate } from 'react-router-dom';
import { ProtectedRoute } from '@/components/shared/ProtectedRoute';
import { ROUTES } from '@/config/constants';
import { UserRole } from '@/types';

// Layouts
import EmpresaLayout from '@/layouts/EmpresaLayout';
import SuperAdminLayout from '@/layouts/SuperAdminLayout';
import PublicLayout from '@/layouts/PublicLayout';

// Public Views (ya creadas)
import LandingPageComponent from '@/views/LandingPage';
import LoginPageComponent from '@/views/LoginPage';

// Usar las páginas creadas
const LandingPage = LandingPageComponent;
const LoginPage = LoginPageComponent;

// Empresa Views - Placeholder (migrar después)
const EmpresaDashboard = () => <div>Empresa Dashboard - Migrar con useAuth</div>;
const GenerarGuiaView = () => <div>Generar Guía View</div>;
const HistorialGuiasView = () => <div>Historial Guías View</div>;
const MisClientesView = () => <div>Mis Clientes View</div>;
const SolicitarGuiasView = () => <div>Solicitar Guías View</div>;
const PerfilConfiguracionView = () => <div>Perfil Configuración View</div>;

// SuperAdmin Views - Placeholder (migrar después)
const SuperAdminDashboard = () => <div>SuperAdmin Dashboard - Migrar con useAsync</div>;
const EmpresasView = () => <div>Empresas View</div>;
const EmpresaDetailView = () => <div>Empresa Detail View</div>;
const GuiasView = () => <div>Guías View</div>;
const SolicitudesView = () => <div>Solicitudes View</div>;
const CobranzaView = () => <div>Cobranza View</div>;
const AdministradoresView = () => <div>Administradores View</div>;
const ReportesView = () => <div>Reportes View</div>;
const NotificacionesView = () => <div>Notificaciones View</div>;
const ConfiguracionView = () => <div>Configuración View</div>;

// Admin Views - Placeholder (migrar después)
const AdminDashboard = () => <div>Admin Dashboard</div>;

/**
 * Configuración del router de la aplicación
 */
export const router = createBrowserRouter([
  // ========================================
  // RUTAS PÚBLICAS
  // ========================================
  {
    path: '/',
    element: <PublicLayout />,
    children: [
      {
        index: true,
        element: <LandingPage />,
      },
      {
        path: ROUTES.LOGIN,
        element: <LoginPage />,
      },
    ],
  },

  // ========================================
  // RUTAS DE EMPRESA
  // ========================================
  {
    path: '/empresa',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.EMPRESA]}>
        <EmpresaLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <EmpresaDashboard />,
      },
      {
        path: 'generar-guia',
        element: <GenerarGuiaView />,
      },
      {
        path: 'historial-guias',
        element: <HistorialGuiasView />,
      },
      {
        path: 'mis-clientes',
        element: <MisClientesView />,
      },
      {
        path: 'solicitar-guias',
        element: <SolicitarGuiasView />,
      },
      {
        path: 'perfil',
        element: <PerfilConfiguracionView />,
      },
      // Redirect /empresa to /empresa/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },

  // ========================================
  // RUTAS DE SUPERADMIN
  // ========================================
  {
    path: '/superadmin',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.SUPERADMIN]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <SuperAdminDashboard />,
      },
      {
        path: 'empresas',
        element: <EmpresasView />,
      },
      {
        path: 'empresas/:id',
        element: <EmpresaDetailView />,
      },
      {
        path: 'guias',
        element: <GuiasView />,
      },
      {
        path: 'solicitudes',
        element: <SolicitudesView />,
      },
      {
        path: 'cobranza',
        element: <CobranzaView />,
      },
      {
        path: 'administradores',
        element: <AdministradoresView />,
      },
      {
        path: 'reportes',
        element: <ReportesView />,
      },
      {
        path: 'notificaciones',
        element: <NotificacionesView />,
      },
      {
        path: 'configuracion',
        element: <ConfiguracionView />,
      },
      // Redirect /superadmin to /superadmin/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },

  // ========================================
  // RUTAS DE ADMIN
  // ========================================
  {
    path: '/admin',
    element: (
      <ProtectedRoute allowedRoles={[UserRole.ADMIN]}>
        <SuperAdminLayout />
      </ProtectedRoute>
    ),
    children: [
      {
        path: 'dashboard',
        element: <AdminDashboard />,
      },
      // Redirect /admin to /admin/dashboard
      {
        index: true,
        element: <Navigate to="dashboard" replace />,
      },
    ],
  },

  // ========================================
  // RUTA 404 - NOT FOUND
  // ========================================
  {
    path: '*',
    element: (
      <div className="flex flex-col items-center justify-center min-h-screen">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl mb-4">Página no encontrada</p>
        <a href="/" className="text-blue-600 hover:underline">
          Volver al inicio
        </a>
      </div>
    ),
  },
]);
