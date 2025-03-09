import React from 'react';
import { responseTeams } from '../../data/mockData';
import { Users, MapPin } from 'lucide-react';

const ResponseTeamStatus: React.FC = () => {
  const deployedTeams = responseTeams.filter(team => team.status === 'deployed');
  const standbyTeams = responseTeams.filter(team => team.status === 'standby');
  
  // Group teams by type
  const teamsByType = responseTeams.reduce((acc, team) => {
    if (!acc[team.type]) {
      acc[team.type] = [];
    }
    acc[team.type].push(team);
    return acc;
  }, {} as Record<string, typeof responseTeams>);

  return (
    <div className="bg-white rounded-lg shadow-md p-5">
      <div className="flex justify-between items-center mb-4">
        <h2 className="text-lg font-semibold">Response Team Status</h2>
        <button className="text-sm text-blue-600 hover:text-blue-800">View All Teams</button>
      </div>
      
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
        <div className="bg-blue-50 border border-blue-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-blue-100 p-2 rounded-lg">
              <Users size={20} className="text-blue-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-blue-700">Deployed Teams</p>
              <p className="text-2xl font-bold text-blue-800">{deployedTeams.length}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xs text-blue-700 mb-1">Personnel Deployed</div>
            <p className="text-lg font-semibold">
              {deployedTeams.reduce((sum, team) => sum + team.size, 0)} personnel
            </p>
          </div>
        </div>
        
        <div className="bg-green-50 border border-green-200 rounded-lg p-4">
          <div className="flex items-center">
            <div className="bg-green-100 p-2 rounded-lg">
              <Users size={20} className="text-green-600" />
            </div>
            <div className="ml-3">
              <p className="text-sm text-green-700">Standby Teams</p>
              <p className="text-2xl font-bold text-green-800">{standbyTeams.length}</p>
            </div>
          </div>
          <div className="mt-3">
            <div className="text-xs text-green-700 mb-1">Personnel Available</div>
            <p className="text-lg font-semibold">
              {standbyTeams.reduce((sum, team) => sum + team.size, 0)} personnel
            </p>
          </div>
        </div>
      </div>
      
      <h3 className="font-medium text-gray-700 mb-3">Teams by Type</h3>
      <div className="space-y-3">
        {Object.entries(teamsByType).map(([type, teams]) => (
          <div key={type} className="flex items-center justify-between p-3 bg-gray-50 rounded-lg">
            <div className="flex items-center">
              <div className={`w-8 h-8 rounded-full flex items-center justify-center
                ${type === 'rescue' ? 'bg-red-100 text-red-600' : 
                  type === 'medical' ? 'bg-blue-100 text-blue-600' : 
                  type === 'relief' ? 'bg-green-100 text-green-600' : 
                  type === 'technical' ? 'bg-purple-100 text-purple-600' : 
                  'bg-gray-100 text-gray-600'}`}>
                <Users size={16} />
              </div>
              <div className="ml-3">
                <p className="font-medium capitalize">{type} Teams</p>
                <p className="text-sm text-gray-500">{teams.length} teams, {teams.reduce((sum, t) => sum + t.size, 0)} personnel</p>
              </div>
            </div>
            <div className="flex items-center">
              <div className="bg-gray-200 h-2 w-24 rounded-full mr-2">
                <div 
                  className={`h-2 rounded-full
                    ${type === 'rescue' ? 'bg-red-500' : 
                      type === 'medical' ? 'bg-blue-500' : 
                      type === 'relief' ? 'bg-green-500' : 
                      type === 'technical' ? 'bg-purple-500' : 
                      'bg-gray-500'}`}
                  style={{ width: `${(teams.filter(t => t.status === 'deployed').length / teams.length) * 100}%` }}
                ></div>
              </div>
              <span className="text-sm text-gray-600">
                {Math.round((teams.filter(t => t.status === 'deployed').length / teams.length) * 100)}% deployed
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <div className="mt-4 pt-4 border-t border-gray-200">
        <h3 className="font-medium text-gray-700 mb-3">Recently Deployed</h3>
        <div className="space-y-2">
          {deployedTeams.slice(0, 2).map(team => (
            <div key={team.id} className="flex items-center justify-between p-2 hover:bg-gray-50 rounded">
              <div>
                <p className="font-medium">{team.name}</p>
                <div className="flex items-center text-sm text-gray-500 mt-1">
                  <MapPin size={14} className="mr-1" />
                  {team.location.district}, {team.location.state}
                </div>
              </div>
              <div className="text-right">
                <p className="text-sm">{team.size} personnel</p>
                <p className="text-xs text-gray-500">
                  Deployed {new Date(team.lastUpdated).toLocaleDateString()}
                </p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default ResponseTeamStatus;