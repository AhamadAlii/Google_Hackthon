import React from 'react';
import DisasterStats from '../components/Analytics/DisasterStats';
import ResourceAllocation from '../components/Analytics/ResourceAllocation';
import ResponseTimeAnalysis from '../components/Analytics/ResponseTimeAnalysis';
import StateWiseAnalysis from '../components/Analytics/StateWiseAnalysis';

const AnalyticsPage: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <DisasterStats />
        <ResourceAllocation />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseTimeAnalysis />
        <StateWiseAnalysis />
      </div>
    </div>
  );
};

export default AnalyticsPage;