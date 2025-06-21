import React from 'react';

interface LoaderProps {
  isLoading: boolean;
}

const Loader: React.FC<LoaderProps> = ({ isLoading }) => {
  if (!isLoading) return null;
  
  return (
    <div className="fixed top-0 left-0 w-full h-full bg-gradient-to-br from-[#121212] to-[#1a1a1a] flex justify-center items-center z-50">
      <div className="relative w-16 h-16">
        <div className="absolute w-full h-full rounded-full border-b-3 border-blue-600 animate-spin-one"></div>
        <div className="absolute w-full h-full rounded-full border-r-3 border-purple-600 animate-spin-two"></div>
        <div className="absolute w-full h-full rounded-full border-t-3 border-cyan-500 animate-spin-three"></div>
      </div>
    </div>
  );
};

export default Loader; 