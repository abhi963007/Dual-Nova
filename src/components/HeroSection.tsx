
import React from 'react';
import { Globe, MapPin } from 'lucide-react';

export const HeroSection = () => {
  return (
    <header className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-6">
      <div className="text-center max-w-4xl mx-auto">
        <h1 className="text-6xl md:text-8xl lg:text-9xl font-bold text-white mb-8 tracking-tight">
          CODE
          <span className="block text-blue-400">PIECE</span>
        </h1>
      </div>

      {/* Metadata Grid */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8 items-center">
            {/* Since 2020 */}
            <div className="flex items-center justify-center md:justify-start space-x-4">
              <div className="w-12 h-12 bg-blue-500/20 rounded-full flex items-center justify-center">
                <Globe size={24} className="text-blue-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Since</p>
                <p className="text-lg font-semibold text-white">2020</p>
              </div>
            </div>

            {/* Full-Stack Development */}
            <div className="text-center">
              <p className="text-lg font-medium text-white">Full-Stack Development</p>
              <p className="text-sm text-gray-400">Digital Solutions</p>
            </div>

            {/* Location */}
            <div className="flex items-center justify-center md:justify-end space-x-4">
              <div className="w-12 h-12 bg-green-500/20 rounded-full flex items-center justify-center">
                <MapPin size={24} className="text-green-400" />
              </div>
              <div>
                <p className="text-sm text-gray-400">Location</p>
                <p className="text-lg font-semibold text-white">Kochi, Kerala</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    </header>
  );
};
