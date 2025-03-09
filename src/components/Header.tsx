import React, { useState } from 'react';
import { Bell, Search, User } from 'lucide-react';
import { alertMessages } from '../data/mockData';

const Header: React.FC = () => {
  const [showNotifications, setShowNotifications] = useState(false);
  const unreadCount = alertMessages.filter(alert => !alert.read).length;

  return (
    <header className="bg-white shadow-sm px-6 py-3 flex items-center justify-between">
      <div className="flex items-center">
        <h2 className="text-xl font-semibold text-gray-800">Disaster Response System</h2>
        <span className="ml-2 px-2 py-1 text-xs bg-blue-100 text-blue-800 rounded-md">Beta</span>
      </div>
      
      <div className="flex-1 max-w-xl mx-8">
        <div className="relative">
          <input
            type="text"
            placeholder="Search disasters, resources, locations..."
            className="w-full pl-10 pr-4 py-2 rounded-lg border border-gray-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          />
          <Search size={18} className="absolute left-3 top-2.5 text-gray-400" />
        </div>
      </div>
      
      <div className="flex items-center space-x-4">
        <div className="relative">
          <button 
            className="p-2 rounded-full hover:bg-gray-100 relative"
            onClick={() => setShowNotifications(!showNotifications)}
          >
            <Bell size={20} className="text-gray-600" />
            {unreadCount > 0 && (
              <span className="absolute top-0 right-0 h-5 w-5 bg-red-500 text-white text-xs rounded-full flex items-center justify-center">
                {unreadCount}
              </span>
            )}
          </button>
          
          {showNotifications && (
            <div className="absolute right-0 mt-2 w-80 bg-white rounded-lg shadow-lg z-10 border border-gray-200">
              <div className="p-3 border-b border-gray-200">
                <h3 className="font-semibold">Notifications</h3>
              </div>
              <div className="max-h-96 overflow-y-auto">
                {alertMessages.slice(0, 5).map(alert => (
                  <div 
                    key={alert.id} 
                    className={`p-3 border-b border-gray-100 hover:bg-gray-50 ${!alert.read ? 'bg-blue-50' : ''}`}
                  >
                    <div className="flex items-start">
                      <div className={`h-2 w-2 mt-1.5 rounded-full mr-2 ${
                        alert.severity === 'critical' ? 'bg-red-500' : 
                        alert.severity === 'warning' ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}></div>
                      <div>
                        <p className="font-medium text-sm">{alert.title}</p>
                        <p className="text-xs text-gray-600 mt-1">{alert.message}</p>
                        <p className="text-xs text-gray-400 mt-1">
                          {new Date(alert.timestamp).toLocaleString()}
                        </p>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
              <div className="p-2 text-center border-t border-gray-200">
                <button className="text-sm text-blue-600 hover:text-blue-800">
                  View all notifications
                </button>
              </div>
            </div>
          )}
        </div>
        
        <div className="flex items-center space-x-2">
          <div className="h-8 w-8 rounded-full bg-gray-300 flex items-center justify-center">
            <User size={18} className="text-gray-600" />
          </div>
          <div>
            <p className="text-sm font-medium">Admin User</p>
            <p className="text-xs text-gray-500">NDMA Coordinator</p>
          </div>
        </div>
      </div>
    </header>
  );
};

export default Header;