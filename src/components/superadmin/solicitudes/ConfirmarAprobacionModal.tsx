import { X, CheckCircle } from 'lucide-react';

interface Solicitud {
  id: number;
  empresa: string;
  cantidad: number;
  montoTotal: number;
}

interface ConfirmarAprobacionModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
  onConfirm: () => void;
}

export function ConfirmarAprobacionModal({ 
  isOpen, 
  onClose, 
  solicitud,
  onConfirm 
}: ConfirmarAprobacionModalProps) {
  if (!isOpen || !solicitud) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg text-[#1a365d]">Confirmar Aprobación</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 text-center">
          <div className="w-16 h-16 bg-[#38a169]/10 rounded-full flex items-center justify-center mx-auto mb-4">
            <CheckCircle className="w-8 h-8 text-[#38a169]" />
          </div>

          <h3 className="text-lg text-[#1a365d] mb-2">¿Aprobar solicitud?</h3>
          
          <p className="text-sm text-[#2d3748] mb-4">
            Se agregarán <span className="text-[#1a365d]">{solicitud.cantidad} guías</span> a la cuenta de{' '}
            <span className="text-[#1a365d]">{solicitud.empresa}</span>
          </p>

          <div className="bg-[#f8fafc] rounded-lg p-4 mb-6">
            <p className="text-xs text-[#9ca3af] mb-1">Monto a facturar</p>
            <p className="text-2xl text-[#1a365d]">${solicitud.montoTotal.toFixed(2)} MXN</p>
          </div>
        </div>

        {/* Footer */}
        <div className="border-t border-[#9ca3af]/20 px-6 py-4 flex items-center justify-end gap-3">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            Cancelar
          </button>
          <button
            onClick={() => {
              onConfirm();
              onClose();
            }}
            className="px-5 py-2.5 bg-[#38a169] text-white rounded-lg hover:bg-[#2f855a] transition-colors"
          >
            Sí, Aprobar
          </button>
        </div>
      </div>
    </div>
  );
}
