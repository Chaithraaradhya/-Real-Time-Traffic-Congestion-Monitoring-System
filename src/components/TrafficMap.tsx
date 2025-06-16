import React from 'react';
import { MapPin, Navigation, AlertCircle } from 'lucide-react';
import { TrafficData } from '../types';

interface TrafficMapProps {
  trafficData: TrafficData[];
}

const TrafficMap: React.FC<TrafficMapProps> = ({ trafficData }) => {
  const getZoneColor = (speed: number) => {
    if (speed < 10) return 'bg-red-500';
    if (speed < 20) return 'bg-orange-500';
    if (speed < 30) return 'bg-yellow-500';
    return 'bg-green-500';
  };

  const getZoneIntensity = (vehicleCount: number) => {
    const maxCount = Math.max(...trafficData.map(d => d.vehicleCount));
    return (vehicleCount / maxCount) * 100;
  };

  // Simulate map zones with grid positions
  const mapZones = trafficData.map((data, index) => ({
    ...data,
    x: (index % 8) * 12.5,
    y: Math.floor(index / 8) * 20,
  }));

  return (
    <div className="glass-card p-6">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-xl font-semibold text-white">Traffic Congestion Map</h2>
        <div className="flex items-center space-x-4 text-sm">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-green-500 rounded-full"></div>
            <span className="text-gray-300">Smooth</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-yellow-500 rounded-full"></div>
            <span className="text-gray-300">Moderate</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-orange-500 rounded-full"></div>
            <span className="text-gray-300">Heavy</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 bg-red-500 rounded-full"></div>
            <span className="text-gray-300">Severe</span>
          </div>
        </div>
      </div>

      {/* Map Container */}
      <div className="relative bg-slate-800/50 rounded-lg p-4 h-96 overflow-hidden">
        {/* Grid Background */}
        <div className="absolute inset-0 opacity-20">
          <svg className="w-full h-full">
            <defs>
              <pattern id="grid" width="40" height="40" patternUnits="userSpaceOnUse">
                <path d="M 40 0 L 0 0 0 40" fill="none" stroke="white" strokeWidth="1"/>
              </pattern>
            </defs>
            <rect width="100%" height="100%" fill="url(#grid)" />
          </svg>
        </div>

        {/* Traffic Zones */}
        {mapZones.map((zone, index) => (
          <div
            key={index}
            className="absolute transform -translate-x-1/2 -translate-y-1/2 cursor-pointer group"
            style={{
              left: `${zone.x}%`,
              top: `${zone.y}%`,
            }}
          >
            {/* Zone Indicator */}
            <div className={`w-4 h-4 rounded-full ${getZoneColor(zone.avgSpeed)} 
              animate-pulse-slow relative z-10 border-2 border-white/20
              group-hover:scale-150 transition-transform duration-300`}
            />
            
            {/* Intensity Ring */}
            <div 
              className={`absolute inset-0 rounded-full ${getZoneColor(zone.avgSpeed)} 
                opacity-30 animate-ping-slow`}
              style={{
                width: `${Math.max(getZoneIntensity(zone.vehicleCount) / 10, 2)}px`,
                height: `${Math.max(getZoneIntensity(zone.vehicleCount) / 10, 2)}px`,
                left: '50%',
                top: '50%',
                transform: 'translate(-50%, -50%)',
              }}
            />

            {/* Tooltip */}
            <div className="absolute left-6 top-0 bg-black/90 text-white p-3 rounded-lg 
              opacity-0 group-hover:opacity-100 transition-opacity duration-300 z-20 
              whitespace-nowrap border border-white/20">
              <div className="font-semibold">{zone.zone}</div>
              <div className="text-sm text-gray-300 mt-1">
                Speed: {zone.avgSpeed} mph
              </div>
              <div className="text-sm text-gray-300">
                Vehicles: {zone.vehicleCount.toLocaleString()}
              </div>
              <div className="text-sm text-gray-300">
                Delay: {zone.avgDelay} min
              </div>
            </div>
          </div>
        ))}

        {/* Major Incidents */}
        <div className="absolute top-4 left-4">
          <div className="flex items-center space-x-2 bg-red-500/20 text-red-400 px-3 py-2 rounded-lg">
            <AlertCircle className="w-4 h-4 animate-bounce-slow" />
            <span className="text-sm">3 Active Incidents</span>
          </div>
        </div>

        {/* Navigation Controls */}
        <div className="absolute bottom-4 right-4 flex space-x-2">
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
            <Navigation className="w-4 h-4 text-white" />
          </button>
          <button className="bg-white/10 hover:bg-white/20 p-2 rounded-lg transition-colors">
            <MapPin className="w-4 h-4 text-white" />
          </button>
        </div>
      </div>

      {/* Zone Statistics */}
      <div className="mt-6 grid grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="text-center">
          <div className="text-2xl font-bold text-green-400">
            {trafficData.filter(d => d.avgSpeed >= 30).length}
          </div>
          <div className="text-sm text-gray-400">Smooth Zones</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-yellow-400">
            {trafficData.filter(d => d.avgSpeed >= 20 && d.avgSpeed < 30).length}
          </div>
          <div className="text-sm text-gray-400">Moderate Zones</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-orange-400">
            {trafficData.filter(d => d.avgSpeed >= 10 && d.avgSpeed < 20).length}
          </div>
          <div className="text-sm text-gray-400">Heavy Zones</div>
        </div>
        <div className="text-center">
          <div className="text-2xl font-bold text-red-400">
            {trafficData.filter(d => d.avgSpeed < 10).length}
          </div>
          <div className="text-sm text-gray-400">Severe Zones</div>
        </div>
      </div>
    </div>
  );
};

export default TrafficMap;