// ========================================
// SERVICIO DE EMPRESA
// ========================================

import { httpService } from './http.service';
import { API_ENDPOINTS } from '@/config/constants';
import type { PaginatedResponse, FilterParams } from '@/types';

// Tipos específicos de Empresa (ajustar según tu backend)
export interface Cliente {
  id: string;
  nombre: string;
  email: string;
  telefono: string;
  direccion: string;
  createdAt: string;
}

export interface Guia {
  id: string;
  numeroGuia: string;
  clienteId: string;
  cliente?: Cliente;
  origen: string;
  destino: string;
  estado: string;
  fechaCreacion: string;
  fechaEntrega?: string;
}

export interface SolicitudGuias {
  id: string;
  cantidad: number;
  estado: string;
  fechaSolicitud: string;
}

/**
 * Servicio para manejar operaciones de empresa
 */
class EmpresaService {
  // ========================================
  // CLIENTES
  // ========================================

  /**
   * Obtener lista de clientes
   */
  async getClientes(params?: FilterParams): Promise<PaginatedResponse<Cliente>> {
    const response = await httpService.get<PaginatedResponse<Cliente>>(
      API_ENDPOINTS.EMPRESA.CLIENTES,
      { params }
    );
    return response.data!;
  }

  /**
   * Obtener cliente por ID
   */
  async getCliente(id: string): Promise<Cliente> {
    const response = await httpService.get<Cliente>(
      `${API_ENDPOINTS.EMPRESA.CLIENTES}/${id}`
    );
    return response.data!;
  }

  /**
   * Crear nuevo cliente
   */
  async createCliente(data: Partial<Cliente>): Promise<Cliente> {
    const response = await httpService.post<Cliente>(
      API_ENDPOINTS.EMPRESA.CLIENTES,
      data
    );
    return response.data!;
  }

  /**
   * Actualizar cliente
   */
  async updateCliente(id: string, data: Partial<Cliente>): Promise<Cliente> {
    const response = await httpService.put<Cliente>(
      `${API_ENDPOINTS.EMPRESA.CLIENTES}/${id}`,
      data
    );
    return response.data!;
  }

  /**
   * Eliminar cliente
   */
  async deleteCliente(id: string): Promise<void> {
    await httpService.delete(`${API_ENDPOINTS.EMPRESA.CLIENTES}/${id}`);
  }

  // ========================================
  // GUÍAS
  // ========================================

  /**
   * Obtener lista de guías
   */
  async getGuias(params?: FilterParams): Promise<PaginatedResponse<Guia>> {
    const response = await httpService.get<PaginatedResponse<Guia>>(
      API_ENDPOINTS.EMPRESA.GUIAS,
      { params }
    );
    return response.data!;
  }

  /**
   * Obtener guía por ID
   */
  async getGuia(id: string): Promise<Guia> {
    const response = await httpService.get<Guia>(
      `${API_ENDPOINTS.EMPRESA.GUIAS}/${id}`
    );
    return response.data!;
  }

  /**
   * Crear nueva guía
   */
  async createGuia(data: Partial<Guia>): Promise<Guia> {
    const response = await httpService.post<Guia>(
      API_ENDPOINTS.EMPRESA.GUIAS,
      data
    );
    return response.data!;
  }

  /**
   * Actualizar guía
   */
  async updateGuia(id: string, data: Partial<Guia>): Promise<Guia> {
    const response = await httpService.put<Guia>(
      `${API_ENDPOINTS.EMPRESA.GUIAS}/${id}`,
      data
    );
    return response.data!;
  }

  // ========================================
  // SOLICITUDES
  // ========================================

  /**
   * Obtener lista de solicitudes
   */
  async getSolicitudes(params?: FilterParams): Promise<PaginatedResponse<SolicitudGuias>> {
    const response = await httpService.get<PaginatedResponse<SolicitudGuias>>(
      API_ENDPOINTS.EMPRESA.SOLICITUDES,
      { params }
    );
    return response.data!;
  }

  /**
   * Crear nueva solicitud de guías
   */
  async createSolicitud(data: { cantidad: number }): Promise<SolicitudGuias> {
    const response = await httpService.post<SolicitudGuias>(
      API_ENDPOINTS.EMPRESA.SOLICITUDES,
      data
    );
    return response.data!;
  }

  // ========================================
  // PERFIL
  // ========================================

  /**
   * Obtener perfil de empresa
   */
  async getProfile(): Promise<any> {
    const response = await httpService.get(API_ENDPOINTS.EMPRESA.PROFILE);
    return response.data!;
  }

  /**
   * Actualizar perfil de empresa
   */
  async updateProfile(data: any): Promise<any> {
    const response = await httpService.put(API_ENDPOINTS.EMPRESA.PROFILE, data);
    return response.data!;
  }
}

export const empresaService = new EmpresaService();
