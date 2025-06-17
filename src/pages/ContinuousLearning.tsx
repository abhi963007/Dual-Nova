import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { BookOpen, GraduationCap, Lightbulb, Share2, Rocket, Brain } from 'lucide-react';
import { useIsMobile } from '../hooks/use-mobile';

const ContinuousLearning = () => {
  const isMobile = useIsMobile();
  
  const learningPractices = [
    {
      title: "Dedicated Learning Time",
      description: "We allocate specific time for team members to explore new technologies and enhance their skills.",
      icon: BookOpen,
      color: "from-green-500 to-emerald-500"
    },
    {
      title: "Knowledge Sharing",
      description: "Regular sessions where team members share insights, discoveries, and lessons from their projects.",
      icon: Share2,
      color: "from-emerald-500 to-teal-500"
    },
    {
      title: "Industry Conferences",
      description: "We attend and speak at industry events to stay connected with the broader tech community.",
      icon: GraduationCap,
      color: "from-teal-500 to-cyan-500"
    },
    {
      title: "Experimental Projects",
      description: "We dedicate resources to experimental projects that push boundaries and explore new possibilities.",
      icon: Rocket,
      color: "from-cyan-500 to-green-500"
    },
    {
      title: "Continuous Education",
      description: "Support for certifications, courses, and educational resources for professional development.",
      icon: Brain,
      color: "from-lime-500 to-green-600"
    },
    {
      title: "Innovation Challenges",
      description: "Internal hackathons and challenges that foster creative problem-solving and innovation.",
      icon: Lightbulb,
      color: "from-green-600 to-emerald-600"
    }
  ];

  const technologies = [
    {
      category: "Frontend Development",
      items: ["React", "Next.js", "Vue.js", "Angular", "TypeScript", "Tailwind CSS", "WebGL", "Three.js"]
    },
    {
      category: "Backend Development",
      items: ["Node.js", "Python", "Go", "Rust", "Java", "GraphQL", "RESTful APIs", "Microservices"]
    },
    {
      category: "Cloud & DevOps",
      items: ["AWS", "Azure", "Google Cloud", "Kubernetes", "Docker", "Terraform", "CI/CD Pipelines"]
    },
    {
      category: "Emerging Technologies",
      items: ["AI/ML", "Blockchain", "Edge Computing", "IoT", "AR/VR", "Quantum Computing"]
    }
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-4 sm:px-6 relative overflow-hidden">
        <div className="absolute inset-0 bg-gradient-to-br from-green-500/10 via-transparent to-emerald-500/5"></div>
        <div className="max-w-6xl mx-auto text-center relative z-10">
          <div className="mx-auto w-16 h-16 sm:w-20 sm:h-20 bg-gradient-to-br from-green-500 to-emerald-500 rounded-2xl flex items-center justify-center mb-6 sm:mb-8 animate-float">
            <div className="w-8 h-8 sm:w-10 sm:h-10 bg-white/10 rounded-lg"></div>
          </div>
          
          <h1 className="text-4xl sm:text-5xl md:text-7xl font-black mb-4 sm:mb-6 text-transparent bg-clip-text bg-gradient-to-r from-green-400 via-emerald-400 to-teal-500 animate-fade-in-up">
            Continuous Learning
          </h1>
          <p className="text-lg sm:text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed animate-fade-in-up delay-200">
            Technology evolves rapidly, and so do we. We stay ahead of the curve.
          </p>
        </div>
      </section>

      {/* Main Content Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-10 lg:gap-16 items-center">
            <div>
              <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Embracing Growth and Evolution</h2>
              <div className="space-y-4 sm:space-y-6 text-gray-300 text-base sm:text-lg leading-relaxed">
                <p>
                  At Dual Nova, we recognize that the technology landscape is constantly shifting. What's cutting-edge today may be outdated tomorrow. That's why continuous learning is embedded in our company culture.
                </p>
                <p>
                  We foster an environment where curiosity is encouraged, experimentation is celebrated, and knowledge sharing is a daily practice. Our team members are passionate about staying at the forefront of technology trends and best practices.
                </p>
                <p>
                  This commitment to continuous learning doesn't just benefit us—it directly impacts our clients. By staying ahead of the curve, we bring innovative solutions and forward-thinking approaches to every project we undertake.
                </p>
              </div>
            </div>
            <div className="relative mt-8 lg:mt-0">
              <img 
                src="https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?w=600&h=400&fit=crop" 
                alt="Team learning session"
                className="rounded-2xl shadow-2xl w-full object-cover"
              />
              <div className="absolute -bottom-6 -right-6 w-24 sm:w-32 h-24 sm:h-32 bg-gradient-to-br from-green-500/30 to-emerald-600/30 rounded-full blur-xl"></div>
            </div>
          </div>
        </div>
      </section>

      {/* Learning Practices Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">How We Foster Learning</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Our practices and initiatives that keep us at the cutting edge
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 sm:gap-8">
            {learningPractices.map((practice, index) => {
              const Icon = practice.icon;
              return (
                <div key={index} className="group">
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 h-full hover:border-green-500/30 transition-all duration-300">
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

      {/* Technology Expertise Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Technology Radar</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              Technologies we're currently working with and exploring
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 sm:gap-8">
            {technologies.map((tech, index) => (
              <div key={index} className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-2xl p-6 sm:p-8 hover:border-green-500/30 transition-all duration-300">
                <h3 className="text-xl sm:text-2xl font-bold mb-4 sm:mb-6 text-white">{tech.category}</h3>
                <div className="flex flex-wrap gap-2">
                  {tech.items.map((item, idx) => (
                    <span 
                      key={idx} 
                      className="px-3 py-1 bg-gradient-to-r from-green-900/30 to-emerald-900/30 border border-green-500/20 rounded-full text-sm text-green-300"
                    >
                      {item}
                    </span>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Learning Journey Section */}
      <section className="py-12 sm:py-20 px-4 sm:px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-12 sm:mb-16">
            <h2 className="text-3xl sm:text-4xl font-bold mb-4 sm:mb-6 text-white">Our Learning Journey</h2>
            <p className="text-lg sm:text-xl text-gray-400 max-w-3xl mx-auto">
              How we've evolved and what we're focusing on next
            </p>
          </div>
          
          <div className="relative">
            {/* Journey steps for desktop */}
            {!isMobile && (
              <div className="hidden md:block">
                <div className="absolute left-1/2 transform -translate-x-px h-full w-0.5 bg-gradient-to-b from-green-500 to-emerald-500 opacity-30"></div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Past: Traditional Web Development</h3>
                      <p className="text-gray-400">We began with classic web technologies, mastering the fundamentals of frontend and backend development.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
                
                <div className="relative mb-16">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div></div>
                    <div className="pl-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Present: Modern Full-Stack Solutions</h3>
                      <p className="text-gray-400">Today, we're focused on modern frameworks, cloud-native applications, and advanced frontend experiences.</p>
                    </div>
                  </div>
                </div>
                
                <div className="relative">
                  <div className="absolute left-1/2 transform -translate-x-1/2 w-4 h-4 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full border-4 border-[#121212] z-10"></div>
                  <div className="grid grid-cols-2 gap-8 items-center">
                    <div className="text-right pr-8">
                      <h3 className="text-2xl font-bold mb-3 text-white">Future: AI Integration & Edge Computing</h3>
                      <p className="text-gray-400">We're exploring the integration of AI, machine learning, and edge computing into our development practices.</p>
                    </div>
                    <div></div>
                  </div>
                </div>
              </div>
            )}
            
            {/* Journey steps for mobile */}
            {isMobile && (
              <div className="md:hidden space-y-8">
                <div className="relative pl-8 border-l-2 border-green-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Past: Traditional Web Development</h3>
                    <p className="text-gray-400 text-sm">We began with classic web technologies, mastering the fundamentals of frontend and backend development.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-green-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Present: Modern Full-Stack Solutions</h3>
                    <p className="text-gray-400 text-sm">Today, we're focused on modern frameworks, cloud-native applications, and advanced frontend experiences.</p>
                  </div>
                </div>
                
                <div className="relative pl-8 border-l-2 border-green-500/30">
                  <div className="absolute left-[-5px] top-0 w-3 h-3 bg-gradient-to-r from-green-500 to-emerald-500 rounded-full"></div>
                  <div className="bg-gradient-to-br from-gray-800/50 to-gray-900/50 backdrop-blur-sm border border-gray-700/50 rounded-xl p-4">
                    <h3 className="text-xl font-bold mb-2 text-white">Future: AI Integration & Edge Computing</h3>
                    <p className="text-gray-400 text-sm">We're exploring the integration of AI, machine learning, and edge computing into our development practices.</p>
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
          <h2 className="text-3xl sm:text-4xl font-bold mb-6 sm:mb-8 text-white">Grow With Us</h2>
          <p className="text-lg sm:text-xl text-gray-300 mb-8 sm:mb-10 max-w-3xl mx-auto">
            Partner with a team that's always evolving and bringing the latest innovations to your projects.
          </p>
          <div className="flex flex-col sm:flex-row justify-center gap-4 sm:gap-6">
            <a 
              href="/contact" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white font-medium rounded-full transition-all duration-300 hover:shadow-lg hover:shadow-green-500/25"
            >
              Work With Us
            </a>
            <a 
              href="/services" 
              className="px-8 py-3 sm:py-4 bg-gradient-to-r from-gray-900/50 to-gray-800/50 backdrop-blur-sm border border-gray-700/50 text-white font-medium rounded-full hover:bg-gray-800/60 hover:border-gray-600/60 transition-all duration-300"
            >
              Explore Our Services
            </a>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default ContinuousLearning; 