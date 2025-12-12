import { useState } from 'react';
import { Users, ChevronDown, Check } from 'lucide-react';

interface Cliente {
  id: number;
  razonSocial: string;
  contacto: string;
  departamento: string;
  calle: string;
  numero: string;
  colonia: string;
  codigoPostal: string;
  ciudad: string;
  estado: string;
  pais: string;
  telefono: string;
  notas?: string;
}

interface SeleccionarClienteDropdownProps {
  clientes: Cliente[];
  selectedCliente: Cliente | null;
  onSelect: (cliente: Cliente | null) => void;
}

export function SeleccionarClienteDropdown({ 
  clientes, 
  selectedCliente, 
  onSelect 
}: SeleccionarClienteDropdownProps) {
  const [isOpen, setIsOpen] = useState(false);

  const handleSelect = (cliente: Cliente | null) => {
    onSelect(cliente);
    setIsOpen(false);
  };

  return (
    <div className="relative">
      <label className="block text-sm text-[#2d3748] mb-2">
        Seleccionar cliente frecuente
      </label>
      
      <button
        type="button"
        onClick={() => setIsOpen(!isOpen)}
        className="w-full px-4 py-2.5 bg-white border border-[#9ca3af]/30 rounded-lg text-left flex items-center justify-between hover:border-[#00a3e0] focus:outline-none focus:border-[#00a3e0] focus:ring-2 focus:ring-[#00a3e0]/20 transition-all"
      >
        <div className="flex items-center gap-2">
          <Users className="w-5 h-5 text-[#9ca3af]" />
          <span className={selectedCliente ? 'text-[#2d3748]' : 'text-[#9ca3af]'}>
            {selectedCliente ? selectedCliente.razonSocial : 'Seleccionar un cliente...'}
          </span>
        </div>
        <ChevronDown className={`w-5 h-5 text-[#9ca3af] transition-transform ${isOpen ? 'rotate-180' : ''}`} />
      </button>

      {isOpen && (
        <>
          {/* Overlay */}
          <div 
            className="fixed inset-0 z-10" 
            onClick={() => setIsOpen(false)}
          />
          
          {/* Dropdown */}
          <div className="absolute z-20 mt-2 w-full bg-white border border-[#9ca3af]/30 rounded-lg shadow-xl max-h-64 overflow-y-auto">
            <div className="p-2">
              {/* Opción: Manual */}
              <button
                type="button"
                onClick={() => handleSelect(null)}
                className={`w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-[#f8fafc] transition-colors flex items-center justify-between ${
                  !selectedCliente ? 'bg-[#00a3e0]/10 text-[#00a3e0]' : 'text-[#2d3748]'
                }`}
              >
                <span>Llenar manualmente</span>
                {!selectedCliente && <Check className="w-4 h-4" />}
              </button>

              {/* Divider */}
              {clientes.length > 0 && (
                <div className="my-2 border-t border-[#9ca3af]/20" />
              )}

              {/* Lista de clientes */}
              {clientes.map((cliente) => (
                <button
                  key={cliente.id}
                  type="button"
                  onClick={() => handleSelect(cliente)}
                  className={`w-full px-3 py-2 rounded-lg text-left text-sm hover:bg-[#f8fafc] transition-colors ${
                    selectedCliente?.id === cliente.id ? 'bg-[#00a3e0]/10' : ''
                  }`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <p className={`${
                        selectedCliente?.id === cliente.id ? 'text-[#00a3e0]' : 'text-[#2d3748]'
                      }`}>
                        {cliente.razonSocial}
                      </p>
                      <p className="text-xs text-[#9ca3af]">
                        {cliente.contacto} – {cliente.ciudad}, {cliente.estado}
                      </p>
                    </div>
                    {selectedCliente?.id === cliente.id && (
                      <Check className="w-4 h-4 text-[#00a3e0]" />
                    )}
                  </div>
                </button>
              ))}

              {clientes.length === 0 && (
                <div className="px-3 py-4 text-center text-sm text-[#9ca3af]">
                  No hay clientes guardados
                </div>
              )}
            </div>
          </div>
        </>
      )}
    </div>
  );
}
