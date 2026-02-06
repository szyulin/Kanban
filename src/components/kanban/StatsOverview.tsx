import { Card, CardContent } from '@/components/ui/card';
import { Progress } from '@/components/ui/progress';
import { cn } from '@/lib/utils';
import type { FactoryStats } from '@/types';
import { 
  Factory, 
  TrendingUp, 
  Target, 
  Gauge,
  CheckCircle2
} from 'lucide-react';

interface StatsOverviewProps {
  stats: FactoryStats;
}

export function StatsOverview({ stats }: StatsOverviewProps) {
  const outputProgress = stats.totalTarget > 0 
    ? (stats.totalOutput / stats.totalTarget) * 100 
    : 0;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
      {/* 总产量卡片 */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Factory className="w-4 h-4" />
              <span className="text-sm">今日总产量</span>
            </div>
            <CheckCircle2 className="w-4 h-4 text-emerald-400" />
          </div>
          <div className="space-y-2">
            <div className="flex items-baseline gap-2">
              <span className="text-2xl font-bold text-slate-100">
                {stats.totalOutput.toLocaleString()}
              </span>
              <span className="text-xs text-slate-500">
                / {stats.totalTarget.toLocaleString()}
              </span>
            </div>
            <Progress value={outputProgress} className="h-1.5" />
            <div className="text-xs text-slate-500 text-right">
              {outputProgress.toFixed(1)}%
            </div>
          </div>
        </CardContent>
      </Card>

      {/* OEE卡片 */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Gauge className="w-4 h-4" />
              <span className="text-sm">整体OEE</span>
            </div>
            <TrendingUp className={cn(
              "w-4 h-4",
              stats.overallOEE >= 85 ? "text-emerald-400" : 
              stats.overallOEE >= 70 ? "text-amber-400" : "text-red-400"
            )} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-3xl font-bold",
              stats.overallOEE >= 85 ? "text-emerald-400" : 
              stats.overallOEE >= 70 ? "text-amber-400" : "text-red-400"
            )}>
              {stats.overallOEE.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500">目标: 85%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {stats.overallOEE >= 85 ? '表现优秀' : stats.overallOEE >= 70 ? '需要改进' : '严重偏低'}
          </div>
        </CardContent>
      </Card>

      {/* 效率卡片 */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-400">
              <Target className="w-4 h-4" />
              <span className="text-sm">整体效率</span>
            </div>
            <TrendingUp className={cn(
              "w-4 h-4",
              stats.overallEfficiency >= 95 ? "text-emerald-400" : 
              stats.overallEfficiency >= 80 ? "text-amber-400" : "text-red-400"
            )} />
          </div>
          <div className="flex items-baseline gap-2">
            <span className={cn(
              "text-3xl font-bold",
              stats.overallEfficiency >= 95 ? "text-emerald-400" : 
              stats.overallEfficiency >= 80 ? "text-amber-400" : "text-red-400"
            )}>
              {stats.overallEfficiency.toFixed(1)}%
            </span>
            <span className="text-xs text-slate-500">目标: 95%</span>
          </div>
          <div className="mt-2 text-xs text-slate-500">
            {stats.overallEfficiency >= 95 ? '表现优秀' : stats.overallEfficiency >= 80 ? '需要改进' : '严重偏低'}
          </div>
        </CardContent>
      </Card>

      {/* 生产线状态卡片 */}
      <Card className="bg-gradient-to-br from-slate-800/80 to-slate-900/80 border-slate-700">
        <CardContent className="p-4">
          <div className="flex items-center justify-between mb-3">
            <div className="flex items-center gap-2 text-slate-400">
              <div className="flex items-center gap-1">
                <div className="w-2 h-2 rounded-full bg-emerald-500" />
                <div className="w-2 h-2 rounded-full bg-amber-500" />
                <div className="w-2 h-2 rounded-full bg-red-500" />
              </div>
              <span className="text-sm">生产线状态</span>
            </div>
          </div>
          <div className="grid grid-cols-2 gap-2">
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
              <span className="text-xs text-slate-400">运行:</span>
              <span className="text-sm font-medium text-emerald-400">{stats.runningLines}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-amber-500" />
              <span className="text-xs text-slate-400">待机:</span>
              <span className="text-sm font-medium text-amber-400">{stats.idleLines}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-red-500" />
              <span className="text-xs text-slate-400">故障:</span>
              <span className="text-sm font-medium text-red-400">{stats.errorLines}</span>
            </div>
            <div className="flex items-center gap-2">
              <div className="w-2 h-2 rounded-full bg-blue-500" />
              <span className="text-xs text-slate-400">维护:</span>
              <span className="text-sm font-medium text-blue-400">{stats.maintenanceLines}</span>
            </div>
          </div>
        </CardContent>
      </Card>
    </div>
  );
}
