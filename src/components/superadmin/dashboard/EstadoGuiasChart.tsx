import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';

const data = [
  { name: 'Entregadas', value: 65, color: '#38a169' },
  { name: 'En tránsito', value: 20, color: '#00a3e0' },
  { name: 'Recolectadas', value: 10, color: '#d69e2e' },
  { name: 'Generadas', value: 5, color: '#9ca3af' },
];

export function EstadoGuiasChart() {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-lg text-[#1a365d]">Estado de Guías - Este Mes</h2>
      </div>
      
      <ResponsiveContainer width="100%" height={280}>
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={60}
            outerRadius={100}
            paddingAngle={5}
            dataKey="value"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip 
            contentStyle={{ 
              backgroundColor: '#fff', 
              border: '1px solid #e5e7eb',
              borderRadius: '8px',
              fontSize: '12px'
            }}
            formatter={(value) => `${value}%`}
          />
          <Legend 
            verticalAlign="bottom" 
            height={36}
            iconType="circle"
            formatter={(value, entry: any) => (
              <span className="text-sm text-[#2d3748]">
                {value} ({entry.payload.value}%)
              </span>
            )}
          />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
