import { cn } from '@/lib/utils';
import { Factory, Clock, RefreshCw } from 'lucide-react';

interface HeaderProps {
  lastUpdate: Date;
  isRealtime?: boolean;
}

export function Header({ lastUpdate, isRealtime = true }: HeaderProps) {
  const formatTime = (date: Date) => {
    return date.toLocaleString('zh-CN', {
      year: 'numeric',
      month: '2-digit',
      day: '2-digit',
      hour: '2-digit',
      minute: '2-digit',
      second: '2-digit',
    });
  };

  return (
    <header className="bg-slate-900/80 backdrop-blur-md border-b border-slate-700/50 sticky top-0 z-50">
      <div className="max-w-[1920px] mx-auto px-4 py-3">
        <div className="flex items-center justify-between">
          {/* 左侧：标题和工厂信息 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2 bg-gradient-to-br from-blue-500 to-blue-600 rounded-lg shadow-lg shadow-blue-500/20">
                <Factory className="w-6 h-6 text-white" />
              </div>
              <div>
                <h1 className="text-xl font-bold bg-gradient-to-r from-slate-100 to-slate-300 bg-clip-text text-transparent">
                  智能制造工厂 KANBAN
                </h1>
                <p className="text-xs text-slate-500">
                  Smart Manufacturing Dashboard
                </p>
              </div>
            </div>
            
            <div className="hidden md:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-full border border-slate-700/50">
              <div className={cn(
                "w-2 h-2 rounded-full animate-pulse",
                isRealtime ? "bg-emerald-500" : "bg-amber-500"
              )} />
              <span className="text-xs text-slate-400">
                {isRealtime ? '实时数据' : '数据同步中'}
              </span>
            </div>
          </div>

          {/* 右侧：时间信息 */}
          <div className="flex items-center gap-4">
            <div className="flex items-center gap-2 text-slate-400">
              <RefreshCw className={cn(
                "w-4 h-4",
                isRealtime && "animate-spin"
              )} style={{ animationDuration: '3s' }} />
              <span className="text-xs">
                最后更新: {formatTime(lastUpdate)}
              </span>
            </div>
            
            <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-slate-800/50 rounded-lg border border-slate-700/50">
              <Clock className="w-4 h-4 text-blue-400" />
              <span className="text-sm font-medium text-slate-200">
                {new Date().toLocaleTimeString('zh-CN', { hour: '2-digit', minute: '2-digit' })}
              </span>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
}
