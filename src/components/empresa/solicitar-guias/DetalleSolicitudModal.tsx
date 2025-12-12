import { X, Calendar, Package, DollarSign, CheckCircle, XCircle, Clock, User } from 'lucide-react';

interface Solicitud {
  id: number;
  fecha: string;
  cantidad: number;
  costoPorGuia: number;
  totalEstimado: number;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
  respuesta?: string;
  fechaRespuesta?: string;
  adminRespuesta?: string;
  motivoRechazo?: string;
}

interface DetalleSolicitudModalProps {
  isOpen: boolean;
  onClose: () => void;
  solicitud: Solicitud | null;
}

export function DetalleSolicitudModal({ isOpen, onClose, solicitud }: DetalleSolicitudModalProps) {
  if (!isOpen || !solicitud) return null;

  const estadoConfig = {
    pendiente: {
      icon: Clock,
      color: 'text-[#d69e2e]',
      bgColor: 'bg-[#d69e2e]/10',
      label: 'Pendiente',
    },
    aprobada: {
      icon: CheckCircle,
      color: 'text-[#38a169]',
      bgColor: 'bg-[#38a169]/10',
      label: 'Aprobada',
    },
    rechazada: {
      icon: XCircle,
      color: 'text-[#e53e3e]',
      bgColor: 'bg-[#e53e3e]/10',
      label: 'Rechazada',
    },
  };

  const config = estadoConfig[solicitud.estado];
  const IconEstado = config.icon;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-lg max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h3 className="text-lg text-[#1a365d]">Detalle de Solicitud</h3>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6 space-y-6">
          {/* Estado */}
          <div className={`flex items-center gap-3 p-4 rounded-lg ${config.bgColor}`}>
            <IconEstado className={`w-6 h-6 ${config.color}`} />
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">Estado de la solicitud</p>
              <p className={`text-sm ${config.color}`}>{config.label}</p>
            </div>
          </div>

          {/* Información Principal */}
          <div className="space-y-4">
            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#f8fafc] rounded-lg flex items-center justify-center flex-shrink-0">
                <Calendar className="w-5 h-5 text-[#9ca3af]" />
              </div>
              <div>
                <p className="text-xs text-[#9ca3af] mb-1">Fecha de solicitud</p>
                <p className="text-sm text-[#2d3748]">{solicitud.fecha}</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#f8fafc] rounded-lg flex items-center justify-center flex-shrink-0">
                <Package className="w-5 h-5 text-[#9ca3af]" />
              </div>
              <div>
                <p className="text-xs text-[#9ca3af] mb-1">Cantidad solicitada</p>
                <p className="text-sm text-[#2d3748]">{solicitud.cantidad} guías</p>
              </div>
            </div>

            <div className="flex items-start gap-3">
              <div className="w-10 h-10 bg-[#f8fafc] rounded-lg flex items-center justify-center flex-shrink-0">
                <DollarSign className="w-5 h-5 text-[#9ca3af]" />
              </div>
              <div>
                <p className="text-xs text-[#9ca3af] mb-1">Costo unitario</p>
                <p className="text-sm text-[#2d3748]">${solicitud.costoPorGuia.toFixed(2)} MXN</p>
              </div>
            </div>
          </div>

          {/* Total Estimado */}
          <div className="bg-[#f8fafc] rounded-lg p-4">
            <p className="text-xs text-[#9ca3af] mb-1">Total estimado</p>
            <p className="text-2xl text-[#1a365d]">
              ${solicitud.totalEstimado.toLocaleString('es-MX', { minimumFractionDigits: 2, maximumFractionDigits: 2 })} MXN
            </p>
          </div>

          {/* Respuesta del Administrador */}
          {solicitud.estado === 'aprobada' && (
            <div className="border-t border-[#9ca3af]/20 pt-4 space-y-3">
              <p className="text-sm text-[#1a365d]">Información de aprobación</p>
              
              {solicitud.fechaRespuesta && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#38a169]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#38a169]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">Fecha de aprobación</p>
                    <p className="text-sm text-[#2d3748]">{solicitud.fechaRespuesta}</p>
                  </div>
                </div>
              )}

              {solicitud.adminRespuesta && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#38a169]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#38a169]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">Aprobada por</p>
                    <p className="text-sm text-[#2d3748]">{solicitud.adminRespuesta}</p>
                  </div>
                </div>
              )}

              {solicitud.respuesta && (
                <div className="bg-[#38a169]/5 rounded-lg p-3">
                  <p className="text-xs text-[#9ca3af] mb-1">Mensaje</p>
                  <p className="text-sm text-[#2d3748]">{solicitud.respuesta}</p>
                </div>
              )}
            </div>
          )}

          {solicitud.estado === 'rechazada' && (
            <div className="border-t border-[#9ca3af]/20 pt-4 space-y-3">
              <p className="text-sm text-[#1a365d]">Información del rechazo</p>
              
              {solicitud.fechaRespuesta && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#e53e3e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Calendar className="w-4 h-4 text-[#e53e3e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">Fecha de rechazo</p>
                    <p className="text-sm text-[#2d3748]">{solicitud.fechaRespuesta}</p>
                  </div>
                </div>
              )}

              {solicitud.adminRespuesta && (
                <div className="flex items-start gap-3">
                  <div className="w-8 h-8 bg-[#e53e3e]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <User className="w-4 h-4 text-[#e53e3e]" />
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">Rechazada por</p>
                    <p className="text-sm text-[#2d3748]">{solicitud.adminRespuesta}</p>
                  </div>
                </div>
              )}

              {solicitud.motivoRechazo && (
                <div className="bg-[#e53e3e]/5 rounded-lg p-3 border border-[#e53e3e]/20">
                  <p className="text-xs text-[#9ca3af] mb-1">Motivo del rechazo</p>
                  <p className="text-sm text-[#e53e3e]">{solicitud.motivoRechazo}</p>
                </div>
              )}
            </div>
          )}

          {solicitud.estado === 'pendiente' && (
            <div className="border-t border-[#9ca3af]/20 pt-4">
              <div className="bg-[#d69e2e]/5 rounded-lg p-4 border border-[#d69e2e]/20">
                <div className="flex items-start gap-3">
                  <Clock className="w-5 h-5 text-[#d69e2e] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#2d3748] mb-1">Solicitud en revisión</p>
                    <p className="text-xs text-[#9ca3af]">
                      Tu solicitud está siendo revisada por el equipo de Servicio Robles. 
                      Recibirás una respuesta pronto.
                    </p>
                  </div>
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 px-6 py-4">
          <button
            onClick={onClose}
            className="w-full px-4 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
          >
            Cerrar
          </button>
        </div>
      </div>
    </div>
  );
}
