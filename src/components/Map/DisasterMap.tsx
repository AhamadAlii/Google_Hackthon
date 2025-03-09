import React from 'react';
import { MapContainer, TileLayer, Marker, Popup, Circle } from 'react-leaflet';
import { disasterEvents } from '../../data/mockData';
import { AlertTriangle, Users, Calendar } from 'lucide-react';

const DisasterMap: React.FC = () => {
  const indiaCenter: [number, number] = [20.5937, 78.9629];
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return '#ef4444'; // red-500
      case 'high': return '#f97316'; // orange-500
      case 'medium': return '#eab308'; // yellow-500
      case 'low': return '#3b82f6'; // blue-500
      default: return '#6b7280'; // gray-500
    }
  };
  
  const getSeverityRadius = (severity: string) => {
    switch (severity) {
      case 'critical': return 50000;
      case 'high': return 40000;
      case 'medium': return 30000;
      case 'low': return 20000;
      default: return 10000;
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md overflow-hidden h-[600px]">
      <div className="p-4 border-b border-gray-200">
        <h2 className="text-lg font-semibold">Disaster Map</h2>
        <p className="text-sm text-gray-600">Real-time visualization of active disasters across India</p>
      </div>
      
      <MapContainer 
        center={indiaCenter} 
        zoom={5} 
        style={{ height: 'calc(100% - 73px)', width: '100%' }}
      >
        <TileLayer
          attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
          url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
        />
        
        {disasterEvents.map(disaster => (
          <React.Fragment key={disaster.id}>
            <Circle
              center={disaster.location.coordinates}
              radius={getSeverityRadius(disaster.severity)}
              pathOptions={{
                color: getSeverityColor(disaster.severity),
                fillColor: getSeverityColor(disaster.severity),
                fillOpacity: 0.2
              }}
            />
            
            <Marker position={disaster.location.coordinates}>
              <Popup>
                <div className="p-1">
                  <h3 className="font-medium text-base capitalize">{disaster.type} - {disaster.severity} severity</h3>
                  <p className="text-sm mt-1">{disaster.description}</p>
                  
                  <div className="mt-3 space-y-2">
                    <div className="flex items-center text-sm">
                      <AlertTriangle size={14} className="mr-2 text-red-500" />
                      <span>Status: <span className="font-medium capitalize">{disaster.status}</span></span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Users size={14} className="mr-2 text-blue-500" />
                      <span>Affected: <span className="font-medium">{disaster.affectedPopulation.toLocaleString()}</span></span>
                    </div>
                    
                    <div className="flex items-center text-sm">
                      <Calendar size={14} className="mr-2 text-gray-500" />
                      <span>Reported: <span className="font-medium">{new Date(disaster.timestamp).toLocaleString()}</span></span>
                    </div>
                  </div>
                  
                  <div className="mt-3 pt-2 border-t border-gray-200">
                    <p className="text-sm font-medium">Location:</p>
                    <p className="text-sm">{disaster.location.district}, {disaster.location.state}</p>
                  </div>
                </div>
              </Popup>
            </Marker>
          </React.Fragment>
        ))}
      </MapContainer>
    </div>
  );
};

export default DisasterMap;