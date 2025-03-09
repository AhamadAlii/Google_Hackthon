import React, { useState } from 'react';
import { disasterEvents } from '../data/mockData';
import { AlertTriangle, Filter, Users, MapPin, Calendar, ArrowUpDown } from 'lucide-react';

const DisastersPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDirection, setSortDirection] = useState('desc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('desc');
    }
  };
  
  const filteredDisasters = disasterEvents.filter(disaster => {
    if (filter === 'all') return true;
    return disaster.status === filter;
  });
  
  const sortedDisasters = [...filteredDisasters].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'timestamp') {
      comparison = new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime();
    } else if (sortField === 'severity') {
      const severityOrder = { critical: 4, high: 3, medium: 2, low: 1 };
      comparison = severityOrder[b.severity as keyof typeof severityOrder] - severityOrder[a.severity as keyof typeof severityOrder];
    } else if (sortField === 'affectedPopulation') {
      comparison = b.affectedPopulation - a.affectedPopulation;
    } else if (sortField === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortField === 'location') {
      comparison = a.location.state.localeCompare(b.location.state);
    }
    
    return sortDirection === 'asc' ? -comparison : comparison;
  });
  
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
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Disaster Management</h1>
            <p className="text-gray-600">Track and manage all disaster events across India</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Filter size={16} className="text-gray-500" />
              </div>
              <select
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={filter}
                onChange={(e) => setFilter(e.target.value)}
              >
                <option value="all">All Disasters</option>
                <option value="predicted">Predicted</option>
                <option value="ongoing">Ongoing</option>
                <option value="contained">Contained</option>
                <option value="resolved">Resolved</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <AlertTriangle size={16} className="mr-2" />
              Add New Disaster
            </button>
          </div>
        </div>
        
        <div className="overflow-x-auto">
          <table className="min-w-full bg-white">
            <thead>
              <tr className="bg-gray-50 text-gray-600 uppercase text-xs">
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-semibold"
                    onClick={() => handleSort('type')}
                  >
                    Type
                    {sortField === 'type' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-semibold"
                    onClick={() => handleSort('location')}
                  >
                    Location
                    {sortField === 'location' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-semibold"
                    onClick={() => handleSort('severity')}
                  >
                    Severity
                    {sortField === 'severity' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Status</th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-semibold"
                    onClick={() => handleSort('affectedPopulation')}
                  >
                    Affected
                    {sortField === 'affectedPopulation' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">
                  <button 
                    className="flex items-center font-semibold"
                    onClick={() => handleSort('timestamp')}
                  >
                    Reported
                    {sortField === 'timestamp' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedDisasters.map((disaster) => (
                <tr key={disaster.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <AlertTriangle size={16} className="mr-2 text-gray-500" />
                      <span className="capitalize">{disaster.type}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <div>
                        <p>{disaster.location.district}</p>
                        <p className="text-xs text-gray-500">{disaster.location.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <div className={`h-2 w-2 rounded-full ${getSeverityColor(disaster.severity)} mr-2`}></div>
                      <span className="capitalize">{disaster.severity}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(disaster.status)}`}>
                      {disaster.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-gray-500" />
                      {disaster.affectedPopulation.toLocaleString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Calendar size={16} className="mr-2 text-gray-500" />
                      {new Date(disaster.timestamp).toLocaleDateString()}
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        Details
                      </button>
                      <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                        Manage
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedDisasters.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No disasters found matching the current filter.</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing {sortedDisasters.length} of {disasterEvents.length} disasters
          </div>
          <div className="flex space-x-2">
            <button className="px-3 py-1 border border-gray-300 rounded hover:bg-gray-50">Previous</button>
            <button className="px-3 py-1 bg-blue-600 text-white rounded hover:bg-blue-700">Next</button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DisastersPage;