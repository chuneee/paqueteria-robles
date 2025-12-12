import { CheckCircle2, CreditCard } from 'lucide-react';

export function BusinessSection() {
  const benefits = [
    'Precios preferenciales para envíos frecuentes',
    'Control total de tus envíos desde plataforma web',
    'Facturación simplificada y centralizada',
    'Plataforma web exclusiva para empresas',
  ];

  return (
    <section className="py-20 bg-[#1a365d] relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute bottom-0 left-0 w-full h-32 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path
            fill="#00a3e0"
            d="M0,64L48,58.7C96,53,192,43,288,48C384,53,480,75,576,80C672,85,768,75,864,69.3C960,64,1056,64,1152,69.3C1248,75,1344,85,1392,90.7L1440,96L1440,120L1392,120C1344,120,1248,120,1152,120C1056,120,960,120,864,120C768,120,672,120,576,120C480,120,384,120,288,120C192,120,96,120,48,120L0,120Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Content */}
          <div className="space-y-8">
            <div>
              {/* Badge */}
              <div className="inline-flex items-center gap-2 bg-white/10 backdrop-blur-sm border-2 border-[#00a3e0] px-5 py-2 rounded-full shadow-lg mb-6">
                <CreditCard className="w-4 h-4 text-[#00a3e0]" />
                <span className="text-sm font-semibold text-white tracking-wide uppercase">
                  Solución Empresarial
                </span>
              </div>
              
              {/* Title */}
              <h2 className="text-white mb-6 text-4xl md:text-5xl leading-tight">
                ¿Tienes un Negocio con <span className="text-[#00a3e0]">Envíos Frecuentes</span>?
              </h2>
              
              {/* Line */}
              <div className="w-32 h-1 bg-[#00a3e0] rounded-full mb-6"></div>
              
              {/* Description */}
              <p className="text-xl text-[#e6f4f9]">
                Conoce nuestro sistema de Guías Prepagadas con precios especiales para empresas
              </p>
            </div>

            <div className="space-y-4">
              {benefits.map((benefit, index) => (
                <div key={index} className="flex items-start space-x-3">
                  <CheckCircle2 className="w-6 h-6 text-[#00a3e0] flex-shrink-0 mt-1" />
                  <p className="text-white">
                    {benefit}
                  </p>
                </div>
              ))}
            </div>

            <div>
              <a
                href="#contacto"
                className="inline-block bg-white text-[#1a365d] px-8 py-4 rounded-lg hover:bg-[#e6f4f9] transition-colors duration-200"
              >
                Solicitar Información
              </a>
            </div>
          </div>

          {/* Right - Image */}
          <div className="relative">
            <div className="rounded-2xl overflow-hidden shadow-2xl">
              <img
                src="https://images.unsplash.com/photo-1762851452423-34e7cf452780?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxkZWxpdmVyeSUyMHNlcnZpY2UlMjBwcm9mZXNzaW9uYWx8ZW58MXx8fHwxNzY0NDM3NzYzfDA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Servicio empresarial"
                className="w-full h-96 object-cover"
              />
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
