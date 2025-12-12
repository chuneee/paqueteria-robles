import { X, Download, Building2, MapPin, FileText, Package, Scale, CheckCircle, Clock, Truck } from 'lucide-react';

interface GuiaDetalle {
  numeroGuia: string;
  fechaCreacion: string;
  estado: 'generada' | 'recolectada' | 'en_transito' | 'entregada';
  remitente: {
    razonSocial: string;
    contacto: string;
    departamento: string;
    direccion: string;
    telefono: string;
  };
  consignatario: {
    razonSocial: string;
    contacto: string;
    departamento: string;
    direccion: string;
    telefono: string;
  };
  infoEnvio: {
    noCintillo?: string;
    noContrato?: string;
    facturarEn?: string;
    caracteristicas: string;
    valorDeclarado: number;
  };
  tipoEnvio: {
    valijas: number;
    cajas: number;
    sobres: number;
    envases: number;
  };
  peso: {
    pesoReal: number;
    pesoDimensional: number;
    pesoTotal: number;
  };
  timeline?: {
    generada?: string;
    recolectada?: string;
    enTransito?: string;
    entregada?: string;
  };
}

interface DetalleGuiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  guia: GuiaDetalle | null;
  onDescargarPDF: (numeroGuia: string) => void;
}

export function DetalleGuiaModal({ isOpen, onClose, guia, onDescargarPDF }: DetalleGuiaModalProps) {
  if (!isOpen || !guia) return null;

  const estadoConfig = {
    generada: { label: 'Generada', color: 'bg-[#6b7280]/10 text-[#6b7280]', icon: FileText },
    recolectada: { label: 'Recolectada', color: 'bg-[#00a3e0]/10 text-[#00a3e0]', icon: Package },
    en_transito: { label: 'En tránsito', color: 'bg-[#d69e2e]/10 text-[#d69e2e]', icon: Truck },
    entregada: { label: 'Entregada', color: 'bg-[#38a169]/10 text-[#38a169]', icon: CheckCircle },
  };

  const config = estadoConfig[guia.estado];
  const IconEstado = config.icon;

  const tipoEnvioText = [
    guia.tipoEnvio.valijas > 0 && `Valijas (${guia.tipoEnvio.valijas})`,
    guia.tipoEnvio.cajas > 0 && `Cajas (${guia.tipoEnvio.cajas})`,
    guia.tipoEnvio.sobres > 0 && `Sobres (${guia.tipoEnvio.sobres})`,
    guia.tipoEnvio.envases > 0 && `Envases (${guia.tipoEnvio.envases})`,
  ].filter(Boolean).join(', ');

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-3xl max-h-[90vh] overflow-y-auto">
        {/* Header */}
        <div className="sticky top-0 bg-white border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between z-10">
          <div>
            <h3 className="text-lg text-[#1a365d]">Detalle de Guía</h3>
            <p className="text-sm text-[#9ca3af] mt-0.5">{guia.numeroGuia}</p>
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
          {/* Estado Actual */}
          <div className={`flex items-center gap-3 p-4 rounded-lg ${config.color}`}>
            <IconEstado className={`w-6 h-6`} />
            <div>
              <p className="text-xs text-[#9ca3af] mb-0.5">Estado actual</p>
              <p className="text-sm">{config.label}</p>
            </div>
            <div className="ml-auto text-right">
              <p className="text-xs text-[#9ca3af] mb-0.5">Fecha de creación</p>
              <p className="text-sm text-[#2d3748]">{guia.fechaCreacion}</p>
            </div>
          </div>

          {/* Datos del Remitente */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <Building2 className="w-5 h-5 text-[#00a3e0]" />
              <h4 className="text-sm text-[#1a365d]">Datos del Remitente</h4>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Razón social</p>
                  <p className="text-sm text-[#2d3748]">{guia.remitente.razonSocial}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Contacto</p>
                  <p className="text-sm text-[#2d3748]">
                    {guia.remitente.contacto}
                    {guia.remitente.departamento && ` – ${guia.remitente.departamento}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Dirección</p>
                  <p className="text-sm text-[#2d3748]">{guia.remitente.direccion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Teléfono</p>
                  <p className="text-sm text-[#2d3748]">{guia.remitente.telefono}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Datos del Consignatario */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <MapPin className="w-5 h-5 text-[#00a3e0]" />
              <h4 className="text-sm text-[#1a365d]">Datos del Consignatario</h4>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2">
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Razón social / Nombre</p>
                  <p className="text-sm text-[#2d3748]">{guia.consignatario.razonSocial}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Contacto</p>
                  <p className="text-sm text-[#2d3748]">
                    {guia.consignatario.contacto}
                    {guia.consignatario.departamento && ` – ${guia.consignatario.departamento}`}
                  </p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Dirección</p>
                  <p className="text-sm text-[#2d3748]">{guia.consignatario.direccion}</p>
                </div>
                <div>
                  <p className="text-xs text-[#9ca3af] mb-0.5">Teléfono</p>
                  <p className="text-sm text-[#2d3748]">{guia.consignatario.telefono}</p>
                </div>
              </div>
            </div>
          </div>

          {/* Información del Envío */}
          <div>
            <div className="flex items-center gap-2 mb-4">
              <FileText className="w-5 h-5 text-[#00a3e0]" />
              <h4 className="text-sm text-[#1a365d]">Información del Envío</h4>
            </div>
            <div className="bg-[#f8fafc] rounded-lg p-4 space-y-3">
              <div className="grid grid-cols-3 gap-3">
                {guia.infoEnvio.noCintillo && (
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">No. Cintillo</p>
                    <p className="text-sm text-[#2d3748]">{guia.infoEnvio.noCintillo}</p>
                  </div>
                )}
                {guia.infoEnvio.noContrato && (
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">No. Contrato</p>
                    <p className="text-sm text-[#2d3748]">{guia.infoEnvio.noContrato}</p>
                  </div>
                )}
                {guia.infoEnvio.facturarEn && (
                  <div>
                    <p className="text-xs text-[#9ca3af] mb-0.5">Facturar en</p>
                    <p className="text-sm text-[#2d3748]">{guia.infoEnvio.facturarEn}</p>
                  </div>
                )}
              </div>
              <div>
                <p className="text-xs text-[#9ca3af] mb-0.5">Características del envío</p>
                <p className="text-sm text-[#2d3748]">{guia.infoEnvio.caracteristicas}</p>
              </div>
              <div>
                <p className="text-xs text-[#9ca3af] mb-0.5">Valor declarado</p>
                <p className="text-sm text-[#2d3748]">
                  ${guia.infoEnvio.valorDeclarado.toLocaleString('es-MX', { minimumFractionDigits: 2 })} MXN
                </p>
              </div>
            </div>
          </div>

          {/* Tipo de Envío y Peso */}
          <div className="grid grid-cols-2 gap-6">
            {/* Tipo de Envío */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Package className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Tipo de Envío</h4>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4">
                <p className="text-sm text-[#2d3748]">{tipoEnvioText || 'No especificado'}</p>
              </div>
            </div>

            {/* Peso */}
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Scale className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Peso del Envío</h4>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4 space-y-2">
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Peso real:</span>
                  <span className="text-sm text-[#2d3748]">{guia.peso.pesoReal} kg</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-xs text-[#9ca3af]">Peso dimensional:</span>
                  <span className="text-sm text-[#2d3748]">{guia.peso.pesoDimensional} kg</span>
                </div>
                <div className="flex justify-between border-t border-[#9ca3af]/20 pt-2">
                  <span className="text-xs text-[#1a365d]">Peso total:</span>
                  <span className="text-sm text-[#1a365d]">{guia.peso.pesoTotal} kg</span>
                </div>
              </div>
            </div>
          </div>

          {/* Timeline de Estados */}
          {guia.timeline && (
            <div>
              <div className="flex items-center gap-2 mb-4">
                <Clock className="w-5 h-5 text-[#00a3e0]" />
                <h4 className="text-sm text-[#1a365d]">Línea de Tiempo</h4>
              </div>
              <div className="bg-[#f8fafc] rounded-lg p-4">
                <div className="space-y-3">
                  {guia.timeline.generada && (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        guia.estado === 'generada' ? 'bg-[#6b7280]' : 'bg-[#9ca3af]/20'
                      }`}>
                        <FileText className={`w-4 h-4 ${
                          guia.estado === 'generada' ? 'text-white' : 'text-[#9ca3af]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#2d3748]">Generada</p>
                        <p className="text-xs text-[#9ca3af]">{guia.timeline.generada}</p>
                      </div>
                    </div>
                  )}
                  {guia.timeline.recolectada && (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        guia.estado === 'recolectada' ? 'bg-[#00a3e0]' : 'bg-[#9ca3af]/20'
                      }`}>
                        <Package className={`w-4 h-4 ${
                          guia.estado === 'recolectada' ? 'text-white' : 'text-[#9ca3af]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#2d3748]">Recolectada</p>
                        <p className="text-xs text-[#9ca3af]">{guia.timeline.recolectada}</p>
                      </div>
                    </div>
                  )}
                  {guia.timeline.enTransito && (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        guia.estado === 'en_transito' ? 'bg-[#d69e2e]' : 'bg-[#9ca3af]/20'
                      }`}>
                        <Truck className={`w-4 h-4 ${
                          guia.estado === 'en_transito' ? 'text-white' : 'text-[#9ca3af]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#2d3748]">En tránsito</p>
                        <p className="text-xs text-[#9ca3af]">{guia.timeline.enTransito}</p>
                      </div>
                    </div>
                  )}
                  {guia.timeline.entregada && (
                    <div className="flex items-center gap-3">
                      <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                        guia.estado === 'entregada' ? 'bg-[#38a169]' : 'bg-[#9ca3af]/20'
                      }`}>
                        <CheckCircle className={`w-4 h-4 ${
                          guia.estado === 'entregada' ? 'text-white' : 'text-[#9ca3af]'
                        }`} />
                      </div>
                      <div className="flex-1">
                        <p className="text-sm text-[#2d3748]">Entregada</p>
                        <p className="text-xs text-[#9ca3af]">{guia.timeline.entregada}</p>
                      </div>
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
        </div>

        {/* Footer */}
        <div className="sticky bottom-0 bg-white border-t border-[#9ca3af]/20 px-6 py-4 flex gap-3 justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            Cerrar
          </button>
          <button
            onClick={() => onDescargarPDF(guia.numeroGuia)}
            className="px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center gap-2"
          >
            <Download className="w-4 h-4" />
            Descargar PDF
          </button>
        </div>
      </div>
    </div>
  );
}
