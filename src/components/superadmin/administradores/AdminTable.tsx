import { Edit2, UserX, UserCheck } from 'lucide-react';

export interface Administrador {
  id: number;
  nombre: string;
  correo: string;
  telefono: string;
  fechaRegistro: string;
  estado: 'activo' | 'inactivo';
  avatar?: string;
}

interface AdminTableProps {
  administradores: Administrador[];
  onEdit: (admin: Administrador) => void;
  onToggleStatus: (admin: Administrador) => void;
}

export function AdminTable({ administradores, onEdit, onToggleStatus }: AdminTableProps) {
  const getInitials = (nombre: string) => {
    return nombre
      .split(' ')
      .map(n => n[0])
      .slice(0, 2)
      .join('')
      .toUpperCase();
  };

  const getAvatarColor = (id: number) => {
    const colors = [
      'bg-gradient-to-br from-[#1a365d] to-[#00a3e0]',
      'bg-gradient-to-br from-[#00a3e0] to-[#38a169]',
      'bg-gradient-to-br from-[#38a169] to-[#d69e2e]',
      'bg-gradient-to-br from-[#d69e2e] to-[#e53e3e]',
    ];
    return colors[id % colors.length];
  };

  return (
    <div className="bg-white rounded-xl shadow-sm overflow-hidden">
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead className="bg-[#f8fafc] border-b border-[#e5e7eb]">
            <tr>
              <th className="px-6 py-4 text-left text-xs text-[#2d3748] uppercase tracking-wider">
                Administrador
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#2d3748] uppercase tracking-wider">
                Correo Electrónico
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#2d3748] uppercase tracking-wider">
                Teléfono
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#2d3748] uppercase tracking-wider">
                Fecha Registro
              </th>
              <th className="px-6 py-4 text-left text-xs text-[#2d3748] uppercase tracking-wider">
                Estado
              </th>
              <th className="px-6 py-4 text-right text-xs text-[#2d3748] uppercase tracking-wider">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#e5e7eb]">
            {administradores.map((admin) => (
              <tr
                key={admin.id}
                className="hover:bg-[#f8fafc] transition-colors duration-150"
              >
                <td className="px-6 py-4 whitespace-nowrap">
                  <div className="flex items-center gap-3">
                    <div className={`w-10 h-10 rounded-full flex items-center justify-center ${getAvatarColor(admin.id)}`}>
                      <span className="text-white text-sm">
                        {getInitials(admin.nombre)}
                      </span>
                    </div>
                    <p className="text-sm text-[#2d3748]">{admin.nombre}</p>
                  </div>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[#2d3748]">{admin.correo}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[#2d3748]">{admin.telefono}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  <p className="text-sm text-[#9ca3af]">{admin.fechaRegistro}</p>
                </td>
                <td className="px-6 py-4 whitespace-nowrap">
                  {admin.estado === 'activo' ? (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#38a169]/10 text-[#38a169] border border-[#38a169]/20">
                      Activo
                    </span>
                  ) : (
                    <span className="inline-flex items-center px-3 py-1 rounded-full text-xs bg-[#9ca3af]/10 text-[#9ca3af] border border-[#9ca3af]/20">
                      Inactivo
                    </span>
                  )}
                </td>
                <td className="px-6 py-4 whitespace-nowrap text-right">
                  <div className="flex items-center justify-end gap-2">
                    <button
                      onClick={() => onEdit(admin)}
                      className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors group"
                      title="Editar"
                    >
                      <Edit2 className="w-4 h-4 text-[#00a3e0]" />
                    </button>
                    <button
                      onClick={() => onToggleStatus(admin)}
                      className={`p-2 hover:bg-opacity-10 rounded-lg transition-colors group ${
                        admin.estado === 'activo'
                          ? 'hover:bg-[#e53e3e]/10'
                          : 'hover:bg-[#38a169]/10'
                      }`}
                      title={admin.estado === 'activo' ? 'Desactivar' : 'Activar'}
                    >
                      {admin.estado === 'activo' ? (
                        <UserX className="w-4 h-4 text-[#e53e3e]" />
                      ) : (
                        <UserCheck className="w-4 h-4 text-[#38a169]" />
                      )}
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
