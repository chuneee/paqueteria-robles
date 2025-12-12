import { useState } from "react";
import {
  PackagePlus,
  Info,
  Search,
  Eye,
  FileText,
  CheckCircle,
  XCircle,
  Clock,
  AlertCircle,
} from "lucide-react";
import { Sidebar, Header } from "../../components/empresa/shared";
import { DetalleSolicitudModal } from "../../components/empresa/solicitar-guias";

interface SolicitarGuiasViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface Solicitud {
  id: number;
  fecha: string;
  cantidad: number;
  costoPorGuia: number;
  totalEstimado: number;
  estado: "pendiente" | "aprobada" | "rechazada";
  respuesta?: string;
  fechaRespuesta?: string;
  adminRespuesta?: string;
  motivoRechazo?: string;
}

const costoPorGuia = 45.0;

const solicitudesData: Solicitud[] = [
  {
    id: 1,
    fecha: "28/11/2024",
    cantidad: 120,
    costoPorGuia: 45.0,
    totalEstimado: 5400.0,
    estado: "pendiente",
  },
  {
    id: 2,
    fecha: "25/11/2024",
    cantidad: 60,
    costoPorGuia: 45.0,
    totalEstimado: 2700.0,
    estado: "aprobada",
    respuesta: "Solicitud aprobada. Las guías están disponibles.",
    fechaRespuesta: "25/11/2024",
    adminRespuesta: "Admin Juan",
  },
  {
    id: 3,
    fecha: "22/11/2024",
    cantidad: 80,
    costoPorGuia: 45.0,
    totalEstimado: 3600.0,
    estado: "rechazada",
    motivoRechazo:
      "Saldo insuficiente. Por favor, regularice su cuenta para proceder.",
    fechaRespuesta: "23/11/2024",
    adminRespuesta: "Admin María",
  },
  {
    id: 4,
    fecha: "18/11/2024",
    cantidad: 100,
    costoPorGuia: 45.0,
    totalEstimado: 4500.0,
    estado: "aprobada",
    respuesta: "Solicitud aprobada correctamente.",
    fechaRespuesta: "19/11/2024",
    adminRespuesta: "Admin Carlos",
  },
];

type EstadoFilter = "todos" | "pendiente" | "aprobada" | "rechazada";
type AlertType = "success" | "error" | null;

export function SolicitarGuiasView({
  onLogout,
  onNavigate,
}: SolicitarGuiasViewProps) {
  const [cantidad, setCantidad] = useState("");
  const [error, setError] = useState("");
  const [solicitudes, setSolicitudes] = useState<Solicitud[]>(solicitudesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>("todos");
  const [selectedSolicitud, setSelectedSolicitud] = useState<Solicitud | null>(
    null
  );
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [alert, setAlert] = useState<{ type: AlertType; message: string }>({
    type: null,
    message: "",
  });
  const [hasData] = useState(true); // Cambiar a false para ver estado vacío

  const totalEstimado = cantidad ? parseFloat(cantidad) * costoPorGuia : 0;

  const handleCantidadChange = (value: string) => {
    // Solo permitir números
    if (value === "" || /^\d+$/.test(value)) {
      setCantidad(value);
      setError("");
    }
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");

    // Validaciones
    if (!cantidad) {
      setError("Campo requerido");
      return;
    }

    const cantidadNum = parseInt(cantidad);
    if (cantidadNum <= 0) {
      setError("Debe ingresar un número mayor a 0");
      return;
    }

    // Crear nueva solicitud
    const nuevaSolicitud: Solicitud = {
      id: solicitudes.length + 1,
      fecha: new Date().toLocaleDateString("es-MX"),
      cantidad: cantidadNum,
      costoPorGuia: costoPorGuia,
      totalEstimado: totalEstimado,
      estado: "pendiente",
    };

    setSolicitudes([nuevaSolicitud, ...solicitudes]);
    setCantidad("");

    // Mostrar alerta de éxito
    setAlert({
      type: "success",
      message: `Solicitud enviada correctamente por ${cantidadNum} guías. Total: $${totalEstimado.toLocaleString(
        "es-MX",
        { minimumFractionDigits: 2 }
      )} MXN`,
    });

    // Ocultar alerta después de 5 segundos
    setTimeout(() => {
      setAlert({ type: null, message: "" });
    }, 5000);
  };

  const handleVerDetalle = (solicitud: Solicitud) => {
    setSelectedSolicitud(solicitud);
    setIsModalOpen(true);
  };

  // Filtrar solicitudes
  const filteredSolicitudes = solicitudes.filter((s) => {
    const matchSearch =
      searchTerm === "" ||
      s.fecha.includes(searchTerm) ||
      s.cantidad.toString().includes(searchTerm);

    const matchEstado = estadoFilter === "todos" || s.estado === estadoFilter;

    return matchSearch && matchEstado;
  });

  const estadoConfig = {
    pendiente: {
      label: "Pendiente",
      color: "bg-[#d69e2e]/10 text-[#d69e2e]",
      icon: Clock,
    },
    aprobada: {
      label: "Aprobada",
      color: "bg-[#38a169]/10 text-[#38a169]",
      icon: CheckCircle,
    },
    rechazada: {
      label: "Rechazada",
      color: "bg-[#e53e3e]/10 text-[#e53e3e]",
      icon: XCircle,
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="solicitar-guias"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Solicitar Guías" />

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
              <span className="text-[#2d3748]">Solicitar Guías</span>
            </p>
          </div>

          {/* Alerta */}
          {alert.type && (
            <div
              className={`mb-6 p-4 rounded-lg flex items-start gap-3 ${
                alert.type === "success"
                  ? "bg-[#38a169]/10 border border-[#38a169]/20"
                  : "bg-[#e53e3e]/10 border border-[#e53e3e]/20"
              }`}
            >
              {alert.type === "success" ? (
                <CheckCircle className="w-5 h-5 text-[#38a169] flex-shrink-0 mt-0.5" />
              ) : (
                <AlertCircle className="w-5 h-5 text-[#e53e3e] flex-shrink-0 mt-0.5" />
              )}
              <div className="flex-1">
                <p
                  className={`text-sm ${
                    alert.type === "success"
                      ? "text-[#38a169]"
                      : "text-[#e53e3e]"
                  }`}
                >
                  {alert.message}
                </p>
              </div>
              <button
                onClick={() => setAlert({ type: null, message: "" })}
                className="text-[#9ca3af] hover:text-[#2d3748]"
              >
                <XCircle className="w-5 h-5" />
              </button>
            </div>
          )}

          {hasData ? (
            <>
              {/* Formulario de Solicitud */}
              <div className="bg-white rounded-xl shadow-sm p-8 mb-8 max-w-2xl">
                <div className="flex items-center gap-3 mb-6">
                  <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                    <PackagePlus className="w-6 h-6 text-[#00a3e0]" />
                  </div>
                  <div>
                    <h2 className="text-xl text-[#1a365d]">
                      Nueva Solicitud de Guías
                    </h2>
                    <p className="text-sm text-[#9ca3af]">
                      Solicita guías prepagadas para tu empresa
                    </p>
                  </div>
                </div>

                <form onSubmit={handleSubmit}>
                  {/* Campo de Cantidad */}
                  <div className="mb-6">
                    <label className="block text-sm text-[#2d3748] mb-2">
                      Cantidad de guías a solicitar{" "}
                      <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={cantidad}
                      onChange={(e) => handleCantidadChange(e.target.value)}
                      placeholder="Ej. 50"
                      className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        error
                          ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                          : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                      }`}
                    />
                    {error && (
                      <p className="text-sm text-[#e53e3e] mt-2 flex items-center gap-1">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  {/* Información Calculada */}
                  <div className="space-y-3 mb-6">
                    <div className="flex items-center gap-2 text-sm text-[#9ca3af]">
                      <Info className="w-4 h-4" />
                      <span>
                        Costo unitario asignado:{" "}
                        <span className="text-[#2d3748]">
                          ${costoPorGuia.toFixed(2)} MXN
                        </span>
                      </span>
                    </div>

                    {cantidad && parseInt(cantidad) > 0 && (
                      <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#9ca3af]/20">
                        <p className="text-xs text-[#9ca3af] mb-1">
                          Total estimado
                        </p>
                        <p className="text-2xl text-[#1a365d]">
                          $
                          {totalEstimado.toLocaleString("es-MX", {
                            minimumFractionDigits: 2,
                            maximumFractionDigits: 2,
                          })}{" "}
                          MXN
                        </p>
                      </div>
                    )}
                  </div>

                  {/* Botón */}
                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <FileText className="w-5 h-5" />
                    Confirmar Solicitud
                  </button>
                </form>
              </div>

              {/* Historial de Solicitudes */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#9ca3af]/20">
                  <h2 className="text-lg text-[#1a365d]">
                    Historial de Solicitudes
                  </h2>
                </div>

                {/* Filtros */}
                <div className="px-6 py-4 border-b border-[#9ca3af]/20 flex flex-col lg:flex-row gap-4">
                  <div className="relative flex-1">
                    <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="text"
                      placeholder="Buscar por fecha o cantidad..."
                      value={searchTerm}
                      onChange={(e) => setSearchTerm(e.target.value)}
                      className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                    />
                  </div>
                  <select
                    value={estadoFilter}
                    onChange={(e) =>
                      setEstadoFilter(e.target.value as EstadoFilter)
                    }
                    className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                  >
                    <option value="todos">Todos los estados</option>
                    <option value="pendiente">Pendiente</option>
                    <option value="aprobada">Aprobada</option>
                    <option value="rechazada">Rechazada</option>
                  </select>
                </div>

                {/* Tabla */}
                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Fecha
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Cantidad Solicitada
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Total Estimado
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Estado
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Respuesta
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9ca3af]/20">
                      {filteredSolicitudes.length > 0 ? (
                        filteredSolicitudes.map((solicitud) => {
                          const config = estadoConfig[solicitud.estado];
                          const IconEstado = config.icon;

                          return (
                            <tr
                              key={solicitud.id}
                              className="hover:bg-[#f8fafc]/50 transition-colors"
                            >
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {solicitud.fecha}
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  {solicitud.cantidad} guías
                                </span>
                              </td>
                              <td className="px-6 py-4">
                                <span className="text-sm text-[#2d3748]">
                                  $
                                  {solicitud.totalEstimado.toLocaleString(
                                    "es-MX",
                                    {
                                      minimumFractionDigits: 2,
                                      maximumFractionDigits: 2,
                                    }
                                  )}
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
                                {solicitud.estado === "aprobada" &&
                                  solicitud.respuesta && (
                                    <span className="text-sm text-[#38a169]">
                                      {solicitud.respuesta}
                                    </span>
                                  )}
                                {solicitud.estado === "rechazada" &&
                                  solicitud.motivoRechazo && (
                                    <span
                                      className="text-sm text-[#e53e3e] line-clamp-1"
                                      title={solicitud.motivoRechazo}
                                    >
                                      {solicitud.motivoRechazo}
                                    </span>
                                  )}
                                {solicitud.estado === "pendiente" && (
                                  <span className="text-sm text-[#9ca3af]">
                                    —
                                  </span>
                                )}
                              </td>
                              <td className="px-6 py-4">
                                <button
                                  onClick={() => handleVerDetalle(solicitud)}
                                  className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                                  title="Ver detalle"
                                >
                                  <Eye className="w-4 h-4 text-[#00a3e0]" />
                                </button>
                              </td>
                            </tr>
                          );
                        })
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center">
                            <p className="text-sm text-[#9ca3af]">
                              No se encontraron solicitudes
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
            // Estado Vacío - Sin Solicitudes
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-[#00a3e0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <PackagePlus className="w-10 h-10 text-[#00a3e0]" />
                </div>
                <h2 className="text-2xl text-[#1a365d] mb-3">
                  Solicita tus primeras guías
                </h2>
                <p className="text-sm text-[#9ca3af] mb-8 max-w-md mx-auto">
                  Comienza a gestionar tus envíos solicitando guías prepagadas.
                  Es rápido y sencillo.
                </p>

                {/* Formulario inline para estado vacío */}
                <form onSubmit={handleSubmit} className="max-w-md mx-auto">
                  <div className="mb-6">
                    <label className="block text-sm text-[#2d3748] mb-2 text-left">
                      ¿Cuántas guías necesitas?{" "}
                      <span className="text-[#e53e3e]">*</span>
                    </label>
                    <input
                      type="text"
                      value={cantidad}
                      onChange={(e) => handleCantidadChange(e.target.value)}
                      placeholder="Ej. 50"
                      className={`w-full px-4 py-3 text-lg border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                        error
                          ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                          : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                      }`}
                    />
                    {error && (
                      <p className="text-sm text-[#e53e3e] mt-2 flex items-center gap-1 justify-center">
                        <AlertCircle className="w-4 h-4" />
                        {error}
                      </p>
                    )}
                  </div>

                  {cantidad && parseInt(cantidad) > 0 && (
                    <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#9ca3af]/20 mb-6">
                      <p className="text-xs text-[#9ca3af] mb-1">
                        Total estimado
                      </p>
                      <p className="text-2xl text-[#1a365d]">
                        $
                        {totalEstimado.toLocaleString("es-MX", {
                          minimumFractionDigits: 2,
                          maximumFractionDigits: 2,
                        })}{" "}
                        MXN
                      </p>
                      <p className="text-xs text-[#9ca3af] mt-1">
                        {parseInt(cantidad)} guías × ${costoPorGuia.toFixed(2)}{" "}
                        MXN
                      </p>
                    </div>
                  )}

                  <button
                    type="submit"
                    className="w-full px-6 py-3 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors flex items-center justify-center gap-2 shadow-sm"
                  >
                    <PackagePlus className="w-5 h-5" />
                    Enviar Solicitud
                  </button>
                </form>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modal de Detalle */}
      <DetalleSolicitudModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        solicitud={selectedSolicitud}
      />
    </div>
  );
}
