import React, { useEffect } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Code, Smartphone, ShoppingCart, Palette, Server, Search, Zap, Shield, Headphones } from 'lucide-react';
import { Link } from 'react-router-dom';
import AOS from 'aos';
import 'aos/dist/aos.css';

const Services = () => {
  // Initialize AOS animation library
  useEffect(() => {
    AOS.init({
      duration: 1000,
      easing: 'ease-out-cubic',
      once: true,
      offset: 50,
    });
  }, []);
  const services = [
    {
      icon: Code,
      title: 'Web Development',
      description: 'Custom web applications built with modern frameworks like React, Vue, and Angular.',
      features: ['Responsive Design', 'Progressive Web Apps', 'Single Page Applications', 'API Integration'],
      price: 'Starting from ₹2,10,000'
    },
    {
      icon: Smartphone,
      title: 'Mobile App Development',
      description: 'Native and cross-platform mobile applications for iOS and Android.',
      features: ['React Native', 'Flutter', 'Native iOS/Android', 'App Store Optimization'],
      price: 'Starting from ₹4,20,000'
    },
    {
      icon: ShoppingCart,
      title: 'E-commerce Solutions',
      description: 'Complete online stores with payment processing and inventory management.',
      features: ['Custom Shopping Cart', 'Payment Gateway', 'Inventory Management', 'Order Tracking'],
      price: 'Starting from ₹2,94,000'
    },
    {
      icon: Palette,
      title: 'UI/UX Design',
      description: 'Beautiful and intuitive user interfaces that enhance user experience.',
      features: ['Wireframing', 'Prototyping', 'User Research', 'Design Systems'],
      price: 'Starting from ₹1,26,000'
    },
    {
      icon: Server,
      title: 'Backend Development',
      description: 'Robust server-side solutions with databases and API development.',
      features: ['RESTful APIs', 'Database Design', 'Cloud Integration', 'Microservices'],
      price: 'Starting from ₹1,68,000'
    },
    {
      icon: Search,
      title: 'SEO Optimization',
      description: 'Improve your website\'s visibility and ranking on search engines.',
      features: ['On-page SEO', 'Technical SEO', 'Content Strategy', 'Analytics Setup'],
      price: 'Starting from ₹67,200'
    },
  ];

  const process = [
    {
      step: '01',
      title: 'Discovery',
      description: 'We start by understanding your business goals, target audience, and project requirements.'
    },
    {
      step: '02',
      title: 'Planning',
      description: 'We create a detailed project plan with timelines, milestones, and technical specifications.'
    },
    {
      step: '03',
      title: 'Design',
      description: 'Our designers create wireframes and mockups to visualize the final product.'
    },
    {
      step: '04',
      title: 'Development',
      description: 'Our developers bring the design to life with clean, efficient, and scalable code.'
    },
    {
      step: '05',
      title: 'Testing',
      description: 'We thoroughly test the application to ensure it meets quality standards.'
    },
    {
      step: '06',
      title: 'Launch',
      description: 'We deploy your project and provide ongoing support and maintenance.'
    },
  ];

  const benefits = [
    {
      icon: Zap,
      title: 'Fast Delivery',
      description: 'We deliver projects on time without compromising on quality.'
    },
    {
      icon: Shield,
      title: 'Secure & Reliable',
      description: 'All our solutions follow industry best practices for security.'
    },
    {
      icon: Headphones,
      title: '24/7 Support',
      description: 'We provide ongoing support and maintenance for all projects.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            Our Services
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            Comprehensive digital solutions tailored to your business needs. From concept to deployment, we've got you covered.
          </p>
        </div>
      </section>

      {/* Services Grid */}
      <section className="py-20 px-6">
        <div className="max-w-7xl mx-auto">
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {services.map((service, index) => {
              const Icon = service.icon;
              return (
                <Link 
                  to={`/services/${service.title.toLowerCase().replace(/\s+/g, '-')}`} 
                  key={index} 
                  className="group bg-gradient-to-br from-gray-900/50 to-gray-800/30 rounded-2xl p-8 backdrop-blur-sm border border-gray-700/50 hover:border-blue-500/50 transition-all duration-500 hover:scale-105">
                  <div className="w-16 h-16 mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-blue-500/20">
                    <Icon size={32} className="text-blue-400" />
                  </div>
                  
                  <h3 className="text-2xl font-bold mb-4 group-hover:text-blue-400 transition-colors duration-300">
                    {service.title}
                  </h3>
                  
                  <p className="text-gray-400 mb-6 leading-relaxed">
                    {service.description}
                  </p>
                  
                  <ul className="space-y-2 mb-6">
                    {service.features.map((feature, featureIndex) => (
                      <li key={featureIndex} className="flex items-center text-gray-300">
                        <div className="w-2 h-2 bg-blue-400 rounded-full mr-3"></div>
                        {feature}
                      </li>
                    ))}
                  </ul>
                  
                  <div className="pt-6 border-t border-gray-700">
                    <p className="text-lg font-semibold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500">
                      {service.price}
                    </p>
                  </div>
                </Link>
              );
            })}
          </div>
        </div>
      </section>

      {/* Process Section */}
      <section className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] relative overflow-hidden">
        {/* Background patterns */}
        <div className="absolute inset-0 opacity-5">
          <div className="absolute inset-0" style={{
            backgroundImage: `linear-gradient(30deg, rgba(255,255,255,0.05) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.05) 87.5%, rgba(255,255,255,0.05)), linear-gradient(150deg, rgba(255,255,255,0.05) 12%, transparent 12.5%, transparent 87%, rgba(255,255,255,0.05) 87.5%, rgba(255,255,255,0.05))`,
            backgroundSize: '40px 40px'
          }}></div>
        </div>
        
        <div className="max-w-6xl mx-auto relative z-10">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-white via-blue-100 to-white">Our Process</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              A proven methodology that ensures successful project delivery every time.
            </p>
            <div className="w-24 h-1 bg-gradient-to-r from-blue-500 to-purple-500 mx-auto mt-6 rounded-full"></div>
          </div>
          
          <div className="relative">
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-y-16 gap-x-8 mt-8">
              {process.map((step, index) => (
                <div 
                  key={index} 
                  className="relative group"
                  data-aos={index % 2 === 0 ? "fade-up" : "fade-down"}
                  data-aos-delay={index * 100}
                >
                  {/* Step number bubble */}
                  <div className="relative z-20 mb-8">
                    <div className="w-20 h-20 mx-auto bg-gradient-to-br from-blue-500 to-purple-600 rounded-full flex items-center justify-center text-3xl font-black text-white group-hover:scale-110 group-hover:shadow-lg group-hover:shadow-blue-500/20 transition-all duration-300">
                      {step.step}
                    </div>
                    
                    {/* Pulse animation ring around the number */}
                    <div className="absolute -inset-2 bg-gradient-to-r from-blue-500/20 to-purple-500/20 rounded-full blur-md opacity-0 group-hover:opacity-100 transition-opacity duration-500"></div>
                    

                  </div>
                  
                  {/* Content */}
                  <div className="relative bg-gradient-to-br from-[#1e1e1e]/80 to-[#141414]/80 p-6 rounded-2xl border border-gray-800/50 group-hover:border-blue-500/30 transition-all duration-300 transform group-hover:-translate-y-2 group-hover:shadow-lg group-hover:shadow-blue-500/5">
                    <h3 className="text-xl font-bold mb-4 text-center text-transparent bg-clip-text bg-gradient-to-r from-white to-blue-100">{step.title}</h3>
                    <p className="text-gray-400 leading-relaxed text-center">{step.description}</p>
                    
                    {/* Bottom border animation */}
                    <div className="absolute bottom-0 left-1/2 -translate-x-1/2 w-0 h-0.5 bg-gradient-to-r from-blue-500 to-purple-500 group-hover:w-1/2 transition-all duration-500"></div>
                  </div>
                </div>
              ))}
            </div>
            
            {/* Process completion icon */}
            <div className="mt-16 mx-auto w-16 h-16 flex items-center justify-center">
              <div className="relative w-16 h-16">
                <div className="absolute inset-0 bg-gradient-to-r from-blue-500 to-purple-500 rounded-full opacity-20 animate-ping"></div>
                <div className="relative w-full h-full bg-gradient-to-br from-blue-600/80 to-purple-600/80 rounded-full flex items-center justify-center">
                  <svg xmlns="http://www.w3.org/2000/svg" className="h-8 w-8 text-white" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
                  </svg>
                </div>
              </div>
            </div>
          </div>
          
          {/* Process description */}
          <div className="mt-16 max-w-3xl mx-auto text-center">
            <p className="text-lg text-gray-300">
              Our streamlined process ensures clear communication, predictable outcomes, and exceptional results for your project.
            </p>
            <Link 
              to="/contact" 
              className="inline-flex items-center mt-6 text-blue-400 hover:text-blue-300 font-medium"
            >
              <span>Start your project</span>
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M12.293 5.293a1 1 0 011.414 0l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414-1.414L14.586 11H3a1 1 0 110-2h11.586l-2.293-2.293a1 1 0 010-1.414z" clipRule="evenodd" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* Benefits Section */}
      <section className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Why Choose Us</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              We deliver exceptional results through our commitment to quality and innovation.
            </p>
          </div>
          
          <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
            {benefits.map((benefit, index) => {
              const Icon = benefit.icon;
              return (
                <div key={index} className="text-center group">
                  <div className="w-20 h-20 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-blue-500/20">
                    <Icon size={36} className="text-blue-400" />
                  </div>
                  <h3 className="text-2xl font-bold mb-4 text-white">{benefit.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{benefit.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA Section */}
      <section className="py-20 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-4xl mx-auto text-center">
          <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">
            Ready to Transform Your Business?
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            Let's discuss your project requirements and create a solution that drives growth.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Link 
              to="/contact"
              className="inline-block bg-gradient-to-r from-blue-500 to-purple-600 text-white px-8 py-4 rounded-full font-semibold text-lg hover:from-blue-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300"
            >
              Get Started
            </Link>
            <Link 
              to="/projects"
              className="inline-block bg-transparent border-2 border-blue-500 text-blue-400 px-8 py-4 rounded-full font-semibold text-lg hover:bg-blue-500 hover:text-white transition-all duration-300"
            >
              View Our Work
            </Link>
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default Services;
