import React from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import Dashboard from './pages/Dashboard';
import DisastersPage from './pages/DisastersPage';
import ResourcesPage from './pages/ResourcesPage';
import TeamsPage from './pages/TeamsPage';
import MapPage from './pages/MapPage';
import AlertsPage from './pages/AlertsPage';
import AnalyticsPage from './pages/AnalyticsPage';
import SettingsPage from './pages/SettingsPage';

function App() {
  return (
    <Router>
      <div className="flex h-screen bg-gray-100">
        <Sidebar />
        <div className="flex-1 flex flex-col overflow-hidden">
          <Header />
          <main className="flex-1 overflow-y-auto">
            <Routes>
              <Route path="/" element={<Dashboard />} />
              <Route path="/disasters" element={<DisastersPage />} />
              <Route path="/resources" element={<ResourcesPage />} />
              <Route path="/teams" element={<TeamsPage />} />
              <Route path="/map" element={<MapPage />} />
              <Route path="/alerts" element={<AlertsPage />} />
              <Route path="/analytics" element={<AnalyticsPage />} />
              <Route path="/settings" element={<SettingsPage />} />
            </Routes>
          </main>
        </div>
      </div>
    </Router>
  );
}

export default App;