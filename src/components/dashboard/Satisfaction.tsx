
import React from 'react';
import { MoreHorizontal } from 'lucide-react';
import { useSpring, animated, config } from 'react-spring';

export const Satisfaction: React.FC = () => {
  const { dashOffset } = useSpring({
    dashOffset: 78.54,
    from: { dashOffset: 785.4 },
    config: config.molasses,
  });

  return (
    <div className="p-4 h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Client Satisfaction</div>
        <MoreHorizontal className="w-4 h-4 text-gray-400" />
      </div>
      <div className="mt-3 text-gray-400 text-sm">From all projects</div>
      
      <div className="flex justify-center items-center flex-grow">
        <div className="relative">
          <svg
            viewBox="0 0 200 120"
            fill="none"
            width="200"
            xmlns="http://www.w3.org/2000/svg"
          >
            <path
              d="M20 100C20 77.91 27.84 56.87 41.21 40.79C54.58 24.71 72.54 14.5 91.5 14.5C110.46 14.5 128.42 24.71 141.79 40.79C155.16 56.87 163 77.91 163 100"
              stroke="#2d2d2d"
              strokeWidth="8"
              strokeLinecap="round"
            />
            <animated.path
              d="M20 100C20 77.91 27.84 56.87 41.21 40.79C54.58 24.71 72.54 14.5 91.5 14.5C110.46 14.5 128.42 24.71 141.79 40.79C155.16 56.87 163 77.91 163 100"
              stroke="#2f49d0"
              strokeWidth="8"
              strokeLinecap="round"
              strokeDasharray="225"
              strokeDashoffset={dashOffset}
            />
          </svg>
          
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-2xl font-bold text-blue-500">97.8%</div>
              <div className="text-xs text-gray-400">Client Rating</div>
            </div>
          </div>
        </div>
      </div>

      <div className="flex justify-center mt-4">
        <div className="flex justify-between text-gray-400 text-xs w-full max-w-[200px]">
          <span>0%</span>
          <span>100%</span>
        </div>
      </div>
    </div>
  );
};
