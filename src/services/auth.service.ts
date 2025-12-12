// ========================================
// SERVICIO DE AUTENTICACIÓN
// ========================================

import { httpService } from './http.service';
import { API_ENDPOINTS } from '@/config/constants';
import type { LoginCredentials, AuthResponse, User, ApiResponse } from '@/types';

/**
 * Servicio para manejar la autenticación de usuarios
 */
class AuthService {
  /**
   * Iniciar sesión
   */
  async login(credentials: LoginCredentials): Promise<AuthResponse> {
    const response = await httpService.post<AuthResponse>(
      API_ENDPOINTS.AUTH.LOGIN,
      credentials
    );
    return response.data!;
  }

  /**
   * Cerrar sesión
   */
  async logout(): Promise<void> {
    await httpService.post(API_ENDPOINTS.AUTH.LOGOUT);
  }

  /**
   * Refrescar token
   */
  async refreshToken(refreshToken: string): Promise<{ token: string }> {
    const response = await httpService.post<{ token: string }>(
      API_ENDPOINTS.AUTH.REFRESH,
      { refreshToken }
    );
    return response.data!;
  }

  /**
   * Obtener usuario actual
   */
  async getCurrentUser(): Promise<User> {
    const response = await httpService.get<User>(API_ENDPOINTS.AUTH.ME);
    return response.data!;
  }

  /**
   * Cambiar contraseña
   */
  async changePassword(data: {
    currentPassword: string;
    newPassword: string;
  }): Promise<void> {
    await httpService.post(API_ENDPOINTS.AUTH.CHANGE_PASSWORD, data);
  }
}

export const authService = new AuthService();
