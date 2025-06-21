
import React, { useState } from 'react';
import { DashboardSidebar } from '../components/dashboard/DashboardSidebar';
import { Menu, Plus, Search, Filter, CheckCircle, Circle, Clock, AlertCircle } from 'lucide-react';

const Tasks = () => {
  const [showSidebar, setShowSidebar] = useState(false);
  const [filter, setFilter] = useState('all');

  const tasks = [
    {
      id: 1,
      title: 'Update user dashboard design',
      description: 'Redesign the main dashboard with new color scheme and improved UX',
      status: 'completed',
      priority: 'high',
      assignee: 'Alice Johnson',
      dueDate: '2024-01-15',
      category: 'Design'
    },
    {
      id: 2,
      title: 'Fix authentication bug',
      description: 'Resolve login issues on mobile devices',
      status: 'in-progress',
      priority: 'urgent',
      assignee: 'Bob Smith',
      dueDate: '2024-01-12',
      category: 'Development'
    },
    {
      id: 3,
      title: 'Prepare project documentation',
      description: 'Create comprehensive documentation for the new features',
      status: 'pending',
      priority: 'medium',
      assignee: 'Carol White',
      dueDate: '2024-01-20',
      category: 'Documentation'
    },
    {
      id: 4,
      title: 'Client meeting preparation',
      description: 'Prepare presentation slides for quarterly review',
      status: 'pending',
      priority: 'high',
      assignee: 'David Brown',
      dueDate: '2024-01-18',
      category: 'Management'
    },
  ];

  const getStatusIcon = (status: string) => {
    switch (status) {
      case 'completed': return <CheckCircle size={16} className="text-green-500" />;
      case 'in-progress': return <Clock size={16} className="text-blue-500" />;
      case 'pending': return <Circle size={16} className="text-gray-500" />;
      default: return <Circle size={16} className="text-gray-500" />;
    }
  };

  const getPriorityColor = (priority: string) => {
    switch (priority) {
      case 'urgent': return 'bg-red-500';
      case 'high': return 'bg-orange-500';
      case 'medium': return 'bg-yellow-500';
      case 'low': return 'bg-green-500';
      default: return 'bg-gray-500';
    }
  };

  const filteredTasks = filter === 'all' ? tasks : tasks.filter(task => task.status === filter);

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
              <h1 className="text-2xl font-bold text-white">Tasks</h1>
            </div>
            <button className="flex items-center gap-2 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg hover:from-blue-600 hover:to-purple-600 transition-colors">
              <Plus size={16} />
              New Task
            </button>
          </div>

          {/* Filters */}
          <div className="p-6 bg-[#1e1e1e] border-b border-gray-800">
            <div className="flex items-center gap-4 mb-4">
              <div className="relative flex-1 max-w-md">
                <Search size={16} className="absolute left-3 top-3 text-gray-500" />
                <input
                  type="text"
                  placeholder="Search tasks..."
                  className="w-full pl-10 pr-4 py-2 bg-[#171717] border border-gray-700 rounded-lg text-white placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500"
                />
              </div>
              <button className="flex items-center gap-2 px-4 py-2 bg-[#171717] border border-gray-700 rounded-lg hover:bg-[#2d2d2d] transition-colors">
                <Filter size={16} />
                Filter
              </button>
            </div>
            <div className="flex gap-2">
              {['all', 'pending', 'in-progress', 'completed'].map((status) => (
                <button
                  key={status}
                  onClick={() => setFilter(status)}
                  className={`px-4 py-2 rounded-lg text-sm font-medium transition-colors capitalize ${
                    filter === status
                      ? 'bg-gradient-to-r from-blue-500 to-purple-500 text-white'
                      : 'bg-[#171717] text-gray-400 hover:text-white hover:bg-[#2d2d2d]'
                  }`}
                >
                  {status === 'all' ? 'All Tasks' : status.replace('-', ' ')}
                </button>
              ))}
            </div>
          </div>

          {/* Tasks List */}
          <div className="flex-1 p-6 overflow-auto">
            <div className="space-y-4">
              {filteredTasks.map((task) => (
                <div key={task.id} className="bg-[#171717] rounded-xl p-6 border border-gray-800 hover:border-gray-700 transition-colors">
                  <div className="flex items-start justify-between mb-3">
                    <div className="flex items-start gap-3">
                      {getStatusIcon(task.status)}
                      <div className="flex-1">
                        <h3 className="text-lg font-semibold text-white mb-1">{task.title}</h3>
                        <p className="text-gray-400 text-sm">{task.description}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <div className={`w-2 h-2 rounded-full ${getPriorityColor(task.priority)}`}></div>
                      <span className="text-xs text-gray-500 capitalize">{task.priority}</span>
                    </div>
                  </div>
                  
                  <div className="flex items-center justify-between text-sm">
                    <div className="flex items-center gap-4">
                      <span className="text-gray-400">
                        Assigned to: <span className="text-white">{task.assignee}</span>
                      </span>
                      <span className="px-2 py-1 bg-[#2d2d2d] rounded text-gray-300">{task.category}</span>
                    </div>
                    <div className="flex items-center gap-2 text-gray-400">
                      <Clock size={14} />
                      Due: {task.dueDate}
                    </div>
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

export default Tasks;
