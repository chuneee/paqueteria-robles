interface Solicitud {
  id: number;
  empresa: string;
  cantidad: number;
  fecha: string;
  estado: 'pendiente' | 'aprobada' | 'rechazada';
}

const solicitudes: Solicitud[] = [
  { id: 1, empresa: 'Distribuidora Norte', cantidad: 50, fecha: 'Hoy 10:30am', estado: 'pendiente' },
  { id: 2, empresa: 'Comercial López', cantidad: 100, fecha: 'Ayer', estado: 'aprobada' },
  { id: 3, empresa: 'Ferretería Central', cantidad: 25, fecha: '26/11', estado: 'pendiente' },
  { id: 4, empresa: 'Farmacia San José', cantidad: 75, fecha: '25/11', estado: 'aprobada' },
  { id: 5, empresa: 'Papelería Robles', cantidad: 30, fecha: '24/11', estado: 'rechazada' },
];

export function SolicitudesRecientes() {
  const getEstadoBadge = (estado: Solicitud['estado']) => {
    const styles = {
      pendiente: 'bg-[#d69e2e]/10 text-[#d69e2e] border-[#d69e2e]/20',
      aprobada: 'bg-[#38a169]/10 text-[#38a169] border-[#38a169]/20',
      rechazada: 'bg-[#e53e3e]/10 text-[#e53e3e] border-[#e53e3e]/20',
    };

    const labels = {
      pendiente: 'Pendiente',
      aprobada: 'Aprobada',
      rechazada: 'Rechazada',
    };

    return (
      <span className={`px-2.5 py-1 rounded-full text-xs border ${styles[estado]}`}>
        {labels[estado]}
      </span>
    );
  };

  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a365d]">Últimas Solicitudes de Guías</h2>
        <a href="#" className="text-sm text-[#00a3e0] hover:text-[#0090c9]">
          Ver todas →
        </a>
      </div>

      <div className="space-y-3">
        {solicitudes.map((solicitud) => (
          <div
            key={solicitud.id}
            className="flex items-center justify-between p-3 rounded-lg hover:bg-[#f8fafc] transition-colors"
          >
            <div className="flex-1 min-w-0">
              <p className="text-sm text-[#1a365d] truncate">{solicitud.empresa}</p>
              <p className="text-xs text-[#9ca3af]">{solicitud.cantidad} guías</p>
            </div>
            <div className="flex items-center gap-4 ml-4">
              <p className="text-xs text-[#9ca3af] whitespace-nowrap">{solicitud.fecha}</p>
              {getEstadoBadge(solicitud.estado)}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
