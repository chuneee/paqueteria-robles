import { useState } from "react";
import {
  Clock,
  CheckCircle,
  XCircle,
  Calendar,
  Search,
  Eye,
  Check,
  X,
  ChevronLeft,
  ChevronRight,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import {
  DetalleSolicitudModal,
  ConfirmarAprobacionModal,
  RechazarSolicitudModal,
} from "../../components/superadmin/solicitudes";
import { Toast, ToastType } from "../../components/shared/Toast";

interface SolicitudesViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface Solicitud {
  id: number;
  empresa: string;
  contacto: string;
  telefono: string;
  cantidad: number;
  costoUnitario: number;
  montoTotal: number;
  fecha: string;
  hora: string;
  estado: "pendiente" | "aprobada" | "rechazada";
  guiasActuales: number;
  solicitudesAnteriores: number;
  guiasTotales: number;
  pagosAlDia: boolean;
  saldoPendiente?: number;
  aprobadoPor?: string;
  fechaAprobacion?: string;
  rechazadoPor?: string;
  motivoRechazo?: string;
}

type FilterType = "todas" | "pendientes" | "aprobadas" | "rechazadas";

const initialSolicitudes: Solicitud[] = [
  {
    id: 1,
    empresa: "Distribuidora Norte S.A.",
    contacto: "juan@distnorte.com",
    telefono: "662 111 2233",
    cantidad: 100,
    costoUnitario: 45.0,
    montoTotal: 4500.0,
    fecha: "28/11/2024",
    hora: "10:30am",
    estado: "pendiente",
    guiasActuales: 56,
    solicitudesAnteriores: 12,
    guiasTotales: 850,
    pagosAlDia: true,
  },
  {
    id: 2,
    empresa: "Comercial López",
    contacto: "ventas@clopez.com",
    telefono: "662 222 3344",
    cantidad: 50,
    costoUnitario: 50.0,
    montoTotal: 2500.0,
    fecha: "28/11/2024",
    hora: "09:15am",
    estado: "pendiente",
    guiasActuales: 34,
    solicitudesAnteriores: 8,
    guiasTotales: 420,
    pagosAlDia: true,
  },
  {
    id: 3,
    empresa: "Ferretería Central",
    contacto: "admin@ferrcentral.com",
    telefono: "662 444 5566",
    cantidad: 75,
    costoUnitario: 42.0,
    montoTotal: 3150.0,
    fecha: "28/11/2024",
    hora: "08:45am",
    estado: "pendiente",
    guiasActuales: 89,
    solicitudesAnteriores: 15,
    guiasTotales: 1200,
    pagosAlDia: true,
  },
  {
    id: 4,
    empresa: "Farmacia San José",
    contacto: "contacto@farmaciasj.com",
    telefono: "662 333 4455",
    cantidad: 25,
    costoUnitario: 55.0,
    montoTotal: 1375.0,
    fecha: "27/11/2024",
    hora: "04:20pm",
    estado: "pendiente",
    guiasActuales: 3,
    solicitudesAnteriores: 5,
    guiasTotales: 180,
    pagosAlDia: false,
    saldoPendiente: 1200.0,
  },
  {
    id: 5,
    empresa: "Papelería Robles",
    contacto: "info@paprobles.com",
    telefono: "662 555 6677",
    cantidad: 60,
    costoUnitario: 48.0,
    montoTotal: 2880.0,
    fecha: "27/11/2024",
    hora: "02:10pm",
    estado: "pendiente",
    guiasActuales: 12,
    solicitudesAnteriores: 10,
    guiasTotales: 650,
    pagosAlDia: true,
  },
  {
    id: 6,
    empresa: "Abarrotes del Valle",
    contacto: "contacto@abvalle.com",
    telefono: "662 666 7788",
    cantidad: 40,
    costoUnitario: 52.0,
    montoTotal: 2080.0,
    fecha: "27/11/2024",
    hora: "11:30am",
    estado: "pendiente",
    guiasActuales: 0,
    solicitudesAnteriores: 6,
    guiasTotales: 340,
    pagosAlDia: true,
  },
  {
    id: 7,
    empresa: "Refaccionaria Express",
    contacto: "refexpress@gmail.com",
    telefono: "662 888 9900",
    cantidad: 80,
    costoUnitario: 44.0,
    montoTotal: 3520.0,
    fecha: "26/11/2024",
    hora: "03:45pm",
    estado: "pendiente",
    guiasActuales: 45,
    solicitudesAnteriores: 9,
    guiasTotales: 780,
    pagosAlDia: true,
  },
  {
    id: 8,
    empresa: "Mueblería Sonora",
    contacto: "ventas@muebsonora.com",
    telefono: "662 777 8899",
    cantidad: 30,
    costoUnitario: 46.0,
    montoTotal: 1380.0,
    fecha: "26/11/2024",
    hora: "10:00am",
    estado: "pendiente",
    guiasActuales: 23,
    solicitudesAnteriores: 7,
    guiasTotales: 520,
    pagosAlDia: true,
  },
  {
    id: 9,
    empresa: "Distribuidora Norte S.A.",
    contacto: "juan@distnorte.com",
    telefono: "662 111 2233",
    cantidad: 50,
    costoUnitario: 45.0,
    montoTotal: 2250.0,
    fecha: "25/11/2024",
    hora: "05:30pm",
    estado: "aprobada",
    guiasActuales: 56,
    solicitudesAnteriores: 12,
    guiasTotales: 850,
    pagosAlDia: true,
    aprobadoPor: "Admin Juan",
    fechaAprobacion: "25/11/2024 3:45pm",
  },
  {
    id: 10,
    empresa: "Comercial López",
    contacto: "ventas@clopez.com",
    telefono: "662 222 3344",
    cantidad: 100,
    costoUnitario: 50.0,
    montoTotal: 5000.0,
    fecha: "25/11/2024",
    hora: "01:15pm",
    estado: "aprobada",
    guiasActuales: 34,
    solicitudesAnteriores: 8,
    guiasTotales: 420,
    pagosAlDia: true,
    aprobadoPor: "Admin María",
    fechaAprobacion: "25/11/2024 2:30pm",
  },
  {
    id: 11,
    empresa: "Ferretería Central",
    contacto: "admin@ferrcentral.com",
    telefono: "662 444 5566",
    cantidad: 25,
    costoUnitario: 42.0,
    montoTotal: 1050.0,
    fecha: "24/11/2024",
    hora: "09:00am",
    estado: "rechazada",
    guiasActuales: 89,
    solicitudesAnteriores: 15,
    guiasTotales: 1200,
    pagosAlDia: false,
    saldoPendiente: 3500.0,
    rechazadoPor: "Admin Carlos",
    motivoRechazo: "Saldo pendiente de pago",
  },
];

export function SolicitudesView({
  onLogout,
  onNavigate,
}: SolicitudesViewProps) {
  const [solicitudes, setSolicitudes] =
    useState<Solicitud[]>(initialSolicitudes);
  const [filteredSolicitudes, setFilteredSolicitudes] = useState<Solicitud[]>(
    initialSolicitudes.filter((s) => s.estado === "pendiente")
  );
  const [searchTerm, setSearchTerm] = useState("");
  const [activeFilter, setActiveFilter] = useState<FilterType>("pendientes");

  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(
    null
  );
  const [isDetalleOpen, setIsDetalleOpen] = useState(false);
  const [isConfirmAprobacionOpen, setIsConfirmAprobacionOpen] = useState(false);
  const [isRechazarOpen, setIsRechazarOpen] = useState(false);
  const [solicitudToProcess, setSolicitudToProcess] =
    useState<Solicitud | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Filtrar solicitudes
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterSolicitudes(value, activeFilter);
  };

  const handleFilterChange = (filter: FilterType) => {
    setActiveFilter(filter);
    filterSolicitudes(searchTerm, filter);
  };

  const filterSolicitudes = (search: string, filter: FilterType) => {
    let filtered = [...solicitudes];

    // Filtrar por estado
    if (filter !== "todas") {
      filtered = filtered.filter((s) => s.estado === filter.slice(0, -1)); // Remove 's' from filter
    }

    // Filtrar por búsqueda
    if (search) {
      filtered = filtered.filter((s) =>
        s.empresa.toLowerCase().includes(search.toLowerCase())
      );
    }

    setFilteredSolicitudes(filtered);
  };

  const handleVerDetalle = (solicitud: Solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsDetalleOpen(true);
  };

  const handleAprobarClick = (solicitud: Solicitud) => {
    setSolicitudToProcess(solicitud);
    setIsConfirmAprobacionOpen(true);
  };

  const handleRechazarClick = (solicitud: Solicitud) => {
    setSolicitudToProcess(solicitud);
    setIsRechazarOpen(true);
  };

  const handleConfirmAprobar = () => {
    if (solicitudToProcess) {
      const updated = solicitudes.map((s) =>
        s.id === solicitudToProcess.id
          ? {
              ...s,
              estado: "aprobada" as const,
              aprobadoPor: "Admin Juan",
              fechaAprobacion: new Date().toLocaleString(),
            }
          : s
      );
      setSolicitudes(updated);
      filterSolicitudes(searchTerm, activeFilter);
      showToast(
        `Solicitud aprobada correctamente. Se agregaron ${solicitudToProcess.cantidad} guías a ${solicitudToProcess.empresa}.`,
        "success"
      );
      setSolicitudToProcess(null);
    }
  };

  const handleConfirmRechazar = (motivo: string, comentarios: string) => {
    if (solicitudToProcess) {
      const updated = solicitudes.map((s) =>
        s.id === solicitudToProcess.id
          ? {
              ...s,
              estado: "rechazada" as const,
              rechazadoPor: "Admin Juan",
              motivoRechazo: `${motivo}${
                comentarios ? ": " + comentarios : ""
              }`,
            }
          : s
      );
      setSolicitudes(updated);
      filterSolicitudes(searchTerm, activeFilter);
      showToast("Solicitud rechazada. Se notificó a la empresa.", "error");
      setSolicitudToProcess(null);
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  // Estadísticas
  const pendientesCount = solicitudes.filter(
    (s) => s.estado === "pendiente"
  ).length;
  const aprobadasHoyCount = solicitudes.filter(
    (s) => s.estado === "aprobada" && s.fecha === "28/11/2024"
  ).length;
  const rechazadasHoyCount = solicitudes.filter(
    (s) => s.estado === "rechazada" && s.fecha === "28/11/2024"
  ).length;
  const totalMesCount = solicitudes.filter((s) =>
    s.fecha.includes("11/2024")
  ).length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="solicitudes"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Solicitudes de Guías" />

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
              <span className="text-[#2d3748]">Solicitudes de Guías</span>
            </p>
          </div>

          {/* Tarjetas de Resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Pendientes */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#d69e2e]/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
                  <Clock className="w-6 h-6 text-[#d69e2e]" />
                </div>
              </div>
              <p className="text-3xl text-[#d69e2e] mb-1">{pendientesCount}</p>
              <p className="text-sm text-[#9ca3af]">Solicitudes Pendientes</p>
            </div>

            {/* Aprobadas Hoy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#38a169]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                {aprobadasHoyCount}
              </p>
              <p className="text-sm text-[#9ca3af]">Aprobadas Hoy</p>
            </div>

            {/* Rechazadas Hoy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#e53e3e]/10 rounded-xl flex items-center justify-center">
                  <XCircle className="w-6 h-6 text-[#e53e3e]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                {rechazadasHoyCount}
              </p>
              <p className="text-sm text-[#9ca3af]">Rechazadas Hoy</p>
            </div>

            {/* Total del Mes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                  <Calendar className="w-6 h-6 text-[#00a3e0]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{totalMesCount}</p>
              <p className="text-sm text-[#9ca3af]">Solicitudes del Mes</p>
            </div>
          </div>

          {/* Filtros y Búsqueda */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left */}
              <div>
                <h2 className="text-lg text-[#1a365d]">
                  Listado de Solicitudes
                </h2>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    placeholder="Buscar empresa..."
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] w-full sm:w-64"
                  />
                </div>

                {/* Filter Pills */}
                <div className="flex gap-2 overflow-x-auto">
                  {(
                    [
                      "todas",
                      "pendientes",
                      "aprobadas",
                      "rechazadas",
                    ] as FilterType[]
                  ).map((filter) => (
                    <button
                      key={filter}
                      onClick={() => handleFilterChange(filter)}
                      className={`px-4 py-2 rounded-lg text-sm whitespace-nowrap transition-colors ${
                        activeFilter === filter
                          ? "bg-[#00a3e0] text-white"
                          : "bg-[#f8fafc] text-[#2d3748] hover:bg-[#e5e7eb]"
                      }`}
                    >
                      {filter.charAt(0).toUpperCase() + filter.slice(1)}
                    </button>
                  ))}
                </div>
              </div>
            </div>
          </div>

          {/* Tabla de Solicitudes */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            <div className="overflow-x-auto">
              <table className="w-full">
                <thead>
                  <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                    <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                      Fecha/Hora
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                      Empresa
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                      Cantidad
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                      Costo Unitario
                    </th>
                    <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                      Monto Total
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
                  {filteredSolicitudes.map((solicitud) => (
                    <tr
                      key={solicitud.id}
                      className={`hover:bg-[#f8fafc]/50 ${
                        solicitud.estado === "pendiente"
                          ? "bg-[#d69e2e]/5 border-l-4 border-l-[#d69e2e]"
                          : ""
                      }`}
                    >
                      <td className="px-4 py-3 text-sm text-[#2d3748]">
                        <div>{solicitud.fecha}</div>
                        <div className="text-xs text-[#9ca3af]">
                          {solicitud.hora}
                        </div>
                      </td>
                      <td className="px-4 py-3 text-sm text-[#2d3748]">
                        {solicitud.empresa}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#2d3748]">
                        {solicitud.cantidad} guías
                      </td>
                      <td className="px-4 py-3 text-sm text-[#2d3748]">
                        ${solicitud.costoUnitario.toFixed(2)}
                      </td>
                      <td className="px-4 py-3 text-sm text-[#1a365d]">
                        ${solicitud.montoTotal.toFixed(2)}
                      </td>
                      <td className="px-4 py-3">
                        <span
                          className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                            solicitud.estado === "pendiente"
                              ? "bg-[#d69e2e]/10 text-[#d69e2e]"
                              : solicitud.estado === "aprobada"
                              ? "bg-[#38a169]/10 text-[#38a169]"
                              : "bg-[#e53e3e]/10 text-[#e53e3e]"
                          }`}
                        >
                          {solicitud.estado === "pendiente"
                            ? "Pendiente"
                            : solicitud.estado === "aprobada"
                            ? "Aprobada"
                            : "Rechazada"}
                        </span>
                      </td>
                      <td className="px-4 py-3">
                        {solicitud.estado === "pendiente" ? (
                          <div className="flex items-center gap-2">
                            <button
                              onClick={() => handleAprobarClick(solicitud)}
                              className="p-2 bg-[#38a169] text-white rounded-lg hover:bg-[#2f855a] transition-colors"
                              title="Aprobar"
                            >
                              <Check className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleRechazarClick(solicitud)}
                              className="p-2 border border-[#e53e3e] text-[#e53e3e] rounded-lg hover:bg-[#e53e3e]/10 transition-colors"
                              title="Rechazar"
                            >
                              <X className="w-4 h-4" />
                            </button>
                            <button
                              onClick={() => handleVerDetalle(solicitud)}
                              className="p-2 border border-[#9ca3af]/30 text-[#9ca3af] rounded-lg hover:bg-[#f8fafc] transition-colors"
                              title="Ver"
                            >
                              <Eye className="w-4 h-4" />
                            </button>
                          </div>
                        ) : (
                          <button
                            onClick={() => handleVerDetalle(solicitud)}
                            className="text-xs text-[#00a3e0] hover:text-[#0086b8]"
                          >
                            Ver detalle
                          </button>
                        )}
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Paginación */}
            <div className="border-t border-[#9ca3af]/20 px-6 py-4 flex items-center justify-between">
              <p className="text-sm text-[#9ca3af]">
                Mostrando 1-{filteredSolicitudes.length} de{" "}
                {filteredSolicitudes.length} solicitudes
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
        </main>
      </div>

      {/* Modals */}
      <DetalleSolicitudModal
        isOpen={isDetalleOpen}
        onClose={() => setIsDetalleOpen(false)}
        solicitud={selectedSolicitud}
        onAprobar={handleAprobarClick}
        onRechazar={handleRechazarClick}
      />

      <ConfirmarAprobacionModal
        isOpen={isConfirmAprobacionOpen}
        onClose={() => setIsConfirmAprobacionOpen(false)}
        solicitud={solicitudToProcess}
        onConfirm={handleConfirmAprobar}
      />

      <RechazarSolicitudModal
        isOpen={isRechazarOpen}
        onClose={() => setIsRechazarOpen(false)}
        solicitud={solicitudToProcess}
        onConfirm={handleConfirmRechazar}
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
