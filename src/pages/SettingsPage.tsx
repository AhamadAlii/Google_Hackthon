import React from 'react';
import { Settings, Bell, Shield, Users, Database, Globe, Smartphone } from 'lucide-react';

const SettingsPage: React.FC = () => {
  return (
    <div className="p-6">
      <div className="bg-white rounded-lg shadow-md p-5">
        <h1 className="text-xl font-bold mb-6">System Settings</h1>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          <div className="col-span-1">
            <div className="bg-gray-50 p-4 rounded-lg">
              <h2 className="font-medium text-lg mb-4">Settings Categories</h2>
              <ul className="space-y-2">
                <li className="p-2 bg-blue-50 text-blue-700 rounded flex items-center">
                  <Settings size={18} className="mr-2" />
                  General
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Bell size={18} className="mr-2 text-gray-500" />
                  Notifications
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Shield size={18} className="mr-2 text-gray-500" />
                  Security
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Users size={18} className="mr-2 text-gray-500" />
                  User Management
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Database size={18} className="mr-2 text-gray-500" />
                  Data Management
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Globe size={18} className="mr-2 text-gray-500" />
                  API Integrations
                </li>
                <li className="p-2 hover:bg-gray-100 rounded flex items-center">
                  <Smartphone size={18} className="mr-2 text-gray-500" />
                  Mobile App
                </li>
              </ul>
            </div>
          </div>
          
          <div className="col-span-2">
            <h2 className="font-medium text-lg mb-4">General Settings</h2>
            
            <div className="space-y-6">
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-3">System Information</h3>
                <div className="grid grid-cols-2 gap-4">
                  <div>
                    <p className="text-sm text-gray-500">System Version</p>
                    <p className="font-medium">1.0.0</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Last Updated</p>
                    <p className="font-medium">June 20, 2025</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">Environment</p>
                    <p className="font-medium">Production</p>
                  </div>
                  <div>
                    <p className="text-sm text-gray-500">AI Model Version</p>
                    <p className="font-medium">3.5.2</p>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-3">Regional Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Default State</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>All India</option>
                      <option>Kerala</option>
                      <option>Tamil Nadu</option>
                      <option>Karnataka</option>
                      <option>Andhra Pradesh</option>
                      <option>Maharashtra</option>
                      <option>Gujarat</option>
                      <option>Odisha</option>
                      <option>West Bengal</option>
                      <option>Assam</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Time Zone</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>IST (UTC+5:30)</option>
                      <option>UTC</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Date Format</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>DD/MM/YYYY</option>
                      <option>MM/DD/YYYY</option>
                      <option>YYYY-MM-DD</option>
                    </select>
                  </div>
                </div>
              </div>
              
              <div className="p-4 border border-gray-200 rounded-lg">
                <h3 className="font-medium mb-3">AI Prediction Settings</h3>
                <div className="space-y-4">
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                      <span className="ml-2 text-sm text-gray-700">Enable AI disaster predictions</span>
                    </label>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Prediction Confidence Threshold</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>High (80%+)</option>
                      <option>Medium (60%+)</option>
                      <option>Low (40%+)</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="block text-sm text-gray-700 mb-1">Prediction Horizon</label>
                    <select className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-500">
                      <option>24 hours</option>
                      <option>48 hours</option>
                      <option>72 hours</option>
                      <option>1 week</option>
                    </select>
                  </div>
                  
                  <div>
                    <label className="flex items-center">
                      <input type="checkbox" className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded" checked />
                      <span className="ml-2 text-sm text-gray-700">Auto-alert for high confidence predictions</span>
                    </label>
                  </div>
                </div>
              </div>
              
              <div className="flex justify-end space-x-3">
                <button className="px-4 py-2 border border-gray-300 rounded-lg hover:bg-gray-50">
                  Cancel
                </button>
                <button className="px-4 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700">
                  Save Changes
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;