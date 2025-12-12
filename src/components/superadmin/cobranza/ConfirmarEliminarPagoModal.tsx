import { X, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Pago {
  id: number;
  empresa: string;
  monto: number;
}

interface ConfirmarEliminarPagoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pago: Pago | null;
  onConfirm: (motivo: string) => void;
}

export function ConfirmarEliminarPagoModal({ 
  isOpen, 
  onClose, 
  pago,
  onConfirm 
}: ConfirmarEliminarPagoModalProps) {
  const [motivo, setMotivo] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onConfirm(motivo);
    setMotivo('');
    onClose();
  };

  if (!isOpen || !pago) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg text-[#1a365d]">Eliminar Pago</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          <div className="text-center mb-6">
            <div className="w-16 h-16 bg-[#e53e3e]/10 rounded-full flex items-center justify-center mx-auto mb-4">
              <AlertTriangle className="w-8 h-8 text-[#e53e3e]" />
            </div>

            <h3 className="text-lg text-[#1a365d] mb-2">¿Eliminar este pago?</h3>
            
            <p className="text-sm text-[#2d3748] mb-4">
              Esta acción no se puede deshacer. El saldo de la empresa será recalculado.
            </p>

            <div className="bg-[#f8fafc] rounded-lg p-3 mb-4">
              <p className="text-sm text-[#2d3748]">
                Pago de <span className="text-[#1a365d]">${pago.monto.toFixed(2)}</span> a{' '}
                <span className="text-[#1a365d]">{pago.empresa}</span>
              </p>
            </div>
          </div>

          <div>
            <label className="block text-sm text-[#2d3748] mb-1.5">
              Motivo de eliminación *
            </label>
            <textarea
              required
              value={motivo}
              onChange={(e) => setMotivo(e.target.value)}
              placeholder="Explica por qué se elimina este registro..."
              rows={4}
              className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20 resize-none"
            />
          </div>

          {/* Footer */}
          <div className="flex items-center justify-end gap-3 mt-6 pt-4 border-t border-[#9ca3af]/20">
            <button
              type="button"
              onClick={onClose}
              className="px-5 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
            >
              Cancelar
            </button>
            <button
              type="submit"
              className="px-5 py-2.5 bg-[#e53e3e] text-white rounded-lg hover:bg-[#c53030] transition-colors"
            >
              Sí, Eliminar
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
