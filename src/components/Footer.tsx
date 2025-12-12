import { Facebook, Instagram, Phone, Mail, MapPin } from 'lucide-react';
import logo from 'figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png';

export function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-[#1a365d] text-white">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          {/* Column 1 - Logo & Description */}
          <div className="space-y-4">
            <img src={logo} alt="Servicio Robles" className="h-16 w-auto brightness-0 invert" />
            <p className="text-[#e6f4f9] text-sm">
              Tu aliado confiable en paquetería y mensajería en todo Sonora.
            </p>
            <div className="flex space-x-4">
              <a
                href="#facebook"
                className="w-10 h-10 bg-[#00a3e0]/20 rounded-full flex items-center justify-center hover:bg-[#00a3e0] transition-colors duration-200"
              >
                <Facebook className="w-5 h-5" />
              </a>
              <a
                href="#instagram"
                className="w-10 h-10 bg-[#00a3e0]/20 rounded-full flex items-center justify-center hover:bg-[#00a3e0] transition-colors duration-200"
              >
                <Instagram className="w-5 h-5" />
              </a>
            </div>
          </div>

          {/* Column 2 - Quick Links */}
          <div>
            <h4 className="mb-4">Enlaces Rápidos</h4>
            <ul className="space-y-2">
              <li>
                <a href="#inicio" className="text-[#e6f4f9] hover:text-[#00a3e0] transition-colors duration-200">
                  Inicio
                </a>
              </li>
              <li>
                <a href="#servicios" className="text-[#e6f4f9] hover:text-[#00a3e0] transition-colors duration-200">
                  Servicios
                </a>
              </li>
              <li>
                <a href="#cobertura" className="text-[#e6f4f9] hover:text-[#00a3e0] transition-colors duration-200">
                  Cobertura
                </a>
              </li>
              <li>
                <a href="#contacto" className="text-[#e6f4f9] hover:text-[#00a3e0] transition-colors duration-200">
                  Contacto
                </a>
              </li>
              <li>
                <a href="#acceso-clientes" className="text-[#00a3e0] hover:text-white transition-colors duration-200">
                  Acceso Clientes
                </a>
              </li>
            </ul>
          </div>

          {/* Column 3 - Services */}
          <div>
            <h4 className="mb-4">Servicios</h4>
            <ul className="space-y-2">
              <li className="text-[#e6f4f9]">Mensajería</li>
              <li className="text-[#e6f4f9]">Paquetería</li>
              <li className="text-[#e6f4f9]">Carga y Fletes</li>
              <li className="text-[#e6f4f9]">Guías Prepagadas</li>
            </ul>
          </div>

          {/* Column 4 - Contact */}
          <div>
            <h4 className="mb-4">Contacto</h4>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <Phone className="w-5 h-5 text-[#00a3e0] flex-shrink-0 mt-0.5" />
                <div className="text-[#e6f4f9] text-sm">
                  <p>(662) 353-4650</p>
                  <p>(662) 466-2530</p>
                </div>
              </li>
              <li className="flex items-start space-x-2">
                <Mail className="w-5 h-5 text-[#00a3e0] flex-shrink-0 mt-0.5" />
                <p className="text-[#e6f4f9] text-sm break-all">
                  csvlogisticoperaciones@outlook.com
                </p>
              </li>
              <li className="flex items-start space-x-2">
                <MapPin className="w-5 h-5 text-[#00a3e0] flex-shrink-0 mt-0.5" />
                <p className="text-[#e6f4f9] text-sm">
                  Hermosillo, Sonora, México
                </p>
              </li>
            </ul>
          </div>
        </div>

        {/* Divider */}
        <div className="border-t border-[#00a3e0]/20 pt-8">
          <p className="text-center text-[#e6f4f9] text-sm">
            © {currentYear} Servicio Robles - Paquetería de Confianza. Todos los derechos reservados.
          </p>
        </div>
      </div>
    </footer>
  );
}
