import { Menu, X } from "lucide-react";
import { useState } from "react";
import logo from "figma:asset/c73559906c3df7b4ffba88ae3d5b24f17c60a27b.png";

interface NavigationProps {
  onLoginClick: () => void;
}

export function Navigation({ onLoginClick }: NavigationProps) {
  const [isMenuOpen, setIsMenuOpen] = useState(false);

  const navLinks = [
    { name: "Inicio", href: "#inicio" },
    { name: "Servicios", href: "#servicios" },
    { name: "Cobertura", href: "#cobertura" },
    { name: "Nosotros", href: "#nosotros" },
    { name: "Contacto", href: "#contacto" },
  ];

  return (
    <nav className="bg-white shadow-md fixed w-full top-0 z-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <div className="flex-shrink-0">
            <img
              src={logo}
              alt="Servicio Robles"
              className="h-24 w-auto"
            />
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.name}
                href={link.href}
                className="text-[#2d3748] hover:text-[#1a365d] transition-colors duration-200"
              >
                {link.name}
              </a>
            ))}
            <button
              onClick={onLoginClick}
              className="bg-[#00a3e0] text-white px-6 py-2.5 rounded-lg hover:bg-[#0090c9] transition-colors duration-200"
            >
              Acceso Clientes
            </button>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsMenuOpen(!isMenuOpen)}
              className="text-[#2d3748] hover:text-[#1a365d]"
            >
              {isMenuOpen ? (
                <X size={28} />
              ) : (
                <Menu size={28} />
              )}
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        {isMenuOpen && (
          <div className="md:hidden pb-4">
            <div className="flex flex-col space-y-3">
              {navLinks.map((link) => (
                <a
                  key={link.name}
                  href={link.href}
                  className="text-[#2d3748] hover:text-[#1a365d] py-2"
                  onClick={() => setIsMenuOpen(false)}
                >
                  {link.name}
                </a>
              ))}
              <button
                onClick={() => {
                  onLoginClick();
                  setIsMenuOpen(false);
                }}
                className="bg-[#00a3e0] text-white px-6 py-2.5 rounded-lg hover:bg-[#0090c9] text-center"
              >
                Acceso Clientes
              </button>
            </div>
          </div>
        )}
      </div>
    </nav>
  );
}