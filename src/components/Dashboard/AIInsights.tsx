import React from 'react';
import { TrendingUp, AlertTriangle, Droplets, Wind } from 'lucide-react';

const AIInsights: React.FC = () => {
  const insights = [
    {
      id: 1,
      title: 'Flood Risk Increasing',
      description: 'AI models predict 40% increased flood risk in Kerala over the next 72 hours due to continued heavy rainfall and saturated soil conditions.',
      type: 'warning',
      icon: <Droplets size={18} className="text-blue-500" />,
      timestamp: '2 hours ago'
    },
    {
      id: 2,
      title: 'Cyclone Formation Detected',
      description: 'Early cyclone formation detected in Bay of Bengal. 70% probability of landfall in Odisha coast within 5-7 days.',
      type: 'alert',
      icon: <Wind size={18} className="text-red-500" />,
      timestamp: '6 hours ago'
    },
    {
      id: 3,
      title: 'Resource Optimization',
      description: 'AI recommends reallocating 30% of medical supplies from Mumbai to Wayanad based on current disaster progression patterns.',
      type: 'insight',
      icon: <TrendingUp size={18} className="text-green-500" />,
      timestamp: '12 hours ago'
    }
  ];

  const getInsightStyle = (type: string) => {
    switch (type) {
      case 'warning':
        return 'border-yellow-200 bg-yellow-50';
      case 'alert':
        return 'border-red-200 bg-red-50';
      case 'insight':
        return 'border-green-200 bg-green-50';
      default:
        return 'border-gray-200 bg-gray-50';
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <h2 className="text-lg font-semibold">AI Insights & Predictions</h2>
          <span className="ml-2 px-2 py-0.5 text-xs bg-purple-100 text-purple-800 rounded">Powered by ML</span>
        </div>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All</button>
      </div>
      
      <div className="space-y-3">
        {insights.map(insight => (
          <div 
            key={insight.id} 
            className={`p-4 rounded-lg border ${getInsightStyle(insight.type)}`}
          >
            <div className="flex items-start">
              <div className="mt-0.5 mr-3">
                {insight.icon}
              </div>
              <div>
                <div className="flex items-center">
                  <h3 className="font-medium">{insight.title}</h3>
                  {insight.type === 'alert' && (
                    <span className="ml-2 px-2 py-0.5 text-xs bg-red-100 text-red-800 rounded">Urgent</span>
                  )}
                </div>
                <p className="text-sm text-gray-700 mt-1">{insight.description}</p>
                <p className="text-xs text-gray-500 mt-2">{insight.timestamp}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <div className="flex items-center justify-between">
          <div className="flex items-center">
            <AlertTriangle size={16} className="text-yellow-500 mr-2" />
            <p className="text-sm font-medium">Predictive Alert System</p>
          </div>
          <p className="text-xs text-gray-500">Last updated: 2 hours ago</p>
        </div>
        <p className="text-sm text-gray-600 mt-2">
          AI models are continuously monitoring weather patterns, seismic activity, and historical data to predict potential disasters before they occur.
        </p>
      </div>
    </div>
  );
};

export default AIInsights;