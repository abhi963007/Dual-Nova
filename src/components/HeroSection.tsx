import React, { useEffect, useState } from 'react';
import { Globe, MapPin, ArrowRight, Code, Sparkles } from 'lucide-react';
import { Button } from './ui/button';

export const HeroSection = () => {
  const [isVisible, setIsVisible] = useState(false);
  const [typedText, setTypedText] = useState('');
  const fullText = 'Dual Nova Lab';
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const timer = setTimeout(() => setIsVisible(true), 200);
    
    // Typing effect
    const typingInterval = setInterval(() => {
      if (currentIndex < fullText.length) {
        setTypedText(prev => prev + fullText[currentIndex]);
        setCurrentIndex(currentIndex + 1);
      } else {
        clearInterval(typingInterval);
      }
    }, 100);

    return () => {
      clearTimeout(timer);
      clearInterval(typingInterval);
    };
  }, [currentIndex]);

  return (
    <header className="min-h-screen flex flex-col justify-center items-center relative pt-16 px-6 bg-gradient-to-br from-[#121212] via-[#1a1a1a] to-[#121212] overflow-hidden">
      {/* Animated Background Elements */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `radial-gradient(circle at 1px 1px, rgba(255,255,255,0.15) 1px, transparent 0)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      {/* Floating Elements */}
      <div className="absolute inset-0 overflow-hidden">
        {[...Array(6)].map((_, i) => (
          <div 
            key={i}
            className="absolute rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse-slow"
            style={{
              top: `${Math.random() * 100}%`,
              left: `${Math.random() * 100}%`,
              width: `${Math.random() * 150 + 50}px`,
              height: `${Math.random() * 150 + 50}px`,
              animationDuration: `${Math.random() * 10 + 10}s`,
              animationDelay: `${Math.random() * 5}s`,
              filter: 'blur(40px)'
            }}
          ></div>
        ))}
      </div>

      <div className="text-center max-w-4xl mx-auto relative z-10">
        {/* Heading with typing effect */}
        <h1 className={`text-6xl md:text-8xl lg:text-9xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white to-gray-300 mb-4 tracking-tight transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          {typedText}
          <span className="inline-block w-[5px] h-[0.9em] bg-blue-400 ml-1 animate-pulse"></span>
        </h1>
        
        {/* Tagline with staggered reveal */}
        <p className={`text-xl md:text-2xl text-gray-300 mb-8 max-w-2xl mx-auto transition-all duration-1000 delay-300 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          Crafting <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 font-semibold">intelligent digital solutions</span> that transform your vision into reality
        </p>
        
        {/* CTA Buttons */}
        <div className={`flex flex-col sm:flex-row gap-5 justify-center mt-8 transition-all duration-1000 delay-500 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <Button className="bg-gradient-to-r from-blue-600 to-indigo-600 hover:from-blue-700 hover:to-indigo-700 text-white px-8 py-6 rounded-full flex items-center gap-2 group transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25 animate-scale-in">
            Our Services
            <ArrowRight size={18} className="group-hover:translate-x-1 transition-transform duration-300" />
          </Button>
          <Button variant="outline" className="bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white px-8 py-6 rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 flex items-center gap-2 group transition-all duration-300 animate-scale-in">
            <Code size={18} className="group-hover:rotate-12 transition-transform duration-300" />
            View Projects
          </Button>
        </div>
      </div>

      {/* Floating Badge */}
      <div className={`absolute top-32 md:top-40 right-8 md:right-16 transition-all duration-1000 delay-700 ${
        isVisible ? 'animate-slide-in-right' : 'opacity-0 translate-x-10'
      }`}>
        <div className="flex items-center gap-2 bg-gradient-to-r from-blue-900/30 to-indigo-900/30 backdrop-blur-md px-4 py-2 rounded-full border border-blue-500/30 animate-glow">
          <Sparkles size={16} className="text-blue-400 animate-pulse" />
          <span className="text-sm font-medium text-blue-300">Established 2020</span>
        </div>
      </div>

      {/* Enhanced Metadata Grid */}
      <div className="absolute bottom-8 left-0 right-0">
        <div className="max-w-7xl mx-auto px-6">
          <div className={`grid grid-cols-1 md:grid-cols-3 gap-8 items-center transition-all duration-1000 delay-800 ${
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

      {/* Scroll Indicator */}
      <div className="absolute bottom-24 w-full flex justify-center items-center">
        <div className={`flex flex-col items-center transition-opacity duration-1000 delay-1000 ${
          isVisible ? 'opacity-100' : 'opacity-0'
        }`}>
          <div className="w-6 h-10 border-2 border-gray-400 rounded-full flex justify-center hover:border-blue-400 transition-colors duration-300 cursor-pointer">
            <div className="w-1 h-3 bg-gradient-to-b from-blue-400 to-transparent rounded-full mt-2 animate-bounce"></div>
          </div>
          <p className="text-xs text-gray-400 mt-2 text-center">Scroll Down</p>
        </div>
      </div>
    </header>
  );
};
