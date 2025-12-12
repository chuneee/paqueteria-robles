import { Package, FileText, Truck, CreditCard } from 'lucide-react';

export function ServicesSection() {
  const services = [
    {
      icon: FileText,
      title: 'Mensajería',
      description: 'Documentos y paquetes pequeños con entrega rápida y segura en todo Sonora.',
    },
    {
      icon: Package,
      title: 'Paquetería',
      description: 'Envío de paquetes medianos con seguimiento en tiempo real y garantía de entrega.',
    },
    {
      icon: Truck,
      title: 'Carga y Fletes',
      description: 'Transporte de envíos grandes y mercancía con unidades especializadas.',
    },
    {
      icon: CreditCard,
      title: 'Guías Prepagadas',
      description: 'Sistema de guías para empresas con envíos frecuentes y tarifas preferenciales.',
    },
  ];

  return (
    <section id="servicios" className="py-20 bg-white relative">
      {/* Decorative top border */}
      <div className="absolute top-0 left-0 right-0 h-1 bg-gradient-to-r from-transparent via-[#00a3e0] to-transparent"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#00a3e0] px-5 py-2 rounded-full shadow-md mb-6">
            <Package className="w-4 h-4 text-[#00a3e0]" />
            <span className="text-sm font-semibold text-[#00a3e0] tracking-wide uppercase">
              Lo que ofrecemos
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl text-[#1a365d] mb-6">
            Nuestros Servicios
          </h2>
          
          {/* Line */}
          <div className="h-1 w-48 mx-auto bg-gradient-to-r from-[#00a3e0] to-[#1a365d] rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-xl text-[#2d3748] max-w-2xl mx-auto">
            Soluciones de envío para cada necesidad
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <div
                key={index}
                className="bg-white p-8 rounded-xl shadow-lg hover:shadow-xl transition-shadow duration-300 border border-gray-100"
              >
                <div className="w-16 h-16 bg-[#00a3e0]/10 rounded-full flex items-center justify-center mb-6">
                  <Icon className="w-8 h-8 text-[#00a3e0]" />
                </div>
                <h3 className="text-[#1a365d] mb-3">
                  {service.title}
                </h3>
                <p className="text-[#2d3748]">
                  {service.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
