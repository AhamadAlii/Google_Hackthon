import React, { useState } from 'react';
import { responseTeams, disasterEvents } from '../data/mockData';
import { Users, Filter, ArrowUpDown, MapPin, Calendar, Plus } from 'lucide-react';

const TeamsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [sortField, setSortField] = useState('name');
  const [sortDirection, setSortDirection] = useState('asc');
  
  const handleSort = (field: string) => {
    if (sortField === field) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };
  
  const filteredTeams = responseTeams.filter(team => {
    if (filter === 'all') return true;
    return team.type === filter || team.status === filter;
  });
  
  const sortedTeams = [...filteredTeams].sort((a, b) => {
    let comparison = 0;
    
    if (sortField === 'name') {
      comparison = a.name.localeCompare(b.name);
    } else if (sortField === 'type') {
      comparison = a.type.localeCompare(b.type);
    } else if (sortField === 'size') {
      comparison = a.size - b.size;
    } else if (sortField === 'location') {
      comparison = a.location.state.localeCompare(b.location.state);
    } else if (sortField === 'status') {
      comparison = a.status.localeCompare(b.status);
    } else if (sortField === 'lastUpdated') {
      comparison = new Date(a.lastUpdated).getTime() - new Date(b.lastUpdated).getTime();
    }
    
    return sortDirection === 'asc' ? comparison : -comparison;
  });
  
  const getTypeColor = (type: string) => {
    switch (type) {
      case 'medical': return 'bg-blue-100 text-blue-800';
      case 'rescue': return 'bg-red-100 text-red-800';
      case 'relief': return 'bg-green-100 text-green-800';
      case 'technical': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'standby': return 'bg-green-100 text-green-800';
      case 'deployed': return 'bg-orange-100 text-orange-800';
      case 'returning': return 'bg-blue-100 text-blue-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };
  
  const getAssignedDisasterName = (disasterId?: string) => {
    if (!disasterId) return 'None';
    const disaster = disasterEvents.find(d => d.id === disasterId);
    return disaster ? `${disaster.type} in ${disaster.location.district}` : 'Unknown';
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Response Teams</h1>
            <p className="text-gray-600">Manage and deploy disaster response teams</p>
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
                <option value="all">All Teams</option>
                <option value="medical">Medical</option>
                <option value="rescue">Rescue</option>
                <option value="relief">Relief</option>
                <option value="technical">Technical</option>
                <option value="standby">Standby</option>
                <option value="deployed">Deployed</option>
              </select>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Plus size={16} className="mr-2" />
              Add Team
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
                    onClick={() => handleSort('name')}
                  >
                    Team Name
                    {sortField === 'name' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
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
                    onClick={() => handleSort('size')}
                  >
                    Size
                    {sortField === 'size' && (
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
                    onClick={() => handleSort('status')}
                  >
                    Status
                    {sortField === 'status' && (
                      <ArrowUpDown size={14} className="ml-1" />
                    )}
                  </button>
                </th>
                <th className="py-3 px-4 text-left">Assigned To</th>
                <th className="py-3 px-4 text-left">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {sortedTeams.map((team) => (
                <tr key={team.id} className="hover:bg-gray-50">
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <Users size={16} className="mr-2 text-gray-500" />
                      <span>{team.name}</span>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getTypeColor(team.type)}`}>
                      {team.type}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="font-medium">{team.size} personnel</p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex items-center">
                      <MapPin size={16} className="mr-2 text-gray-500" />
                      <div>
                        <p>{team.location.district}</p>
                        <p className="text-xs text-gray-500">{team.location.state}</p>
                      </div>
                    </div>
                  </td>
                  <td className="py-3 px-4">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(team.status)}`}>
                      {team.status}
                    </span>
                  </td>
                  <td className="py-3 px-4">
                    <p className="text-sm">
                      {getAssignedDisasterName(team.assignedDisaster)}
                    </p>
                    <p className="text-xs text-gray-500">
                      {team.lastUpdated ? `Updated: ${new Date(team.lastUpdated).toLocaleDateString()}` : ''}
                    </p>
                  </td>
                  <td className="py-3 px-4">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200">
                        Details
                      </button>
                      <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                        {team.status === 'deployed' ? 'Reassign' : 'Deploy'}
                      </button>
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
        
        {sortedTeams.length === 0 && (
          <div className="text-center py-8">
            <p className="text-gray-500">No teams found matching the current filter.</p>
          </div>
        )}
        
        <div className="mt-4 flex justify-between items-center text-sm text-gray-600">
          <div>
            Showing {sortedTeams.length} of {responseTeams.length} teams
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

export default TeamsPage;