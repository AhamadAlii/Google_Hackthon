import { DisasterEvent, Resource, ResponseTeam, AlertMessage } from '../types';

export const disasterEvents: DisasterEvent[] = [
  {
    id: '1',
    type: 'flood',
    severity: 'high',
    location: {
      state: 'Kerala',
      district: 'Wayanad',
      coordinates: [11.6854, 76.1320]
    },
    affectedPopulation: 25000,
    timestamp: '2025-06-15T08:30:00Z',
    status: 'ongoing',
    description: 'Severe flooding due to heavy monsoon rainfall. Multiple villages submerged.'
  },
  {
    id: '2',
    type: 'cyclone',
    severity: 'critical',
    location: {
      state: 'Odisha',
      district: 'Puri',
      coordinates: [19.8133, 85.8314]
    },
    affectedPopulation: 120000,
    timestamp: '2025-05-03T14:15:00Z',
    status: 'contained',
    description: 'Cyclone Amphan making landfall with wind speeds of 160 km/h.'
  },
  {
    id: '3',
    type: 'earthquake',
    severity: 'medium',
    location: {
      state: 'Gujarat',
      district: 'Kutch',
      coordinates: [23.2420, 69.6669]
    },
    affectedPopulation: 8500,
    timestamp: '2025-07-26T02:45:00Z',
    status: 'contained',
    description: 'Earthquake of magnitude 5.3 on Richter scale. Structural damage reported.'
  },
  {
    id: '4',
    type: 'landslide',
    severity: 'high',
    location: {
      state: 'Himachal Pradesh',
      district: 'Shimla',
      coordinates: [31.1048, 77.1734]
    },
    affectedPopulation: 3200,
    timestamp: '2025-08-10T11:20:00Z',
    status: 'ongoing',
    description: 'Major landslide following heavy rainfall. Roads blocked, villages cut off.'
  },
  {
    id: '5',
    type: 'drought',
    severity: 'medium',
    location: {
      state: 'Maharashtra',
      district: 'Latur',
      coordinates: [18.4088, 76.5604]
    },
    affectedPopulation: 75000,
    timestamp: '2025-04-01T00:00:00Z',
    status: 'ongoing',
    description: 'Severe water shortage affecting agriculture and drinking water supply.'
  },
  {
    id: '6',
    type: 'flood',
    severity: 'low',
    location: {
      state: 'Assam',
      district: 'Dhemaji',
      coordinates: [27.4829, 94.5583]
    },
    affectedPopulation: 12000,
    timestamp: '2025-06-28T10:15:00Z',
    status: 'predicted',
    description: 'Potential flooding expected due to rising water levels in Brahmaputra.'
  }
];

export const resources: Resource[] = [
  {
    id: '1',
    name: 'Emergency Medical Kits',
    category: 'medical',
    quantity: 500,
    unit: 'kits',
    location: {
      state: 'Delhi',
      district: 'Central Delhi',
      coordinates: [28.6139, 77.2090]
    },
    status: 'available',
    lastUpdated: '2025-06-20T09:00:00Z'
  },
  {
    id: '2',
    name: 'Food Packets',
    category: 'food',
    quantity: 10000,
    unit: 'packets',
    location: {
      state: 'Kerala',
      district: 'Ernakulam',
      coordinates: [9.9816, 76.2999]
    },
    status: 'in-transit',
    lastUpdated: '2025-06-19T14:30:00Z'
  },
  {
    id: '3',
    name: 'Temporary Shelters',
    category: 'shelter',
    quantity: 200,
    unit: 'tents',
    location: {
      state: 'Odisha',
      district: 'Bhubaneswar',
      coordinates: [20.2961, 85.8245]
    },
    status: 'available',
    lastUpdated: '2025-06-18T11:45:00Z'
  },
  {
    id: '4',
    name: 'Water Purification Tablets',
    category: 'medical',
    quantity: 25000,
    unit: 'tablets',
    location: {
      state: 'Maharashtra',
      district: 'Mumbai',
      coordinates: [19.0760, 72.8777]
    },
    status: 'available',
    lastUpdated: '2025-06-17T16:20:00Z'
  },
  {
    id: '5',
    name: 'Rescue Boats',
    category: 'equipment',
    quantity: 30,
    unit: 'boats',
    location: {
      state: 'West Bengal',
      district: 'Kolkata',
      coordinates: [22.5726, 88.3639]
    },
    status: 'deployed',
    lastUpdated: '2025-06-16T08:10:00Z'
  }
];

export const responseTeams: ResponseTeam[] = [
  {
    id: '1',
    name: 'NDRF Team Alpha',
    type: 'rescue',
    size: 25,
    location: {
      state: 'Kerala',
      district: 'Wayanad',
      coordinates: [11.6854, 76.1320]
    },
    status: 'deployed',
    assignedDisaster: '1',
    lastUpdated: '2025-06-20T07:30:00Z'
  },
  {
    id: '2',
    name: 'Medical Response Unit 3',
    type: 'medical',
    size: 15,
    location: {
      state: 'Odisha',
      district: 'Puri',
      coordinates: [19.8133, 85.8314]
    },
    status: 'deployed',
    assignedDisaster: '2',
    lastUpdated: '2025-06-19T12:45:00Z'
  },
  {
    id: '3',
    name: 'Relief Distribution Team B',
    type: 'relief',
    size: 20,
    location: {
      state: 'Delhi',
      district: 'South Delhi',
      coordinates: [28.5355, 77.2410]
    },
    status: 'standby',
    lastUpdated: '2025-06-18T09:15:00Z'
  },
  {
    id: '4',
    name: 'Technical Assessment Unit 2',
    type: 'technical',
    size: 8,
    location: {
      state: 'Gujarat',
      district: 'Kutch',
      coordinates: [23.2420, 69.6669]
    },
    status: 'deployed',
    assignedDisaster: '3',
    lastUpdated: '2025-06-17T14:20:00Z'
  },
  {
    id: '5',
    name: 'SDRF Rapid Response',
    type: 'rescue',
    size: 18,
    location: {
      state: 'Himachal Pradesh',
      district: 'Shimla',
      coordinates: [31.1048, 77.1734]
    },
    status: 'deployed',
    assignedDisaster: '4',
    lastUpdated: '2025-06-16T10:30:00Z'
  }
];

export const alertMessages: AlertMessage[] = [
  {
    id: '1',
    title: 'Critical: Flood Warning',
    message: 'Flood warning issued for Wayanad district. Expected to worsen in next 24 hours.',
    severity: 'critical',
    timestamp: '2025-06-20T06:15:00Z',
    read: false
  },
  {
    id: '2',
    title: 'Resource Shortage',
    message: 'Medical supplies running low in Puri district. Immediate replenishment required.',
    severity: 'warning',
    timestamp: '2025-06-19T15:30:00Z',
    read: true
  },
  {
    id: '3',
    title: 'Team Deployment Complete',
    message: 'NDRF Team Alpha successfully deployed to Wayanad district.',
    severity: 'info',
    timestamp: '2025-06-19T08:45:00Z',
    read: false
  },
  {
    id: '4',
    title: 'Weather Update',
    message: 'Heavy rainfall predicted for coastal Odisha in the next 48 hours.',
    severity: 'warning',
    timestamp: '2025-06-18T12:20:00Z',
    read: true
  },
  {
    id: '5',
    title: 'Infrastructure Damage',
    message: 'Major bridge collapse reported in Shimla district due to landslide.',
    severity: 'critical',
    timestamp: '2025-06-18T09:10:00Z',
    read: false
  }
];

export const disasterStatsByType = [
  { type: 'flood', count: 12, affected: 245000 },
  { type: 'cyclone', count: 5, affected: 320000 },
  { type: 'earthquake', count: 3, affected: 85000 },
  { type: 'landslide', count: 8, affected: 42000 },
  { type: 'drought', count: 2, affected: 180000 },
  { type: 'other', count: 4, affected: 35000 }
];

export const resourceAllocationData = [
  { category: 'medical', allocated: 65, available: 35 },
  { category: 'food', allocated: 80, available: 20 },
  { category: 'shelter', allocated: 45, available: 55 },
  { category: 'equipment', allocated: 70, available: 30 },
  { category: 'personnel', allocated: 85, available: 15 },
  { category: 'other', allocated: 30, available: 70 }
];

export const responseTimeData = [
  { month: 'Jan', time: 8.2 },
  { month: 'Feb', time: 7.8 },
  { month: 'Mar', time: 7.5 },
  { month: 'Apr', time: 6.9 },
  { month: 'May', time: 6.2 },
  { month: 'Jun', time: 5.8 }
];

export const stateWiseDisasters = [
  { state: 'Kerala', count: 8 },
  { state: 'Odisha', count: 6 },
  { state: 'Gujarat', count: 4 },
  { state: 'Maharashtra', count: 5 },
  { state: 'Assam', count: 7 },
  { state: 'Himachal Pradesh', count: 5 },
  { state: 'Tamil Nadu', count: 3 },
  { state: 'West Bengal', count: 4 },
  { state: 'Bihar', count: 6 },
  { state: 'Uttarakhand', count: 5 }
];