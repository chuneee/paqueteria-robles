interface Empresa {
  id: number;
  nombre: string;
  guias: number;
  maxGuias: number;
}

const empresas: Empresa[] = [
  { id: 1, nombre: 'Distribuidora Norte', guias: 245, maxGuias: 245 },
  { id: 2, nombre: 'Comercial López', guias: 189, maxGuias: 245 },
  { id: 3, nombre: 'Farmacia San José', guias: 156, maxGuias: 245 },
  { id: 4, nombre: 'Ferretería Central', guias: 134, maxGuias: 245 },
  { id: 5, nombre: 'Papelería Robles', guias: 98, maxGuias: 245 },
];

export function TopEmpresas() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a365d]">Top 5 Empresas - Noviembre</h2>
      </div>

      <div className="space-y-4">
        {empresas.map((empresa, index) => (
          <div key={empresa.id} className="space-y-2">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="flex items-center justify-center w-6 h-6 rounded-full bg-[#1a365d] text-white text-xs">
                  {index + 1}
                </span>
                <p className="text-sm text-[#2d3748]">{empresa.nombre}</p>
              </div>
              <p className="text-sm text-[#1a365d]">{empresa.guias} guías</p>
            </div>
            <div className="w-full bg-[#f8fafc] rounded-full h-2 overflow-hidden">
              <div
                className="bg-gradient-to-r from-[#1a365d] to-[#00a3e0] h-full rounded-full transition-all duration-300"
                style={{ width: `${(empresa.guias / empresa.maxGuias) * 100}%` }}
              ></div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
