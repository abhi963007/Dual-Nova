
import React, { useEffect, useState } from 'react';
import { Globe, MapPin } from 'lucide-react';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    return () => clearTimeout(timer);
  }, []);

  return (
    <header className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-6 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212]">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black text-white mb-8 tracking-tight transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>

        </h1>
      </div>

      {/* Enhanced Metadata Grid */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center transition-all duration-1000 delay-500 ${
            isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
          }`}>
            {/* Since 2020 */}
            <div className="flex items-center justify-center md:justify-start space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/20 group-hover:scale-110 transition-all duration-300">
                <Globe size={24} className="text-blue-400 group-hover:rotate-12 transition-transform duration-300" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Since</p>
                <p className="text-lg font-bold text-white">2020</p>
              </div>
            </div>

            {/* Full-Stack Development */}
            <div className="text-center group">
              <p className="text-lg font-bold text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">
                Full-Stack Development
              </p>
              <p className="text-sm text-gray-400 font-medium">Digital Solutions</p>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center md:justify-end space-x-4 group">
              <div className="w-12 h-12 bg-gradient-to-br from-green-500/30 to-emerald-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-green-500/20 group-hover:scale-110 transition-all duration-300">
                <MapPin size={24} className="text-green-400 group-hover:bounce transition-all duration-300" />
              </div>
              <div>
                <p className="text-sm text-gray-400 font-medium">Location</p>
                <p className="text-lg font-bold text-white">Kochi, Kerala</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Scroll Indicator */}
      <div className={`absolute bottom-24 left-1/2 transform -translate-x-1/2 transition-all duration-1000 delay-1000 ${
        isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
      }`}>
        <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center">
          <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full mt-2 animate-bounce"></div>
        </div>
      </div>
    </header>
  );
};
