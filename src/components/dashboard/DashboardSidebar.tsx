import React, { useState } from 'react';
import { X, User, Users, FileText, Settings, Code, BarChart2 } from 'lucide-react';
import { useSpring, animated, config } from '@react-spring/web';
import { Link, useLocation } from 'react-router-dom';
import clsx from 'clsx';

interface SidebarProps {
  onSidebarHide: () => void;
  showSidebar: boolean;
  isSuperAdmin?: boolean;
  adminCount?: number;
}

interface SidebarItem {
  id: string;
  title: string;
  icon: string;
  notifications: boolean | number;
  href: string;
}

interface MenuItemProps {
  item: SidebarItem;
  isActive: boolean;
}

const sidebarItems: (isSuperAdmin: boolean, adminCount: number) => SidebarItem[][] = (isSuperAdmin, adminCount = 0) => [
  [
    { id: '0', title: 'Dashboard', icon: 'dashboard', notifications: false, href: '/dashboard' },
    { id: '1', title: 'Overview', icon: 'overview', notifications: false, href: '/overview' },
    ...(isSuperAdmin ? [{ id: '2', title: 'Analytics', icon: 'analytics', notifications: false, href: '/analytics' }] : []),
    { id: '3', title: 'Team', icon: 'team', notifications: adminCount > 0 ? adminCount : false, href: '/team' },
  ],
  [
    { id: '6', title: 'Settings', icon: 'settings', notifications: false, href: '/settings' },
  ],
];

export const DashboardSidebar: React.FC<SidebarProps> = ({ onSidebarHide, showSidebar, isSuperAdmin = false, adminCount = 0 }) => {
  const location = useLocation();
  
  const { dashOffset, indicatorWidth, percentage } = useSpring({
    dashOffset: 26.015,
    indicatorWidth: 70,
    percentage: 77,
    from: { dashOffset: 113.113, indicatorWidth: 0, percentage: 0 },
    config: config.molasses,
  });

  const isActive = (href: string) => location.pathname === href;

  return (
    <div className={clsx(
      'fixed inset-y-0 left-0 bg-[#0f0f15] z-30 w-full sm:w-20 xl:w-60 sm:block',
      showSidebar ? '' : 'hidden',
    )}>
      <div className="flex flex-col h-full">
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex h-full sm:justify-center xl:justify-start p-2 items-center">
            <Link to="/" className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-gradient-to-r from-blue-400 to-purple-500 flex items-center justify-center text-white">
                <Code size={24} />
              </div>
              <div className="hidden xl:block">
                <div className="text-xl font-medium text-white">DUAL NOVA</div>
                <div className="text-sm text-gray-500">Admin Panel</div>
              </div>
            </Link>
            <div className="flex-grow"></div>
            <button 
              onClick={onSidebarHide}
              className="w-8 h-8 flex items-center justify-center sm:hidden"
            >
              <X size={20} className="text-gray-400" />
            </button>
          </div>
        </div>

        <div className="flex-grow overflow-y-auto">
          {sidebarItems(isSuperAdmin, adminCount).map((group, groupIndex) => (
            <div key={groupIndex} className="px-4">
              {groupIndex === 1 && (
                <hr className="border-t border-[#2e2e2e] w-full my-4 px-4 sm:hidden xl:block" />
              )}
              {group.map((item) => (
                <MenuItem 
                  key={item.id} 
                  item={item} 
                  isActive={isActive(item.href)}
                />
              ))}
            </div>
          ))}

          <div className="w-full p-3 h-28 hidden sm:block sm:h-20 xl:h-32">
            <div className="rounded-xl w-full h-full px-3 sm:px-0 xl:px-3 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
              <div className="block sm:hidden xl:block pt-3">
                <div className="font-bold text-gray-300 text-sm">Used Space</div>
                <div className="text-gray-500 text-xs">
                  Admin updated 09:12 am November 08, 2020
                </div>
                <animated.div className="text-right text-gray-400 text-xs">
                  {percentage.to((i) => `${Math.round(i)}%`)}
                </animated.div>
                <div className="w-full text-gray-300 mt-2">
                  <div className="w-full h-1 bg-gray-600 rounded-full">
                    <animated.div
                      className="h-full bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"
                      style={{ width: indicatorWidth.to((i) => `${i}%`) }}
                    />
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Footer */}
        <div className="flex-shrink-0 overflow-hidden p-2">
          <div className="flex items-center h-full sm:justify-center xl:justify-start p-2 border-t border-[#2e2e2e]">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center">
              <User size={20} className="text-white" />
            </div>
            <div className="block sm:hidden xl:block ml-2 font-bold text-white">
              Jerry Wilson
            </div>
            <div className="flex-grow block sm:hidden xl:block" />
          </div>
        </div>
      </div>
    </div>
  );
};

const MenuItem: React.FC<MenuItemProps> = ({ item, isActive }) => {
  const getIcon = (iconName: string) => {
    const iconMap = {
      dashboard: Code,
      overview: FileText,
      analytics: BarChart2,
      team: Users,
      settings: Settings,
    };
    const IconComponent = iconMap[iconName as keyof typeof iconMap] || Code;
    return <IconComponent size={20} />;
  };

  return (
    <Link
      to={item.href}
      className={clsx(
        'w-full mt-6 flex items-center px-3 sm:px-0 xl:px-3 justify-start sm:justify-center xl:justify-start sm:mt-6 xl:mt-3 cursor-pointer transition-colors duration-200',
        isActive 
          ? 'text-white border-r-2 border-white' 
          : 'text-gray-400 hover:text-gray-300 border-r-2 border-transparent',
      )}
    >
      <div className="w-5 h-5 flex items-center justify-center">
        {getIcon(item.icon)}
      </div>
      <div className="block sm:hidden xl:block ml-2">{item.title}</div>
      <div className="block sm:hidden xl:block flex-grow" />
      {item.notifications && (
        <div className="flex sm:hidden xl:flex bg-pink-600 w-5 h-5 items-center justify-center rounded-full mr-2">
          <div className="text-white text-xs">{item.notifications}</div>
        </div>
      )}
    </Link>
  );
};
