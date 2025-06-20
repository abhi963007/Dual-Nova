import React, { useState, useEffect } from 'react';
import { Menu, X, Code } from 'lucide-react';
import { Link, useLocation } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

export const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrolled, setScrolled] = useState(false);
  const [hidden, setHidden] = useState(false);
  const location = useLocation();
  const isMobile = useIsMobile();
  const lastScrollY = React.useRef(0);

  useEffect(() => {
    const handleScroll = () => {
      const currentScrollY = window.scrollY;
      
      // Set scrolled state - used for styling
      setScrolled(currentScrollY > 50);
      
      // Hide the navbar when scrolling down, show when scrolling up
      if (currentScrollY > lastScrollY.current && currentScrollY > 150) {
        setHidden(true);
      } else {
        setHidden(false);
      }
      
      lastScrollY.current = currentScrollY;
    };
    
    window.addEventListener('scroll', handleScroll, { passive: true });
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // Prevent body scroll when menu is open
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }
    
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  const navLinks = [
    { name: 'HOME', href: '/', ariaLabel: 'Navigate to home page' },
    { name: 'ABOUT', href: '/about', ariaLabel: 'Navigate to about page' },
    { name: 'PROJECTS', href: '/projects', ariaLabel: 'Navigate to projects page' },
    { name: 'SERVICES', href: '/services', ariaLabel: 'Navigate to services page' },
    { name: 'CONTACT', href: '/contact', ariaLabel: 'Navigate to contact page' },
  ];

  const isActive = (href: string) => location.pathname === href;

  return (
    <>
      {/* Full screen overlay that appears behind the menu */}
      {isMobile && (
        <div 
          className={`fixed inset-0 bg-black/80 backdrop-blur-md z-40 transition-opacity duration-500 ${
            isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'
          }`}
          onClick={() => setIsOpen(false)}
          aria-hidden="true"
        ></div>
      )}
    
      <nav 
        className={`fixed top-0 left-0 right-0 z-50 transition-all duration-500 ${
          scrolled 
            ? 'backdrop-blur-sm py-3' 
            : 'py-5'
        } ${
          hidden && !isOpen ? '-translate-y-full' : 'translate-y-0'
        } ${
          isOpen && isMobile ? 'bg-[#121212]/95 backdrop-blur-lg' : ''
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
              aria-label="DUAL NOVA LAB - Home"
            >
              <div className="relative flex items-center justify-center w-10 h-10 overflow-hidden">
                <div className="absolute inset-0 bg-accent-gradient rounded-lg opacity-70 group-hover:opacity-100 transition-all duration-500 animate-glow"></div>
                <Code size={20} className="text-white z-10 animate-pulse-slow" />
              </div>
              <span className={`${isMobile ? 'text-xl' : 'text-2xl'} font-extrabold text-transparent bg-clip-text bg-accent-gradient`}>
                DUAL NOVA
              </span>
            </Link>

            {/* Desktop Navigation */}
            <div className="hidden md:flex items-center space-x-1">
              {navLinks.map((link, index) => (
                <Link
                  key={link.name}
                  to={link.href}
                  aria-label={link.ariaLabel}
                  className={`relative text-sm font-semibold tracking-wider transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] px-5 py-2 rounded-full ${
                    isActive(link.href)
                      ? 'text-white bg-gradient-to-r from-blue-500/20 to-purple-500/20 hover:from-blue-500/30 hover:to-purple-500/30'
                      : 'text-gray-300 hover:text-white hover:bg-white/5'
                  }`}
                  style={{ animationDelay: `${index * 0.1}s` }}
                >
                  {link.name}
                  <span className={`absolute -bottom-0.5 left-1/2 -translate-x-1/2 h-0.5 bg-gradient-to-r from-blue-400 to-purple-500 transition-all duration-300 group-hover:w-1/2 ${
                    isActive(link.href) ? 'w-1/3' : 'w-0'
                  }`}></span>
                </Link>
              ))}
            </div>

            {/* Mobile menu button - positioned to avoid badge overlap */}
            <div className="md:hidden">
              <button
                onClick={() => setIsOpen(!isOpen)}
                className="relative overflow-hidden w-10 h-10 flex items-center justify-center text-white bg-transparent rounded-lg hover:bg-white/5 transition-all duration-300 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 focus:ring-offset-[#121212] z-50"
                aria-label={isOpen ? 'Close menu' : 'Open menu'}
                aria-expanded={isOpen}
              >
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
            className={`md:hidden fixed left-0 right-0 transition-all duration-500 px-6 z-50 ${
              isOpen ? 'top-[72px] opacity-100' : 'top-[-400px] opacity-0'
            }`}
          >
            <div className="rounded-2xl backdrop-blur-lg bg-[#121212]/90 border border-gray-800/50 shadow-xl shadow-black/20 overflow-hidden">
              <div className="px-2 pt-2 pb-3 space-y-1">
                {navLinks.map((link, index) => (
                  <Link
                    key={link.name}
                    to={link.href}
                    onClick={() => setIsOpen(false)}
                    aria-label={link.ariaLabel}
                    className={`block px-4 py-3 text-sm font-medium tracking-wider rounded-xl transition-all duration-300 ${
                      isActive(link.href)
                        ? 'text-white border-l-2 border-blue-400 bg-gradient-to-r from-blue-500/10 to-purple-500/10'
                        : 'text-gray-300 hover:text-white border-l-2 border-transparent hover:border-purple-400/50 hover:bg-white/5'
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
        </div>
      </nav>
    </>
  );
};
