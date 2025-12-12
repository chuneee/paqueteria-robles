import { X, Building2, User, Phone, Mail, FileText, Calendar, CheckCircle, AlertCircle } from 'lucide-react';

interface Solicitud {
  id: number;
  empresa: string;
  contacto: string;
  telefono: string;
  cantidad: number;
  costoUnitario: number;
  montoTotal: number;
  fecha: string;
  hora: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  guiasActuales: number;
  solicitudesAnteriores: number;
  guiasTotales: number;
  pagosAlDia: boolean;
  saldoPendiente?: number;
  aprobadoPor?: string;
  fechaAprobacion?: string;
  rechazadoPor?: string;
  motivoRechazo?: string;
}

interface DetalleSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
  onAprobar?: (solicitud: Solicitud) => void;
  onRechazar?: (solicitud: Solicitud) => void;
}

export function DetalleSolicitudModal({ 
  isOpen, 
  onClose, 
  solicitud,
  onAprobar,
  onRechazar 
}: DetalleSolicitudModalProps) {
  if (!isOpen || !solicitud) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <div className="flex items-center gap-3">
            <h2 className="text-lg text-[#1a365d]">Detalle de Solicitud #{solicitud.id}</h2>
            <span
              className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                solicitud.estado === 'pendiente'
                  ? 'bg-[#d69e2e]/10 text-[#d69e2e]'
                  : solicitud.estado === 'aprobada'
                  ? 'bg-[#38a169]/10 text-[#38a169]'
                  : 'bg-[#e53e3e]/10 text-[#e53e3e]'
              }`}
            >
              {solicitud.estado === 'pendiente' ? 'Pendiente' : solicitud.estado === 'aprobada' ? 'Aprobada' : 'Rechazada'}
            </span>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Información de la Empresa */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <Building2 className="w-4 h-4" />
              Información de la Empresa
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2.5">
              <div className="flex items-start gap-2">
                <User className="w-4 h-4 text-[#9ca3af] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-[#9ca3af]">Empresa</p>
                  <p className="text-sm text-[#2d3748]">{solicitud.empresa}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Mail className="w-4 h-4 text-[#9ca3af] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-[#9ca3af]">Contacto</p>
                  <p className="text-sm text-[#2d3748]">{solicitud.contacto}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <Phone className="w-4 h-4 text-[#9ca3af] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-[#9ca3af]">Teléfono</p>
                  <p className="text-sm text-[#2d3748]">{solicitud.telefono}</p>
                </div>
              </div>
              <div className="flex items-start gap-2">
                <FileText className="w-4 h-4 text-[#9ca3af] mt-0.5" />
                <div className="flex-1">
                  <p className="text-xs text-[#9ca3af]">Guías actuales</p>
                  <p className="text-sm text-[#2d3748]">{solicitud.guiasActuales} disponibles</p>
                </div>
              </div>
            </div>
          </div>

          {/* Detalle de la Solicitud */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <FileText className="w-4 h-4" />
              Detalle de la Solicitud
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-sm text-[#9ca3af]">Fecha de solicitud:</span>
                <span className="text-sm text-[#2d3748]">{solicitud.fecha} {solicitud.hora}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#9ca3af]">Cantidad solicitada:</span>
                <span className="text-sm text-[#2d3748]">{solicitud.cantidad} guías</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#9ca3af]">Costo unitario:</span>
                <span className="text-sm text-[#2d3748]">${solicitud.costoUnitario.toFixed(2)} MXN</span>
              </div>
              <div className="flex justify-between pt-2 border-t border-[#9ca3af]/20">
                <span className="text-sm text-[#1a365d]">Monto total:</span>
                <span className="text-base text-[#1a365d]">${solicitud.montoTotal.toFixed(2)} MXN</span>
              </div>
            </div>
          </div>

          {/* Historial de la Empresa */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <Calendar className="w-4 h-4" />
              Historial de la Empresa
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2.5">
              <div className="flex justify-between">
                <span className="text-sm text-[#9ca3af]">Solicitudes anteriores:</span>
                <span className="text-sm text-[#2d3748]">{solicitud.solicitudesAnteriores}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-sm text-[#9ca3af]">Guías totales adquiridas:</span>
                <span className="text-sm text-[#2d3748]">{solicitud.guiasTotales}</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-sm text-[#9ca3af]">Estado de pagos:</span>
                {solicitud.pagosAlDia ? (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#38a169]/10 text-[#38a169] rounded-full text-xs">
                    <CheckCircle className="w-3 h-3" />
                    Al día
                  </span>
                ) : (
                  <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e53e3e]/10 text-[#e53e3e] rounded-full text-xs">
                    <AlertCircle className="w-3 h-3" />
                    Saldo: ${solicitud.saldoPendiente?.toFixed(2)}
                  </span>
                )}
              </div>
            </div>
          </div>

          {/* Info de procesamiento (si ya fue procesada) */}
          {solicitud.estado === 'aprobada' && (
            <div className="bg-[#38a169]/10 border border-[#38a169]/30 rounded-lg p-4">
              <p className="text-sm text-[#2d3748]">
                <span className="text-[#38a169]">Aprobada por:</span>{' '}
                {solicitud.aprobadoPor} - {solicitud.fechaAprobacion}
              </p>
            </div>
          )}

          {solicitud.estado === 'rechazada' && (
            <div className="bg-[#e53e3e]/10 border border-[#e53e3e]/30 rounded-lg p-4">
              <p className="text-sm text-[#2d3748] mb-1">
                <span className="text-[#e53e3e]">Rechazada por:</span>{' '}
                {solicitud.rechazadoPor}
              </p>
              <p className="text-sm text-[#9ca3af]">
                Motivo: {solicitud.motivoRechazo}
              </p>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 px-6 py-4">
          {solicitud.estado === 'pendiente' ? (
            <div className="flex items-center justify-end gap-3">
              <button
                onClick={() => {
                  onRechazar?.(solicitud);
                  onClose();
                }}
                className="px-5 py-2.5 border border-[#e53e3e] text-[#e53e3e] rounded-lg hover:bg-[#e53e3e]/10 transition-colors"
              >
                Rechazar
              </button>
              <button
                onClick={() => {
                  onAprobar?.(solicitud);
                  onClose();
                }}
                className="px-5 py-2.5 bg-[#38a169] text-white rounded-lg hover:bg-[#2f855a] transition-colors"
              >
                Aprobar Solicitud
              </button>
            </div>
          ) : (
            <div className="flex justify-end">
              <button
                onClick={onClose}
                className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
              >
                Cerrar
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
