import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Download, Calendar, TrendingUp, Users, DollarSign, Activity } from 'lucide-react';

const Reports = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const reportCards = [
    {
      title: 'Revenue Report',
      description: 'Monthly revenue analysis and trends',
      icon: DollarSign,
      value: '₹37,99,404',
      change: '+12.5%',
      lastUpdated: '2 hours ago'
    },
    {
      title: 'User Analytics',
      description: 'User engagement and activity metrics',
      icon: Users,
      value: '2,350',
      change: '+18.2%',
      lastUpdated: '1 hour ago'
    },
    {
      title: 'Performance Metrics',
      description: 'System performance and uptime statistics',
      icon: Activity,
      value: '99.9%',
      change: '+0.2%',
      lastUpdated: '30 minutes ago'
    },
    {
      title: 'Growth Analysis',
      description: 'Business growth trends and projections',
      icon: TrendingUp,
      value: '15.8%',
      change: '+3.1%',
      lastUpdated: '4 hours ago'
    }
  ];

  const recentReports = [
    { name: 'Q4 2023 Financial Report', date: '2024-01-10', size: '2.4 MB', type: 'PDF' },
    { name: 'User Engagement Analysis', date: '2024-01-08', size: '1.8 MB', type: 'XLSX' },
    { name: 'Performance Dashboard', date: '2024-01-05', size: '3.2 MB', type: 'PDF' },
    { name: 'Monthly Sales Report', date: '2024-01-03', size: '1.5 MB', type: 'PDF' },
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
              <h1 className="text-2xl font-bold text-white">Reports</h1>
            </div>
            <div className="flex gap-2">
              <button className="flex items-center gap-2 px-4 py-2 bg-[#171717] border border-gray-700 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                <Calendar size={16} />
                Date Range
              </button>
              <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
                <Download size={16} />
                Export
              </button>
            </div>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Report Cards */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-4 gap-6 mb-8">
              {reportCards.map((report, index) => (
                <div key={index} className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="p-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-lg">
                      <report.icon size={20} className="text-blue-400" />
                    </div>
                    <span className="text-green-400 text-sm font-medium">{report.change}</span>
                  </div>
                  <h3 className="text-lg font-bold text-white mb-1">{report.title}</h3>
                  <p className="text-gray-400 text-sm mb-3">{report.description}</p>
                  <div className="flex items-center justify-between">
                    <span className="text-2xl font-bold text-white">{report.value}</span>
                    <span className="text-xs text-gray-500">{report.lastUpdated}</span>
                  </div>
                </div>
              ))}
            </div>

            {/* Charts Section */}
            <div className="grid grid-cols-1 xl:grid-cols-2 gap-6 mb-8">
              <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">Revenue Trends</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Revenue Chart Placeholder
                </div>
              </div>
              <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                <h3 className="text-xl font-bold text-white mb-4">User Growth</h3>
                <div className="h-64 flex items-center justify-center text-gray-500">
                  Growth Chart Placeholder
                </div>
              </div>
            </div>

            {/* Recent Reports */}
            <div className="bg-[#171717] rounded-xl p-6 border border-gray-800">
              <h3 className="text-xl font-bold text-white mb-4">Recent Reports</h3>
              <div className="space-y-3">
                {recentReports.map((report, index) => (
                  <div key={index} className="flex items-center justify-between p-3 bg-[#2d2d2d] rounded-lg hover:bg-[#3d3d3d] transition-colors">
                    <div className="flex-1">
                      <h4 className="font-medium text-white">{report.name}</h4>
                      <div className="flex items-center gap-4 text-sm text-gray-400">
                        <span>{report.date}</span>
                        <span>{report.size}</span>
                        <span className="px-2 py-1 bg-[#171717] rounded text-xs">{report.type}</span>
                      </div>
                    </div>
                    <button className="p-2 hover:bg-white/5 rounded-lg transition-colors">
                      <Download size={16} className="text-gray-400" />
                    </button>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Reports;
