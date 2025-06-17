
import React, { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 50);
    };
    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { name: 'HOME', href: '#', ariaLabel: 'Navigate to home page' },
    { name: 'ABOUT', href: '#about', ariaLabel: 'Navigate to about section' },
    { name: 'PROJECTS', href: '#projects', ariaLabel: 'Navigate to projects section' },
    { name: 'SERVICES', href: '#services', ariaLabel: 'Navigate to services section' },
    { name: 'CONTACT', href: '#contact', ariaLabel: 'Navigate to contact section' },
  ];

  const handleSmoothScroll = (e: React.MouseEvent<HTMLAnchorElement>, href: string) => {
    if (href.startsWith('#')) {
      e.preventDefault();
      const targetId = href.substring(1);
      const element = document.getElementById(targetId);
      if (element) {
        element.scrollIntoView({ behavior: 'smooth', block: 'start' });
      }
      setIsOpen(false);
    }
  };

  return (
    <nav 
      className={`fixed top-0 left-0 right-0 z-50 transition-all duration-300 ${
        scrolled 
          ? 'bg-[#121212]/95 backdrop-blur-lg border-b border-gray-700/50 shadow-lg' 
          : 'bg-[#121212]/90 backdrop-blur-md border-b border-gray-800'
      }`}
      role="navigation"
      aria-label="Main navigation"
    >
      <div className="max-w-7xl mx-auto px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          {/* Logo with gradient effect */}
          <div className="text-2xl font-black text-transparent bg-clip-text bg-accent-gradient animate-pulse-slow">
            CODE PIECE
          </div>

          {/* Desktop Navigation */}
          <div className="hidden md:flex items-center space-x-8">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                aria-label={link.ariaLabel}
                className="relative text-sm font-semibold tracking-wider text-white hover:text-transparent hover:bg-clip-text hover:bg-accent-gradient transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] rounded px-2 py-1"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
                <span className="absolute -bottom-1 left-0 w-0 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-full group-focus:w-full"></span>
              </a>
            ))}
          </div>

          {/* Mobile menu button */}
          <div className="md:hidden">
            <button
              onClick={() => setIsOpen(!isOpen)}
              className="text-white hover:text-blue-400 transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] rounded p-1"
              aria-label={isOpen ? 'Close menu' : 'Open menu'}
              aria-expanded={isOpen}
            >
              <div className="relative">
                <Menu 
                  size={24} 
                  className={`transition-all duration-300 ${isOpen ? 'opacity-0 rotate-180' : 'opacity-100 rotate-0'}`} 
                />
                <X 
                  size={24} 
                  className={`absolute top-0 left-0 transition-all duration-300 ${isOpen ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-180'}`} 
                />
              </div>
            </button>
          </div>
        </div>

        {/* Mobile Navigation */}
        <div 
          className={`md:hidden transition-all duration-300 overflow-hidden ${
            isOpen ? 'max-h-96 opacity-100' : 'max-h-0 opacity-0'
          }`}
        >
          <div className="px-2 pt-2 pb-3 space-y-1 bg-gradient-to-br from-[#1a1a1a] to-[#0f0f0f] rounded-lg mt-2 border border-gray-700/50">
            {navLinks.map((link, index) => (
              <a
                key={link.name}
                href={link.href}
                onClick={(e) => handleSmoothScroll(e, link.href)}
                aria-label={link.ariaLabel}
                className="block px-3 py-3 text-sm font-semibold tracking-wider text-white hover:text-transparent hover:bg-clip-text hover:bg-accent-gradient hover:bg-gray-800/50 rounded-md transition-all duration-200 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#1a1a1a]"
                style={{ animationDelay: `${index * 0.1}s` }}
              >
                {link.name}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};
