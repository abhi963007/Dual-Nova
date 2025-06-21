import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Lightbulb, Sparkles, Zap, Atom, Wand2, Gauge } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Link } from 'react-router-dom';

const InnovationDriven = () => {
  const isMobile = useIsMobile();
  
  const innovationPillars = [
    {
      title: "Creative Problem Solving",
      description: "We approach challenges from multiple angles to find unique and effective solutions.",
      icon: Lightbulb,
      color: "from-orange-500 to-red-500"
    },
    {
      title: "Emerging Technologies",
      description: "We continuously explore and adopt cutting-edge technologies to deliver forward-thinking solutions.",
      icon: Sparkles,
      color: "from-amber-500 to-orange-600"
    },
    {
      title: "Rapid Prototyping",
      description: "We quickly transform ideas into testable prototypes to validate concepts and iterate efficiently.",
      icon: Zap,
      color: "from-red-500 to-rose-600"
    },
    {
      title: "Design Thinking",
      description: "We employ human-centered design approaches to create intuitive and impactful experiences.",
      icon: Wand2,
      color: "from-rose-500 to-pink-600"
    },
    {
      title: "Performance Optimization",
      description: "We constantly seek ways to make our solutions faster, more efficient, and more scalable.",
      icon: Gauge,
      color: "from-yellow-500 to-amber-600"
    },
    {
      title: "Cross-disciplinary Collaboration",
      description: "We bring together diverse perspectives and expertise to spark innovative ideas and approaches.",
      icon: Atom,
      color: "from-orange-600 to-red-600"
    }
  ];

  const innovationCases = [
    {
      title: "AI-Powered Analytics Dashboard",
      description: "We developed a predictive analytics platform that uses machine learning to forecast business trends with remarkable accuracy, giving our client a significant competitive advantage.",
      image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&h=300&fit=crop"
    },
    {
      title: "Immersive AR Product Catalog",
      description: "Our augmented reality solution transformed how customers interact with products online, increasing engagement by 78% and conversion rates by 45%.",
      image: "https://images.unsplash.com/photo-1633356122102-3fe601e05bd2?w=500&h=300&fit=crop"
    },
    {
      title: "Blockchain Supply Chain Tracking",
      description: "We implemented a blockchain-based system that provides end-to-end visibility in complex supply chains, reducing disputes by 92% and improving efficiency.",
      image: "https://images.unsplash.com/photo-1561414927-6d86591d0c4f?w=500&h=300&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-orange-500/10 via-transparent to-red-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-orange-500 to-red-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-orange-400 via-amber-400 to-red-500 animate-fade-in-up">
            Innovation Driven
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            We love solving complex problems with creative and innovative solutions.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 mt-8 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1573164713988-8665fc963095?w=600&h=400&fit=crop" 
                alt="Innovation brainstorming session"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-orange-500/30 to-red-600/30 rounded-full blur-xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Pushing the Boundaries</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  At Dual Nova, innovation isn't just a buzzword—it's the driving force behind everything we create. We thrive on challenges that push us to think differently and develop groundbreaking solutions.
                </p>
                <p>
                  Our innovation-driven approach means we're constantly exploring new technologies, methodologies, and creative approaches to solve complex problems. We're never satisfied with the status quo.
                </p>
                <p>
                  This spirit of innovation translates into tangible benefits for our clients: more efficient processes, more engaging user experiences, and digital solutions that truly stand out in a crowded marketplace.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Innovation Pillars Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Innovation Pillars</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              The key elements that drive our innovative approach
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {innovationPillars.map((pillar, index) => {
              const Icon = pillar.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full hover:border-orange-500/30 transition-all duration-300">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${pillar.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={isMobile ? 20 : 24} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{pillar.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{pillar.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Innovation Process Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Innovation Process</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              How we transform challenges into groundbreaking solutions
            </p>
          </div>
          
          <div className="relative">
            {/* Process steps for desktop */}
            {!isMobile && (
              <div className="hidden md:block">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-orange-500 to-red-500 opacity-30"></div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">1. Explore & Discover</h3>
                      <p className="text-gray-400">We begin by deeply understanding the challenge, researching possibilities, and exploring unconventional approaches.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div></div>
                    <div className="pl-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">2. Ideate & Experiment</h3>
                      <p className="text-gray-400">We generate diverse ideas, test assumptions, and rapidly prototype potential solutions to validate concepts.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">3. Refine & Optimize</h3>
                      <p className="text-gray-400">We iterate based on feedback, optimize performance, and enhance the user experience of our solution.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-orange-500 to-red-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div></div>
                    <div className="pl-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">4. Implement & Scale</h3>
                      <p className="text-gray-400">We deliver the innovative solution and ensure it can scale effectively to meet future needs and challenges.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Process steps for mobile */}
            {isMobile && (
              <div className="md:hidden space-y-8">
                <div className="relative pl-8 border-l-2 border-orange-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">1. Explore & Discover</h3>
                    <p className="text-gray-400 text-sm">We begin by deeply understanding the challenge, researching possibilities, and exploring unconventional approaches.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-orange-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">2. Ideate & Experiment</h3>
                    <p className="text-gray-400 text-sm">We generate diverse ideas, test assumptions, and rapidly prototype potential solutions to validate concepts.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-orange-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">3. Refine & Optimize</h3>
                    <p className="text-gray-400 text-sm">We iterate based on feedback, optimize performance, and enhance the user experience of our solution.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-orange-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-orange-500 to-red-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">4. Implement & Scale</h3>
                    <p className="text-gray-400 text-sm">We deliver the innovative solution and ensure it can scale effectively to meet future needs and challenges.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* Innovation Cases Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Innovation in Action</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Real examples of our innovative solutions
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {innovationCases.map((item, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl overflow-hidden hover:border-orange-500/30 transition-all duration-300">
                <div className="relative h-48 overflow-hidden">
                  <img 
                    src={item.image} 
                    alt={item.title}
                    className="w-full h-full object-cover transition-transform duration-700 group-hover:scale-110"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 via-black/20 to-transparent"></div>
                </div>
                <div className="p-6">
                  <h3 className="text-xl font-bold mb-3 text-white">{item.title}</h3>
                  <p className="text-gray-400 text-sm sm:text-base">{item.description}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Ready for Innovation?</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Partner with us to transform your challenges into innovative, impactful solutions.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/contact" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-orange-600 to-red-600 hover:from-orange-700 hover:to-red-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-orange-500/25"
            >
              Discuss Your Project
            </Link>
            <Link 
              to="/projects" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white font-medium rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300"
            >
              See Our Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default InnovationDriven; 