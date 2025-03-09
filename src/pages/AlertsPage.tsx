import React, { useState } from 'react';
import { alertMessages } from '../data/mockData';
import { Bell, Filter, Calendar, Check, AlertTriangle, Info, AlertCircle } from 'lucide-react';

const AlertsPage: React.FC = () => {
  const [filter, setFilter] = useState('all');
  const [showUnreadOnly, setShowUnreadOnly] = useState(false);
  
  const filteredAlerts = alertMessages.filter(alert => {
    if (showUnreadOnly && alert.read) return false;
    if (filter === 'all') return true;
    return alert.severity === filter;
  });
  
  // Sort alerts by timestamp (newest first)
  const sortedAlerts = [...filteredAlerts].sort(
    (a, b) => new Date(b.timestamp).getTime() - new Date(a.timestamp).getTime()
  );
  
  const getSeverityIcon = (severity: string) => {
    switch (severity) {
      case 'critical':
        return <AlertTriangle size={18} className="text-red-500" />;
      case 'warning':
        return <AlertCircle size={18} className="text-yellow-500" />;
      case 'info':
        return <Info size={18} className="text-blue-500" />;
      default:
        return <Info size={18} className="text-gray-500" />;
    }
  };
  
  const getSeverityColor = (severity: string) => {
    switch (severity) {
      case 'critical': return 'border-red-200 bg-red-50';
      case 'warning': return 'border-yellow-200 bg-yellow-50';
      case 'info': return 'border-blue-200 bg-blue-50';
      default: return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center mb-6">
          <div>
            <h1 className="text-xl font-bold">Alert Center</h1>
            <p className="text-gray-600">Manage and respond to system alerts and notifications</p>
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
                <option value="all">All Alerts</option>
                <option value="critical">Critical</option>
                <option value="warning">Warning</option>
                <option value="info">Information</option>
              </select>
            </div>
            
            <div className="flex items-center">
              <input
                type="checkbox"
                id="unread-only"
                checked={showUnreadOnly}
                onChange={() => setShowUnreadOnly(!showUnreadOnly)}
                className="mr-2 h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
              />
              <label htmlFor="unread-only" className="text-sm text-gray-700">
                Unread only
              </label>
            </div>
            
            <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 flex items-center">
              <Check size={16} className="mr-2" />
              Mark All Read
            </button>
          </div>
        </div>
        
        <div className="space-y-4">
          {sortedAlerts.map((alert) => (
            <div 
              key={alert.id} 
              className={`p-4 rounded-lg border ${getSeverityColor(alert.severity)} ${!alert.read ? 'ring-2 ring-blue-300' : ''}`}
            >
              <div className="flex items-start">
                <div className="mt-1 mr-3">
                  {getSeverityIcon(alert.severity)}
                </div>
                <div className="flex-1">
                  <div className="flex items-center justify-between">
                    <h3 className="font-medium">{alert.title}</h3>
                    <div className="flex items-center">
                      <Calendar size={14} className="text-gray-500 mr-1" />
                      <span className="text-xs text-gray-500">
                        {new Date(alert.timestamp).toLocaleString()}
                      </span>
                    </div>
                  </div>
                  <p className="text-sm text-gray-700 mt-1">{alert.message}</p>
                  
                  <div className="mt-3 flex justify-between items-center">
                    <div className="flex space-x-2">
                      <button className="px-2 py-1 text-xs bg-blue-100 text-blue-700 rounded hover:bg-blue-200 flex items-center">
                        <Check size={12} className="mr-1" />
                        {alert.read ? 'Mark Unread' : 'Mark Read'}
                      </button>
                      <button className="px-2 py-1 text-xs bg-green-100 text-green-700 rounded hover:bg-green-200">
                        Take Action
                      </button>
                    </div>
                    
                    {alert.severity === 'critical' && (
                      <span className="px-2 py-1 text-xs bg-red-100 text-red-700 rounded-full">
                        Requires Immediate Attention
                      </span>
                    )}
                  </div>
                </div>
              </div>
            </div>
          ))}
          
          {sortedAlerts.length === 0 && (
            <div className="text-center py-8">
              <Bell size={48} className="mx-auto text-gray-300 mb-3" />
              <p className="text-gray-500">No alerts found matching the current filters.</p>
            </div>
          )}
        </div>
        
        <div className="mt-6 pt-4 border-t border-gray-200">
          <div className="flex justify-between items-center">
            <div className="text-sm text-gray-600">
              Showing {sortedAlerts.length} of {alertMessages.length} alerts
            </div>
            <div className="flex items-center space-x-4">
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-red-500 mr-2"></div>
                <span className="text-sm">Critical: {alertMessages.filter(a => a.severity === 'critical').length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-yellow-500 mr-2"></div>
                <span className="text-sm">Warning: {alertMessages.filter(a => a.severity === 'warning').length}</span>
              </div>
              <div className="flex items-center">
                <div className="w-3 h-3 rounded-full bg-blue-500 mr-2"></div>
                <span className="text-sm">Info: {alertMessages.filter(a => a.severity === 'info').length}</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AlertsPage;