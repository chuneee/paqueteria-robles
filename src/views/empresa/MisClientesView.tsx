import { useState } from "react";
import {
  UserPlus,
  Search,
  Edit2,
  Trash2,
  FileText,
  Users,
  MapPin,
  Phone,
} from "lucide-react";
import { Sidebar, Header } from "../../components/empresa/shared";
import {
  NuevoClienteModal,
  ConfirmarEliminarClienteModal,
} from "../../components/empresa/mis-clientes";

interface MisClientesViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

interface Cliente {
  id: number;
  razonSocial: string;
  contacto: string;
  departamento: string;
  calle: string;
  numero: string;
  colonia: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  pais: string;
  telefono: string;
  notas?: string;
}

const clientesData: Cliente[] = [
  {
    id: 1,
    razonSocial: "Comercial López",
    contacto: "Ana Ramírez",
    departamento: "Ventas",
    calle: "Calle 23",
    numero: "102",
    colonia: "Centro",
    codigoPostal: "83000",
    ciudad: "Hermosillo",
    estado: "Sonora",
    pais: "México",
    telefono: "662-345-8790",
    notas: "Cliente frecuente",
  },
  {
    id: 2,
    razonSocial: "Farmacia San José",
    contacto: "Carlos Herrera",
    departamento: "Compras",
    calle: "Constitución",
    numero: "210",
    colonia: "Modelo",
    codigoPostal: "83190",
    ciudad: "Hermosillo",
    estado: "Sonora",
    pais: "México",
    telefono: "662-128-5544",
    notas: "Urgencias cada mes",
  },
  {
    id: 3,
    razonSocial: "Papelería Robles",
    contacto: "Marta Gutiérrez",
    departamento: "Almacén",
    calle: "Juárez",
    numero: "540",
    colonia: "Centro",
    codigoPostal: "83000",
    ciudad: "Hermosillo",
    estado: "Sonora",
    pais: "México",
    telefono: "662-555-2300",
  },
  {
    id: 4,
    razonSocial: "Abarrotes del Valle",
    contacto: "Roberto Sánchez",
    departamento: "Recepción",
    calle: "Av. Universidad",
    numero: "850",
    colonia: "San Benito",
    codigoPostal: "83190",
    ciudad: "Hermosillo",
    estado: "Sonora",
    pais: "México",
    telefono: "662-789-4561",
    notas: "Requieren firma de recibido",
  },
];

export function MisClientesView({
  onLogout,
  onNavigate,
}: MisClientesViewProps) {
  const [clientes, setClientes] = useState<Cliente[]>(clientesData);
  const [searchTerm, setSearchTerm] = useState("");
  const [isNuevoModalOpen, setIsNuevoModalOpen] = useState(false);
  const [isConfirmDeleteOpen, setIsConfirmDeleteOpen] = useState(false);
  const [clienteToEdit, setClienteToEdit] = useState<Cliente | null>(null);
  const [clienteToDelete, setClienteToDelete] = useState<Cliente | null>(null);
  const [hasData] = useState(true); // Cambiar a false para ver estado vacío

  // Filtrar clientes por búsqueda
  const filteredClientes = clientes.filter(
    (cliente) =>
      cliente.razonSocial.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.contacto.toLowerCase().includes(searchTerm.toLowerCase()) ||
      cliente.telefono.includes(searchTerm) ||
      cliente.ciudad.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleNuevoCliente = () => {
    setClienteToEdit(null);
    setIsNuevoModalOpen(true);
  };

  const handleEditCliente = (cliente: Cliente) => {
    setClienteToEdit(cliente);
    setIsNuevoModalOpen(true);
  };

  const handleDeleteCliente = (cliente: Cliente) => {
    setClienteToDelete(cliente);
    setIsConfirmDeleteOpen(true);
  };

  const handleSaveCliente = (clienteData: Omit<Cliente, "id">) => {
    if (clienteToEdit) {
      // Editar cliente existente
      setClientes(
        clientes.map((c) =>
          c.id === clienteToEdit.id
            ? { ...clienteData, id: clienteToEdit.id }
            : c
        )
      );
    } else {
      // Nuevo cliente
      const newCliente: Cliente = {
        ...clienteData,
        id: Math.max(...clientes.map((c) => c.id), 0) + 1,
      };
      setClientes([newCliente, ...clientes]);
    }
  };

  const handleConfirmDelete = () => {
    if (clienteToDelete) {
      setClientes(clientes.filter((c) => c.id !== clienteToDelete.id));
      setClienteToDelete(null);
    }
  };

  const handleUsarEnGuia = (cliente: Cliente) => {
    // Esta función se conectará con la vista "Generar Guía"
    console.log("Usar cliente en guía:", cliente);
    // onNavigate('generar-guia'); // Con el cliente pre-seleccionado
  };

  const getDireccionCompleta = (cliente: Cliente) => {
    const partes = [
      cliente.calle,
      cliente.numero,
      cliente.colonia,
      cliente.codigoPostal,
      cliente.ciudad,
      cliente.estado,
      cliente.pais,
    ].filter(Boolean);

    return partes.join(", ");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="mis-clientes"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Mis Clientes" />

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
              <span className="text-[#2d3748]">Mis Clientes</span>
            </p>
          </div>

          {hasData && clientes.length > 0 ? (
            <>
              {/* Barra Superior - Búsqueda y Nuevo Cliente */}
              <div className="bg-white rounded-xl shadow-sm p-4 mb-6 flex flex-col lg:flex-row gap-4 items-center">
                <div className="relative flex-1 w-full">
                  <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="text"
                    placeholder="Buscar cliente..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="w-full pl-10 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <button
                  onClick={handleNuevoCliente}
                  className="px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center gap-2 whitespace-nowrap shadow-sm"
                >
                  <UserPlus className="w-5 h-5" />
                  Nuevo Cliente
                </button>
              </div>

              {/* Tabla de Clientes */}
              <div className="bg-white rounded-xl shadow-sm overflow-hidden">
                <div className="px-6 py-4 border-b border-[#9ca3af]/20">
                  <div className="flex items-center justify-between">
                    <h2 className="text-lg text-[#1a365d]">
                      Clientes Destinatarios
                    </h2>
                    <span className="text-sm text-[#9ca3af]">
                      {filteredClientes.length}{" "}
                      {filteredClientes.length === 1 ? "cliente" : "clientes"}
                    </span>
                  </div>
                </div>

                <div className="overflow-x-auto">
                  <table className="w-full">
                    <thead>
                      <tr className="bg-[#f8fafc] border-b border-[#9ca3af]/20">
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Razón Social / Nombre
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Contacto / Departamento
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Dirección Completa
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Teléfono
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Notas
                        </th>
                        <th className="px-6 py-3 text-left text-xs text-[#9ca3af] uppercase">
                          Acciones
                        </th>
                      </tr>
                    </thead>
                    <tbody className="divide-y divide-[#9ca3af]/20">
                      {filteredClientes.length > 0 ? (
                        filteredClientes.map((cliente) => (
                          <tr
                            key={cliente.id}
                            className="hover:bg-[#f8fafc]/50 transition-colors"
                          >
                            <td className="px-6 py-4">
                              <p className="text-sm text-[#1a365d]">
                                {cliente.razonSocial}
                              </p>
                            </td>
                            <td className="px-6 py-4">
                              <p className="text-sm text-[#2d3748]">
                                {cliente.contacto}
                              </p>
                              {cliente.departamento && (
                                <p className="text-xs text-[#9ca3af]">
                                  {cliente.departamento}
                                </p>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-start gap-2 max-w-md">
                                <MapPin className="w-4 h-4 text-[#9ca3af] flex-shrink-0 mt-0.5" />
                                <p className="text-sm text-[#2d3748] line-clamp-2">
                                  {getDireccionCompleta(cliente)}
                                </p>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <Phone className="w-4 h-4 text-[#9ca3af]" />
                                <span className="text-sm text-[#2d3748]">
                                  {cliente.telefono}
                                </span>
                              </div>
                            </td>
                            <td className="px-6 py-4">
                              {cliente.notas ? (
                                <div className="flex items-start gap-2 max-w-xs">
                                  <FileText className="w-4 h-4 text-[#9ca3af] flex-shrink-0 mt-0.5" />
                                  <span className="text-sm text-[#9ca3af] line-clamp-2">
                                    {cliente.notas}
                                  </span>
                                </div>
                              ) : (
                                <span className="text-sm text-[#9ca3af]">
                                  —
                                </span>
                              )}
                            </td>
                            <td className="px-6 py-4">
                              <div className="flex items-center gap-2">
                                <button
                                  onClick={() => handleUsarEnGuia(cliente)}
                                  className="px-3 py-1.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors text-xs whitespace-nowrap"
                                  title="Usar en guía"
                                >
                                  Usar en guía
                                </button>
                                <button
                                  onClick={() => handleEditCliente(cliente)}
                                  className="p-2 hover:bg-[#00a3e0]/10 rounded-lg transition-colors"
                                  title="Editar"
                                >
                                  <Edit2 className="w-4 h-4 text-[#00a3e0]" />
                                </button>
                                <button
                                  onClick={() => handleDeleteCliente(cliente)}
                                  className="p-2 hover:bg-[#e53e3e]/10 rounded-lg transition-colors"
                                  title="Eliminar"
                                >
                                  <Trash2 className="w-4 h-4 text-[#e53e3e]" />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))
                      ) : (
                        <tr>
                          <td colSpan={6} className="px-6 py-12 text-center">
                            <p className="text-sm text-[#9ca3af]">
                              No se encontraron clientes
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
            // Estado Vacío - Sin Clientes
            <div className="max-w-2xl mx-auto">
              <div className="bg-white rounded-xl shadow-sm p-12 text-center">
                <div className="w-20 h-20 bg-[#00a3e0]/10 rounded-full flex items-center justify-center mx-auto mb-6">
                  <Users className="w-10 h-10 text-[#00a3e0]" />
                </div>
                <h2 className="text-2xl text-[#1a365d] mb-3">
                  Aún no tienes clientes registrados
                </h2>
                <p className="text-sm text-[#9ca3af] mb-8 max-w-md mx-auto">
                  Agrega tus clientes frecuentes para usar su información
                  rápidamente al generar guías de envío.
                </p>

                <button
                  onClick={handleNuevoCliente}
                  className="inline-flex items-center gap-2 px-6 py-3 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors shadow-sm"
                >
                  <UserPlus className="w-5 h-5" />
                  Agregar Primer Cliente
                </button>

                <div className="mt-8 bg-[#f8fafc] rounded-lg p-6">
                  <h4 className="text-sm text-[#1a365d] mb-3">
                    ¿Por qué agregar clientes?
                  </h4>
                  <ul className="text-xs text-[#9ca3af] space-y-2 text-left max-w-md mx-auto">
                    <li className="flex items-start gap-2">
                      <span className="text-[#00a3e0]">•</span>
                      <span>
                        Genera guías más rápido sin tener que escribir la
                        dirección completa cada vez
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00a3e0]">•</span>
                      <span>
                        Evita errores en direcciones y datos de contacto
                      </span>
                    </li>
                    <li className="flex items-start gap-2">
                      <span className="text-[#00a3e0]">•</span>
                      <span>
                        Mantén organizada tu lista de destinatarios frecuentes
                      </span>
                    </li>
                  </ul>
                </div>
              </div>
            </div>
          )}
        </main>
      </div>

      {/* Modals */}
      <NuevoClienteModal
        isOpen={isNuevoModalOpen}
        onClose={() => setIsNuevoModalOpen(false)}
        onSave={handleSaveCliente}
        clienteToEdit={clienteToEdit}
      />

      <ConfirmarEliminarClienteModal
        isOpen={isConfirmDeleteOpen}
        onClose={() => setIsConfirmDeleteOpen(false)}
        onConfirm={handleConfirmDelete}
        cliente={clienteToDelete}
      />
    </div>
  );
}
