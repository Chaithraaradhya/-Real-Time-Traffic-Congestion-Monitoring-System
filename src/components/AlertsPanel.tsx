import React from 'react';
import { AlertTriangle, Clock, MapPin, ChevronRight } from 'lucide-react';
import { Alert } from '../types';

interface AlertsPanelProps {
  alerts: Alert[];
}

const AlertsPanel: React.FC<AlertsPanelProps> = ({ alerts }) => {
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'text-red-400 bg-red-500/20 border-red-500/30';
      case 'high': return 'text-orange-400 bg-orange-500/20 border-orange-500/30';
      case 'medium': return 'text-yellow-400 bg-yellow-500/20 border-yellow-500/30';
      case 'low': return 'text-blue-400 bg-blue-500/20 border-blue-500/30';
      default: return 'text-gray-400 bg-gray-500/20 border-gray-500/30';
    }
  };

  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical': return '🚨';
      case 'high': return '⚠️';
      case 'medium': return '⚡';
      case 'low': return 'ℹ️';
      default: return '📋';
    }
  };

  const formatTime = (timestamp: string) => {
    const date = new Date(timestamp);
    const now = new Date();
    const diffMs = now.getTime() - date.getTime();
    const diffMins = Math.floor(diffMs / (1000 * 60));
    
    if (diffMins < 60) return `${diffMins}m ago`;
    if (diffMins < 1440) return `${Math.floor(diffMins / 60)}h ago`;
    return `${Math.floor(diffMins / 1440)}d ago`;
  };

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Live Alerts</h2>
        <div className="flex items-center space-x-2">
          <div className="w-2 h-2 bg-red-400 rounded-full animate-pulse"></div>
          <span className="text-sm text-gray-400">{alerts.length} Active</span>
        </div>
      </div>

      <div className="space-y-3 max-h-96 overflow-y-auto">
        {alerts.map((alert, index) => {
          const severityColor = getSeverityColor(alert.severity);
          const icon = getSeverityIcon(alert.severity);
          
          return (
            <div 
              key={index} 
              className={`border rounded-lg p-4 hover:bg-white/5 transition-colors cursor-pointer ${severityColor}`}
            >
              <div className="flex items-start justify-between">
                <div className="flex items-start space-x-3 flex-1">
                  <div className="text-lg">{icon}</div>
                  <div className="flex-1 min-w-0">
                    <h3 className="font-medium text-white mb-1 truncate">
                      {alert.title}
                    </h3>
                    <p className="text-sm text-gray-300 mb-2 line-clamp-2">
                      {alert.description}
                    </p>
                    <div className="flex items-center space-x-4 text-xs text-gray-400">
                      <div className="flex items-center space-x-1">
                        <MapPin className="w-3 h-3" />
                        <span>{alert.location}</span>
                      </div>
                      <div className="flex items-center space-x-1">
                        <Clock className="w-3 h-3" />
                        <span>{formatTime(alert.timestamp)}</span>
                      </div>
                    </div>
                  </div>
                </div>
                <ChevronRight className="w-4 h-4 text-gray-400 flex-shrink-0 ml-2" />
              </div>
            </div>
          );
        })}
      </div>

      {/* Alert Summary */}
      <div className="mt-6 pt-4 border-t border-white/10">
        <div className="grid grid-cols-4 gap-2 text-center">
          <div>
            <div className="text-lg font-bold text-red-400">
              {alerts.filter(a => a.severity === 'critical').length}
            </div>
            <div className="text-xs text-gray-400">Critical</div>
          </div>
          <div>
            <div className="text-lg font-bold text-orange-400">
              {alerts.filter(a => a.severity === 'high').length}
            </div>
            <div className="text-xs text-gray-400">High</div>
          </div>
          <div>
            <div className="text-lg font-bold text-yellow-400">
              {alerts.filter(a => a.severity === 'medium').length}
            </div>
            <div className="text-xs text-gray-400">Medium</div>
          </div>
          <div>
            <div className="text-lg font-bold text-blue-400">
              {alerts.filter(a => a.severity === 'low').length}
            </div>
            <div className="text-xs text-gray-400">Low</div>
          </div>
        </div>
      </div>

      {/* Quick Actions */}
      <div className="mt-4 flex space-x-2">
        <button className="flex-1 bg-blue-500/20 hover:bg-blue-500/30 text-blue-400 px-3 py-2 rounded-lg text-sm transition-colors">
          View All Alerts
        </button>
        <button className="flex-1 bg-green-500/20 hover:bg-green-500/30 text-green-400 px-3 py-2 rounded-lg text-sm transition-colors">
          Acknowledge All
        </button>
      </div>
    </div>
  );
};

export default AlertsPanel;