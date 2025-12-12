import heroImage from 'figma:asset/d9164191c6d78e7f6117a28ef3b0f92d10508fa1.png';

export function HeroSection() {
  return (
    <section id="inicio" className="pt-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative Waves */}
      <div className="absolute inset-0 overflow-hidden">
        <svg className="absolute -top-10 -right-20 w-96 h-96 opacity-10" viewBox="0 0 200 200">
          <path
            fill="#00a3e0"
            d="M45.1,-78.5C58.9,-70.2,70.9,-57.4,78.8,-42.1C86.7,-26.8,90.5,-9,88.8,7.9C87.1,24.8,80,40.8,69.2,53.3C58.4,65.8,44,74.8,28.3,80.1C12.6,85.4,-4.4,87,-20.3,82.8C-36.2,78.6,-51,68.6,-63.7,56C-76.4,43.4,-87,28.2,-90.3,11.5C-93.6,-5.2,-89.6,-23.4,-80.8,-38.5C-72,-53.6,-58.4,-65.6,-43.2,-73.4C-28,-81.2,-11.2,-84.8,4.5,-91.8C20.2,-98.8,31.3,-86.8,45.1,-78.5Z"
            transform="translate(100 100)"
          />
        </svg>
        <svg className="absolute top-40 -left-20 w-80 h-80 opacity-10" viewBox="0 0 200 200">
          <path
            fill="#9ca3af"
            d="M41.3,-72.1C52.9,-64.3,61.3,-51.5,68.4,-37.8C75.5,-24.1,81.3,-9.5,81.4,5.3C81.5,20.1,75.9,35.1,66.8,47.3C57.7,59.5,45.1,68.9,31.2,74.5C17.3,80.1,2.1,81.9,-13.7,80.3C-29.5,78.7,-46,73.7,-59.3,65.1C-72.6,56.5,-82.7,44.3,-87.4,30.2C-92.1,16.1,-91.4,0.1,-86.8,-14.4C-82.2,-28.9,-73.7,-41.9,-62.5,-50.3C-51.3,-58.7,-37.4,-62.5,-24.3,-69.8C-11.2,-77.1,0.9,-87.9,14.1,-90.4C27.3,-92.9,29.7,-79.9,41.3,-72.1Z"
            transform="translate(100 100)"
          />
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-24 lg:py-32 relative">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left Content */}
          <div className="space-y-8">
            <div className="space-y-4">
              <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold text-[#1a365d] leading-tight">
                Tu Paquetería de{' '}
                <span className="text-[#00a3e0] relative inline-block">
                  Confianza
                  <svg className="absolute -bottom-2 left-0 w-full h-3" viewBox="0 0 300 12" fill="none">
                    <path
                      d="M2 10C50 5 100 2 150 5C200 8 250 7 298 10"
                      stroke="#00a3e0"
                      strokeWidth="3"
                      strokeLinecap="round"
                      opacity="0.5"
                    />
                  </svg>
                </span>{' '}
                en Sonora
              </h1>
              <div className="flex items-center gap-3">
                <div className="h-1 w-16 bg-[#00a3e0] rounded-full"></div>
                <p className="text-sm font-semibold text-[#00a3e0] tracking-wide uppercase">
                  Más de 20 años de experiencia
                </p>
              </div>
            </div>
            <p className="text-xl text-[#2d3748] max-w-xl leading-relaxed">
              Envíos seguros y puntuales a todo el estado. Conectando tu negocio con tus clientes de manera confiable.
            </p>
            <div className="flex flex-col sm:flex-row gap-4">
              <a
                href="#contacto"
                className="bg-[#1a365d] text-white px-8 py-4 rounded-lg hover:bg-[#2d4a7c] transition-colors duration-200 text-center"
              >
                Solicitar Cotización
              </a>
              <a
                href="#cobertura"
                className="border-2 border-[#1a365d] text-[#1a365d] px-8 py-4 rounded-lg hover:bg-[#1a365d] hover:text-white transition-colors duration-200 text-center"
              >
                Ver Cobertura
              </a>
            </div>
          </div>

          {/* Right Image */}
          <div className="relative">
            <img
              src={heroImage}
              alt="Camioneta Servicio Robles"
              className="w-full h-auto object-contain"
            />
            {/* Decorative element */}
            <div className="absolute -bottom-6 -right-6 w-32 h-32 bg-[#00a3e0] rounded-full opacity-20 blur-2xl"></div>
          </div>
        </div>
      </div>

      {/* Wave separator */}
      <div className="relative h-16">
        <svg className="absolute bottom-0 w-full h-16" preserveAspectRatio="none" viewBox="0 0 1440 48">
          <path
            fill="#ffffff"
            d="M0,32L60,29.3C120,27,240,21,360,21.3C480,21,600,27,720,26.7C840,27,960,21,1080,18.7C1200,16,1320,16,1380,16L1440,16L1440,48L1380,48C1320,48,1200,48,1080,48C960,48,840,48,720,48C600,48,480,48,360,48C240,48,120,48,60,48L0,48Z"
          ></path>
        </svg>
      </div>
    </section>
  );
}
