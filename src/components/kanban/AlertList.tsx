import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { ScrollArea } from '@/components/ui/scroll-area';
import { cn } from '@/lib/utils';
import type { Alert } from '@/types';
import { alertLevelColors, alertLevelText } from '@/data/mockData';
import { 
  Bell, 
  CheckCircle2, 
  Info, 
  AlertTriangle, 
  XCircle,
  Clock
} from 'lucide-react';

interface AlertListProps {
  alerts: Alert[];
  onAcknowledge: (alertId: string) => void;
  maxHeight?: number;
}

const alertIcons = {
  info: <Info className="w-4 h-4" />,
  warning: <AlertTriangle className="w-4 h-4" />,
  error: <XCircle className="w-4 h-4" />,
  critical: <XCircle className="w-4 h-4" />,
};

export function AlertList({ alerts, onAcknowledge, maxHeight = 400 }: AlertListProps) {
  const unacknowledgedCount = alerts.filter(a => !a.acknowledged).length;

  return (
    <Card className="h-full">
      <CardHeader className="pb-3">
        <div className="flex items-center justify-between">
          <CardTitle className="text-lg font-semibold flex items-center gap-2">
            <Bell className="w-5 h-5 text-slate-400" />
            实时告警
            {unacknowledgedCount > 0 && (
              <Badge 
                variant="destructive" 
                className="text-xs animate-pulse"
              >
                {unacknowledgedCount}
              </Badge>
            )}
          </CardTitle>
          <div className="text-xs text-slate-500">
            共 {alerts.length} 条
          </div>
        </div>
      </CardHeader>
      
      <CardContent className="p-0">
        <ScrollArea className={cn("px-4", maxHeight && `h-[${maxHeight}px]`)} style={{ maxHeight }}>
          <div className="space-y-2 pb-4">
            {alerts.length === 0 ? (
              <div className="text-center py-8 text-slate-500">
                <CheckCircle2 className="w-12 h-12 mx-auto mb-2 opacity-50" />
                <p>暂无告警</p>
              </div>
            ) : (
              alerts.map((alert) => {
                const colors = alertLevelColors[alert.level];
                return (
                  <div
                    key={alert.id}
                    className={cn(
                      "p-3 rounded-lg border transition-all duration-200",
                      alert.acknowledged 
                        ? "bg-slate-800/30 border-slate-700/50 opacity-60" 
                        : "bg-slate-800/70 border-slate-700 hover:border-slate-600"
                    )}
                  >
                    <div className="flex items-start gap-3">
                      {/* 告警级别图标 */}
                      <div className={cn(
                        "p-1.5 rounded-md flex-shrink-0 mt-0.5",
                        colors.light,
                        colors.text
                      )}>
                        {alertIcons[alert.level]}
                      </div>

                      {/* 告警内容 */}
                      <div className="flex-1 min-w-0">
                        <div className="flex items-center gap-2 mb-1">
                          <Badge 
                            variant="secondary" 
                            className={cn("text-xs px-1.5 py-0", colors.light, colors.text)}
                          >
                            {alertLevelText[alert.level]}
                          </Badge>
                          <span className="text-xs text-slate-500 flex items-center gap-1">
                            <Clock className="w-3 h-3" />
                            {alert.timestamp}
                          </span>
                        </div>
                        
                        <p className={cn(
                          "text-sm font-medium mb-1",
                          alert.acknowledged ? "text-slate-500" : "text-slate-200"
                        )}>
                          {alert.message}
                        </p>
                        
                        <p className="text-xs text-slate-500">
                          来源: {alert.source}
                        </p>
                      </div>

                      {/* 确认按钮 */}
                      {!alert.acknowledged && (
                        <Button
                          variant="ghost"
                          size="sm"
                          className="flex-shrink-0 h-8 w-8 p-0 hover:bg-emerald-500/20 hover:text-emerald-400"
                          onClick={() => onAcknowledge(alert.id)}
                        >
                          <CheckCircle2 className="w-4 h-4" />
                        </Button>
                      )}
                    </div>
                  </div>
                );
              })
            )}
          </div>
        </ScrollArea>
      </CardContent>
    </Card>
  );
}
