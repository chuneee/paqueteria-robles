import { useState } from "react";
import {
  Bell,
  Check,
  Trash2,
  Filter,
  Search,
  Package,
  DollarSign,
  Building2,
  AlertCircle,
  CheckCircle,
  X,
  Mail,
  MailOpen,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import { Toast, ToastType } from "../../components/shared/Toast";

interface NotificacionesViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

type TipoNotificacion = "todas" | "sistema" | "guias" | "pagos" | "empresas";
type EstadoNotificacion = "todas" | "no_leidas" | "leidas";

interface Notificacion {
  id: number;
  tipo: "sistema" | "guias" | "pagos" | "empresas";
  titulo: string;
  mensaje: string;
  fecha: string;
  hora: string;
  leida: boolean;
  prioridad: "alta" | "media" | "baja";
}

const notificacionesData: Notificacion[] = [
  {
    id: 1,
    tipo: "pagos",
    titulo: "Pago registrado",
    mensaje: "Se ha registrado un pago de $5,250.00 de Comercial López",
    fecha: "29/11/2024",
    hora: "10:30 AM",
    leida: false,
    prioridad: "media",
  },
  {
    id: 2,
    tipo: "guias",
    titulo: "Guía entregada",
    mensaje:
      "La guía #SR-000982 ha sido entregada exitosamente en Hermosillo, Sonora",
    fecha: "29/11/2024",
    hora: "09:45 AM",
    leida: false,
    prioridad: "baja",
  },
  {
    id: 3,
    tipo: "empresas",
    titulo: "Nueva empresa registrada",
    mensaje: 'La empresa "Distribuidora del Norte" ha completado su registro',
    fecha: "28/11/2024",
    hora: "04:20 PM",
    leida: false,
    prioridad: "media",
  },
  {
    id: 4,
    tipo: "sistema",
    titulo: "Actualización del sistema",
    mensaje:
      "El sistema será actualizado mañana a las 2:00 AM. Duración estimada: 30 minutos",
    fecha: "28/11/2024",
    hora: "02:15 PM",
    leida: true,
    prioridad: "alta",
  },
  {
    id: 5,
    tipo: "pagos",
    titulo: "Pago pendiente",
    mensaje:
      "Farmacia San José tiene un saldo pendiente de $3,150.00 vencido hace 5 días",
    fecha: "28/11/2024",
    hora: "11:30 AM",
    leida: true,
    prioridad: "alta",
  },
  {
    id: 6,
    tipo: "guias",
    titulo: "Solicitud de guía aprobada",
    mensaje: "Se aprobó la solicitud #SOL-245 de Refaccionaria Express",
    fecha: "27/11/2024",
    hora: "03:45 PM",
    leida: true,
    prioridad: "baja",
  },
  {
    id: 7,
    tipo: "empresas",
    titulo: "Empresa desactivada",
    mensaje:
      'La empresa "Abarrotes Central" ha sido desactivada por falta de pago',
    fecha: "27/11/2024",
    hora: "01:20 PM",
    leida: true,
    prioridad: "media",
  },
  {
    id: 8,
    tipo: "sistema",
    titulo: "Respaldo completado",
    mensaje: "El respaldo automático del sistema se completó exitosamente",
    fecha: "27/11/2024",
    hora: "12:00 AM",
    leida: true,
    prioridad: "baja",
  },
];

export function NotificacionesView({
  onLogout,
  onNavigate,
}: NotificacionesViewProps) {
  const [notificaciones, setNotificaciones] =
    useState<Notificacion[]>(notificacionesData);
  const [tipoFiltro, setTipoFiltro] = useState<TipoNotificacion>("todas");
  const [estadoFiltro, setEstadoFiltro] = useState<EstadoNotificacion>("todas");
  const [searchTerm, setSearchTerm] = useState("");

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

  // Filtrar notificaciones
  const notificacionesFiltradas = notificaciones.filter((notif) => {
    const matchTipo = tipoFiltro === "todas" || notif.tipo === tipoFiltro;
    const matchEstado =
      estadoFiltro === "todas" ||
      (estadoFiltro === "leidas" && notif.leida) ||
      (estadoFiltro === "no_leidas" && !notif.leida);
    const matchSearch =
      searchTerm === "" ||
      notif.titulo.toLowerCase().includes(searchTerm.toLowerCase()) ||
      notif.mensaje.toLowerCase().includes(searchTerm.toLowerCase());

    return matchTipo && matchEstado && matchSearch;
  });

  const notificacionesNoLeidas = notificaciones.filter((n) => !n.leida).length;

  const handleMarcarLeida = (id: number) => {
    setNotificaciones(
      notificaciones.map((n) => (n.id === id ? { ...n, leida: true } : n))
    );
    showToast("Notificación marcada como leída", "success");
  };

  const handleMarcarNoLeida = (id: number) => {
    setNotificaciones(
      notificaciones.map((n) => (n.id === id ? { ...n, leida: false } : n))
    );
    showToast("Notificación marcada como no leída", "info");
  };

  const handleEliminar = (id: number) => {
    setNotificaciones(notificaciones.filter((n) => n.id !== id));
    showToast("Notificación eliminada", "success");
  };

  const handleMarcarTodasLeidas = () => {
    setNotificaciones(notificaciones.map((n) => ({ ...n, leida: true })));
    showToast("Todas las notificaciones marcadas como leídas", "success");
  };

  const handleEliminarLeidas = () => {
    setNotificaciones(notificaciones.filter((n) => !n.leida));
    showToast("Notificaciones leídas eliminadas", "success");
  };

  const tipoConfig = {
    sistema: {
      icon: AlertCircle,
      color: "text-[#1a365d]",
      bg: "bg-[#1a365d]/10",
      label: "Sistema",
    },
    guias: {
      icon: Package,
      color: "text-[#00a3e0]",
      bg: "bg-[#00a3e0]/10",
      label: "Guías",
    },
    pagos: {
      icon: DollarSign,
      color: "text-[#38a169]",
      bg: "bg-[#38a169]/10",
      label: "Pagos",
    },
    empresas: {
      icon: Building2,
      color: "text-[#d69e2e]",
      bg: "bg-[#d69e2e]/10",
      label: "Empresas",
    },
  };

  const prioridadConfig = {
    alta: {
      color: "border-l-[#e53e3e]",
      badge: "bg-[#e53e3e]/10 text-[#e53e3e]",
    },
    media: {
      color: "border-l-[#d69e2e]",
      badge: "bg-[#d69e2e]/10 text-[#d69e2e]",
    },
    baja: {
      color: "border-l-[#9ca3af]",
      badge: "bg-[#9ca3af]/10 text-[#9ca3af]",
    },
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="notificaciones"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Notificaciones" />

        {/* Content */}
        <main className="pt-[70px] p-8">
          {/* Breadcrumb */}
          <div className="mb-6">
            <p className="text-sm text-[#9ca3af] mt-[10px] mr-[0px] mb-[0px] ml-[0px]">
              <span
                className="hover:text-[#00a3e0] cursor-pointer"
                onClick={() => onNavigate("dashboard")}
              >
                Dashboard
              </span>
              {" / "}
              <span className="text-[#2d3748]">Notificaciones</span>
            </p>
          </div>

          {/* Header con estadísticas */}
          <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-6">
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af] mb-1">Total</p>
                  <p className="text-3xl text-[#1a365d]">
                    {notificaciones.length}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                  <Bell className="w-6 h-6 text-[#00a3e0]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af] mb-1">No leídas</p>
                  <p className="text-3xl text-[#e53e3e]">
                    {notificacionesNoLeidas}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#e53e3e]/10 rounded-xl flex items-center justify-center">
                  <Mail className="w-6 h-6 text-[#e53e3e]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af] mb-1">Leídas</p>
                  <p className="text-3xl text-[#38a169]">
                    {notificaciones.length - notificacionesNoLeidas}
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
                  <MailOpen className="w-6 h-6 text-[#38a169]" />
                </div>
              </div>
            </div>

            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#9ca3af] mb-1">Alta prioridad</p>
                  <p className="text-3xl text-[#d69e2e]">
                    {
                      notificaciones.filter((n) => n.prioridad === "alta")
                        .length
                    }
                  </p>
                </div>
                <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#d69e2e]" />
                </div>
              </div>
            </div>
          </div>

          {/* Filtros y búsqueda */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="grid grid-cols-1 md:grid-cols-4 gap-4 mb-4">
              {/* Búsqueda */}
              <div className="md:col-span-2">
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    placeholder="Buscar notificaciones..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                  />
                </div>
              </div>

              {/* Filtro por tipo */}
              <div>
                <select
                  value={tipoFiltro}
                  onChange={(e) =>
                    setTipoFiltro(e.target.value as TipoNotificacion)
                  }
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  <option value="todas">Todos los tipos</option>
                  <option value="sistema">Sistema</option>
                  <option value="guias">Guías</option>
                  <option value="pagos">Pagos</option>
                  <option value="empresas">Empresas</option>
                </select>
              </div>

              {/* Filtro por estado */}
              <div>
                <select
                  value={estadoFiltro}
                  onChange={(e) =>
                    setEstadoFiltro(e.target.value as EstadoNotificacion)
                  }
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  <option value="todas">Todas</option>
                  <option value="no_leidas">No leídas</option>
                  <option value="leidas">Leídas</option>
                </select>
              </div>
            </div>

            {/* Acciones masivas */}
            <div className="flex items-center gap-3 pt-4 border-t border-[#9ca3af]/20">
              <button
                onClick={handleMarcarTodasLeidas}
                disabled={notificacionesNoLeidas === 0}
                className="flex items-center gap-2 px-4 py-2 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <CheckCircle className="w-4 h-4" />
                Marcar todas como leídas
              </button>
              <button
                onClick={handleEliminarLeidas}
                disabled={notificaciones.filter((n) => n.leida).length === 0}
                className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
              >
                <Trash2 className="w-4 h-4" />
                Eliminar leídas
              </button>
            </div>
          </div>

          {/* Lista de notificaciones */}
          <div className="space-y-3">
            {notificacionesFiltradas.length > 0 ? (
              notificacionesFiltradas.map((notificacion) => {
                const config = tipoConfig[notificacion.tipo];
                const IconComponent = config.icon;
                const prioridad = prioridadConfig[notificacion.prioridad];

                return (
                  <div
                    key={notificacion.id}
                    className={`bg-white rounded-xl shadow-sm border-l-4 ${
                      prioridad.color
                    } overflow-hidden transition-all hover:shadow-md ${
                      !notificacion.leida ? "bg-[#00a3e0]/5" : ""
                    }`}
                  >
                    <div className="p-6">
                      <div className="flex items-start gap-4">
                        {/* Icono */}
                        <div
                          className={`w-12 h-12 ${config.bg} rounded-xl flex items-center justify-center flex-shrink-0`}
                        >
                          <IconComponent
                            className={`w-6 h-6 ${config.color}`}
                          />
                        </div>

                        {/* Contenido */}
                        <div className="flex-1 min-w-0">
                          <div className="flex items-start justify-between gap-4 mb-2">
                            <div className="flex-1">
                              <div className="flex items-center gap-2 mb-1">
                                <h3
                                  className={`text-sm ${
                                    !notificacion.leida
                                      ? "text-[#1a365d]"
                                      : "text-[#2d3748]"
                                  }`}
                                >
                                  {notificacion.titulo}
                                </h3>
                                {!notificacion.leida && (
                                  <span className="w-2 h-2 bg-[#00a3e0] rounded-full"></span>
                                )}
                              </div>
                              <p
                                className={`text-sm ${
                                  !notificacion.leida
                                    ? "text-[#2d3748]"
                                    : "text-[#9ca3af]"
                                }`}
                              >
                                {notificacion.mensaje}
                              </p>
                            </div>

                            {/* Badges */}
                            <div className="flex items-center gap-2 flex-shrink-0">
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs ${config.bg} ${config.color}`}
                              >
                                {config.label}
                              </span>
                              <span
                                className={`inline-flex px-2 py-1 rounded-full text-xs ${prioridad.badge}`}
                              >
                                {notificacion.prioridad
                                  .charAt(0)
                                  .toUpperCase() +
                                  notificacion.prioridad.slice(1)}
                              </span>
                            </div>
                          </div>

                          <div className="flex items-center justify-between mt-3">
                            <p className="text-xs text-[#9ca3af]">
                              {notificacion.fecha} • {notificacion.hora}
                            </p>

                            {/* Acciones */}
                            <div className="flex items-center gap-2">
                              {!notificacion.leida ? (
                                <button
                                  onClick={() =>
                                    handleMarcarLeida(notificacion.id)
                                  }
                                  className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                                  title="Marcar como leída"
                                >
                                  <Check className="w-4 h-4 text-[#00a3e0]" />
                                </button>
                              ) : (
                                <button
                                  onClick={() =>
                                    handleMarcarNoLeida(notificacion.id)
                                  }
                                  className="p-2 hover:bg-[#9ca3af]/10 rounded-lg transition-colors"
                                  title="Marcar como no leída"
                                >
                                  <Mail className="w-4 h-4 text-[#9ca3af]" />
                                </button>
                              )}
                              <button
                                onClick={() => handleEliminar(notificacion.id)}
                                className="p-2 hover:bg-[#e53e3e]/10 rounded-lg transition-colors"
                                title="Eliminar"
                              >
                                <Trash2 className="w-4 h-4 text-[#e53e3e]" />
                              </button>
                            </div>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              // Empty state
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-16 h-16 bg-[#9ca3af]/10 rounded-full flex items-center justify-center mx-auto mb-4">
                  <Bell className="w-8 h-8 text-[#9ca3af]" />
                </div>
                <h3 className="text-lg text-[#1a365d] mb-2">
                  No hay notificaciones
                </h3>
                <p className="text-sm text-[#9ca3af]">
                  {searchTerm ||
                  tipoFiltro !== "todas" ||
                  estadoFiltro !== "todas"
                    ? "No se encontraron notificaciones con los filtros seleccionados"
                    : "No tienes notificaciones en este momento"}
                </p>
              </div>
            )}
          </div>
        </main>
      </div>

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
