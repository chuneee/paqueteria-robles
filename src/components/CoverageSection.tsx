import { MapPin } from 'lucide-react';

export function CoverageSection() {
  const cities = [
    { name: 'Hermosillo', isMain: true },
    { name: 'Nogales', isMain: false },
    { name: 'Ciudad Obregón', isMain: false },
    { name: 'Guaymas', isMain: false },
    { name: 'Navojoa', isMain: false },
    { name: 'Caborca', isMain: false },
    { name: 'San Luis Río Colorado', isMain: false },
    { name: 'Puerto Peñasco', isMain: false },
    { name: 'Agua Prieta', isMain: false },
  ];

  return (
    <section id="cobertura" className="py-20 bg-gradient-to-br from-[#f8fafc] to-[#e6f4f9] relative overflow-hidden">
      {/* Decorative waves */}
      <div className="absolute top-0 left-0 w-full h-32 opacity-20">
        <svg className="w-full h-full" preserveAspectRatio="none" viewBox="0 0 1440 120">
          <path
            fill="#00a3e0"
            d="M0,64L48,69.3C96,75,192,85,288,80C384,75,480,53,576,48C672,43,768,53,864,58.7C960,64,1056,64,1152,58.7C1248,53,1344,43,1392,37.3L1440,32L1440,0L1392,0C1344,0,1248,0,1152,0C1056,0,960,0,864,0C768,0,672,0,576,0C480,0,384,0,288,0C192,0,96,0,48,0L0,0Z"
          ></path>
        </svg>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#00a3e0] px-5 py-2 rounded-full shadow-md mb-6">
            <MapPin className="w-4 h-4 text-[#00a3e0]" />
            <span className="text-sm font-semibold text-[#00a3e0] tracking-wide uppercase">
              Alcance estatal
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl text-[#1a365d] mb-6">
            Cobertura en Todo Sonora
          </h2>
          
          {/* Line */}
          <div className="h-1 w-64 mx-auto bg-gradient-to-r from-[#00a3e0] to-[#1a365d] rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-xl text-[#2d3748] max-w-2xl mx-auto">
            Sede principal en Hermosillo con rutas a todo el estado
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12 items-center">
          {/* Left - Map illustration */}
          <div className="relative">
            <div className="bg-white p-8 rounded-2xl shadow-xl">
              <img
                src="https://images.unsplash.com/photo-1573552991725-c7b115591d04?crop=entropy&cs=tinysrgb&fit=max&fm=jpg&ixid=M3w3Nzg4Nzd8MHwxfHNlYXJjaHwxfHxsb2dpc3RpY3MlMjB3YXJlaG91c2UlMjBib3hlc3xlbnwxfHx8fDE3NjQ0MzM5MjR8MA&ixlib=rb-4.1.0&q=80&w=1080&utm_source=figma&utm_medium=referral"
                alt="Cobertura Sonora"
                className="w-full h-96 object-cover rounded-xl"
              />
              <div className="absolute -bottom-4 -right-4 bg-[#00a3e0] text-white px-6 py-3 rounded-lg shadow-lg">
                <p className="text-sm">
                  +{cities.length} ciudades
                </p>
              </div>
            </div>
          </div>

          {/* Right - Cities list */}
          <div className="space-y-6">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {cities.map((city, index) => (
                <div
                  key={index}
                  className={`flex items-center space-x-3 p-4 rounded-lg ${
                    city.isMain
                      ? 'bg-[#1a365d] text-white shadow-lg'
                      : 'bg-white shadow-md hover:shadow-lg transition-shadow duration-200'
                  }`}
                >
                  <div
                    className={`flex-shrink-0 w-10 h-10 rounded-full flex items-center justify-center ${
                      city.isMain ? 'bg-[#00a3e0]' : 'bg-[#00a3e0]/10'
                    }`}
                  >
                    <MapPin
                      className={`w-5 h-5 ${
                        city.isMain ? 'text-white' : 'text-[#00a3e0]'
                      }`}
                    />
                  </div>
                  <div>
                    <p className={city.isMain ? 'text-white' : 'text-[#2d3748]'}>
                      {city.name}
                    </p>
                    {city.isMain && (
                      <span className="text-xs text-[#00a3e0]">
                        Sede Principal
                      </span>
                    )}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
