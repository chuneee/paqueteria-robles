import { useState, useEffect } from 'react';
import { X, Mail, Phone, Lock, Eye, EyeOff } from 'lucide-react';
import { Administrador } from './AdminTable';

interface AdminModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (admin: Partial<Administrador> & { password?: string }) => void;
  admin?: Administrador | null;
}

export function AdminModal({ isOpen, onClose, onSave, admin }: AdminModalProps) {
  const [formData, setFormData] = useState({
    nombre: '',
    correo: '',
    telefono: '',
    password: '',
    confirmPassword: '',
    estado: 'activo' as 'activo' | 'inactivo',
    changePassword: false,
  });

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  useEffect(() => {
    if (admin) {
      setFormData({
        nombre: admin.nombre,
        correo: admin.correo,
        telefono: admin.telefono,
        password: '',
        confirmPassword: '',
        estado: admin.estado,
        changePassword: false,
      });
    } else {
      setFormData({
        nombre: '',
        correo: '',
        telefono: '',
        password: '',
        confirmPassword: '',
        estado: 'activo',
        changePassword: false,
      });
    }
    setErrors({});
  }, [admin, isOpen]);

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!formData.nombre.trim()) {
      newErrors.nombre = 'El nombre es requerido';
    }

    if (!formData.correo.trim()) {
      newErrors.correo = 'El correo es requerido';
    } else if (!/\S+@\S+\.\S+/.test(formData.correo)) {
      newErrors.correo = 'El correo no es válido';
    }

    if (!formData.telefono.trim()) {
      newErrors.telefono = 'El teléfono es requerido';
    }

    // Validar contraseña solo si es nuevo admin o si se marcó cambiar contraseña
    if (!admin || formData.changePassword) {
      if (!formData.password) {
        newErrors.password = 'La contraseña es requerida';
      } else if (formData.password.length < 8) {
        newErrors.password = 'La contraseña debe tener mínimo 8 caracteres';
      }

      if (formData.password !== formData.confirmPassword) {
        newErrors.confirmPassword = 'Las contraseñas no coinciden';
      }
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      const dataToSave: any = {
        nombre: formData.nombre,
        correo: formData.correo,
        telefono: formData.telefono,
        estado: formData.estado,
      };

      if (!admin || formData.changePassword) {
        dataToSave.password = formData.password;
      }

      onSave(dataToSave);
      onClose();
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/50 backdrop-blur-sm">
      <div className="bg-white rounded-2xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#e5e7eb] px-6 py-4 flex items-center justify-between rounded-t-2xl">
          <h2 className="text-xl text-[#1a365d]">
            {admin ? 'Editar Administrador' : 'Nuevo Administrador'}
          </h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6 space-y-5">
          {/* Nombre completo */}
          <div>
            <label htmlFor="nombre" className="block text-sm text-[#2d3748] mb-2">
              Nombre completo <span className="text-[#e53e3e]">*</span>
            </label>
            <input
              type="text"
              id="nombre"
              value={formData.nombre}
              onChange={(e) => setFormData({ ...formData, nombre: e.target.value })}
              className={`w-full h-12 px-4 border rounded-lg focus:outline-none transition-colors ${
                errors.nombre
                  ? 'border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20'
                  : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20'
              }`}
              placeholder="Ej: Juan Pérez García"
            />
            {errors.nombre && (
              <p className="text-xs text-[#e53e3e] mt-1">{errors.nombre}</p>
            )}
          </div>

          {/* Correo electrónico */}
          <div>
            <label htmlFor="correo" className="block text-sm text-[#2d3748] mb-2">
              Correo electrónico <span className="text-[#e53e3e]">*</span>
            </label>
            <div className="relative">
              <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <input
                type="email"
                id="correo"
                value={formData.correo}
                onChange={(e) => setFormData({ ...formData, correo: e.target.value })}
                className={`w-full h-12 pl-12 pr-4 border rounded-lg focus:outline-none transition-colors ${
                  errors.correo
                    ? 'border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20'
                    : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20'
                }`}
                placeholder="correo@ejemplo.com"
              />
            </div>
            {errors.correo && (
              <p className="text-xs text-[#e53e3e] mt-1">{errors.correo}</p>
            )}
            <p className="text-xs text-[#9ca3af] mt-1">Este será el usuario para iniciar sesión</p>
          </div>

          {/* Teléfono */}
          <div>
            <label htmlFor="telefono" className="block text-sm text-[#2d3748] mb-2">
              Teléfono <span className="text-[#e53e3e]">*</span>
            </label>
            <div className="relative">
              <Phone className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
              <input
                type="tel"
                id="telefono"
                value={formData.telefono}
                onChange={(e) => setFormData({ ...formData, telefono: e.target.value })}
                className={`w-full h-12 pl-12 pr-4 border rounded-lg focus:outline-none transition-colors ${
                  errors.telefono
                    ? 'border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20'
                    : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20'
                }`}
                placeholder="662 123 4567"
              />
            </div>
            {errors.telefono && (
              <p className="text-xs text-[#e53e3e] mt-1">{errors.telefono}</p>
            )}
          </div>

          {/* Cambiar contraseña checkbox (solo en edición) */}
          {admin && (
            <div className="flex items-center gap-2">
              <input
                type="checkbox"
                id="changePassword"
                checked={formData.changePassword}
                onChange={(e) => setFormData({ ...formData, changePassword: e.target.checked })}
                className="w-4 h-4 rounded border-[#9ca3af]/50 text-[#00a3e0] focus:ring-[#00a3e0]"
              />
              <label htmlFor="changePassword" className="text-sm text-[#2d3748] cursor-pointer">
                Cambiar contraseña
              </label>
            </div>
          )}

          {/* Contraseña (solo si es nuevo o si se marca cambiar) */}
          {(!admin || formData.changePassword) && (
            <>
              <div>
                <label htmlFor="password" className="block text-sm text-[#2d3748] mb-2">
                  Contraseña <span className="text-[#e53e3e]">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type={showPassword ? 'text' : 'password'}
                    id="password"
                    value={formData.password}
                    onChange={(e) => setFormData({ ...formData, password: e.target.value })}
                    className={`w-full h-12 pl-12 pr-12 border rounded-lg focus:outline-none transition-colors ${
                      errors.password
                        ? 'border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20'
                        : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20'
                    }`}
                    placeholder="Mínimo 8 caracteres"
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748]"
                  >
                    {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.password && (
                  <p className="text-xs text-[#e53e3e] mt-1">{errors.password}</p>
                )}
              </div>

              <div>
                <label htmlFor="confirmPassword" className="block text-sm text-[#2d3748] mb-2">
                  Confirmar contraseña <span className="text-[#e53e3e]">*</span>
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    id="confirmPassword"
                    value={formData.confirmPassword}
                    onChange={(e) => setFormData({ ...formData, confirmPassword: e.target.value })}
                    className={`w-full h-12 pl-12 pr-12 border rounded-lg focus:outline-none transition-colors ${
                      errors.confirmPassword
                        ? 'border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20'
                        : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20'
                    }`}
                    placeholder="Confirma tu contraseña"
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748]"
                  >
                    {showConfirmPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                  </button>
                </div>
                {errors.confirmPassword && (
                  <p className="text-xs text-[#e53e3e] mt-1">{errors.confirmPassword}</p>
                )}
              </div>
            </>
          )}

          {/* Estado (solo en edición) */}
          {admin && (
            <div>
              <label className="block text-sm text-[#2d3748] mb-3">Estado</label>
              <div className="flex items-center gap-4">
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estado"
                    value="activo"
                    checked={formData.estado === 'activo'}
                    onChange={(e) => setFormData({ ...formData, estado: 'activo' })}
                    className="w-4 h-4 text-[#00a3e0] focus:ring-[#00a3e0]"
                  />
                  <span className="text-sm text-[#2d3748]">Activo</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer">
                  <input
                    type="radio"
                    name="estado"
                    value="inactivo"
                    checked={formData.estado === 'inactivo'}
                    onChange={(e) => setFormData({ ...formData, estado: 'inactivo' })}
                    className="w-4 h-4 text-[#00a3e0] focus:ring-[#00a3e0]"
                  />
                  <span className="text-sm text-[#2d3748]">Inactivo</span>
                </label>
              </div>
            </div>
          )}

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 pt-4 border-t border-[#e5e7eb]">
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
              Guardar Administrador
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
