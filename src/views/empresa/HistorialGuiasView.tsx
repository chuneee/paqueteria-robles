import { useState } from "react";
import {
  Search,
  Calendar,
  ChevronDown,
  X,
  Download,
  Eye,
  FileText,
  History as HistoryIcon,
  Filter,
  Package,
  Truck,
  CheckCircle,
  Loader2,
} from "lucide-react";
import { Sidebar, Header } from "../../components/empresa/shared";
import { DetalleGuiaModal } from "../../components/empresa/historial-guias";

interface HistorialGuiasViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface Guia {
  numeroGuia: string;
  fechaCreacion: string;
  consignatario: {
    razonSocial: string;
    contacto: string;
    departamento: string;
    direccion: string;
    telefono: string;
    ciudad: string;
    estado: string;
  };
  tipoEnvio: {
    valijas: number;
    cajas: number;
    sobres: number;
    envases: number;
  };
  pesoTotal: number;
  estado: "generada" | "recolectada" | "en_transito" | "entregada";
  remitente: {
    razonSocial: string;
    contacto: string;
    departamento: string;
    direccion: string;
    telefono: string;
  };
  infoEnvio: {
    noCintillo?: string;
    noContrato?: string;
    facturarEn?: string;
    caracteristicas: string;
    valorDeclarado: number;
  };
  peso: {
    pesoReal: number;
    pesoDimensional: number;
    pesoTotal: number;
  };
  timeline?: {
    generada?: string;
    recolectada?: string;
    enTransito?: string;
    entregada?: string;
  };
}

// Datos de ejemplo
const guiasData: Guia[] = [
  {
    numeroGuia: "SR-001245",
    fechaCreacion: "28/11/2024",
    consignatario: {
      razonSocial: "Comercial López",
      contacto: "Ana Ramírez",
      departamento: "Ventas",
      direccion: "Calle 23 #102, Col. Centro, 83000",
      telefono: "662-345-8790",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    tipoEnvio: { valijas: 0, cajas: 1, sobres: 0, envases: 0 },
    pesoTotal: 3.5,
    estado: "generada",
    remitente: {
      razonSocial: "Mi Empresa S.A. de C.V.",
      contacto: "Juan Martínez",
      departamento: "Logística",
      direccion: "Blvd. Luis Encinas 250, Centro, 83000, Hermosillo, Sonora",
      telefono: "662-123-4567",
    },
    infoEnvio: {
      noCintillo: "CIN-12345",
      caracteristicas: "Documentos corporativos y material promocional",
      valorDeclarado: 1500.0,
    },
    peso: {
      pesoReal: 3.5,
      pesoDimensional: 2.8,
      pesoTotal: 3.5,
    },
    timeline: {
      generada: "28/11/2024 - 10:30 AM",
    },
  },
  {
    numeroGuia: "SR-001238",
    fechaCreacion: "27/11/2024",
    consignatario: {
      razonSocial: "Farmacia San José",
      contacto: "Carlos Herrera",
      departamento: "Compras",
      direccion: "Constitución 210, Modelo, 83190",
      telefono: "662-128-5544",
      ciudad: "Chihuahua",
      estado: "Chihuahua",
    },
    tipoEnvio: { valijas: 1, cajas: 0, sobres: 0, envases: 0 },
    pesoTotal: 1.2,
    estado: "en_transito",
    remitente: {
      razonSocial: "Mi Empresa S.A. de C.V.",
      contacto: "Juan Martínez",
      departamento: "Logística",
      direccion: "Blvd. Luis Encinas 250, Centro, 83000, Hermosillo, Sonora",
      telefono: "662-123-4567",
    },
    infoEnvio: {
      caracteristicas: "Medicamentos y suministros médicos",
      valorDeclarado: 800.0,
    },
    peso: {
      pesoReal: 1.2,
      pesoDimensional: 0.8,
      pesoTotal: 1.2,
    },
    timeline: {
      generada: "27/11/2024 - 08:15 AM",
      recolectada: "27/11/2024 - 11:30 AM",
      enTransito: "27/11/2024 - 02:45 PM",
    },
  },
  {
    numeroGuia: "SR-001220",
    fechaCreacion: "26/11/2024",
    consignatario: {
      razonSocial: "Abarrotes del Valle",
      contacto: "Roberto Sánchez",
      departamento: "Recepción",
      direccion: "Av. Universidad 850, San Benito, 83190",
      telefono: "662-789-4561",
      ciudad: "Nogales",
      estado: "Sonora",
    },
    tipoEnvio: { valijas: 0, cajas: 0, sobres: 2, envases: 0 },
    pesoTotal: 0.4,
    estado: "entregada",
    remitente: {
      razonSocial: "Mi Empresa S.A. de C.V.",
      contacto: "Juan Martínez",
      departamento: "Logística",
      direccion: "Blvd. Luis Encinas 250, Centro, 83000, Hermosillo, Sonora",
      telefono: "662-123-4567",
    },
    infoEnvio: {
      facturarEn: "Hermosillo",
      caracteristicas: "Documentos legales urgentes",
      valorDeclarado: 500.0,
    },
    peso: {
      pesoReal: 0.4,
      pesoDimensional: 0.2,
      pesoTotal: 0.4,
    },
    timeline: {
      generada: "26/11/2024 - 09:00 AM",
      recolectada: "26/11/2024 - 10:15 AM",
      enTransito: "26/11/2024 - 12:30 PM",
      entregada: "26/11/2024 - 04:20 PM",
    },
  },
  {
    numeroGuia: "SR-001215",
    fechaCreacion: "25/11/2024",
    consignatario: {
      razonSocial: "Papelería Robles",
      contacto: "Marta Gutiérrez",
      departamento: "Almacén",
      direccion: "Juárez 540, Centro, 83000",
      telefono: "662-555-2300",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    tipoEnvio: { valijas: 0, cajas: 2, sobres: 0, envases: 0 },
    pesoTotal: 5.8,
    estado: "recolectada",
    remitente: {
      razonSocial: "Mi Empresa S.A. de C.V.",
      contacto: "Juan Martínez",
      departamento: "Logística",
      direccion: "Blvd. Luis Encinas 250, Centro, 83000, Hermosillo, Sonora",
      telefono: "662-123-4567",
    },
    infoEnvio: {
      caracteristicas: "Material de oficina y papelería",
      valorDeclarado: 2000.0,
    },
    peso: {
      pesoReal: 5.8,
      pesoDimensional: 4.2,
      pesoTotal: 5.8,
    },
    timeline: {
      generada: "25/11/2024 - 11:45 AM",
      recolectada: "25/11/2024 - 03:20 PM",
    },
  },
];

type EstadoFilter =
  | "todos"
  | "generada"
  | "recolectada"
  | "en_transito"
  | "entregada";

export function HistorialGuiasView({
  onLogout,
  onNavigate,
}: HistorialGuiasViewProps) {
  const [guias] = useState<Guia[]>(guiasData);
  const [searchTerm, setSearchTerm] = useState("");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>("todos");
  const [clienteFilter, setClienteFilter] = useState("todos");
  const [selectedGuia, setSelectedGuia] = useState<Guia | null>(null);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [isExporting, setIsExporting] = useState(false);
  const [hasData] = useState(true); // Cambiar a false para ver estado vacío

  // Obtener lista de clientes únicos para el filtro
  const clientesUnicos = Array.from(
    new Set(guias.map((g) => g.consignatario.razonSocial))
  );

  // Filtrar guías
  const filteredGuias = guias.filter((guia) => {
    const matchSearch =
      searchTerm === "" ||
      guia.numeroGuia.toLowerCase().includes(searchTerm.toLowerCase());

    const matchEstado =
      estadoFilter === "todos" || guia.estado === estadoFilter;

    const matchCliente =
      clienteFilter === "todos" ||
      guia.consignatario.razonSocial === clienteFilter;

    // Filtro de fecha (simplificado para demo)
    let matchFecha = true;
    if (fechaDesde || fechaHasta) {
      // Aquí iría la lógica real de comparación de fechas
      matchFecha = true;
    }

    return matchSearch && matchEstado && matchCliente && matchFecha;
  });

  const handleLimpiarFiltros = () => {
    setSearchTerm("");
    setFechaDesde("");
    setFechaHasta("");
    setEstadoFilter("todos");
    setClienteFilter("todos");
  };

  const handleExportarExcel = () => {
    setIsExporting(true);
    // Simular exportación
    setTimeout(() => {
      setIsExporting(false);
      alert("Archivo Excel descargado");
    }, 1500);
  };

  const handleVerDetalle = (guia: Guia) => {
    setSelectedGuia(guia);
    setIsDetalleOpen(true);
  };

  const handleDescargarPDF = (numeroGuia: string) => {
    console.log("Descargando PDF de guía:", numeroGuia);
    alert(`Descargando PDF de la guía ${numeroGuia}`);
  };

  const estadoConfig = {
    generada: {
      label: "Generada",
      color: "bg-[#6b7280]/10 text-[#6b7280]",
      icon: FileText,
    },
    recolectada: {
      label: "Recolectada",
      color: "bg-[#00a3e0]/10 text-[#00a3e0]",
      icon: Package,
    },
    en_transito: {
      label: "En tránsito",
      color: "bg-[#d69e2e]/10 text-[#d69e2e]",
      icon: Truck,
    },
    entregada: {
      label: "Entregada",
      color: "bg-[#38a169]/10 text-[#38a169]",
      icon: CheckCircle,
    },
  };

  const getTipoEnvioText = (tipoEnvio: Guia["tipoEnvio"]) => {
    const tipos = [];
    if (tipoEnvio.valijas > 0) tipos.push(`Valija (${tipoEnvio.valijas})`);
    if (tipoEnvio.cajas > 0) tipos.push(`Caja (${tipoEnvio.cajas})`);
    if (tipoEnvio.sobres > 0) tipos.push(`Sobre (${tipoEnvio.sobres})`);
    if (tipoEnvio.envases > 0) tipos.push(`Envase (${tipoEnvio.envases})`);
    return tipos.join(", ");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="historial-guias"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Historial de Guías" />

        {/* Content */}
        <main className="pt-[70px] p-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p className="text-sm text-[#9ca3af] mt-[10px] mr-[0px] mb-[0px] ml-[0px]">
              <span
                className="hover:text-[#00a3e0] cursor-pointer"
                onClick={() => onNavigate("dashboard")}
              >
                Inicio
              </span>
              {" / "}
              <span className="text-[#2d3748]">Historial de Guías</span>
            </p>
          </div>

          {hasData && guias.length > 0 ? (
            <>
              {/* Barra de Filtros */}
              <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
                <div className="flex items-center gap-3 mb-4">
                  <Filter className="w-5 h-5 text-[#00a3e0]" />
                  <h3 className="text-sm text-[#1a365d]">
                    Filtros de Búsqueda
                  </h3>
                </div>

                <div className="grid grid-cols-1 lg:grid-cols-4 gap-4 mb-4">
                  {/* Búsqueda por número */}
                  <div className="relative">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Buscar número de guía..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>

                  {/* Fecha desde */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="date"
                      value={fechaDesde}
                      onChange={(e) => setFechaDesde(e.target.value)}
                      placeholder="Desde"
                      className="w-full pl-10 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>

                  {/* Fecha hasta */}
                  <div className="relative">
                    <Calendar className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="date"
                      value={fechaHasta}
                      onChange={(e) => setFechaHasta(e.target.value)}
                      placeholder="Hasta"
                      className="w-full pl-10 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                    />
                  </div>

                  {/* Filtro por estado */}
                  <div className="relative">
                    <select
                      value={estadoFilter}
                      onChange={(e) =>
                        setEstadoFilter(e.target.value as EstadoFilter)
                      }
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all appearance-none bg-white pr-10"
                    >
                      <option value="todos">Todos los estados</option>
                      <option value="generada">Generada</option>
                      <option value="recolectada">Recolectada</option>
                      <option value="en_transito">En tránsito</option>
                      <option value="entregada">Entregada</option>
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] pointer-events-none" />
                  </div>

                  {/* Filtro por cliente */}
                  <div className="relative lg:col-span-2">
                    <select
                      value={clienteFilter}
                      onChange={(e) => setClienteFilter(e.target.value)}
                      className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all appearance-none bg-white pr-10"
                    >
                      <option value="todos">Todos los clientes</option>
                      {clientesUnicos.map((cliente) => (
                        <option key={cliente} value={cliente}>
                          {cliente}
                        </option>
                      ))}
                    </select>
                    <ChevronDown className="absolute right-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] pointer-events-none" />
                  </div>
                </div>

                {/* Botones de acción */}
                <div className="flex gap-3">
                  <button
                    onClick={handleLimpiarFiltros}
                    className="px-4 py-2 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors flex items-center gap-2 text-sm"
                  >
                    <X className="w-4 h-4" />
                    Limpiar filtros
                  </button>
                  <button
                    onClick={handleExportarExcel}
                    disabled={isExporting}
                    className="px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/5 transition-colors flex items-center gap-2 text-sm disabled:opacity-50"
                  >
                    {isExporting ? (
                      <Loader2 className="w-4 h-4 animate-spin" />
                    ) : (
                      <Download className="w-4 h-4" />
                    )}
                    Exportar Excel
                  </button>
                </div>
              </div>

              {/* Tabla de Guías */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#9ca3af]/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg text-[#1a365d]">Listado de Guías</h2>
                    <span className="text-sm text-[#9ca3af]">
                      {filteredGuias.length}{" "}
                      {filteredGuias.length === 1 ? "guía" : "guías"}
                    </span>
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
                          Fecha de Creación
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Consignatario
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Destino
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Tipo de Envío
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Peso Total
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9ca3af]/20">
                      {filteredGuias.length > 0 ? (
                        filteredGuias.map((guia) => {
                          const config = estadoConfig[guia.estado];
                          const IconEstado = config.icon;

                          return (
                            <tr
                              key={guia.numeroGuia}
                              className="hover:bg-[#f8fafc]/50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#1a365d]">
                                  {guia.numeroGuia}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {guia.fechaCreacion}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <p className="text-sm text-[#2d3748]">
                                  {guia.consignatario.razonSocial}
                                </p>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {guia.consignatario.ciudad},{" "}
                                  {guia.consignatario.estado}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {getTipoEnvioText(guia.tipoEnvio)}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {guia.pesoTotal} kg
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span
                                  className={`inline-flex items-center gap-1.5 px-2.5 py-1 rounded-full text-xs ${config.color}`}
                                >
                                  <IconEstado className="w-3.5 h-3.5" />
                                  {config.label}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <div className="flex items-center gap-2">
                                  <button
                                    onClick={() => handleVerDetalle(guia)}
                                    className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                                    title="Ver detalle"
                                  >
                                    <Eye className="w-4 h-4 text-[#00a3e0]" />
                                  </button>
                                  <button
                                    onClick={() =>
                                      handleDescargarPDF(guia.numeroGuia)
                                    }
                                    className="p-2 hover:bg-[#1a365d]/10 rounded-lg transition-colors"
                                    title="Descargar PDF"
                                  >
                                    <Download className="w-4 h-4 text-[#1a365d]" />
                                  </button>
                                </div>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={8} className="px-6 py-12 text-center">
                            <p className="text-sm text-[#9ca3af]">
                              No se encontraron guías con los filtros aplicados
                            </p>
                          </td>
                        </tr>
                      )}
                    </tbody>
                  </table>
                </div>
              </div>
            </>
          ) : (
            // Estado Vacío
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-[#00a3e0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <HistoryIcon className="w-10 h-10 text-[#00a3e0]" />
                </div>
                <h2 className="text-2xl text-[#1a365d] mb-3">
                  Aún no has generado ninguna guía
                </h2>
                <p className="text-sm text-[#9ca3af] mb-8 max-w-md mx-auto">
                  Comienza a gestionar tus envíos generando tu primera guía.
                  Aparecerán aquí para que puedas consultarlas en cualquier
                  momento.
                </p>

                <button
                  onClick={() => onNavigate("generar-guia")}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors shadow-sm"
                >
                  <FileText className="w-5 h-5" />
                  Generar Primera Guía
                </button>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Detalle */}
      <DetalleGuiaModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        guia={
          selectedGuia
            ? {
                numeroGuia: selectedGuia.numeroGuia,
                fechaCreacion: selectedGuia.fechaCreacion,
                estado: selectedGuia.estado,
                remitente: selectedGuia.remitente,
                consignatario: {
                  razonSocial: selectedGuia.consignatario.razonSocial,
                  contacto: selectedGuia.consignatario.contacto,
                  departamento: selectedGuia.consignatario.departamento,
                  direccion: selectedGuia.consignatario.direccion,
                  telefono: selectedGuia.consignatario.telefono,
                },
                infoEnvio: selectedGuia.infoEnvio,
                tipoEnvio: selectedGuia.tipoEnvio,
                peso: selectedGuia.peso,
                timeline: selectedGuia.timeline,
              }
            : null
        }
        onDescargarPDF={handleDescargarPDF}
      />
    </div>
  );
}
