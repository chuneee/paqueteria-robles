import { useState } from "react";
import {
  Download,
  Calendar,
  TrendingUp,
  Package,
  DollarSign,
  Building2,
  FileText,
  BarChart3,
  PieChart,
  Filter,
  ChevronDown,
  Clock,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import { Toast, ToastType } from "../../components/shared/Toast";
import {
  BarChart,
  Bar,
  XAxis,
  YAxis,
  CartesianGrid,
  Tooltip,
  Legend,
  ResponsiveContainer,
  LineChart,
  Line,
  PieChart as RechartsPieChart,
  Pie,
  Cell,
} from "recharts";

interface ReportesViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

type TipoReporte = "guias" | "ingresos" | "empresas" | "rendimiento";
type PeriodoReporte = "semana" | "mes" | "trimestre" | "anio" | "personalizado";

// Datos para gráficas
const guiasPorDiaData = [
  { dia: "Lun", generadas: 45, entregadas: 38 },
  { dia: "Mar", generadas: 52, entregadas: 42 },
  { dia: "Mié", generadas: 48, entregadas: 45 },
  { dia: "Jue", generadas: 61, entregadas: 48 },
  { dia: "Vie", generadas: 55, entregadas: 52 },
  { dia: "Sáb", generadas: 38, entregadas: 35 },
  { dia: "Dom", generadas: 28, entregadas: 25 },
];

const ingresosMensualesData = [
  { mes: "Jun", ingresos: 85000 },
  { mes: "Jul", ingresos: 92000 },
  { mes: "Ago", ingresos: 88000 },
  { mes: "Sep", ingresos: 95000 },
  { mes: "Oct", ingresos: 105000 },
  { mes: "Nov", ingresos: 125750 },
];

const guiasPorEstadoData = [
  { name: "Entregadas", value: 1245, color: "#38a169" },
  { name: "En Tránsito", value: 182, color: "#d69e2e" },
  { name: "Recolectadas", value: 95, color: "#00a3e0" },
  { name: "Generadas", value: 48, color: "#6b7280" },
];

const topEmpresasData = [
  { empresa: "Distribuidora Norte S.A.", guias: 450, ingresos: 22500 },
  { empresa: "Comercial López", guias: 380, ingresos: 19000 },
  { empresa: "Ferretería Central", guias: 340, ingresos: 14280 },
  { empresa: "Farmacia San José", guias: 290, ingresos: 15950 },
  { empresa: "Refaccionaria Express", guias: 275, ingresos: 12100 },
];

export function ReportesView({ onLogout, onNavigate }: ReportesViewProps) {
  const [tipoReporte, setTipoReporte] = useState<TipoReporte>("guias");
  const [periodo, setPeriodo] = useState<PeriodoReporte>("mes");
  const [fechaInicio, setFechaInicio] = useState("2024-11-01");
  const [fechaFin, setFechaFin] = useState("2024-11-30");
  const [empresaFiltro, setEmpresaFiltro] = useState("todas");

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

  const handleGenerarReporte = () => {
    showToast("Generando reporte...", "info");
    setTimeout(() => {
      showToast("Reporte generado exitosamente", "success");
    }, 1500);
  };

  const handleExportarPDF = () => {
    showToast("Exportando reporte en PDF...", "info");
  };

  const handleExportarExcel = () => {
    showToast("Exportando reporte en Excel...", "info");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="reportes"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Reportes y Estadísticas" />

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
              <span className="text-[#2d3748]">Reportes</span>
            </p>
          </div>

          {/* Selector de Tipo de Reporte */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-6">
            <button
              onClick={() => setTipoReporte("guias")}
              className={`p-6 rounded-xl border-2 transition-all ${
                tipoReporte === "guias"
                  ? "bg-[#00a3e0] border-[#00a3e0] text-white shadow-lg"
                  : "bg-white border-[#9ca3af]/20 hover:border-[#00a3e0]/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Package
                  className={`w-6 h-6 ${
                    tipoReporte === "guias" ? "text-white" : "text-[#00a3e0]"
                  }`}
                />
                <h3
                  className={`text-lg ${
                    tipoReporte === "guias" ? "text-white" : "text-[#1a365d]"
                  }`}
                >
                  Guías
                </h3>
              </div>
              <p
                className={`text-sm ${
                  tipoReporte === "guias" ? "text-white/90" : "text-[#9ca3af]"
                }`}
              >
                Estadísticas de envíos
              </p>
            </button>

            <button
              onClick={() => setTipoReporte("ingresos")}
              className={`p-6 rounded-xl border-2 transition-all ${
                tipoReporte === "ingresos"
                  ? "bg-[#00a3e0] border-[#00a3e0] text-white shadow-lg"
                  : "bg-white border-[#9ca3af]/20 hover:border-[#00a3e0]/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <DollarSign
                  className={`w-6 h-6 ${
                    tipoReporte === "ingresos" ? "text-white" : "text-[#00a3e0]"
                  }`}
                />
                <h3
                  className={`text-lg ${
                    tipoReporte === "ingresos" ? "text-white" : "text-[#1a365d]"
                  }`}
                >
                  Ingresos
                </h3>
              </div>
              <p
                className={`text-sm ${
                  tipoReporte === "ingresos"
                    ? "text-white/90"
                    : "text-[#9ca3af]"
                }`}
              >
                Análisis financiero
              </p>
            </button>

            <button
              onClick={() => setTipoReporte("empresas")}
              className={`p-6 rounded-xl border-2 transition-all ${
                tipoReporte === "empresas"
                  ? "bg-[#00a3e0] border-[#00a3e0] text-white shadow-lg"
                  : "bg-white border-[#9ca3af]/20 hover:border-[#00a3e0]/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <Building2
                  className={`w-6 h-6 ${
                    tipoReporte === "empresas" ? "text-white" : "text-[#00a3e0]"
                  }`}
                />
                <h3
                  className={`text-lg ${
                    tipoReporte === "empresas" ? "text-white" : "text-[#1a365d]"
                  }`}
                >
                  Empresas
                </h3>
              </div>
              <p
                className={`text-sm ${
                  tipoReporte === "empresas"
                    ? "text-white/90"
                    : "text-[#9ca3af]"
                }`}
              >
                Rendimiento por cliente
              </p>
            </button>

            <button
              onClick={() => setTipoReporte("rendimiento")}
              className={`p-6 rounded-xl border-2 transition-all ${
                tipoReporte === "rendimiento"
                  ? "bg-[#00a3e0] border-[#00a3e0] text-white shadow-lg"
                  : "bg-white border-[#9ca3af]/20 hover:border-[#00a3e0]/50"
              }`}
            >
              <div className="flex items-center gap-3 mb-2">
                <TrendingUp
                  className={`w-6 h-6 ${
                    tipoReporte === "rendimiento"
                      ? "text-white"
                      : "text-[#00a3e0]"
                  }`}
                />
                <h3
                  className={`text-lg ${
                    tipoReporte === "rendimiento"
                      ? "text-white"
                      : "text-[#1a365d]"
                  }`}
                >
                  Rendimiento
                </h3>
              </div>
              <p
                className={`text-sm ${
                  tipoReporte === "rendimiento"
                    ? "text-white/90"
                    : "text-[#9ca3af]"
                }`}
              >
                KPIs operativos
              </p>
            </button>
          </div>

          {/* Filtros de Periodo */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex items-center gap-2 mb-4">
              <Filter className="w-5 h-5 text-[#00a3e0]" />
              <h3 className="text-sm text-[#1a365d]">Filtros de Reporte</h3>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-5 gap-4">
              <div>
                <label className="block text-xs text-[#9ca3af] mb-1.5">
                  Periodo
                </label>
                <select
                  value={periodo}
                  onChange={(e) => setPeriodo(e.target.value as PeriodoReporte)}
                  className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                >
                  <option value="semana">Última semana</option>
                  <option value="mes">Último mes</option>
                  <option value="trimestre">Último trimestre</option>
                  <option value="anio">Último año</option>
                  <option value="personalizado">Personalizado</option>
                </select>
              </div>

              {periodo === "personalizado" && (
                <>
                  <div>
                    <label className="block text-xs text-[#9ca3af] mb-1.5">
                      Fecha inicio
                    </label>
                    <input
                      type="date"
                      value={fechaInicio}
                      onChange={(e) => setFechaInicio(e.target.value)}
                      className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                    />
                  </div>
                  <div>
                    <label className="block text-xs text-[#9ca3af] mb-1.5">
                      Fecha fin
                    </label>
                    <input
                      type="date"
                      value={fechaFin}
                      onChange={(e) => setFechaFin(e.target.value)}
                      className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0]"
                    />
                  </div>
                </>
              )}

              {tipoReporte === "empresas" && (
                <div>
                  <label className="block text-xs text-[#9ca3af] mb-1.5">
                    Empresa
                  </label>
                  <select
                    value={empresaFiltro}
                    onChange={(e) => setEmpresaFiltro(e.target.value)}
                    className="w-full px-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white"
                  >
                    <option value="todas">Todas las empresas</option>
                    <option value="distribuidora">
                      Distribuidora Norte S.A.
                    </option>
                    <option value="comercial">Comercial López</option>
                    <option value="ferreteria">Ferretería Central</option>
                  </select>
                </div>
              )}

              <div className="flex items-end gap-2">
                <button
                  onClick={handleGenerarReporte}
                  className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
                >
                  Generar
                </button>
                <button
                  onClick={handleExportarPDF}
                  className="px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors"
                >
                  PDF
                </button>
                <button
                  onClick={handleExportarExcel}
                  className="px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/10 transition-colors"
                >
                  Excel
                </button>
              </div>
            </div>
          </div>

          {/* Contenido según tipo de reporte */}
          {tipoReporte === "guias" && <ReporteGuias />}
          {tipoReporte === "ingresos" && <ReporteIngresos />}
          {tipoReporte === "empresas" && <ReporteEmpresas />}
          {tipoReporte === "rendimiento" && <ReporteRendimiento />}
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

// REPORTE: Guías
function ReporteGuias() {
  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#00a3e0]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">1,570</p>
          <p className="text-sm text-[#9ca3af]">Total de Guías</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 12% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#38a169]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">1,245</p>
          <p className="text-sm text-[#9ca3af]">Entregadas</p>
          <p className="text-xs text-[#9ca3af] mt-2">79.3% del total</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#d69e2e]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">182</p>
          <p className="text-sm text-[#9ca3af]">En Tránsito</p>
          <p className="text-xs text-[#9ca3af] mt-2">11.6% del total</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#6b7280]/10 rounded-xl flex items-center justify-center">
              <Package className="w-6 h-6 text-[#6b7280]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">143</p>
          <p className="text-sm text-[#9ca3af]">Pendientes</p>
          <p className="text-xs text-[#9ca3af] mt-2">9.1% del total</p>
        </div>
      </div>

      {/* Gráficas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        {/* Guías por día */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-[#1a365d] mb-4">
            Guías por Día (Última Semana)
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={guiasPorDiaData}>
              <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
              <XAxis
                dataKey="dia"
                stroke="#9ca3af"
                style={{ fontSize: "12px" }}
              />
              <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
              <Tooltip
                contentStyle={{
                  backgroundColor: "#ffffff",
                  border: "1px solid #e5e7eb",
                  borderRadius: "8px",
                }}
              />
              <Legend />
              <Bar
                dataKey="generadas"
                fill="#00a3e0"
                name="Generadas"
                radius={[8, 8, 0, 0]}
              />
              <Bar
                dataKey="entregadas"
                fill="#38a169"
                name="Entregadas"
                radius={[8, 8, 0, 0]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Distribución por estado */}
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-[#1a365d] mb-4">
            Distribución por Estado
          </h3>
          <ResponsiveContainer width="100%" height={300}>
            <RechartsPieChart>
              <Pie
                data={guiasPorEstadoData}
                cx="50%"
                cy="50%"
                labelLine={false}
                label={({ name, percent }) =>
                  `${name} ${(percent * 100).toFixed(0)}%`
                }
                outerRadius={100}
                fill="#8884d8"
                dataKey="value"
              >
                {guiasPorEstadoData.map((entry, index) => (
                  <Cell key={`cell-${index}`} fill={entry.color} />
                ))}
              </Pie>
              <Tooltip />
            </RechartsPieChart>
          </ResponsiveContainer>
        </div>
      </div>

      {/* Tabla de detalles */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#9ca3af]/20">
          <h3 className="text-sm text-[#1a365d]">Detalle por Empresa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Total Guías
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Entregadas
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  En Tránsito
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Pendientes
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  % Efectividad
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#9ca3af]/20">
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Distribuidora Norte S.A.
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">450</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">365</td>
                <td className="px-6 py-4 text-sm text-[#d69e2e]">52</td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">33</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">81.1%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Comercial López
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">380</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">312</td>
                <td className="px-6 py-4 text-sm text-[#d69e2e]">45</td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">23</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">82.1%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Ferretería Central
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">340</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">280</td>
                <td className="px-6 py-4 text-sm text-[#d69e2e]">38</td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">22</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">82.4%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Farmacia San José
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">290</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">225</td>
                <td className="px-6 py-4 text-sm text-[#d69e2e]">35</td>
                <td className="px-6 py-4 text-sm text-[#6b7280]">30</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">77.6%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// REPORTE: Ingresos
function ReporteIngresos() {
  return (
    <div className="space-y-6">
      {/* Tarjetas de resumen */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#38a169]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">$125,750</p>
          <p className="text-sm text-[#9ca3af]">Ingresos del Mes</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 19.6% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#00a3e0]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">$77,250</p>
          <p className="text-sm text-[#9ca3af]">Cobrado</p>
          <p className="text-xs text-[#9ca3af] mt-2">61.4% del total</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
              <DollarSign className="w-6 h-6 text-[#d69e2e]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">$48,500</p>
          <p className="text-sm text-[#9ca3af]">Por Cobrar</p>
          <p className="text-xs text-[#9ca3af] mt-2">38.6% pendiente</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#1a365d]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">$80.05</p>
          <p className="text-sm text-[#9ca3af]">Ticket Promedio</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 5.2% vs promedio</p>
        </div>
      </div>

      {/* Gráfica de ingresos mensuales */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm text-[#1a365d] mb-4">
          Evolución de Ingresos (6 meses)
        </h3>
        <ResponsiveContainer width="100%" height={350}>
          <LineChart data={ingresosMensualesData}>
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              dataKey="mes"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis stroke="#9ca3af" style={{ fontSize: "12px" }} />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
              formatter={(value: any) => `$${value.toLocaleString()}`}
            />
            <Legend />
            <Line
              type="monotone"
              dataKey="ingresos"
              stroke="#00a3e0"
              strokeWidth={3}
              name="Ingresos"
              dot={{ fill: "#00a3e0", r: 6 }}
            />
          </LineChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla de ingresos por empresa */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#9ca3af]/20">
          <h3 className="text-sm text-[#1a365d]">Ingresos por Empresa</h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Total Facturado
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Cobrado
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Pendiente
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  % Cobrado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#9ca3af]/20">
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Distribuidora Norte S.A.
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">$22,500.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">$19,350.00</td>
                <td className="px-6 py-4 text-sm text-[#e53e3e]">$3,150.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">86.0%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Comercial López
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">$19,000.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">$14,750.00</td>
                <td className="px-6 py-4 text-sm text-[#e53e3e]">$4,250.00</td>
                <td className="px-6 py-4 text-sm text-[#d69e2e]">77.6%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Farmacia San José
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">$15,950.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">$14,150.00</td>
                <td className="px-6 py-4 text-sm text-[#e53e3e]">$1,800.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">88.7%</td>
              </tr>
              <tr className="hover:bg-[#f8fafc]/50">
                <td className="px-6 py-4 text-sm text-[#2d3748]">
                  Ferretería Central
                </td>
                <td className="px-6 py-4 text-sm text-[#2d3748]">$14,280.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">$14,280.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">$0.00</td>
                <td className="px-6 py-4 text-sm text-[#38a169]">100.0%</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// REPORTE: Empresas
function ReporteEmpresas() {
  return (
    <div className="space-y-6">
      {/* Top 5 Empresas */}
      <div className="bg-white rounded-xl p-6 shadow-sm">
        <h3 className="text-sm text-[#1a365d] mb-4">Top 5 Empresas del Mes</h3>
        <ResponsiveContainer width="100%" height={350}>
          <BarChart data={topEmpresasData} layout="vertical">
            <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
            <XAxis
              type="number"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
            />
            <YAxis
              dataKey="empresa"
              type="category"
              stroke="#9ca3af"
              style={{ fontSize: "12px" }}
              width={150}
            />
            <Tooltip
              contentStyle={{
                backgroundColor: "#ffffff",
                border: "1px solid #e5e7eb",
                borderRadius: "8px",
              }}
            />
            <Legend />
            <Bar
              dataKey="guias"
              fill="#00a3e0"
              name="Guías"
              radius={[0, 8, 8, 0]}
            />
          </BarChart>
        </ResponsiveContainer>
      </div>

      {/* Tabla detallada */}
      <div className="bg-white rounded-xl shadow-sm overflow-hidden">
        <div className="p-6 border-b border-[#9ca3af]/20">
          <h3 className="text-sm text-[#1a365d]">
            Rendimiento Detallado por Empresa
          </h3>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full">
            <thead>
              <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Empresa
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Guías Generadas
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Ingresos
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Ticket Promedio
                </th>
                <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                  Estado
                </th>
              </tr>
            </thead>
            <tbody className="divide-y divide-[#9ca3af]/20">
              {topEmpresasData.map((empresa, index) => (
                <tr key={index} className="hover:bg-[#f8fafc]/50">
                  <td className="px-6 py-4 text-sm text-[#2d3748]">
                    {empresa.empresa}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2d3748]">
                    {empresa.guias}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#38a169]">
                    ${empresa.ingresos.toLocaleString()}
                  </td>
                  <td className="px-6 py-4 text-sm text-[#2d3748]">
                    ${(empresa.ingresos / empresa.guias).toFixed(2)}
                  </td>
                  <td className="px-6 py-4">
                    <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-[#38a169]/10 text-[#38a169]">
                      Activa
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}

// REPORTE: Rendimiento
function ReporteRendimiento() {
  return (
    <div className="space-y-6">
      {/* KPIs principales */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
              <TrendingUp className="w-6 h-6 text-[#38a169]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">79.3%</p>
          <p className="text-sm text-[#9ca3af]">Tasa de Entrega</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 2.1% vs mes anterior</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
              <Clock className="w-6 h-6 text-[#00a3e0]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">1.8</p>
          <p className="text-sm text-[#9ca3af]">Días Promedio</p>
          <p className="text-xs text-[#38a169] mt-2">↓ 0.3 días</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
              <Building2 className="w-6 h-6 text-[#1a365d]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">45</p>
          <p className="text-sm text-[#9ca3af]">Empresas Activas</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 3 nuevas</p>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <div className="flex items-center justify-between mb-3">
            <div className="w-12 h-12 bg-[#d69e2e]/10 rounded-xl flex items-center justify-center">
              <BarChart3 className="w-6 h-6 text-[#d69e2e]" />
            </div>
          </div>
          <p className="text-3xl text-[#1a365d] mb-1">96.5%</p>
          <p className="text-sm text-[#9ca3af]">Satisfacción</p>
          <p className="text-xs text-[#38a169] mt-2">↑ 1.2%</p>
        </div>
      </div>

      {/* Métricas detalladas */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-[#1a365d] mb-4">Métricas Operativas</h3>
          <div className="space-y-4">
            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#2d3748]">
                  Efectividad de entregas
                </span>
                <span className="text-sm text-[#1a365d]">79.3%</span>
              </div>
              <div className="w-full bg-[#f8fafc] rounded-full h-2">
                <div
                  className="bg-[#38a169] h-2 rounded-full"
                  style={{ width: "79.3%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#2d3748]">
                  Recolección puntual
                </span>
                <span className="text-sm text-[#1a365d]">92.1%</span>
              </div>
              <div className="w-full bg-[#f8fafc] rounded-full h-2">
                <div
                  className="bg-[#00a3e0] h-2 rounded-full"
                  style={{ width: "92.1%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#2d3748]">
                  Cumplimiento de tiempos
                </span>
                <span className="text-sm text-[#1a365d]">85.7%</span>
              </div>
              <div className="w-full bg-[#f8fafc] rounded-full h-2">
                <div
                  className="bg-[#d69e2e] h-2 rounded-full"
                  style={{ width: "85.7%" }}
                ></div>
              </div>
            </div>

            <div>
              <div className="flex justify-between mb-1">
                <span className="text-sm text-[#2d3748]">Tasa de cobro</span>
                <span className="text-sm text-[#1a365d]">61.4%</span>
              </div>
              <div className="w-full bg-[#f8fafc] rounded-full h-2">
                <div
                  className="bg-[#1a365d] h-2 rounded-full"
                  style={{ width: "61.4%" }}
                ></div>
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white rounded-xl p-6 shadow-sm">
          <h3 className="text-sm text-[#1a365d] mb-4">Resumen del Periodo</h3>
          <div className="space-y-3">
            <div className="flex justify-between py-2 border-b border-[#9ca3af]/20">
              <span className="text-sm text-[#9ca3af]">
                Total de guías procesadas
              </span>
              <span className="text-sm text-[#1a365d]">1,570</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#9ca3af]/20">
              <span className="text-sm text-[#9ca3af]">Promedio diario</span>
              <span className="text-sm text-[#1a365d]">52.3 guías</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#9ca3af]/20">
              <span className="text-sm text-[#9ca3af]">
                Tiempo promedio de entrega
              </span>
              <span className="text-sm text-[#1a365d]">1.8 días</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#9ca3af]/20">
              <span className="text-sm text-[#9ca3af]">
                Ingreso total generado
              </span>
              <span className="text-sm text-[#38a169]">$125,750.00</span>
            </div>
            <div className="flex justify-between py-2 border-b border-[#9ca3af]/20">
              <span className="text-sm text-[#9ca3af]">Empresas nuevas</span>
              <span className="text-sm text-[#1a365d]">3</span>
            </div>
            <div className="flex justify-between py-2">
              <span className="text-sm text-[#9ca3af]">
                Crecimiento vs mes anterior
              </span>
              <span className="text-sm text-[#38a169]">+12.0%</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
