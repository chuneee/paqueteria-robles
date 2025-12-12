import { MapPin, Phone, Mail, Clock } from 'lucide-react';
import { useState } from 'react';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    email: '',
    message: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    // Form submission logic would go here
    alert('Mensaje enviado. Nos pondremos en contacto contigo pronto.');
    setFormData({ name: '', phone: '', email: '', message: '' });
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  return (
    <section id="contacto" className="py-20 bg-[#f8fafc] relative overflow-hidden">
      {/* Decorative circles */}
      <div className="absolute top-10 left-10 w-72 h-72 bg-[#00a3e0]/10 rounded-full blur-3xl"></div>
      <div className="absolute bottom-10 right-10 w-72 h-72 bg-[#1a365d]/10 rounded-full blur-3xl"></div>
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        <div className="mb-16 text-center">
          {/* Badge */}
          <div className="inline-flex items-center gap-2 bg-white border-2 border-[#00a3e0] px-5 py-2 rounded-full shadow-md mb-6">
            <Mail className="w-4 h-4 text-[#00a3e0]" />
            <span className="text-sm font-semibold text-[#00a3e0] tracking-wide uppercase">
              Ponte en contacto
            </span>
          </div>
          
          {/* Title */}
          <h2 className="text-5xl md:text-6xl text-[#1a365d] mb-6">
            Contáctanos
          </h2>
          
          {/* Line */}
          <div className="h-1 w-40 mx-auto bg-gradient-to-r from-[#00a3e0] to-[#1a365d] rounded-full mb-6"></div>
          
          {/* Description */}
          <p className="text-xl text-[#2d3748] max-w-2xl mx-auto">
            Estamos aquí para ayudarte con tus envíos
          </p>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Left - Contact Information */}
          <div className="space-y-8">
            <div className="bg-white p-8 rounded-xl shadow-lg">
              <h3 className="text-[#1a365d] mb-6">
                Información de Contacto
              </h3>
              
              <div className="space-y-6">
                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <MapPin className="w-6 h-6 text-[#00a3e0]" />
                  </div>
                  <div>
                    <p className="text-[#2d3748]">
                      Hermosillo, Sonora, México
                    </p>
                    <p className="text-sm text-[#9ca3af]">Sede Principal</p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Phone className="w-6 h-6 text-[#00a3e0]" />
                  </div>
                  <div>
                    <p className="text-[#2d3748]">
                      (662) 353-4650
                    </p>
                    <p className="text-[#2d3748]">
                      (662) 466-2530
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Mail className="w-6 h-6 text-[#00a3e0]" />
                  </div>
                  <div>
                    <p className="text-[#2d3748] break-all">
                      csvlogisticoperaciones@outlook.com
                    </p>
                  </div>
                </div>

                <div className="flex items-start space-x-4">
                  <div className="w-12 h-12 bg-[#00a3e0]/10 rounded-lg flex items-center justify-center flex-shrink-0">
                    <Clock className="w-6 h-6 text-[#00a3e0]" />
                  </div>
                  <div>
                    <p className="text-[#2d3748]">
                      Lunes a Viernes: 8:00 AM - 6:00 PM
                    </p>
                    <p className="text-[#2d3748]">
                      Sábados: 8:00 AM - 2:00 PM
                    </p>
                  </div>
                </div>
              </div>
            </div>

            {/* Map placeholder */}
            <div className="bg-white p-4 rounded-xl shadow-lg">
              <div className="w-full h-64 bg-[#9ca3af]/20 rounded-lg flex items-center justify-center">
                <MapPin className="w-12 h-12 text-[#9ca3af]" />
              </div>
            </div>
          </div>

          {/* Right - Contact Form */}
          <div className="bg-white p-8 rounded-xl shadow-lg">
            <h3 className="text-[#1a365d] mb-6">
              Envíanos un Mensaje
            </h3>
            
            <form onSubmit={handleSubmit} className="space-y-6">
              <div>
                <label htmlFor="name" className="block text-[#2d3748] mb-2">
                  Nombre Completo
                </label>
                <input
                  type="text"
                  id="name"
                  name="name"
                  value={formData.name}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  placeholder="Tu nombre"
                />
              </div>

              <div>
                <label htmlFor="phone" className="block text-[#2d3748] mb-2">
                  Teléfono
                </label>
                <input
                  type="tel"
                  id="phone"
                  name="phone"
                  value={formData.phone}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  placeholder="(662) 123-4567"
                />
              </div>

              <div>
                <label htmlFor="email" className="block text-[#2d3748] mb-2">
                  Correo Electrónico
                </label>
                <input
                  type="email"
                  id="email"
                  name="email"
                  value={formData.email}
                  onChange={handleChange}
                  required
                  className="w-full px-4 py-3 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20"
                  placeholder="tu@email.com"
                />
              </div>

              <div>
                <label htmlFor="message" className="block text-[#2d3748] mb-2">
                  Mensaje
                </label>
                <textarea
                  id="message"
                  name="message"
                  value={formData.message}
                  onChange={handleChange}
                  required
                  rows={5}
                  className="w-full px-4 py-3 border border-[#9ca3af]/30 rounded-lg focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 resize-none"
                  placeholder="Cuéntanos cómo podemos ayudarte..."
                />
              </div>

              <button
                type="submit"
                className="w-full bg-[#00a3e0] text-white px-8 py-4 rounded-lg hover:bg-[#0090c9] transition-colors duration-200"
              >
                Enviar Mensaje
              </button>
            </form>
          </div>
        </div>
      </div>
    </section>
  );
}
