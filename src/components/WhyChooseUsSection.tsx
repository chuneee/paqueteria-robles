import { Shield, Clock, Search, Headphones } from 'lucide-react';

export function WhyChooseUsSection() {
  const benefits = [
    {
      icon: Shield,
      title: 'Confianza',
      description: 'Más de 20 años de experiencia en el ramo de mensajería y paquetería en Sonora.',
    },
    {
      icon: Clock,
      title: 'Puntualidad',
      description: 'Entregas en tiempo y forma. Cumplimos nuestros compromisos con cada cliente.',
    },
    {
      icon: Search,
      title: 'Seguimiento',
      description: 'Rastrea tus envíos en todo momento con nuestro sistema de rastreo en línea.',
    },
    {
      icon: Headphones,
      title: 'Atención Personalizada',
      description: 'Servicio al cliente dedicado para resolver todas tus dudas y necesidades.',
    },
  ];

  return (
    <section id="nosotros" className="py-20 bg-white relative overflow-hidden">
      {/* Decorative background elements */}
      <div className="absolute top-20 right-0 w-96 h-96 bg-[#00a3e0]/5 rounded-full blur-3xl"></div>
      <div className="absolute bottom-20 left-0 w-96 h-96 bg-[#1a365d]/5 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#00a3e0] px-5 py-2 rounded-full shadow-md mb-6">
            <Shield className="w-4 h-4 text-[#00a3e0]" />
            <span className="text-sm font-semibold text-[#00a3e0] tracking-wide uppercase">
              Nuestros Valores
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl text-[#1a365d] mb-6">
            ¿Por Qué Elegir <span className="text-[#00a3e0]">Servicio Robles</span>?
          </h2>
          
          {/* Line */}
          <div className="h-1 w-56 mx-auto bg-gradient-to-r from-[#00a3e0] to-[#1a365d] rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-xl text-[#2d3748] max-w-2xl mx-auto">
            Tu aliado confiable en logística y mensajería
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-8">
          {benefits.map((benefit, index) => {
            const Icon = benefit.icon;
            return (
              <div
                key={index}
                className="text-center space-y-4 p-6 rounded-xl hover:bg-[#f8fafc] transition-colors duration-300"
              >
                <div className="inline-flex items-center justify-center w-20 h-20 bg-[#00a3e0]/10 rounded-full">
                  <Icon className="w-10 h-10 text-[#00a3e0]" />
                </div>
                <h3 className="text-[#1a365d]">
                  {benefit.title}
                </h3>
                <p className="text-[#2d3748]">
                  {benefit.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </section>
  );
}
