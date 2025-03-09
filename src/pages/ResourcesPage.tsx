import React, { useState } from 'react';
import { resources } from '../data/mockData';
import { Package, Filter, Search, AlertCircle } from 'lucide-react';

const ResourcesPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [searchQuery, setSearchQuery] = useState('');
  const [error, setError] = useState<string | null>(null);

  // Filter resources based on search and category
  const filteredResources = resources.filter(resource => {
    const matchesSearch = resource.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
                         resource.category.toLowerCase().includes(searchQuery.toLowerCase());
    const matchesFilter = filter === 'all' || resource.category === filter;
    return matchesSearch && matchesFilter;
  });

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'available': return 'bg-green-100 text-green-800';
      case 'in-transit': return 'bg-blue-100 text-blue-800';
      case 'deployed': return 'bg-purple-100 text-purple-800';
      case 'consumed': return 'bg-gray-100 text-gray-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Resource Management</h1>
            <p className="text-gray-600">Monitor and manage disaster response resources</p>
          </div>
          
          <div className="flex items-center space-x-2 mt-4 md:mt-0">
            <div className="relative">
              <div className="absolute inset-y-0 left-0 flex items-center pl-3 pointer-events-none">
                <Search size={16} className="text-gray-500" />
              </div>
              <input
                type="text"
                placeholder="Search resources..."
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
              />
            </div>
            
            <select
              className="px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
              value={filter}
              onChange={(e) => setFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="medical">Medical</option>
              <option value="food">Food</option>
              <option value="shelter">Shelter</option>
              <option value="equipment">Equipment</option>
              <option value="personnel">Personnel</option>
            </select>
          </div>
        </div>

        {error && (
          <div className="mb-4 p-4 bg-red-50 border border-red-200 rounded-lg flex items-center">
            <AlertCircle size={20} className="text-red-500 mr-2" />
            <p className="text-red-700">{error}</p>
          </div>
        )}

        <div className="overflow-x-auto">
          <table className="min-w-full">
            <thead>
              <tr className="bg-gray-50">
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Resource</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Category</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quantity</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                <th className="px-4 py-2 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Last Updated</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-gray-200">
              {filteredResources.map((resource) => (
                <tr key={resource.id} className="hover:bg-gray-50">
                  <td className="px-4 py-3 whitespace-nowrap">
                    <div className="flex items-center">
                      <Package size={16} className="mr-2 text-gray-500" />
                      <span>{resource.name}</span>
                    </div>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap capitalize">{resource.category}</td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {resource.quantity} {resource.unit}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    {resource.location.district}, {resource.location.state}
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap">
                    <span className={`px-2 py-1 text-xs rounded-full ${getStatusColor(resource.status)}`}>
                      {resource.status}
                    </span>
                  </td>
                  <td className="px-4 py-3 whitespace-nowrap text-sm text-gray-500">
                    {new Date(resource.lastUpdated).toLocaleString()}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {filteredResources.length === 0 && (
          <div className="text-center py-8">
            <Package size={48} className="mx-auto text-gray-300 mb-3" />
            <p className="text-gray-500">No resources found matching the current filters.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default ResourcesPage;