// ========================================
// CONSTANTES DE LA APLICACIÓN
// ========================================

// Variables de entorno
export const ENV = {
  API_BASE_URL: import.meta.env.VITE_API_BASE_URL || 'http://localhost:3000/api',
  API_TIMEOUT: Number(import.meta.env.VITE_API_TIMEOUT) || 30000,
  ENV_MODE: import.meta.env.MODE,
  IS_DEVELOPMENT: import.meta.env.DEV,
  IS_PRODUCTION: import.meta.env.PROD,
} as const;

// Claves de localStorage
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'auth_token',
  REFRESH_TOKEN: 'refresh_token',
  USER_DATA: 'user_data',
  THEME: 'theme',
  LANGUAGE: 'language',
} as const;

// Rutas de la aplicación
export const ROUTES = {
  // Public
  HOME: '/',
  LOGIN: '/login',
  
  // Empresa
  EMPRESA_DASHBOARD: '/empresa/dashboard',
  GENERAR_GUIA: '/empresa/generar-guia',
  HISTORIAL_GUIAS: '/empresa/historial-guias',
  MIS_CLIENTES: '/empresa/mis-clientes',
  SOLICITAR_GUIAS: '/empresa/solicitar-guias',
  PERFIL_CONFIGURACION: '/empresa/perfil',
  
  // SuperAdmin
  SUPERADMIN_DASHBOARD: '/superadmin/dashboard',
  EMPRESAS: '/superadmin/empresas',
  EMPRESA_DETAIL: '/superadmin/empresas/:id',
  GUIAS: '/superadmin/guias',
  SOLICITUDES: '/superadmin/solicitudes',
  COBRANZA: '/superadmin/cobranza',
  ADMINISTRADORES: '/superadmin/administradores',
  REPORTES: '/superadmin/reportes',
  NOTIFICACIONES: '/superadmin/notificaciones',
  CONFIGURACION: '/superadmin/configuracion',
  
  // Admin
  ADMIN_DASHBOARD: '/admin/dashboard',
} as const;

// Endpoints de API
export const API_ENDPOINTS = {
  // Auth
  AUTH: {
    LOGIN: '/auth/login',
    LOGOUT: '/auth/logout',
    REFRESH: '/auth/refresh',
    ME: '/auth/me',
    CHANGE_PASSWORD: '/auth/change-password',
  },
  
  // Empresa
  EMPRESA: {
    PROFILE: '/empresa/profile',
    CLIENTES: '/empresa/clientes',
    GUIAS: '/empresa/guias',
    SOLICITUDES: '/empresa/solicitudes',
  },
  
  // SuperAdmin
  SUPERADMIN: {
    DASHBOARD: '/superadmin/dashboard',
    EMPRESAS: '/superadmin/empresas',
    GUIAS: '/superadmin/guias',
    SOLICITUDES: '/superadmin/solicitudes',
    COBRANZA: '/superadmin/cobranza',
    ADMINISTRADORES: '/superadmin/administradores',
    REPORTES: '/superadmin/reportes',
  },
} as const;

// Mensajes de error
export const ERROR_MESSAGES = {
  NETWORK_ERROR: 'Error de conexión. Por favor verifica tu internet.',
  UNAUTHORIZED: 'No autorizado. Por favor inicia sesión nuevamente.',
  FORBIDDEN: 'No tienes permisos para realizar esta acción.',
  NOT_FOUND: 'Recurso no encontrado.',
  SERVER_ERROR: 'Error del servidor. Por favor intenta más tarde.',
  VALIDATION_ERROR: 'Error de validación. Verifica los datos ingresados.',
  UNKNOWN_ERROR: 'Ha ocurrido un error inesperado.',
} as const;

// Códigos de estado HTTP
export const HTTP_STATUS = {
  OK: 200,
  CREATED: 201,
  BAD_REQUEST: 400,
  UNAUTHORIZED: 401,
  FORBIDDEN: 403,
  NOT_FOUND: 404,
  UNPROCESSABLE_ENTITY: 422,
  INTERNAL_SERVER_ERROR: 500,
} as const;

// Configuración de paginación
export const PAGINATION = {
  DEFAULT_PAGE: 1,
  DEFAULT_PAGE_SIZE: 10,
  PAGE_SIZE_OPTIONS: [10, 25, 50, 100],
} as const;
