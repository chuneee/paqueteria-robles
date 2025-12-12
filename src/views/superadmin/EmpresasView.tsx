import { useState } from "react";
import {
  Search,
  Filter,
  Plus,
  Building2,
  CheckCircle,
  FileText,
  SortAsc,
} from "lucide-react";
import {
  Sidebar,
  Header,
  ConfirmModal,
} from "../../components/superadmin/shared";
import {
  EmpresaTable,
  EmpresaModal,
  Empresa,
} from "../../components/superadmin/empresas";
import { Toast, ToastType } from "../../components/shared/Toast";
import { EmptyState } from "../../components/shared/EmptyState";
import { EmpresaDetailView } from "./EmpresaDetailView";

interface EmpresasViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

// Datos de ejemplo
const initialEmpresas: Empresa[] = [
  {
    id: 1,
    razonSocial: "Distribuidora Norte S.A. de C.V.",
    contacto: "juan@distnorte.com",
    telefono: "662 111 2233",
    guiasDisponibles: 156,
    costoPorGuia: 45.0,
    estado: "activo",
  },
  {
    id: 2,
    razonSocial: "Comercial López",
    contacto: "ventas@clopez.com",
    telefono: "662 222 3344",
    guiasDisponibles: 89,
    costoPorGuia: 50.0,
    estado: "activo",
  },
  {
    id: 3,
    razonSocial: "Farmacia San José",
    contacto: "contacto@farmaciasj.com",
    telefono: "662 333 4455",
    guiasDisponibles: 8,
    costoPorGuia: 55.0,
    estado: "activo",
  },
  {
    id: 4,
    razonSocial: "Ferretería Central",
    contacto: "admin@ferrcentral.com",
    telefono: "662 444 5566",
    guiasDisponibles: 234,
    costoPorGuia: 42.0,
    estado: "activo",
  },
  {
    id: 5,
    razonSocial: "Papelería Robles",
    contacto: "info@paprobles.com",
    telefono: "662 555 6677",
    guiasDisponibles: 45,
    costoPorGuia: 48.0,
    estado: "activo",
  },
  {
    id: 6,
    razonSocial: "Abarrotes del Valle",
    contacto: "contacto@abvalle.com",
    telefono: "662 666 7788",
    guiasDisponibles: 0,
    costoPorGuia: 52.0,
    estado: "activo",
  },
  {
    id: 7,
    razonSocial: "Mueblería Sonora",
    contacto: "ventas@muebsonora.com",
    telefono: "662 777 8899",
    guiasDisponibles: 67,
    costoPorGuia: 46.0,
    estado: "inactivo",
  },
  {
    id: 8,
    razonSocial: "Refaccionaria Express",
    contacto: "refexpress@gmail.com",
    telefono: "662 888 9900",
    guiasDisponibles: 123,
    costoPorGuia: 44.0,
    estado: "activo",
  },
];

export function EmpresasView({ onLogout, onNavigate }: EmpresasViewProps) {
  const [empresas, setEmpresas] = useState<Empresa[]>(initialEmpresas);
  const [filteredEmpresas, setFilteredEmpresas] =
    useState<Empresa[]>(initialEmpresas);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "todos" | "activo" | "inactivo"
  >("todos");
  const [sortBy, setSortBy] = useState<"nombre" | "fecha" | "guias">("nombre");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [viewingEmpresa, setViewingEmpresa] = useState<Empresa | null>(null);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedEmpresa, setSelectedEmpresa] = useState<Empresa | null>(null);
  const [empresaToToggle, setEmpresaToToggle] = useState<Empresa | null>(null);

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Filtrar empresas
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterEmpresas(value, statusFilter, sortBy);
  };

  const handleStatusFilter = (status: "todos" | "activo" | "inactivo") => {
    setStatusFilter(status);
    filterEmpresas(searchTerm, status, sortBy);
  };

  const handleSortChange = (sort: "nombre" | "fecha" | "guias") => {
    setSortBy(sort);
    filterEmpresas(searchTerm, statusFilter, sort);
  };

  const filterEmpresas = (
    search: string,
    status: "todos" | "activo" | "inactivo",
    sort: "nombre" | "fecha" | "guias"
  ) => {
    let filtered = empresas;

    if (search) {
      filtered = filtered.filter(
        (empresa) =>
          empresa.razonSocial.toLowerCase().includes(search.toLowerCase()) ||
          empresa.contacto.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "todos") {
      filtered = filtered.filter((empresa) => empresa.estado === status);
    }

    // Ordenar
    filtered = [...filtered].sort((a, b) => {
      if (sort === "nombre") {
        return a.razonSocial.localeCompare(b.razonSocial);
      } else if (sort === "guias") {
        return b.guiasDisponibles - a.guiasDisponibles;
      }
      return 0;
    });

    setFilteredEmpresas(filtered);
  };

  // Handlers
  const handleCreateNew = () => {
    setSelectedEmpresa(null);
    setIsModalOpen(true);
  };

  const handleView = (empresa: Empresa) => {
    setViewingEmpresa(empresa);
  };

  const handleEdit = (empresa: Empresa) => {
    setSelectedEmpresa(empresa);
    setIsModalOpen(true);
  };

  const handleSave = (empresaData: any) => {
    if (selectedEmpresa) {
      // Editar
      const updatedEmpresas = empresas.map((empresa) =>
        empresa.id === selectedEmpresa.id
          ? { ...empresa, ...empresaData }
          : empresa
      );
      setEmpresas(updatedEmpresas);
      filterEmpresas(searchTerm, statusFilter, sortBy);
      showToast("Empresa actualizada correctamente", "success");
    } else {
      // Crear
      const newEmpresa: Empresa = {
        id: empresas.length + 1,
        razonSocial: empresaData.razonSocial!,
        contacto: empresaData.contacto!,
        telefono: empresaData.telefono!,
        guiasDisponibles: empresaData.guiasDisponibles || 0,
        costoPorGuia: empresaData.costoPorGuia || 0,
        estado: "activo",
      };
      const updatedEmpresas = [...empresas, newEmpresa];
      setEmpresas(updatedEmpresas);
      filterEmpresas(searchTerm, statusFilter, sortBy);
      showToast("Empresa creada correctamente", "success");
    }
  };

  const handleToggleStatus = (empresa: Empresa) => {
    setEmpresaToToggle(empresa);
    setIsConfirmOpen(true);
  };

  const confirmToggleStatus = () => {
    if (empresaToToggle) {
      const newStatus =
        empresaToToggle.estado === "activo" ? "inactivo" : "activo";
      const updatedEmpresas = empresas.map((empresa) =>
        empresa.id === empresaToToggle.id
          ? { ...empresa, estado: newStatus }
          : empresa
      );
      setEmpresas(updatedEmpresas);
      filterEmpresas(searchTerm, statusFilter, sortBy);

      const message =
        newStatus === "inactivo" ? "Empresa desactivada" : "Empresa activada";
      showToast(message, "success");
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const activeCount = empresas.filter((e) => e.estado === "activo").length;
  const totalGuias = empresas.reduce((sum, e) => sum + e.guiasDisponibles, 0);

  // Si estamos viendo el detalle de una empresa, mostrar esa vista
  if (viewingEmpresa) {
    return (
      <EmpresaDetailView
        empresa={viewingEmpresa}
        onLogout={onLogout}
        onNavigate={onNavigate}
        onBack={() => setViewingEmpresa(null)}
      />
    );
  }

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
        <Header title="Gestión de Empresas" />

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
              <span className="text-[#2d3748]">Empresas</span>
            </p>
          </div>

          {/* Tarjetas de Resumen */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 mb-6">
            {/* Total Empresas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#1a365d]/10 rounded-xl flex items-center justify-center">
                  <Building2 className="w-6 h-6 text-[#1a365d]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{empresas.length}</p>
              <p className="text-sm text-[#9ca3af]">Total Empresas</p>
            </div>

            {/* Empresas Activas */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#38a169]/10 rounded-xl flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-[#38a169]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">{activeCount}</p>
              <p className="text-sm text-[#9ca3af]">Empresas Activas</p>
            </div>

            {/* Guías Disponibles Total */}
            <div className="bg-white rounded-xl p-6 shadow-sm">
              <div className="flex items-center justify-between mb-3">
                <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-xl flex items-center justify-center">
                  <FileText className="w-6 h-6 text-[#00a3e0]" />
                </div>
              </div>
              <p className="text-3xl text-[#1a365d] mb-1">
                {totalGuias.toLocaleString()}
              </p>
              <p className="text-sm text-[#9ca3af]">
                Guías Disponibles (Total)
              </p>
            </div>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left */}
              <div>
                <h2 className="text-lg text-[#1a365d] mb-1">
                  Listado de Empresas
                </h2>
                <p className="text-sm text-[#9ca3af]">
                  {empresas.length} empresas registradas
                </p>
              </div>

              {/* Right */}
              <div className="flex flex-col sm:flex-row gap-3">
                {/* Search */}
                <div className="relative">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    value={searchTerm}
                    onChange={(e) => handleSearch(e.target.value)}
                    placeholder="Buscar empresa..."
                    className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 w-full sm:w-64"
                  />
                </div>

                {/* Filter Estado */}
                <div className="relative">
                  <Filter className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] pointer-events-none" />
                  <select
                    value={statusFilter}
                    onChange={(e) => handleStatusFilter(e.target.value as any)}
                    className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer w-full sm:w-auto"
                  >
                    <option value="todos">Todos</option>
                    <option value="activo">Activos</option>
                    <option value="inactivo">Inactivos</option>
                  </select>
                </div>

                {/* Filter Ordenar */}
                <div className="relative">
                  <SortAsc className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af] pointer-events-none" />
                  <select
                    value={sortBy}
                    onChange={(e) => handleSortChange(e.target.value as any)}
                    className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] appearance-none bg-white cursor-pointer w-full sm:w-auto"
                  >
                    <option value="nombre">Nombre</option>
                    <option value="fecha">Fecha registro</option>
                    <option value="guias">Guías disponibles</option>
                  </select>
                </div>

                {/* New Button */}
                <button
                  onClick={handleCreateNew}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Nueva Empresa
                </button>
              </div>
            </div>
          </div>

          {/* Table or Empty State */}
          {filteredEmpresas.length > 0 ? (
            <>
              <EmpresaTable
                empresas={filteredEmpresas}
                onView={handleView}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />

              {/* Pagination */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm p-4">
                <p className="text-sm text-[#9ca3af]">
                  Mostrando 1-{filteredEmpresas.length} de{" "}
                  {filteredEmpresas.length} empresas
                </p>
                <div className="flex items-center gap-4">
                  <div className="flex items-center gap-2">
                    <span className="text-sm text-[#9ca3af]">Mostrar:</span>
                    <select className="px-2 py-1 border border-[#9ca3af]/30 rounded-lg text-sm">
                      <option>10</option>
                      <option>25</option>
                      <option>50</option>
                    </select>
                  </div>
                  <div className="flex items-center gap-2">
                    <button className="px-3 py-1.5 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] disabled:opacity-50">
                      &lt;
                    </button>
                    <button className="px-3 py-1.5 bg-[#1a365d] text-white rounded-lg">
                      1
                    </button>
                    <button className="px-3 py-1.5 border border-[#9ca3af]/30 rounded-lg hover:bg-[#f8fafc] disabled:opacity-50">
                      &gt;
                    </button>
                  </div>
                </div>
              </div>
            </>
          ) : (
            <EmptyState
              icon={Building2}
              title={
                searchTerm
                  ? "No se encontraron resultados"
                  : "No hay empresas registradas"
              }
              description={
                searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Registra la primera empresa para comenzar"
              }
              action={
                !searchTerm
                  ? {
                      label: "+ Nueva Empresa",
                      onClick: handleCreateNew,
                    }
                  : undefined
              }
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <EmpresaModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        empresa={selectedEmpresa}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmToggleStatus}
        title={
          empresaToToggle?.estado === "activo"
            ? "¿Desactivar empresa?"
            : "¿Activar empresa?"
        }
        message={
          empresaToToggle?.estado === "activo"
            ? `La empresa ${empresaToToggle?.razonSocial} ya no podrá acceder al sistema. Podrás reactivarla en cualquier momento.`
            : `La empresa ${empresaToToggle?.razonSocial} podrá acceder nuevamente al sistema.`
        }
        confirmText={
          empresaToToggle?.estado === "activo"
            ? "Sí, desactivar"
            : "Sí, activar"
        }
        type={empresaToToggle?.estado === "activo" ? "danger" : "info"}
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
