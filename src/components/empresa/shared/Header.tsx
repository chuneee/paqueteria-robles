import { Bell } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="fixed top-0 right-0 left-64 h-[70px] bg-white border-b border-[#9ca3af]/20 z-40">
      <div className="h-full px-8 flex items-center justify-between">
        <div>
          <h1 className="text-2xl text-[#1a365d]">{title}</h1>
        </div>

        <div className="flex items-center gap-4">
          {/* Notificaciones */}
          <button className="relative p-2 hover:bg-[#f8fafc] rounded-lg transition-colors">
            <Bell className="w-6 h-6 text-[#9ca3af]" />
            <span className="absolute top-1 right-1 w-2 h-2 bg-[#e53e3e] rounded-full"></span>
          </button>

          {/* Avatar */}
          <div className="flex items-center gap-3">
            <div className="w-10 h-10 bg-[#00a3e0] rounded-full flex items-center justify-center text-white text-sm">
              CL
            </div>
            <div>
              <p className="text-sm text-[#2d3748]">Comercial López</p>
              <p className="text-xs text-[#9ca3af]">Empresa</p>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
