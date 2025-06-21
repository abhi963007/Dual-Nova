
import React from 'react';
import { MoreHorizontal, ChevronRight } from 'lucide-react';

const segmentationData = [
  { c1: 'AI Projects', c2: '800', c3: '#363636', color: '#535353' },
  { c1: 'Web Apps', c2: '441', c3: '#818bb1', color: '#595f77' },
  { c1: 'Mobile Apps', c2: '233', c3: '#2c365d', color: '#232942' },
  { c1: 'Other', c2: '126', c3: '#334ed8', color: '#2c3051' },
];

export const Segmentation: React.FC = () => {
  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Project Types</div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      <div className="mt-3 text-gray-400 text-sm">All projects</div>
      
      {segmentationData.map(({ c1, c2, c3, color }) => (
        <div className="flex items-center mt-3" key={c1}>
          <div
            className="w-2 h-2 rounded-full"
            style={{ background: color }}
          />
          <div className="ml-2 text-sm" style={{ color }}>
            {c1}
          </div>
          <div className="flex-grow" />
          <div className="text-sm" style={{ color }}>
            {c2}
          </div>
          <div className="ml-2 w-12 h-0.5 bg-[#696969]" />
          <div className="ml-2 h-8">
            <div
              className="w-20 h-8 rounded-lg overflow-hidden"
              style={{ background: c3 }}
            />
          </div>
        </div>
      ))}

      <div className="flex mt-6 px-3 items-center justify-between bg-[#1e1e1e] rounded-xl w-36 h-12 cursor-pointer hover:bg-[#252525]">
        <div className="text-white text-sm">Details</div>
        <ChevronRight className="w-4 h-4 text-gray-400" />
      </div>
    </div>
  );
};
