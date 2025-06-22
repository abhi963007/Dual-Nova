import React, { useState, useRef, useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { ExternalLink, Github, Calendar, Tag, ChevronDown, Filter } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

const Projects = () => {
  const [activeFilter, setActiveFilter] = useState('All');
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const dropdownRef = useRef<HTMLDivElement>(null);
  const isMobile = useIsMobile();

  const filters = ['All', 'Web Development', 'Mobile App', 'E-commerce', 'SaaS', 'AI/ML', 'Computer Vision', 'Healthcare', 'Security'];

  // Close dropdown when clicking outside
  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (dropdownRef.current && !dropdownRef.current.contains(event.target as Node)) {
        setIsDropdownOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  const projects = [
    {
      title: 'EcoMarket Platform',
      category: 'E-commerce',
      description: 'A sustainable marketplace connecting eco-conscious consumers with green products. Built with React, Node.js, and MongoDB.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['React', 'Node.js', 'MongoDB', 'Stripe'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2024'
    },
    {
      title: 'TaskFlow SaaS',
      category: 'SaaS',
      description: 'A comprehensive project management tool for remote teams. Features real-time collaboration and advanced analytics.',
      image: 'https://images.unsplash.com/photo-1611224923853-80b023f02d71?w=600&h=400&fit=crop',
      technologies: ['Next.js', 'PostgreSQL', 'Redis', 'WebSocket'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2024'
    },
    {
      title: 'FitTracker Mobile',
      category: 'Mobile App',
      description: 'A fitness tracking app with social features. Track workouts, set goals, and compete with friends.',
      image: 'https://images.unsplash.com/photo-1571019613454-1cb2f99b2d8b?w=600&h=400&fit=crop',
      technologies: ['React Native', 'Firebase', 'Redux', 'Charts.js'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2023'
    },
    {
      title: 'Digital Agency Website',
      category: 'Web Development',
      description: 'A modern, responsive website for a creative agency. Features smooth animations and interactive elements.',
      image: 'https://images.unsplash.com/photo-1467232004584-a241de8bcf5d?w=600&h=400&fit=crop',
      technologies: ['Vue.js', 'GSAP', 'Tailwind CSS', 'Netlify'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2023'
    },
    {
      title: 'Restaurant Chain Dashboard',
      category: 'Web Development',
      description: 'An admin dashboard for managing multiple restaurant locations. Real-time analytics and inventory management.',
      image: 'https://images.unsplash.com/photo-1555396273-367ea4eb4db5?w=600&h=400&fit=crop',
      technologies: ['Angular', 'Express.js', 'MySQL', 'Chart.js'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2023'
    },
    {
      title: 'CryptoWallet App',
      category: 'Mobile App',
      description: 'A secure cryptocurrency wallet with multi-currency support and trading features.',
      image: 'https://images.unsplash.com/photo-1621761191319-c6fb62004040?w=600&h=400&fit=crop',
      technologies: ['Flutter', 'Blockchain API', 'SQLite', 'Biometrics'],
      liveUrl: '#',
      githubUrl: '#',
      date: '2022'
    },
    {
      title: 'Brain Tumor Detection',
      category: 'AI/ML',
      description: 'Deep learning system for automated brain tumor detection and classification using convolutional neural networks with an accuracy of 97.6%.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      technologies: ['Python', 'TensorFlow', 'CNN', 'OpenCV'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Oct 2024'
    },
    {
      title: 'Fooocus',
      category: 'AI/ML',
      description: 'An AI image generation tool based on Stable Diffusion with an intuitive interface for creating high-quality images from text prompts.',
      image: 'https://images.unsplash.com/photo-1547954575-855750c57bd3?w=600&h=400&fit=crop',
      technologies: ['Python', 'Stable Diffusion'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Dec 2024 – Jan 2025'
    },
    {
      title: 'AI Greeting Portal',
      category: 'AI/ML',
      description: 'Automated personalized greetings using AI to recognize visitors and generate contextual welcome messages.',
      image: 'https://images.unsplash.com/photo-1485827404703-89b55fcc595e?w=600&h=400&fit=crop',
      technologies: ['Python', 'AI', 'NLP'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Heart Disease Predictor',
      category: 'Healthcare',
      description: 'Machine learning system for assessing cardiovascular risk factors and predicting potential heart disease.',
      image: 'https://images.unsplash.com/photo-1576091160399-112ba8d25d1f?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Healthcare'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'MONEY MAGNET',
      category: 'AI/ML',
      description: 'AI and ML-based system for managing personal finances and making intelligent financial decisions.',
      image: 'https://images.unsplash.com/photo-1554224155-6726b3ff858f?w=600&h=400&fit=crop',
      technologies: ['AI', 'Machine Learning', 'Finance'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'GradeAI',
      category: 'AI/ML',
      description: 'An intelligent assessment system for evaluating student performance and progress using ML techniques.',
      image: 'https://images.unsplash.com/photo-1434030216411-0b793f4b4173?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Education'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'arChat',
      category: 'Web Development',
      description: 'Web-based chat application with AI capabilities for intelligent conversation and assistance.',
      image: 'https://images.unsplash.com/photo-1577563908411-5077b6dc7624?w=600&h=400&fit=crop',
      technologies: ['JavaScript', 'AI', 'Web'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'SecureURL Defender',
      category: 'Security',
      description: 'ML-powered tool for defending against malicious URLs and phishing attacks.',
      image: 'https://images.unsplash.com/photo-1555949963-aa79dcee981c?w=600&h=400&fit=crop',
      technologies: ['AI', 'Machine Learning', 'Security'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Used Car Price Prediction',
      category: 'AI/ML',
      description: 'Car price prediction system using ML regression models.',
      image: 'https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Data Science'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Vehicle Detection and Analysis',
      category: 'Computer Vision',
      description: 'Detecting and analyzing vehicles using AI-based image processing.',
      image: 'https://images.unsplash.com/photo-1449824913935-59a10b8d2000?w=600&h=400&fit=crop',
      technologies: ['Python', 'Computer Vision', 'OpenCV'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Fake Currency Detection',
      category: 'Security',
      description: 'Deep learning system to detect fake currency using image processing and neural networks.',
      image: 'https://images.unsplash.com/photo-1580519542036-c47de6196ba5?w=600&h=400&fit=crop',
      technologies: ['Deep Learning', 'Computer Vision', 'Security'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Detecting AI-Generated Fake Images',
      category: 'Computer Vision',
      description: 'Detecting fake AI-generated images using advanced algorithms.',
      image: 'https://images.unsplash.com/photo-1535378917042-10a22c95931a?w=600&h=400&fit=crop',
      technologies: ['Python', 'Deep Learning', 'Computer Vision'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Network Intrusion Detection',
      category: 'Security',
      description: 'ML-powered system to detect intrusions and unauthorized access in real-time.',
      image: 'https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Network Security'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Multiple Disease Prediction',
      category: 'Healthcare',
      description: 'Predicting multiple diseases based on symptoms and medical data.',
      image: 'https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Healthcare'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Credit Card Fraud Detection',
      category: 'Security',
      description: 'Flask-based app to detect and prevent credit card fraud in real-time.',
      image: 'https://images.unsplash.com/photo-1556742049-0cfed4f6a45d?w=600&h=400&fit=crop',
      technologies: ['Python', 'Flask', 'Machine Learning'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Underwater Waste Detection',
      category: 'Computer Vision',
      description: 'Detecting and tracking underwater waste using AI for ocean cleanup and protection.',
      image: 'https://images.unsplash.com/photo-1544551763-46a013bb70d5?w=600&h=400&fit=crop',
      technologies: ['Computer Vision', 'AI', 'Environmental'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Advanced Image Denoising',
      category: 'Computer Vision',
      description: 'Denoising grayscale and color images using deep learning for clarity enhancement.',
      image: 'https://images.unsplash.com/photo-1518709268805-4e9042af2176?w=600&h=400&fit=crop',
      technologies: ['Deep Learning', 'Image Processing', 'Python'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Heart Attack Prediction',
      category: 'Healthcare',
      description: 'Predicting heart attack risks using ML on patient data.',
      image: 'https://images.unsplash.com/photo-1559757175-0eb30cd8c063?w=600&h=400&fit=crop',
      technologies: ['Machine Learning', 'Healthcare', 'Data Analysis'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Sep 2024 – Apr 2025'
    },
    {
      title: 'Heart Disease Prediction',
      category: 'Healthcare',
      description: 'Diagnosing heart disease using patient data and advanced ML algorithms.',
      image: 'https://images.unsplash.com/photo-1559757148-5c350d0d3c56?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Healthcare', 'Flask'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Oct 2024 – Dec 2024'
    },
    {
      title: 'Retinal Vessel Segmentation',
      category: 'Healthcare',
      description: 'AI-based segmentation of retinal vessels for medical image analysis.',
      image: 'https://images.unsplash.com/photo-1582719478250-c89cae4dc85b?w=600&h=400&fit=crop',
      technologies: ['Python', 'Deep Learning', 'Computer Vision', 'Medical Imaging'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Nov 2024 – Jan 2025'
    },
    {
      title: 'Insurance Prediction System',
      category: 'AI/ML',
      description: 'Predicting insurance premiums using regression models and statistical analysis.',
      image: 'https://images.unsplash.com/photo-1450101499163-c8848c66ca85?w=600&h=400&fit=crop',
      technologies: ['Python', 'Machine Learning', 'Data Analysis', 'Finance'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Dec 2024 – Feb 2025'
    },
    {
      title: 'Blood Group Detection',
      category: 'Healthcare',
      description: 'Identifying blood groups using ML and CV from image input.',
      image: 'https://images.unsplash.com/photo-1615461066159-fea0960485d5?w=600&h=400&fit=crop',
      technologies: ['Python', 'Computer Vision', 'OpenCV', 'Machine Learning'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Oct 2024 – Jan 2025'
    },
    {
      title: 'MCA Department Chatbot',
      category: 'AI/ML',
      description: 'Chatbot for assisting MCA department queries and providing instant responses.',
      image: 'https://images.unsplash.com/photo-1531746790731-6c087fecd65a?w=600&h=400&fit=crop',
      technologies: ['Python', 'NLP', 'Chatbot', 'Education'],
      liveUrl: '#',
      githubUrl: '#',
      date: 'Jan 2025 – Feb 2025'
    }
  ];

  const filteredProjects = activeFilter === 'All' 
    ? projects 
    : projects.filter(project => project.category === activeFilter);

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            Our Projects
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Explore our portfolio of innovative digital solutions that have helped businesses transform and grow.
          </p>
        </div>
      </section>

      {/* Filter Section */}
      <section className="py-8 px-6">
        <div className="max-w-6xl mx-auto">
          {/* Mobile Dropdown Filter */}
          {isMobile ? (
            <div className="relative mb-8" ref={dropdownRef}>
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full flex items-center justify-between px-6 py-3 bg-gradient-to-br from-gray-800 to-gray-900 text-white rounded-lg border border-gray-700 focus:outline-none shadow-md"
              >
                <div className="flex items-center">
                  <Filter size={16} className="mr-2 text-blue-400" />
                  <span className="font-medium">{activeFilter}</span>
                  {activeFilter !== 'All' && (
                    <span className="ml-2 text-xs bg-blue-500/20 text-blue-400 px-2 py-0.5 rounded-full">
                      {filteredProjects.length} projects
                    </span>
                  )}
                </div>
                <ChevronDown size={16} className={`text-blue-400 transition-transform duration-300 ${isDropdownOpen ? 'transform rotate-180' : ''}`} />
              </button>
              
              {isDropdownOpen && (
                <div className="absolute z-10 mt-2 w-full bg-gray-800 border border-gray-700 rounded-lg shadow-lg overflow-hidden max-h-64 overflow-y-auto">
                  {filters.map((filter) => (
                    <button
                      key={filter}
                      onClick={() => {
                        setActiveFilter(filter);
                        setIsDropdownOpen(false);
                      }}
                      className={`w-full text-left px-6 py-3 transition-colors duration-200 flex items-center justify-between ${
                        activeFilter === filter
                          ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                          : 'text-gray-300 hover:bg-gray-700'
                      }`}
                    >
                      <span>{filter}</span>
                      {filter !== 'All' && (
                        <span className="text-xs bg-black/30 px-2 py-0.5 rounded-full">
                          {projects.filter(p => p.category === filter).length}
                        </span>
                      )}
                    </button>
                  ))}
                </div>
              )}
            </div>
          ) : (
            /* Desktop Filter Buttons */
            <div className="flex flex-wrap justify-center gap-4 mb-12">
              {filters.map((filter) => (
                <button
                  key={filter}
                  onClick={() => setActiveFilter(filter)}
                  className={`px-6 py-3 rounded-full font-medium transition-all duration-300 ${
                    activeFilter === filter
                      ? 'bg-gradient-to-r from-blue-500 to-purple-600 text-white'
                      : 'bg-gray-800 text-gray-300 hover:bg-gray-700 hover:text-white'
                  }`}
                >
                  {filter}
                </button>
              ))}
            </div>
          )}
        </div>
      </section>

      {/* Projects Grid */}
      <section className="py-8 md:py-12 px-4 md:px-6">
        <div className="max-w-7xl mx-auto">
          {isMobile && filteredProjects.length > 0 && (
            <div className="mb-4 text-center">
              <span className="text-sm text-gray-400">
                Showing {filteredProjects.length} {filteredProjects.length === 1 ? 'project' : 'projects'}
                {activeFilter !== 'All' ? ` in ${activeFilter}` : ''}
              </span>
            </div>
          )}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 md:gap-8">
            {filteredProjects.map((project, index) => (
              <div key={index} className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl overflow-hidden backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                <div className="relative overflow-hidden">
                  <img 
                    src={project.image} 
                    alt={project.title}
                    className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
                  <div className="absolute top-4 right-4 flex gap-2">
                    <div className="flex items-center space-x-1 bg-black/60 backdrop-blur-sm px-3 py-1 rounded-full text-sm">
                      <Calendar size={14} />
                      <span>{project.date}</span>
                    </div>
                  </div>
                </div>
                
                <div className="p-4 md:p-6">
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-2 text-sm text-blue-400">
                      <Tag size={14} />
                      <span>{project.category}</span>
                    </div>
                  </div>
                  
                  <h3 className="text-lg md:text-xl font-bold mb-2 md:mb-3 group-hover:text-blue-400 transition-colors duration-300 line-clamp-1">
                    {project.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-3 md:mb-4 leading-relaxed text-sm md:text-base line-clamp-3">
                    {project.description}
                  </p>
                  
                  <div className="flex flex-wrap gap-1.5 md:gap-2 mb-4 md:mb-6">
                    {project.technologies.slice(0, isMobile ? 3 : project.technologies.length).map((tech, techIndex) => (
                      <span 
                        key={techIndex}
                        className="px-2 md:px-3 py-0.5 md:py-1 bg-gray-800/50 text-gray-300 text-xs md:text-sm rounded-full border border-gray-700"
                      >
                        {tech}
                      </span>
                    ))}
                    {isMobile && project.technologies.length > 3 && (
                      <span className="px-2 py-0.5 bg-gray-800/50 text-gray-400 text-xs rounded-full border border-gray-700">
                        +{project.technologies.length - 3}
                      </span>
                    )}
                  </div>
                  
                  <div className="flex gap-2 md:gap-3">
                    <a 
                      href={project.liveUrl}
                      className="flex-1 flex items-center justify-center space-x-1 md:space-x-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-3 md:px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300 text-sm md:text-base"
                    >
                      <ExternalLink size={isMobile ? 14 : 16} />
                      <span>Live Demo</span>
                    </a>
                    <a 
                      href={project.githubUrl}
                      className="flex items-center justify-center bg-gray-800 text-gray-300 px-3 md:px-4 py-2 rounded-lg hover:bg-gray-700 hover:text-white transition-all duration-300"
                    >
                      <Github size={isMobile ? 14 : 16} />
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Start Your Project?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Let's discuss how we can bring your vision to life with our expertise and passion for innovation.
          </p>
          <Link 
            to="/contact"
            className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
          >
            Get In Touch
          </Link>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Projects;
