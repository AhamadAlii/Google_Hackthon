import React from 'react';
import { disasterEvents } from '../../data/mockData';

const DisasterSummary: React.FC = () => {
  const ongoing = disasterEvents.filter(d => d.status === 'ongoing').length;
  const predicted = disasterEvents.filter(d => d.status === 'predicted').length;
  const contained = disasterEvents.filter(d => d.status === 'contained').length;
  const resolved = disasterEvents.filter(d => d.status === 'resolved').length;
  
  const totalAffected = disasterEvents.reduce((sum, event) => sum + event.affectedPopulation, 0);
  
  const summaryItems = [
    { label: 'Ongoing Disasters', value: ongoing, color: 'bg-red-500' },
    { label: 'Predicted Disasters', value: predicted, color: 'bg-yellow-500' },
    { label: 'Contained Disasters', value: contained, color: 'bg-blue-500' },
    { label: 'Resolved Disasters', value: resolved, color: 'bg-green-500' },
  ];

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Disaster Summary</h2>
      
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {summaryItems.map((item, index) => (
          <div key={index} className="bg-gray-50 p-4 rounded-lg">
            <div className={`h-2 w-16 ${item.color} rounded-full mb-2`}></div>
            <p className="text-2xl font-bold">{item.value}</p>
            <p className="text-sm text-gray-600">{item.label}</p>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex justify-between items-center">
          <div>
            <p className="text-sm text-gray-600">Total Affected Population</p>
            <p className="text-2xl font-bold">{totalAffected.toLocaleString()}</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Active Response Teams</p>
            <p className="text-2xl font-bold">12</p>
          </div>
          <div>
            <p className="text-sm text-gray-600">Resources Deployed</p>
            <p className="text-2xl font-bold">65%</p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisasterSummary;