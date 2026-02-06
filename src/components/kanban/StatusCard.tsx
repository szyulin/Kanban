import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { cn } from '@/lib/utils';
import { statusColors, statusText } from '@/data/mockData';
import type { EquipmentStatus } from '@/types';
import { Activity, AlertTriangle, CheckCircle, Clock, Wrench } from 'lucide-react';

interface StatusCardProps {
  title: string;
  count: number;
  status: EquipmentStatus | 'all';
  total?: number;
  icon?: React.ReactNode;
  onClick?: () => void;
  isActive?: boolean;
}

const statusIcons = {
  running: <Activity className="w-5 h-5" />,
  idle: <Clock className="w-5 h-5" />,
  warning: <AlertTriangle className="w-5 h-5" />,
  error: <AlertTriangle className="w-5 h-5" />,
  maintenance: <Wrench className="w-5 h-5" />,
  all: <CheckCircle className="w-5 h-5" />,
};

export function StatusCard({ 
  title, 
  count, 
  status, 
  total, 
  icon,
  onClick,
  isActive 
}: StatusCardProps) {
  const colors = status === 'all' 
    ? { bg: 'bg-slate-500', text: 'text-slate-400', border: 'border-slate-500', light: 'bg-slate-500/10' }
    : statusColors[status];

  return (
    <Card 
      className={cn(
        "cursor-pointer transition-all duration-300 hover:scale-[1.02] hover:shadow-lg",
        isActive && `ring-2 ${colors.border} shadow-lg`
      )}
      onClick={onClick}
    >
      <CardHeader className="pb-2">
        <CardTitle className="text-sm font-medium text-slate-400 flex items-center gap-2">
          <span className={cn("p-1.5 rounded-md", colors.light, colors.text)}>
            {icon || statusIcons[status]}
          </span>
          {title}
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="flex items-baseline gap-2">
          <span className={cn("text-3xl font-bold", colors.text)}>
            {count}
          </span>
          {total !== undefined && total > 0 && (
            <span className="text-sm text-slate-500">
              / {total}
            </span>
          )}
        </div>
        <div className="mt-2 flex items-center gap-2">
          <div className={cn("w-2 h-2 rounded-full animate-pulse", colors.bg)} />
          <span className="text-xs text-slate-500">
            {status === 'all' ? '总计' : statusText[status]}
          </span>
        </div>
      </CardContent>
    </Card>
  );
}
