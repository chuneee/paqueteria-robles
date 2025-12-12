// ========================================
// UTILIDADES DE ALMACENAMIENTO LOCAL
// ========================================

import { STORAGE_KEYS } from '@/config/constants';

/**
 * Clase para manejar el almacenamiento local de forma segura
 */
class StorageService {
  /**
   * Guarda un valor en localStorage
   */
  setItem<T>(key: string, value: T): void {
    try {
      const serializedValue = JSON.stringify(value);
      localStorage.setItem(key, serializedValue);
    } catch (error) {
      console.error(`Error saving to localStorage: ${error}`);
    }
  }

  /**
   * Obtiene un valor de localStorage
   */
  getItem<T>(key: string): T | null {
    try {
      const serializedValue = localStorage.getItem(key);
      if (serializedValue === null) return null;
      return JSON.parse(serializedValue) as T;
    } catch (error) {
      console.error(`Error reading from localStorage: ${error}`);
      return null;
    }
  }

  /**
   * Elimina un valor de localStorage
   */
  removeItem(key: string): void {
    try {
      localStorage.removeItem(key);
    } catch (error) {
      console.error(`Error removing from localStorage: ${error}`);
    }
  }

  /**
   * Limpia todo el localStorage
   */
  clear(): void {
    try {
      localStorage.clear();
    } catch (error) {
      console.error(`Error clearing localStorage: ${error}`);
    }
  }

  /**
   * Verifica si existe una clave en localStorage
   */
  hasItem(key: string): boolean {
    return localStorage.getItem(key) !== null;
  }

  // ========================================
  // MÉTODOS ESPECÍFICOS DE LA APLICACIÓN
  // ========================================

  /**
   * Guarda el token de autenticación
   * Los tokens son strings planos, no requieren serialización JSON
   */
  setAuthToken(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.AUTH_TOKEN, token);
    } catch (error) {
      console.error(`Error saving auth token: ${error}`);
    }
  }

  /**
   * Obtiene el token de autenticación
   * Los tokens son strings planos, no requieren deserialización JSON
   */
  getAuthToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.AUTH_TOKEN);
    } catch (error) {
      console.error(`Error reading auth token: ${error}`);
      return null;
    }
  }

  /**
   * Elimina el token de autenticación
   */
  removeAuthToken(): void {
    this.removeItem(STORAGE_KEYS.AUTH_TOKEN);
  }

  /**
   * Guarda el refresh token
   * Los tokens son strings planos, no requieren serialización JSON
   */
  setRefreshToken(token: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REFRESH_TOKEN, token);
    } catch (error) {
      console.error(`Error saving refresh token: ${error}`);
    }
  }

  /**
   * Obtiene el refresh token
   * Los tokens son strings planos, no requieren deserialización JSON
   */
  getRefreshToken(): string | null {
    try {
      return localStorage.getItem(STORAGE_KEYS.REFRESH_TOKEN);
    } catch (error) {
      console.error(`Error reading refresh token: ${error}`);
      return null;
    }
  }

  /**
   * Elimina el refresh token
   */
  removeRefreshToken(): void {
    this.removeItem(STORAGE_KEYS.REFRESH_TOKEN);
  }

  /**
   * Guarda los datos del usuario
   */
  setUserData<T>(userData: T): void {
    this.setItem(STORAGE_KEYS.USER_DATA, userData);
  }

  /**
   * Obtiene los datos del usuario
   */
  getUserData<T>(): T | null {
    return this.getItem<T>(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Elimina los datos del usuario
   */
  removeUserData(): void {
    this.removeItem(STORAGE_KEYS.USER_DATA);
  }

  /**
   * Limpia todos los datos de autenticación
   */
  clearAuthData(): void {
    this.removeAuthToken();
    this.removeRefreshToken();
    this.removeUserData();
  }
}

// Exportar instancia única (Singleton)
export const storage = new StorageService();
