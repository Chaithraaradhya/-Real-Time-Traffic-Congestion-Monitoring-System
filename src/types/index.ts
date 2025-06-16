export interface TrafficData {
  zone: string;
  avgSpeed: number;
  vehicleCount: number;
  avgDelay: number;
  timestamp: string;
}

export interface Alert {
  id: string;
  title: string;
  description: string;
  severity: 'critical' | 'high' | 'medium' | 'low';
  location: string;
  timestamp: string;
  type: 'congestion' | 'incident' | 'system' | 'weather';
}

export interface InfrastructureMetric {
  service: string;
  status: 'online' | 'warning' | 'offline';
  uptime: string;
  metrics: Record<string, string | number>;
}