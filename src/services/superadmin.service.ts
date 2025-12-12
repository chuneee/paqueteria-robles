// ========================================
// SERVICIO DE SUPERADMIN
// ========================================

import { httpService } from './http.service';
import { API_ENDPOINTS } from '@/config/constants';
import type { PaginatedResponse, FilterParams } from '@/types';

// Tipos específicos de SuperAdmin (ajustar según tu backend)
export interface Empresa {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  guiasDisponibles: number;
  activo: boolean;
  createdAt: string;
}

export interface Administrador {
  id: string;
  nombre: string;
  email: string;
  rol: string;
  activo: boolean;
  createdAt: string;
}

export interface DashboardStats {
  totalEmpresas: number;
  totalGuias: number;
  solicitudesPendientes: number;
  ingresosMensuales: number;
}

/**
 * Servicio para manejar operaciones de superadmin
 */
class SuperAdminService {
  // ========================================
  // DASHBOARD
  // ========================================

  /**
   * Obtener estadísticas del dashboard
   */
  async getDashboardStats(): Promise<DashboardStats> {
    const response = await httpService.get<DashboardStats>(
      API_ENDPOINTS.SUPERADMIN.DASHBOARD
    );
    return response.data!;
  }

  // ========================================
  // EMPRESAS
  // ========================================

  /**
   * Obtener lista de empresas
   */
  async getEmpresas(params?: FilterParams): Promise<PaginatedResponse<Empresa>> {
    const response = await httpService.get<PaginatedResponse<Empresa>>(
      API_ENDPOINTS.SUPERADMIN.EMPRESAS,
      { params }
    );
    return response.data!;
  }

  /**
   * Obtener empresa por ID
   */
  async getEmpresa(id: string): Promise<Empresa> {
    const response = await httpService.get<Empresa>(
      `${API_ENDPOINTS.SUPERADMIN.EMPRESAS}/${id}`
    );
    return response.data!;
  }

  /**
   * Crear nueva empresa
   */
  async createEmpresa(data: Partial<Empresa>): Promise<Empresa> {
    const response = await httpService.post<Empresa>(
      API_ENDPOINTS.SUPERADMIN.EMPRESAS,
      data
    );
    return response.data!;
  }

  /**
   * Actualizar empresa
   */
  async updateEmpresa(id: string, data: Partial<Empresa>): Promise<Empresa> {
    const response = await httpService.put<Empresa>(
      `${API_ENDPOINTS.SUPERADMIN.EMPRESAS}/${id}`,
      data
    );
    return response.data!;
  }

  /**
   * Eliminar empresa
   */
  async deleteEmpresa(id: string): Promise<void> {
    await httpService.delete(`${API_ENDPOINTS.SUPERADMIN.EMPRESAS}/${id}`);
  }

  /**
   * Agregar guías a empresa
   */
  async addGuiasToEmpresa(empresaId: string, cantidad: number): Promise<void> {
    await httpService.post(`${API_ENDPOINTS.SUPERADMIN.EMPRESAS}/${empresaId}/guias`, {
      cantidad,
    });
  }

  // ========================================
  // ADMINISTRADORES
  // ========================================

  /**
   * Obtener lista de administradores
   */
  async getAdministradores(
    params?: FilterParams
  ): Promise<PaginatedResponse<Administrador>> {
    const response = await httpService.get<PaginatedResponse<Administrador>>(
      API_ENDPOINTS.SUPERADMIN.ADMINISTRADORES,
      { params }
    );
    return response.data!;
  }

  /**
   * Crear nuevo administrador
   */
  async createAdministrador(data: Partial<Administrador>): Promise<Administrador> {
    const response = await httpService.post<Administrador>(
      API_ENDPOINTS.SUPERADMIN.ADMINISTRADORES,
      data
    );
    return response.data!;
  }

  /**
   * Actualizar administrador
   */
  async updateAdministrador(
    id: string,
    data: Partial<Administrador>
  ): Promise<Administrador> {
    const response = await httpService.put<Administrador>(
      `${API_ENDPOINTS.SUPERADMIN.ADMINISTRADORES}/${id}`,
      data
    );
    return response.data!;
  }

  /**
   * Eliminar administrador
   */
  async deleteAdministrador(id: string): Promise<void> {
    await httpService.delete(`${API_ENDPOINTS.SUPERADMIN.ADMINISTRADORES}/${id}`);
  }

  // ========================================
  // GUÍAS
  // ========================================

  /**
   * Obtener todas las guías (todas las empresas)
   */
  async getGuias(params?: FilterParams): Promise<PaginatedResponse<any>> {
    const response = await httpService.get<PaginatedResponse<any>>(
      API_ENDPOINTS.SUPERADMIN.GUIAS,
      { params }
    );
    return response.data!;
  }

  /**
   * Actualizar estado de guía
   */
  async updateGuiaEstado(id: string, estado: string): Promise<any> {
    const response = await httpService.patch(
      `${API_ENDPOINTS.SUPERADMIN.GUIAS}/${id}/estado`,
      { estado }
    );
    return response.data!;
  }

  // ========================================
  // SOLICITUDES
  // ========================================

  /**
   * Obtener todas las solicitudes
   */
  async getSolicitudes(params?: FilterParams): Promise<PaginatedResponse<any>> {
    const response = await httpService.get<PaginatedResponse<any>>(
      API_ENDPOINTS.SUPERADMIN.SOLICITUDES,
      { params }
    );
    return response.data!;
  }

  /**
   * Aprobar solicitud
   */
  async aprobarSolicitud(id: string): Promise<void> {
    await httpService.post(`${API_ENDPOINTS.SUPERADMIN.SOLICITUDES}/${id}/aprobar`);
  }

  /**
   * Rechazar solicitud
   */
  async rechazarSolicitud(id: string, motivo: string): Promise<void> {
    await httpService.post(`${API_ENDPOINTS.SUPERADMIN.SOLICITUDES}/${id}/rechazar`, {
      motivo,
    });
  }

  // ========================================
  // COBRANZA
  // ========================================

  /**
   * Obtener registros de cobranza
   */
  async getCobranza(params?: FilterParams): Promise<PaginatedResponse<any>> {
    const response = await httpService.get<PaginatedResponse<any>>(
      API_ENDPOINTS.SUPERADMIN.COBRANZA,
      { params }
    );
    return response.data!;
  }

  /**
   * Registrar pago
   */
  async registrarPago(data: any): Promise<any> {
    const response = await httpService.post(API_ENDPOINTS.SUPERADMIN.COBRANZA, data);
    return response.data!;
  }

  // ========================================
  // REPORTES
  // ========================================

  /**
   * Generar reporte
   */
  async generarReporte(tipo: string, params?: any): Promise<any> {
    const response = await httpService.post(
      `${API_ENDPOINTS.SUPERADMIN.REPORTES}/${tipo}`,
      params
    );
    return response.data!;
  }

  /**
   * Descargar reporte
   */
  async descargarReporte(reporteId: string): Promise<Blob> {
    const response = await httpService.getAxiosInstance().get(
      `${API_ENDPOINTS.SUPERADMIN.REPORTES}/${reporteId}/download`,
      { responseType: 'blob' }
    );
    return response.data;
  }
}

export const superAdminService = new SuperAdminService();
