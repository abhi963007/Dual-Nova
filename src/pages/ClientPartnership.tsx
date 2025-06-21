import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';
import { Users, MessageSquare, Handshake, Clock, BarChart, HeartHandshake } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const ClientPartnership = () => {
  const isMobile = useIsMobile();
  
  const partnershipApproach = [
    {
      title: "Collaborative Process",
      description: "We work alongside you as an extension of your team, not just as an external vendor.",
      icon: Users,
      color: "from-purple-500 to-pink-500"
    },
    {
      title: "Open Communication",
      description: "Transparent and frequent communication ensures alignment throughout the project lifecycle.",
      icon: MessageSquare,
      color: "from-violet-600 to-purple-600"
    },
    {
      title: "Long-term Relationships",
      description: "We focus on building lasting relationships, not just completing one-off projects.",
      icon: Handshake,
      color: "from-fuchsia-500 to-pink-600"
    },
    {
      title: "Responsive Support",
      description: "Quick response times and dedicated support even after project completion.",
      icon: Clock,
      color: "from-pink-500 to-rose-500"
    },
    {
      title: "Business-focused Outcomes",
      description: "We align our technical solutions with your specific business goals and metrics.",
      icon: BarChart,
      color: "from-indigo-500 to-violet-500"
    },
    {
      title: "Shared Success",
      description: "Your success is our success—we're invested in delivering outcomes that drive your business forward.",
      icon: HeartHandshake,
      color: "from-purple-500 to-indigo-500"
    }
  ];

  const testimonials = [
    {
      quote: "Working with Dual Nova feels like having an in-house tech team that truly understands our business goals. They've been instrumental in our digital transformation journey.",
      author: "Sarah Johnson",
      position: "CTO, TechVision Inc.",
      image: "https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&h=150&fit=crop"
    },
    {
      quote: "What sets Dual Nova apart is their genuine interest in our success. They don't just build what we ask for—they proactively suggest improvements that have measurably impacted our bottom line.",
      author: "Michael Chen",
      position: "Founder, GrowthScale",
      image: "https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&h=150&fit=crop"
    },
    {
      quote: "Five years and multiple projects later, I still consider Dual Nova our most valuable technology partner. Their commitment to our success has never wavered.",
      author: "Priya Patel",
      position: "Product Director, InnovateCorp",
      image: "https://images.unsplash.com/photo-1573497019940-1c28c88b4f3e?w=150&h=150&fit=crop"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-purple-500/10 via-transparent to-pink-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-purple-500 to-pink-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-purple-400 via-fuchsia-400 to-pink-500 animate-fade-in-up">
            Client Partnership
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            We see ourselves as partners in your success, not just service providers.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div className="order-2 lg:order-1 mt-8 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1556761175-5973dc0f32e7?w=600&h=400&fit=crop" 
                alt="Client partnership meeting"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -left-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-purple-500/30 to-pink-600/30 rounded-full blur-xl"></div>
            </div>
            <div className="order-1 lg:order-2">
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Beyond Service Providers</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  At Dual Nova, we believe that the most successful digital projects stem from true partnerships. We don't simply execute tasks—we invest in understanding your business, your goals, and your challenges.
                </p>
                <p>
                  Our partnership approach means we're genuinely invested in your success. We celebrate your wins as our own and work tirelessly to help you overcome obstacles.
                </p>
                <p>
                  This collaborative mindset extends beyond project completion. We build lasting relationships with our clients, becoming trusted advisors who continue to support your growth and evolution in the digital landscape.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Partnership Approach Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Partnership Approach</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              How we build meaningful relationships that drive mutual success
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {partnershipApproach.map((item, index) => {
              const Icon = item.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full hover:border-purple-500/30 transition-all duration-300">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${item.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={isMobile ? 20 : 24} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{item.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{item.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Testimonials Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Partner Testimonials</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Hear from our clients about their partnership experience
            </p>
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-6 sm:gap-8">
            {testimonials.map((testimonial, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:border-purple-500/30 transition-all duration-300 flex flex-col">
                <div className="flex-grow">
                  <div className="mb-6">
                    <svg width="32" height="32" viewBox="0 0 32 32" fill="none" xmlns="http://www.w3.org/2000/svg" className="text-purple-400">
                      <path d="M9.33333 20H4V14.6667C4 11.0533 7.05333 8 10.6667 8V10.6667C8.54667 10.6667 6.66667 12.5467 6.66667 14.6667H9.33333V20ZM21.3333 20H16V14.6667C16 11.0533 19.0533 8 22.6667 8V10.6667C20.5467 10.6667 18.6667 12.5467 18.6667 14.6667H21.3333V20Z" fill="currentColor"/>
                    </svg>
                  </div>
                  <p className="text-gray-300 italic mb-6 sm:mb-8">"{testimonial.quote}"</p>
                </div>
                <div className="flex items-center">
                  <img 
                    src={testimonial.image} 
                    alt={testimonial.author}
                    className="w-12 h-12 rounded-full object-cover mr-4"
                  />
                  <div>
                    <p className="text-white font-medium">{testimonial.author}</p>
                    <p className="text-gray-400 text-sm">{testimonial.position}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Partnership Process Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Partnership Process</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              How we build and nurture successful client relationships
            </p>
          </div>
          
          <div className="relative">
            {/* Process steps for desktop */}
            {!isMobile && (
              <div className="hidden md:block">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-purple-500 to-pink-500 opacity-30"></div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Discovery & Alignment</h3>
                      <p className="text-gray-400">We begin by deeply understanding your business, goals, and challenges to ensure perfect alignment.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div></div>
                    <div className="pl-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Collaborative Strategy</h3>
                      <p className="text-gray-400">Together, we develop a strategic roadmap that addresses your unique needs and opportunities.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Transparent Execution</h3>
                      <p className="text-gray-400">We implement solutions with regular check-ins, updates, and opportunities for feedback.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div></div>
                    <div className="pl-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Continuous Partnership</h3>
                      <p className="text-gray-400">Our relationship extends beyond project completion with ongoing support, optimization, and strategic guidance.</p>
                    </div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Process steps for mobile */}
            {isMobile && (
              <div className="md:hidden space-y-8">
                <div className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Discovery & Alignment</h3>
                    <p className="text-gray-400 text-sm">We begin by deeply understanding your business, goals, and challenges to ensure perfect alignment.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Collaborative Strategy</h3>
                    <p className="text-gray-400 text-sm">Together, we develop a strategic roadmap that addresses your unique needs and opportunities.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Transparent Execution</h3>
                    <p className="text-gray-400 text-sm">We implement solutions with regular check-ins, updates, and opportunities for feedback.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-purple-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-purple-500 to-pink-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Continuous Partnership</h3>
                    <p className="text-gray-400 text-sm">Our relationship extends beyond project completion with ongoing support, optimization, and strategic guidance.</p>
                  </div>
                </div>
              </div>
            )}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Partner With Us</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Ready to experience a different kind of client relationship? Let's start building something amazing together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/contact" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-purple-600 to-pink-600 hover:from-purple-700 hover:to-pink-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-purple-500/25"
            >
              Start a Conversation
            </Link>
            <Link 
              to="/our-story" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white font-medium rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300"
            >
              Learn About Our Team
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ClientPartnership; 