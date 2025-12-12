import { LucideIcon } from 'lucide-react';

interface MetricCardProps {
  icon: LucideIcon;
  iconColor: string;
  title: string;
  value: string;
  subtitle?: string;
  trend?: {
    value: string;
    isPositive: boolean;
  };
  badge?: boolean;
}

export function MetricCard({ icon: Icon, iconColor, title, value, subtitle, trend, badge }: MetricCardProps) {
  return (
    <div className="bg-white rounded-xl p-6 shadow-sm hover:shadow-md transition-shadow duration-200 mt-[20px] mr-[0px] mb-[0px] ml-[0px]">
      <div className="flex items-start justify-between mb-4">
        <div className={`w-12 h-12 rounded-full flex items-center justify-center ${iconColor}`}>
          <Icon className="w-6 h-6 text-white" />
        </div>
        {badge && (
          <span className="bg-[#e53e3e] text-white text-xs px-2 py-1 rounded-full">
            Alerta
          </span>
        )}
      </div>
      
      <div className="space-y-1">
        <p className="text-3xl text-[#1a365d]">{value}</p>
        {subtitle && (
          <p className="text-xs text-[#9ca3af]">{subtitle}</p>
        )}
        <p className="text-sm text-[#2d3748]">{title}</p>
        {trend && (
          <p className={`text-xs flex items-center gap-1 mt-2 ${
            trend.isPositive ? 'text-[#38a169]' : 'text-[#e53e3e]'
          }`}>
            {trend.isPositive ? '↑' : '↓'} {trend.value}
          </p>
        )}
      </div>
    </div>
  );
}
