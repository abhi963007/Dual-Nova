
import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { DashboardContent } from '../components/dashboard/DashboardContent';

const Dashboard = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
        />
        <DashboardContent
          onSidebarShow={() => setShowSidebar(true)}
        />
      </div>
    </div>
  );
};

export default Dashboard;
