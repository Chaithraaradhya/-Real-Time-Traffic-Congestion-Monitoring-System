import React from 'react';
import { Activity, Database, Zap, Globe } from 'lucide-react';

interface HeaderProps {
  isStreaming: boolean;
  onToggleStreaming: () => void;
}

const Header: React.FC<HeaderProps> = ({ isStreaming, onToggleStreaming }) => {
  return (
    <header className="glass-card m-6 p-6">
      <div className="flex items-center justify-between">
        <div className="flex items-center space-x-4">
          <Globe className="w-8 h-8 text-blue-400" />
          <div>
            <h1 className="text-3xl font-bold gradient-text">
              Urban Traffic Analytics
            </h1>
            <p className="text-gray-400 text-sm">
              Real-time Big Data Analytics • Powered by Kafka, Spark & Hadoop
            </p>
          </div>
        </div>
        
        <div className="flex items-center space-x-6">
          {/* Status Indicators */}
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className={`status-indicator ${isStreaming ? 'bg-green-400' : 'bg-red-400'}`} />
              <span className="text-sm text-gray-300">
                {isStreaming ? 'Streaming' : 'Paused'}
              </span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Activity className="w-4 h-4 text-blue-400" />
              <span className="text-sm text-gray-300">Live Processing</span>
            </div>
            
            <div className="flex items-center space-x-2">
              <Database className="w-4 h-4 text-green-400" />
              <span className="text-sm text-gray-300">HDFS Connected</span>
            </div>
          </div>
          
          {/* Control Button */}
          <button
            onClick={onToggleStreaming}
            className={`flex items-center space-x-2 px-4 py-2 rounded-lg transition-all duration-300 ${
              isStreaming 
                ? 'bg-red-500/20 hover:bg-red-500/30 text-red-400' 
                : 'bg-green-500/20 hover:bg-green-500/30 text-green-400'
            }`}
          >
            <Zap className="w-4 h-4" />
            <span>{isStreaming ? 'Pause Stream' : 'Resume Stream'}</span>
          </button>
        </div>
      </div>
    </header>
  );
};

export default Header;