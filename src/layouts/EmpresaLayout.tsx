// ========================================
// LAYOUT DE EMPRESA
// ========================================

import { Outlet } from 'react-router-dom';
import { Header } from '@/components/empresa/shared/Header';
import { Sidebar } from '@/components/empresa/shared/Sidebar';

/**
 * Layout para el panel de empresa
 */
export default function EmpresaLayout() {
  return (
    <div className="flex h-screen bg-gray-100">
      {/* Sidebar */}
      <Sidebar />

      {/* Main Content */}
      <div className="flex-1 flex flex-col overflow-hidden">
        {/* Header */}
        <Header />

        {/* Content */}
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
