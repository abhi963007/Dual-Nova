
import React, { useState } from 'react';
import { X, User, MessageCircle, Users, Calendar, FileText, Settings, Code } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import clsx from 'clsx';

interface SidebarProps {
  onSidebarHide: () => void;
  showSidebar: boolean;
}

const sidebarItems = [
  [
    { id: '0', title: 'Dashboard', icon: 'dashboard', notifications: false },
    { id: '1', title: 'Overview', icon: 'overview', notifications: false },
    { id: '2', title: 'Chat', icon: 'chat', notifications: 6 },
    { id: '3', title: 'Team', icon: 'team', notifications: false },
  ],
  [
    { id: '4', title: 'Tasks', icon: 'tasks', notifications: false },
    { id: '5', title: 'Reports', icon: 'reports', notifications: false },
    { id: '6', title: 'Settings', icon: 'settings', notifications: false },
  ],
];

export const DashboardSidebar: React.FC<SidebarProps> = ({ onSidebarHide, showSidebar }) => {
  const [selected, setSelected] = useState('0');
  
  const { dashOffset, indicatorWidth, percentage } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 70,
    percentage: 77,
    from: { dashOffset: 113.113, indicatorWidth: 0, percentage: 0 },
    config: config.molasses,
  });

  return (
    <div
      className={clsx(
        'fixed inset-y-0 left-0 bg-[#171717] w-full sm:w-20 xl:w-60 sm:flex flex-col z-10',
        showSidebar ? 'flex' : 'hidden',
      )}
    >
      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 border-b border-[#2e2e2e]">
          <div className="flex items-center justify-center w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-lg">
            <Code size={20} className="text-white" />
          </div>
          <div className="block sm:hidden xl:block ml-2 font-bold text-xl text-white">
            DUAL NOVA
          </div>
          <div className="flex-grow sm:hidden xl:block" />
          <button
            onClick={onSidebarHide}
            className="block sm:hidden p-1 hover:bg-white/5 rounded"
          >
            <X size={20} />
          </button>
        </div>
      </div>

      <div className="flex-grow overflow-x-hidden overflow-y-auto flex flex-col">
        <div className="w-full p-3 h-24 sm:h-20 xl:h-24 hidden sm:block flex-shrink-0">
          <div className="bg-[#353535] rounded-xl w-full h-full flex items-center justify-start sm:justify-center xl:justify-start px-3 sm:px-0 xl:px-3">
            <div className="w-9 h-9 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="block sm:hidden xl:block ml-3">
              <div className="text-sm font-bold text-white">Development Hub</div>
              <div className="text-sm text-gray-400">AI/ML Projects</div>
            </div>
            <div className="block sm:hidden xl:block flex-grow" />
          </div>
        </div>

        {sidebarItems[0].map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onClick={setSelected}
            selected={selected}
          />
        ))}
        
        <div className="mt-8 mb-0 font-bold px-3 block sm:hidden xl:block text-gray-400">
          SHORTCUTS
        </div>
        
        {sidebarItems[1].map((item) => (
          <MenuItem
            key={item.id}
            item={item}
            onClick={setSelected}
            selected={selected}
          />
        ))}
        
        <div className="flex-grow" />
        
        <div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32">
          <div className="rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden bg-gradient-to-br from-blue-900/20 to-purple-900/20">
            <div className="block sm:hidden xl:block pt-3">
              <div className="font-bold text-gray-300 text-sm">Used Space</div>
              <div className="text-gray-500 text-xs">
                Admin updated 09:12 am November 08,2020
              </div>
              <animated.div className="text-right text-gray-400 text-xs">
                {percentage.to((i) => `${Math.round(i)}%`)}
              </animated.div>
              <div className="w-full text-gray-300">
                <svg
                  viewBox="0 0 100 11"
                  fill="none"
                  xmlns="http://www.w3.org/2000/svg"
                >
                  <line
                    x1="5"
                    y1="5.25"
                    x2="95"
                    y2="5.25"
                    stroke="#3C3C3C"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                  <animated.line
                    x1="5"
                    y1="5.25"
                    x2={indicatorWidth}
                    y2="5.25"
                    stroke="currentColor"
                    strokeWidth="5"
                    strokeLinecap="round"
                  />
                </svg>
              </div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex-shrink-0 overflow-hidden p-2">
        <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 border-t border-[#2e2e2e]">
          <div className="w-10 h-10 bg-gradient-to-r from-green-500 to-blue-500 rounded-full flex items-center justify-center text-white font-bold">
            D
          </div>
          <div className="block sm:hidden xl:block ml-2 font-bold text-white">
            David Wilson
          </div>
          <div className="flex-grow block sm:hidden xl:block" />
          <Settings size={16} className="block sm:hidden xl:block text-gray-400" />
        </div>
      </div>
    </div>
  );
};

interface MenuItemProps {
  item: {
    id: string;
    title: string;
    icon: string;
    notifications: number | false;
  };
  onClick: (id: string) => void;
  selected: string;
}

const MenuItem: React.FC<MenuItemProps> = ({ item: { id, title, notifications }, onClick, selected }) => {
  const getIcon = (iconName: string) => {
    const icons: Record<string, React.ReactNode> = {
      dashboard: <Calendar size={20} />,
      overview: <FileText size={20} />,
      chat: <MessageCircle size={20} />,
      team: <Users size={20} />,
      tasks: <Calendar size={20} />,
      reports: <FileText size={20} />,
      settings: <Settings size={20} />,
    };
    return icons[iconName] || <Calendar size={20} />;
  };

  return (
    <div
      className={clsx(
        'w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer',
        selected === id 
          ? 'text-white border-r-2 border-white' 
          : 'text-gray-400 border-r-2 border-transparent hover:text-gray-300',
      )}
      onClick={() => onClick(id)}
    >
      {getIcon('dashboard')}
      <div className="block sm:hidden xl:block ml-2">{title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600 w-5 h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-sm">{notifications}</div>
        </div>
      )}
    </div>
  );
};
