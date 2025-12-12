import { X, User, MapPin, Package, Weight, FileText, Download, Clock, CheckCircle } from 'lucide-react';

interface Guia {
  id: number;
  numero: string;
  empresa: string;
  fechaCreacion: string;
  remitente: {
    nombre: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
  };
  consignatario: {
    nombre: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
  };
  tipoEnvio: string;
  valijas: number;
  cajas: number;
  sobres: number;
  envases: number;
  pesoReal: number;
  pesoDimensional: number;
  pesoTotal: number;
  estado: 'generada' | 'recolectada' | 'en_transito' | 'entregada';
  historial: Array<{
    estado: string;
    fecha: string;
    hora: string;
    notas?: string;
  }>;
}

interface DetalleGuiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  guia: Guia | null;
  onActualizarEstado?: (guia: Guia) => void;
}

export function DetalleGuiaModal({ 
  isOpen, 
  onClose, 
  guia,
  onActualizarEstado 
}: DetalleGuiaModalProps) {
  if (!isOpen || !guia) return null;

  const estadoColors = {
    generada: { bg: 'bg-[#6b7280]/10', text: 'text-[#6b7280]', label: 'Generada' },
    recolectada: { bg: 'bg-[#00a3e0]/10', text: 'text-[#00a3e0]', label: 'Recolectada' },
    en_transito: { bg: 'bg-[#d69e2e]/10', text: 'text-[#d69e2e]', label: 'En Tránsito' },
    entregada: { bg: 'bg-[#38a169]/10', text: 'text-[#38a169]', label: 'Entregada' },
  };

  const currentEstado = estadoColors[guia.estado];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-2xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h2 className="text-lg text-[#1a365d]">Detalle de Guía</h2>
            <p className="text-2xl text-[#00a3e0] mt-1">{guia.numero}</p>
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
          {/* Estado actual */}
          <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between">
            <div>
              <p className="text-xs text-[#9ca3af] mb-1">Estado actual</p>
              <span className={`inline-flex px-3 py-1.5 rounded-full text-sm ${currentEstado.bg} ${currentEstado.text}`}>
                {currentEstado.label}
              </span>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-1">Empresa</p>
              <p className="text-sm text-[#2d3748]">{guia.empresa}</p>
            </div>
            <div>
              <p className="text-xs text-[#9ca3af] mb-1">Fecha de creación</p>
              <p className="text-sm text-[#2d3748]">{guia.fechaCreacion}</p>
            </div>
          </div>

          {/* Información del Remitente */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <User className="w-4 h-4" />
              Información del Remitente
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2">
              <div>
                <p className="text-xs text-[#9ca3af]">Nombre</p>
                <p className="text-sm text-[#2d3748]">{guia.remitente.nombre}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Teléfono</p>
                <p className="text-sm text-[#2d3748]">{guia.remitente.telefono}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Dirección</p>
                <p className="text-sm text-[#2d3748]">{guia.remitente.direccion}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Ciudad / Estado</p>
                <p className="text-sm text-[#2d3748]">{guia.remitente.ciudad}, {guia.remitente.estado}</p>
              </div>
            </div>
          </div>

          {/* Información del Consignatario */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <MapPin className="w-4 h-4" />
              Información del Consignatario / Destino
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2">
              <div>
                <p className="text-xs text-[#9ca3af]">Nombre</p>
                <p className="text-sm text-[#2d3748]">{guia.consignatario.nombre}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Teléfono</p>
                <p className="text-sm text-[#2d3748]">{guia.consignatario.telefono}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Dirección</p>
                <p className="text-sm text-[#2d3748]">{guia.consignatario.direccion}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af]">Ciudad / Estado</p>
                <p className="text-sm text-[#2d3748]">{guia.consignatario.ciudad}, {guia.consignatario.estado}</p>
              </div>
            </div>
          </div>

          {/* Datos de Envío */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <Package className="w-4 h-4" />
              Datos de Envío
            </h3>
            <div className="bg-[#f8fafc] rounded-lg p-4">
              <div className="grid grid-cols-2 gap-4 mb-3">
                {guia.valijas > 0 && (
                  <div>
                    <p className="text-xs text-[#9ca3af]">Valijas</p>
                    <p className="text-sm text-[#2d3748]">{guia.valijas}</p>
                  </div>
                )}
                {guia.cajas > 0 && (
                  <div>
                    <p className="text-xs text-[#9ca3af]">Cajas</p>
                    <p className="text-sm text-[#2d3748]">{guia.cajas}</p>
                  </div>
                )}
                {guia.sobres > 0 && (
                  <div>
                    <p className="text-xs text-[#9ca3af]">Sobres</p>
                    <p className="text-sm text-[#2d3748]">{guia.sobres}</p>
                  </div>
                )}
                {guia.envases > 0 && (
                  <div>
                    <p className="text-xs text-[#9ca3af]">Envases</p>
                    <p className="text-sm text-[#2d3748]">{guia.envases}</p>
                  </div>
                )}
              </div>
              <div className="pt-3 border-t border-[#9ca3af]/20">
                <div className="grid grid-cols-3 gap-4">
                  <div>
                    <p className="text-xs text-[#9ca3af]">Peso Real</p>
                    <p className="text-sm text-[#2d3748]">{guia.pesoReal} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">Peso Dimensional</p>
                    <p className="text-sm text-[#2d3748]">{guia.pesoDimensional} kg</p>
                  </div>
                  <div>
                    <p className="text-xs text-[#9ca3af]">Peso Total</p>
                    <p className="text-sm text-[#1a365d]">{guia.pesoTotal} kg</p>
                  </div>
                </div>
              </div>
            </div>
          </div>

          {/* Historial de Estados */}
          <div>
            <h3 className="text-sm text-[#1a365d] mb-3 flex items-center gap-2">
              <Clock className="w-4 h-4" />
              Historial de Estados
            </h3>
            <div className="space-y-3">
              {guia.historial.map((item, index) => (
                <div key={index} className="flex gap-3">
                  <div className="flex flex-col items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-[#00a3e0]' : 'bg-[#9ca3af]/20'
                    }`}>
                      <CheckCircle className={`w-4 h-4 ${index === 0 ? 'text-white' : 'text-[#9ca3af]'}`} />
                    </div>
                    {index < guia.historial.length - 1 && (
                      <div className="w-0.5 h-8 bg-[#9ca3af]/20"></div>
                    )}
                  </div>
                  <div className="flex-1 pb-3">
                    <div className="flex items-start justify-between">
                      <div>
                        <p className="text-sm text-[#1a365d]">{item.estado}</p>
                        <p className="text-xs text-[#9ca3af] mt-0.5">{item.fecha} - {item.hora}</p>
                        {item.notas && (
                          <p className="text-xs text-[#2d3748] mt-1 italic">{item.notas}</p>
                        )}
                      </div>
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* PDF de Guía */}
          <div className="bg-[#00a3e0]/10 border border-[#00a3e0]/30 rounded-lg p-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <div className="w-12 h-12 bg-white rounded-lg flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#00a3e0]" />
                </div>
                <div>
                  <p className="text-sm text-[#1a365d]">Guía_{guia.numero}.pdf</p>
                  <p className="text-xs text-[#9ca3af]">125 KB</p>
                </div>
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors">
                <Download className="w-4 h-4" />
                Descargar PDF
              </button>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <button
            onClick={onClose}
            className="px-5 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            Cerrar
          </button>
          {guia.estado !== 'entregada' && (
            <button
              onClick={() => {
                onActualizarEstado?.(guia);
                onClose();
              }}
              className="px-5 py-2.5 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors"
            >
              Actualizar Estado
            </button>
          )}
        </div>
      </div>
    </div>
  );
}
