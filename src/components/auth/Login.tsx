import { useState } from "react";
import {
  Lock,
  Mail,
  AlertCircle,
  Eye,
  EyeOff,
  Package,
  Truck,
  FileText,
} from "lucide-react";
import logo from "figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png";

interface LoginProps {
  onLogin: (role: "superadmin" | "admin" | "empresa") => void;
  onClose: () => void;
}

export function Login({ onLogin, onClose }: LoginProps) {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false);

  // Credenciales hardcoded para desarrollo
  const credentials = {
    superadmin: {
      email: "superadmin@robles.com",
      password: "super123",
    },
    admin: { email: "admin@robles.com", password: "admin123" },
    empresa: {
      email: "empresa@robles.com",
      password: "empresa123",
    },
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setError("");
    setIsLoading(true);

    // Simular delay de red
    setTimeout(() => {
      // Verificar credenciales
      if (
        email === credentials.superadmin.email &&
        password === credentials.superadmin.password
      ) {
        onLogin("superadmin");
      } else if (
        email === credentials.admin.email &&
        password === credentials.admin.password
      ) {
        onLogin("admin");
      } else if (
        email === credentials.empresa.email &&
        password === credentials.empresa.password
      ) {
        onLogin("empresa");
      } else {
        setError(
          "Credenciales incorrectas. Por favor, verifica tu correo y contraseña.",
        );
        setIsLoading(false);
      }
    }, 800);
  };

  return (
    <div className="fixed inset-0 z-50 bg-white">
      {/* Close button - top right */}
      <button
        onClick={onClose}
        className="absolute top-6 right-6 z-50 w-10 h-10 flex items-center justify-center rounded-full bg-white/10 hover:bg-white/20 text-white transition-colors"
      >
        <svg
          className="w-6 h-6"
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path
            strokeLinecap="round"
            strokeLinejoin="round"
            strokeWidth={2}
            d="M6 18L18 6M6 6l12 12"
          />
        </svg>
      </button>

      <div className="flex h-screen">
        {/* LEFT COLUMN - Branding Panel (40-45%) */}
        <div className="hidden lg:flex lg:w-[45%] bg-gradient-to-br from-[#1a365d] via-[#1e4068] to-[#1a365d] relative overflow-hidden">
          {/* Decorative waves */}
          <div className="absolute inset-0 overflow-hidden">
            <svg
              className="absolute top-20 -left-20 w-96 h-96 opacity-5"
              viewBox="0 0 200 200"
            >
              <path
                fill="#00a3e0"
                d="M45.1,-78.5C58.9,-70.2,70.9,-57.4,78.8,-42.1C86.7,-26.8,90.5,-9,88.8,7.9C87.1,24.8,80,40.8,69.2,53.3C58.4,65.8,44,74.8,28.3,80.1C12.6,85.4,-4.4,87,-20.3,82.8C-36.2,78.6,-51,68.6,-63.7,56C-76.4,43.4,-87,28.2,-90.3,11.5C-93.6,-5.2,-89.6,-23.4,-80.8,-38.5C-72,-53.6,-58.4,-65.6,-43.2,-73.4C-28,-81.2,-11.2,-84.8,4.5,-91.8C20.2,-98.8,31.3,-86.8,45.1,-78.5Z"
                transform="translate(100 100)"
              />
            </svg>
            <svg
              className="absolute bottom-20 -right-20 w-80 h-80 opacity-5"
              viewBox="0 0 200 200"
            >
              <path
                fill="#00a3e0"
                d="M41.3,-72.1C52.9,-64.3,61.3,-51.5,68.4,-37.8C75.5,-24.1,81.3,-9.5,81.4,5.3C81.5,20.1,75.9,35.1,66.8,47.3C57.7,59.5,45.1,68.9,31.2,74.5C17.3,80.1,2.1,81.9,-13.7,80.3C-29.5,78.7,-46,73.7,-59.3,65.1C-72.6,56.5,-82.7,44.3,-87.4,30.2C-92.1,16.1,-91.4,0.1,-86.8,-14.4C-82.2,-28.9,-73.7,-41.9,-62.5,-50.3C-51.3,-58.7,-37.4,-62.5,-24.3,-69.8C-11.2,-77.1,0.9,-87.9,14.1,-90.4C27.3,-92.9,29.7,-79.9,41.3,-72.1Z"
                transform="translate(100 100)"
              />
            </svg>
          </div>

          {/* Content */}
          <div className="relative z-10 flex flex-col items-center justify-center w-full px-12">
            {/* Logo and branding */}
            <div className="text-center mb-12">
              <img
                src={logo}
                alt="Servicio Robles"
                className="h-24 w-auto mx-auto mb-6 brightness-0 invert drop-shadow-lg"
              />
              <h2 className="text-white text-3xl mb-3">
                Sistema de Gestión de Guías
              </h2>
              <p className="text-[#00a3e0] text-xl">
                Paquetería de Confianza
              </p>
            </div>

            {/* Decorative icons */}
            <div className="flex items-center gap-8 mt-16">
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Package className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-white/60 text-sm">
                  Paquetería
                </p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <Truck className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-white/60 text-sm">Fletes</p>
              </div>
              <div className="flex flex-col items-center gap-2">
                <div className="w-16 h-16 rounded-full bg-white/10 flex items-center justify-center">
                  <FileText className="w-8 h-8 text-white/60" />
                </div>
                <p className="text-white/60 text-sm">Guías</p>
              </div>
            </div>
          </div>
        </div>

        {/* RIGHT COLUMN - Login Form (55-60%) */}
        <div className="w-full lg:w-[55%] flex items-center justify-center bg-white px-6 sm:px-12">
          <div className="w-full max-w-md">
            {/* Mobile logo - only visible on small screens */}
            <div className="lg:hidden text-center mb-8">
              <img
                src={logo}
                alt="Servicio Robles"
                className="h-16 w-auto mx-auto mb-3"
              />
            </div>

            {/* Form header */}
            <div className="mb-8">
              <h1 className="text-4xl text-[#1a365d] mb-3">
                Bienvenido
              </h1>
              <p className="text-[#9ca3af]">
                Ingresa tus credenciales para acceder al sistema
              </p>
            </div>

            {/* Error message */}
            {error && (
              <div className="mb-6 bg-red-50 border border-red-200 rounded-lg p-4 flex items-start gap-3">
                <AlertCircle className="w-5 h-5 text-red-500 flex-shrink-0 mt-0.5" />
                <p className="text-sm text-red-700">{error}</p>
              </div>
            )}

            {/* Form */}
            <form onSubmit={handleSubmit} className="space-y-6">
              {/* Email field */}
              <div className="space-y-2">
                <label
                  htmlFor="email"
                  className="block text-[#2d3748]"
                >
                  Correo electrónico
                </label>
                <div className="relative">
                  <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type="email"
                    id="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    required
                    className={`w-full h-12 pl-12 pr-4 border rounded-lg focus:outline-none transition-colors ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                    }`}
                    placeholder="tu@correo.com"
                  />
                </div>
              </div>

              {/* Password field */}
              <div className="space-y-2">
                <label
                  htmlFor="password"
                  className="block text-[#2d3748]"
                >
                  Contraseña
                </label>
                <div className="relative">
                  <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-5 h-5 text-[#9ca3af]" />
                  <input
                    type={showPassword ? "text" : "password"}
                    id="password"
                    value={password}
                    onChange={(e) =>
                      setPassword(e.target.value)
                    }
                    required
                    className={`w-full h-12 pl-12 pr-12 border rounded-lg focus:outline-none transition-colors ${
                      error
                        ? "border-red-300 focus:border-red-500 focus:ring-2 focus:ring-red-200"
                        : "border-[#9ca3af]/30 focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                    }`}
                    placeholder="••••••••"
                  />
                  <button
                    type="button"
                    onClick={() =>
                      setShowPassword(!showPassword)
                    }
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-[#9ca3af] hover:text-[#2d3748] transition-colors"
                  >
                    {showPassword ? (
                      <EyeOff className="w-5 h-5" />
                    ) : (
                      <Eye className="w-5 h-5" />
                    )}
                  </button>
                </div>
              </div>

              {/* Remember me & Forgot password */}
              <div className="flex items-center justify-between text-sm">
                <label className="flex items-center gap-2 cursor-pointer group">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) =>
                      setRememberMe(e.target.checked)
                    }
                    className="w-4 h-4 rounded border-[#9ca3af]/50 text-[#00a3e0] focus:ring-[#00a3e0] focus:ring-offset-0 cursor-pointer"
                  />
                  <span className="text-[#2d3748] group-hover:text-[#1a365d] transition-colors">
                    Recordar sesión
                  </span>
                </label>
                <a
                  href="#"
                  className="text-[#00a3e0] hover:text-[#0090c9] transition-colors"
                >
                  ¿Olvidaste tu contraseña?
                </a>
              </div>

              {/* Submit button */}
              <button
                type="submit"
                disabled={isLoading}
                className="w-full h-12 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-all duration-200 disabled:opacity-50 disabled:cursor-not-allowed shadow-lg hover:shadow-xl"
              >
                {isLoading ? (
                  <span className="flex items-center justify-center gap-2">
                    <svg
                      className="animate-spin h-5 w-5 text-white"
                      xmlns="http://www.w3.org/2000/svg"
                      fill="none"
                      viewBox="0 0 24 24"
                    >
                      <circle
                        className="opacity-25"
                        cx="12"
                        cy="12"
                        r="10"
                        stroke="currentColor"
                        strokeWidth="4"
                      ></circle>
                      <path
                        className="opacity-75"
                        fill="currentColor"
                        d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"
                      ></path>
                    </svg>
                    Iniciando sesión...
                  </span>
                ) : (
                  "Iniciar Sesión"
                )}
              </button>
            </form>

            {/* Divider */}
            <div className="relative my-8">
              <div className="absolute inset-0 flex items-center">
                <div className="w-full border-t border-[#9ca3af]/20"></div>
              </div>
              <div className="relative flex justify-center text-sm">
                <span className="px-4 bg-white text-[#9ca3af]">
                  o
                </span>
              </div>
            </div>

            {/* Contact link */}
            <div className="text-center text-sm">
              <p className="text-[#2d3748]">
                ¿Necesitas una cuenta empresarial?{" "}
                <a
                  href="#contacto"
                  onClick={onClose}
                  className="text-[#00a3e0] hover:text-[#0090c9] transition-colors"
                >
                  Contáctanos
                </a>
              </p>
            </div>

            {/* Demo credentials - development only */}
            <div className="mt-8 pt-6 border-t border-[#9ca3af]/20">
              <p className="text-xs text-[#9ca3af] text-center mb-3">
                Credenciales de prueba (desarrollo):
              </p>
              <div className="grid gap-2 text-xs">
                <button
                  type="button"
                  onClick={() => {
                    setEmail("superadmin@robles.com");
                    setPassword("super123");
                  }}
                  className="bg-[#f8fafc] hover:bg-[#e6f4f9] p-2 rounded text-left transition-colors"
                >
                  <p className="text-[#2d3748]">
                    <strong className="text-[#1a365d]">
                      SuperAdmin:
                    </strong>{" "}
                    superadmin@robles.com / super123
                  </p>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    setEmail("empresa@robles.com");
                    setPassword("empresa123");
                  }}
                  className="bg-[#f8fafc] hover:bg-[#e6f4f9] p-2 rounded text-left transition-colors"
                >
                  <p className="text-[#2d3748]">
                    <strong className="text-[#1a365d]">
                      Empresa:
                    </strong>{" "}
                    empresa@robles.com / empresa123
                  </p>
                </button>
              </div>
            </div>

            {/* Footer */}
            <div className="mt-8 text-center">
              <p className="text-xs text-[#9ca3af]">
                © 2024 Servicio Robles. Todos los derechos
                reservados.
              </p>
              <p className="text-xs text-[#9ca3af] mt-1">
                Soporte: 662 353-4650
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}