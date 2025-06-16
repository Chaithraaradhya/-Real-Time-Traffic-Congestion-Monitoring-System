import { TrafficData, Alert } from '../types';

const zones = [
  'Downtown Core', 'Financial District', 'Midtown West', 'Upper East Side',
  'Brooklyn Bridge', 'Times Square', 'Central Park', 'Wall Street',
  'SoHo District', 'Greenwich Village', 'Chelsea', 'Tribeca',
  'Lower Manhattan', 'Theater District', 'Garment District', 'Flatiron',
  'East Village', 'West Village', 'Nolita', 'Little Italy',
  'Chinatown', 'Battery Park', 'Civic Center', 'Two Bridges'
];

const alertTypes = [
  {
    title: 'Heavy Traffic Congestion',
    description: 'Severe slowdown due to high volume',
    type: 'congestion' as const
  },
  {
    title: 'Multi-Vehicle Accident',
    description: 'Traffic incident blocking multiple lanes',
    type: 'incident' as const
  },
  {
    title: 'Road Construction',
    description: 'Lane closure for emergency repairs',
    type: 'incident' as const
  },
  {
    title: 'Weather Impact',
    description: 'Heavy rain affecting visibility and speed',
    type: 'weather' as const
  },
  {
    title: 'System Anomaly',
    description: 'Unusual traffic pattern detected',
    type: 'system' as const
  },
  {
    title: 'Event Traffic',
    description: 'Increased volume due to nearby event',
    type: 'congestion' as const
  }
];

export const generateTrafficData = (): TrafficData[] => {
  return zones.map(zone => {
    // Simulate realistic traffic patterns with some zones having consistent issues
    const baseSpeed = zone.includes('Times Square') || zone.includes('Downtown') 
      ? 8 + Math.random() * 12 
      : 15 + Math.random() * 25;
    
    const vehicleCount = Math.floor(
      (zone.includes('Financial') || zone.includes('Midtown') ? 800 : 400) + 
      Math.random() * 600
    );

    const avgDelay = baseSpeed < 15 
      ? 8 + Math.random() * 12 
      : 2 + Math.random() * 8;

    return {
      zone: `${zone} Zone`,
      avgSpeed: Math.round(baseSpeed * 10) / 10,
      vehicleCount,
      avgDelay: Math.round(avgDelay * 10) / 10,
      timestamp: new Date().toISOString()
    };
  });
};

export const generateAlerts = (): Alert[] => {
  const numAlerts = 3 + Math.floor(Math.random() * 8);
  const alerts: Alert[] = [];
  
  for (let i = 0; i < numAlerts; i++) {
    const alertTemplate = alertTypes[Math.floor(Math.random() * alertTypes.length)];
    const zone = zones[Math.floor(Math.random() * zones.length)];
    const severities: Alert['severity'][] = ['critical', 'high', 'medium', 'low'];
    const severity = severities[Math.floor(Math.random() * severities.length)];
    
    // Create timestamp within last 2 hours
    const timestamp = new Date(Date.now() - Math.random() * 7200000).toISOString();
    
    alerts.push({
      id: `alert-${i}-${Date.now()}`,
      title: alertTemplate.title,
      description: `${alertTemplate.description} in ${zone} area`,
      severity,
      location: zone,
      timestamp,
      type: alertTemplate.type
    });
  }
  
  return alerts.sort((a, b) => 
    new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
};