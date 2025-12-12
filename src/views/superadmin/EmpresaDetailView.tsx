import { useState } from "react";
import {
  ArrowLeft,
  Edit,
  Plus,
  MoreVertical,
  FileText,
  TrendingUp,
  DollarSign,
  AlertCircle,
  Building2,
  MapPin,
  Phone,
  Mail,
  User,
  Clock,
  FileCheck,
  Calendar,
  Eye,
  Download,
  Search,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import {
  Empresa,
  AgregarGuiasModal,
  RegistrarPagoModal,
} from "../../components/superadmin/empresas";
import { Toast, ToastType } from "../../components/shared/Toast";

interface EmpresaDetailViewProps {
  empresa: Empresa;
  onLogout: () => void;
  onNavigate: (view: string) => void;
  onBack: () => void;
}

type TabType = "general" | "historial" | "solicitudes" | "pagos" | "clientes";

export function EmpresaDetailView({
  empresa,
  onLogout,
  onNavigate,
  onBack,
}: EmpresaDetailViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("general");
  const [isAgregarGuiasOpen, setIsAgregarGuiasOpen] = useState(false);
  const [isRegistrarPagoOpen, setIsRegistrarPagoOpen] = useState(false);
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

  const handleAgregarGuias = (
    cantidad: number,
    motivo: string,
    notas: string
  ) => {
    showToast(`Se agregaron ${cantidad} guías correctamente`, "success");
    setIsAgregarGuiasOpen(false);
  };

  const handleRegistrarPago = (pagoData: any) => {
    showToast(
      `Pago de $${pagoData.monto.toFixed(2)} registrado correctamente`,
      "success"
    );
    setIsRegistrarPagoOpen(false);
  };

  const tabs = [
    { id: "general" as TabType, label: "Información General" },
    { id: "historial" as TabType, label: "Historial de Guías" },
    { id: "solicitudes" as TabType, label: "Solicitudes" },
    { id: "pagos" as TabType, label: "Pagos" },
    { id: "clientes" as TabType, label: "Clientes/Destinatarios" },
  ];

  // Datos mock
  const guiasUsadas = 423;
  const saldoPendiente = 3150.0;
  const iniciales = empresa.razonSocial
    .split(" ")
    .map((word) => word[0])
    .join("")
    .substring(0, 2)
    .toUpperCase();

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="empresas"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Detalle de Empresa" />

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
              <span
                className="hover:text-[#00a3e0] cursor-pointer"
                onClick={onBack}
              >
                Empresas
              </span>
              {" / "}
              <span className="text-[#2d3748]">{empresa.razonSocial}</span>
            </p>
          </div>

          {/* Encabezado de la Empresa */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-start justify-between">
              {/* Left */}
              <div className="flex items-start gap-4">
                <div className="w-16 h-16 bg-[#1a365d] rounded-xl flex items-center justify-center flex-shrink-0">
                  <span className="text-2xl text-white">{iniciales}</span>
                </div>
                <div>
                  <h1 className="text-2xl text-[#1a365d] mb-2">
                    {empresa.razonSocial}
                  </h1>
                  <p className="text-sm text-[#9ca3af] mb-2">
                    RFC: DNO850315ABC
                  </p>
                  <div className="flex items-center gap-3">
                    <span
                      className={`inline-flex px-3 py-1 rounded-full text-xs ${
                        empresa.estado === "activo"
                          ? "bg-[#38a169]/10 text-[#38a169]"
                          : "bg-[#9ca3af]/10 text-[#9ca3af]"
                      }`}
                    >
                      {empresa.estado === "activo" ? "Activo" : "Inactivo"}
                    </span>
                    <span className="text-sm text-[#9ca3af]">
                      Cliente desde: 15 de Marzo, 2024
                    </span>
                  </div>
                </div>
              </div>

              {/* Right - Actions */}
              <div className="flex items-center gap-3">
                <button
                  onClick={onBack}
                  className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
                >
                  <ArrowLeft className="w-4 h-4" />
                  Volver
                </button>
                <button className="flex items-center gap-2 px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors">
                  <Edit className="w-4 h-4" />
                  Editar Empresa
                </button>
                <button
                  onClick={() => setIsAgregarGuiasOpen(true)}
                  className="flex items-center gap-2 px-4 py-2 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors"
                >
                  <Plus className="w-4 h-4" />
                  Agregar Guías
                </button>
                <button className="p-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] transition-colors">
                  <MoreVertical className="w-5 h-5 text-[#9ca3af]" />
                </button>
              </div>
            </div>
          </div>

          {/* Tarjetas de Métricas */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Guías Disponibles */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#00a3e0]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                {empresa.guiasDisponibles}
              </p>
              <p className="text-sm text-[#9ca3af]">Guías Disponibles</p>
              <p className="text-xs text-[#9ca3af] mt-1">Saldo actual</p>
            </div>

            {/* Guías Usadas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
                  <TrendingUp className="w-6 h-6 text-[#38a169]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{guiasUsadas}</p>
              <p className="text-sm text-[#9ca3af]">Guías Usadas</p>
              <p className="text-xs text-[#9ca3af] mt-1">Este mes</p>
            </div>

            {/* Costo por Guía */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#1a365d]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                ${empresa.costoPorGuia.toFixed(2)}
              </p>
              <p className="text-sm text-[#9ca3af]">Costo por Guía</p>
              <p className="text-xs text-[#9ca3af] mt-1">MXN</p>
            </div>

            {/* Saldo Pendiente */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#e53e3e]/10 rounded-xl flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-[#e53e3e]" />
                </div>
              </div>
              <p className="text-3xl text-[#e53e3e] mb-1">
                ${saldoPendiente.toFixed(2)}
              </p>
              <p className="text-sm text-[#9ca3af]">Saldo Pendiente</p>
              <p className="text-xs text-[#9ca3af] mt-1">Por cobrar</p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-[#9ca3af]/20">
              <div className="flex">
                {tabs.map((tab) => (
                  <button
                    key={tab.id}
                    onClick={() => setActiveTab(tab.id)}
                    className={`px-6 py-4 text-sm transition-colors relative ${
                      activeTab === tab.id
                        ? "text-[#00a3e0]"
                        : "text-[#9ca3af] hover:text-[#2d3748]"
                    }`}
                  >
                    {tab.label}
                    {activeTab === tab.id && (
                      <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a3e0]"></div>
                    )}
                  </button>
                ))}
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "general" && (
                <InformacionGeneralTab empresa={empresa} />
              )}
              {activeTab === "historial" && <HistorialGuiasTab />}
              {activeTab === "solicitudes" && <SolicitudesTab />}
              {activeTab === "pagos" && (
                <PagosTab
                  onRegistrarPago={() => setIsRegistrarPagoOpen(true)}
                  saldoPendiente={saldoPendiente}
                />
              )}
              {activeTab === "clientes" && <ClientesTab />}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <AgregarGuiasModal
        isOpen={isAgregarGuiasOpen}
        onClose={() => setIsAgregarGuiasOpen(false)}
        onSave={handleAgregarGuias}
        empresaNombre={empresa.razonSocial}
      />

      <RegistrarPagoModal
        isOpen={isRegistrarPagoOpen}
        onClose={() => setIsRegistrarPagoOpen(false)}
        onSave={handleRegistrarPago}
        empresaNombre={empresa.razonSocial}
        saldoPendiente={saldoPendiente}
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

// TAB: Información General
function InformacionGeneralTab({ empresa }: { empresa: Empresa }) {
  return (
    <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
      {/* Columna Izquierda */}
      <div className="space-y-6">
        {/* Datos de la Empresa */}
        <div>
          <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
            <Building2 className="w-5 h-5" />
            Datos de la Empresa
          </h3>
          <div className="bg-[#f8fafc] rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Razón Social:</span>
              <span className="text-sm text-[#2d3748]">
                {empresa.razonSocial}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">RFC:</span>
              <span className="text-sm text-[#2d3748]">DNO850315ABC</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Giro:</span>
              <span className="text-sm text-[#2d3748]">
                Comercio / Distribución
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Fecha de registro:</span>
              <span className="text-sm text-[#2d3748]">15/03/2024</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Estado:</span>
              <span
                className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                  empresa.estado === "activo"
                    ? "bg-[#38a169]/10 text-[#38a169]"
                    : "bg-[#9ca3af]/10 text-[#9ca3af]"
                }`}
              >
                {empresa.estado === "activo" ? "Activo" : "Inactivo"}
              </span>
            </div>
          </div>
        </div>

        {/* Dirección */}
        <div>
          <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
            <MapPin className="w-5 h-5" />
            Dirección
          </h3>
          <div className="bg-[#f8fafc] rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Calle:</span>
              <span className="text-sm text-[#2d3748]">
                Blvd. Luis Encinas #234
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Colonia:</span>
              <span className="text-sm text-[#2d3748]">Centro</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Código Postal:</span>
              <span className="text-sm text-[#2d3748]">83000</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Ciudad:</span>
              <span className="text-sm text-[#2d3748]">Hermosillo</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Estado:</span>
              <span className="text-sm text-[#2d3748]">Sonora</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">País:</span>
              <span className="text-sm text-[#2d3748]">México</span>
            </div>
          </div>
        </div>
      </div>

      {/* Columna Derecha */}
      <div className="space-y-6">
        {/* Información de Contacto */}
        <div>
          <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
            <Phone className="w-5 h-5" />
            Información de Contacto
          </h3>
          <div className="bg-[#f8fafc] rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Teléfono:</span>
              <span className="text-sm text-[#2d3748]">{empresa.telefono}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Correo:</span>
              <span className="text-sm text-[#2d3748]">{empresa.contacto}</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">
                Contacto principal:
              </span>
              <span className="text-sm text-[#2d3748]">
                Juan Martínez López
              </span>
            </div>
          </div>
        </div>

        {/* Configuración de Cuenta */}
        <div>
          <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
            <FileCheck className="w-5 h-5" />
            Configuración de Cuenta
          </h3>
          <div className="bg-[#f8fafc] rounded-lg p-4 space-y-3">
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Costo por guía:</span>
              <span className="text-sm text-[#2d3748]">
                ${empresa.costoPorGuia.toFixed(2)} MXN
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Guías disponibles:</span>
              <span className="text-sm text-[#2d3748]">
                {empresa.guiasDisponibles}
              </span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">Último acceso:</span>
              <span className="text-sm text-[#2d3748]">Hace 2 horas</span>
            </div>
            <div className="flex justify-between">
              <span className="text-sm text-[#9ca3af]">
                Total guías generadas:
              </span>
              <span className="text-sm text-[#2d3748]">1,245</span>
            </div>
          </div>
        </div>

        {/* Notas Internas */}
        <div>
          <h3 className="text-base text-[#1a365d] mb-4 flex items-center gap-2">
            <FileText className="w-5 h-5" />
            Notas Internas
          </h3>
          <div className="bg-[#f8fafc] rounded-lg p-4">
            <p className="text-sm text-[#2d3748] mb-3">
              Cliente preferencial. Pago puntual. Contactar a Juan para
              renovaciones.
            </p>
            <button className="text-sm text-[#00a3e0] hover:text-[#0086b8]">
              Editar notas
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// TAB: Historial de Guías
function HistorialGuiasTab() {
  const guias = [
    {
      id: "#44951",
      fecha: "28/11/2024",
      destinatario: "Farmacia del Valle",
      ciudad: "Nogales",
      estado: "entregada",
    },
    {
      id: "#44892",
      fecha: "27/11/2024",
      destinatario: "Abarrotes López",
      ciudad: "Cd. Obregón",
      estado: "transito",
    },
    {
      id: "#44756",
      fecha: "26/11/2024",
      destinatario: "Ferretería Central",
      ciudad: "Guaymas",
      estado: "entregada",
    },
    {
      id: "#44701",
      fecha: "25/11/2024",
      destinatario: "Papelería Norte",
      ciudad: "Hermosillo",
      estado: "entregada",
    },
    {
      id: "#44698",
      fecha: "25/11/2024",
      destinatario: "Tienda Express",
      ciudad: "Navojoa",
      estado: "recolectada",
    },
  ];

  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="flex gap-3 flex-1">
          <input
            type="date"
            className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
          />
          <span className="flex items-center text-[#9ca3af]">-</span>
          <input
            type="date"
            className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
          />
          <select className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white">
            <option>Todas</option>
            <option>Generada</option>
            <option>Recolectada</option>
            <option>En tránsito</option>
            <option>Entregada</option>
          </select>
        </div>
        <div className="flex gap-3">
          <div className="relative flex-1 lg:flex-initial">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
            <input
              type="text"
              placeholder="Buscar por número..."
              className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] w-full lg:w-64"
            />
          </div>
          <button className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] whitespace-nowrap">
            <Download className="w-4 h-4" />
            Exportar
          </button>
        </div>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                No. Guía
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Destinatario
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Ciudad Destino
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
            {guias.map((guia) => (
              <tr key={guia.id} className="hover:bg-[#f8fafc]/50">
                <td className="px-4 py-3 text-sm text-[#1a365d]">{guia.id}</td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {guia.fecha}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {guia.destinatario}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {guia.ciudad}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                      guia.estado === "entregada"
                        ? "bg-[#38a169]/10 text-[#38a169]"
                        : guia.estado === "transito"
                        ? "bg-[#00a3e0]/10 text-[#00a3e0]"
                        : "bg-[#d69e2e]/10 text-[#d69e2e]"
                    }`}
                  >
                    {guia.estado === "entregada"
                      ? "Entregada"
                      : guia.estado === "transito"
                      ? "En tránsito"
                      : "Recolectada"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button className="text-xs text-[#00a3e0] hover:text-[#0086b8]">
                      Ver PDF
                    </button>
                    <button className="text-xs text-[#00a3e0] hover:text-[#0086b8]">
                      Ver detalle
                    </button>
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// TAB: Solicitudes
function SolicitudesTab() {
  const solicitudes = [
    {
      fecha: "25/11/2024",
      cantidad: 100,
      monto: 4500,
      estado: "aprobada",
      atendidoPor: "Admin Juan",
    },
    {
      fecha: "15/11/2024",
      cantidad: 50,
      monto: 2250,
      estado: "aprobada",
      atendidoPor: "Admin María",
    },
    {
      fecha: "01/11/2024",
      cantidad: 75,
      monto: 3375,
      estado: "aprobada",
      atendidoPor: "Admin Juan",
    },
    {
      fecha: "20/10/2024",
      cantidad: 25,
      monto: 1125,
      estado: "rechazada",
      atendidoPor: "Admin Carlos",
    },
  ];

  return (
    <div className="overflow-x-auto">
      <table className="w-full">
        <thead>
          <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Fecha Solicitud
            </th>
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Cantidad
            </th>
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Monto Total
            </th>
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Estado
            </th>
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Atendido por
            </th>
            <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
              Acciones
            </th>
          </tr>
        </thead>
        <tbody className="divide-y divide-[#9ca3af]/20">
          {solicitudes.map((solicitud, index) => (
            <tr key={index} className="hover:bg-[#f8fafc]/50">
              <td className="px-4 py-3 text-sm text-[#2d3748]">
                {solicitud.fecha}
              </td>
              <td className="px-4 py-3 text-sm text-[#2d3748]">
                {solicitud.cantidad} guías
              </td>
              <td className="px-4 py-3 text-sm text-[#2d3748]">
                ${solicitud.monto.toFixed(2)}
              </td>
              <td className="px-4 py-3">
                <span
                  className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                    solicitud.estado === "aprobada"
                      ? "bg-[#38a169]/10 text-[#38a169]"
                      : "bg-[#e53e3e]/10 text-[#e53e3e]"
                  }`}
                >
                  {solicitud.estado === "aprobada" ? "Aprobada" : "Rechazada"}
                </span>
              </td>
              <td className="px-4 py-3 text-sm text-[#2d3748]">
                {solicitud.atendidoPor}
              </td>
              <td className="px-4 py-3">
                <button className="text-xs text-[#00a3e0] hover:text-[#0086b8]">
                  Ver detalle
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

// TAB: Pagos
function PagosTab({
  onRegistrarPago,
  saldoPendiente,
}: {
  onRegistrarPago: () => void;
  saldoPendiente: number;
}) {
  const pagos = [
    {
      fecha: "20/11/2024",
      monto: 2250,
      metodo: "Transferencia",
      referencia: "REF-78542",
      registradoPor: "Admin Juan",
      notas: "Pago parcial noviembre",
    },
    {
      fecha: "25/10/2024",
      monto: 3375,
      metodo: "Transferencia",
      referencia: "REF-65421",
      registradoPor: "Admin María",
      notas: "Pago completo octubre",
    },
    {
      fecha: "28/09/2024",
      monto: 4100,
      metodo: "Efectivo",
      referencia: "-",
      registradoPor: "Admin Juan",
      notas: "Pago septiembre",
    },
  ];

  return (
    <div>
      {/* Resumen de Cuenta */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-6">
        <div className="bg-[#1a365d]/5 rounded-lg p-4 border border-[#1a365d]/20">
          <p className="text-xs text-[#9ca3af] mb-1">
            Total facturado (este mes)
          </p>
          <p className="text-2xl text-[#1a365d]">$5,400.00</p>
        </div>
        <div className="bg-[#38a169]/5 rounded-lg p-4 border border-[#38a169]/20">
          <p className="text-xs text-[#9ca3af] mb-1">Total pagado</p>
          <p className="text-2xl text-[#38a169]">$2,250.00</p>
        </div>
        <div className="bg-[#e53e3e]/5 rounded-lg p-4 border border-[#e53e3e]/20 flex items-start justify-between">
          <div>
            <p className="text-xs text-[#9ca3af] mb-1">Saldo pendiente</p>
            <p className="text-2xl text-[#e53e3e]">
              ${saldoPendiente.toFixed(2)}
            </p>
          </div>
          <button
            onClick={onRegistrarPago}
            className="flex items-center gap-1 px-3 py-1.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] text-sm"
          >
            <Plus className="w-4 h-4" />
            Registrar Pago
          </button>
        </div>
      </div>

      {/* Historial de Pagos */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Monto
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Método
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Referencia
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Registrado por
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Notas
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#9ca3af]/20">
            {pagos.map((pago, index) => (
              <tr key={index} className="hover:bg-[#f8fafc]/50">
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.fecha}
                </td>
                <td className="px-4 py-3 text-sm text-[#38a169]">
                  ${pago.monto.toFixed(2)}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.metodo}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.referencia}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.registradoPor}
                </td>
                <td className="px-4 py-3 text-sm text-[#9ca3af]">
                  {pago.notas}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}

// TAB: Clientes/Destinatarios
function ClientesTab() {
  const clientes = [
    {
      nombre: "Farmacia del Valle",
      contacto: "contacto@farmvalle.com",
      ciudad: "Nogales",
      telefono: "631 123 4567",
      guiasEnviadas: 45,
    },
    {
      nombre: "Abarrotes López",
      contacto: "alopez@gmail.com",
      ciudad: "Cd. Obregón",
      telefono: "644 234 5678",
      guiasEnviadas: 38,
    },
    {
      nombre: "Ferretería Central",
      contacto: "ventas@ferrcentral.com",
      ciudad: "Guaymas",
      telefono: "622 345 6789",
      guiasEnviadas: 32,
    },
    {
      nombre: "Papelería Norte",
      contacto: "info@papnorte.com",
      ciudad: "Hermosillo",
      telefono: "662 456 7890",
      guiasEnviadas: 28,
    },
  ];

  return (
    <div>
      <p className="text-sm text-[#9ca3af] mb-4">
        Clientes frecuentes registrados por esta empresa para autocompletar
        guías
      </p>

      {/* Search and Total */}
      <div className="flex items-center justify-between mb-6">
        <div className="relative flex-1 max-w-md">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Buscar cliente..."
            className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
          />
        </div>
        <p className="text-sm text-[#9ca3af]">23 clientes registrados</p>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Nombre/Razón Social
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Contacto
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Ciudad
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Teléfono
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Guías Enviadas
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#9ca3af]/20">
            {clientes.map((cliente, index) => (
              <tr key={index} className="hover:bg-[#f8fafc]/50">
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {cliente.nombre}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {cliente.contacto}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {cliente.ciudad}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {cliente.telefono}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {cliente.guiasEnviadas}
                </td>
                <td className="px-4 py-3">
                  <button className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors">
                    <Eye className="w-4 h-4 text-[#00a3e0]" />
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}
