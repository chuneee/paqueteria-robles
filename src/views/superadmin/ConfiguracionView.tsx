import { useState } from "react";
import {
  User,
  Lock,
  Bell,
  Settings,
  Mail,
  Phone,
  Building2,
  Save,
  Eye,
  EyeOff,
  CheckCircle,
  Globe,
  Clock,
  DollarSign,
  Package,
  Smartphone,
  Shield,
} from "lucide-react";
import { Sidebar, Header } from "../../components/superadmin/shared";
import { Toast, ToastType } from "../../components/shared/Toast";

interface ConfiguracionViewProps {
  onLogout: () => void;
  onNavigate: (view: string) => void;
}

type TabType = "perfil" | "seguridad" | "notificaciones" | "sistema";

export function ConfiguracionView({
  onLogout,
  onNavigate,
}: ConfiguracionViewProps) {
  const [activeTab, setActiveTab] = useState<TabType>("perfil");

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

  return (
    <div className="min-h-screen bg-[#f8fafc]">
      {/* Sidebar */}
      <Sidebar
        activeItem="configuracion"
        onNavigate={onNavigate}
        onLogout={onLogout}
      />

      {/* Main Content Area */}
      <div className="ml-64">
        {/* Header */}
        <Header title="Configuración" />

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
              <span className="text-[#2d3748]">Configuración</span>
            </p>
          </div>

          {/* Tabs */}
          <div className="bg-white rounded-xl shadow-sm mb-6 overflow-hidden">
            <div className="border-b border-[#9ca3af]/20">
              <div className="flex">
                <button
                  onClick={() => setActiveTab("perfil")}
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "perfil"
                      ? "border-b-2 border-[#00a3e0] text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  <User className="w-5 h-5" />
                  Perfil
                </button>
                <button
                  onClick={() => setActiveTab("seguridad")}
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "seguridad"
                      ? "border-b-2 border-[#00a3e0] text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  <Lock className="w-5 h-5" />
                  Seguridad
                </button>
                <button
                  onClick={() => setActiveTab("notificaciones")}
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "notificaciones"
                      ? "border-b-2 border-[#00a3e0] text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  <Bell className="w-5 h-5" />
                  Notificaciones
                </button>
                <button
                  onClick={() => setActiveTab("sistema")}
                  className={`flex items-center gap-2 px-6 py-4 transition-colors ${
                    activeTab === "sistema"
                      ? "border-b-2 border-[#00a3e0] text-[#00a3e0]"
                      : "text-[#9ca3af] hover:text-[#2d3748]"
                  }`}
                >
                  <Settings className="w-5 h-5" />
                  Sistema
                </button>
              </div>
            </div>
          </div>

          {/* Tab Content */}
          {activeTab === "perfil" && <PerfilTab showToast={showToast} />}
          {activeTab === "seguridad" && <SeguridadTab showToast={showToast} />}
          {activeTab === "notificaciones" && (
            <NotificacionesTab showToast={showToast} />
          )}
          {activeTab === "sistema" && <SistemaTab showToast={showToast} />}
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

// TAB: Perfil
function PerfilTab({
  showToast,
}: {
  showToast: (message: string, type: ToastType) => void;
}) {
  const [nombre, setNombre] = useState("Carlos Rodríguez");
  const [email, setEmail] = useState("carlos.rodriguez@serviciorobles.com");
  const [telefono, setTelefono] = useState("662 123 4567");
  const [cargo, setCargo] = useState("Super Administrador");

  const handleGuardarPerfil = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Perfil actualizado correctamente", "success");
  };

  return (
    <div className="space-y-6">
      {/* Información del perfil */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <div className="flex items-center gap-6 mb-6 pb-6 border-b border-[#9ca3af]/20">
          <div className="w-24 h-24 bg-[#00a3e0] rounded-full flex items-center justify-center text-white text-3xl">
            CR
          </div>
          <div>
            <h3 className="text-lg text-[#1a365d] mb-1">Carlos Rodríguez</h3>
            <p className="text-sm text-[#9ca3af] mb-2">Super Administrador</p>
            <button className="text-sm text-[#00a3e0] hover:underline">
              Cambiar foto de perfil
            </button>
          </div>
        </div>

        <form onSubmit={handleGuardarPerfil}>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            {/* Nombre completo */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Nombre completo *
              </label>
              <div className="relative">
                <User className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="text"
                  value={nombre}
                  onChange={(e) => setNombre(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Correo electrónico *
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  required
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>
            </div>

            {/* Teléfono */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Teléfono
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="tel"
                  value={telefono}
                  onChange={(e) => setTelefono(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>
            </div>

            {/* Cargo */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Cargo
              </label>
              <div className="relative">
                <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type="text"
                  value={cargo}
                  onChange={(e) => setCargo(e.target.value)}
                  className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-[#9ca3af]/20">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar cambios
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TAB: Seguridad
function SeguridadTab({
  showToast,
}: {
  showToast: (message: string, type: ToastType) => void;
}) {
  const [passwordActual, setPasswordActual] = useState("");
  const [passwordNueva, setPasswordNueva] = useState("");
  const [passwordConfirmar, setPasswordConfirmar] = useState("");
  const [showPasswordActual, setShowPasswordActual] = useState(false);
  const [showPasswordNueva, setShowPasswordNueva] = useState(false);
  const [showPasswordConfirmar, setShowPasswordConfirmar] = useState(false);

  const handleCambiarPassword = (e: React.FormEvent) => {
    e.preventDefault();

    if (passwordNueva !== passwordConfirmar) {
      showToast("Las contraseñas no coinciden", "error");
      return;
    }

    if (passwordNueva.length < 8) {
      showToast("La contraseña debe tener al menos 8 caracteres", "error");
      return;
    }

    showToast("Contraseña actualizada correctamente", "success");
    setPasswordActual("");
    setPasswordNueva("");
    setPasswordConfirmar("");
  };

  return (
    <div className="space-y-6">
      {/* Cambiar contraseña */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm text-[#1a365d] mb-4 flex items-center gap-2">
          <Lock className="w-5 h-5" />
          Cambiar Contraseña
        </h3>

        <form onSubmit={handleCambiarPassword}>
          <div className="space-y-4">
            {/* Contraseña actual */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Contraseña actual *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type={showPasswordActual ? "text" : "password"}
                  value={passwordActual}
                  onChange={(e) => setPasswordActual(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordActual(!showPasswordActual)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748]"
                >
                  {showPasswordActual ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>

            {/* Nueva contraseña */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Nueva contraseña *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type={showPasswordNueva ? "text" : "password"}
                  value={passwordNueva}
                  onChange={(e) => setPasswordNueva(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
                <button
                  type="button"
                  onClick={() => setShowPasswordNueva(!showPasswordNueva)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748]"
                >
                  {showPasswordNueva ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
              <p className="text-xs text-[#9ca3af] mt-1">
                Mínimo 8 caracteres, incluye mayúsculas, minúsculas y números
              </p>
            </div>

            {/* Confirmar contraseña */}
            <div>
              <label className="block text-sm text-[#2d3748] mb-1.5">
                Confirmar nueva contraseña *
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                <input
                  type={showPasswordConfirmar ? "text" : "password"}
                  value={passwordConfirmar}
                  onChange={(e) => setPasswordConfirmar(e.target.value)}
                  required
                  className="w-full pl-11 pr-11 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                />
                <button
                  type="button"
                  onClick={() =>
                    setShowPasswordConfirmar(!showPasswordConfirmar)
                  }
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748]"
                >
                  {showPasswordConfirmar ? (
                    <EyeOff className="w-5 h-5" />
                  ) : (
                    <Eye className="w-5 h-5" />
                  )}
                </button>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-[#9ca3af]/20">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              <Save className="w-4 h-4" />
              Actualizar contraseña
            </button>
          </div>
        </form>
      </div>

      {/* Sesiones activas */}
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm text-[#1a365d] mb-4 flex items-center gap-2">
          <Shield className="w-5 h-5" />
          Sesiones Activas
        </h3>

        <div className="space-y-3">
          <div className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#00a3e0]" />
              </div>
              <div>
                <p className="text-sm text-[#1a365d]">Chrome en Windows</p>
                <p className="text-xs text-[#9ca3af]">
                  Hermosillo, Sonora • Activa ahora
                </p>
              </div>
            </div>
            <span className="inline-flex px-2.5 py-1 rounded-full text-xs bg-[#38a169]/10 text-[#38a169]">
              Actual
            </span>
          </div>

          <div className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 bg-[#9ca3af]/10 rounded-lg flex items-center justify-center">
                <Smartphone className="w-5 h-5 text-[#9ca3af]" />
              </div>
              <div>
                <p className="text-sm text-[#1a365d]">Safari en iPhone</p>
                <p className="text-xs text-[#9ca3af]">
                  Hermosillo, Sonora • Hace 2 días
                </p>
              </div>
            </div>
            <button className="text-xs text-[#e53e3e] hover:underline">
              Cerrar sesión
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

// TAB: Notificaciones
function NotificacionesTab({
  showToast,
}: {
  showToast: (message: string, type: ToastType) => void;
}) {
  const [emailNotif, setEmailNotif] = useState(true);
  const [pushNotif, setPushNotif] = useState(true);
  const [notifGuias, setNotifGuias] = useState(true);
  const [notifPagos, setNotifPagos] = useState(true);
  const [notifEmpresas, setNotifEmpresas] = useState(true);
  const [notifSistema, setNotifSistema] = useState(false);

  const handleGuardarNotificaciones = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Preferencias de notificaciones actualizadas", "success");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm text-[#1a365d] mb-4 flex items-center gap-2">
          <Bell className="w-5 h-5" />
          Preferencias de Notificaciones
        </h3>

        <form onSubmit={handleGuardarNotificaciones}>
          <div className="space-y-6">
            {/* Canales de notificación */}
            <div>
              <h4 className="text-sm text-[#2d3748] mb-3">
                Canales de notificación
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <Mail className="w-5 h-5 text-[#9ca3af]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">
                        Notificaciones por Email
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        Recibe notificaciones en tu correo
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={emailNotif}
                      onChange={(e) => setEmailNotif(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <Bell className="w-5 h-5 text-[#9ca3af]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">
                        Notificaciones Push
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        Recibe notificaciones en tiempo real
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={pushNotif}
                      onChange={(e) => setPushNotif(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>

            {/* Tipos de notificaciones */}
            <div>
              <h4 className="text-sm text-[#2d3748] mb-3">
                Tipos de notificaciones
              </h4>
              <div className="space-y-3">
                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <Package className="w-5 h-5 text-[#00a3e0]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">Guías y Envíos</p>
                      <p className="text-xs text-[#9ca3af]">
                        Nuevas guías, entregas, actualizaciones
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifGuias}
                      onChange={(e) => setNotifGuias(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <DollarSign className="w-5 h-5 text-[#38a169]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">Pagos y Cobranza</p>
                      <p className="text-xs text-[#9ca3af]">
                        Pagos recibidos, pendientes, vencidos
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifPagos}
                      onChange={(e) => setNotifPagos(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <Building2 className="w-5 h-5 text-[#d69e2e]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">
                        Empresas y Clientes
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        Nuevas empresas, actualizaciones
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifEmpresas}
                      onChange={(e) => setNotifEmpresas(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>

                <label className="flex items-center justify-between p-4 border border-[#9ca3af]/20 rounded-lg cursor-pointer hover:bg-[#f8fafc]">
                  <div className="flex items-center gap-3">
                    <Settings className="w-5 h-5 text-[#1a365d]" />
                    <div>
                      <p className="text-sm text-[#2d3748]">Sistema</p>
                      <p className="text-xs text-[#9ca3af]">
                        Mantenimientos, actualizaciones del sistema
                      </p>
                    </div>
                  </div>
                  <div className="relative">
                    <input
                      type="checkbox"
                      checked={notifSistema}
                      onChange={(e) => setNotifSistema(e.target.checked)}
                      className="sr-only peer"
                    />
                    <div className="w-11 h-6 bg-[#9ca3af]/30 rounded-full peer-checked:bg-[#00a3e0] transition-colors"></div>
                    <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full transition-transform peer-checked:translate-x-5"></div>
                  </div>
                </label>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-[#9ca3af]/20">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar preferencias
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

// TAB: Sistema
function SistemaTab({
  showToast,
}: {
  showToast: (message: string, type: ToastType) => void;
}) {
  const [nombreEmpresa, setNombreEmpresa] = useState("Servicio Robles");
  const [timezone, setTimezone] = useState("America/Hermosillo");
  const [moneda, setMoneda] = useState("MXN");
  const [formatoFecha, setFormatoFecha] = useState("DD/MM/YYYY");

  const handleGuardarSistema = (e: React.FormEvent) => {
    e.preventDefault();
    showToast("Configuración del sistema actualizada", "success");
  };

  return (
    <div className="space-y-6">
      <div className="bg-white rounded-xl shadow-sm p-6">
        <h3 className="text-sm text-[#1a365d] mb-4 flex items-center gap-2">
          <Settings className="w-5 h-5" />
          Configuración General del Sistema
        </h3>

        <form onSubmit={handleGuardarSistema}>
          <div className="space-y-6">
            {/* Información de la empresa */}
            <div>
              <h4 className="text-sm text-[#2d3748] mb-3">
                Información de la empresa
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Nombre de la empresa
                  </label>
                  <div className="relative">
                    <Building2 className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <input
                      type="text"
                      value={nombreEmpresa}
                      onChange={(e) => setNombreEmpresa(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                    />
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Zona horaria
                  </label>
                  <div className="relative">
                    <Globe className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <select
                      value={timezone}
                      onChange={(e) => setTimezone(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white appearance-none"
                    >
                      <option value="America/Hermosillo">
                        America/Hermosillo (GMT-7)
                      </option>
                      <option value="America/Mexico_City">
                        America/Mexico_City (GMT-6)
                      </option>
                      <option value="America/Tijuana">
                        America/Tijuana (GMT-8)
                      </option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Formatos */}
            <div>
              <h4 className="text-sm text-[#2d3748] mb-3">
                Formatos y preferencias
              </h4>
              <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Moneda
                  </label>
                  <div className="relative">
                    <DollarSign className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <select
                      value={moneda}
                      onChange={(e) => setMoneda(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white appearance-none"
                    >
                      <option value="MXN">MXN - Peso Mexicano</option>
                      <option value="USD">USD - Dólar Estadounidense</option>
                    </select>
                  </div>
                </div>

                <div>
                  <label className="block text-sm text-[#2d3748] mb-1.5">
                    Formato de fecha
                  </label>
                  <div className="relative">
                    <Clock className="absolute left-3 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                    <select
                      value={formatoFecha}
                      onChange={(e) => setFormatoFecha(e.target.value)}
                      className="w-full pl-11 pr-4 py-2.5 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] bg-white appearance-none"
                    >
                      <option value="DD/MM/YYYY">DD/MM/YYYY</option>
                      <option value="MM/DD/YYYY">MM/DD/YYYY</option>
                      <option value="YYYY-MM-DD">YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
            </div>

            {/* Información del sistema */}
            <div className="bg-[#f8fafc] rounded-lg p-4">
              <h4 className="text-sm text-[#2d3748] mb-3">
                Información del sistema
              </h4>
              <div className="space-y-2 text-sm">
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Versión:</span>
                  <span className="text-[#2d3748]">2.5.1</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Última actualización:</span>
                  <span className="text-[#2d3748]">28/11/2024</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Base de datos:</span>
                  <span className="text-[#38a169]">Conectada</span>
                </div>
                <div className="flex justify-between">
                  <span className="text-[#9ca3af]">Próximo respaldo:</span>
                  <span className="text-[#2d3748]">30/11/2024 12:00 AM</span>
                </div>
              </div>
            </div>
          </div>

          <div className="flex justify-end mt-6 pt-6 border-t border-[#9ca3af]/20">
            <button
              type="submit"
              className="flex items-center gap-2 px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
            >
              <Save className="w-4 h-4" />
              Guardar configuración
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}
