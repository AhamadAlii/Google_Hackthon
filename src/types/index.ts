export interface DisasterEvent {
  id: string;
  type: 'flood' | 'earthquake' | 'cyclone' | 'landslide' | 'drought' | 'other';
  severity: 'low' | 'medium' | 'high' | 'critical';
  location: {
    state: string;
    district: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
  affectedPopulation: number;
  timestamp: string;
  status: 'predicted' | 'ongoing' | 'contained' | 'resolved';
  description: string;
}

export interface Resource {
  id: string;
  name: string;
  category: 'medical' | 'food' | 'shelter' | 'equipment' | 'personnel' | 'other';
  quantity: number;
  unit: string;
  location: {
    state: string;
    district: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
  status: 'available' | 'in-transit' | 'deployed' | 'consumed';
  lastUpdated: string;
}

export interface ResponseTeam {
  id: string;
  name: string;
  type: 'medical' | 'rescue' | 'relief' | 'technical' | 'other';
  size: number;
  location: {
    state: string;
    district: string;
    coordinates: [number, number]; // [latitude, longitude]
  };
  status: 'standby' | 'deployed' | 'returning';
  assignedDisaster?: string;
  lastUpdated: string;
}

export interface AlertMessage {
  id: string;
  title: string;
  message: string;
  severity: 'info' | 'warning' | 'critical';
  timestamp: string;
  read: boolean;
}

export interface User {
  id: string;
  name: string;
  role: 'admin' | 'coordinator' | 'field-agent' | 'analyst';
  organization: string;
  contact: string;
  location: {
    state: string;
    district: string;
  };
}