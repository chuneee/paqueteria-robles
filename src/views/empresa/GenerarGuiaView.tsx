import { useState, useEffect } from "react";
import {
  Building2,
  MapPin,
  Package,
  Scale,
  Truck,
  UserCheck,
  AlertCircle,
  FileText,
} from "lucide-react";
import { Sidebar, Header } from "../../components/empresa/shared";
import {
  SeleccionarClienteDropdown,
  GuiaGeneradaModal,
} from "../../components/empresa/generar-guia";

interface GenerarGuiaViewProps {
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

// Datos de ejemplo de la empresa (remitente)
const empresaData = {
  razonSocial: "Mi Empresa S.A. de C.V.",
  contacto: "Juan Martínez",
  departamento: "Logística",
  calle: "Blvd. Luis Encinas",
  numero: "250",
  colonia: "Centro",
  codigoPostal: "83000",
  ciudad: "Hermosillo",
  estado: "Sonora",
  pais: "México",
  telefono: "662-123-4567",
};

// Clientes de ejemplo
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
  },
];

export function GenerarGuiaView({
  onLogout,
  onNavigate,
}: GenerarGuiaViewProps) {
  const [selectedCliente, setSelectedCliente] = useState<Cliente | null>(null);
  const [isGuiaGeneradaOpen, setIsGuiaGeneradaOpen] = useState(false);
  const [numeroGuiaGenerada, setNumeroGuiaGenerada] = useState("");
  const [errors, setErrors] = useState<Record<string, string>>({});

  // Datos del remitente (solo lectura)
  const [remitente] = useState({
    nombreRemitente: "Juan Martínez García",
    firma: "",
    fecha: new Date().toLocaleDateString("es-MX"),
  });

  // Datos del consignatario
  const [consignatario, setConsignatario] = useState({
    razonSocial: "",
    contacto: "",
    departamento: "",
    calle: "",
    numero: "",
    colonia: "",
    codigoPostal: "",
    ciudad: "",
    estado: "",
    pais: "México",
    telefono: "",
  });

  // Información del envío
  const [infoEnvio, setInfoEnvio] = useState({
    noCintillo: "",
    noContrato: "",
    facturarEn: "",
    caracteristicas: "",
    valorDeclarado: "",
  });

  // Tipo de envío
  const [tipoEnvio, setTipoEnvio] = useState({
    valijas: "",
    caja: "",
    sobres: "",
    envases: "",
  });

  // Peso del envío
  const [pesoEnvio, setPesoEnvio] = useState({
    pesoReal: "",
    largo: "",
    ancho: "",
    alto: "",
  });

  // Campos de control
  const [control, setControl] = useState({
    claveMensajero: "",
    firmaMensajero: "",
    horaRecepcion: "",
    tipoEnvio: "mensajeria",
  });

  // Cálculos automáticos
  const [pesoDimensional, setPesoDimensional] = useState(0);
  const [pesoTotal, setPesoTotal] = useState(0);

  // Calcular peso dimensional y total
  useEffect(() => {
    const largo = parseFloat(pesoEnvio.largo) || 0;
    const ancho = parseFloat(pesoEnvio.ancho) || 0;
    const alto = parseFloat(pesoEnvio.alto) || 0;
    const pesoReal = parseFloat(pesoEnvio.pesoReal) || 0;

    // Peso dimensional = (Largo × Ancho × Alto) / 6000
    const dimensional =
      largo && ancho && alto ? (largo * ancho * alto) / 6000 : 0;
    setPesoDimensional(dimensional);

    // Peso total = Mayor entre peso real y dimensional
    const total = Math.max(pesoReal, dimensional);
    setPesoTotal(total);
  }, [pesoEnvio]);

  // Autocompletar consignatario cuando se selecciona un cliente
  useEffect(() => {
    if (selectedCliente) {
      setConsignatario({
        razonSocial: selectedCliente.razonSocial,
        contacto: selectedCliente.contacto,
        departamento: selectedCliente.departamento,
        calle: selectedCliente.calle,
        numero: selectedCliente.numero,
        colonia: selectedCliente.colonia,
        codigoPostal: selectedCliente.codigoPostal,
        ciudad: selectedCliente.ciudad,
        estado: selectedCliente.estado,
        pais: selectedCliente.pais,
        telefono: selectedCliente.telefono,
      });
    } else {
      setConsignatario({
        razonSocial: "",
        contacto: "",
        departamento: "",
        calle: "",
        numero: "",
        colonia: "",
        codigoPostal: "",
        ciudad: "",
        estado: "",
        pais: "México",
        telefono: "",
      });
    }
  }, [selectedCliente]);

  const handleConsignatarioChange = (field: string, value: string) => {
    setConsignatario((prev) => ({ ...prev, [field]: value }));
    if (errors[`consignatario.${field}`]) {
      setErrors((prev) => ({ ...prev, [`consignatario.${field}`]: "" }));
    }
  };

  const handleInfoEnvioChange = (field: string, value: string) => {
    setInfoEnvio((prev) => ({ ...prev, [field]: value }));
    if (errors[`infoEnvio.${field}`]) {
      setErrors((prev) => ({ ...prev, [`infoEnvio.${field}`]: "" }));
    }
  };

  const handleTipoEnvioChange = (field: string, value: string) => {
    // Solo permitir números
    if (value === "" || /^\d+$/.test(value)) {
      setTipoEnvio((prev) => ({ ...prev, [field]: value }));
    }
  };

  const handlePesoEnvioChange = (field: string, value: string) => {
    // Permitir números y decimales
    if (value === "" || /^\d*\.?\d*$/.test(value)) {
      setPesoEnvio((prev) => ({ ...prev, [field]: value }));
      if (errors[`pesoEnvio.${field}`]) {
        setErrors((prev) => ({ ...prev, [`pesoEnvio.${field}`]: "" }));
      }
    }
  };

  const handleControlChange = (field: string, value: string) => {
    setControl((prev) => ({ ...prev, [field]: value }));
  };

  const validate = () => {
    const newErrors: Record<string, string> = {};

    // Validar consignatario
    if (!consignatario.razonSocial.trim()) {
      newErrors["consignatario.razonSocial"] = "Campo requerido";
    }
    if (!consignatario.contacto.trim()) {
      newErrors["consignatario.contacto"] = "Campo requerido";
    }
    if (!consignatario.calle.trim()) {
      newErrors["consignatario.calle"] = "Campo requerido";
    }
    if (!consignatario.ciudad.trim()) {
      newErrors["consignatario.ciudad"] = "Campo requerido";
    }
    if (!consignatario.estado.trim()) {
      newErrors["consignatario.estado"] = "Campo requerido";
    }
    if (!consignatario.telefono.trim()) {
      newErrors["consignatario.telefono"] = "Campo requerido";
    }

    // Validar información del envío
    if (!infoEnvio.caracteristicas.trim()) {
      newErrors["infoEnvio.caracteristicas"] = "Campo requerido";
    }
    if (!infoEnvio.valorDeclarado.trim()) {
      newErrors["infoEnvio.valorDeclarado"] = "Campo requerido";
    }

    // Validar tipo de envío (al menos uno debe tener cantidad)
    const totalTipo =
      parseInt(tipoEnvio.valijas || "0") +
      parseInt(tipoEnvio.caja || "0") +
      parseInt(tipoEnvio.sobres || "0") +
      parseInt(tipoEnvio.envases || "0");

    if (totalTipo === 0) {
      newErrors["tipoEnvio.general"] = "Debe ingresar al menos una cantidad";
    }

    // Validar peso
    if (!pesoEnvio.pesoReal.trim()) {
      newErrors["pesoEnvio.pesoReal"] = "Campo requerido";
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleGenerarGuia = (e: React.FormEvent) => {
    e.preventDefault();

    if (!validate()) {
      // Scroll al primer error
      const firstError = Object.keys(errors)[0];
      if (firstError) {
        const element = document.getElementById(firstError);
        element?.scrollIntoView({ behavior: "smooth", block: "center" });
      }
      return;
    }

    // Generar número de guía
    const numeroGuia = `SR-${String(
      Math.floor(Math.random() * 900000) + 100000
    ).padStart(6, "0")}`;
    setNumeroGuiaGenerada(numeroGuia);
    setIsGuiaGeneradaOpen(true);

    // Aquí se guardaría la guía en el backend
    console.log("Guía generada:", {
      numeroGuia,
      remitente: { ...empresaData, ...remitente },
      consignatario,
      infoEnvio,
      tipoEnvio,
      pesoEnvio,
      pesoDimensional,
      pesoTotal,
      control,
    });
  };

  const handleDescargarPDF = () => {
    // Aquí se generaría y descargaría el PDF
    console.log("Descargando PDF de guía:", numeroGuiaGenerada);
    alert("Descargando PDF de la guía " + numeroGuiaGenerada);
  };

  const handleVerHistorial = () => {
    setIsGuiaGeneradaOpen(false);
    onNavigate("historial-guias");
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="generar-guia"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Generar Guía" />

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
              <span className="text-[#2d3748]">Generar Guía</span>
            </p>
          </div>

          <form onSubmit={handleGenerarGuia}>
            {/* SECCIÓN 1: Datos del Remitente */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <Building2 className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">
                    Datos del Remitente (Empresa)
                  </h2>
                  <p className="text-xs text-[#9ca3af]">
                    Información de tu empresa registrada
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Razón social
                  </label>
                  <input
                    type="text"
                    value={empresaData.razonSocial}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Nombre / Departamento
                  </label>
                  <input
                    type="text"
                    value={`${empresaData.contacto} – ${empresaData.departamento}`}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Teléfono
                  </label>
                  <input
                    type="text"
                    value={empresaData.telefono}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Calle
                  </label>
                  <input
                    type="text"
                    value={empresaData.calle}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    value={empresaData.numero}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Colonia
                  </label>
                  <input
                    type="text"
                    value={empresaData.colonia}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={empresaData.codigoPostal}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={empresaData.ciudad}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={empresaData.estado}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    value={empresaData.pais}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Nombre del remitente
                  </label>
                  <input
                    type="text"
                    value={remitente.nombreRemitente}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Fecha
                  </label>
                  <input
                    type="text"
                    value={remitente.fecha}
                    disabled
                    className="w-full px-4 py-2.5 bg-[#f8fafc] border border-[#9ca3af]/20 rounded-lg text-[#6b7280] cursor-not-allowed"
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: Datos del Consignatario */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">
                    Datos del Consignatario (Destino)
                  </h2>
                  <p className="text-xs text-[#9ca3af]">
                    Información del destinatario
                  </p>
                </div>
              </div>

              {/* Selector de Cliente */}
              <div className="mb-6">
                <SeleccionarClienteDropdown
                  clientes={clientesData}
                  selectedCliente={selectedCliente}
                  onSelect={setSelectedCliente}
                />
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div id="consignatario.razonSocial">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Razón social / Nombre{" "}
                    <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={consignatario.razonSocial}
                    onChange={(e) =>
                      handleConsignatarioChange("razonSocial", e.target.value)
                    }
                    placeholder="Ej. Comercial López"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.razonSocial"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.razonSocial"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.razonSocial"]}
                    </p>
                  )}
                </div>
                <div id="consignatario.contacto">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Nombre de contacto <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={consignatario.contacto}
                    onChange={(e) =>
                      handleConsignatarioChange("contacto", e.target.value)
                    }
                    placeholder="Ej. Ana Ramírez"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.contacto"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.contacto"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.contacto"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Departamento
                  </label>
                  <input
                    type="text"
                    value={consignatario.departamento}
                    onChange={(e) =>
                      handleConsignatarioChange("departamento", e.target.value)
                    }
                    placeholder="Ej. Ventas"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div id="consignatario.calle">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Calle <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={consignatario.calle}
                    onChange={(e) =>
                      handleConsignatarioChange("calle", e.target.value)
                    }
                    placeholder="Ej. Calle 23"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.calle"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.calle"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.calle"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    value={consignatario.numero}
                    onChange={(e) =>
                      handleConsignatarioChange("numero", e.target.value)
                    }
                    placeholder="102"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Colonia
                  </label>
                  <input
                    type="text"
                    value={consignatario.colonia}
                    onChange={(e) =>
                      handleConsignatarioChange("colonia", e.target.value)
                    }
                    placeholder="Ej. Centro"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={consignatario.codigoPostal}
                    onChange={(e) =>
                      handleConsignatarioChange("codigoPostal", e.target.value)
                    }
                    placeholder="83000"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div id="consignatario.ciudad">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Ciudad <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={consignatario.ciudad}
                    onChange={(e) =>
                      handleConsignatarioChange("ciudad", e.target.value)
                    }
                    placeholder="Hermosillo"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.ciudad"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.ciudad"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.ciudad"]}
                    </p>
                  )}
                </div>
                <div id="consignatario.estado">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Estado <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={consignatario.estado}
                    onChange={(e) =>
                      handleConsignatarioChange("estado", e.target.value)
                    }
                    placeholder="Sonora"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.estado"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.estado"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.estado"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    value={consignatario.pais}
                    onChange={(e) =>
                      handleConsignatarioChange("pais", e.target.value)
                    }
                    placeholder="México"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div id="consignatario.telefono">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Teléfono <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="tel"
                    value={consignatario.telefono}
                    onChange={(e) =>
                      handleConsignatarioChange("telefono", e.target.value)
                    }
                    placeholder="662-345-8790"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["consignatario.telefono"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["consignatario.telefono"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["consignatario.telefono"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: Información del Envío */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">
                    Información del Envío
                  </h2>
                  <p className="text-xs text-[#9ca3af]">Detalles del paquete</p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    No. Cintillo
                  </label>
                  <input
                    type="text"
                    value={infoEnvio.noCintillo}
                    onChange={(e) =>
                      handleInfoEnvioChange("noCintillo", e.target.value)
                    }
                    placeholder="Ej. CIN-12345"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    No. Contrato
                  </label>
                  <input
                    type="text"
                    value={infoEnvio.noContrato}
                    onChange={(e) =>
                      handleInfoEnvioChange("noContrato", e.target.value)
                    }
                    placeholder="Ej. CONT-2024-001"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Facturar en
                  </label>
                  <input
                    type="text"
                    value={infoEnvio.facturarEn}
                    onChange={(e) =>
                      handleInfoEnvioChange("facturarEn", e.target.value)
                    }
                    placeholder="Ej. Hermosillo"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div id="infoEnvio.valorDeclarado">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Valor declarado ($){" "}
                    <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={infoEnvio.valorDeclarado}
                    onChange={(e) => {
                      const value = e.target.value;
                      if (value === "" || /^\d*\.?\d*$/.test(value)) {
                        handleInfoEnvioChange("valorDeclarado", value);
                      }
                    }}
                    placeholder="Ej. 1500.00"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["infoEnvio.valorDeclarado"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["infoEnvio.valorDeclarado"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["infoEnvio.valorDeclarado"]}
                    </p>
                  )}
                </div>
                <div className="col-span-2" id="infoEnvio.caracteristicas">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Características del envío (qué contiene){" "}
                    <span className="text-[#e53e3e]">*</span>
                  </label>
                  <textarea
                    value={infoEnvio.caracteristicas}
                    onChange={(e) =>
                      handleInfoEnvioChange("caracteristicas", e.target.value)
                    }
                    placeholder="Ej. 3 cajas con documentos y material promocional"
                    rows={3}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all resize-none ${
                      errors["infoEnvio.caracteristicas"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["infoEnvio.caracteristicas"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["infoEnvio.caracteristicas"]}
                    </p>
                  )}
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: Tipo de Envío */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <Package className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Tipo de Envío</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Selecciona la cantidad por tipo
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4" id="tipoEnvio.general">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Valijas
                  </label>
                  <input
                    type="text"
                    value={tipoEnvio.valijas}
                    onChange={(e) =>
                      handleTipoEnvioChange("valijas", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Caja
                  </label>
                  <input
                    type="text"
                    value={tipoEnvio.caja}
                    onChange={(e) =>
                      handleTipoEnvioChange("caja", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Sobres
                  </label>
                  <input
                    type="text"
                    value={tipoEnvio.sobres}
                    onChange={(e) =>
                      handleTipoEnvioChange("sobres", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all text-center"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Envases
                  </label>
                  <input
                    type="text"
                    value={tipoEnvio.envases}
                    onChange={(e) =>
                      handleTipoEnvioChange("envases", e.target.value)
                    }
                    placeholder="0"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all text-center"
                  />
                </div>
              </div>
              {errors["tipoEnvio.general"] && (
                <p className="text-xs text-[#e53e3e] mt-2 flex items-center gap-1">
                  <AlertCircle className="w-3 h-3" />
                  {errors["tipoEnvio.general"]}
                </p>
              )}
            </div>

            {/* SECCIÓN 5: Peso del Envío */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <Scale className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Peso del Envío</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Dimensiones y peso del paquete
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-4 gap-4 mb-4">
                <div id="pesoEnvio.pesoReal">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Peso real (kg) <span className="text-[#e53e3e]">*</span>
                  </label>
                  <input
                    type="text"
                    value={pesoEnvio.pesoReal}
                    onChange={(e) =>
                      handlePesoEnvioChange("pesoReal", e.target.value)
                    }
                    placeholder="Ej. 5.5"
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      errors["pesoEnvio.pesoReal"]
                        ? "border-[#e53e3e] focus:ring-[#e53e3e]/20"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                    }`}
                  />
                  {errors["pesoEnvio.pesoReal"] && (
                    <p className="text-xs text-[#e53e3e] mt-1 flex items-center gap-1">
                      <AlertCircle className="w-3 h-3" />
                      {errors["pesoEnvio.pesoReal"]}
                    </p>
                  )}
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Largo (cm)
                  </label>
                  <input
                    type="text"
                    value={pesoEnvio.largo}
                    onChange={(e) =>
                      handlePesoEnvioChange("largo", e.target.value)
                    }
                    placeholder="Ej. 40"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Ancho (cm)
                  </label>
                  <input
                    type="text"
                    value={pesoEnvio.ancho}
                    onChange={(e) =>
                      handlePesoEnvioChange("ancho", e.target.value)
                    }
                    placeholder="Ej. 30"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Alto (cm)
                  </label>
                  <input
                    type="text"
                    value={pesoEnvio.alto}
                    onChange={(e) =>
                      handlePesoEnvioChange("alto", e.target.value)
                    }
                    placeholder="Ej. 20"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
              </div>

              {/* Cálculos automáticos */}
              <div className="grid grid-cols-2 gap-4">
                <div className="bg-[#f8fafc] rounded-lg p-4 border border-[#9ca3af]/20">
                  <p className="text-xs text-[#9ca3af] mb-1">
                    Peso dimensional (L×A×H / 6000)
                  </p>
                  <p className="text-xl text-[#2d3748]">
                    {pesoDimensional.toFixed(2)} kg
                  </p>
                </div>
                <div className="bg-[#00a3e0]/10 rounded-lg p-4 border border-[#00a3e0]/30">
                  <p className="text-xs text-[#00a3e0] mb-1">
                    Peso total (KGS) – Mayor entre real y dimensional
                  </p>
                  <p className="text-xl text-[#1a365d]">
                    {pesoTotal.toFixed(2)} kg
                  </p>
                </div>
              </div>
            </div>

            {/* SECCIÓN 6: Campos de Control */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <UserCheck className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Campos de Control</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Información del mensajero y recepción
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Clave del mensajero
                  </label>
                  <input
                    type="text"
                    value={control.claveMensajero}
                    onChange={(e) =>
                      handleControlChange("claveMensajero", e.target.value)
                    }
                    placeholder="Ej. MENS-001"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Firma del mensajero
                  </label>
                  <input
                    type="text"
                    value={control.firmaMensajero}
                    onChange={(e) =>
                      handleControlChange("firmaMensajero", e.target.value)
                    }
                    placeholder="Firma digital"
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Hora de recepción
                  </label>
                  <input
                    type="time"
                    value={control.horaRecepcion}
                    onChange={(e) =>
                      handleControlChange("horaRecepcion", e.target.value)
                    }
                    className="w-full px-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
                  />
                </div>
                <div className="col-span-3">
                  <label className="block text-sm text-[#2d3748] mb-3">
                    Tipo de envío
                  </label>
                  <div className="flex gap-6">
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoEnvioControl"
                        value="mensajeria"
                        checked={control.tipoEnvio === "mensajeria"}
                        onChange={(e) =>
                          handleControlChange("tipoEnvio", e.target.value)
                        }
                        className="w-4 h-4 text-[#00a3e0] focus:ring-[#00a3e0] focus:ring-2"
                      />
                      <span className="text-sm text-[#2d3748]">Mensajería</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoEnvioControl"
                        value="paqueteria"
                        checked={control.tipoEnvio === "paqueteria"}
                        onChange={(e) =>
                          handleControlChange("tipoEnvio", e.target.value)
                        }
                        className="w-4 h-4 text-[#00a3e0] focus:ring-[#00a3e0] focus:ring-2"
                      />
                      <span className="text-sm text-[#2d3748]">Paquetería</span>
                    </label>
                    <label className="flex items-center gap-2 cursor-pointer">
                      <input
                        type="radio"
                        name="tipoEnvioControl"
                        value="carga"
                        checked={control.tipoEnvio === "carga"}
                        onChange={(e) =>
                          handleControlChange("tipoEnvio", e.target.value)
                        }
                        className="w-4 h-4 text-[#00a3e0] focus:ring-[#00a3e0] focus:ring-2"
                      />
                      <span className="text-sm text-[#2d3748]">Carga</span>
                    </label>
                  </div>
                </div>
              </div>
            </div>

            {/* Botón Generar Guía */}
            <div className="flex justify-end">
              <button
                type="submit"
                className="px-8 py-3 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors flex items-center gap-2 shadow-lg"
              >
                <Truck className="w-5 h-5" />
                Generar Guía
              </button>
            </div>
          </form>
        </main>
      </div>

      {/* Modal Guía Generada */}
      <GuiaGeneradaModal
        isOpen={isGuiaGeneradaOpen}
        onClose={() => setIsGuiaGeneradaOpen(false)}
        numeroGuia={numeroGuiaGenerada}
        onDescargarPDF={handleDescargarPDF}
        onVerHistorial={handleVerHistorial}
      />
    </div>
  );
}
