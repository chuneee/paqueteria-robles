import { X, DollarSign, Calendar, CreditCard, FileText, Upload } from 'lucide-react';
import { useState } from 'react';

interface RegistrarPagoModalProps {
  isOpen: boolean;
  onClose: () => void;
  onSave: (pagoData: {
    monto: number;
    fecha: string;
    metodo: string;
    referencia: string;
    notas: string;
  }) => void;
  empresaNombre: string;
  saldoPendiente: number;
}

export function RegistrarPagoModal({ 
  isOpen, 
  onClose, 
  onSave, 
  empresaNombre,
  saldoPendiente 
}: RegistrarPagoModalProps) {
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState('');
  const [metodo, setMetodo] = useState('transferencia');
  const [referencia, setReferencia] = useState('');
  const [notas, setNotas] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave({
      monto: parseFloat(monto) || 0,
      fecha,
      metodo,
      referencia,
      notas,
    });
    setMonto('');
    setFecha('');
    setMetodo('transferencia');
    setReferencia('');
    setNotas('');
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg text-[#1a365d]">Registrar Pago</h2>
            <p className="text-sm text-[#9ca3af] mt-0.5">{empresaNombre}</p>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Saldo Pendiente */}
          <div className="bg-[#e53e3e]/10 border border-[#e53e3e]/30 rounded-lg p-4 mb-6">
            <p className="text-sm text-[#2d3748] mb-1">Saldo pendiente actual</p>
            <p className="text-2xl text-[#e53e3e]">
              ${saldoPendiente.toFixed(2)} MXN
            </p>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Monto recibido *
              </label>
              <div className="relative">
                <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="number"
                  step="0.01"
                  required
                  min="0.01"
                  value={monto}
                  onChange={(e) => setMonto(e.target.value)}
                  placeholder="0.00"
                  className="w-full pl-11 pr-16 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
                <span className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af]">
                  MXN
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Fecha de pago *
              </label>
              <div className="relative">
                <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="date"
                  required
                  value={fecha}
                  onChange={(e) => setFecha(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Método de pago *
              </label>
              <div className="relative">
                <CreditCard className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <select
                  value={metodo}
                  onChange={(e) => setMetodo(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer"
                >
                  <option value="transferencia">Transferencia</option>
                  <option value="efectivo">Efectivo</option>
                  <option value="cheque">Cheque</option>
                  <option value="otro">Otro</option>
                </select>
              </div>
            </div>

            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Referencia/Comprobante
              </label>
              <input
                type="text"
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej: REF-78542"
                className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
              />
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

            <div className="border border-[#9ca3af]/30 rounded-lg p-4">
              <label className="flex items-center gap-3 cursor-pointer">
                <input type="checkbox" className="w-4 h-4 text-[#00a3e0]" />
                <div className="flex items-center gap-2 text-sm text-[#2d3748]">
                  <Upload className="w-4 h-4 text-[#9ca3af]" />
                  Adjuntar comprobante
                </div>
              </label>
            </div>

            {monto && parseFloat(monto) > 0 && (
              <div className="bg-[#38a169]/10 border border-[#38a169]/30 rounded-lg p-4">
                <p className="text-sm text-[#2d3748] mb-1">Nuevo saldo pendiente</p>
                <p className="text-xl text-[#38a169]">
                  ${(saldoPendiente - parseFloat(monto)).toFixed(2)} MXN
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
              className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              Registrar Pago
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
