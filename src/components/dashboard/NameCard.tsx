
import React from 'react';
import { TrendingUp, TrendingDown, CheckCircle } from 'lucide-react';
import { useSpring, animated } from 'react-spring';
import clsx from 'clsx';

interface NameCardProps {
  name: string;
  position: string;
  transactions: number;
  rise: boolean;
  tasksCompleted: number;
  imgId: number;
}

export const NameCard: React.FC<NameCardProps> = ({
  name,
  position,
  transactions,
  rise,
  tasksCompleted,
  imgId,
}) => {
  const { animatedTransactions, barPlayhead } = useSpring({
    animatedTransactions: transactions,
    barPlayhead: 1,
    from: { animatedTransactions: 0, barPlayhead: 0 },
  });

  const getInitials = (name: string) => {
    return name.split(' ').map(n => n[0]).join('').toUpperCase();
  };

  return (
    <div className="w-full p-2 lg:w-1/3">
      <div className="rounded-lg bg-[#171717] flex justify-between p-3 h-32">
        <div className="">
          <div className="flex items-center">
            <div className="w-10 h-10 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full flex items-center justify-center text-white font-bold text-sm">
              {getInitials(name)}
            </div>
            <div className="ml-2">
              <div className="flex items-center">
                <div className="mr-2 font-bold text-white">{name}</div>
                <CheckCircle className="w-4 h-4 text-green-500" />
              </div>
              <div className="text-sm text-gray-400">{position}</div>
            </div>
          </div>

          <div className="text-sm text-gray-400 mt-2">{`${tasksCompleted} from 5 tasks completed`}</div>
          <div className="w-44 mt-3 relative">
            <div className="w-full h-1.5 bg-[#2d2d2d] rounded-full">
              <animated.div
                className="h-full bg-gradient-to-r from-purple-500 to-blue-500 rounded-full"
                style={{
                  width: barPlayhead.to(i => `${i * (tasksCompleted / 5) * 100}%`)
                }}
              />
            </div>
            {/* Progress markers */}
            <div className="absolute top-0 w-full flex justify-between">
              {[1, 2, 3, 4].map((marker) => (
                <div key={marker} className="w-0.5 h-1.5 bg-[#171717]" />
              ))}
            </div>
          </div>
        </div>
        <div className="flex flex-col items-center">
          {rise ? (
            <TrendingUp className="w-8 h-8 text-green-500" />
          ) : (
            <TrendingDown className="w-8 h-8 text-red-500" />
          )}
          <animated.div
            className={clsx(
              rise ? 'text-green-500' : 'text-red-500',
              'font-bold',
              'text-lg',
            )}
          >
            {animatedTransactions.to((i) => `$${i.toFixed(0)}`)}
          </animated.div>
          <div className="text-sm text-gray-400">Last 6 months</div>
        </div>
      </div>
    </div>
  );
};
