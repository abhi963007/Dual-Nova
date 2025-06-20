import React, { useState, useEffect, useRef } from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Users, Target, Award, Lightbulb, Code, Heart } from 'lucide-react';

const About = () => {
  const stats = [
    { number: '5+', label: 'Years Experience', value: 5 },
    { number: '100+', label: 'Projects Completed', value: 100 },
    { number: '50+', label: 'Happy Clients', value: 50 },
    { number: '10+', label: 'Tech Stack', value: 10 },
  ];

  const [counters, setCounters] = useState([0, 0, 0, 0]);
  const [valuesVisible, setValuesVisible] = useState([false, false, false, false]);
  const [teamVisible, setTeamVisible] = useState([false, false, false]);
  const [storyVisible, setStoryVisible] = useState(false);
  const [hasAnimatedStats, setHasAnimatedStats] = useState(false);
  
  const statsRef = useRef(null);
  const valuesRef = useRef(null);
  const teamRef = useRef(null);
  const storyRef = useRef(null);

  // Animation for stats counting up
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !hasAnimatedStats) {
          // Set flag to prevent re-animation
          setHasAnimatedStats(true);
          
          // Start animation when the stats section is visible
          stats.forEach((stat, index) => {
            let start = 0;
            const end = stat.value;
            const duration = 2000; // 2 seconds
            const increment = end / (duration / 30); // Update every 30ms
            
            const timer = setInterval(() => {
              start += increment;
              if (start >= end) {
                start = end;
                clearInterval(timer);
              }
              
              setCounters(prevCounters => {
                const newCounters = [...prevCounters];
                newCounters[index] = Math.floor(start);
                return newCounters;
              });
            }, 30);
          });
          
          // Disconnect observer once animation has started
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (statsRef.current) {
      observer.observe(statsRef.current);
    }
    
    return () => observer.disconnect();
  }, [stats, hasAnimatedStats]);

  // Animation for story section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !storyVisible) {
          setStoryVisible(true);
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (storyRef.current) {
      observer.observe(storyRef.current);
    }
    
    return () => observer.disconnect();
  }, [storyVisible]);

  // Animation for values section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !valuesVisible.some(v => v)) {
          // Only run animation if no values are visible yet
          // Staggered animation for values
          valuesVisible.forEach((_, index) => {
            setTimeout(() => {
              setValuesVisible(prev => {
                const newValues = [...prev];
                newValues[index] = true;
                return newValues;
              });
            }, index * 200); // 200ms stagger between each item
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.2 }
    );
    
    if (valuesRef.current) {
      observer.observe(valuesRef.current);
    }
    
    return () => observer.disconnect();
  }, [valuesVisible]);

  // Animation for team section
  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !teamVisible.some(v => v)) {
          // Only run animation if no team members are visible yet
          // Staggered animation for team members
          teamVisible.forEach((_, index) => {
            setTimeout(() => {
              setTeamVisible(prev => {
                const newTeam = [...prev];
                newTeam[index] = true;
                return newTeam;
              });
            }, index * 300); // 300ms stagger between each team member
          });
          
          observer.disconnect();
        }
      },
      { threshold: 0.1 }
    );
    
    if (teamRef.current) {
      observer.observe(teamRef.current);
    }
    
    return () => observer.disconnect();
  }, [teamVisible]);

  const values = [
    {
      icon: Code,
      title: 'Innovation',
      description: 'We stay ahead of the curve with cutting-edge technologies and creative solutions.'
    },
    {
      icon: Users,
      title: 'Collaboration',
      description: 'We work closely with our clients to understand their vision and bring it to life.'
    },
    {
      icon: Target,
      title: 'Excellence',
      description: 'We deliver high-quality solutions that exceed expectations every time.'
    },
    {
      icon: Heart,
      title: 'Passion',
      description: 'We love what we do and it shows in every project we undertake.'
    },
  ];

  const team = [
    {
      name: 'Abhiram A K',
      role: 'Developer',
      image: '/team/developer.png',
      description: 'Full-stack developer with expertise in modern web technologies and application development.'
    },
    {
      name: 'Rojin Roy',
      role: 'Developer and Designer',
      image: '/team/designer.png',
      description: 'Creative developer and designer passionate about creating intuitive and beautiful user experiences.'
    },
    {
      name: 'Arjun M B',
      role: 'Marketing Executive',
      image: '/team/market.png',
      description: 'Strategic marketing specialist focused on digital growth strategies and brand development.'
    },
  ];

  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      {/* Hero Section */}
      <section className="pt-24 pb-16 px-6">
        <div className="max-w-6xl mx-auto text-center">
          <h1 className="text-5xl md:text-7xl font-black mb-6 text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400">
            About Dual Nova Lab
          </h1>
          <p className="text-xl md:text-2xl text-gray-300 max-w-4xl mx-auto leading-relaxed">
            We are a passionate team of developers and designers dedicated to crafting exceptional digital experiences that drive business growth and innovation.
          </p>
        </div>
      </section>

      {/* Stats Section */}
      <section ref={statsRef} className="py-16 px-6 bg-gradient-to-r from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
            {stats.map((stat, index) => (
              <div key={index} className="text-center group">
                <div className="text-4xl md:text-5xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 to-purple-500 mb-2 group-hover:scale-110 transition-transform duration-300">
                  {counters[index]}{stat.number.includes('+') ? '+' : ''}
                </div>
                <div className="text-gray-400 font-medium">{stat.label}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Our Story Section */}
      <section ref={storyRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-16 items-center">
            <div className={`transition-all duration-1000 delay-100 transform ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 -translate-x-12'}`}>
              <h2 className="text-4xl md:text-5xl font-bold mb-8 text-white">Our Story</h2>
              <div className="space-y-6 text-gray-300 text-lg leading-relaxed">
                <p>
                  Founded in 2020 in the beautiful coastal city of Kochi, Kerala, Dual Nova Lab began as a vision to bridge the gap between innovative technology and practical business solutions.
                </p>
                <p>
                  What started as a small team of passionate developers has grown into a full-service digital agency, helping businesses across the globe transform their ideas into powerful digital experiences.
                </p>
                <p>
                  Our journey has been marked by continuous learning, adaptation, and an unwavering commitment to excellence. We believe that great software is not just about code – it's about understanding people, solving real problems, and creating lasting value.
                </p>
              </div>
            </div>
            <div className={`relative transition-all duration-1000 delay-300 transform ${storyVisible ? 'opacity-100 translate-x-0' : 'opacity-0 translate-x-12'}`}>
              <img 
                src="https://images.unsplash.com/photo-1522071820081-009f0129c71c?w=600&h=400&fit=crop" 
                alt="Team collaboration"
                className="rounded-2xl shadow-2xl"
              />
              <div className={`absolute -bottom-6 -right-6 w-32 h-32 bg-gradient-to-br from-blue-500/30 to-purple-600/30 rounded-full blur-xl transition-opacity duration-1500 ${storyVisible ? 'opacity-100' : 'opacity-0'}`}></div>
            </div>
          </div>
        </div>
      </section>

      {/* Values Section */}
      <section ref={valuesRef} className="py-20 px-6 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f]">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Our Values</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The principles that guide everything we do and every decision we make.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {values.map((value, index) => {
              const Icon = value.icon;
              return (
                <div 
                  key={index} 
                  className={`text-center group transition-all duration-700 transform ${
                    valuesVisible[index] 
                      ? 'opacity-100 translate-y-0' 
                      : 'opacity-0 translate-y-10'
                  }`}
                >
                  <div className="w-16 h-16 mx-auto mb-6 bg-gradient-to-br from-blue-500/20 to-purple-600/20 rounded-2xl flex items-center justify-center group-hover:scale-110 transition-all duration-300 border border-blue-500/20">
                    <Icon size={32} className="text-blue-400" />
                  </div>
                  <h3 className="text-xl font-bold mb-4 text-white">{value.title}</h3>
                  <p className="text-gray-400 leading-relaxed">{value.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Team Section */}
      <section ref={teamRef} className="py-20 px-6">
        <div className="max-w-6xl mx-auto">
          <div className="text-center mb-16">
            <h2 className="text-4xl md:text-5xl font-bold mb-6 text-white">Meet Our Team</h2>
            <p className="text-xl text-gray-400 max-w-3xl mx-auto">
              The talented individuals behind Dual Nova Lab's success.
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {team.map((member, index) => (
              <div 
                key={index} 
                className={`text-center group transition-all duration-700 transform ${
                  teamVisible[index] 
                    ? 'opacity-100 translate-y-0' 
                    : 'opacity-0 translate-y-16'
                }`}
              >
                <div className="relative mb-6 inline-block overflow-hidden rounded-[3.5rem] bg-gradient-to-br from-blue-500/10 to-purple-500/10 p-1 border border-blue-500/20 shadow-lg shadow-blue-500/5">
                  <img 
                    src={member.image} 
                    alt={member.name}
                    className={`w-56 h-64 object-cover mx-auto rounded-[3.2rem] transition-all duration-700 ${
                      teamVisible[index] ? 'scale-100' : 'scale-110 blur-sm'
                    } group-hover:scale-105`}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/20 to-transparent rounded-[3.5rem]"></div>
                </div>
                <h3 className="text-2xl font-bold mb-2 text-white">{member.name}</h3>
                <p className="text-blue-400 font-medium mb-4">{member.role}</p>
                <p className="text-gray-400 leading-relaxed">{member.description}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      <Footer />
    </div>
  );
};

export default About;
