import { useState, useMemo } from 'react';
import { 
  Header, 
  StatusCard, 
  ProductionLineCard, 
  AlertList,
  ProductionChart,
  QualityChart,
  EquipmentStatusList,
  StatsOverview 
} from '@/components/kanban';
import { useRealtimeData } from '@/hooks/useRealtimeData';
import type { EquipmentStatus } from '@/types';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { 
  Activity, 
  CheckCircle2, 
  Clock, 
  AlertTriangle, 
  XCircle, 
  Wrench,
  LayoutGrid,
  BarChart3,
  Bell
} from 'lucide-react';

function App() {
  const { 
    productionLines, 
    alerts, 
    factoryStats, 
    equipments,
    lastUpdate, 
    acknowledgeAlert 
  } = useRealtimeData(5000);

  const [statusFilter, setStatusFilter] = useState<EquipmentStatus | 'all'>('all');

  // 根据状态筛选生产线
  const filteredLines = useMemo(() => {
    if (statusFilter === 'all') return productionLines;
    return productionLines.filter(line => line.status === statusFilter);
  }, [productionLines, statusFilter]);

  // 状态卡片数据
  const statusCards = [
    { 
      status: 'all' as const, 
      title: '全部生产线', 
      count: factoryStats.totalLines,
      icon: <LayoutGrid className="w-5 h-5" />
    },
    { 
      status: 'running' as const, 
      title: '运行中', 
      count: factoryStats.runningLines,
      icon: <Activity className="w-5 h-5" />
    },
    { 
      status: 'idle' as const, 
      title: '待机', 
      count: factoryStats.idleLines,
      icon: <Clock className="w-5 h-5" />
    },
    { 
      status: 'warning' as const, 
      title: '警告', 
      count: productionLines.filter(l => l.status === 'warning').length,
      icon: <AlertTriangle className="w-5 h-5" />
    },
    { 
      status: 'error' as const, 
      title: '故障', 
      count: factoryStats.errorLines,
      icon: <XCircle className="w-5 h-5" />
    },
    { 
      status: 'maintenance' as const, 
      title: '维护中', 
      count: factoryStats.maintenanceLines,
      icon: <Wrench className="w-5 h-5" />
    },
  ];

  return (
    <div className="min-h-screen bg-slate-950">
      {/* 头部 */}
      <Header lastUpdate={lastUpdate} />

      {/* 主内容区 */}
      <main className="max-w-[1920px] mx-auto p-4 space-y-4">
        {/* 统计概览 */}
        <StatsOverview stats={factoryStats} />

        {/* 状态筛选卡片 */}
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-3">
          {statusCards.map((card) => (
            <StatusCard
              key={card.status}
              title={card.title}
              count={card.count}
              status={card.status}
              total={card.status === 'all' ? undefined : factoryStats.totalLines}
              icon={card.icon}
              isActive={statusFilter === card.status}
              onClick={() => setStatusFilter(card.status)}
            />
          ))}
        </div>

        {/* 标签页内容 */}
        <Tabs defaultValue="lines" className="space-y-4">
          <TabsList className="bg-slate-800/50 border border-slate-700/50">
            <TabsTrigger value="lines" className="data-[state=active]:bg-slate-700">
              <LayoutGrid className="w-4 h-4 mr-2" />
              生产线监控
            </TabsTrigger>
            <TabsTrigger value="charts" className="data-[state=active]:bg-slate-700">
              <BarChart3 className="w-4 h-4 mr-2" />
              数据分析
            </TabsTrigger>
            <TabsTrigger value="alerts" className="data-[state=active]:bg-slate-700">
              <Bell className="w-4 h-4 mr-2" />
              告警中心
              {alerts.filter(a => !a.acknowledged).length > 0 && (
                <span className="ml-2 px-1.5 py-0.5 text-xs bg-red-500 text-white rounded-full">
                  {alerts.filter(a => !a.acknowledged).length}
                </span>
              )}
            </TabsTrigger>
          </TabsList>

          {/* 生产线监控 */}
          <TabsContent value="lines" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-4">
              {/* 生产线卡片列表 */}
              <div className="lg:col-span-2">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                  {filteredLines.map((line) => (
                    <ProductionLineCard key={line.id} line={line} />
                  ))}
                </div>
                {filteredLines.length === 0 && (
                  <div className="text-center py-12 bg-slate-800/30 rounded-lg border border-slate-700/50">
                    <CheckCircle2 className="w-12 h-12 mx-auto mb-3 text-slate-500" />
                    <p className="text-slate-400">该状态下没有生产线</p>
                  </div>
                )}
              </div>

              {/* 右侧：设备状态 */}
              <div className="space-y-4">
                <EquipmentStatusList equipments={equipments} maxHeight={600} />
              </div>
            </div>
          </TabsContent>

          {/* 数据分析 */}
          <TabsContent value="charts" className="space-y-4">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <ProductionChart />
              <QualityChart />
            </div>
          </TabsContent>

          {/* 告警中心 */}
          <TabsContent value="alerts">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-4">
              <AlertList 
                alerts={alerts} 
                onAcknowledge={acknowledgeAlert}
                maxHeight={500}
              />
              <div className="space-y-4">
                {/* 告警统计 */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">未确认告警</div>
                    <div className="text-2xl font-bold text-amber-400">
                      {alerts.filter(a => !a.acknowledged).length}
                    </div>
                  </div>
                  <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                    <div className="text-sm text-slate-400 mb-1">严重告警</div>
                    <div className="text-2xl font-bold text-red-400">
                      {alerts.filter(a => a.level === 'critical' && !a.acknowledged).length}
                    </div>
                  </div>
                </div>
                
                {/* 告警级别说明 */}
                <div className="bg-slate-800/50 p-4 rounded-lg border border-slate-700/50">
                  <h3 className="text-sm font-medium text-slate-300 mb-3">告警级别说明</h3>
                  <div className="space-y-2 text-sm">
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-blue-500" />
                      <span className="text-slate-400">信息 - 一般性通知</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-amber-500" />
                      <span className="text-slate-400">警告 - 需要关注</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-orange-500" />
                      <span className="text-slate-400">错误 - 需要处理</span>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-red-500" />
                      <span className="text-slate-400">严重 - 立即处理</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </TabsContent>
        </Tabs>
      </main>

      {/* 页脚 */}
      <footer className="border-t border-slate-800 mt-8 py-4">
        <div className="max-w-[1920px] mx-auto px-4 text-center text-xs text-slate-500">
          <p>智能制造工厂 KANBAN 系统 © 2026 | 数据每 5 秒自动更新</p>
        </div>
      </footer>
    </div>
  );
}

export default App;
