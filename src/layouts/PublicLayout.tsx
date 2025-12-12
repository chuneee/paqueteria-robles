// ========================================
// LAYOUT PÚBLICO
// ========================================

import { Outlet } from 'react-router-dom';

/**
 * Layout para páginas públicas (Landing, Login, etc.)
 */
export default function PublicLayout() {
  return (
    <div className="min-h-screen bg-gray-50">
      <Outlet />
    </div>
  );
}
