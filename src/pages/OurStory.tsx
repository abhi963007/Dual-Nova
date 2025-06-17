import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Calendar, MapPin, Users, Award, Lightbulb, Target, CheckCircle, Handshake, BookOpen, Rocket } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Link } from 'react-router-dom';

const OurStory = () => {
  const isMobile = useIsMobile();
  
  const milestones = [
    {
      year: '2020',
      title: 'The Beginning',
      description: 'Founded in Kochi, Kerala, with a vision to create exceptional digital experiences.',
      icon: Lightbulb
    },
    {
      year: '2021',
      title: 'First Major Project',
      description: 'Delivered our first enterprise-level application, establishing our reputation for quality.',
      icon: Award
    },
    {
      year: '2022',
      title: 'Team Expansion',
      description: 'Grew our team to include specialized designers and backend developers.',
      icon: Users
    },
    {
      year: '2023',
      title: 'Global Reach',
      description: 'Started serving clients internationally, expanding our impact worldwide.',
      icon: Target
    },
    {
      year: '2024',
      title: 'Innovation Focus',
      description: 'Embraced cutting-edge technologies like AI and cloud-native solutions.',
      icon: MapPin
    }
  ];

  const values = [
    {
      title: 'Quality First',
      description: 'We never compromise on quality. Every line of code, every design element is crafted with precision.',
      color: 'from-blue-500 to-cyan-500',
      path: '/values/quality-first',
      icon: CheckCircle
    },
    {
      title: 'Client Partnership',
      description: 'We see ourselves as partners in your success, not just service providers.',
      color: 'from-purple-500 to-pink-500',
      path: '/values/client-partnership',
      icon: Handshake
    },
    {
      title: 'Continuous Learning',
      description: 'Technology evolves rapidly, and so do we. We stay ahead of the curve.',
      color: 'from-green-500 to-emerald-500',
      path: '/values/continuous-learning',
      icon: BookOpen
    },
    {
      title: 'Innovation Driven',
      description: 'We love solving complex problems with creative and innovative solutions.',
      color: 'from-orange-500 to-red-500',
      path: '/values/innovation-driven',
      icon: Rocket
    }
  ];

  // Mobile timeline style
  const MobileTimeline = () => (
    <div className="space-y-6">
      {milestones.map((milestone, index) => {
        const Icon = milestone.icon;
        return (
          <div key={index} className="relative pl-8 border-l-2 border-blue-500/30">
            {/* Timeline dot */}
            <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
            
            {/* Content */}
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4 hover:border-blue-500/30 transition-all duration-300">
              <div className="flex items-center mb-2">
                <div className="w-10 h-10 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-lg flex items-center justify-center mr-3">
                  <Icon size={20} className="text-blue-400" />
                </div>
                <span className="text-xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                  {milestone.year}
                </span>
              </div>
              <h3 className="text-lg font-bold mb-2 text-white">{milestone.title}</h3>
              <p className="text-gray-400 text-sm leading-relaxed">{milestone.description}</p>
            </div>
          </div>
        );
      })}
    </div>
  );

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section - Mobile Optimized */}
      <section className="pt-24 pb-12 sm:pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/5 via-transparent to-purple-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 animate-fade-in-up">
            Our Story
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            From a small idea in Kochi to a global digital solutions partner - discover the journey that shaped Dual Nova Lab into what it is today.
          </p>
        </div>
      </section>

      {/* Timeline Section - Responsive Layout */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">Our Journey</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Every great story has key moments that define its path. Here are the milestones that shaped our journey.
            </p>
          </div>
          
          {isMobile ? (
            <MobileTimeline />
          ) : (
            <div className="relative">
              {/* Timeline line */}
              <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-blue-500 to-purple-500 opacity-30"></div>
              
              {milestones.map((milestone, index) => {
                const Icon = milestone.icon;
                const isEven = index % 2 === 0;
                
                return (
                  <div key={index} className={`relative flex items-center mb-16 ${isEven ? 'justify-start' : 'justify-end'}`}>
                    {/* Timeline dot */}
                    <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full border-4 border-[#121212] z-10"></div>
                    
                    {/* Content */}
                    <div className={`w-5/12 ${isEven ? 'pr-8 text-right' : 'pl-8 text-left'}`}>
                      <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 hover:scale-105 transition-all duration-300">
                        <div className={`flex items-center mb-4 ${isEven ? 'justify-end' : 'justify-start'}`}>
                          <div className={`w-12 h-12 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-xl flex items-center justify-center ${isEven ? 'order-2 ml-3' : 'mr-3'}`}>
                            <Icon size={24} className="text-blue-400" />
                          </div>
                          <span className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                            {milestone.year}
                          </span>
                        </div>
                        <h3 className="text-xl font-bold mb-3 text-white">{milestone.title}</h3>
                        <p className="text-gray-400 leading-relaxed">{milestone.description}</p>
                      </div>
                    </div>
                  </div>
                );
              })}
            </div>
          )}
        </div>
      </section>

      {/* Mission Section - Mobile Responsive */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-6 sm:mb-8 text-white">Our Mission</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  At Dual Nova Lab, we believe that technology should be a bridge, not a barrier. Our mission is to democratize access to high-quality digital solutions, making cutting-edge technology accessible to businesses of all sizes.
                </p>
                <p>
                  We're not just building applications; we're crafting digital experiences that connect people, solve real problems, and drive meaningful change in the world.
                </p>
                <p>
                  Every project we undertake is an opportunity to push boundaries, challenge conventions, and create something truly exceptional.
                </p>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=600&h=400&fit=crop" 
                alt="Team mission"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-500/30 to-blue-600/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section - Mobile Optimized */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-10 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl md:text-5xl font-bold mb-4 sm:mb-6 text-white">What Drives Us</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Our core values are the foundation of everything we do and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 sm:gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <Link 
                  to={value.path} 
                  key={index} 
                  className="group"
                >
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full hover:border-blue-500/30 hover:scale-[1.02] transition-all duration-300">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${value.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={isMobile ? 20 : 24} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white group-hover:text-transparent group-hover:bg-clip-text group-hover:bg-gradient-to-r group-hover:from-blue-400 group-hover:to-purple-400 transition-all duration-300">{value.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{value.description}</p>
                    <div className="mt-4 sm:mt-6 flex justify-end">
                      <span className="text-sm text-blue-400 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center">
                        Learn more
                        <svg className="w-4 h-4 ml-1 transform group-hover:translate-x-1 transition-transform duration-300" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 5l7 7-7 7" />
                        </svg>
                      </span>
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default OurStory;
