
import React from 'react';
import { Plus, TrendingUp, TrendingDown, MoreHorizontal } from 'lucide-react';

const countryData = [
  { name: 'USA', rise: true, value: 21942.83, id: 1 },
  { name: 'Ireland', rise: false, value: 19710.0, id: 2 },
  { name: 'Ukraine', rise: false, value: 12320.3, id: 3 },
  { name: 'Sweden', rise: true, value: 9725.0, id: 4 },
];

export const TopCountries: React.FC = () => {
  const getCountryFlag = (id: number) => {
    const flags = ['🇺🇸', '🇮🇪', '🇺🇦', '🇸🇪'];
    return flags[id - 1] || '🌍';
  };

  return (
    <div className="flex p-4 flex-col h-full">
      <div className="flex justify-between items-center">
        <div className="text-white font-bold">Top Regions</div>
        <Plus className="w-5 h-5 text-gray-400 hover:text-white cursor-pointer" />
      </div>
      <div className="text-gray-400 text-sm">Client distribution</div>
      
      {countryData.map(({ name, rise, value, id }) => (
        <div className="flex items-center mt-3" key={id}>
          <div className="text-gray-400 text-sm w-4">{id}</div>
          <div className="ml-2 text-xl">{getCountryFlag(id)}</div>
          <div className="ml-2 text-white">{name}</div>
          <div className="flex-grow" />
          <div className="text-white">{`$${value.toLocaleString()}`}</div>
          {rise ? (
            <TrendingUp className="w-4 h-4 mx-3 text-green-500" />
          ) : (
            <TrendingDown className="w-4 h-4 mx-3 text-red-500" />
          )}
          <MoreHorizontal className="w-4 h-4 text-gray-400 cursor-pointer" />
        </div>
      ))}
      
      <div className="flex-grow" />
      <div className="flex justify-center">
        <button className="text-blue-400 hover:text-blue-300 text-sm">Check All</button>
      </div>
    </div>
  );
};
