import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, LineChart, Line, Area, AreaChart } from 'recharts';
import { TrendingUp, Clock, Activity } from 'lucide-react';
import { TrafficData } from '../types';

interface AnalyticsPanelProps {
  trafficData: TrafficData[];
}

const AnalyticsPanel: React.FC<AnalyticsPanelProps> = ({ trafficData }) => {
  // Generate hourly trend data
  const hourlyData = Array.from({ length: 24 }, (_, hour) => ({
    hour: `${hour}:00`,
    speed: 20 + Math.sin(hour / 24 * Math.PI * 2) * 15 + Math.random() * 5,
    volume: 100 + Math.sin((hour - 6) / 24 * Math.PI * 2) * 80 + Math.random() * 20,
  }));

  // Top congested zones
  const topCongestedZones = trafficData
    .sort((a, b) => a.avgSpeed - b.avgSpeed)
    .slice(0, 6)
    .map(zone => ({
      name: zone.zone.replace(' Zone', ''),
      speed: zone.avgSpeed,
      vehicles: zone.vehicleCount,
    }));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Traffic Analytics</h2>
        <div className="flex items-center space-x-2 text-sm text-gray-400">
          <Activity className="w-4 h-4" />
          <span>Real-time Analysis</span>
        </div>
      </div>

      <div className="space-y-8">
        {/* Hourly Traffic Trends */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <TrendingUp className="w-5 h-5 mr-2 text-blue-400" />
            24-Hour Traffic Patterns
          </h3>
          <div className="h-64">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={hourlyData}>
                <defs>
                  <linearGradient id="speedGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#3B82F6" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#3B82F6" stopOpacity={0.1}/>
                  </linearGradient>
                  <linearGradient id="volumeGradient" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="#10B981" stopOpacity={0.8}/>
                    <stop offset="95%" stopColor="#10B981" stopOpacity={0.1}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  dataKey="hour" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis stroke="#9CA3AF" fontSize={12} />
                <Area
                  type="monotone"
                  dataKey="speed"
                  stroke="#3B82F6"
                  fillOpacity={1}
                  fill="url(#speedGradient)"
                  strokeWidth={2}
                />
              </AreaChart>
            </ResponsiveContainer>
          </div>
          <div className="flex justify-center mt-2">
            <div className="flex items-center space-x-4 text-sm">
              <div className="flex items-center space-x-2">
                <div className="w-3 h-3 bg-blue-400 rounded"></div>
                <span className="text-gray-300">Average Speed (mph)</span>
              </div>
            </div>
          </div>
        </div>

        {/* Top Congested Zones */}
        <div>
          <h3 className="text-lg font-medium text-white mb-4 flex items-center">
            <Clock className="w-5 h-5 mr-2 text-orange-400" />
            Most Congested Zones
          </h3>
          <div className="h-48">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={topCongestedZones} layout="horizontal">
                <CartesianGrid strokeDasharray="3 3" stroke="#374151" />
                <XAxis 
                  type="number" 
                  stroke="#9CA3AF"
                  fontSize={12}
                />
                <YAxis 
                  type="category" 
                  dataKey="name" 
                  stroke="#9CA3AF"
                  fontSize={12}
                  width={80}
                />
                <Bar 
                  dataKey="speed" 
                  fill="#F59E0B"
                  radius={[0, 4, 4, 0]}
                />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AnalyticsPanel;