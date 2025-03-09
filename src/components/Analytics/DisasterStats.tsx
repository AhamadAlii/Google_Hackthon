import React from 'react';
import { Bar } from 'react-chartjs-2';
import { 
  Chart as ChartJS, 
  CategoryScale, 
  LinearScale, 
  BarElement, 
  Title, 
  Tooltip, 
  Legend 
} from 'chart.js';
import { disasterStatsByType } from '../../data/mockData';

ChartJS.register(
  CategoryScale,
  LinearScale,
  BarElement,
  Title,
  Tooltip,
  Legend
);

const DisasterStats: React.FC = () => {
  const chartData = {
    labels: disasterStatsByType.map(item => item.type.charAt(0).toUpperCase() + item.type.slice(1)),
    datasets: [
      {
        label: 'Number of Incidents',
        data: disasterStatsByType.map(item => item.count),
        backgroundColor: 'rgba(59, 130, 246, 0.6)', // blue-500 with opacity
        borderColor: 'rgb(59, 130, 246)',
        borderWidth: 1
      },
      {
        label: 'Affected Population (thousands)',
        data: disasterStatsByType.map(item => item.affected / 1000),
        backgroundColor: 'rgba(239, 68, 68, 0.6)', // red-500 with opacity
        borderColor: 'rgb(239, 68, 68)',
        borderWidth: 1
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
        text: 'Disaster Statistics by Type (Last 12 Months)',
        font: {
          size: 16
        }
      },
    },
    scales: {
      y: {
        beginAtZero: true,
        title: {
          display: true,
          text: 'Count / Population (thousands)'
        }
      }
    }
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Disaster Statistics</h2>
      <Bar data={chartData} options={options} height={300} />
      
      <div className="mt-4 grid grid-cols-3 gap-4">
        {disasterStatsByType.map((item, index) => (
          <div key={index} className="bg-gray-50 p-3 rounded-lg">
            <h3 className="text-sm font-medium capitalize">{item.type}</h3>
            <div className="flex justify-between mt-2">
              <div>
                <p className="text-xs text-gray-500">Incidents</p>
                <p className="text-lg font-semibold">{item.count}</p>
              </div>
              <div>
                <p className="text-xs text-gray-500">Affected</p>
                <p className="text-lg font-semibold">{(item.affected / 1000).toFixed(1)}K</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default DisasterStats;