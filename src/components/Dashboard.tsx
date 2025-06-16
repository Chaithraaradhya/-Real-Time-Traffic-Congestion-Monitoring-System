import React, { useState, useEffect } from 'react';
import Header from './Header';
import MetricsGrid from './MetricsGrid';
import TrafficMap from './TrafficMap';
import AnalyticsPanel from './AnalyticsPanel';
import AlertsPanel from './AlertsPanel';
import { generateTrafficData, generateAlerts } from '../utils/dataGenerator';
import type { TrafficData, Alert } from '../types';

const Dashboard: React.FC = () => {
  const [trafficData, setTrafficData] = useState<TrafficData[]>([]);
  const [alerts, setAlerts] = useState<Alert[]>([]);
  const [isStreaming, setIsStreaming] = useState(true);

  useEffect(() => {
    // Initial data load
    setTrafficData(generateTrafficData());
    setAlerts(generateAlerts());

    // Simulate real-time data updates
    const interval = setInterval(() => {
      if (isStreaming) {
        setTrafficData(generateTrafficData());
        
        // Update alerts less frequently
        if (Math.random() > 0.7) {
          setAlerts(generateAlerts());
        }
      }
    }, 3000);

    return () => clearInterval(interval);
  }, [isStreaming]);

  return (
    <div className="min-h-screen text-white">
      <Header 
        isStreaming={isStreaming} 
        onToggleStreaming={() => setIsStreaming(!isStreaming)}
      />
      
      <main className="p-6 space-y-6">
        {/* Metrics Overview */}
        <MetricsGrid trafficData={trafficData} />
        
        {/* Main Content Grid */}
        <div className="grid grid-cols-1 xl:grid-cols-3 gap-6">
          {/* Traffic Map */}
          <div className="xl:col-span-2">
            <TrafficMap trafficData={trafficData} />
          </div>
          
          {/* Alerts Panel */}
          <div>
            <AlertsPanel alerts={alerts} />
          </div>
        </div>
        
        {/* Analytics Panel - Full Width */}
        <div className="w-full">
          <AnalyticsPanel trafficData={trafficData} />
        </div>
      </main>
    </div>
  );
};

export default Dashboard;