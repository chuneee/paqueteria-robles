import { X, DollarSign, Calendar, CreditCard, FileText, Upload, Building2, AlertCircle } from 'lucide-react';
import { useState } from 'react';

interface EmpresaCobranza {
  id: number;
  nombre: string;
  saldoPendiente: number;
  ultimoPago?: {
    fecha: string;
    monto: number;
  };
}

interface RegistrarPagoCobranzaModalProps {
  isOpen: boolean;
  onClose: () => void;
  empresa: EmpresaCobranza | null;
  onSave: (pagoData: {
    empresaId: number;
    monto: number;
    fecha: string;
    metodo: string;
    referencia: string;
    notas: string;
  }) => void;
}

export function RegistrarPagoCobranzaModal({ 
  isOpen, 
  onClose, 
  empresa,
  onSave 
}: RegistrarPagoCobranzaModalProps) {
  const [monto, setMonto] = useState('');
  const [fecha, setFecha] = useState(new Date().toISOString().split('T')[0]);
  const [metodo, setMetodo] = useState('transferencia');
  const [referencia, setReferencia] = useState('');
  const [notas, setNotas] = useState('');
  const [archivo, setArchivo] = useState<File | null>(null);

  const handlePagoCompleto = () => {
    if (empresa) {
      setMonto(empresa.saldoPendiente.toFixed(2));
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (empresa) {
      onSave({
        empresaId: empresa.id,
        monto: parseFloat(monto) || 0,
        fecha,
        metodo,
        referencia,
        notas,
      });
      // Reset form
      setMonto('');
      setFecha(new Date().toISOString().split('T')[0]);
      setMetodo('transferencia');
      setReferencia('');
      setNotas('');
      setArchivo(null);
    }
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files && e.target.files[0]) {
      setArchivo(e.target.files[0]);
    }
  };

  if (!isOpen || !empresa) return null;

  const nuevoSaldo = empresa.saldoPendiente - (parseFloat(monto) || 0);
  const requiereReferencia = metodo === 'transferencia' || metodo === 'cheque';

  const metodosIcons = {
    transferencia: '🏦',
    efectivo: '💵',
    cheque: '📄',
    deposito: '🏧',
    otro: '💳'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg text-[#1a365d]">Registrar Pago</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Info de la empresa */}
          <div className="bg-[#f8fafc] rounded-lg p-4 mb-6 space-y-2">
            <div className="flex items-start gap-2">
              <Building2 className="w-5 h-5 text-[#9ca3af] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Empresa</p>
                <p className="text-sm text-[#2d3748]">{empresa.nombre}</p>
              </div>
            </div>
            <div className="flex items-start gap-2">
              <AlertCircle className="w-5 h-5 text-[#e53e3e] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Saldo pendiente</p>
                <p className="text-xl text-[#e53e3e]">${empresa.saldoPendiente.toFixed(2)} MXN</p>
              </div>
            </div>
            {empresa.ultimoPago && (
              <div className="flex justify-between pt-2 border-t border-[#9ca3af]/20">
                <span className="text-xs text-[#9ca3af]">Último pago:</span>
                <span className="text-xs text-[#2d3748]">
                  {empresa.ultimoPago.fecha} - ${empresa.ultimoPago.monto.toFixed(2)}
                </span>
              </div>
            )}
          </div>

          <div className="space-y-4">
            {/* Monto */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Monto recibido *
              </label>
              <div className="flex gap-2">
                <div className="relative flex-1">
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
                  <span className="absolute right-3 top-1/2 -translate-y-1/2 text-sm text-[#9ca3af]">
                    MXN
                  </span>
                </div>
                <button
                  type="button"
                  onClick={handlePagoCompleto}
                  className="px-4 py-2.5 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors whitespace-nowrap text-sm"
                >
                  Pago completo
                </button>
              </div>
            </div>

            {/* Fecha */}
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

            {/* Método de pago */}
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
                  <option value="transferencia">🏦 Transferencia bancaria</option>
                  <option value="efectivo">💵 Efectivo</option>
                  <option value="cheque">📄 Cheque</option>
                  <option value="deposito">🏧 Depósito</option>
                  <option value="otro">💳 Otro</option>
                </select>
              </div>
            </div>

            {/* Referencia */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Referencia / No. de operación {requiereReferencia && '*'}
              </label>
              <input
                type="text"
                required={requiereReferencia}
                value={referencia}
                onChange={(e) => setReferencia(e.target.value)}
                placeholder="Ej: REF-12345, No. de cheque, etc."
                className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
              />
            </div>

            {/* Adjuntar comprobante */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Adjuntar comprobante
              </label>
              <div className="border-2 border-dashed border-[#9ca3af]/30 rounded-lg p-6 text-center hover:border-[#00a3e0] transition-colors">
                <input
                  type="file"
                  id="file-upload"
                  accept=".jpg,.jpeg,.png,.pdf"
                  onChange={handleFileChange}
                  className="hidden"
                />
                <label htmlFor="file-upload" className="cursor-pointer">
                  <Upload className="w-8 h-8 text-[#9ca3af] mx-auto mb-2" />
                  <p className="text-sm text-[#2d3748] mb-1">
                    {archivo ? archivo.name : 'Arrastra una imagen o haz clic para seleccionar'}
                  </p>
                  <p className="text-xs text-[#9ca3af]">JPG, PNG, PDF (máx 5MB)</p>
                </label>
              </div>
            </div>

            {/* Notas */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Notas
              </label>
              <div className="relative">
                <FileText className="absolute left-3 top-3 w-5 h-5 text-[#9ca3af]" />
                <textarea
                  value={notas}
                  onChange={(e) => setNotas(e.target.value)}
                  placeholder="Observaciones del pago..."
                  rows={3}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 resize-none"
                />
              </div>
            </div>

            {/* Resumen */}
            {monto && parseFloat(monto) > 0 && (
              <div className="bg-[#00a3e0]/10 border border-[#00a3e0]/30 rounded-lg p-4">
                <div className="space-y-2">
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2d3748]">Saldo actual:</span>
                    <span className="text-[#e53e3e]">${empresa.saldoPendiente.toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between text-sm">
                    <span className="text-[#2d3748]">Pago a registrar:</span>
                    <span className="text-[#1a365d]">- ${parseFloat(monto).toFixed(2)}</span>
                  </div>
                  <div className="flex justify-between pt-2 border-t border-[#00a3e0]/30">
                    <span className="text-sm text-[#1a365d]">Nuevo saldo:</span>
                    <span className={`text-lg ${nuevoSaldo <= 0 ? 'text-[#38a169]' : 'text-[#e53e3e]'}`}>
                      ${Math.max(0, nuevoSaldo).toFixed(2)}
                    </span>
                  </div>
                </div>
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
