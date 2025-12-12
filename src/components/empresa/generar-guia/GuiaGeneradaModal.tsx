import { CheckCircle, Download, FileText, X, ArrowRight } from 'lucide-react';

interface GuiaGeneradaModalProps {
  isOpen: boolean;
  onClose: () => void;
  numeroGuia: string;
  onDescargarPDF: () => void;
  onVerHistorial: () => void;
}

export function GuiaGeneradaModal({ 
  isOpen, 
  onClose, 
  numeroGuia, 
  onDescargarPDF,
  onVerHistorial 
}: GuiaGeneradaModalProps) {
  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50 p-4">
      <div className="bg-white rounded-xl shadow-2xl w-full max-w-md">
        {/* Header */}
        <div className="px-6 py-4 border-b border-[#9ca3af]/20 flex items-center justify-between">
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#38a169]/10 rounded-full flex items-center justify-center">
              <CheckCircle className="w-5 h-5 text-[#38a169]" />
            </div>
            <h3 className="text-lg text-[#1a365d]">Guía Generada</h3>
          </div>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <div className="p-6">
          <div className="text-center mb-6">
            <p className="text-sm text-[#9ca3af] mb-2">
              Tu guía ha sido generada exitosamente
            </p>
            <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#9ca3af]/20">
              <p className="text-xs text-[#9ca3af] mb-1">Número de guía</p>
              <p className="text-2xl text-[#1a365d]">{numeroGuia}</p>
            </div>
          </div>

          <div className="space-y-3">
            <button
              onClick={onDescargarPDF}
              className="w-full px-4 py-3 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center justify-center gap-2"
            >
              <Download className="w-5 h-5" />
              Descargar PDF
            </button>

            <button
              onClick={onVerHistorial}
              className="w-full px-4 py-3 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors flex items-center justify-center gap-2"
            >
              <FileText className="w-5 h-5" />
              Ver en Historial
            </button>
          </div>

          <div className="mt-6 bg-[#38a169]/5 rounded-lg p-4 border border-[#38a169]/20">
            <div className="flex items-start gap-3">
              <CheckCircle className="w-5 h-5 text-[#38a169] flex-shrink-0 mt-0.5" />
              <div>
                <p className="text-sm text-[#2d3748] mb-1">Guía lista para usar</p>
                <p className="text-xs text-[#9ca3af]">
                  Se ha descontado 1 guía de tu saldo disponible. 
                  El estado actual es "Generada".
                </p>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="px-6 py-4 border-t border-[#9ca3af]/20 flex justify-end">
          <button
            onClick={onClose}
            className="px-6 py-2.5 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors flex items-center gap-2"
          >
            Generar Nueva Guía
            <ArrowRight className="w-4 h-4" />
          </button>
        </div>
      </div>
    </div>
  );
}
