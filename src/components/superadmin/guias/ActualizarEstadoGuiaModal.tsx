import { X, TrendingUp, Clock, FileText } from 'lucide-react';
import { useState, useEffect } from 'react';

interface Guia {
  id: number;
  numero: string;
  estado: 'generada' | 'recolectada' | 'en_transito' | 'entregada';
}

interface ActualizarEstadoGuiaModalProps {
  isOpen: boolean;
  onClose: () => void;
  guia: Guia | null;
  onSave: (nuevoEstado: string, notas: string) => void;
}

export function ActualizarEstadoGuiaModal({ 
  isOpen, 
  onClose, 
  guia,
  onSave 
}: ActualizarEstadoGuiaModalProps) {
  const [nuevoEstado, setNuevoEstado] = useState('');
  const [notas, setNotas] = useState('');
  const [horaActualizacion, setHoraActualizacion] = useState('');

  useEffect(() => {
    if (isOpen && guia) {
      // Set default next state
      const nextStates = {
        generada: 'recolectada',
        recolectada: 'en_transito',
        en_transito: 'entregada',
        entregada: 'entregada'
      };
      setNuevoEstado(nextStates[guia.estado]);
      
      // Set current time
      const now = new Date();
      setHoraActualizacion(now.toLocaleTimeString('es-MX', { 
        hour: '2-digit', 
        minute: '2-digit' 
      }));
    }
  }, [isOpen, guia]);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onSave(nuevoEstado, notas);
    setNotas('');
    onClose();
  };

  if (!isOpen || !guia) return null;

  const estadoLabels = {
    generada: 'Generada',
    recolectada: 'Recolectada',
    en_transito: 'En Tránsito',
    entregada: 'Entregada'
  };

  const estadoColors = {
    generada: { bg: 'bg-[#6b7280]/10', text: 'text-[#6b7280]' },
    recolectada: { bg: 'bg-[#00a3e0]/10', text: 'text-[#00a3e0]' },
    en_transito: { bg: 'bg-[#d69e2e]/10', text: 'text-[#d69e2e]' },
    entregada: { bg: 'bg-[#38a169]/10', text: 'text-[#38a169]' },
  };

  // Available next states based on current state
  const availableStates: { [key: string]: string[] } = {
    generada: ['recolectada'],
    recolectada: ['en_transito'],
    en_transito: ['entregada'],
    entregada: []
  };

  const currentEstado = estadoColors[guia.estado];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
      {/* Overlay */}
      <div className="absolute inset-0 bg-black/50" onClick={onClose}></div>

      {/* Modal */}
      <div className="relative bg-white rounded-2xl shadow-xl w-full max-w-md">
        {/* Header */}
        <div className="border-b border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
          <h2 className="text-lg text-[#1a365d]">Actualizar Estado de Guía</h2>
          <button
            onClick={onClose}
            className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
          >
            <X className="w-5 h-5 text-[#9ca3af]" />
          </button>
        </div>

        {/* Content */}
        <form onSubmit={handleSubmit} className="p-6">
          {/* Número de guía */}
          <div className="bg-[#f8fafc] rounded-lg p-4 mb-6 text-center">
            <p className="text-xs text-[#9ca3af] mb-1">Guía</p>
            <p className="text-xl text-[#00a3e0]">{guia.numero}</p>
          </div>

          <div className="space-y-4">
            {/* Estado actual */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Estado actual
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <div className={`w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg ${currentEstado.bg}`}>
                  <span className={`text-sm ${currentEstado.text}`}>
                    {estadoLabels[guia.estado]}
                  </span>
                </div>
              </div>
            </div>

            {/* Nuevo estado */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Nuevo estado *
              </label>
              <div className="relative">
                <TrendingUp className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <select
                  required
                  value={nuevoEstado}
                  onChange={(e) => setNuevoEstado(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 appearance-none bg-white cursor-pointer"
                >
                  {availableStates[guia.estado].map((estado) => (
                    <option key={estado} value={estado}>
                      {estadoLabels[estado as keyof typeof estadoLabels]}
                    </option>
                  ))}
                </select>
              </div>
            </div>

            {/* Hora de actualización */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Hora de actualización
              </label>
              <div className="relative">
                <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="text"
                  value={horaActualizacion}
                  readOnly
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg bg-[#f8fafc] text-[#2d3748]"
                />
              </div>
              <p className="text-xs text-[#9ca3af] mt-1">
                Fecha: {new Date().toLocaleDateString('es-MX')}
              </p>
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
                  placeholder="Observaciones sobre el cambio de estado..."
                  rows={4}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 resize-none"
                />
              </div>
            </div>

            {/* Preview del cambio */}
            <div className="bg-[#00a3e0]/10 border border-[#00a3e0]/30 rounded-lg p-4">
              <div className="flex items-center justify-between">
                <div className="text-center flex-1">
                  <p className="text-xs text-[#9ca3af] mb-1">Estado actual</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs ${currentEstado.bg} ${currentEstado.text}`}>
                    {estadoLabels[guia.estado]}
                  </span>
                </div>
                <div className="px-4">
                  <span className="text-2xl text-[#00a3e0]">→</span>
                </div>
                <div className="text-center flex-1">
                  <p className="text-xs text-[#9ca3af] mb-1">Nuevo estado</p>
                  <span className={`inline-flex px-3 py-1 rounded-full text-xs ${estadoColors[nuevoEstado as keyof typeof estadoColors]?.bg} ${estadoColors[nuevoEstado as keyof typeof estadoColors]?.text}`}>
                    {estadoLabels[nuevoEstado as keyof typeof estadoLabels]}
                  </span>
                </div>
              </div>
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
              className="px-5 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              Guardar Cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
