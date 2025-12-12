// ========================================
// TIPOS GLOBALES DE LA APLICACIÓN
// ========================================

// Roles de usuario
export enum UserRole {
  SUPERADMIN = 'SUPERADMIN',
  ADMIN = 'ADMIN',
  EMPRESA = 'EMPRESA',
}

// Usuario autenticado
export interface User {
  id: string;
  email: string;
  name: string;
  role: UserRole;
  empresaId?: string;
  avatar?: string;
}

// Respuesta de autenticación
export interface AuthResponse {
  user: User;
  token: string;
  refreshToken?: string;
}

// Credenciales de login
export interface LoginCredentials {
  email: string;
  password: string;
}

// Estado de carga
export interface LoadingState {
  isLoading: boolean;
  error: string | null;
}

// Respuesta paginada genérica
export interface PaginatedResponse<T> {
  data: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Respuesta de API genérica
export interface ApiResponse<T = any> {
  success: boolean;
  data?: T;
  message?: string;
  error?: string;
}

// Errores de API
export interface ApiError {
  message: string;
  statusCode: number;
  errors?: Record<string, string[]>;
}

// Parámetros de paginación
export interface PaginationParams {
  page?: number;
  pageSize?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  search?: string;
}

// Filtros genéricos
export interface FilterParams extends PaginationParams {
  [key: string]: any;
}
