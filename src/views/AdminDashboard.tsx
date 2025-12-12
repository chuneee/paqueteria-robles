import { LogOut, Menu, X } from 'lucide-react';
import { useState } from 'react';
import logo from 'figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png';

interface AdminDashboardProps {
  onLogout: () => void;
}

export function AdminDashboard({ onLogout }: AdminDashboardProps) {
  const [isSidebarOpen, setIsSidebarOpen] = useState(true);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Top Navigation Bar */}
      <nav className="bg-white shadow-md fixed w-full top-0 z-40">
        <div className="px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setIsSidebarOpen(!isSidebarOpen)}
                className="text-[#2d3748] hover:text-[#1a365d] lg:hidden"
              >
                {isSidebarOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
              <img src={logo} alt="Servicio Robles" className="h-10 w-auto" />
              <div className="hidden md:block">
                <span className="text-[#1a365d] font-semibold">Panel de Administrador</span>
              </div>
            </div>
            <button
              onClick={onLogout}
              className="flex items-center gap-2 text-[#2d3748] hover:text-[#00a3e0] transition-colors"
            >
              <span className="hidden sm:inline">Cerrar Sesión</span>
              <LogOut size={20} />
            </button>
          </div>
        </div>
      </nav>

      {/* Main Content */}
      <div className="pt-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="mb-8">
            <h1 className="text-[#1a365d] mb-2">Panel de Administrador</h1>
            <p className="text-[#2d3748]">Gestión de operaciones y envíos</p>
          </div>

          {/* Quick Stats */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#2d3748]">Envíos Hoy</h3>
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#00a3e0]">📦</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1a365d]">87</p>
              <p className="text-sm text-[#9ca3af] mt-2">Pendientes: 12</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#2d3748]">En Tránsito</h3>
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#00a3e0]">🚚</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1a365d]">342</p>
              <p className="text-sm text-[#9ca3af] mt-2">Activos ahora</p>
            </div>

            <div className="bg-white p-6 rounded-xl shadow-md">
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-[#2d3748]">Entregados</h3>
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-full flex items-center justify-center">
                  <span className="text-[#00a3e0]">✅</span>
                </div>
              </div>
              <p className="text-3xl font-bold text-[#1a365d]">1,854</p>
              <p className="text-sm text-[#9ca3af] mt-2">Esta semana</p>
            </div>
          </div>

          {/* Placeholder for future components */}
          <div className="bg-white rounded-xl shadow-md p-8">
            <h2 className="text-[#1a365d] mb-4">Vista de Administrador</h2>
            <p className="text-[#2d3748]">
              Panel de control para administradores. Los componentes específicos se agregarán según tus requerimientos.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
