import { useState } from 'react';
import { 
  LayoutDashboard, 
  Shield, 
  Building2, 
  FileCheck, 
  DollarSign, 
  FileText, 
  BarChart3, 
  Bell, 
  Settings, 
  LogOut 
} from 'lucide-react';
import logo from 'figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png';

interface SidebarProps {
  activeItem: string;
  onNavigate: (item: string) => void;
  onLogout: () => void;
}

export function Sidebar({ activeItem, onNavigate, onLogout }: SidebarProps) {
  const menuItems = [
    { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
    { id: 'administradores', label: 'Administradores', icon: Shield },
    { id: 'empresas', label: 'Empresas', icon: Building2 },
    { id: 'solicitudes', label: 'Solicitudes de Guías', icon: FileCheck, badge: 8 },
    { id: 'cobranza', label: 'Cobranza', icon: DollarSign },
    { id: 'guias', label: 'Guías', icon: FileText },
    { id: 'reportes', label: 'Reportes', icon: BarChart3 },
  ];

  const bottomItems = [
    { id: 'notificaciones', label: 'Notificaciones', icon: Bell, badge: 3 },
    { id: 'configuracion', label: 'Configuración', icon: Settings },
  ];

  return (
    <div className="w-64 h-screen bg-[#1a365d] flex flex-col fixed left-0 top-0">
      {/* Logo Section */}
      <div className="p-6 border-b border-white/10">
        <img 
          src={logo} 
          alt="Servicio Robles" 
          className="h-14 w-auto mb-[8px] brightness-0 invert mx-auto" 
        />
        <p className="text-[#00a3e0] text-xs text-center">Panel Super Admin</p>
      </div>

      {/* Main Menu */}
      <nav className="flex-1 overflow-y-auto py-4">
        <div className="space-y-1 px-3">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 group relative ${
                  isActive
                    ? 'bg-[#00a3e0]/20 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                {isActive && (
                  <div className="absolute left-0 top-0 bottom-0 w-1 bg-[#00a3e0] rounded-r-full"></div>
                )}
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-[#e53e3e] text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Separator */}
        <div className="my-4 mx-6 border-t border-white/10"></div>

        {/* Bottom Menu */}
        <div className="space-y-1 px-3">
          {bottomItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <button
                key={item.id}
                onClick={() => onNavigate(item.id)}
                className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 ${
                  isActive
                    ? 'bg-[#00a3e0]/20 text-white'
                    : 'text-white/70 hover:bg-white/5 hover:text-white'
                }`}
              >
                <Icon className="w-5 h-5 flex-shrink-0" />
                <span className="text-sm flex-1 text-left">{item.label}</span>
                {item.badge && (
                  <span className="bg-[#00a3e0] text-white text-xs px-2 py-0.5 rounded-full min-w-[20px] text-center">
                    {item.badge}
                  </span>
                )}
              </button>
            );
          })}
          
          <button
            onClick={onLogout}
            className="w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all duration-200 text-white/70 hover:bg-white/5 hover:text-white"
          >
            <LogOut className="w-5 h-5 flex-shrink-0" />
            <span className="text-sm flex-1 text-left">Cerrar Sesión</span>
          </button>
        </div>
      </nav>
    </div>
  );
}
