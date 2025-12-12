import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer } from 'recharts';

const data = [
  { day: 'Lun', guias: 85 },
  { day: 'Mar', guias: 92 },
  { day: 'Mié', guias: 78 },
  { day: 'Jue', guias: 110 },
  { day: 'Vie', guias: 127 },
  { day: 'Sáb', guias: 65 },
  { day: 'Dom', guias: 45 },
];

export function GuiasChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a365d]">Guías Generadas - Últimos 7 días</h2>
        <select className="text-sm border border-[#9ca3af]/30 rounded-lg px-3 py-1.5 text-[#2d3748] focus:outline-none focus:border-[#00a3e0]">
          <option>Esta semana</option>
          <option>Semana pasada</option>
          <option>Este mes</option>
        </select>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <BarChart data={data}>
          <CartesianGrid strokeDasharray="3 3" stroke="#f0f0f0" />
          <XAxis 
            dataKey="day" 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <YAxis 
            tick={{ fill: '#9ca3af', fontSize: 12 }}
            axisLine={{ stroke: '#e5e7eb' }}
          />
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            cursor={{ fill: '#f8fafc' }}
          />
          <Bar dataKey="guias" fill="#1a365d" radius={[8, 8, 0, 0]} />
        </BarChart>
      </ResponsiveContainer>
    </div>
  );
}
