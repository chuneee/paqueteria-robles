import { useState } from "react";
import {
  Package,
  FileText,
  Clock,
  ArrowRight,
  PackagePlus,
  History,
  MapPin,
  Calendar,
  Truck,
  PackageCheck,
} from "lucide-react";
import { Sidebar, Header } from "../components/empresa/shared";
import { SolicitarGuiasView } from "./empresa/SolicitarGuiasView";
import { MisClientesView } from "./empresa/MisClientesView";
import { GenerarGuiaView } from "./empresa/GenerarGuiaView";
import { HistorialGuiasView } from "./empresa/HistorialGuiasView";
import { PerfilConfiguracionView } from "./empresa/PerfilConfiguracionView";

interface EmpresaDashboardProps {
  onLogout: () => void;
}

interface GuiaReciente {
  id: number;
  numero: string;
  fecha: string;
  destino: string;
  destinatario: string;
  estado: "generada" | "recolectada" | "en_transito" | "entregada";
}

const guiasRecientes: GuiaReciente[] = [
  {
    id: 1,
    numero: "SR-001245",
    fecha: "28/11/2024",
    destino: "Hermosillo, Sonora",
    destinatario: "Juan Pérez",
    estado: "en_transito",
  },
  {
    id: 2,
    numero: "SR-001244",
    fecha: "27/11/2024",
    destino: "Nogales, Sonora",
    destinatario: "María García",
    estado: "entregada",
  },
  {
    id: 3,
    numero: "SR-001243",
    fecha: "27/11/2024",
    destino: "Agua Prieta, Sonora",
    destinatario: "Carlos Ruiz",
    estado: "recolectada",
  },
  {
    id: 4,
    numero: "SR-001242",
    fecha: "26/11/2024",
    destino: "Hermosillo, Sonora",
    destinatario: "Ana Martínez",
    estado: "entregada",
  },
  {
    id: 5,
    numero: "SR-001241",
    fecha: "26/11/2024",
    destino: "Guaymas, Sonora",
    destinatario: "Roberto López",
    estado: "entregada",
  },
];

export function EmpresaDashboard({ onLogout }: EmpresaDashboardProps) {
  const [activeView, setActiveView] = useState("dashboard");
  const [hasData] = useState(true); // Cambiar a false para ver estado vacío

  const handleNavigate = (view: string) => {
    setActiveView(view);
  };

  const estadoConfig = {
    generada: {
      label: "Generada",
      color: "bg-[#9ca3af]/10 text-[#9ca3af]",
      icon: FileText,
    },
    recolectada: {
      label: "Recolectada",
      color: "bg-[#00a3e0]/10 text-[#00a3e0]",
      icon: PackageCheck,
    },
    en_transito: {
      label: "En tránsito",
      color: "bg-[#d69e2e]/10 text-[#d69e2e]",
      icon: Truck,
    },
    entregada: {
      label: "Entregada",
      color: "bg-[#38a169]/10 text-[#38a169]",
      icon: Package,
    },
  };

  // Renderizar vista específica según navegación
  if (activeView === "solicitar-guias") {
    return (
      <SolicitarGuiasView onLogout={onLogout} onNavigate={handleNavigate} />
    );
  }

  if (activeView === "mis-clientes") {
    return <MisClientesView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  if (activeView === "generar-guia") {
    return <GenerarGuiaView onLogout={onLogout} onNavigate={handleNavigate} />;
  }

  if (activeView === "historial-guias") {
    return (
      <HistorialGuiasView onLogout={onLogout} onNavigate={handleNavigate} />
    );
  }

  if (activeView === "perfil") {
    return (
      <PerfilConfiguracionView
        onLogout={onLogout}
        onNavigate={handleNavigate}
      />
    );
  }

  // Si no es dashboard, solicitar-guias, mis-clientes, generar-guia, historial-guias ni perfil, mostrar otras vistas (placeholder por ahora)
  if (activeView !== "dashboard") {
    return (
      <div className="min-h-screen bg-[#f8fafc]">
        <Sidebar
          activeItem={activeView}
          onNavigate={handleNavigate}
          onLogout={onLogout}
        />
        <div className="ml-64">
          <Header
            title={
              activeView.charAt(0).toUpperCase() +
              activeView.slice(1).replace("-", " ")
            }
          />
          <main className="pt-[70px] p-8">
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <h3 className="text-lg text-[#1a365d] mb-2">
                Vista en construcción
              </h3>
              <p className="text-sm text-[#9ca3af]">
                Esta sección estará disponible próximamente
              </p>
            </div>
          </main>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="dashboard"
        onNavigate={handleNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Dashboard" />

        {/* Content */}
        <main className="pt-[70px] p-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p className="text-sm text-[#9ca3af] mt-[10px] mr-[0px] mb-[0px] ml-[0px]">
              <span className="text-[#2d3748]">Inicio</span>
              {" / "}
              <span className="text-[#2d3748]">Dashboard</span>
            </p>
          </div>

          {hasData ? (
            <>
              {/* Tarjetas de Métricas */}
              <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-8">
                {/* Guías Disponibles */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
                      <Package className="w-7 h-7 text-[#1a365d]" />
                    </div>
                  </div>
                  <p className="text-4xl text-[#1a365d] mb-2">35</p>
                  <p className="text-sm text-[#2d3748] mb-1">
                    Guías disponibles
                  </p>
                  <p className="text-xs text-[#9ca3af]">Saldo actual</p>
                </div>

                {/* Guías Generadas este Mes */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                      <FileText className="w-7 h-7 text-[#00a3e0]" />
                    </div>
                  </div>
                  <p className="text-4xl text-[#1a365d] mb-2">142</p>
                  <p className="text-sm text-[#2d3748] mb-1">
                    Generadas este mes
                  </p>
                  <p className="text-xs text-[#9ca3af]">
                    Actualizado al día de hoy
                  </p>
                </div>

                {/* Solicitudes Pendientes */}
                <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow">
                  <div className="flex items-start justify-between mb-4">
                    <div className="w-14 h-14 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
                      <Clock className="w-7 h-7 text-[#d69e2e]" />
                    </div>
                  </div>
                  <p className="text-4xl text-[#1a365d] mb-2">2</p>
                  <p className="text-sm text-[#2d3748] mb-1">
                    Solicitudes de guías
                  </p>
                  <p className="text-xs text-[#9ca3af]">
                    En revisión por Servicio Robles
                  </p>
                </div>
              </div>

              {/* Accesos Rápidos */}
              <div className="mb-8">
                <h2 className="text-lg text-[#1a365d] mb-4">Accesos Rápidos</h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
                  {/* Generar Guía */}
                  <button
                    onClick={() => handleNavigate("generar-guia")}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] text-left border-2 border-transparent hover:border-[#1a365d]/20 group"
                  >
                    <div className="w-12 h-12 bg-[#1a365d] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#2d4a7c] transition-colors">
                      <FileText className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg text-[#1a365d] mb-2 flex items-center gap-2">
                      Generar Guía
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-[#9ca3af]">
                      Crear una guía nueva y descargar el PDF
                    </p>
                  </button>

                  {/* Solicitar Guías */}
                  <button
                    onClick={() => handleNavigate("solicitar-guias")}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] text-left border-2 border-transparent hover:border-[#00a3e0]/20 group"
                  >
                    <div className="w-12 h-12 bg-[#00a3e0] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#0086b8] transition-colors">
                      <PackagePlus className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg text-[#1a365d] mb-2 flex items-center gap-2">
                      Solicitar Guías
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-[#9ca3af]">
                      Pedir más guías prepagadas
                    </p>
                  </button>

                  {/* Ver Historial */}
                  <button
                    onClick={() => handleNavigate("historial-guias")}
                    className="bg-white rounded-xl p-6 shadow-sm hover:shadow-lg transition-all hover:scale-[1.02] text-left border-2 border-transparent hover:border-[#9ca3af]/20 group"
                  >
                    <div className="w-12 h-12 bg-[#2d3748] rounded-xl flex items-center justify-center mb-4 group-hover:bg-[#4a5568] transition-colors">
                      <History className="w-6 h-6 text-white" />
                    </div>
                    <h3 className="text-lg text-[#1a365d] mb-2 flex items-center gap-2">
                      Historial de Guías
                      <ArrowRight className="w-5 h-5 opacity-0 group-hover:opacity-100 transition-opacity" />
                    </h3>
                    <p className="text-sm text-[#9ca3af]">
                      Consultar todas tus guías generadas
                    </p>
                  </button>
                </div>
              </div>

              {/* Actividad Reciente */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#9ca3af]/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg text-[#1a365d]">
                      Actividad Reciente
                    </h2>
                    <button
                      onClick={() => handleNavigate("historial-guias")}
                      className="text-sm text-[#00a3e0] hover:underline flex items-center gap-1"
                    >
                      Ver todo
                      <ArrowRight className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Número de Guía
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Destinatario
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Destino
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Estado
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9ca3af]/20">
                      {guiasRecientes.map((guia) => {
                        const config = estadoConfig[guia.estado];
                        const IconEstado = config.icon;

                        return (
                          <tr
                            key={guia.id}
                            className="hover:bg-[#f8fafc]/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <span className="text-sm text-[#1a365d]">
                                {guia.numero}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Calendar className="w-4 h-4 text-[#9ca3af]" />
                                <span className="text-sm text-[#2d3748]">
                                  {guia.fecha}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span className="text-sm text-[#2d3748]">
                                {guia.destinatario}
                              </span>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <MapPin className="w-4 h-4 text-[#9ca3af]" />
                                <span className="text-sm text-[#2d3748]">
                                  {guia.destino}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <span
                                className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${config.color}`}
                              >
                                <IconEstado className="w-3.5 h-3.5" />
                                {config.label}
                              </span>
                            </td>
                          </tr>
                        );
                      })}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            // Estado Vacío - Empresa Nueva
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-[#00a3e0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Package className="w-10 h-10 text-[#00a3e0]" />
                </div>
                <h2 className="text-2xl text-[#1a365d] mb-3">
                  ¡Bienvenido a Servicio Robles!
                </h2>
                <p className="text-sm text-[#9ca3af] mb-8 max-w-md mx-auto">
                  Estás listo para comenzar a gestionar tus envíos. Para
                  empezar, solicita tus primeras guías prepagadas.
                </p>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-8">
                  <button
                    onClick={() => handleNavigate("solicitar-guias")}
                    className="bg-[#00a3e0] text-white rounded-xl p-6 hover:bg-[#0086b8] transition-all shadow-sm hover:shadow-md text-left"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <PackagePlus className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm mb-1">Paso 1</h3>
                    <p className="text-sm opacity-90">
                      Solicitar Guías Prepagadas
                    </p>
                  </button>

                  <button
                    onClick={() => handleNavigate("generar-guia")}
                    className="bg-[#1a365d] text-white rounded-xl p-6 hover:bg-[#2d4a7c] transition-all shadow-sm hover:shadow-md text-left"
                  >
                    <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center mb-3">
                      <FileText className="w-5 h-5 text-white" />
                    </div>
                    <h3 className="text-sm mb-1">Paso 2</h3>
                    <p className="text-sm opacity-90">
                      Generar tu Primera Guía
                    </p>
                  </button>
                </div>

                <div className="bg-[#f8fafc] rounded-lg p-6">
                  <h4 className="text-sm text-[#1a365d] mb-3">
                    ¿Necesitas ayuda?
                  </h4>
                  <p className="text-xs text-[#9ca3af] mb-4">
                    Nuestro equipo está disponible para asistirte en el proceso
                    de configuración inicial.
                  </p>
                  <button className="text-xs text-[#00a3e0] hover:underline">
                    Contactar soporte →
                  </button>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>
    </div>
  );
}
