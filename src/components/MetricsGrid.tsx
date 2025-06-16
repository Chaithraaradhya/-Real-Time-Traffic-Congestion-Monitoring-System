import React from 'react';
import { Car, Clock, AlertTriangle, TrendingUp, Users, Route } from 'lucide-react';
import { TrafficData } from '../types';

interface MetricsGridProps {
  trafficData: TrafficData[];
}

const MetricsGrid: React.FC<MetricsGridProps> = ({ trafficData }) => {
  const avgSpeed = trafficData.reduce((acc, data) => acc + data.avgSpeed, 0) / trafficData.length || 0;
  const totalVehicles = trafficData.reduce((acc, data) => acc + data.vehicleCount, 0);
  const congestionZones = trafficData.filter(data => data.avgSpeed < 15).length;
  const avgDelay = trafficData.reduce((acc, data) => acc + data.avgDelay, 0) / trafficData.length || 0;

  const metrics = [
    {
      title: 'Average Speed',
      value: `${avgSpeed.toFixed(1)} mph`,
      change: '+2.3%',
      positive: true,
      icon: Car,
      color: 'blue'
    },
    {
      title: 'Total Vehicles',
      value: totalVehicles.toLocaleString(),
      change: '+15.2%',
      positive: true,
      icon: Users,
      color: 'green'
    },
    {
      title: 'Congestion Zones',
      value: congestionZones.toString(),
      change: '-8.1%',
      positive: true,
      icon: AlertTriangle,
      color: 'orange'
    },
    {
      title: 'Average Delay',
      value: `${avgDelay.toFixed(1)} min`,
      change: '-5.4%',
      positive: true,
      icon: Clock,
      color: 'red'
    },
    {
      title: 'Data Throughput',
      value: '2.3 GB/s',
      change: '+12.7%',
      positive: true,
      icon: TrendingUp,
      color: 'purple'
    },
    {
      title: 'Active Routes',
      value: '1,247',
      change: '+3.8%',
      positive: true,
      icon: Route,
      color: 'cyan'
    }
  ];

  const getColorClasses = (color: string) => {
    const colors = {
      blue: 'text-blue-400 bg-blue-500/20',
      green: 'text-green-400 bg-green-500/20',
      orange: 'text-orange-400 bg-orange-500/20',
      red: 'text-red-400 bg-red-500/20',
      purple: 'text-purple-400 bg-purple-500/20',
      cyan: 'text-cyan-400 bg-cyan-500/20'
    };
    return colors[color as keyof typeof colors] || colors.blue;
  };

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-6 gap-6">
      {metrics.map((metric, index) => {
        const Icon = metric.icon;
        const colorClasses = getColorClasses(metric.color);
        
        return (
          <div key={index} className="metric-card">
            <div className="flex items-center justify-between mb-4">
              <div className={`p-2 rounded-lg ${colorClasses}`}>
                <Icon className="w-5 h-5" />
              </div>
              <span className={`text-xs px-2 py-1 rounded-full ${
                metric.positive 
                  ? 'bg-green-500/20 text-green-400' 
                  : 'bg-red-500/20 text-red-400'
              }`}>
                {metric.change}
              </span>
            </div>
            
            <div>
              <h3 className="text-2xl font-bold text-white mb-1">
                {metric.value}
              </h3>
              <p className="text-gray-400 text-sm">
                {metric.title}
              </p>
            </div>
          </div>
        );
      })}
    </div>
  );
};

export default MetricsGrid;