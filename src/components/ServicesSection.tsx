
import React, { useEffect, useRef, useState } from 'react';
import { Code, Smartphone, Globe, Database, Palette, Zap } from 'lucide-react';
import { Link } from 'react-router-dom';

export const ServicesSection = () => {
  const [visibleCards, setVisibleCards] = useState<boolean[]>([]);
  const sectionRef = useRef<HTMLElement>(null);

  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern technologies and best practices for optimal performance.',
      image: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=400&h=300&fit=crop',
      gradient: 'from-blue-500/20 to-blue-600/10',
      iconColor: 'text-blue-400',
      borderColor: 'border-blue-500/30'
    },
    {
      icon: Smartphone,
      title: 'Mobile Development',
      description: 'Native and cross-platform mobile apps that deliver exceptional user experiences across all devices.',
      image: 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?w=400&h=300&fit=crop',
      gradient: 'from-purple-500/20 to-purple-600/10',
      iconColor: 'text-purple-400',
      borderColor: 'border-purple-500/30'
    },
    {
      icon: Globe,
      title: 'Full-Stack Solutions',
      description: 'End-to-end development from frontend interfaces to backend infrastructure with seamless integration.',
      image: 'https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?w=400&h=300&fit=crop',
      gradient: 'from-green-500/20 to-emerald-600/10',
      iconColor: 'text-green-400',
      borderColor: 'border-green-500/30'
    },
    {
      icon: Database,
      title: 'API Development',
      description: 'Robust and scalable APIs that power your applications and enable smooth third-party integrations.',
      image: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=400&h=300&fit=crop',
      gradient: 'from-cyan-500/20 to-cyan-600/10',
      iconColor: 'text-cyan-400',
      borderColor: 'border-cyan-500/30'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive designs that enhance user engagement and drive meaningful interactions.',
      image: 'https://images.unsplash.com/photo-1649972904349-6e44c42644a7?w=400&h=300&fit=crop',
      gradient: 'from-pink-500/20 to-rose-600/10',
      iconColor: 'text-pink-400',
      borderColor: 'border-pink-500/30'
    },
    {
      icon: Zap,
      title: 'Performance Optimization',
      description: 'Lightning-fast applications optimized for maximum speed, efficiency, and user satisfaction.',
      image: 'https://images.unsplash.com/photo-1487058792275-0ad4aaf24ca7?w=400&h=300&fit=crop',
      gradient: 'from-yellow-500/20 to-orange-600/10',
      iconColor: 'text-yellow-400',
      borderColor: 'border-yellow-500/30'
    }
  ];

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            const cards = entry.target.querySelectorAll('[data-card-index]');
            cards.forEach((card, index) => {
              setTimeout(() => {
                setVisibleCards(prev => {
                  const newVisible = [...prev];
                  newVisible[index] = true;
                  return newVisible;
                });
              }, index * 150);
            });
          }
        });
      },
      { threshold: 0.1 }
    );

    if (sectionRef.current) {
      observer.observe(sectionRef.current);
    }

    return () => observer.disconnect();
  }, []);

  return (
    <section ref={sectionRef} id="services" className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] via-[#151515] to-[#1a1a1a] relative overflow-hidden">
      {/* Background Pattern */}
      <div className="absolute inset-0 opacity-5">
        <div className="absolute inset-0" style={{
          backgroundImage: `linear-gradient(45deg, rgba(255,255,255,0.1) 25%, transparent 25%), linear-gradient(-45deg, rgba(255,255,255,0.1) 25%, transparent 25%)`,
          backgroundSize: '20px 20px'
        }}></div>
      </div>

      <div className="max-w-7xl mx-auto relative z-10">
        <div className="text-center mb-16">
          <h2 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white mb-4 animate-fade-in-up">
            What We Offer
          </h2>
          <p className="text-xl text-gray-400 font-medium animate-fade-in-up" style={{ animationDelay: '0.2s' }}>
            Our Services
          </p>
          <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-4 rounded-full animate-scale-in" style={{ animationDelay: '0.4s' }}></div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {services.map((service, index) => {
            const Icon = service.icon;
            return (
              <Link
                to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`}
                key={index}
                data-card-index={index}
                className={`group bg-gradient-to-br from-[#121212] to-[#0a0a0a] rounded-xl overflow-hidden cursor-pointer transition-all duration-500 hover:scale-[1.05] border ${service.borderColor} hover:shadow-2xl hover:shadow-blue-500/20 backdrop-blur-sm ${
                  visibleCards[index] ? 'animate-fade-in-up opacity-100' : 'opacity-0'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
                role="link"
                tabIndex={0}
                aria-label={`Learn more about ${service.title}`}
              >
                <div className="relative h-48 overflow-hidden">
                  <img
                    src={service.image}
                    alt={service.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                    loading="lazy"
                  />
                  <div className={`absolute inset-0 bg-gradient-to-t ${service.gradient} via-transparent to-transparent group-hover:opacity-80 transition-opacity duration-300`}></div>
                  <div className="absolute bottom-4 left-4">
                    <div className={`w-12 h-12 bg-gradient-to-br ${service.gradient} backdrop-blur-sm rounded-full flex items-center justify-center border ${service.borderColor} group-hover:scale-110 group-hover:rotate-12 transition-all duration-300`}>
                      <Icon size={24} className={`${service.iconColor} group-hover:animate-pulse`} />
                    </div>
                  </div>
                  
                  {/* Hover overlay */}
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                </div>
                
                <div className="p-6 relative">
                  <h3 className={`text-xl font-bold text-white mb-3 group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300`}>
                    {service.title}
                  </h3>
                  <p className="text-gray-400 leading-relaxed group-hover:text-gray-300 transition-colors duration-300">
                    {service.description}
                  </p>
                  
                  {/* Animated bottom border */}
                  <div className={`absolute bottom-0 left-0 h-1 bg-gradient-to-r ${service.gradient} w-0 group-hover:w-full transition-all duration-500`}></div>
                </div>
              </Link>
            );
          })}
        </div>
      </div>
    </section>
  );
};
