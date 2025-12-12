import { LucideIcon } from 'lucide-react';

interface EmptyStateProps {
  icon: LucideIcon;
  title: string;
  description: string;
  action?: {
    label: string;
    onClick: () => void;
  };
}

export function EmptyState({ icon: Icon, title, description, action }: EmptyStateProps) {
  return (
    <div className="bg-white rounded-xl shadow-sm p-12 text-center">
      <div className="flex justify-center mb-6">
        <div className="w-20 h-20 rounded-full bg-[#f8fafc] flex items-center justify-center">
          <Icon className="w-10 h-10 text-[#9ca3af]" />
        </div>
      </div>
      <h3 className="text-lg text-[#1a365d] mb-2">{title}</h3>
      <p className="text-sm text-[#9ca3af] mb-6">{description}</p>
      {action && (
        <button
          onClick={action.onClick}
          className="px-6 py-2.5 bg-[#1a365d] text-white rounded-lg hover:bg-[#2d4a7c] transition-colors"
        >
          {action.label}
        </button>
      )}
    </div>
  );
}
