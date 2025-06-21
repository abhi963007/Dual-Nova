
import React from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, TrendingUp, Users, Activity, DollarSign } from 'lucide-react';

const Overview = () => {
  const [showSidebar, setShowSidebar] = React.useState(false);

  const stats = [
    { title: 'Total Revenue', value: '$45,231.89', change: '+20.1%', icon: DollarSign },
    { title: 'Active Users', value: '2,350', change: '+180.1%', icon: Users },
    { title: 'Growth Rate', value: '12.5%', change: '+19%', icon: TrendingUp },
    { title: 'Performance', value: '89.2%', change: '+2.5%', icon: Activity },
  ];

  return (
    <div className="min-h-screen bg-[#1e1e1e] text-white font-outfit">
      <div className="flex">
        <DashboardSidebar
          onSidebarHide={() => setShowSidebar(false)}
          showSidebar={showSidebar}
        />
        <div className="flex-1 flex flex-col overflow-hidden ml-0 sm:ml-20 xl:ml-60">
          {/* Header */}
          <div className="flex items-center justify-between p-6 bg-[#1e1e1e] border-b border-gray-800">
            <div className="flex items-center gap-4">
              <button
                onClick={() => setShowSidebar(true)}
                className="block sm:hidden p-2 hover:bg-white/5 rounded-lg transition-colors"
              >
                <Menu size={20} />
              </button>
              <h1 className="text-2xl font-bold text-white">Overview</h1>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Stats Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {stats.map((stat, index) => (
                <div key={index} className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                      <stat.icon size={20} className="text-blue-400" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{stat.change}</span>
                  </div>
                  <h3 className="text-gray-400 text-sm mb-1">{stat.title}</h3>
                  <p className="text-2xl font-bold text-white">{stat.value}</p>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6">
              <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Revenue Overview</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart Component Placeholder
                </div>
              </div>
              <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">User Activity</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Chart Component Placeholder
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Overview;
