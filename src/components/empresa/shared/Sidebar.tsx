import { 
  LayoutDashboard, 
  FileText, 
  PackagePlus, 
  Users, 
  History, 
  User,
  LogOut 
} from 'lucide-react';
import logo from 'figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png';

interface SidebarProps {
  activeItem: string;
  onNavigate: (view: string) => void;
  onLogout: () => void;
}

interface MenuItem {
  id: string;
  label: string;
  icon: React.ElementType;
}

const menuItems: MenuItem[] = [
  { id: 'dashboard', label: 'Dashboard', icon: LayoutDashboard },
  { id: 'generar-guia', label: 'Generar Guía', icon: FileText },
  { id: 'solicitar-guias', label: 'Solicitar Guías', icon: PackagePlus },
  { id: 'mis-clientes', label: 'Mis Clientes', icon: Users },
  { id: 'historial-guias', label: 'Historial de Guías', icon: History },
  { id: 'perfil', label: 'Perfil / Configuración', icon: User },
];

export function Sidebar({ activeItem, onNavigate, onLogout }: SidebarProps) {
  return (
    <aside className="fixed left-0 top-0 h-screen w-64 bg-[#1a365d] text-white flex flex-col z-50">
      {/* Logo */}
      <div className="p-6 border-b border-white/10">
        <img 
          src={logo} 
          alt="Servicio Robles" 
          className="h-14 w-auto mb-[8px] brightness-0 invert mx-auto" 
        />
        <p className="text-center text-xs text-white/60 mt-2">Portal de Empresa</p>
      </div>

      {/* Navigation */}
      <nav className="flex-1 px-4 py-6 overflow-y-auto">
        <ul className="space-y-2">
          {menuItems.map((item) => {
            const Icon = item.icon;
            const isActive = activeItem === item.id;
            
            return (
              <li key={item.id}>
                <button
                  onClick={() => onNavigate(item.id)}
                  className={`w-full flex items-center gap-3 px-4 py-3 rounded-lg transition-all ${
                    isActive
                      ? 'bg-[#00a3e0] text-white shadow-lg'
                      : 'text-white/70 hover:bg-white/10 hover:text-white'
                  }`}
                >
                  <Icon className="w-5 h-5 flex-shrink-0" />
                  <span className="text-sm">{item.label}</span>
                </button>
              </li>
            );
          })}
        </ul>
      </nav>

      {/* User Info & Logout */}
      <div className="p-4 border-t border-white/10">
        <div className="flex items-center gap-3 px-4 py-3 mb-2 bg-white/5 rounded-lg">
          <div className="w-10 h-10 bg-[#00a3e0] rounded-full flex items-center justify-center text-sm">
            CL
          </div>
          <div className="flex-1 min-w-0">
            <p className="text-sm truncate">Comercial López</p>
            <p className="text-xs text-white/60 truncate">Empresa</p>
          </div>
        </div>
        
        <button
          onClick={onLogout}
          className="w-full flex items-center gap-3 px-4 py-3 rounded-lg text-white/70 hover:bg-[#e53e3e]/20 hover:text-white transition-all"
        >
          <LogOut className="w-5 h-5" />
          <span className="text-sm">Cerrar Sesión</span>
        </button>
      </div>
    </aside>
  );
}
