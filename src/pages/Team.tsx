
import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Plus, Search, MoreVertical, Mail, Phone } from 'lucide-react';

const Team = () => {
  const [showSidebar, setShowSidebar] = useState(false);

  const teamMembers = [
    {
      id: 1,
      name: 'Alice Johnson',
      role: 'Frontend Developer',
      email: 'alice@dualnova.com',
      status: 'online',
      projects: 3,
      tasksCompleted: 24,
    },
    {
      id: 2,
      name: 'Bob Smith',
      role: 'Backend Developer',
      email: 'bob@dualnova.com',
      status: 'online',
      projects: 5,
      tasksCompleted: 18,
    },
    {
      id: 3,
      name: 'Carol White',
      role: 'UI/UX Designer',
      email: 'carol@dualnova.com',
      status: 'away',
      projects: 2,
      tasksCompleted: 31,
    },
    {
      id: 4,
      name: 'David Brown',
      role: 'Project Manager',
      email: 'david@dualnova.com',
      status: 'offline',
      projects: 7,
      tasksCompleted: 15,
    },
  ];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'online': return 'bg-green-500';
      case 'away': return 'bg-yellow-500';
      case 'offline': return 'bg-gray-500';
      default: return 'bg-gray-500';
    }
  };

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
              <h1 className="text-2xl font-bold text-white">Team</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
              <Plus size={16} />
              Add Member
            </button>
          </div>

          {/* Main Content */}
          <div className="flex-1 p-6 overflow-auto">
            {/* Search Bar */}
            <div className="mb-6">
              <div className="relative max-w-md">
                <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search team members..."
                  className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
            </div>

            {/* Team Grid */}
            <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-6">
              {teamMembers.map((member) => (
                <div key={member.id} className="bg-[#171717] rounded-xl p-6 border border-gray-800">
                  <div className="flex items-center justify-between mb-4">
                    <div className="flex items-center gap-3">
                      <div className="relative">
                        <div className="w-12 h-12 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold">
                          {member.name.split(' ').map(n => n[0]).join('')}
                        </div>
                        <div className={`absolute -bottom-1 -right-1 w-4 h-4 ${getStatusColor(member.status)} rounded-full border-2 border-[#171717]`}></div>
                      </div>
                      <div>
                        <h3 className="font-bold text-white">{member.name}</h3>
                        <p className="text-sm text-gray-400">{member.role}</p>
                      </div>
                    </div>
                    <button className="p-1 hover:bg-white/5 rounded transition-colors">
                      <MoreVertical size={16} className="text-gray-400" />
                    </button>
                  </div>

                  <div className="space-y-3 mb-4">
                    <div className="flex items-center gap-2 text-sm text-gray-300">
                      <Mail size={14} className="text-gray-500" />
                      {member.email}
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Projects:</span>
                      <span className="text-white font-medium">{member.projects}</span>
                    </div>
                    <div className="flex justify-between text-sm">
                      <span className="text-gray-400">Tasks Completed:</span>
                      <span className="text-white font-medium">{member.tasksCompleted}</span>
                    </div>
                  </div>

                  <div className="flex gap-2">
                    <button className="flex-1 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-sm">
                      <Mail size={14} className="inline mr-1" />
                      Email
                    </button>
                    <button className="flex-1 px-3 py-2 bg-[#2d2d2d] hover:bg-[#3d3d3d] rounded-lg transition-colors text-sm">
                      <Phone size={14} className="inline mr-1" />
                      Call
                    </button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Team;
