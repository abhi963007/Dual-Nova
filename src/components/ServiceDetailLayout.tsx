import React, { ReactNode } from 'react';
import { Navigation } from './Navigation';
import { Footer } from './Footer';
import { ArrowLeft, ChevronRight, Check } from 'lucide-react';
import { Link } from 'react-router-dom';

interface ServiceDetailProps {
  title: string;
  subtitle: string;
  description: string;
  iconBg: string;
  icon: ReactNode;
  image: string;
  features: string[];
  technologies: { name: string; description: string }[];
  benefits: string[];
  caseStudies?: { title: string; description: string; image: string; link: string }[];
  faq: { question: string; answer: string }[];
  relatedServices: { title: string; href: string }[];
}

export const ServiceDetailLayout = ({
  title,
  subtitle,
  description,
  iconBg,
  icon,
  image,
  features,
  technologies,
  benefits,
  caseStudies = [],
  faq,
  relatedServices,
}: ServiceDetailProps) => {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-32 pb-16 px-6 relative overflow-hidden bg-gradient-to-br from-[#121212] to-[#0a0a0a]">
        <div className="absolute inset-0 opacity-30 mix-blend-overlay">
          <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-purple-500/10 to-cyan-500/10"></div>
          <div className="absolute inset-0 bg-[url('https://grainy-gradients.vercel.app/noise.svg')] opacity-20"></div>
        </div>
        <div className="max-w-7xl mx-auto relative z-10">
          <Link to="/services" className="inline-flex items-center mb-8 text-blue-400 hover:text-blue-300 transition-colors group">
            <ArrowLeft size={16} className="mr-2 group-hover:-translate-x-1 transition-transform" />
            Back to Services
          </Link>
          
          <div className="flex flex-col lg:flex-row gap-12 items-start">
            <div className="w-full lg:w-1/2 space-y-6">
              <div className={`w-16 h-16 ${iconBg} rounded-xl flex items-center justify-center shadow-lg`}>
                {icon}
              </div>
              
              <h1 className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                {title}
              </h1>
              
              <p className="text-xl text-blue-400 font-medium">
                {subtitle}
              </p>
              
              <div className="w-32 h-1 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full"></div>
              
              <p className="text-lg text-gray-300 leading-relaxed">
                {description}
              </p>
              
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg hover:shadow-blue-500/25"
              >
                Get Started
                <ChevronRight size={18} className="ml-2 group-hover:translate-x-1 transition-transform" />
              </Link>
            </div>
            
            <div className="w-full lg:w-1/2 relative rounded-2xl overflow-hidden group">
              <div className="absolute inset-0 bg-gradient-to-br from-blue-500/20 to-purple-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
              <img 
                src={image} 
                alt={title} 
                className="w-full h-auto rounded-2xl shadow-2xl border border-gray-800 transform group-hover:scale-[1.01] transition-transform duration-500"
              />
            </div>
          </div>
        </div>
      </section>
      
      {/* Features */}
      <section className="py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              Key Features
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {features.map((feature, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-[#1a1a1a] to-[#121212] p-6 rounded-xl border border-gray-800 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/5"
              >
                <div className="w-10 h-10 rounded-full bg-gradient-to-br from-blue-500/20 to-purple-500/20 flex items-center justify-center mb-4">
                  <Check size={18} className="text-blue-400" />
                </div>
                <h3 className="text-xl font-semibold text-white mb-3">{feature}</h3>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Technologies */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              Technologies We Use
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {technologies.map((tech, index) => (
              <div 
                key={index} 
                className="bg-gradient-to-br from-[#1a1a1a]/50 to-[#121212]/50 p-6 rounded-xl border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300"
              >
                <h3 className="text-xl font-semibold text-blue-400 mb-3">{tech.name}</h3>
                <p className="text-gray-400">{tech.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* Benefits */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-7xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              Benefits
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => (
              <div 
                key={index}
                className="relative overflow-hidden rounded-xl p-6 border border-gray-800/50"
              >
                <div className="absolute inset-0 bg-gradient-to-br from-blue-600/5 to-purple-600/5"></div>
                <div className="relative z-10">
                  <div className="w-12 h-12 flex items-center justify-center rounded-full bg-blue-500/10 text-blue-400 mb-4">
                    <div className="font-bold text-lg">{index + 1}</div>
                  </div>
                  <p className="text-lg text-gray-300">{benefit}</p>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Case Studies */}
      {caseStudies.length > 0 && (
        <section className="py-20 px-6">
          <div className="max-w-7xl mx-auto">
            <div className="text-center mb-16">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
                Case Studies
              </h2>
              <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
              {caseStudies.map((study, index) => (
                <Link 
                  to={study.link} 
                  key={index}
                  className="group bg-gradient-to-br from-[#1a1a1a] to-[#121212] rounded-xl overflow-hidden border border-gray-800/50 hover:border-blue-500/30 transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/10"
                >
                  <div className="h-48 overflow-hidden">
                    <img 
                      src={study.image} 
                      alt={study.title} 
                      className="w-full h-full object-cover transform group-hover:scale-110 transition-transform duration-500"
                    />
                  </div>
                  <div className="p-6">
                    <h3 className="text-xl font-bold text-white mb-3 group-hover:text-blue-400 transition-colors">
                      {study.title}
                    </h3>
                    <p className="text-gray-400">{study.description}</p>
                  </div>
                </Link>
              ))}
            </div>
          </div>
        </section>
      )}

      {/* FAQ */}
      <section className="py-20 px-6 bg-[#0f0f0f]">
        <div className="max-w-4xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-3xl md:text-4xl font-bold mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">
              Frequently Asked Questions
            </h2>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto rounded-full"></div>
          </div>
          
          <div className="space-y-8">
            {faq.map((item, index) => (
              <div
                key={index}
                className="bg-gradient-to-br from-[#1a1a1a]/50 to-[#121212]/50 rounded-xl p-6 border border-gray-800/50"
              >
                <h3 className="text-xl font-semibold text-white mb-4">{item.question}</h3>
                <p className="text-gray-400">{item.answer}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      
      {/* CTA + Related Services */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="bg-gradient-to-br from-blue-900/20 via-[#1a1a1a] to-purple-900/20 rounded-2xl p-12 border border-blue-500/20 shadow-xl">
            <div className="text-center mb-10">
              <h2 className="text-3xl md:text-4xl font-bold mb-6 text-white">
                Ready to Get Started?
              </h2>
              <p className="text-xl text-gray-400 max-w-2xl mx-auto mb-8">
                Let's discuss your project and create a solution that meets your business needs
              </p>
              <Link 
                to="/contact" 
                className="inline-flex items-center bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-3 rounded-full font-semibold hover:from-blue-600 hover:to-purple-700 transition-all duration-300 shadow-lg"
              >
                Contact Us
                <ChevronRight size={18} className="ml-2" />
              </Link>
            </div>
            
            <div className="mt-16">
              <h3 className="text-xl text-center font-semibold text-white mb-8">
                Related Services
              </h3>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {relatedServices.map((service, index) => (
                  <Link
                    key={index}
                    to={service.href}
                    className="bg-[#1a1a1a]/50 hover:bg-[#1a1a1a] px-5 py-4 rounded-lg text-gray-300 hover:text-white flex items-center justify-between transition-all duration-300 border border-gray-800/50 hover:border-blue-500/30"
                  >
                    <span>{service.title}</span>
                    <ChevronRight size={18} className="text-blue-400" />
                  </Link>
                ))}
              </div>
            </div>
          </div>
        </div>
      </section>
      
      <Footer />
    </div>
  );
}; 