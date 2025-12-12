import { useState } from "react";
import {
  Building2,
  Mail,
  Phone,
  MapPin,
  User,
  FileText,
  Lock,
  Bell,
  Save,
  CheckCircle,
  AlertCircle,
  Edit2,
} from "lucide-react";
import { Sidebar, Header } from "../../components/empresa/shared";
import { CambiarPasswordModal } from "../../components/empresa/perfil-configuracion";

interface PerfilConfiguracionViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

export function PerfilConfiguracionView({
  onLogout,
  onNavigate,
}: PerfilConfiguracionViewProps) {
  const [isPasswordModalOpen, setIsPasswordModalOpen] = useState(false);
  const [showSuccessMessage, setShowSuccessMessage] = useState(false);
  const [isEditing, setIsEditing] = useState(false);

  // Datos de la empresa
  const [empresaData, setEmpresaData] = useState({
    razonSocial: "Mi Empresa S.A. de C.V.",
    rfc: "MEE123456ABC",
    giro: "Comercio y distribución",
    nombreComercial: "Mi Empresa",
  });

  // Datos de contacto
  const [contactoData, setContactoData] = useState({
    nombreContacto: "Juan Martínez García",
    email: "juan.martinez@miempresa.com",
    telefono: "662-123-4567",
    celular: "662-987-6543",
    puesto: "Gerente de Logística",
  });

  // Dirección
  const [direccionData, setDireccionData] = useState({
    calle: "Blvd. Luis Encinas",
    numero: "250",
    colonia: "Centro",
    codigoPostal: "83000",
    ciudad: "Hermosillo",
    estado: "Sonora",
    pais: "México",
  });

  // Datos de facturación
  const [facturacionData, setFacturacionData] = useState({
    razonSocialFiscal: "Mi Empresa S.A. de C.V.",
    rfcFiscal: "MEE123456ABC",
    regimenFiscal: "601 - General de Ley Personas Morales",
    usoCFDI: "G03 - Gastos en general",
    emailFacturacion: "facturacion@miempresa.com",
  });

  // Preferencias
  const [preferencias, setPreferencias] = useState({
    notificacionesEmail: true,
    notificacionesSMS: false,
    alertasEstado: true,
    reportesSemanal: true,
  });

  const handleEmpresaChange = (field: string, value: string) => {
    setEmpresaData((prev) => ({ ...prev, [field]: value }));
  };

  const handleContactoChange = (field: string, value: string) => {
    setContactoData((prev) => ({ ...prev, [field]: value }));
  };

  const handleDireccionChange = (field: string, value: string) => {
    setDireccionData((prev) => ({ ...prev, [field]: value }));
  };

  const handleFacturacionChange = (field: string, value: string) => {
    setFacturacionData((prev) => ({ ...prev, [field]: value }));
  };

  const handlePreferenciaChange = (field: string, value: boolean) => {
    setPreferencias((prev) => ({ ...prev, [field]: value }));
  };

  const handleGuardarCambios = (e: React.FormEvent) => {
    e.preventDefault();

    // Aquí se guardarían los cambios en el backend
    console.log("Guardando cambios:", {
      empresaData,
      contactoData,
      direccionData,
      facturacionData,
      preferencias,
    });

    setIsEditing(false);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  const handleCambiarPassword = (
    currentPassword: string,
    newPassword: string
  ) => {
    // Aquí se cambiaría la contraseña en el backend
    console.log("Cambiando contraseña");
    setIsPasswordModalOpen(false);
    setShowSuccessMessage(true);

    setTimeout(() => {
      setShowSuccessMessage(false);
    }, 3000);
  };

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="perfil"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Perfil / Configuración" />

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
              <span className="text-[#2d3748]">Perfil / Configuración</span>
            </p>
          </div>

          {/* Mensaje de Éxito */}
          {showSuccessMessage && (
            <div className="mb-6 bg-[#38a169]/10 border border-[#38a169]/30 rounded-lg p-4 flex items-center gap-3">
              <CheckCircle className="w-5 h-5 text-[#38a169]" />
              <p className="text-sm text-[#38a169]">
                Los cambios se han guardado correctamente
              </p>
            </div>
          )}

          <form onSubmit={handleGuardarCambios}>
            {/* SECCIÓN 1: Información de la Empresa */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center justify-between mb-6">
                <div className="flex items-center gap-3">
                  <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                    <Building2 className="w-5 h-5 text-[#00a3e0]" />
                  </div>
                  <div>
                    <h2 className="text-lg text-[#1a365d]">
                      Información de la Empresa
                    </h2>
                    <p className="text-xs text-[#9ca3af]">
                      Datos generales de tu empresa
                    </p>
                  </div>
                </div>
                {!isEditing && (
                  <button
                    type="button"
                    onClick={() => setIsEditing(true)}
                    className="px-4 py-2 border border-[#00a3e0] text-[#00a3e0] rounded-lg hover:bg-[#00a3e0]/5 transition-colors flex items-center gap-2 text-sm"
                  >
                    <Edit2 className="w-4 h-4" />
                    Editar
                  </button>
                )}
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Razón Social
                  </label>
                  <input
                    type="text"
                    value={empresaData.razonSocial}
                    onChange={(e) =>
                      handleEmpresaChange("razonSocial", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    RFC
                  </label>
                  <input
                    type="text"
                    value={empresaData.rfc}
                    onChange={(e) => handleEmpresaChange("rfc", e.target.value)}
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Nombre Comercial
                  </label>
                  <input
                    type="text"
                    value={empresaData.nombreComercial}
                    onChange={(e) =>
                      handleEmpresaChange("nombreComercial", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Giro
                  </label>
                  <input
                    type="text"
                    value={empresaData.giro}
                    onChange={(e) =>
                      handleEmpresaChange("giro", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 2: Datos de Contacto */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <User className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Datos de Contacto</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Información del responsable de la cuenta
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Nombre Completo
                  </label>
                  <input
                    type="text"
                    value={contactoData.nombreContacto}
                    onChange={(e) =>
                      handleContactoChange("nombreContacto", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Puesto
                  </label>
                  <input
                    type="text"
                    value={contactoData.puesto}
                    onChange={(e) =>
                      handleContactoChange("puesto", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    <Mail className="w-4 h-4 inline mr-1 text-[#9ca3af]" />
                    Correo Electrónico
                  </label>
                  <input
                    type="email"
                    value={contactoData.email}
                    onChange={(e) =>
                      handleContactoChange("email", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    <Phone className="w-4 h-4 inline mr-1 text-[#9ca3af]" />
                    Teléfono
                  </label>
                  <input
                    type="tel"
                    value={contactoData.telefono}
                    onChange={(e) =>
                      handleContactoChange("telefono", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    <Phone className="w-4 h-4 inline mr-1 text-[#9ca3af]" />
                    Celular
                  </label>
                  <input
                    type="tel"
                    value={contactoData.celular}
                    onChange={(e) =>
                      handleContactoChange("celular", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 3: Dirección */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <MapPin className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Dirección Fiscal</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Domicilio registrado de la empresa
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-3 gap-4">
                <div className="col-span-2">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Calle
                  </label>
                  <input
                    type="text"
                    value={direccionData.calle}
                    onChange={(e) =>
                      handleDireccionChange("calle", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Número
                  </label>
                  <input
                    type="text"
                    value={direccionData.numero}
                    onChange={(e) =>
                      handleDireccionChange("numero", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Colonia
                  </label>
                  <input
                    type="text"
                    value={direccionData.colonia}
                    onChange={(e) =>
                      handleDireccionChange("colonia", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Código Postal
                  </label>
                  <input
                    type="text"
                    value={direccionData.codigoPostal}
                    onChange={(e) =>
                      handleDireccionChange("codigoPostal", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Ciudad
                  </label>
                  <input
                    type="text"
                    value={direccionData.ciudad}
                    onChange={(e) =>
                      handleDireccionChange("ciudad", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Estado
                  </label>
                  <input
                    type="text"
                    value={direccionData.estado}
                    onChange={(e) =>
                      handleDireccionChange("estado", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    País
                  </label>
                  <input
                    type="text"
                    value={direccionData.pais}
                    onChange={(e) =>
                      handleDireccionChange("pais", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 4: Datos de Facturación */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <FileText className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">
                    Datos de Facturación
                  </h2>
                  <p className="text-xs text-[#9ca3af]">
                    Información fiscal para CFDI
                  </p>
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Razón Social (Facturación)
                  </label>
                  <input
                    type="text"
                    value={facturacionData.razonSocialFiscal}
                    onChange={(e) =>
                      handleFacturacionChange(
                        "razonSocialFiscal",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    RFC
                  </label>
                  <input
                    type="text"
                    value={facturacionData.rfcFiscal}
                    onChange={(e) =>
                      handleFacturacionChange("rfcFiscal", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Régimen Fiscal
                  </label>
                  <input
                    type="text"
                    value={facturacionData.regimenFiscal}
                    onChange={(e) =>
                      handleFacturacionChange("regimenFiscal", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div>
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Uso de CFDI
                  </label>
                  <input
                    type="text"
                    value={facturacionData.usoCFDI}
                    onChange={(e) =>
                      handleFacturacionChange("usoCFDI", e.target.value)
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-sm text-[#2d3748] mb-2">
                    Email para Facturación
                  </label>
                  <input
                    type="email"
                    value={facturacionData.emailFacturacion}
                    onChange={(e) =>
                      handleFacturacionChange(
                        "emailFacturacion",
                        e.target.value
                      )
                    }
                    disabled={!isEditing}
                    className={`w-full px-4 py-2.5 border rounded-lg focus:outline-none focus:ring-2 transition-all ${
                      isEditing
                        ? "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-[#00a3e0]/20"
                        : "bg-[#f8fafc] border-[#9ca3af]/20 text-[#6b7280] cursor-not-allowed"
                    }`}
                  />
                </div>
              </div>
            </div>

            {/* SECCIÓN 5: Preferencias de Notificaciones */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <Bell className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">
                    Preferencias de Notificaciones
                  </h2>
                  <p className="text-xs text-[#9ca3af]">
                    Configura cómo deseas recibir actualizaciones
                  </p>
                </div>
              </div>

              <div className="space-y-4">
                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <p className="text-sm text-[#2d3748]">
                      Notificaciones por Email
                    </p>
                    <p className="text-xs text-[#9ca3af]">
                      Recibe actualizaciones en tu correo electrónico
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferencias.notificacionesEmail}
                      onChange={(e) =>
                        handlePreferenciaChange(
                          "notificacionesEmail",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3e0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a3e0]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <p className="text-sm text-[#2d3748]">
                      Notificaciones por SMS
                    </p>
                    <p className="text-xs text-[#9ca3af]">
                      Recibe alertas importantes por mensaje de texto
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferencias.notificacionesSMS}
                      onChange={(e) =>
                        handlePreferenciaChange(
                          "notificacionesSMS",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3e0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a3e0]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <p className="text-sm text-[#2d3748]">
                      Alertas de Cambio de Estado
                    </p>
                    <p className="text-xs text-[#9ca3af]">
                      Notificaciones cuando cambia el estado de tus guías
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferencias.alertasEstado}
                      onChange={(e) =>
                        handlePreferenciaChange(
                          "alertasEstado",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3e0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a3e0]"></div>
                  </label>
                </div>

                <div className="flex items-center justify-between p-4 bg-[#f8fafc] rounded-lg">
                  <div>
                    <p className="text-sm text-[#2d3748]">Reporte Semanal</p>
                    <p className="text-xs text-[#9ca3af]">
                      Resumen de actividad cada semana
                    </p>
                  </div>
                  <label className="relative inline-flex items-center cursor-pointer">
                    <input
                      type="checkbox"
                      checked={preferencias.reportesSemanal}
                      onChange={(e) =>
                        handlePreferenciaChange(
                          "reportesSemanal",
                          e.target.checked
                        )
                      }
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 peer-focus:outline-none peer-focus:ring-4 peer-focus:ring-[#00a3e0]/20 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-white after:content-[''] after:absolute after:top-[2px] after:left-[2px] after:bg-white after:border-gray-300 after:border after:rounded-full after:h-5 after:w-5 after:transition-all peer-checked:bg-[#00a3e0]"></div>
                  </label>
                </div>
              </div>
            </div>

            {/* SECCIÓN 6: Seguridad */}
            <div className="bg-white rounded-xl shadow-sm p-6 mb-6">
              <div className="flex items-center gap-3 mb-6">
                <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                  <Lock className="w-5 h-5 text-[#00a3e0]" />
                </div>
                <div>
                  <h2 className="text-lg text-[#1a365d]">Seguridad</h2>
                  <p className="text-xs text-[#9ca3af]">
                    Gestiona la seguridad de tu cuenta
                  </p>
                </div>
              </div>

              <div className="bg-[#f8fafc] rounded-lg p-4 flex items-center justify-between">
                <div>
                  <p className="text-sm text-[#2d3748] mb-1">Contraseña</p>
                  <p className="text-xs text-[#9ca3af]">
                    Última actualización: hace 30 días
                  </p>
                </div>
                <button
                  type="button"
                  onClick={() => setIsPasswordModalOpen(true)}
                  className="px-4 py-2 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors text-sm flex items-center gap-2"
                >
                  <Lock className="w-4 h-4" />
                  Cambiar Contraseña
                </button>
              </div>

              <div className="mt-4 bg-[#00a3e0]/5 rounded-lg p-4 border border-[#00a3e0]/20">
                <div className="flex items-start gap-3">
                  <AlertCircle className="w-5 h-5 text-[#00a3e0] flex-shrink-0 mt-0.5" />
                  <div>
                    <p className="text-sm text-[#2d3748] mb-1">
                      Recomendaciones de seguridad
                    </p>
                    <ul className="text-xs text-[#9ca3af] space-y-1 ml-4 list-disc">
                      <li>Cambia tu contraseña periódicamente</li>
                      <li>No compartas tus credenciales con nadie</li>
                      <li>Usa contraseñas únicas y seguras</li>
                      <li>Cierra sesión en dispositivos compartidos</li>
                    </ul>
                  </div>
                </div>
              </div>
            </div>

            {/* Botones de Acción */}
            {isEditing && (
              <div className="flex gap-3 justify-end">
                <button
                  type="button"
                  onClick={() => setIsEditing(false)}
                  className="px-6 py-3 border border-[#9ca3af]/30 text-[#2d3748] rounded-lg hover:bg-[#f8fafc] transition-colors"
                >
                  Cancelar
                </button>
                <button
                  type="submit"
                  className="px-6 py-3 bg-[#00a3e0] text-white rounded-lg hover:bg-[#0086b8] transition-colors flex items-center gap-2"
                >
                  <Save className="w-5 h-5" />
                  Guardar Cambios
                </button>
              </div>
            )}
          </form>
        </main>
      </div>

      {/* Modal Cambiar Contraseña */}
      <CambiarPasswordModal
        isOpen={isPasswordModalOpen}
        onClose={() => setIsPasswordModalOpen(false)}
        onConfirm={handleCambiarPassword}
      />
    </div>
  );
}
