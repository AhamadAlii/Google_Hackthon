import React from 'react';
import { Doughnut } from 'react-chartjs-2';
import { Chart as ChartJS, ArcElement, Tooltip, Legend } from 'chart.js';
import { resourceAllocationData } from '../../data/mockData';

ChartJS.register(ArcElement, Tooltip, Legend);

const ResourceAllocation: React.FC = () => {
  const chartData = {
    labels: resourceAllocationData.map(item => 
      item.category.charAt(0).toUpperCase() + item.category.slice(1)
    ),
    datasets: [
      {
        label: 'Allocation Percentage',
        data: resourceAllocationData.map(item => item.allocated),
        backgroundColor: [
          'rgba(59, 130, 246, 0.7)', // blue
          'rgba(239, 68, 68, 0.7)',  // red
          'rgba(16, 185, 129, 0.7)', // green
          'rgba(245, 158, 11, 0.7)', // amber
          'rgba(139, 92, 246, 0.7)', // purple
          'rgba(107, 114, 128, 0.7)' // gray
        ],
        borderColor: [
          'rgb(59, 130, 246)',
          'rgb(239, 68, 68)',
          'rgb(16, 185, 129)',
          'rgb(245, 158, 11)',
          'rgb(139, 92, 246)',
          'rgb(107, 114, 128)'
        ],
        borderWidth: 1,
      },
    ],
  };

  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'right' as const,
      },
      title: {
        display: true,
        text: 'Resource Allocation by Category',
        font: {
          size: 16
        }
      },
    },
  };

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <h2 className="text-lg font-semibold mb-4">Resource Allocation</h2>
      
      <div className="flex flex-col md:flex-row items-center">
        <div className="w-full md:w-1/2">
          <Doughnut data={chartData} options={options} />
        </div>
        
        <div className="w-full md:w-1/2 mt-4 md:mt-0">
          <h3 className="text-sm font-medium mb-3">Allocation Details</h3>
          <div className="space-y-3">
            {resourceAllocationData.map((item, index) => (
              <div key={index} className="flex items-center justify-between">
                <div className="flex items-center">
                  <div 
                    className="w-3 h-3 rounded-full mr-2"
                    style={{ backgroundColor: chartData.datasets[0].backgroundColor[index] as string }}
                  ></div>
                  <span className="text-sm capitalize">{item.category}</span>
                </div>
                <div className="flex items-center">
                  <div className="w-32 bg-gray-200 rounded-full h-2 mr-2">
                    <div 
                      className="h-2 rounded-full"
                      style={{ 
                        width: `${item.allocated}%`,
                        backgroundColor: chartData.datasets[0].backgroundColor[index] as string
                      }}
                    ></div>
                  </div>
                  <span className="text-sm font-medium">{item.allocated}%</span>
                </div>
              </div>
            ))}
          </div>
          
          <div className="mt-4 pt-4 border-t border-gray-200">
            <div className="flex justify-between text-sm">
              <div>
                <p className="text-gray-500">Average Allocation</p>
                <p className="font-semibold">
                  {Math.round(
                    resourceAllocationData.reduce((sum, item) => sum + item.allocated, 0) / 
                    resourceAllocationData.length
                  )}%
                </p>
              </div>
              <div>
                <p className="text-gray-500">Resources Available</p>
                <p className="font-semibold">
                  {Math.round(
                    resourceAllocationData.reduce((sum, item) => sum + item.available, 0) / 
                    resourceAllocationData.length
                  )}%
                </p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default ResourceAllocation;