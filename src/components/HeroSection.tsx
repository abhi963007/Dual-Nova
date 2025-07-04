import React, { useEffect, useState } from 'react';
import { Globe, MapPin, ArrowRight, Code, Sparkles } from 'lucide-react';
import { Button } from './ui/button';
import { useIsMobile } from '../hooks/use-mobile';
import { Link, useNavigate } from 'react-router-dom';
import Beams from './Beams';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Dual Nova';
  const [currentIndex, setCurrentIndex] = useState(0);
  const [typingComplete, setTypingComplete] = useState(false);
  const isMobile = useIsMobile();
  const navigate = useNavigate();

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
        setTypingComplete(true);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(typingInterval);
    };
  }, [currentIndex]);

  // Handle button clicks
  const handleServicesClick = () => {
    navigate('/services');
  };
  
  const handleProjectsClick = () => {
    navigate('/projects');
  };

  return (
    <header className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-4 sm:px-6 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] overflow-hidden">
      {/* 3D Beams Background */}
      <div className="absolute inset-0 z-0 overflow-hidden">
        <div style={{ width: '100%', height: '100%', position: 'relative' }}>
          <Beams
            beamWidth={2}
            beamHeight={15}
            beamNumber={12}
            lightColor="#4f46e5"
            speed={1}
            noiseIntensity={1.75}
            scale={0.2}
            rotation={45}
          />
        </div>
      </div>

      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5 z-0">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Floating Elements - fewer on mobile for better performance */}
      <div className="absolute inset-0 overflow-hidden z-0">
        {[...Array(isMobile ? 3 : 6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * (isMobile ? 100 : 150) + 50}px`,
              height: `${Math.random() * (isMobile ? 100 : 150) + 50}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(40px)'
            }}
          ></div>
        ))}
      </div>

      <div className="text-center w-full max-w-4xl mx-auto relative z-10 px-2">
        {/* Heading with typing effect */}
        <h1 className={`text-5xl sm:text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-2 sm:mb-4 tracking-tight transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          {typedText}
          {!typingComplete && <span className="inline-block w-[5px] h-[0.9em] bg-blue-400 ml-1 animate-pulse"></span>}
        </h1>
        
        {/* Tagline with staggered reveal */}
        <p className={`text-lg sm:text-xl md:text-2xl text-gray-300 mb-6 sm:mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold">intelligent digital solutions</span> that transform your vision into reality
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-3 sm:gap-5 justify-center mt-6 sm:mt-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <Button 
            onClick={handleServicesClick}
            className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-full flex items-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-scale-in"
          >
            Our Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button 
            onClick={handleProjectsClick}
            variant="outline" 
            className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white px-6 sm:px-8 py-5 sm:py-6 rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 flex items-center gap-2 group transition-all duration-300 animate-scale-in"
          >
            <Code size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            View Projects
          </Button>
        </div>
      </div>

      {/* Floating Badge - repositioned for mobile */}
      <div className={`absolute ${isMobile ? 'top-24 right-4' : 'top-32 md:top-40 right-8 md:right-16'} transition-all duration-1000 delay-700 ${
        isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
      } z-20`}>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md px-3 sm:px-4 py-1.5 sm:py-2 rounded-full border border-blue-500/30 animate-glow">
          <Sparkles size={isMobile ? 14 : 16} className="text-blue-400 animate-pulse" />
          <span className={`${isMobile ? 'text-xs' : 'text-sm'} font-medium text-blue-300`}>Established 2020</span>
        </div>
      </div>

      {/* Location and Info Container - Mobile Optimized */}
      {isMobile ? (
        <>
          {/* Location Badge - Mobile Design - Left positioned */}
          <div className="absolute bottom-28 left-0 w-full px-6 flex justify-center z-20">
            <div className={`flex items-center justify-center gap-3 rounded-full bg-black/60 backdrop-blur-sm py-2 px-4 border border-green-800/40 transition-all duration-1000 delay-800 ${
              isVisible ? 'opacity-100 scale-100' : 'opacity-0 scale-95'
            }`}>
              <div className="w-10 h-10 rounded-full bg-green-900/30 flex items-center justify-center">
                <MapPin size={20} className="text-green-500" />
              </div>
              <div className="flex flex-col items-start">
                <span className="text-xs text-gray-400">Location</span>
                <span className="text-base font-bold text-white">Kochi, Kerala</span>
              </div>
            </div>
          </div>
        </>
      ) : (
        /* Desktop version remains with existing components */
        <>
          {/* Enhanced Metadata Grid - For Desktop Only */}
          <div className="absolute bottom-20 sm:bottom-8 left-0 right-0 z-20">
            <div className="max-w-7xl mx-auto px-4 sm:px-6">
              <div className={`grid grid-cols-1 md:grid-cols-3 gap-4 md:gap-8 items-center transition-all duration-1000 delay-800 ${
                isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
              }`}>
                {/* Since 2020 */}
                <div className="flex items-center justify-center md:justify-start space-x-4 group">
                  <div className="w-12 h-12 bg-gradient-to-br from-blue-500/30 to-blue-600/20 rounded-full flex items-center justify-center backdrop-blur-sm border border-blue-500/20 group-hover:scale-110 transition-all duration-300">
                    <Globe size={24} className="text-blue-400 group-hover:rotate-45 transition-transform duration-500" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Since</p>
                    <p className="text-lg font-bold text-white group-hover:text-blue-400 transition-colors duration-300">2020</p>
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
                    <MapPin size={24} className="text-green-400 group-hover:translate-y-[-2px] transition-all duration-300" />
                  </div>
                  <div>
                    <p className="text-sm text-gray-400 font-medium">Location</p>
                    <p className="text-lg font-bold text-white group-hover:text-green-400 transition-colors duration-300">Kochi, Kerala</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </>
      )}
    </header>
  );
};
