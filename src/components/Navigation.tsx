import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '/', ariaLabel: 'Navigate to home page' },
    { name: 'ABOUT', href: '/about', ariaLabel: 'Navigate to about page' },
    { name: 'PROJECTS', href: '/projects', ariaLabel: 'Navigate to projects page' },
    { name: 'SERVICES', href: '/services', ariaLabel: 'Navigate to services page' },
    { name: 'CONTACT', href: '/contact', ariaLabel: 'Navigate to contact page' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
        scrolled 
          ? 'bg-[#121212]/85 backdrop-blur-xl border-b border-gray-700/50 shadow-lg py-3' 
          : 'bg-[#121212]/70 backdrop-blur-sm py-5'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between">
          {/* Logo with enhanced gradient effect */}
          <Link 
            to="/"
            className="group flex items-center gap-2 transition-all duration-300"
            aria-label="CODE PIECE - Home"
          >
            <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
              <div className="absolute inset-0 bg-accent-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-glow"></div>
              <Code size={20} className="text-white z-10 animate-pulse-slow" />
            </div>
            <span className="text-2xl font-extrabold text-transparent bg-clip-text bg-accent-gradient">
              CODE PIECE
            </span>
          </Link>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-1">
            <div className="bg-[#191919]/80 backdrop-blur-md rounded-full px-2 py-1 border border-gray-800/50 shadow-lg">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  aria-label={link.ariaLabel}
                  className={`relative text-sm font-semibold tracking-wider transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] rounded-full px-5 py-2 mx-0.5 ${
                    isActive(link.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20'
                      : 'text-gray-300 hover:text-white'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                  {isActive(link.href) && (
                    <span className="absolute inset-0 rounded-full bg-gradient-to-r from-blue-500/10 to-purple-500/10 animate-pulse-slow"></span>
                  )}
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-1/2 ${
                    isActive(link.href) ? 'w-1/3' : 'w-0'
                  }`}></span>
                </Link>
              ))}
            </div>
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="relative overflow-hidden w-10 h-10 flex items-center justify-center text-white bg-gradient-to-r from-blue-600/20 to-purple-600/20 rounded-lg hover:from-blue-600/30 hover:to-purple-600/30 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212]"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <span className="absolute inset-0 bg-gradient-to-r from-blue-600/10 to-purple-600/10 opacity-50"></span>
              <div className="relative">
                <Menu 
                  size={20} 
                  className={`transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180 scale-0' : 'opacity-100 rotate-0 scale-100'}`} 
                />
                <X 
                  size={20} 
                  className={`absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0 scale-100' : 'opacity-0 -rotate-180 scale-0'}`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-500 overflow-hidden ${
            isOpen ? 'max-h-[400px] opacity-100 mt-4' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-2xl border border-gray-700/30 shadow-lg backdrop-blur-lg">
            {navLinks.map((link, index) => (
              <Link
                key={link.name}
                to={link.href}
                onClick={() => setIsOpen(false)}
                aria-label={link.ariaLabel}
                className={`block px-4 py-3 text-sm font-medium tracking-wider rounded-xl transition-all duration-300 ${
                  isActive(link.href)
                    ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 border-l-2 border-blue-400'
                    : 'text-gray-300 hover:text-white hover:bg-gray-800/30 border-l-2 border-transparent hover:border-purple-400/50'
                }`}
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                <div className="flex items-center space-x-3">
                  <div className={`w-1.5 h-1.5 rounded-full ${isActive(link.href) ? 'bg-accent-gradient animate-pulse-slow' : 'bg-gray-500'}`}></div>
                  <span>{link.name}</span>
                </div>
              </Link>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
