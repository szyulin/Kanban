import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { ProductionLine } from '@/types';
import { statusColors, statusText } from '@/data/mockData';
import { 
  Users, 
  Clock, 
  TrendingUp, 
  Target, 
  Activity,
  Wrench,
  AlertTriangle
} from 'lucide-react';

interface ProductionLineCardProps {
  line: ProductionLine;
}

export function ProductionLineCard({ line }: ProductionLineCardProps) {
  const colors = statusColors[line.status];
  const progressPercent = line.targetOutput > 0 
    ? Math.min(100, (line.currentOutput / line.targetOutput) * 100) 
    : 0;

  return (
    <Card className={cn(
      "overflow-hidden transition-all duration-300 hover:shadow-lg hover:scale-[1.01]",
      "border-l-4",
      colors.border
    )}>
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            {line.name}
            <Badge 
              variant="secondary" 
              className={cn("text-xs", colors.light, colors.text)}
            >
              {line.id}
            </Badge>
          </CardTitle>
          <div className={cn(
            "px-3 py-1 rounded-full text-xs font-medium flex items-center gap-1.5",
            colors.light,
            colors.text
          )}>
            <div className={cn("w-2 h-2 rounded-full animate-pulse", colors.bg)} />
            {statusText[line.status]}
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="space-y-4">
        {/* 产量进度 */}
        <div className="space-y-2">
          <div className="flex items-center justify-between text-sm">
            <span className="text-slate-400 flex items-center gap-1.5">
              <Target className="w-4 h-4" />
              产量进度
            </span>
            <span className={cn("font-medium", colors.text)}>
              {line.currentOutput.toLocaleString()} / {line.targetOutput.toLocaleString()}
            </span>
          </div>
          <Progress 
            value={progressPercent} 
            className="h-2"
          />
          <div className="text-right text-xs text-slate-500">
            {progressPercent.toFixed(1)}%
          </div>
        </div>

        {/* 关键指标网格 */}
        <div className="grid grid-cols-2 gap-3">
          {/* OEE */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Activity className="w-3.5 h-3.5" />
              OEE
            </div>
            <div className={cn(
              "text-xl font-bold",
              line.oee >= 85 ? "text-emerald-400" : 
              line.oee >= 70 ? "text-amber-400" : "text-red-400"
            )}>
              {line.oee.toFixed(1)}%
            </div>
          </div>

          {/* 效率 */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <TrendingUp className="w-3.5 h-3.5" />
              效率
            </div>
            <div className={cn(
              "text-xl font-bold",
              line.efficiency >= 95 ? "text-emerald-400" : 
              line.efficiency >= 80 ? "text-amber-400" : "text-red-400"
            )}>
              {line.efficiency.toFixed(1)}%
            </div>
          </div>

          {/* 运行时间 */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Clock className="w-3.5 h-3.5" />
              运行时间
            </div>
            <div className="text-xl font-bold text-slate-200">
              {line.uptime}h
            </div>
          </div>

          {/* 操作人员 */}
          <div className="bg-slate-800/50 rounded-lg p-3">
            <div className="flex items-center gap-1.5 text-slate-400 text-xs mb-1">
              <Users className="w-3.5 h-3.5" />
              操作人员
            </div>
            <div className="text-xl font-bold text-slate-200">
              {line.operators}人
            </div>
          </div>
        </div>

        {/* 维护信息 */}
        <div className="flex items-center justify-between text-xs text-slate-500 pt-2 border-t border-slate-700/50">
          <div className="flex items-center gap-1.5">
            <Wrench className="w-3.5 h-3.5" />
            <span>上次维护: {line.lastMaintenance}</span>
          </div>
          <div className="flex items-center gap-1.5">
            <AlertTriangle className="w-3.5 h-3.5" />
            <span>下次维护: {line.nextMaintenance}</span>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}
