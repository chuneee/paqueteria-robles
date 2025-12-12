import { X, XCircle, AlertTriangle } from 'lucide-react';
import { useState } from 'react';

interface Solicitud {
  id: number;
  empresa: string;
}

interface RechazarSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
  onConfirm: (motivo: string, comentarios: string) => void;
}

export function RechazarSolicitudModal({ 
  isOpen, 
  onClose, 
  solicitud,
  onConfirm 
}: RechazarSolicitudModalProps) {
  const [motivo, setMotivo] = useState('saldo_pendiente');
  const [comentarios, setComentarios] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const motivoTexto = motivos.find(m => m.value === motivo)?.label || motivo;
    onConfirm(motivoTexto, comentarios);
    onClose();
    setMotivo('saldo_pendiente');
    setComentarios('');
  };

  if (!isOpen || !solicitud) return null;

  const motivos = [
    { value: 'saldo_pendiente', label: 'Saldo pendiente de pago' },
    { value: 'info_incompleta', label: 'Información incompleta' },
    { value: 'limite_credito', label: 'Límite de crédito alcanzado' },
    { value: 'otro', label: 'Otro (especificar)' },
  ];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg text-[#1a365d]">Rechazar Solicitud</h2>
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
              <XCircle className="w-8 h-8 text-[#e53e3e]" />
            </div>

            <p className="text-sm text-[#2d3748]">
              Indica el motivo del rechazo para notificar a{' '}
              <span className="text-[#1a365d]">{solicitud.empresa}</span>
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Motivo del rechazo *
              </label>
              <div className="relative">
                <AlertTriangle className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <select
                  required
                  value={motivo}
                  onChange={(e) => setMotivo(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20 appearance-none bg-white cursor-pointer"
                >
                  {motivos.map((m) => (
                    <option key={m.value} value={m.value}>
                      {m.label}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Comentarios adicionales
              </label>
              <textarea
                value={comentarios}
                onChange={(e) => setComentarios(e.target.value)}
                placeholder="Detalles adicionales para la empresa..."
                rows={4}
                className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#e53e3e] focus:ring-2 focus:ring-[#e53e3e]/20 resize-none"
              />
            </div>
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
              Confirmar Rechazo
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
