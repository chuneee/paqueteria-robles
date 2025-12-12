import { X, Building2, Calendar, DollarSign, CreditCard, FileText, User, Download, Edit, Trash2 } from 'lucide-react';

interface Pago {
  id: number;
  empresa: string;
  monto: number;
  fecha: string;
  metodo: string;
  referencia: string;
  registradoPor: string;
  fechaRegistro: string;
  notas?: string;
  comprobante?: string;
}

interface DetallePagoModalProps {
  isOpen: boolean;
  onClose: () => void;
  pago: Pago | null;
  onEliminar?: (pago: Pago) => void;
}

export function DetallePagoModal({ 
  isOpen, 
  onClose, 
  pago,
  onEliminar 
}: DetallePagoModalProps) {
  if (!isOpen || !pago) return null;

  const metodosTexto: { [key: string]: string } = {
    transferencia: 'Transferencia bancaria',
    efectivo: 'Efectivo',
    cheque: 'Cheque',
    deposito: 'Depósito bancario',
    otro: 'Otro'
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <h2 className="text-lg text-[#1a365d]">Detalle de Pago</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información del pago */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <Building2 className="w-5 h-5 text-[#9ca3af] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Empresa</p>
                <p className="text-sm text-[#2d3748]">{pago.empresa}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <Calendar className="w-5 h-5 text-[#9ca3af] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Fecha de pago</p>
                <p className="text-sm text-[#2d3748]">{pago.fecha}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <DollarSign className="w-5 h-5 text-[#38a169] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Monto</p>
                <p className="text-2xl text-[#38a169]">${pago.monto.toFixed(2)} MXN</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <CreditCard className="w-5 h-5 text-[#9ca3af] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Método de pago</p>
                <p className="text-sm text-[#2d3748]">{metodosTexto[pago.metodo] || pago.metodo}</p>
              </div>
            </div>

            {pago.referencia && (
              <div className="flex items-start gap-3">
                <FileText className="w-5 h-5 text-[#9ca3af] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-[#9ca3af]">Referencia</p>
                  <p className="text-sm text-[#2d3748]">{pago.referencia}</p>
                </div>
              </div>
            )}

            <div className="flex items-start gap-3">
              <User className="w-5 h-5 text-[#9ca3af] mt-0.5" />
              <div className="flex-1">
                <p className="text-xs text-[#9ca3af]">Registrado por</p>
                <p className="text-sm text-[#2d3748]">{pago.registradoPor}</p>
                <p className="text-xs text-[#9ca3af] mt-0.5">
                  Fecha de registro: {pago.fechaRegistro}
                </p>
              </div>
            </div>

            {pago.notas && (
              <div className="bg-[#f8fafc] rounded-lg p-4">
                <p className="text-xs text-[#9ca3af] mb-1">Notas</p>
                <p className="text-sm text-[#2d3748]">{pago.notas}</p>
              </div>
            )}
          </div>

          {/* Comprobante */}
          {pago.comprobante && (
            <div>
              <p className="text-sm text-[#1a365d] mb-3">Comprobante</p>
              <div className="border border-[#9ca3af]/30 rounded-lg p-4">
                <div className="flex items-center justify-between">
                  <div className="flex items-center gap-3">
                    <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                      <FileText className="w-6 h-6 text-[#00a3e0]" />
                    </div>
                    <div>
                      <p className="text-sm text-[#2d3748]">comprobante_pago.pdf</p>
                      <p className="text-xs text-[#9ca3af]">245 KB</p>
                    </div>
                  </div>
                  <button className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors">
                    <Download className="w-5 h-5 text-[#00a3e0]" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <div className="flex items-center gap-2">
            <button className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors">
              <Edit className="w-4 h-4" />
              Editar
            </button>
            <button
              onClick={() => onEliminar?.(pago)}
              className="flex items-center gap-2 px-4 py-2 border border-[#e53e3e] text-[#e53e3e] rounded-lg hover:bg-[#e53e3e]/10 transition-colors"
            >
              <Trash2 className="w-4 h-4" />
              Eliminar
            </button>
          </div>
          <button
            onClick={onClose}
            className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
