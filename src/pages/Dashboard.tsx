import React from 'react';
import DisasterSummary from '../components/Dashboard/DisasterSummary';
import RecentDisasters from '../components/Dashboard/RecentDisasters';
import ResourceStatus from '../components/Dashboard/ResourceStatus';
import ResponseTeamStatus from '../components/Dashboard/ResponseTeamStatus';
import AIInsights from '../components/Dashboard/AIInsights';

const Dashboard: React.FC = () => {
  return (
    <div className="p-6 space-y-6">
      <DisasterSummary />
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <RecentDisasters />
        <ResourceStatus />
      </div>
      
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <ResponseTeamStatus />
        <AIInsights />
      </div>
    </div>
  );
};

export default Dashboard;