import { Bell, ChevronDown } from 'lucide-react';

interface HeaderProps {
  title: string;
}

export function Header({ title }: HeaderProps) {
  return (
    <header className="h-[70px] bg-white shadow-sm flex items-center justify-between px-8 fixed top-0 right-0 left-64 z-30">
      {/* Page Title */}
      <h1 className="text-2xl text-[#1a365d]">{title}</h1>

      {/* Right Section */}
      <div className="flex items-center gap-4">
        {/* Notifications */}
        <button className="relative p-2 hover:bg-[#f8fafc] rounded-lg transition-colors">
          <Bell className="w-5 h-5 text-[#2d3748]" />
          <span className="absolute top-1 right-1 w-2 h-2 bg-[#e53e3e] rounded-full"></span>
        </button>

        {/* User Info */}
        <div className="flex items-center gap-3 pl-4 border-l border-[#9ca3af]/20">
          <div className="w-10 h-10 bg-gradient-to-br from-[#1a365d] to-[#00a3e0] rounded-full flex items-center justify-center">
            <span className="text-white text-sm font-semibold">SA</span>
          </div>
          <div className="hidden md:block">
            <p className="text-sm text-[#1a365d]">Super Admin</p>
            <p className="text-xs text-[#9ca3af]">Administrador</p>
          </div>
          <ChevronDown className="w-4 h-4 text-[#9ca3af]" />
        </div>
      </div>
    </header>
  );
}
