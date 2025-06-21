
import React from 'react';
import { Search, Menu, Star, Calendar } from 'lucide-react';
import { NameCard } from './NameCard';
import { StatsGraph } from './StatsGraph';
import { TopCountries } from './TopCountries';
import { Segmentation } from './Segmentation';
import { Satisfaction } from './Satisfaction';
import { AddComponent } from './AddComponent';

interface ContentProps {
  onSidebarShow: () => void;
}

const employeeData = [
  {
    id: 1,
    name: 'Arjun Sharma',
    position: "AI/ML Engineer",
    transactions: 3490,
    rise: true,
    tasksCompleted: 4,
    imgId: 0,
  },
  {
    id: 2,
    name: 'Rojin Patel',
    position: "Full Stack Developer",
    transactions: 2890,
    rise: true,
    tasksCompleted: 5,
    imgId: 1,
  },
  {
    id: 3,
    name: 'David Wilson',
    position: "Project Manager",
    transactions: 2600,
    rise: false,
    tasksCompleted: 3,
    imgId: 2,
  },
];

export const DashboardContent: React.FC<ContentProps> = ({ onSidebarShow }) => {
  return (
    <div className="flex w-full">
      <div className="w-full h-screen hidden sm:block sm:w-20 xl:w-60 flex-shrink-0">
        {/* Spacer for sidebar */}
      </div>
      <div className="h-screen flex-grow overflow-x-hidden overflow-auto flex flex-wrap content-start p-2">
        <div className="w-full sm:flex p-2 items-end">
          <div className="sm:flex-grow flex justify-between">
            <div className="">
              <div className="flex items-center">
                <div className="text-3xl font-bold text-white">Hello David</div>
                <div className="flex items-center p-2 bg-[#171717] ml-2 rounded-xl">
                  <Star className="w-4 h-4 text-[#f7b91c]" />
                  <div className="ml-2 font-bold text-[#f7b91c]">
                    PREMIUM
                  </div>
                </div>
              </div>
              <div className="flex items-center">
                <Calendar className="w-3 h-3 text-gray-400" />
                <div className="ml-2 text-gray-400">October 26</div>
              </div>
            </div>
            <button
              onClick={onSidebarShow}
              className="block sm:hidden p-2 hover:bg-white/5 rounded"
            >
              <Menu size={20} />
            </button>
          </div>
          <div className="w-full sm:w-56 mt-4 sm:mt-0 relative">
            <Search className="w-5 h-5 absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" />
            <input
              type="text"
              className="pl-12 py-2 pr-2 block w-full rounded-lg border-gray-600 bg-[#171717] text-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500"
              placeholder="Search projects..."
            />
          </div>
        </div>

        {employeeData.map((employee) => (
          <NameCard
            key={employee.id}
            {...employee}
          />
        ))}

        <div className="w-full p-2 lg:w-2/3">
          <div className="rounded-lg bg-[#171717] h-80">
            <StatsGraph />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-[#171717] h-80">
            <TopCountries />
          </div>
        </div>

        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-[#171717] h-80">
            <Segmentation />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-[#171717] h-80">
            <Satisfaction />
          </div>
        </div>
        <div className="w-full p-2 lg:w-1/3">
          <div className="rounded-lg bg-[#171717] overflow-hidden h-80">
            <AddComponent />
          </div>
        </div>
      </div>
    </div>
  );
};
