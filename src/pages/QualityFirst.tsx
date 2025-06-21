import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { CheckCircle, Code, FileCode, Shield, Zap, Award } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';
import { Link } from 'react-router-dom';

const QualityFirst = () => {
  const isMobile = useIsMobile();
  
  const practices = [
    {
      title: "Code Reviews",
      description: "Every line of code undergoes thorough peer review to ensure quality, maintainability, and adherence to best practices.",
      icon: FileCode,
      color: "from-blue-500 to-cyan-500"
    },
    {
      title: "Automated Testing",
      description: "Comprehensive test suites verify functionality, prevent regressions, and ensure consistent performance.",
      icon: Code,
      color: "from-blue-600 to-indigo-600"
    },
    {
      title: "Quality Assurance",
      description: "Dedicated QA processes identify issues early and ensure a polished final product.",
      icon: CheckCircle,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Performance Optimization",
      description: "We continuously monitor and optimize for speed, efficiency, and resource utilization.",
      icon: Zap,
      color: "from-yellow-500 to-amber-500"
    },
    {
      title: "Security First",
      description: "Security considerations are built into every stage of development, not added as an afterthought.",
      icon: Shield,
      color: "from-red-500 to-rose-500"
    },
    {
      title: "Industry Standards",
      description: "We adhere to and often exceed industry standards and best practices in all our work.",
      icon: Award,
      color: "from-purple-500 to-pink-500"
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-blue-500/10 via-transparent to-blue-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-blue-500 to-cyan-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-cyan-400 to-blue-500 animate-fade-in-up">
            Quality First
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            We never compromise on quality. Every line of code, every design element is crafted with precision.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Our Commitment to Excellence</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  At Dual Nova, quality isn't just a buzzword—it's the foundation of everything we create. We believe that exceptional digital products require meticulous attention to detail and an unwavering commitment to excellence.
                </p>
                <p>
                  Our quality-first approach means we never cut corners, even when facing tight deadlines. We understand that technical debt and quick fixes ultimately lead to greater costs and challenges down the road.
                </p>
                <p>
                  From initial concept to final deployment, we implement rigorous quality control measures at every stage. This ensures that our deliverables not only meet but exceed expectations, providing lasting value to our clients.
                </p>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1581092918056-0c4c3acd3789?w=600&h=400&fit=crop" 
                alt="Quality code development"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-blue-500/30 to-cyan-600/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Quality Practices Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Quality Practices</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              How we ensure the highest standards in everything we deliver
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {practices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full hover:border-blue-500/30 transition-all duration-300">
                    <div className={`w-12 h-12 sm:w-16 sm:h-16 bg-gradient-to-br ${practice.color} rounded-2xl flex items-center justify-center mb-4 sm:mb-6 group-hover:scale-110 transition-transform duration-300`}>
                      <Icon size={isMobile ? 20 : 24} className="text-white" />
                    </div>
                    <h3 className="text-xl sm:text-2xl font-bold mb-3 sm:mb-4 text-white">{practice.title}</h3>
                    <p className="text-gray-400 text-sm sm:text-base leading-relaxed">{practice.description}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Quality Metrics Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Measuring Quality</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              We use concrete metrics to ensure our work meets the highest standards
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 sm:gap-10">
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">Technical Quality</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Code Coverage</p>
                    <p className="text-gray-400 text-sm">Maintaining high test coverage across all codebases</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Performance Benchmarks</p>
                    <p className="text-gray-400 text-sm">Measuring load times, response times, and resource usage</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Code Quality Analysis</p>
                    <p className="text-gray-400 text-sm">Using static analysis tools to maintain clean code</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-blue-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-blue-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Security Audits</p>
                    <p className="text-gray-400 text-sm">Regular vulnerability scanning and penetration testing</p>
                  </div>
                </li>
              </ul>
            </div>
            <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:border-blue-500/30 transition-all duration-300">
              <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">User Experience Quality</h3>
              <ul className="space-y-4">
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">User Testing</p>
                    <p className="text-gray-400 text-sm">Gathering feedback from real users throughout development</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Accessibility Compliance</p>
                    <p className="text-gray-400 text-sm">Meeting WCAG standards for inclusive design</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">Cross-device Testing</p>
                    <p className="text-gray-400 text-sm">Ensuring consistent experience across all devices and browsers</p>
                  </div>
                </li>
                <li className="flex items-start">
                  <div className="w-6 h-6 bg-cyan-500/20 rounded-full flex items-center justify-center mt-0.5 mr-3">
                    <CheckCircle size={14} className="text-cyan-400" />
                  </div>
                  <div>
                    <p className="text-white font-medium">User Satisfaction Metrics</p>
                    <p className="text-gray-400 text-sm">Tracking engagement, retention, and satisfaction scores</p>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-16 sm:py-24 px-4 sm:px-6">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Experience Our Quality Difference</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Ready to work with a team that prioritizes quality in every aspect of your project? Let's create something exceptional together.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <Link 
              to="/contact" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-blue-500/25"
            >
              Get in Touch
            </Link>
            <Link 
              to="/services" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white font-medium rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300"
            >
              Explore Our Services
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default QualityFirst; 