import { X, FileText } from 'lucide-react';
import { useState } from 'react';

interface AgregarGuiasModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (cantidad: number, motivo: string, notas: string) => void;
  empresaNombre: string;
}

export function AgregarGuiasModal({ isOpen, onClose, onSave, empresaNombre }: AgregarGuiasModalProps) {
  const [cantidad, setCantidad] = useState('');
  const [motivo, setMotivo] = useState('compra');
  const [notas, setNotas] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(parseInt(cantidad) || 0, motivo, notas);
    setCantidad('');
    setMotivo('compra');
    setNotas('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg text-[#1a365d]">Agregar Guías</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          <p className="text-sm text-[#9ca3af] mb-6">{empresaNombre}</p>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Cantidad de guías *
              </label>
              <input
                type="number"
                required
                min="1"
                value={cantidad}
                onChange={(e) => setCantidad(e.target.value)}
                placeholder="Ej: 50"
                className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
              />
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Motivo *
              </label>
              <select
                value={motivo}
                onChange={(e) => setMotivo(e.target.value)}
                className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer"
              >
                <option value="compra">Compra</option>
                <option value="bonificacion">Bonificación</option>
                <option value="ajuste">Ajuste</option>
                <option value="otro">Otro</option>
              </select>
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Notas (opcional)
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-[#9ca3af]" />
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Agregar comentarios adicionales..."
                  rows={3}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 resize-none"
                />
              </div>
            </div>

            {cantidad && (
              <div className="bg-[#00a3e0]/10 border border-[#00a3e0]/30 rounded-lg p-4">
                <p className="text-sm text-[#2d3748]">
                  <span className="text-[#1a365d]">Total a agregar:</span>{' '}
                  <span className="text-lg">{cantidad} guías</span>
                </p>
              </div>
            )}
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
              className="px-5 py-2.5 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors"
            >
              Agregar Guías
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
