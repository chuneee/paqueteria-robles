import { useState } from "react";
import { FileText, Clock, Building2, DollarSign } from "lucide-react";
import { Sidebar, Header } from "../components/superadmin/shared";
import {
  MetricCard,
  GuiasChart,
  EstadoGuiasChart,
  SolicitudesRecientes,
  TopEmpresas,
  ActividadReciente,
} from "../components/superadmin/dashboard";
import { AdministradoresView } from "./superadmin/AdministradoresView";
import { EmpresasView } from "./superadmin/EmpresasView";
import { SolicitudesView } from "./superadmin/SolicitudesView";
import { CobranzaView } from "./superadmin/CobranzaView";
import { GuiasView } from "./superadmin/GuiasView";
import { ReportesView } from "./superadmin/ReportesView";
import { NotificacionesView } from "./superadmin/NotificacionesView";
import { ConfiguracionView } from "./superadmin/ConfiguracionView";

interface SuperAdminDashboardProps {
  onLogout: () => void;
}

export function SuperAdminDashboard({ onLogout }: SuperAdminDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard");

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  // Si estamos en la vista de administradores, renderizar esa vista
  if (activeView === "administradores") {
    return (
      <AdministradoresView onLogout={onLogout} onNavigate={handleNavigate} />
    );
  }

  // Si estamos en la vista de empresas, renderizar esa vista
  if (activeView === "empresas") {
    return <EmpresasView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  // Si estamos en la vista de solicitudes, renderizar esa vista
  if (activeView === "solicitudes") {
    return <SolicitudesView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  // Si estamos en la vista de cobranza, renderizar esa vista
  if (activeView === "cobranza") {
    return <CobranzaView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  // Si estamos en la vista de guías, renderizar esa vista
  if (activeView === "guias") {
    return <GuiasView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  // Si estamos en la vista de reportes, renderizar esa vista
  if (activeView === "reportes") {
    return <ReportesView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  // Si estamos en la vista de notificaciones, renderizar esa vista
  if (activeView === "notificaciones") {
    return (
      <NotificacionesView onLogout={onLogout} onNavigate={handleNavigate} />
    );
  }

  // Si estamos en la vista de configuración, renderizar esa vista
  if (activeView === "configuracion") {
    return (
      <ConfiguracionView onLogout={onLogout} onNavigate={handleNavigate} />
    );
  }

  // Dashboard principal
  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem={activeView}
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Content */}
        <main className="pt-[70px] p-8">
          {/* Métricas Principales - 4 columnas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-8">
            <MetricCard
              icon={FileText}
              iconColor="bg-[#00a3e0]"
              title="Guías Generadas Hoy"
              value="127"
              trend={{ value: "+12% vs ayer", isPositive: true }}
            />
            <MetricCard
              icon={Clock}
              iconColor="bg-[#d69e2e]"
              title="Solicitudes Pendientes"
              value="8"
              badge={true}
            />
            <MetricCard
              icon={Building2}
              iconColor="bg-[#1a365d]"
              title="Empresas Activas"
              value="45"
              trend={{ value: "+3 este mes", isPositive: true }}
            />
            <MetricCard
              icon={DollarSign}
              iconColor="bg-[#e53e3e]"
              title="Cobranza Pendiente"
              value="$48,500"
              subtitle="MXN"
            />
          </div>

          {/* Gráficas - 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <GuiasChart />
            <EstadoGuiasChart />
          </div>

          {/* Solicitudes y Top Empresas - 2 columnas */}
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-6 mb-8">
            <SolicitudesRecientes />
            <TopEmpresas />
          </div>

          {/* Actividad Reciente - Ancho completo (sin margin-bottom) */}
          <ActividadReciente />
        </main>
      </div>
    </div>
  );
}
