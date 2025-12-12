import { useState, useEffect } from 'react';
import { X, User, MapPin, Phone, FileText, AlertCircle } from 'lucide-react';

interface Cliente {
  id: number;
  razonSocial: string;
  contacto: string;
  departamento: string;
  calle: string;
  numero: string;
  colonia: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  pais: string;
  telefono: string;
  notas?: string;
}

interface NuevoClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cliente: Omit<Cliente, 'id'>) => void;
  clienteToEdit?: Cliente | null;
}

export function NuevoClienteModal({ isOpen, onClose, onSave, clienteToEdit }: NuevoClienteModalProps) {
  const [formData, setFormData] = useState({
    razonSocial: '',
    contacto: '',
    departamento: '',
    calle: '',
    numero: '',
    colonia: '',
    codigoPostal: '',
    ciudad: '',
    estado: '',
    pais: 'México',
    telefono: '',
    notas: '',
  });

  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (clienteToEdit) {
      setFormData({
        razonSocial: clienteToEdit.razonSocial,
        contacto: clienteToEdit.contacto,
        departamento: clienteToEdit.departamento,
        calle: clienteToEdit.calle,
        numero: clienteToEdit.numero,
        colonia: clienteToEdit.colonia,
        codigoPostal: clienteToEdit.codigoPostal,
        ciudad: clienteToEdit.ciudad,
        estado: clienteToEdit.estado,
        pais: clienteToEdit.pais,
        telefono: clienteToEdit.telefono,
        notas: clienteToEdit.notas || '',
      });
    } else {
      setFormData({
        razonSocial: '',
        contacto: '',
        departamento: '',
        calle: '',
        numero: '',
        colonia: '',
        codigoPostal: '',
        ciudad: '',
        estado: '',
        pais: 'México',
        telefono: '',
        notas: '',
      });
    }
    setErrors({});
  }, [clienteToEdit, isOpen]);

  const handleChange = (field: string, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => ({ ...prev, [field]: '' }));
    }
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.razonSocial.trim()) {
      newErrors.razonSocial = 'Campo requerido';
    }
    if (!formData.contacto.trim()) {
      newErrors.contacto = 'Campo requerido';
    }
    if (!formData.telefono.trim()) {
      newErrors.telefono = 'Campo requerido';
    }
    if (!formData.calle.trim()) {
      newErrors.calle = 'Campo requerido';
    }
    if (!formData.ciudad.trim()) {
      newErrors.ciudad = 'Campo requerido';
    }
    if (!formData.estado.trim()) {
      newErrors.estado = 'Campo requerido';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!validate()) {
      return;
    }

    onSave(formData);
    onClose();
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg text-[#1a365d]">
            {clienteToEdit ? 'Editar Cliente Destinatario' : 'Nuevo Cliente Destinatario'}
          </h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="space-y-6">
            {/* Información General */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <User className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Información General</h4>
              </div>
              
              <div className="space-y-4">
                {/* Razón Social */}
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Razón social / Nombre <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={formData.razonSocial}
                    onChange={(e) => handleChange('razonSocial', e.target.value)}
                    placeholder="Ej. Comercial López"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors.razonSocial
                        ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                        : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                    }`}
                  />
                  {errors.razonSocial && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.razonSocial}
                    </p>
                  )}
                </div>

                {/* Contacto y Departamento */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Nombre de contacto <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.contacto}
                      onChange={(e) => handleChange('contacto', e.target.value)}
                      placeholder="Ej. Ana Ramírez"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.contacto
                          ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                          : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                      }`}
                    />
                    {errors.contacto && (
                      <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.contacto}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Departamento
                    </label>
                    <input
                      type="text"
                      value={formData.departamento}
                      onChange={(e) => handleChange('departamento', e.target.value)}
                      placeholder="Ej. Ventas"
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Teléfono */}
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Teléfono <span className="text-[#e53e3e]">*</span>
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="tel"
                      value={formData.telefono}
                      onChange={(e) => handleChange('telefono', e.target.value)}
                      placeholder="662-345-8790"
                      className={`w-full pl-10 pr-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.telefono
                          ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                          : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                      }`}
                    />
                  </div>
                  {errors.telefono && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors.telefono}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* Dirección */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <MapPin className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Dirección Completa</h4>
              </div>
              
              <div className="space-y-4">
                {/* Calle y Número */}
                <div className="grid grid-cols-3 gap-4">
                  <div className="col-span-2">
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Calle <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.calle}
                      onChange={(e) => handleChange('calle', e.target.value)}
                      placeholder="Ej. Calle 23"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.calle
                          ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                          : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                      }`}
                    />
                    {errors.calle && (
                      <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.calle}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Número
                    </label>
                    <input
                      type="text"
                      value={formData.numero}
                      onChange={(e) => handleChange('numero', e.target.value)}
                      placeholder="102"
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Colonia y CP */}
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Colonia
                    </label>
                    <input
                      type="text"
                      value={formData.colonia}
                      onChange={(e) => handleChange('colonia', e.target.value)}
                      placeholder="Ej. Centro"
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Código Postal
                    </label>
                    <input
                      type="text"
                      value={formData.codigoPostal}
                      onChange={(e) => handleChange('codigoPostal', e.target.value)}
                      placeholder="83000"
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>
                </div>

                {/* Ciudad, Estado, País */}
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Ciudad <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.ciudad}
                      onChange={(e) => handleChange('ciudad', e.target.value)}
                      placeholder="Hermosillo"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.ciudad
                          ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                          : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                      }`}
                    />
                    {errors.ciudad && (
                      <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.ciudad}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Estado <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={formData.estado}
                      onChange={(e) => handleChange('estado', e.target.value)}
                      placeholder="Sonora"
                      className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        errors.estado
                          ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                          : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                      }`}
                    />
                    {errors.estado && (
                      <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                        <AlertCircle className="w-3 h-3" />
                        {errors.estado}
                      </p>
                    )}
                  </div>
                  <div>
                    <label className="block text-sm text-[#2d3748] mb-2">
                      País
                    </label>
                    <input
                      type="text"
                      value={formData.pais}
                      onChange={(e) => handleChange('pais', e.target.value)}
                      placeholder="México"
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Notas */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <FileText className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Información Adicional</h4>
              </div>
              
              <div>
                <label className="block text-sm text-[#2d3748] mb-2">
                  Notas
                </label>
                <textarea
                  value={formData.notas}
                  onChange={(e) => handleChange('notas', e.target.value)}
                  placeholder="Información adicional sobre el cliente..."
                  rows={3}
                  className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all resize-none"
                />
              </div>
            </div>
          </div>

          {/* Footer */}
          <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 pt-6 mt-6 -mx-6 px-6 -mb-6 pb-6 flex gap-3 justify-end">
            <button
              type="button"
              onClick={onClose}
              className="px-6 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              {clienteToEdit ? 'Guardar Cambios' : 'Guardar Cliente'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
