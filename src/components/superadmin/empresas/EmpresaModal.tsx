import { X, Building2, MapPin, Phone, Mail, Lock, DollarSign, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';
import { Empresa } from './EmpresaTable';

interface EmpresaModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (empresaData: Partial<Empresa> & { 
    rfc?: string;
    giro?: string;
    calle?: string;
    numeroExterior?: string;
    numeroInterior?: string;
    colonia?: string;
    codigoPostal?: string;
    ciudad?: string;
    estado?: string;
    pais?: string;
    password?: string;
    guiasIniciales?: number;
    notasInternas?: string;
  }) => void;
  empresa: Empresa | null;
}

export function EmpresaModal({ isOpen, onClose, onSave, empresa }: EmpresaModalProps) {
  const [showPassword, setShowPassword] = useState(false);
  const [formData, setFormData] = useState({
    razonSocial: '',
    rfc: '',
    giro: 'comercio',
    calle: '',
    numeroExterior: '',
    numeroInterior: '',
    colonia: '',
    codigoPostal: '',
    ciudad: 'Hermosillo',
    estado: 'Sonora',
    pais: 'México',
    telefono: '',
    contacto: '',
    password: '',
    costoPorGuia: '',
    guiasIniciales: '',
    notasInternas: '',
  });

  useEffect(() => {
    if (empresa) {
      setFormData({
        razonSocial: empresa.razonSocial,
        rfc: '',
        giro: 'comercio',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        codigoPostal: '',
        ciudad: 'Hermosillo',
        estado: 'Sonora',
        pais: 'México',
        telefono: empresa.telefono,
        contacto: empresa.contacto,
        password: '',
        costoPorGuia: empresa.costoPorGuia.toString(),
        guiasIniciales: empresa.guiasDisponibles.toString(),
        notasInternas: '',
      });
    } else {
      setFormData({
        razonSocial: '',
        rfc: '',
        giro: 'comercio',
        calle: '',
        numeroExterior: '',
        numeroInterior: '',
        colonia: '',
        codigoPostal: '',
        ciudad: 'Hermosillo',
        estado: 'Sonora',
        pais: 'México',
        telefono: '',
        contacto: '',
        password: '',
        costoPorGuia: '',
        guiasIniciales: '',
        notasInternas: '',
      });
    }
  }, [empresa, isOpen]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      razonSocial: formData.razonSocial,
      contacto: formData.contacto,
      telefono: formData.telefono,
      costoPorGuia: parseFloat(formData.costoPorGuia) || 0,
      guiasDisponibles: parseInt(formData.guiasIniciales) || 0,
      rfc: formData.rfc,
      giro: formData.giro,
      calle: formData.calle,
      numeroExterior: formData.numeroExterior,
      numeroInterior: formData.numeroInterior,
      colonia: formData.colonia,
      codigoPostal: formData.codigoPostal,
      ciudad: formData.ciudad,
      estado: formData.estado,
      pais: formData.pais,
      password: formData.password,
      notasInternas: formData.notasInternas,
    });
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div
        className="absolute inset-0 bg-black/50"
        onClick={onClose}
      ></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-xl text-[#1a365d]">
            {empresa ? 'Editar Empresa' : 'Nueva Empresa'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* SECCIÓN 1 - INFORMACIÓN BÁSICA */}
          <div className="mb-8">
            <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
              <Building2 className="w-5 h-5" />
              Datos de la Empresa
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Razón Social / Nombre Comercial *
                </label>
                <input
                  type="text"
                  required
                  value={formData.razonSocial}
                  onChange={(e) => setFormData({ ...formData, razonSocial: e.target.value })}
                  placeholder="Ej: Distribuidora Norte S.A. de C.V."
                  className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    RFC
                  </label>
                  <input
                    type="text"
                    value={formData.rfc}
                    onChange={(e) => setFormData({ ...formData, rfc: e.target.value })}
                    placeholder="Ej: DNO123456ABC"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Giro / Tipo de negocio
                  </label>
                  <select
                    value={formData.giro}
                    onChange={(e) => setFormData({ ...formData, giro: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer"
                  >
                    <option value="comercio">Comercio</option>
                    <option value="farmacia">Farmacia</option>
                    <option value="ferreteria">Ferretería</option>
                    <option value="servicios">Servicios</option>
                    <option value="manufactura">Manufactura</option>
                    <option value="otro">Otro</option>
                  </select>
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 2 - DIRECCIÓN */}
          <div className="mb-8">
            <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
              <MapPin className="w-5 h-5" />
              Dirección
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Calle *
                </label>
                <input
                  type="text"
                  required
                  value={formData.calle}
                  onChange={(e) => setFormData({ ...formData, calle: e.target.value })}
                  placeholder="Nombre de la calle"
                  className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Número Exterior *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.numeroExterior}
                    onChange={(e) => setFormData({ ...formData, numeroExterior: e.target.value })}
                    placeholder="123"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Número Interior
                  </label>
                  <input
                    type="text"
                    value={formData.numeroInterior}
                    onChange={(e) => setFormData({ ...formData, numeroInterior: e.target.value })}
                    placeholder="Int. 4 (opcional)"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Colonia *
                </label>
                <input
                  type="text"
                  required
                  value={formData.colonia}
                  onChange={(e) => setFormData({ ...formData, colonia: e.target.value })}
                  placeholder="Nombre de la colonia"
                  className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Código Postal *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.codigoPostal}
                    onChange={(e) => setFormData({ ...formData, codigoPostal: e.target.value })}
                    placeholder="83000"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Ciudad *
                  </label>
                  <input
                    type="text"
                    required
                    value={formData.ciudad}
                    onChange={(e) => setFormData({ ...formData, ciudad: e.target.value })}
                    placeholder="Hermosillo"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Estado *
                  </label>
                  <select
                    value={formData.estado}
                    onChange={(e) => setFormData({ ...formData, estado: e.target.value })}
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer"
                  >
                    <option value="Sonora">Sonora</option>
                    <option value="Baja California">Baja California</option>
                    <option value="Chihuahua">Chihuahua</option>
                    <option value="Sinaloa">Sinaloa</option>
                  </select>
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    País
                  </label>
                  <input
                    type="text"
                    disabled
                    value={formData.pais}
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg bg-[#f8fafc] text-[#9ca3af] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* SECCIÓN 3 - CONTACTO */}
          <div className="mb-8">
            <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
              <Phone className="w-5 h-5" />
              Información de Contacto
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Teléfono principal *
                </label>
                <div className="relative">
                  <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="tel"
                    required
                    value={formData.telefono}
                    onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                    placeholder="662 123 4567"
                    className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Correo electrónico *
                </label>
                <div className="relative">
                  <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="email"
                    required
                    value={formData.contacto}
                    onChange={(e) => setFormData({ ...formData, contacto: e.target.value })}
                    placeholder="contacto@empresa.com"
                    className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                </div>
                <p className="text-xs text-[#9ca3af] mt-1.5">
                  Este será el usuario para acceder al sistema
                </p>
              </div>

              {!empresa && (
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Contraseña inicial *
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type={showPassword ? 'text' : 'password'}
                      required={!empresa}
                      value={formData.password}
                      onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                      placeholder="••••••••"
                      className="w-full pl-11 pr-20 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-xs text-[#00a3e0] hover:text-[#1a365d]"
                    >
                      {showPassword ? 'Ocultar' : 'Mostrar'}
                    </button>
                  </div>
                  <p className="text-xs text-[#9ca3af] mt-1.5">
                    La empresa podrá cambiarla después
                  </p>
                </div>
              )}
            </div>
          </div>

          {/* SECCIÓN 4 - CONFIGURACIÓN */}
          <div className="mb-8">
            <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
              <DollarSign className="w-5 h-5" />
              Configuración
            </h3>

            <div className="space-y-4">
              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Costo por guía *
                </label>
                <div className="relative">
                  <span className="absolute left-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">$</span>
                  <input
                    type="number"
                    step="0.01"
                    required
                    value={formData.costoPorGuia}
                    onChange={(e) => setFormData({ ...formData, costoPorGuia: e.target.value })}
                    placeholder="45.00"
                    className="w-full pl-8 pr-16 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  />
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">MXN</span>
                </div>
                <p className="text-xs text-[#9ca3af] mt-1.5">
                  Precio que se cobrará a esta empresa por cada guía
                </p>
              </div>

              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Guías iniciales
                </label>
                <input
                  type="number"
                  value={formData.guiasIniciales}
                  onChange={(e) => setFormData({ ...formData, guiasIniciales: e.target.value })}
                  placeholder="0"
                  className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
                <p className="text-xs text-[#9ca3af] mt-1.5">
                  Guías disponibles al crear la cuenta
                </p>
              </div>

              <div>
                <label className="block text-sm text-[#2d3748] mb-1.5">
                  Notas internas
                </label>
                <div className="relative">
                  <FileText className="absolute left-3 top-3 w-5 h-5 text-[#9ca3af]" />
                  <textarea
                    value={formData.notasInternas}
                    onChange={(e) => setFormData({ ...formData, notasInternas: e.target.value })}
                    placeholder="Notas visibles solo para administradores..."
                    rows={3}
                    className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 resize-none"
                  />
                </div>
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#9ca3af]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              {empresa ? 'Guardar Cambios' : 'Crear Empresa'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
