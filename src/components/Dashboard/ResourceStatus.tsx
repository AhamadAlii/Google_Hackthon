import React from 'react';
import { resources } from '../../data/mockData';
import { Package, TrendingUp, TrendingDown, AlertCircle } from 'lucide-react';

const ResourceStatus: React.FC = () => {
  // Group resources by category and calculate totals
  const resourcesByCategory = resources.reduce((acc, resource) => {
    const category = resource.category;
    if (!acc[category]) {
      acc[category] = {
        total: 0,
        available: 0,
        deployed: 0,
        inTransit: 0
      };
    }
    
    acc[category].total += resource.quantity;
    
    if (resource.status === 'available') {
      acc[category].available += resource.quantity;
    } else if (resource.status === 'deployed') {
      acc[category].deployed += resource.quantity;
    } else if (resource.status === 'in-transit') {
      acc[category].inTransit += resource.quantity;
    }
    
    return acc;
  }, {} as Record<string, { total: number, available: number, deployed: number, inTransit: number }>);

  // Calculate critical resources (less than 20% available)
  const criticalResources = Object.entries(resourcesByCategory)
    .filter(([_, data]) => (data.available / data.total) < 0.2)
    .map(([category]) => category);

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Resource Status</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">Manage Resources</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
        {Object.entries(resourcesByCategory).map(([category, data]) => {
          const availablePercentage = Math.round((data.available / data.total) * 100);
          const isCritical = availablePercentage < 20;
          
          return (
            <div key={category} className={`p-4 rounded-lg border ${isCritical ? 'border-red-200 bg-red-50' : 'border-gray-200'}`}>
              <div className="flex justify-between items-start">
                <div>
                  <div className="flex items-center">
                    <Package size={18} className={`mr-2 ${isCritical ? 'text-red-500' : 'text-gray-500'}`} />
                    <h3 className="font-medium capitalize">{category}</h3>
                  </div>
                  <p className="text-2xl font-bold mt-2">{data.total.toLocaleString()}</p>
                  <p className="text-sm text-gray-600">Total Units</p>
                </div>
                
                {isCritical && (
                  <div className="bg-red-100 p-1 rounded">
                    <AlertCircle size={18} className="text-red-500" />
                  </div>
                )}
              </div>
              
              <div className="mt-3 grid grid-cols-3 gap-2 text-center">
                <div>
                  <p className="text-xs text-gray-500">Available</p>
                  <p className={`text-sm font-semibold ${isCritical ? 'text-red-600' : 'text-green-600'}`}>
                    {availablePercentage}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">Deployed</p>
                  <p className="text-sm font-semibold text-blue-600">
                    {Math.round((data.deployed / data.total) * 100)}%
                  </p>
                </div>
                <div>
                  <p className="text-xs text-gray-500">In Transit</p>
                  <p className="text-sm font-semibold text-purple-600">
                    {Math.round((data.inTransit / data.total) * 100)}%
                  </p>
                </div>
              </div>
              
              <div className="mt-3 w-full bg-gray-200 rounded-full h-2">
                <div 
                  className={`h-2 rounded-full ${isCritical ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${availablePercentage}%` }}
                ></div>
              </div>
            </div>
          );
        })}
      </div>
      
      {criticalResources.length > 0 && (
        <div className="bg-red-50 border border-red-200 rounded-lg p-3 flex items-start">
          <AlertCircle size={18} className="text-red-500 mr-2 mt-0.5" />
          <div>
            <p className="font-medium text-red-800">Critical Resource Levels</p>
            <p className="text-sm text-red-700 mt-1">
              {criticalResources.map(r => r.charAt(0).toUpperCase() + r.slice(1)).join(', ')} resources are below 20% availability. 
              Consider restocking immediately.
            </p>
          </div>
        </div>
      )}
    </div>
  );
};

export default ResourceStatus;