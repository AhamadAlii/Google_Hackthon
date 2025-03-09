import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { 
  LayoutDashboard, 
  AlertTriangle, 
  Package, 
  Users, 
  Map, 
  Bell, 
  Settings, 
  BarChart3,
  LogOut
} from 'lucide-react';

const Sidebar: React.FC = () => {
  const location = useLocation();
  
  const navItems = [
    { path: '/', icon: <LayoutDashboard size={20} />, label: 'Dashboard' },
    { path: '/disasters', icon: <AlertTriangle size={20} />, label: 'Disasters' },
    { path: '/resources', icon: <Package size={20} />, label: 'Resources' },
    { path: '/teams', icon: <Users size={20} />, label: 'Response Teams' },
    { path: '/map', icon: <Map size={20} />, label: 'Disaster Map' },
    { path: '/alerts', icon: <Bell size={20} />, label: 'Alerts' },
    { path: '/analytics', icon: <BarChart3 size={20} />, label: 'Analytics' },
    { path: '/settings', icon: <Settings size={20} />, label: 'Settings' },
  ];

  return (
    <div className="h-screen w-64 bg-gray-900 text-white flex flex-col">
      <div className="p-5 border-b border-gray-800">
        <div className="flex items-center space-x-2">
          <AlertTriangle size={24} className="text-red-500" />
          <h1 className="text-xl font-bold">Disaster Response</h1>
        </div>
        <p className="text-xs text-gray-400 mt-1">AI-Powered Management System</p>
      </div>
      
      <nav className="flex-1 overflow-y-auto py-4">
        <ul className="space-y-1">
          {navItems.map((item) => (
            <li key={item.path}>
              <Link
                to={item.path}
                className={`flex items-center px-5 py-3 text-sm ${
                  location.pathname === item.path
                    ? 'bg-gray-800 text-white border-l-4 border-red-500'
                    : 'text-gray-400 hover:bg-gray-800 hover:text-white'
                }`}
              >
                <span className="mr-3">{item.icon}</span>
                {item.label}
              </Link>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-5 border-t border-gray-800">
        <button className="flex items-center text-gray-400 hover:text-white w-full">
          <LogOut size={20} className="mr-3" />
          <span>Logout</span>
        </button>
      </div>
    </div>
  );
};

export default Sidebar;