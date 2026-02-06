import { useState, useEffect, useCallback } from 'react';
import type { ProductionLine, Alert, FactoryStats, Equipment } from '@/types';
import { productionLines as initialLines, alerts as initialAlerts, factoryStats as initialStats, equipments as initialEquipments } from '@/data/mockData';

// 模拟实时数据更新
export function useRealtimeData(updateInterval: number = 5000) {
  const [productionLines, setProductionLines] = useState<ProductionLine[]>(initialLines);
  const [alerts, setAlerts] = useState<Alert[]>(initialAlerts);
  const [factoryStats, setFactoryStats] = useState<FactoryStats>(initialStats);
  const [equipments, setEquipments] = useState<Equipment[]>(initialEquipments);
  const [lastUpdate, setLastUpdate] = useState<Date>(new Date());

  // 随机更新生产线数据
  const updateProductionLines = useCallback(() => {
    setProductionLines(prev => prev.map(line => {
      if (line.status === 'running') {
        const variation = (Math.random() - 0.5) * 20;
        const newOutput = Math.max(0, Math.round(line.currentOutput + variation));
        const newEfficiency = Math.min(100, Math.max(0, line.efficiency + (Math.random() - 0.5) * 2));
        return {
          ...line,
          currentOutput: newOutput,
          efficiency: Math.round(newEfficiency * 10) / 10,
        };
      }
      return line;
    }));
  }, []);

  // 随机更新设备数据
  const updateEquipments = useCallback(() => {
    setEquipments(prev => prev.map(equip => {
      if (equip.status === 'running') {
        const tempVariation = (Math.random() - 0.5) * 5;
        const vibVariation = (Math.random() - 0.5) * 1;
        return {
          ...equip,
          temperature: Math.round((equip.temperature + tempVariation) * 10) / 10,
          vibration: Math.round((equip.vibration + vibVariation) * 10) / 10,
        };
      }
      return equip;
    }));
  }, []);

  // 更新工厂统计
  const updateFactoryStats = useCallback(() => {
    setProductionLines(currentLines => {
      const runningLines = currentLines.filter(l => l.status === 'running').length;
      const idleLines = currentLines.filter(l => l.status === 'idle').length;
      const errorLines = currentLines.filter(l => l.status === 'error').length;
      const maintenanceLines = currentLines.filter(l => l.status === 'maintenance').length;
      const totalOutput = currentLines.reduce((sum, l) => sum + l.currentOutput, 0);
      const totalTarget = currentLines.reduce((sum, l) => sum + l.targetOutput, 0);
      const avgOEE = currentLines.filter(l => l.status === 'running').reduce((sum, l) => sum + l.oee, 0) / runningLines || 0;
      const avgEfficiency = currentLines.filter(l => l.status === 'running').reduce((sum, l) => sum + l.efficiency, 0) / runningLines || 0;

      setFactoryStats({
        totalLines: currentLines.length,
        runningLines,
        idleLines,
        errorLines,
        maintenanceLines,
        totalOutput,
        totalTarget,
        overallOEE: Math.round(avgOEE * 10) / 10,
        overallEfficiency: Math.round(avgEfficiency * 10) / 10,
      });

      return currentLines;
    });
  }, []);

  // 添加随机告警
  const addRandomAlert = useCallback(() => {
    if (Math.random() < 0.1) { // 10% 概率添加新告警
      const messages = [
        { level: 'warning' as const, message: '设备温度偏高', source: 'L001-装配线 A' },
        { level: 'info' as const, message: '生产计划已更新', source: '系统' },
        { level: 'warning' as const, message: '原料库存不足', source: 'L002-装配线 B' },
      ];
      const randomMsg = messages[Math.floor(Math.random() * messages.length)];
      const newAlert: Alert = {
        id: `A${Date.now()}`,
        level: randomMsg.level,
        message: randomMsg.message,
        source: randomMsg.source,
        timestamp: new Date().toLocaleString('zh-CN'),
        acknowledged: false,
      };
      setAlerts(prev => [newAlert, ...prev].slice(0, 10));
    }
  }, []);

  // 确认告警
  const acknowledgeAlert = useCallback((alertId: string) => {
    setAlerts(prev => prev.map(alert => 
      alert.id === alertId ? { ...alert, acknowledged: true } : alert
    ));
  }, []);

  // 定时更新
  useEffect(() => {
    const interval = setInterval(() => {
      updateProductionLines();
      updateEquipments();
      updateFactoryStats();
      addRandomAlert();
      setLastUpdate(new Date());
    }, updateInterval);

    return () => clearInterval(interval);
  }, [updateInterval, updateProductionLines, updateEquipments, updateFactoryStats, addRandomAlert]);

  return {
    productionLines,
    alerts,
    factoryStats,
    equipments,
    lastUpdate,
    acknowledgeAlert,
  };
}
