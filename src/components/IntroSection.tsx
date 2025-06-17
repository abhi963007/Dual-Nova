
import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

export const IntroSection = () => {
  const [techCount, setTechCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const [isVisible, setIsVisible] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting) {
          setIsVisible(true);
          if (!hasAnimated) {
            setHasAnimated(true);
            
            // Animate tech count
            let techStart = 0;
            const techEnd = 10;
            const techIncrement = techEnd / 30;
            const techTimer = setInterval(() => {
              techStart += techIncrement;
              if (techStart >= techEnd) {
                setTechCount(techEnd);
                clearInterval(techTimer);
              } else {
                setTechCount(Math.floor(techStart));
              }
            }, 50);

            // Animate project count
            let projectStart = 0;
            const projectEnd = 100;
            const projectIncrement = projectEnd / 50;
            const projectTimer = setInterval(() => {
              projectStart += projectIncrement;
              if (projectStart >= projectEnd) {
                setProjectCount(projectEnd);
                clearInterval(projectTimer);
              } else {
                setProjectCount(Math.floor(projectStart));
              }
            }, 30);
          }
        }
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const socialLinks = [
    { 
      icon: Instagram, 
      href: '#', 
      label: 'Instagram',
      color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500',
      hoverColor: 'group-hover:text-white'
    },
    { 
      icon: Youtube, 
      href: '#', 
      label: 'YouTube',
      color: 'hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600',
      hoverColor: 'group-hover:text-white'
    },
    { 
      icon: Linkedin, 
      href: '#', 
      label: 'LinkedIn',
      color: 'hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600',
      hoverColor: 'group-hover:text-white'
    },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6 relative overflow-hidden">
      {/* Background Elements */}
      <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
      
      <div className="max-w-4xl mx-auto text-center relative z-10">
        <h2 className={`text-4xl md:text-5xl font-black text-white mb-8 transition-all duration-1000 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            CODE PIECE
          </span>
          <br />
          <span className="text-2xl md:text-3xl font-medium text-gray-300">
            Crafting Smart Digital Solutions
          </span>
        </h2>

        <div className={`space-y-6 text-lg text-gray-300 mb-12 transition-all duration-1000 delay-200 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <p className="leading-relaxed">
            We are a passionate team of developers and designers who believe in the power of 
            clean code and beautiful design. Our mission is to transform ideas into exceptional 
            digital experiences that drive business growth.
          </p>
          <p className="leading-relaxed">
            From concept to deployment, we handle every aspect of your digital project with 
            precision and creativity, ensuring your vision comes to life exactly as imagined.
          </p>
        </div>

        {/* Enhanced Animated Stats */}
        <div className={`grid grid-cols-2 gap-8 mb-12 transition-all duration-1000 delay-400 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          <div className="text-center group">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-cyan-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              +{techCount}
            </div>
            <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
              Tech Stack Expertise
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-blue-400 to-cyan-400 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
          <div className="text-center group">
            <div className="text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-green-400 to-emerald-400 mb-2 group-hover:scale-110 transition-transform duration-300">
              {projectCount}+
            </div>
            <p className="text-gray-400 font-medium group-hover:text-gray-300 transition-colors duration-300">
              Successful Projects
            </p>
            <div className="w-16 h-1 bg-gradient-to-r from-green-400 to-emerald-400 mx-auto mt-2 rounded-full opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
          </div>
        </div>

        {/* Enhanced Social Links & Button */}
        <div className={`flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8 transition-all duration-1000 delay-600 ${
          isVisible ? 'animate-fade-in-up' : 'opacity-0 translate-y-10'
        }`}>
          {/* Enhanced Social Icons */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className={`group w-12 h-12 bg-gray-800/50 backdrop-blur-sm border border-gray-700/50 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 hover:rotate-12 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] ${social.color}`}
                  aria-label={social.label}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  <Icon size={20} className={`text-gray-400 transition-colors duration-300 ${social.hoverColor}`} />
                </a>
              );
            })}
          </div>

          {/* Enhanced Our Story Button */}
          <button className="group relative bg-gradient-to-r from-blue-600 to-purple-600 hover:from-blue-700 hover:to-purple-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2 hover:scale-105 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] overflow-hidden">
            <span className="relative z-10">Our Story</span>
            <ArrowRight 
              size={18} 
              className="relative z-10 transition-transform duration-300 group-hover:translate-x-1 group-hover:rotate-45" 
            />
            {/* Button glow effect */}
            <div className="absolute inset-0 bg-gradient-to-r from-blue-400 to-purple-400 opacity-0 group-hover:opacity-20 transition-opacity duration-300 blur-xl"></div>
          </button>
        </div>
      </div>
    </section>
  );
};
