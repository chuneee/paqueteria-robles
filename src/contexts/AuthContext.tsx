// ========================================
// CONTEXTO DE AUTENTICACIÓN
// ========================================

import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { authService } from '@/services';
import { storage } from '@/utils/storage';
import type { User, LoginCredentials, UserRole } from '@/types';

interface AuthContextType {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => Promise<void>;
  updateUser: (user: User) => void;
  hasRole: (roles: UserRole | UserRole[]) => boolean;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

interface AuthProviderProps {
  children: ReactNode;
}

/**
 * Provider del contexto de autenticación
 */
export function AuthProvider({ children }: AuthProviderProps) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState(true);

  /**
   * Inicializar autenticación al cargar la app
   */
  useEffect(() => {
    initializeAuth();
  }, []);

  /**
   * Cargar usuario desde localStorage o API
   */
  const initializeAuth = async () => {
    try {
      const token = storage.getAuthToken();
      const savedUser = storage.getUserData<User>();

      if (token && savedUser) {
        // Verificar que el token sigue siendo válido
        try {
          const currentUser = await authService.getCurrentUser();
          setUser(currentUser);
          storage.setUserData(currentUser);
        } catch (error) {
          // Token inválido, limpiar datos
          storage.clearAuthData();
          setUser(null);
        }
      }
    } catch (error) {
      console.error('Error initializing auth:', error);
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Iniciar sesión
   */
  const login = async (credentials: LoginCredentials) => {
    setIsLoading(true);
    try {
      const response = await authService.login(credentials);
      
      // Guardar token y datos del usuario
      storage.setAuthToken(response.token);
      if (response.refreshToken) {
        storage.setRefreshToken(response.refreshToken);
      }
      storage.setUserData(response.user);
      
      setUser(response.user);
    } catch (error) {
      console.error('Login error:', error);
      throw error;
    } finally {
      setIsLoading(false);
    }
  };

  /**
   * Cerrar sesión
   */
  const logout = async () => {
    setIsLoading(true);
    try {
      await authService.logout();
    } catch (error) {
      console.error('Logout error:', error);
    } finally {
      // Limpiar datos de autenticación
      storage.clearAuthData();
      setUser(null);
      setIsLoading(false);
    }
  };

  /**
   * Actualizar datos del usuario
   */
  const updateUser = (updatedUser: User) => {
    setUser(updatedUser);
    storage.setUserData(updatedUser);
  };

  /**
   * Verificar si el usuario tiene un rol específico
   */
  const hasRole = (roles: UserRole | UserRole[]): boolean => {
    if (!user) return false;
    
    const rolesArray = Array.isArray(roles) ? roles : [roles];
    return rolesArray.includes(user.role);
  };

  const value: AuthContextType = {
    user,
    isAuthenticated: !!user,
    isLoading,
    login,
    logout,
    updateUser,
    hasRole,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

/**
 * Hook para usar el contexto de autenticación
 */
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  
  return context;
}
