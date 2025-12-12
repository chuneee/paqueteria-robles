import { AlertTriangle, X } from 'lucide-react';

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

interface ConfirmarEliminarClienteModalProps {
  isOpen: boolean;
  onClose: () => void;
  onConfirm: () => void;
  cliente: Cliente | null;
}

export function ConfirmarEliminarClienteModal({
  isOpen,
  onClose,
  onConfirm,
  cliente,
}: ConfirmarEliminarClienteModalProps) {
  if (!isOpen || !cliente) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#9ca3af]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#e53e3e]/10 rounded-full flex items-center justify-center">
              <AlertTriangle className="w-5 h-5 text-[#e53e3e]" />
            </div>
            <h3 className="text-lg text-[#1a365d]">¿Eliminar cliente?</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <p className="text-sm text-[#9ca3af] mb-4">
            Esta acción no se puede deshacer.
          </p>

          <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#9ca3af]/20">
            <p className="text-xs text-[#9ca3af] mb-1">Cliente a eliminar:</p>
            <p className="text-sm text-[#2d3748]">{cliente.razonSocial}</p>
            <p className="text-xs text-[#9ca3af] mt-1">
              {cliente.contacto} – {cliente.departamento || 'Sin departamento'}
            </p>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#9ca3af]/20 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-6 py-2.5 bg-[#e53e3e] text-white rounded-lg hover:bg-[#c53030] transition-colors"
          >
            Eliminar
          </button>
        </div>
      </div>
    </div>
  );
}
