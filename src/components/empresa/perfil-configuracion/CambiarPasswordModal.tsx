import { X, Lock, Eye, EyeOff, AlertCircle, CheckCircle } from 'lucide-react';
import { useState } from 'react';

interface CambiarPasswordModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: (currentPassword: string, newPassword: string) => void;
}

export function CambiarPasswordModal({ isOpen, onClose, onConfirm }: CambiarPasswordModalProps) {
  const [currentPassword, setCurrentPassword] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [showCurrent, setShowCurrent] = useState(false);
  const [showNew, setShowNew] = useState(false);
  const [showConfirm, setShowConfirm] = useState(false);
  const [errors, setErrors] = useState<Record<string, string>>({});

  if (!isOpen) return null;

  const validate = () => {
    const newErrors: Record<string, string> = {};

    if (!currentPassword.trim()) {
      newErrors.currentPassword = 'Ingresa tu contraseña actual';
    }

    if (!newPassword.trim()) {
      newErrors.newPassword = 'Ingresa una nueva contraseña';
    } else if (newPassword.length < 8) {
      newErrors.newPassword = 'La contraseña debe tener al menos 8 caracteres';
    }

    if (!confirmPassword.trim()) {
      newErrors.confirmPassword = 'Confirma tu nueva contraseña';
    } else if (newPassword !== confirmPassword) {
      newErrors.confirmPassword = 'Las contraseñas no coinciden';
    }

    if (currentPassword === newPassword && currentPassword.trim()) {
      newErrors.newPassword = 'La nueva contraseña debe ser diferente a la actual';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (validate()) {
      onConfirm(currentPassword, newPassword);
      setCurrentPassword('');
      setNewPassword('');
      setConfirmPassword('');
      setErrors({});
    }
  };

  const handleClose = () => {
    setCurrentPassword('');
    setNewPassword('');
    setConfirmPassword('');
    setErrors({});
    onClose();
  };

  const passwordStrength = (password: string) => {
    if (password.length === 0) return { level: 0, label: '', color: '' };
    if (password.length < 6) return { level: 1, label: 'Débil', color: 'bg-[#e53e3e]' };
    if (password.length < 8) return { level: 2, label: 'Media', color: 'bg-[#d69e2e]' };
    if (password.length < 12) return { level: 3, label: 'Buena', color: 'bg-[#38a169]' };
    return { level: 4, label: 'Excelente', color: 'bg-[#38a169]' };
  };

  const strength = passwordStrength(newPassword);

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#9ca3af]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#1a365d]/10 rounded-full flex items-center justify-center">
              <Lock className="w-5 h-5 text-[#1a365d]" />
            </div>
            <h3 className="text-lg text-[#1a365d]">Cambiar Contraseña</h3>
          </div>
          <button
            onClick={handleClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit}>
          <div className="p-6 space-y-4">
            {/* Contraseña Actual */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-2">
                Contraseña actual <span className="text-[#e53e3e]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showCurrent ? 'text' : 'password'}
                  value={currentPassword}
                  onChange={(e) => {
                    setCurrentPassword(e.target.value);
                    if (errors.currentPassword) {
                      setErrors(prev => ({ ...prev, currentPassword: '' }));
                    }
                  }}
                  placeholder="Ingresa tu contraseña actual"
                  className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.currentPassword
                      ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                      : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowCurrent(!showCurrent)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748] transition-colors"
                >
                  {showCurrent ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.currentPassword && (
                <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.currentPassword}
                </p>
              )}
            </div>

            {/* Nueva Contraseña */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-2">
                Nueva contraseña <span className="text-[#e53e3e]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showNew ? 'text' : 'password'}
                  value={newPassword}
                  onChange={(e) => {
                    setNewPassword(e.target.value);
                    if (errors.newPassword) {
                      setErrors(prev => ({ ...prev, newPassword: '' }));
                    }
                  }}
                  placeholder="Mínimo 8 caracteres"
                  className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.newPassword
                      ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                      : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowNew(!showNew)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748] transition-colors"
                >
                  {showNew ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.newPassword && (
                <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.newPassword}
                </p>
              )}
              {newPassword && !errors.newPassword && (
                <div className="mt-2">
                  <div className="flex items-center gap-2 mb-1">
                    <div className="flex-1 h-1.5 bg-[#f8fafc] rounded-full overflow-hidden">
                      <div 
                        className={`h-full transition-all ${strength.color}`}
                        style={{ width: `${(strength.level / 4) * 100}%` }}
                      />
                    </div>
                    <span className={`text-xs ${strength.level >= 3 ? 'text-[#38a169]' : strength.level === 2 ? 'text-[#d69e2e]' : 'text-[#e53e3e]'}`}>
                      {strength.label}
                    </span>
                  </div>
                </div>
              )}
            </div>

            {/* Confirmar Contraseña */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-2">
                Confirmar nueva contraseña <span className="text-[#e53e3e]">*</span>
              </label>
              <div className="relative">
                <input
                  type={showConfirm ? 'text' : 'password'}
                  value={confirmPassword}
                  onChange={(e) => {
                    setConfirmPassword(e.target.value);
                    if (errors.confirmPassword) {
                      setErrors(prev => ({ ...prev, confirmPassword: '' }));
                    }
                  }}
                  placeholder="Repite la nueva contraseña"
                  className={`w-full px-4 py-2.5 pr-10 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                    errors.confirmPassword
                      ? 'border-[#e53e3e] focus:ring-[#e53e3e]/20'
                      : confirmPassword && newPassword === confirmPassword
                      ? 'border-[#38a169] focus:ring-[#38a169]/20'
                      : 'border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20'
                  }`}
                />
                <button
                  type="button"
                  onClick={() => setShowConfirm(!showConfirm)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748] transition-colors"
                >
                  {showConfirm ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
                </button>
              </div>
              {errors.confirmPassword && (
                <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors.confirmPassword}
                </p>
              )}
              {confirmPassword && newPassword === confirmPassword && !errors.confirmPassword && (
                <p className="text-xs text-[#38a169] mt-1 flex items-center gap-1">
                  <CheckCircle className="w-3 h-3" />
                  Las contraseñas coinciden
                </p>
              )}
            </div>

            {/* Mensaje informativo */}
            <div className="bg-[#00a3e0]/5 rounded-lg p-4 border border-[#00a3e0]/20">
              <p className="text-xs text-[#2d3748]">
                <strong>Recomendaciones:</strong>
              </p>
              <ul className="text-xs text-[#9ca3af] mt-2 space-y-1 ml-4 list-disc">
                <li>Usa al menos 8 caracteres</li>
                <li>Incluye mayúsculas y minúsculas</li>
                <li>Agrega números y símbolos</li>
              </ul>
            </div>
          </div>

          {/* Footer */}
          <div className="px-6 py-4 border-t border-[#9ca3af]/20 flex gap-3 justify-end">
            <button
              type="button"
              onClick={handleClose}
              className="px-6 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              Cambiar Contraseña
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
