import React from 'react';
import { Line } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  PointElement, 
  LineElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { responseTimeData } from '../../data/mockData';
import { TrendingDown } from 'lucide-react';

ChartJS.register(
  CategoryScale,
  LinearScale,
  PointElement,
  LineElement,
  Title,
  Tooltip,
  Legend
);

const ResponseTimeAnalysis: React.FC = () => {
  const chartData = {
    labels: responseTimeData.map(item => item.month),
    datasets: [
      {
        label: 'Average Response Time (hours)',
        data: responseTimeData.map(item => item.time),
        borderColor: 'rgb(16, 185, 129)', // green-600
        backgroundColor: 'rgba(16, 185, 129, 0.5)',
        tension: 0.3,
        fill: true
      }
    ]
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top' as const,
      },
      title: {
        display: true,
        text: 'Average Disaster Response Time Trend',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: false,
        title: {
          display: true,
          text: 'Hours'
        }
      }
    }
  };

  // Calculate improvement percentage
  const firstMonth = responseTimeData[0].time;
  const lastMonth = responseTimeData[responseTimeData.length - 1].time;
  const improvementPercentage = ((firstMonth - lastMonth) / firstMonth) * 100;

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Response Time Analysis</h2>
      
      <div className="mb-4">
        <div className="flex items-center bg-green-50 border border-green-200 rounded-lg p-3">
          <TrendingDown size={20} className="text-green-600 mr-2" />
          <div>
            <p className="font-medium text-green-800">
              Response time improved by {improvementPercentage.toFixed(1)}%
            </p>
            <p className="text-sm text-green-700">
              From {firstMonth} hours in {responseTimeData[0].month} to {lastMonth} hours in {responseTimeData[responseTimeData.length - 1].month}
            </p>
          </div>
        </div>
      </div>
      
      <Line data={chartData} options={options} height={300} />
      
      <div className="mt-4 grid grid-cols-2 gap-4">
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium">Key Factors in Improvement</h3>
          <ul className="mt-2 text-sm text-gray-600 space-y-1">
            <li>• AI-powered early warning system</li>
            <li>• Optimized resource pre-positioning</li>
            <li>• Improved team coordination protocols</li>
            <li>• Enhanced communication infrastructure</li>
          </ul>
        </div>
        
        <div className="bg-gray-50 p-3 rounded-lg">
          <h3 className="text-sm font-medium">Target Response Times</h3>
          <div className="mt-2 space-y-2">
            <div>
              <div className="flex justify-between text-sm">
                <span>Critical Disasters</span>
                <span className="font-medium">4 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-red-500 h-2 rounded-full"
                  style={{ width: `${(lastMonth / 4) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>High Severity</span>
                <span className="font-medium">6 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-orange-500 h-2 rounded-full"
                  style={{ width: `${(lastMonth / 6) * 100}%` }}
                ></div>
              </div>
            </div>
            
            <div>
              <div className="flex justify-between text-sm">
                <span>Medium Severity</span>
                <span className="font-medium">12 hours</span>
              </div>
              <div className="w-full bg-gray-200 rounded-full h-2 mt-1">
                <div 
                  className="bg-yellow-500 h-2 rounded-full"
                  style={{ width: `${(lastMonth / 12) * 100}%` }}
                ></div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResponseTimeAnalysis;