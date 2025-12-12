import { useState } from "react";
import {
  DollarSign,
  CheckCircle,
  AlertTriangle,
  Receipt,
  Search,
  Filter,
  Download,
  Eye,
  FileText,
  ChevronLeft,
  ChevronRight,
  Paperclip,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import {
  RegistrarPagoCobranzaModal,
  DetallePagoModal,
  ConfirmarEliminarPagoModal,
} from "../../components/superadmin/cobranza";
import { Toast, ToastType } from "../../components/shared/Toast";

interface CobranzaViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface EmpresaCobranza {
  id: number;
  nombre: string;
  guiasUsadas: number;
  costoPorGuia: number;
  totalFacturado: number;
  pagado: number;
  saldoPendiente: number;
  estado: "corriente" | "pendiente" | "vencido";
  ultimoPago?: {
    fecha: string;
    monto: number;
  };
}

interface Pago {
  id: number;
  fecha: string;
  empresa: string;
  monto: number;
  metodo: string;
  referencia: string;
  registradoPor: string;
  fechaRegistro: string;
  notas?: string;
  comprobante?: string;
}

type TabType = "saldos" | "historial";
type EstadoFilter = "todos" | "con_saldo" | "corriente";
type OrdenarFilter = "mayor_deuda" | "menor_deuda" | "nombre" | "antiguo";

// Helper function para formatear moneda con comas mexicanas
const formatCurrency = (amount: number): string => {
  return amount.toLocaleString("es-MX", {
    minimumFractionDigits: 2,
    maximumFractionDigits: 2,
  });
};

const initialEmpresas: EmpresaCobranza[] = [
  {
    id: 1,
    nombre: "Comercial López",
    guiasUsadas: 85,
    costoPorGuia: 50.0,
    totalFacturado: 4250.0,
    pagado: 0.0,
    saldoPendiente: 4250.0,
    estado: "pendiente",
  },
  {
    id: 2,
    nombre: "Distribuidora Norte S.A.",
    guiasUsadas: 120,
    costoPorGuia: 45.0,
    totalFacturado: 5400.0,
    pagado: 2250.0,
    saldoPendiente: 3150.0,
    estado: "pendiente",
    ultimoPago: { fecha: "20/11/2024", monto: 2250.0 },
  },
  {
    id: 3,
    nombre: "Abarrotes del Valle",
    guiasUsadas: 45,
    costoPorGuia: 52.0,
    totalFacturado: 2340.0,
    pagado: 0.0,
    saldoPendiente: 2340.0,
    estado: "vencido",
  },
  {
    id: 4,
    nombre: "Refaccionaria Express",
    guiasUsadas: 90,
    costoPorGuia: 44.0,
    totalFacturado: 3960.0,
    pagado: 2000.0,
    saldoPendiente: 1960.0,
    estado: "pendiente",
    ultimoPago: { fecha: "25/11/2024", monto: 2000.0 },
  },
  {
    id: 5,
    nombre: "Farmacia San José",
    guiasUsadas: 60,
    costoPorGuia: 55.0,
    totalFacturado: 3300.0,
    pagado: 1500.0,
    saldoPendiente: 1800.0,
    estado: "pendiente",
    ultimoPago: { fecha: "24/11/2024", monto: 1500.0 },
  },
  {
    id: 6,
    nombre: "Ferretería Central",
    guiasUsadas: 95,
    costoPorGuia: 42.0,
    totalFacturado: 3990.0,
    pagado: 3990.0,
    saldoPendiente: 0.0,
    estado: "corriente",
    ultimoPago: { fecha: "27/11/2024", monto: 3990.0 },
  },
  {
    id: 7,
    nombre: "Papelería Robles",
    guiasUsadas: 70,
    costoPorGuia: 48.0,
    totalFacturado: 3360.0,
    pagado: 3360.0,
    saldoPendiente: 0.0,
    estado: "corriente",
    ultimoPago: { fecha: "27/11/2024", monto: 3360.0 },
  },
  {
    id: 8,
    nombre: "Mueblería Sonora",
    guiasUsadas: 55,
    costoPorGuia: 46.0,
    totalFacturado: 2530.0,
    pagado: 2530.0,
    saldoPendiente: 0.0,
    estado: "corriente",
    ultimoPago: { fecha: "26/11/2024", monto: 2530.0 },
  },
];

const initialPagos: Pago[] = [
  {
    id: 1,
    fecha: "28/11/2024",
    empresa: "Distribuidora Norte S.A.",
    monto: 2250.0,
    metodo: "transferencia",
    referencia: "REF-89542",
    registradoPor: "Admin Juan",
    fechaRegistro: "28/11/2024 3:45pm",
    notas: "Pago parcial nov",
    comprobante: "comprobante.pdf",
  },
  {
    id: 2,
    fecha: "27/11/2024",
    empresa: "Ferretería Central",
    monto: 3990.0,
    metodo: "transferencia",
    referencia: "REF-88721",
    registradoPor: "Admin María",
    fechaRegistro: "27/11/2024 2:30pm",
    notas: "Pago completo nov",
    comprobante: "comprobante.pdf",
  },
  {
    id: 3,
    fecha: "27/11/2024",
    empresa: "Papelería Robles",
    monto: 3360.0,
    metodo: "efectivo",
    referencia: "-",
    registradoPor: "Admin Juan",
    fechaRegistro: "27/11/2024 4:15pm",
  },
  {
    id: 4,
    fecha: "26/11/2024",
    empresa: "Mueblería Sonora",
    monto: 2530.0,
    metodo: "cheque",
    referencia: "CHQ-4521",
    registradoPor: "Admin Carlos",
    fechaRegistro: "26/11/2024 11:20am",
    notas: "Cheque Banorte",
    comprobante: "comprobante.pdf",
  },
  {
    id: 5,
    fecha: "25/11/2024",
    empresa: "Refaccionaria Express",
    monto: 2000.0,
    metodo: "transferencia",
    referencia: "REF-87456",
    registradoPor: "Admin Juan",
    fechaRegistro: "25/11/2024 5:30pm",
    notas: "Abono a cuenta",
    comprobante: "comprobante.pdf",
  },
  {
    id: 6,
    fecha: "24/11/2024",
    empresa: "Farmacia San José",
    monto: 1500.0,
    metodo: "transferencia",
    referencia: "REF-86320",
    registradoPor: "Admin María",
    fechaRegistro: "24/11/2024 1:45pm",
    notas: "Primer abono",
    comprobante: "comprobante.pdf",
  },
];

export function CobranzaView({ onLogout, onNavigate }: CobranzaViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("saldos");
  const [empresas, setEmpresas] = useState<EmpresaCobranza[]>(initialEmpresas);
  const [pagos, setPagos] = useState<Pago[]>(initialPagos);

  const [searchTerm, setSearchTerm] = useState("");
  const [estadoFilter, setEstadoFilter] = useState<EstadoFilter>("todos");
  const [ordenarFilter, setOrdenarFilter] =
    useState<OrdenarFilter>("mayor_deuda");

  const [selectedEmpresa, setSelectedEmpresa] =
    useState<EmpresaCobranza | null>(null);
  const [selectedPago, setSelectedPago] = useState<Pago | null>(null);
  const [pagoToDelete, setPagoToDelete] = useState<Pago | null>(null);

  const [isRegistrarPagoOpen, setIsRegistrarPagoOpen] = useState(false);
  const [isDetallePagoOpen, setIsDetallePagoOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);

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

  // Filtrar empresas
  const filteredEmpresas = empresas
    .filter((e) => {
      if (
        searchTerm &&
        !e.nombre.toLowerCase().includes(searchTerm.toLowerCase())
      ) {
        return false;
      }
      if (estadoFilter === "con_saldo" && e.saldoPendiente === 0) {
        return false;
      }
      if (estadoFilter === "corriente" && e.saldoPendiente > 0) {
        return false;
      }
      return true;
    })
    .sort((a, b) => {
      switch (ordenarFilter) {
        case "mayor_deuda":
          return b.saldoPendiente - a.saldoPendiente;
        case "menor_deuda":
          return a.saldoPendiente - b.saldoPendiente;
        case "nombre":
          return a.nombre.localeCompare(b.nombre);
        case "antiguo":
          return 0; // Would need date field
        default:
          return 0;
      }
    });

  // Filtrar pagos
  const filteredPagos = pagos.filter(
    (p) =>
      p.empresa.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.referencia.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleRegistrarPago = (empresa: EmpresaCobranza) => {
    setSelectedEmpresa(empresa);
    setIsRegistrarPagoOpen(true);
  };

  const handleSavePago = (pagoData: any) => {
    const empresa = empresas.find((e) => e.id === pagoData.empresaId);
    if (empresa) {
      // Actualizar saldo de empresa
      const updatedEmpresas = empresas.map((e) =>
        e.id === pagoData.empresaId
          ? {
              ...e,
              pagado: e.pagado + pagoData.monto,
              saldoPendiente: Math.max(0, e.saldoPendiente - pagoData.monto),
              estado:
                e.saldoPendiente - pagoData.monto <= 0
                  ? ("corriente" as const)
                  : e.estado,
              ultimoPago: { fecha: pagoData.fecha, monto: pagoData.monto },
            }
          : e
      );
      setEmpresas(updatedEmpresas);

      // Agregar pago al historial
      const nuevoPago: Pago = {
        id: pagos.length + 1,
        fecha: pagoData.fecha,
        empresa: empresa.nombre,
        monto: pagoData.monto,
        metodo: pagoData.metodo,
        referencia: pagoData.referencia,
        registradoPor: "Admin Juan",
        fechaRegistro: new Date().toLocaleString(),
        notas: pagoData.notas,
      };
      setPagos([nuevoPago, ...pagos]);

      showToast(
        `Pago registrado correctamente por $${formatCurrency(pagoData.monto)}`,
        "success"
      );
      setIsRegistrarPagoOpen(false);
    }
  };

  const handleVerPago = (pago: Pago) => {
    setSelectedPago(pago);
    setIsDetallePagoOpen(true);
  };

  const handleEliminarPago = (pago: Pago) => {
    setPagoToDelete(pago);
    setIsDetallePagoOpen(false);
    setIsConfirmDeleteOpen(true);
  };

  const handleConfirmDelete = (motivo: string) => {
    if (pagoToDelete) {
      // Recalcular saldo de empresa
      const empresa = empresas.find((e) => e.nombre === pagoToDelete.empresa);
      if (empresa) {
        const updatedEmpresas = empresas.map((e) =>
          e.nombre === pagoToDelete.empresa
            ? {
                ...e,
                pagado: e.pagado - pagoToDelete.monto,
                saldoPendiente: e.saldoPendiente + pagoToDelete.monto,
                estado: "pendiente" as const,
              }
            : e
        );
        setEmpresas(updatedEmpresas);
      }

      // Eliminar pago
      setPagos(pagos.filter((p) => p.id !== pagoToDelete.id));
      showToast("Pago eliminado. Saldo recalculado.", "info");
      setPagoToDelete(null);
    }
  };

  // Estadísticas
  const totalPendiente = empresas.reduce((sum, e) => sum + e.saldoPendiente, 0);
  const cobradoMes = empresas.reduce((sum, e) => sum + e.pagado, 0);
  const empresasConSaldo = empresas.filter((e) => e.saldoPendiente > 0).length;
  const pagosHoy = pagos.filter((p) => p.fecha === "28/11/2024").length;
  const montoHoy = pagos
    .filter((p) => p.fecha === "28/11/2024")
    .reduce((sum, p) => sum + p.monto, 0);

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="cobranza"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Control de Cobranza" />

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
              <span className="text-[#2d3748]">Cobranza</span>
            </p>
          </div>

          {/* Tarjetas de Resumen Financiero */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 mb-6">
            {/* Total por Cobrar */}
            <div className="bg-white rounded-xl p-6 shadow-sm border-2 border-[#e53e3e]/30">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#e53e3e]/10 rounded-xl flex items-center justify-center">
                  <DollarSign className="w-6 h-6 text-[#e53e3e]" />
                </div>
              </div>
              <p className="text-3xl text-[#e53e3e] mb-1">
                ${formatCurrency(totalPendiente)}
              </p>
              <p className="text-sm text-[#9ca3af]">Total Pendiente</p>
              <p className="text-xs text-[#9ca3af] mt-1">MXN</p>
            </div>

            {/* Cobrado Este Mes */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#38a169]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                ${formatCurrency(cobradoMes)}
              </p>
              <p className="text-sm text-[#9ca3af]">Cobrado en Noviembre</p>
              <p className="text-xs text-[#9ca3af] mt-1">MXN</p>
            </div>

            {/* Empresas con Saldo */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
                  <AlertTriangle className="w-6 h-6 text-[#d69e2e]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{empresasConSaldo}</p>
              <p className="text-sm text-[#9ca3af]">Empresas con Saldo</p>
              <p className="text-xs text-[#9ca3af] mt-1">Pendiente de pago</p>
            </div>

            {/* Pagos Hoy */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                  <Receipt className="w-6 h-6 text-[#00a3e0]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{pagosHoy}</p>
              <p className="text-sm text-[#9ca3af]">Pagos Hoy</p>
              <p className="text-xs text-[#9ca3af] mt-1">
                ${formatCurrency(montoHoy)} MXN
              </p>
            </div>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm overflow-hidden">
            {/* Tab Headers */}
            <div className="border-b border-[#9ca3af]/20">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("saldos")}
                  className={`px-6 py-4 text-sm transition-colors relative ${
                    activeTab === "saldos"
                      ? "text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  Saldos Pendientes
                  {activeTab === "saldos" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a3e0]"></div>
                  )}
                </button>
                <button
                  onClick={() => setActiveTab("historial")}
                  className={`px-6 py-4 text-sm transition-colors relative ${
                    activeTab === "historial"
                      ? "text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  Historial de Pagos
                  {activeTab === "historial" && (
                    <div className="absolute bottom-0 left-0 right-0 h-0.5 bg-[#00a3e0]"></div>
                  )}
                </button>
              </div>
            </div>

            {/* Tab Content */}
            <div className="p-6">
              {activeTab === "saldos" ? (
                <SaldosTab
                  empresas={filteredEmpresas}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  estadoFilter={estadoFilter}
                  onEstadoChange={setEstadoFilter}
                  ordenarFilter={ordenarFilter}
                  onOrdenarChange={setOrdenarFilter}
                  onRegistrarPago={handleRegistrarPago}
                />
              ) : (
                <HistorialTab
                  pagos={filteredPagos}
                  searchTerm={searchTerm}
                  onSearchChange={setSearchTerm}
                  onVerPago={handleVerPago}
                />
              )}
            </div>
          </div>
        </main>
      </div>

      {/* Modals */}
      <RegistrarPagoCobranzaModal
        isOpen={isRegistrarPagoOpen}
        onClose={() => setIsRegistrarPagoOpen(false)}
        empresa={selectedEmpresa}
        onSave={handleSavePago}
      />

      <DetallePagoModal
        isOpen={isDetallePagoOpen}
        onClose={() => setIsDetallePagoOpen(false)}
        pago={selectedPago}
        onEliminar={handleEliminarPago}
      />

      <ConfirmarEliminarPagoModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        pago={pagoToDelete}
        onConfirm={handleConfirmDelete}
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

// TAB: Saldos Pendientes
interface SaldosTabProps {
  empresas: EmpresaCobranza[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  estadoFilter: EstadoFilter;
  onEstadoChange: (filter: EstadoFilter) => void;
  ordenarFilter: OrdenarFilter;
  onOrdenarChange: (filter: OrdenarFilter) => void;
  onRegistrarPago: (empresa: EmpresaCobranza) => void;
}

function SaldosTab({
  empresas,
  searchTerm,
  onSearchChange,
  estadoFilter,
  onEstadoChange,
  ordenarFilter,
  onOrdenarChange,
  onRegistrarPago,
}: SaldosTabProps) {
  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Buscar empresa..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
          />
        </div>
        <select
          value={estadoFilter}
          onChange={(e) => onEstadoChange(e.target.value as EstadoFilter)}
          className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
        >
          <option value="todos">Todos los estados</option>
          <option value="con_saldo">Con saldo</option>
          <option value="corriente">Al corriente</option>
        </select>
        <select
          value={ordenarFilter}
          onChange={(e) => onOrdenarChange(e.target.value as OrdenarFilter)}
          className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
        >
          <option value="mayor_deuda">Mayor deuda</option>
          <option value="menor_deuda">Menor deuda</option>
          <option value="nombre">Nombre</option>
          <option value="antiguo">Más antiguo</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] whitespace-nowrap">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Empresa
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Guías Usadas
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Costo/Guía
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Total Facturado
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Pagado
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Saldo Pendiente
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
            {empresas.map((empresa) => (
              <tr
                key={empresa.id}
                className={`hover:bg-[#f8fafc]/50 ${
                  empresa.estado === "vencido"
                    ? "bg-[#e53e3e]/5 border-l-4 border-l-[#e53e3e]"
                    : empresa.estado === "pendiente" &&
                      empresa.saldoPendiente > 2000
                    ? "border-l-4 border-l-[#d69e2e]"
                    : ""
                }`}
              >
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {empresa.nombre}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {empresa.guiasUsadas} guías
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  ${formatCurrency(empresa.costoPorGuia)}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  ${formatCurrency(empresa.totalFacturado)}
                </td>
                <td className="px-4 py-3 text-sm text-[#38a169]">
                  ${formatCurrency(empresa.pagado)}
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`text-sm ${
                      empresa.saldoPendiente === 0
                        ? "text-[#38a169]"
                        : "text-[#e53e3e]"
                    }`}
                  >
                    ${formatCurrency(empresa.saldoPendiente)}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <span
                    className={`inline-flex px-2.5 py-1 rounded-full text-xs ${
                      empresa.estado === "corriente"
                        ? "bg-[#38a169]/10 text-[#38a169]"
                        : empresa.estado === "pendiente"
                        ? "bg-[#d69e2e]/10 text-[#d69e2e]"
                        : "bg-[#e53e3e]/10 text-[#e53e3e]"
                    }`}
                  >
                    {empresa.estado === "corriente"
                      ? "Al corriente"
                      : empresa.estado === "pendiente"
                      ? "Pendiente"
                      : "Vencido"}
                  </span>
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    {empresa.saldoPendiente > 0 && (
                      <button
                        onClick={() => onRegistrarPago(empresa)}
                        className="px-3 py-1.5 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors text-xs"
                      >
                        Registrar Pago
                      </button>
                    )}
                    <button
                      className="p-2 hover:bg-[#f8fafc] rounded-lg transition-colors"
                      title="Ver historial"
                    >
                      <FileText className="w-4 h-4 text-[#9ca3af]" />
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

// TAB: Historial de Pagos
interface HistorialTabProps {
  pagos: Pago[];
  searchTerm: string;
  onSearchChange: (value: string) => void;
  onVerPago: (pago: Pago) => void;
}

function HistorialTab({
  pagos,
  searchTerm,
  onSearchChange,
  onVerPago,
}: HistorialTabProps) {
  return (
    <div>
      {/* Filters */}
      <div className="flex flex-col lg:flex-row gap-4 mb-6">
        <div className="relative flex-1">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
          <input
            type="text"
            placeholder="Buscar empresa o referencia..."
            value={searchTerm}
            onChange={(e) => onSearchChange(e.target.value)}
            className="w-full pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
          />
        </div>
        <input
          type="date"
          placeholder="Desde"
          className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
        />
        <input
          type="date"
          placeholder="Hasta"
          className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
        />
        <select className="px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white">
          <option>Todos los métodos</option>
          <option>Transferencia</option>
          <option>Efectivo</option>
          <option>Cheque</option>
        </select>
        <button className="flex items-center gap-2 px-4 py-2 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] whitespace-nowrap">
          <Download className="w-4 h-4" />
          Exportar
        </button>
      </div>

      {/* Table */}
      <div className="overflow-x-auto">
        <table className="w-full">
          <thead>
            <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Fecha
              </th>
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Empresa
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
              <th className="px-4 py-3 text-left text-xs text-[#9ca3af] uppercase">
                Acciones
              </th>
            </tr>
          </thead>
          <tbody className="divide-y divide-[#9ca3af]/20">
            {pagos.map((pago) => (
              <tr key={pago.id} className="hover:bg-[#f8fafc]/50">
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.fecha}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.empresa}
                </td>
                <td className="px-4 py-3 text-sm text-[#38a169]">
                  ${formatCurrency(pago.monto)}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748] capitalize">
                  {pago.metodo}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.referencia}
                </td>
                <td className="px-4 py-3 text-sm text-[#2d3748]">
                  {pago.registradoPor}
                </td>
                <td className="px-4 py-3 text-sm text-[#9ca3af]">
                  {pago.notas || "-"}
                </td>
                <td className="px-4 py-3">
                  <div className="flex items-center gap-2">
                    <button
                      onClick={() => onVerPago(pago)}
                      className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                      title="Ver"
                    >
                      <Eye className="w-4 h-4 text-[#00a3e0]" />
                    </button>
                    {pago.comprobante && (
                      <button
                        className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                        title="Comprobante"
                      >
                        <Paperclip className="w-4 h-4 text-[#9ca3af]" />
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
      <div className="flex items-center justify-between mt-6 pt-4 border-t border-[#9ca3af]/20">
        <p className="text-sm text-[#9ca3af]">
          Mostrando 1-{pagos.length} de {pagos.length} pagos
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
  );
}
