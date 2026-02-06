import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Equipment } from '@/types';
import { statusColors, statusText } from '@/data/mockData';
import { 
  Cpu, 
  Thermometer, 
  Activity,
  AlertTriangle
} from 'lucide-react';

interface EquipmentStatusProps {
  equipments: Equipment[];
  maxHeight?: number;
}

export function EquipmentStatusList({ equipments, maxHeight = 300 }: EquipmentStatusProps) {
  // 按状态排序：故障 > 警告 > 运行中 > 其他
  const sortedEquipments = [...equipments].sort((a, b) => {
    const priority = { error: 0, warning: 1, running: 2, idle: 3, maintenance: 4 };
    return priority[a.status] - priority[b.status];
  });

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Cpu className="w-5 h-5 text-slate-400" />
            设备状态监控
          </CardTitle>
          <div className="text-xs text-slate-500">
            共 {equipments.length} 台
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className={cn("px-4", maxHeight && `h-[${maxHeight}px]`)} style={{ maxHeight }}>
          <div className="space-y-2 pb-4">
            {sortedEquipments.map((equip) => {
              const colors = statusColors[equip.status];
              const isTempHigh = equip.temperature > 70;
              const isVibHigh = equip.vibration > 5;

              return (
                <div
                  key={equip.id}
                  className={cn(
                    "p-3 rounded-lg border border-slate-700/50 bg-slate-800/50",
                    "hover:border-slate-600 transition-colors"
                  )}
                >
                  <div className="flex items-center justify-between mb-2">
                    <div className="flex items-center gap-2">
                      <span className="text-sm font-medium text-slate-200">
                        {equip.name}
                      </span>
                      <Badge 
                        variant="secondary" 
                        className={cn("text-xs", colors.light, colors.text)}
                      >
                        {statusText[equip.status]}
                      </Badge>
                    </div>
                    <div className={cn("w-2 h-2 rounded-full", colors.bg)} />
                  </div>

                  <div className="grid grid-cols-3 gap-2 text-xs">
                    {/* 温度 */}
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded",
                      isTempHigh ? "bg-red-500/10 text-red-400" : "bg-slate-700/50 text-slate-400"
                    )}>
                      <Thermometer className="w-3.5 h-3.5" />
                      <span>{equip.temperature.toFixed(1)}°C</span>
                      {isTempHigh && <AlertTriangle className="w-3 h-3" />}
                    </div>

                    {/* 振动 */}
                    <div className={cn(
                      "flex items-center gap-1.5 px-2 py-1 rounded",
                      isVibHigh ? "bg-amber-500/10 text-amber-400" : "bg-slate-700/50 text-slate-400"
                    )}>
                      <Activity className="w-3.5 h-3.5" />
                      <span>{equip.vibration.toFixed(1)}mm/s</span>
                      {isVibHigh && <AlertTriangle className="w-3 h-3" />}
                    </div>

                    {/* 运行时间 */}
                    <div className="flex items-center gap-1.5 px-2 py-1 rounded bg-slate-700/50 text-slate-400">
                      <span className="text-slate-500">运行:</span>
                      <span>{equip.runtime}h</span>
                    </div>
                  </div>

                  {/* 错误信息 */}
                  {equip.lastError && (
                    <div className="mt-2 text-xs text-red-400 flex items-center gap-1.5">
                      <AlertTriangle className="w-3.5 h-3.5" />
                      <span>{equip.lastError}</span>
                      <span className="text-slate-500">({equip.errorTime})</span>
                    </div>
                  )}
                </div>
              );
            })}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
