
import React, { useEffect, useRef, useState } from 'react';
import { Instagram, Linkedin, Youtube, ArrowRight } from 'lucide-react';

export const IntroSection = () => {
  const [techCount, setTechCount] = useState(0);
  const [projectCount, setProjectCount] = useState(0);
  const [hasAnimated, setHasAnimated] = useState(false);
  const sectionRef = useRef<HTMLElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        const [entry] = entries;
        if (entry.isIntersecting && !hasAnimated) {
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
      },
      { threshold: 0.3 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, [hasAnimated]);

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <section ref={sectionRef} className="py-20 px-6">
      <div className="max-w-4xl mx-auto text-center">
        <h2 className="text-4xl md:text-5xl font-bold text-white mb-8">
          <span className="text-blue-400">CODE PIECE</span>
          <br />
          Crafting Smart Digital Solutions
        </h2>

        <div className="space-y-6 text-lg text-gray-300 mb-12">
          <p>
            We are a passionate team of developers and designers who believe in the power of 
            clean code and beautiful design. Our mission is to transform ideas into exceptional 
            digital experiences that drive business growth.
          </p>
          <p>
            From concept to deployment, we handle every aspect of your digital project with 
            precision and creativity, ensuring your vision comes to life exactly as imagined.
          </p>
        </div>

        {/* Animated Stats */}
        <div className="grid grid-cols-2 gap-8 mb-12">
          <div className="text-center">
            <div className="text-5xl font-bold text-blue-400 mb-2">
              +{techCount}
            </div>
            <p className="text-gray-400">Tech Stack Expertise</p>
          </div>
          <div className="text-center">
            <div className="text-5xl font-bold text-green-400 mb-2">
              {projectCount}+
            </div>
            <p className="text-gray-400">Successful Projects</p>
          </div>
        </div>

        {/* Social Links & Button */}
        <div className="flex flex-col md:flex-row items-center justify-center space-y-6 md:space-y-0 md:space-x-8">
          {/* Social Icons */}
          <div className="flex items-center space-x-6">
            {socialLinks.map((social, index) => {
              const Icon = social.icon;
              return (
                <a
                  key={index}
                  href={social.href}
                  className="w-12 h-12 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
                  aria-label={social.label}
                >
                  <Icon size={20} className="text-white" />
                </a>
              );
            })}
          </div>

          {/* Our Story Button */}
          <button className="group bg-blue-600 hover:bg-blue-700 text-white px-8 py-3 rounded-full font-semibold transition-all duration-300 flex items-center space-x-2">
            <span>Our Story</span>
            <ArrowRight 
              size={18} 
              className="transition-transform duration-300 group-hover:rotate-45" 
            />
          </button>
        </div>
      </div>
    </section>
  );
};
