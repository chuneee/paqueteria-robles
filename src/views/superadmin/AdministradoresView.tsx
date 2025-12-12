import { useState } from "react";
import { Search, Filter, Plus, Users } from "lucide-react";
import {
  Sidebar,
  Header,
  ConfirmModal,
} from "../../components/superadmin/shared";
import {
  AdminTable,
  AdminModal,
  Administrador,
} from "../../components/superadmin/administradores";
import { Toast, ToastType } from "../../components/shared/Toast";
import { EmptyState } from "../../components/shared/EmptyState";

interface AdministradoresViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

// Datos de ejemplo
const initialAdmins: Administrador[] = [
  {
    id: 1,
    nombre: "Juan Pérez García",
    correo: "juan.perez@robles.com",
    telefono: "662 123 4567",
    fechaRegistro: "15/03/2024",
    estado: "activo",
  },
  {
    id: 2,
    nombre: "María López Sánchez",
    correo: "maria.lopez@robles.com",
    telefono: "662 234 5678",
    fechaRegistro: "20/05/2024",
    estado: "activo",
  },
  {
    id: 3,
    nombre: "Carlos Ruiz Méndez",
    correo: "carlos.ruiz@robles.com",
    telefono: "662 345 6789",
    fechaRegistro: "01/08/2024",
    estado: "inactivo",
  },
  {
    id: 4,
    nombre: "Ana Torres Vega",
    correo: "ana.torres@robles.com",
    telefono: "662 456 7890",
    fechaRegistro: "10/09/2024",
    estado: "activo",
  },
  {
    id: 5,
    nombre: "Roberto Díaz Luna",
    correo: "roberto.diaz@robles.com",
    telefono: "662 567 8901",
    fechaRegistro: "22/10/2024",
    estado: "activo",
  },
  {
    id: 6,
    nombre: "Laura Mendoza Ríos",
    correo: "laura.mendoza@robles.com",
    telefono: "662 678 9012",
    fechaRegistro: "05/11/2024",
    estado: "activo",
  },
];

export function AdministradoresView({
  onLogout,
  onNavigate,
}: AdministradoresViewProps) {
  const [admins, setAdmins] = useState<Administrador[]>(initialAdmins);
  const [filteredAdmins, setFilteredAdmins] =
    useState<Administrador[]>(initialAdmins);
  const [searchTerm, setSearchTerm] = useState("");
  const [statusFilter, setStatusFilter] = useState<
    "todos" | "activo" | "inactivo"
  >("todos");

  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isConfirmOpen, setIsConfirmOpen] = useState(false);
  const [selectedAdmin, setSelectedAdmin] = useState<Administrador | null>(
    null
  );
  const [adminToToggle, setAdminToToggle] = useState<Administrador | null>(
    null
  );

  const [toast, setToast] = useState<{
    message: string;
    type: ToastType;
    isVisible: boolean;
  }>({
    message: "",
    type: "success",
    isVisible: false,
  });

  // Filtrar administradores
  const handleSearch = (value: string) => {
    setSearchTerm(value);
    filterAdmins(value, statusFilter);
  };

  const handleStatusFilter = (status: "todos" | "activo" | "inactivo") => {
    setStatusFilter(status);
    filterAdmins(searchTerm, status);
  };

  const filterAdmins = (
    search: string,
    status: "todos" | "activo" | "inactivo"
  ) => {
    let filtered = admins;

    if (search) {
      filtered = filtered.filter(
        (admin) =>
          admin.nombre.toLowerCase().includes(search.toLowerCase()) ||
          admin.correo.toLowerCase().includes(search.toLowerCase())
      );
    }

    if (status !== "todos") {
      filtered = filtered.filter((admin) => admin.estado === status);
    }

    setFilteredAdmins(filtered);
  };

  // Handlers
  const handleCreateNew = () => {
    setSelectedAdmin(null);
    setIsModalOpen(true);
  };

  const handleEdit = (admin: Administrador) => {
    setSelectedAdmin(admin);
    setIsModalOpen(true);
  };

  const handleSave = (adminData: Partial<Administrador>) => {
    if (selectedAdmin) {
      // Editar
      const updatedAdmins = admins.map((admin) =>
        admin.id === selectedAdmin.id ? { ...admin, ...adminData } : admin
      );
      setAdmins(updatedAdmins);
      setFilteredAdmins(updatedAdmins);
      showToast("Administrador actualizado correctamente", "success");
    } else {
      // Crear
      const newAdmin: Administrador = {
        id: admins.length + 1,
        nombre: adminData.nombre!,
        correo: adminData.correo!,
        telefono: adminData.telefono!,
        fechaRegistro: new Date().toLocaleDateString("es-MX"),
        estado: "activo",
      };
      const updatedAdmins = [...admins, newAdmin];
      setAdmins(updatedAdmins);
      setFilteredAdmins(updatedAdmins);
      showToast("Administrador creado correctamente", "success");
    }
  };

  const handleToggleStatus = (admin: Administrador) => {
    setAdminToToggle(admin);
    setIsConfirmOpen(true);
  };

  const confirmToggleStatus = () => {
    if (adminToToggle) {
      const newStatus =
        adminToToggle.estado === "activo" ? "inactivo" : "activo";
      const updatedAdmins = admins.map((admin) =>
        admin.id === adminToToggle.id ? { ...admin, estado: newStatus } : admin
      );
      setAdmins(updatedAdmins);
      filterAdmins(searchTerm, statusFilter);

      const message =
        newStatus === "inactivo"
          ? "Administrador desactivado"
          : "Administrador activado";
      showToast(message, "success");
    }
  };

  const showToast = (message: string, type: ToastType) => {
    setToast({ message, type, isVisible: true });
  };

  const activeCount = admins.filter((a) => a.estado === "activo").length;

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="administradores"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Gestión de Administradores" />

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
              <span className="text-[#2d3748]">Administradores</span>
            </p>
          </div>

          {/* Action Bar */}
          <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
            <div className="flex flex-col lg:flex-row lg:items-center lg:justify-between gap-4">
              {/* Left */}
              <div>
                <h2 className="text-lg text-[#1a365d] mb-1">
                  Listado de Administradores
                </h2>
                <p className="text-sm text-[#9ca3af]">
                  {admins.length} administradores registrados • {activeCount}{" "}
                  activos
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
                    placeholder="Buscar administrador..."
                    className="pl-10 pr-4 py-2 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 w-full sm:w-64"
                  />
                </div>

                {/* Filter */}
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

                {/* New Button */}
                <button
                  onClick={handleCreateNew}
                  className="flex items-center justify-center gap-2 px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors whitespace-nowrap"
                >
                  <Plus className="w-5 h-5" />
                  Nuevo Administrador
                </button>
              </div>
            </div>
          </div>

          {/* Table or Empty State */}
          {filteredAdmins.length > 0 ? (
            <>
              <AdminTable
                administradores={filteredAdmins}
                onEdit={handleEdit}
                onToggleStatus={handleToggleStatus}
              />

              {/* Pagination */}
              <div className="mt-6 flex flex-col sm:flex-row items-center justify-between gap-4 bg-white rounded-xl shadow-sm p-4">
                <p className="text-sm text-[#9ca3af]">
                  Mostrando 1-{filteredAdmins.length} de {filteredAdmins.length}{" "}
                  administradores
                </p>
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
            </>
          ) : (
            <EmptyState
              icon={Users}
              title={
                searchTerm
                  ? "No se encontraron resultados"
                  : "No hay administradores registrados"
              }
              description={
                searchTerm
                  ? "Intenta con otros términos de búsqueda"
                  : "Crea el primer administrador para comenzar"
              }
              action={
                !searchTerm
                  ? {
                      label: "+ Nuevo Administrador",
                      onClick: handleCreateNew,
                    }
                  : undefined
              }
            />
          )}
        </main>
      </div>

      {/* Modals */}
      <AdminModal
        isOpen={isModalOpen}
        onClose={() => setIsModalOpen(false)}
        onSave={handleSave}
        admin={selectedAdmin}
      />

      <ConfirmModal
        isOpen={isConfirmOpen}
        onClose={() => setIsConfirmOpen(false)}
        onConfirm={confirmToggleStatus}
        title={
          adminToToggle?.estado === "activo"
            ? "¿Desactivar administrador?"
            : "¿Activar administrador?"
        }
        message={
          adminToToggle?.estado === "activo"
            ? `El administrador ${adminToToggle?.nombre} ya no podrá acceder al sistema. Podrás reactivarlo en cualquier momento.`
            : `El administrador ${adminToToggle?.nombre} podrá acceder nuevamente al sistema.`
        }
        confirmText={
          adminToToggle?.estado === "activo" ? "Sí, desactivar" : "Sí, activar"
        }
        type={adminToToggle?.estado === "activo" ? "danger" : "info"}
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
