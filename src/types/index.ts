// 设备状态类型
export type EquipmentStatus = 'running' | 'idle' | 'warning' | 'error' | 'maintenance';

// 生产线数据类型
export interface ProductionLine {
  id: string;
  name: string;
  status: EquipmentStatus;
  currentOutput: number;
  targetOutput: number;
  efficiency: number;
  oee: number;
  uptime: number;
  lastMaintenance: string;
  nextMaintenance: string;
  operators: number;
}

// 设备类型
export interface Equipment {
  id: string;
  name: string;
  lineId: string;
  status: EquipmentStatus;
  temperature: number;
  vibration: number;
  runtime: number;
  lastError?: string;
  errorTime?: string;
}

// 生产数据点
export interface ProductionDataPoint {
  time: string;
  planned: number;
  actual: number;
  defect: number;
}

// 告警信息
export interface Alert {
  id: string;
  level: 'info' | 'warning' | 'error' | 'critical';
  message: string;
  source: string;
  timestamp: string;
  acknowledged: boolean;
}

// 质量数据
export interface QualityData {
  date: string;
  passRate: number;
  defectRate: number;
  reworkRate: number;
}

// 整体工厂统计
export interface FactoryStats {
  totalLines: number;
  runningLines: number;
  idleLines: number;
  errorLines: number;
  maintenanceLines: number;
  totalOutput: number;
  totalTarget: number;
  overallOEE: number;
  overallEfficiency: number;
}
