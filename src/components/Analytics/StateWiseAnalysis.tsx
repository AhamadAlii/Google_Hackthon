import React from 'react';
import { stateWiseDisasters } from '../../data/mockData';
import { MapPin } from 'lucide-react';

const StateWiseAnalysis: React.FC = () => {
  // Sort states by disaster count (descending)
  const sortedStates = [...stateWiseDisasters].sort((a, b) => b.count - a.count);
  
  // Calculate max count for scaling
  const maxCount = Math.max(...sortedStates.map(state => state.count));
  
  // Get top 5 most affected states
  const topStates = sortedStates.slice(0, 5);
  
  // Calculate total disasters
  const totalDisasters = sortedStates.reduce((sum, state) => sum + state.count, 0);

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">State-wise Disaster Analysis</h2>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
        <div>
          <h3 className="text-sm font-medium mb-3">Disaster Distribution by State</h3>
          <div className="space-y-3">
            {sortedStates.map((state, index) => (
              <div key={index} className="flex items-center">
                <div className="w-24 text-sm">{state.state}</div>
                <div className="flex-1 mx-2">
                  <div className="w-full bg-gray-200 rounded-full h-2">
                    <div 
                      className={`h-2 rounded-full ${
                        index < 3 ? 'bg-red-500' : 
                        index < 6 ? 'bg-orange-500' : 
                        index < 9 ? 'bg-yellow-500' : 'bg-blue-500'
                      }`}
                      style={{ width: `${(state.count / maxCount) * 100}%` }}
                    ></div>
                  </div>
                </div>
                <div className="w-8 text-right text-sm font-medium">{state.count}</div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Total Disasters</p>
                <p className="text-xl font-semibold">{totalDisasters}</p>
              </div>
              <div>
                <p className="text-gray-500">Most Affected</p>
                <p className="text-xl font-semibold">{sortedStates[0].state}</p>
              </div>
            </div>
          </div>
        </div>
        
        <div>
          <h3 className="text-sm font-medium mb-3">Top 5 Most Affected States</h3>
          <div className="space-y-4">
            {topStates.map((state, index) => (
              <div key={index} className="bg-gray-50 p-3 rounded-lg">
                <div className="flex justify-between items-center">
                  <div className="flex items-center">
                    <div className={`w-8 h-8 rounded-full flex items-center justify-center ${
                      index === 0 ? 'bg-red-100 text-red-600' : 
                      index === 1 ? 'bg-orange-100 text-orange-600' : 
                      index === 2 ? 'bg-yellow-100 text-yellow-600' : 
                      index === 3 ? 'bg-green-100 text-green-600' : 
                      'bg-blue-100 text-blue-600'
                    }`}>
                      <MapPin size={16} />
                    </div>
                    <div className="ml-3">
                      <p className="font-medium">{state.state}</p>
                      <p className="text-xs text-gray-500">
                        {((state.count / totalDisasters) * 100).toFixed(1)}% of total disasters
                      </p>
                    </div>
                  </div>
                  <div className="text-2xl font-bold">{state.count}</div>
                </div>
                
                <div className="mt-2 w-full bg-gray-200 rounded-full h-2">
                  <div 
                    className={`h-2 rounded-full ${
                      index === 0 ? 'bg-red-500' : 
                      index === 1 ? 'bg-orange-500' : 
                      index === 2 ? 'bg-yellow-500' : 
                      index === 3 ? 'bg-green-500' : 
                      'bg-blue-500'
                    }`}
                    style={{ width: `${(state.count / maxCount) * 100}%` }}
                  ></div>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <p className="text-sm text-gray-600">
              The top 5 states account for {((topStates.reduce((sum, state) => sum + state.count, 0) / totalDisasters) * 100).toFixed(1)}% of all disasters in India.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default StateWiseAnalysis;