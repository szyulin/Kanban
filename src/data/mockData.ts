import type { ProductionLine, Equipment, ProductionDataPoint, Alert, QualityData, FactoryStats } from '@/types';

// 生产线数据
export const productionLines: ProductionLine[] = [
  {
    id: 'L001',
    name: '装配线 A',
    status: 'running',
    currentOutput: 1250,
    targetOutput: 1300,
    efficiency: 96.2,
    oee: 85.5,
    uptime: 168,
    lastMaintenance: '2026-01-20',
    nextMaintenance: '2026-02-10',
    operators: 8,
  },
  {
    id: 'L002',
    name: '装配线 B',
    status: 'running',
    currentOutput: 1180,
    targetOutput: 1200,
    efficiency: 98.3,
    oee: 88.2,
    uptime: 192,
    lastMaintenance: '2026-01-15',
    nextMaintenance: '2026-02-05',
    operators: 8,
  },
  {
    id: 'L003',
    name: '注塑线 C',
    status: 'warning',
    currentOutput: 850,
    targetOutput: 1000,
    efficiency: 85.0,
    oee: 72.3,
    uptime: 120,
    lastMaintenance: '2026-01-25',
    nextMaintenance: '2026-02-08',
    operators: 6,
  },
  {
    id: 'L004',
    name: '冲压线 D',
    status: 'running',
    currentOutput: 2100,
    targetOutput: 2000,
    efficiency: 105.0,
    oee: 92.1,
    uptime: 216,
    lastMaintenance: '2026-01-10',
    nextMaintenance: '2026-02-01',
    operators: 10,
  },
  {
    id: 'L005',
    name: '喷涂线 E',
    status: 'maintenance',
    currentOutput: 0,
    targetOutput: 800,
    efficiency: 0,
    oee: 0,
    uptime: 0,
    lastMaintenance: '2026-02-04',
    nextMaintenance: '2026-02-06',
    operators: 0,
  },
  {
    id: 'L006',
    name: '包装线 F',
    status: 'idle',
    currentOutput: 0,
    targetOutput: 1500,
    efficiency: 0,
    oee: 0,
    uptime: 48,
    lastMaintenance: '2026-01-28',
    nextMaintenance: '2026-02-15',
    operators: 4,
  },
];

// 设备数据
export const equipments: Equipment[] = [
  { id: 'E001', name: '机器人臂 #1', lineId: 'L001', status: 'running', temperature: 45, vibration: 2.1, runtime: 168 },
  { id: 'E002', name: '机器人臂 #2', lineId: 'L001', status: 'running', temperature: 42, vibration: 1.8, runtime: 168 },
  { id: 'E003', name: '传送带 A1', lineId: 'L001', status: 'running', temperature: 38, vibration: 3.2, runtime: 168 },
  { id: 'E004', name: '注塑机 #1', lineId: 'L003', status: 'warning', temperature: 78, vibration: 5.5, runtime: 120, lastError: '温度过高', errorTime: '2026-02-04 09:30' },
  { id: 'E005', name: '注塑机 #2', lineId: 'L003', status: 'running', temperature: 65, vibration: 3.8, runtime: 120 },
  { id: 'E006', name: '冲压机 #1', lineId: 'L004', status: 'running', temperature: 55, vibration: 4.2, runtime: 216 },
  { id: 'E007', name: '冲压机 #2', lineId: 'L004', status: 'running', temperature: 52, vibration: 3.9, runtime: 216 },
  { id: 'E008', name: '喷涂机器人', lineId: 'L005', status: 'maintenance', temperature: 25, vibration: 0, runtime: 0 },
  { id: 'E009', name: '包装机 #1', lineId: 'L006', status: 'idle', temperature: 30, vibration: 0.5, runtime: 48 },
  { id: 'E010', name: '包装机 #2', lineId: 'L006', status: 'idle', temperature: 28, vibration: 0.3, runtime: 48 },
];

// 生产数据（24小时）
export const productionData: ProductionDataPoint[] = [
  { time: '00:00', planned: 800, actual: 780, defect: 12 },
  { time: '01:00', planned: 800, actual: 795, defect: 8 },
  { time: '02:00', planned: 800, actual: 810, defect: 10 },
  { time: '03:00', planned: 800, actual: 805, defect: 9 },
  { time: '04:00', planned: 800, actual: 790, defect: 11 },
  { time: '05:00', planned: 800, actual: 800, defect: 7 },
  { time: '06:00', planned: 1000, actual: 980, defect: 15 },
  { time: '07:00', planned: 1000, actual: 1020, defect: 12 },
  { time: '08:00', planned: 1200, actual: 1150, defect: 18 },
  { time: '09:00', planned: 1200, actual: 1180, defect: 14 },
  { time: '10:00', planned: 1200, actual: 1210, defect: 16 },
  { time: '11:00', planned: 1200, actual: 1195, defect: 13 },
  { time: '12:00', planned: 1000, actual: 980, defect: 10 },
  { time: '13:00', planned: 1200, actual: 1220, defect: 15 },
  { time: '14:00', planned: 1200, actual: 1205, defect: 12 },
  { time: '15:00', planned: 1200, actual: 1180, defect: 14 },
  { time: '16:00', planned: 1200, actual: 1195, defect: 11 },
  { time: '17:00', planned: 1000, actual: 990, defect: 9 },
  { time: '18:00', planned: 800, actual: 785, defect: 8 },
  { time: '19:00', planned: 800, actual: 800, defect: 10 },
  { time: '20:00', planned: 800, actual: 810, defect: 7 },
  { time: '21:00', planned: 800, actual: 795, defect: 9 },
  { time: '22:00', planned: 800, actual: 790, defect: 8 },
  { time: '23:00', planned: 800, actual: 785, defect: 6 },
];

// 告警数据
export const alerts: Alert[] = [
  { id: 'A001', level: 'warning', message: '注塑机 #1 温度异常升高', source: 'L003-注塑线 C', timestamp: '2026-02-04 09:30', acknowledged: false },
  { id: 'A002', level: 'info', message: '喷涂线 E 维护计划开始', source: 'L005-喷涂线 E', timestamp: '2026-02-04 08:00', acknowledged: true },
  { id: 'A003', level: 'error', message: '包装线 F 原料不足', source: 'L006-包装线 F', timestamp: '2026-02-04 07:45', acknowledged: false },
  { id: 'A004', level: 'warning', message: '装配线 A 效率低于目标', source: 'L001-装配线 A', timestamp: '2026-02-04 10:15', acknowledged: false },
  { id: 'A005', level: 'critical', message: '冲压线 D 安全门未关闭', source: 'L004-冲压线 D', timestamp: '2026-02-04 06:20', acknowledged: true },
  { id: 'A006', level: 'info', message: '装配线 B 达到产量目标', source: 'L002-装配线 B', timestamp: '2026-02-04 11:30', acknowledged: true },
];

// 质量数据（最近7天）
export const qualityData: QualityData[] = [
  { date: '01/29', passRate: 96.5, defectRate: 2.8, reworkRate: 0.7 },
  { date: '01/30', passRate: 97.2, defectRate: 2.2, reworkRate: 0.6 },
  { date: '01/31', passRate: 95.8, defectRate: 3.5, reworkRate: 0.7 },
  { date: '02/01', passRate: 98.1, defectRate: 1.5, reworkRate: 0.4 },
  { date: '02/02', passRate: 97.5, defectRate: 2.0, reworkRate: 0.5 },
  { date: '02/03', passRate: 96.8, defectRate: 2.5, reworkRate: 0.7 },
  { date: '02/04', passRate: 97.3, defectRate: 2.1, reworkRate: 0.6 },
];

// 工厂整体统计
export const factoryStats: FactoryStats = {
  totalLines: 6,
  runningLines: 3,
  idleLines: 1,
  errorLines: 0,
  maintenanceLines: 1,
  totalOutput: 5380,
  totalTarget: 5800,
  overallOEE: 82.4,
  overallEfficiency: 92.8,
};

// 状态颜色映射
export const statusColors = {
  running: { bg: 'bg-emerald-500', text: 'text-emerald-400', border: 'border-emerald-500', light: 'bg-emerald-500/10' },
  idle: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', light: 'bg-amber-500/10' },
  warning: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-500/10' },
  error: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-500/10' },
  maintenance: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-500/10' },
};

// 状态文本映射
export const statusText = {
  running: '运行中',
  idle: '待机',
  warning: '警告',
  error: '故障',
  maintenance: '维护中',
};

// 告警级别颜色
export const alertLevelColors = {
  info: { bg: 'bg-blue-500', text: 'text-blue-400', border: 'border-blue-500', light: 'bg-blue-500/10' },
  warning: { bg: 'bg-amber-500', text: 'text-amber-400', border: 'border-amber-500', light: 'bg-amber-500/10' },
  error: { bg: 'bg-orange-500', text: 'text-orange-400', border: 'border-orange-500', light: 'bg-orange-500/10' },
  critical: { bg: 'bg-red-500', text: 'text-red-400', border: 'border-red-500', light: 'bg-red-500/10' },
};

// 告警级别文本
export const alertLevelText = {
  info: '信息',
  warning: '警告',
  error: '错误',
  critical: '严重',
};
