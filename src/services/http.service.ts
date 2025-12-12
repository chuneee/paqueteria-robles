// ========================================
// SERVICIO HTTP BASE CON AXIOS
// ========================================

import axios, {
  AxiosInstance,
  AxiosRequestConfig,
  AxiosResponse,
  AxiosError,
  InternalAxiosRequestConfig,
} from 'axios';
import { ENV, ERROR_MESSAGES, HTTP_STATUS, API_ENDPOINTS } from '@/config/constants';
import { storage } from '@/utils/storage';
import type { ApiResponse, ApiError } from '@/types';

/**
 * Clase para manejar todas las peticiones HTTP
 */
class HttpService {
  private axiosInstance: AxiosInstance;
  private isRefreshing = false;
  private failedQueue: Array<{
    resolve: (value?: any) => void;
    reject: (reason?: any) => void;
  }> = [];

  constructor() {
    this.axiosInstance = axios.create({
      baseURL: ENV.API_BASE_URL,
      timeout: ENV.API_TIMEOUT,
      headers: {
        'Content-Type': 'application/json',
      },
    });

    this.setupInterceptors();
  }

  /**
   * Configurar interceptores de request y response
   */
  private setupInterceptors(): void {
    // Request interceptor
    this.axiosInstance.interceptors.request.use(
      this.handleRequest,
      this.handleRequestError
    );

    // Response interceptor
    this.axiosInstance.interceptors.response.use(
      this.handleResponse,
      this.handleResponseError
    );
  }

  /**
   * Interceptor de request: Agregar token de autenticación
   */
  private handleRequest = (
    config: InternalAxiosRequestConfig
  ): InternalAxiosRequestConfig => {
    const token = storage.getAuthToken();

    if (token && config.headers) {
      config.headers.Authorization = `Bearer ${token}`;
    }

    // Log en desarrollo
    if (ENV.IS_DEVELOPMENT) {
      console.log(`[HTTP] ${config.method?.toUpperCase()} ${config.url}`, {
        data: config.data,
        params: config.params,
      });
    }

    return config;
  };

  /**
   * Manejo de errores en el request
   */
  private handleRequestError = (error: AxiosError): Promise<never> => {
    console.error('[HTTP] Request error:', error);
    return Promise.reject(error);
  };

  /**
   * Interceptor de response: Manejo de respuestas exitosas
   */
  private handleResponse = (response: AxiosResponse): AxiosResponse => {
    // Log en desarrollo
    if (ENV.IS_DEVELOPMENT) {
      console.log(`[HTTP] Response ${response.status}:`, response.data);
    }

    return response;
  };

  /**
   * Interceptor de response: Manejo de errores
   */
  private handleResponseError = async (error: AxiosError<ApiResponse>): Promise<any> => {
    const originalRequest = error.config as InternalAxiosRequestConfig & {
      _retry?: boolean;
    };

    // Error de red
    if (!error.response) {
      console.error('[HTTP] Network error:', error);
      return Promise.reject(this.createError(ERROR_MESSAGES.NETWORK_ERROR, 0));
    }

    const { status } = error.response;

    // Token expirado - Intentar refresh
    if (status === HTTP_STATUS.UNAUTHORIZED && !originalRequest._retry) {
      if (this.isRefreshing) {
        // Agregar a la cola de peticiones fallidas
        return new Promise((resolve, reject) => {
          this.failedQueue.push({ resolve, reject });
        })
          .then(() => {
            return this.axiosInstance(originalRequest);
          })
          .catch((err) => {
            return Promise.reject(err);
          });
      }

      originalRequest._retry = true;
      this.isRefreshing = true;

      try {
        const refreshToken = storage.getRefreshToken();

        if (!refreshToken) {
          throw new Error('No refresh token available');
        }

        // Intentar refrescar el token
        const response = await this.axiosInstance.post(API_ENDPOINTS.AUTH.REFRESH, {
          refreshToken,
        });

        const { token } = response.data.data;
        storage.setAuthToken(token);

        // Procesar cola de peticiones fallidas
        this.failedQueue.forEach((promise) => {
          promise.resolve();
        });
        this.failedQueue = [];

        return this.axiosInstance(originalRequest);
      } catch (refreshError) {
        // Si falla el refresh, limpiar datos y redirigir a login
        this.failedQueue.forEach((promise) => {
          promise.reject(refreshError);
        });
        this.failedQueue = [];

        storage.clearAuthData();
        window.location.href = '/login';

        return Promise.reject(refreshError);
      } finally {
        this.isRefreshing = false;
      }
    }

    // Otros errores HTTP
    const apiError = this.createError(
      error.response.data?.message || this.getErrorMessage(status),
      status,
      error.response.data?.error
    );

    console.error('[HTTP] Response error:', apiError);
    return Promise.reject(apiError);
  };

  /**
   * Crear objeto de error estructurado
   */
  private createError(message: string, statusCode: number, errors?: any): ApiError {
    return {
      message,
      statusCode,
      errors,
    };
  }

  /**
   * Obtener mensaje de error según el código de estado
   */
  private getErrorMessage(status: number): string {
    switch (status) {
      case HTTP_STATUS.BAD_REQUEST:
        return ERROR_MESSAGES.VALIDATION_ERROR;
      case HTTP_STATUS.UNAUTHORIZED:
        return ERROR_MESSAGES.UNAUTHORIZED;
      case HTTP_STATUS.FORBIDDEN:
        return ERROR_MESSAGES.FORBIDDEN;
      case HTTP_STATUS.NOT_FOUND:
        return ERROR_MESSAGES.NOT_FOUND;
      case HTTP_STATUS.INTERNAL_SERVER_ERROR:
        return ERROR_MESSAGES.SERVER_ERROR;
      default:
        return ERROR_MESSAGES.UNKNOWN_ERROR;
    }
  }

  // ========================================
  // MÉTODOS PÚBLICOS DE HTTP
  // ========================================

  /**
   * GET request
   */
  async get<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.get<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * POST request
   */
  async post<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.post<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PUT request
   */
  async put<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.put<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * PATCH request
   */
  async patch<T = any>(
    url: string,
    data?: any,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.patch<ApiResponse<T>>(url, data, config);
    return response.data;
  }

  /**
   * DELETE request
   */
  async delete<T = any>(
    url: string,
    config?: AxiosRequestConfig
  ): Promise<ApiResponse<T>> {
    const response = await this.axiosInstance.delete<ApiResponse<T>>(url, config);
    return response.data;
  }

  /**
   * Subir archivo
   */
  async uploadFile<T = any>(
    url: string,
    file: File,
    onUploadProgress?: (progressEvent: any) => void
  ): Promise<ApiResponse<T>> {
    const formData = new FormData();
    formData.append('file', file);

    const response = await this.axiosInstance.post<ApiResponse<T>>(url, formData, {
      headers: {
        'Content-Type': 'multipart/form-data',
      },
      onUploadProgress,
    });

    return response.data;
  }

  /**
   * Obtener instancia de Axios (para casos avanzados)
   */
  getAxiosInstance(): AxiosInstance {
    return this.axiosInstance;
  }
}

// Exportar instancia única (Singleton)
export const httpService = new HttpService();
