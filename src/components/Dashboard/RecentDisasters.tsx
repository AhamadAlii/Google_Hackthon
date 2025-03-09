import React from 'react';
import { disasterEvents } from '../../data/mockData';
import { AlertTriangle, Clock, Users } from 'lucide-react';

const RecentDisasters: React.FC = () => {
  // Sort disasters by timestamp (newest first) and take the first 5
  const recentDisasters = [...disasterEvents]
    .sort((a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime())
    .slice(0, 5);

  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-blue-500';
      default: return 'bg-gray-500';
    }
  };

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'predicted': return 'bg-purple-100 text-purple-800';
      case 'ongoing': return 'bg-red-100 text-red-800';
      case 'contained': return 'bg-blue-100 text-blue-800';
      case 'resolved': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Recent Disasters</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      
      <div className="overflow-x-auto">
        <table className="min-w-full">
          <thead>
            <tr className="bg-gray-50">
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Type</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Severity</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Affected</th>
              <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Time</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-gray-200">
            {recentDisasters.map((disaster) => (
              <tr key={disaster.id} className="hover:bg-gray-50">
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <AlertTriangle size={16} className="mr-2 text-gray-500" />
                    <span className="capitalize">{disaster.type}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  {disaster.location.district}, {disaster.location.state}
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <div className={`h-2 w-2 rounded-full ${getSeverityColor(disaster.severity)} mr-2`}></div>
                    <span className="capitalize">{disaster.severity}</span>
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(disaster.status)}`}>
                    {disaster.status}
                  </span>
                </td>
                <td className="px-4 py-3 whitespace-nowrap">
                  <div className="flex items-center">
                    <Users size={16} className="mr-2 text-gray-500" />
                    {disaster.affectedPopulation.toLocaleString()}
                  </div>
                </td>
                <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                  <div className="flex items-center">
                    <Clock size={16} className="mr-2 text-gray-500" />
                    {new Date(disaster.timestamp).toLocaleString()}
                  </div>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default RecentDisasters;