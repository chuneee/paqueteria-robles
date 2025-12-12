import { Eye, Edit, MoreVertical, Building2, AlertCircle } from 'lucide-react';

export interface Empresa {
  id: number;
  razonSocial: string;
  contacto: string;
  telefono: string;
  guiasDisponibles: number;
  costoPorGuia: number;
  estado: 'activo' | 'inactivo';
}

interface EmpresaTableProps {
  empresas: Empresa[];
  onView: (empresa: Empresa) => void;
  onEdit: (empresa: Empresa) => void;
  onToggleStatus: (empresa: Empresa) => void;
}

export function EmpresaTable({ empresas, onView, onEdit, onToggleStatus }: EmpresaTableProps) {
  const getGuiasBadge = (guias: number) => {
    if (guias === 0) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#e53e3e]/10 text-[#e53e3e] rounded-full text-sm">
          <AlertCircle className="w-3.5 h-3.5" />
          0 guías
        </span>
      );
    }
    if (guias < 10) {
      return (
        <span className="inline-flex items-center gap-1 px-2.5 py-1 bg-[#d69e2e]/10 text-[#d69e2e] rounded-full text-sm">
          <AlertCircle className="w-3.5 h-3.5" />
          {guias} guías
        </span>
      );
    }
    return <span className="text-[#2d3748]">{guias} guías</span>;
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Empresa
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Contacto
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Guías Disponibles
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Costo/Guía
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#9ca3af] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#9ca3af]/20">
            {empresas.map((empresa) => (
              <tr key={empresa.id} className="hover:bg-[#f8fafc]/50 transition-colors">
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-[#1a365d]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                      <Building2 className="w-5 h-5 text-[#1a365d]" />
                    </div>
                    <span className="text-[#1a365d]">{empresa.razonSocial}</span>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d3748]">
                  {empresa.contacto}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d3748]">
                  {empresa.telefono}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm">
                  {getGuiasBadge(empresa.guiasDisponibles)}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-sm text-[#2d3748]">
                  ${empresa.costoPorGuia.toFixed(2)} MXN
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <span
                    className={`inline-flex px-3 py-1 rounded-full text-xs ${
                      empresa.estado === 'activo'
                        ? 'bg-[#38a169]/10 text-[#38a169]'
                        : 'bg-[#9ca3af]/10 text-[#9ca3af]'
                    }`}
                  >
                    {empresa.estado === 'activo' ? 'Activo' : 'Inactivo'}
                  </span>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onView(empresa)}
                      className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors group"
                      title="Ver detalles"
                    >
                      <Eye className="w-4 h-4 text-[#00a3e0]" />
                    </button>
                    <button
                      onClick={() => onEdit(empresa)}
                      className="p-2 hover:bg-[#9ca3af]/10 rounded-lg transition-colors group"
                      title="Editar"
                    >
                      <Edit className="w-4 h-4 text-[#9ca3af]" />
                    </button>
                    <button
                      onClick={() => onToggleStatus(empresa)}
                      className="p-2 hover:bg-[#9ca3af]/10 rounded-lg transition-colors group"
                      title="Más opciones"
                    >
                      <MoreVertical className="w-4 h-4 text-[#9ca3af]" />
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
