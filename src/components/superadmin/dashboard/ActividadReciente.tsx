import { CheckCircle, UserPlus, DollarSign, FileCheck, AlertCircle } from 'lucide-react';

interface Actividad {
  id: number;
  tipo: 'aprobacion' | 'registro' | 'pago' | 'solicitud' | 'alerta';
  texto: string;
  tiempo: string;
}

const actividades: Actividad[] = [
  { id: 1, tipo: 'aprobacion', texto: 'Admin Juan aprobó solicitud de Distribuidora Norte', tiempo: 'Hace 5 min' },
  { id: 2, tipo: 'registro', texto: 'Nueva empresa registrada: Abarrotes del Valle', tiempo: 'Hace 1 hora' },
  { id: 3, tipo: 'pago', texto: 'Pago registrado: Comercial López - $3,500 MXN', tiempo: 'Hace 2 horas' },
  { id: 4, tipo: 'solicitud', texto: 'Nueva solicitud de guías: Ferretería Central (25 guías)', tiempo: 'Hace 3 horas' },
  { id: 5, tipo: 'aprobacion', texto: 'Admin María aprobó solicitud de Farmacia San José', tiempo: 'Hace 4 horas' },
  { id: 6, tipo: 'alerta', texto: 'Recordatorio: 3 solicitudes pendientes de revisión', tiempo: 'Hace 5 horas' },
];

export function ActividadReciente() {
  const getIcon = (tipo: Actividad['tipo']) => {
    const icons = {
      aprobacion: { Icon: CheckCircle, color: 'bg-[#38a169]' },
      registro: { Icon: UserPlus, color: 'bg-[#00a3e0]' },
      pago: { Icon: DollarSign, color: 'bg-[#38a169]' },
      solicitud: { Icon: FileCheck, color: 'bg-[#d69e2e]' },
      alerta: { Icon: AlertCircle, color: 'bg-[#e53e3e]' },
    };

    const { Icon, color } = icons[tipo];
    return (
      <div className={`w-8 h-8 rounded-full ${color} flex items-center justify-center flex-shrink-0`}>
        <Icon className="w-4 h-4 text-white" />
      </div>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a365d]">Actividad Reciente del Sistema</h2>
      </div>

      <div className="space-y-4">
        {actividades.map((actividad, index) => (
          <div key={actividad.id} className="flex items-start gap-4">
            {getIcon(actividad.tipo)}
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#2d3748]">{actividad.texto}</p>
              <p className="text-xs text-[#9ca3af] mt-1">{actividad.tiempo}</p>
            </div>
            {index < actividades.length - 1 && (
              <div className="absolute left-10 w-px h-full bg-[#f8fafc] -z-10"></div>
            )}
          </div>
        ))}
      </div>
    </div>
  );
}
