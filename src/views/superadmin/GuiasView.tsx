import { useState } from "react";
import {
  Search,
  Filter,
  Download,
  Eye,
  RefreshCw,
  ChevronLeft,
  ChevronRight,
  X,
  Package,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import {
  DetalleGuiaModal,
  ActualizarEstadoGuiaModal,
} from "../../components/superadmin/guias";
import { Toast, ToastType } from "../../components/shared/Toast";

interface GuiasViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface Guia {
  id: number;
  numero: string;
  empresa: string;
  fechaCreacion: string;
  remitente: {
    nombre: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
  };
  consignatario: {
    nombre: string;
    telefono: string;
    direccion: string;
    ciudad: string;
    estado: string;
  };
  tipoEnvio: string;
  valijas: number;
  cajas: number;
  sobres: number;
  envases: number;
  pesoReal: number;
  pesoDimensional: number;
  pesoTotal: number;
  estado: "generada" | "recolectada" | "en_transito" | "entregada";
  historial: Array<{
    estado: string;
    fecha: string;
    hora: string;
    notas?: string;
  }>;
}

const initialGuias: Guia[] = [
  {
    id: 982,
    numero: "#SR-000982",
    empresa: "Comercial López",
    fechaCreacion: "28/11/2024",
    remitente: {
      nombre: "Comercial López S.A.",
      telefono: "662 222 3344",
      direccion: "Av. Universidad 123",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "María García",
      telefono: "662 555 1234",
      direccion: "Calle Hidalgo 456",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    tipoEnvio: "Caja (1)",
    valijas: 0,
    cajas: 1,
    sobres: 0,
    envases: 0,
    pesoReal: 3.2,
    pesoDimensional: 3.0,
    pesoTotal: 3.2,
    estado: "generada",
    historial: [
      {
        estado: "Generada",
        fecha: "28/11/2024",
        hora: "10:30am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
  {
    id: 979,
    numero: "#SR-000979",
    empresa: "Farmacia San José",
    fechaCreacion: "28/11/2024",
    remitente: {
      nombre: "Farmacia San José",
      telefono: "662 333 4455",
      direccion: "Blvd. Solidaridad 789",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "Carlos Mendoza",
      telefono: "631 888 9999",
      direccion: "Av. Obregón 321",
      ciudad: "Nogales",
      estado: "Sonora",
    },
    tipoEnvio: "Sobre (2)",
    valijas: 0,
    cajas: 0,
    sobres: 2,
    envases: 0,
    pesoReal: 0.4,
    pesoDimensional: 0.3,
    pesoTotal: 0.4,
    estado: "recolectada",
    historial: [
      {
        estado: "Recolectada",
        fecha: "28/11/2024",
        hora: "11:45am",
        notas: "Paquete recolectado",
      },
      {
        estado: "Generada",
        fecha: "28/11/2024",
        hora: "09:15am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
  {
    id: 971,
    numero: "#SR-000971",
    empresa: "Abarrotes del Valle",
    fechaCreacion: "27/11/2024",
    remitente: {
      nombre: "Abarrotes del Valle",
      telefono: "662 666 7788",
      direccion: "Calle Rosales 234",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "Juan Pérez",
      telefono: "667 222 3333",
      direccion: "Av. Insurgentes 567",
      ciudad: "Culiacán",
      estado: "Sinaloa",
    },
    tipoEnvio: "Caja (1)",
    valijas: 0,
    cajas: 1,
    sobres: 0,
    envases: 0,
    pesoReal: 5.2,
    pesoDimensional: 5.0,
    pesoTotal: 5.2,
    estado: "en_transito",
    historial: [
      {
        estado: "En Tránsito",
        fecha: "27/11/2024",
        hora: "04:20pm",
        notas: "En camino al destino",
      },
      { estado: "Recolectada", fecha: "27/11/2024", hora: "01:30pm" },
      {
        estado: "Generada",
        fecha: "27/11/2024",
        hora: "11:00am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
  {
    id: 960,
    numero: "#SR-000960",
    empresa: "Papelería Robles",
    fechaCreacion: "26/11/2024",
    remitente: {
      nombre: "Papelería Robles",
      telefono: "662 555 6677",
      direccion: "Av. Sonora 890",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "Ana López",
      telefono: "614 777 8888",
      direccion: "Calle Libertad 123",
      ciudad: "Chihuahua",
      estado: "Chihuahua",
    },
    tipoEnvio: "Valija (1)",
    valijas: 1,
    cajas: 0,
    sobres: 0,
    envases: 0,
    pesoReal: 1.8,
    pesoDimensional: 1.5,
    pesoTotal: 1.8,
    estado: "entregada",
    historial: [
      {
        estado: "Entregada",
        fecha: "27/11/2024",
        hora: "10:15am",
        notas: "Entregado a Ana López",
      },
      { estado: "En Tránsito", fecha: "26/11/2024", hora: "05:00pm" },
      { estado: "Recolectada", fecha: "26/11/2024", hora: "02:30pm" },
      {
        estado: "Generada",
        fecha: "26/11/2024",
        hora: "10:00am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
  {
    id: 955,
    numero: "#SR-000955",
    empresa: "Distribuidora Norte S.A.",
    fechaCreacion: "26/11/2024",
    remitente: {
      nombre: "Distribuidora Norte S.A.",
      telefono: "662 111 2233",
      direccion: "Zona Industrial 456",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "Roberto Sánchez",
      telefono: "664 333 4444",
      direccion: "Av. Reforma 789",
      ciudad: "Tijuana",
      estado: "Baja California",
    },
    tipoEnvio: "Caja (2)",
    valijas: 0,
    cajas: 2,
    sobres: 0,
    envases: 0,
    pesoReal: 8.5,
    pesoDimensional: 8.0,
    pesoTotal: 8.5,
    estado: "en_transito",
    historial: [
      { estado: "En Tránsito", fecha: "26/11/2024", hora: "03:45pm" },
      { estado: "Recolectada", fecha: "26/11/2024", hora: "12:00pm" },
      {
        estado: "Generada",
        fecha: "26/11/2024",
        hora: "09:30am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
  {
    id: 948,
    numero: "#SR-000948",
    empresa: "Refaccionaria Express",
    fechaCreacion: "25/11/2024",
    remitente: {
      nombre: "Refaccionaria Express",
      telefono: "662 888 9900",
      direccion: "Av. Industria 321",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    consignatario: {
      nombre: "Luis Torres",
      telefono: "662 444 5555",
      direccion: "Calle Morelos 654",
      ciudad: "Hermosillo",
      estado: "Sonora",
    },
    tipoEnvio: "Envase (1)",
    valijas: 0,
    cajas: 0,
    sobres: 0,
    envases: 1,
    pesoReal: 2.1,
    pesoDimensional: 2.0,
    pesoTotal: 2.1,
    estado: "entregada",
    historial: [
      {
        estado: "Entregada",
        fecha: "26/11/2024",
        hora: "09:30am",
        notas: "Entregado a Luis Torres",
      },
      { estado: "En Tránsito", fecha: "25/11/2024", hora: "04:30pm" },
      { estado: "Recolectada", fecha: "25/11/2024", hora: "01:15pm" },
      {
        estado: "Generada",
        fecha: "25/11/2024",
        hora: "11:20am",
        notas: "Guía creada por el sistema",
      },
    ],
  },
];

export function GuiasView({ onLogout, onNavigate }: GuiasViewProps) {
  const [guias, setGuias] = useState<Guia[]>(initialGuias);
  const [filteredGuias, setFilteredGuias] = useState<Guia[]>(initialGuias);

  const [searchTerm, setSearchTerm] = useState("");
  const [empresaFilter, setEmpresaFilter] = useState("todas");
  const [estadoFilter, setEstadoFilter] = useState("todos");
  const [destinoFilter, setDestinoFilter] = useState("todos");
  const [fechaDesde, setFechaDesde] = useState("");
  const [fechaHasta, setFechaHasta] = useState("");

  const [selectedGuia, setSelectedGuia] = useState<Guia | null>(null);
  const [guiaToUpdate, setGuiaToUpdate] = useState<Guia | null>(null);
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [isActualizarOpen, setIsActualizarOpen] = useState(false);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  // Aplicar filtros
  const applyFilters = () => {
    let filtered = [...guias];

    // Búsqueda por número
    if (searchTerm) {
      filtered = filtered.filter((g) =>
        g.numero.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Filtro por empresa
    if (empresaFilter !== "todas") {
      filtered = filtered.filter((g) => g.empresa === empresaFilter);
    }

    // Filtro por estado
    if (estadoFilter !== "todos") {
      filtered = filtered.filter((g) => g.estado === estadoFilter);
    }

    // Filtro por destino
    if (destinoFilter !== "todos") {
      filtered = filtered.filter(
        (g) =>
          g.consignatario.ciudad === destinoFilter ||
          g.consignatario.estado === destinoFilter
      );
    }

    setFilteredGuias(filtered);
  };

  const handleSearch = (value: string) => {
    setSearchTerm(value);
  };

  const handleClearFilters = () => {
    setSearchTerm("");
    setEmpresaFilter("todas");
    setEstadoFilter("todos");
    setDestinoFilter("todos");
    setFechaDesde("");
    setFechaHasta("");
    setFilteredGuias(guias);
  };

  const handleVerDetalle = (guia: Guia) => {
    setSelectedGuia(guia);
    setIsDetalleOpen(true);
  };

  const handleActualizarEstadoClick = (guia: Guia) => {
    setGuiaToUpdate(guia);
    setIsActualizarOpen(true);
  };

  const handleSaveEstado = (nuevoEstado: string, notas: string) => {
    if (guiaToUpdate) {
      const estadoLabels: { [key: string]: string } = {
        recolectada: "Recolectada",
        en_transito: "En Tránsito",
        entregada: "Entregada",
      };

      const updatedGuias = guias.map((g) =>
        g.id === guiaToUpdate.id
          ? {
              ...g,
              estado: nuevoEstado as any,
              historial: [
                {
                  estado: estadoLabels[nuevoEstado],
                  fecha: new Date().toLocaleDateString("es-MX"),
                  hora: new Date().toLocaleTimeString("es-MX", {
                    hour: "2-digit",
                    minute: "2-digit",
                  }),
                  notas: notas || undefined,
                },
                ...g.historial,
              ],
            }
          : g
      );

      setGuias(updatedGuias);
      setFilteredGuias(updatedGuias);
      showToast("Estado de guía actualizado correctamente", "success");
    }
  };

  const handleExportExcel = () => {
    showToast("Exportación lista", "info");
  };

  // Aplicar filtros cuando cambien
  useState(() => {
    applyFilters();
  });

  const empresas = [
    "todas",
    ...Array.from(new Set(guias.map((g) => g.empresa))),
  ];
  const destinos = [
    "todos",
    ...Array.from(new Set(guias.map((g) => g.consignatario.ciudad))),
  ];

  const estadoColors = {
    generada: {
      bg: "bg-[#6b7280]/10",
      text: "text-[#6b7280]",
      label: "Generada",
    },
    recolectada: {
      bg: "bg-[#00a3e0]/10",
      text: "text-[#00a3e0]",
      label: "Recolectada",
    },
    en_transito: {
      bg: "bg-[#d69e2e]/10",
      text: "text-[#d69e2e]",
      label: "En Tránsito",
    },
    entregada: {
      bg: "bg-[#38a169]/10",
      text: "text-[#38a169]",
      label: "Entregada",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar activeItem="guias" onNavigate={onNavigate} onLogout={onLogout} />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Registro General de Guías" />

        {/* Content */}
        <main className="pt-[70px] p-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p className="text-sm text-[#9ca3af] mt-[20px] mr-[0px] mb-[0px] ml-[0px]">
              <span
                className="hover:text-[#00a3e0] cursor-pointer"
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </span>
              {" / "}
              <span className="text-[#2d3748]">Guías</span>
            </p>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-4">
              {/* Búsqueda */}
              <div className="xl:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    placeholder="Buscar número de guía..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                  />
                </div>
              </div>

              {/* Filtro Empresa */}
              <div>
                <select
                  value={empresaFilter}
                  onChange={(e) => setEmpresaFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  {empresas.map((empresa) => (
                    <option key={empresa} value={empresa}>
                      {empresa === "todas" ? "Todas las empresas" : empresa}
                    </option>
                  ))}
                </select>
              </div>

              {/* Filtro Estado */}
              <div>
                <select
                  value={estadoFilter}
                  onChange={(e) => setEstadoFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  <option value="todos">Todos los estados</option>
                  <option value="generada">Generada</option>
                  <option value="recolectada">Recolectada</option>
                  <option value="en_transito">En Tránsito</option>
                  <option value="entregada">Entregada</option>
                </select>
              </div>

              {/* Filtro Destino */}
              <div>
                <select
                  value={destinoFilter}
                  onChange={(e) => setDestinoFilter(e.target.value)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  {destinos.map((destino) => (
                    <option key={destino} value={destino}>
                      {destino === "todos" ? "Todos los destinos" : destino}
                    </option>
                  ))}
                </select>
              </div>

              {/* Botones */}
              <div className="flex gap-2">
                <button
                  onClick={handleClearFilters}
                  className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors flex-1"
                >
                  <X className="w-4 h-4" />
                  Limpiar
                </button>
                <button
                  onClick={handleExportExcel}
                  className="flex items-center gap-2 px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors flex-1 whitespace-nowrap"
                >
                  <Download className="w-4 h-4" />
                  Excel
                </button>
              </div>
            </div>

            {/* Fecha Range */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mt-4">
              <div>
                <label className="block text-xs text-[#9ca3af] mb-1">
                  Desde
                </label>
                <input
                  type="date"
                  value={fechaDesde}
                  onChange={(e) => setFechaDesde(e.target.value)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                />
              </div>
              <div>
                <label className="block text-xs text-[#9ca3af] mb-1">
                  Hasta
                </label>
                <input
                  type="date"
                  value={fechaHasta}
                  onChange={(e) => setFechaHasta(e.target.value)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                />
              </div>
            </div>
          </div>

          {/* Tabla de Guías */}
          {filteredGuias.length > 0 ? (
            <div className="bg-white rounded-xl shadow-sm overflow-hidden">
              <div className="overflow-x-auto">
                <table className="w-full">
                  <thead>
                    <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Número de Guía
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Empresa
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Fecha de Creación
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Consignatario / Destino
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Tipo de Envío
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Peso Total
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Estado
                      </th>
                      <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                        Acciones
                      </th>
                    </tr>
                  </thead>
                  <tbody className="divide-y divide-[#9ca3af]/20">
                    {filteredGuias.map((guia) => (
                      <tr key={guia.id} className="hover:bg-[#f8fafc]/50">
                        <td className="px-4 py-3 text-sm text-[#1a365d]">
                          {guia.numero}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#2d3748]">
                          {guia.empresa}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#2d3748]">
                          {guia.fechaCreacion}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#2d3748]">
                          <div>{guia.consignatario.nombre}</div>
                          <div className="text-xs text-[#9ca3af]">
                            {guia.consignatario.ciudad},{" "}
                            {guia.consignatario.estado}
                          </div>
                        </td>
                        <td className="px-4 py-3 text-sm text-[#2d3748]">
                          {guia.tipoEnvio}
                        </td>
                        <td className="px-4 py-3 text-sm text-[#2d3748]">
                          {guia.pesoTotal} kg
                        </td>
                        <td className="px-4 py-3">
                          <span
                            className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                              estadoColors[guia.estado].bg
                            } ${estadoColors[guia.estado].text}`}
                          >
                            {estadoColors[guia.estado].label}
                          </span>
                        </td>
                        <td className="px-4 py-3">
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleVerDetalle(guia)}
                              className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                              title="Ver detalle"
                            >
                              <Eye className="w-4 h-4 text-[#00a3e0]" />
                            </button>
                            {guia.estado !== "entregada" && (
                              <button
                                onClick={() =>
                                  handleActualizarEstadoClick(guia)
                                }
                                className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                                title="Actualizar estado"
                              >
                                <RefreshCw className="w-4 h-4 text-[#00a3e0]" />
                              </button>
                            )}
                          </div>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>

              {/* Paginación */}
              <div className="border-t border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
                <p className="text-sm text-[#9ca3af]">
                  Mostrando 1-{filteredGuias.length} de {filteredGuias.length}{" "}
                  guías
                </p>
                <div className="flex items-center gap-2">
                  <button
                    className="p-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] disabled:opacity-50"
                    disabled
                  >
                    <ChevronLeft className="w-4 h-4" />
                  </button>
                  <button className="px-3 py-1.5 bg-[#00a3e0] text-white rounded-lg">
                    1
                  </button>
                  <button
                    className="p-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] disabled:opacity-50"
                    disabled
                  >
                    <ChevronRight className="w-4 h-4" />
                  </button>
                </div>
              </div>
            </div>
          ) : (
            // Empty state
            <div className="bg-white rounded-xl shadow-sm p-12 text-center">
              <div className="w-16 h-16 bg-[#9ca3af]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                <Package className="w-8 h-8 text-[#9ca3af]" />
              </div>
              <h3 className="text-lg text-[#1a365d] mb-2">
                No se encontraron guías
              </h3>
              <p className="text-sm text-[#9ca3af] mb-6">
                No hay guías que coincidan con los filtros seleccionados
              </p>
              <button
                onClick={handleClearFilters}
                className="px-6 py-2.5 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors"
              >
                Limpiar filtros
              </button>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <DetalleGuiaModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        guia={selectedGuia}
        onActualizarEstado={handleActualizarEstadoClick}
      />

      <ActualizarEstadoGuiaModal
        isOpen={isActualizarOpen}
        onClose={() => setIsActualizarOpen(false)}
        guia={guiaToUpdate}
        onSave={handleSaveEstado}
      />

      {/* Toast */}
      <Toast
        message={toast.message}
        type={toast.type}
        isVisible={toast.isVisible}
        onClose={() => setToast({ ...toast, isVisible: false })}
      />
    </div>
  );
}
