import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { Link } from 'react-router-dom';
import { useIsMobile } from '../hooks/use-mobile';

export const Footer = () => {
  const isMobile = useIsMobile();
  
  const quickLinks = [
    { name: 'Home', href: '/' },
    { name: 'About', href: '/about' },
    { name: 'Projects', href: '/projects' },
    { name: 'Services', href: '/services' },
    { name: 'Contact', href: '/contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-8 pb-6 border-t border-gray-800/50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile Footer - Minimal */}
        {isMobile ? (
          <div className="space-y-6">
            {/* Company Info */}
            <div className="text-center">
              <h3 className="text-lg font-bold mb-2">DUAL NOVA LAB</h3>
              <p className="text-gray-400 text-sm">
                Crafting smart digital solutions.
              </p>
            </div>
            
            {/* Quick Links */}
            <div className="flex flex-wrap justify-center gap-4">
              {quickLinks.map((link) => (
                <Link
                  key={link.name}
                  to={link.href}
                  className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                >
                  {link.name}
                </Link>
              ))}
            </div>

            {/* Social Links */}
            <div className="flex justify-center space-x-4">
              {socialLinks.map((social, index) => {
                const Icon = social.icon;
                return (
                  <a
                    key={index}
                    href={social.href}
                    className="w-8 h-8 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                    aria-label={social.label}
                  >
                    <Icon size={16} className="text-gray-400" />
                  </a>
                );
              })}
            </div>

            {/* Contact Info */}
            <div className="text-center space-y-1">
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Mail size={14} className="text-gray-400" />
                <a href="mailto:dualnovalabs@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  dualnovalabs@gmail.com
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <Phone size={14} className="text-gray-400" />
                <a href="tel:+917306364765" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  +91 7306364765
                </a>
                <span className="text-gray-400">,</span>
                <a href="tel:+919072783958" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                  +91 9072783958
                </a>
              </div>
              <div className="flex items-center justify-center space-x-2 text-sm">
                <MapPin size={14} className="text-gray-400" />
                <span className="text-gray-400">Kochi, Kerala, India</span>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Version - Minimal */
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8 mb-8">
            {/* Company Info */}
            <div className="md:col-span-2">
              <h3 className="text-xl font-bold mb-3">DUAL NOVA LAB</h3>
              <p className="text-gray-400 mb-4 leading-relaxed max-w-md">
                Crafting smart digital solutions with passion and precision.
              </p>
              <div className="flex space-x-3">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className="w-9 h-9 bg-gray-800 rounded-full flex items-center justify-center hover:bg-gray-700 transition-colors duration-300"
                      aria-label={social.label}
                    >
                      <Icon size={18} className="text-gray-400" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Quick Links</h4>
              <ul className="space-y-2">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <Link
                      to={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 text-sm"
                    >
                      {link.name}
                    </Link>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-sm font-semibold mb-3 text-gray-300">Contact</h4>
              <div className="space-y-2">
                <div className="flex items-center space-x-2 text-sm">
                  <Mail size={14} className="text-gray-400" />
                  <a href="mailto:dualnovalabs@gmail.com" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    dualnovalabs@gmail.com
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm">
                  <Phone size={14} className="text-gray-400" />
                  <a href="tel:+917306364765" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    +91 7306364765
                  </a>
                  <span className="text-gray-400">,</span>
                  <a href="tel:+919072783958" className="text-gray-400 hover:text-blue-400 transition-colors duration-300">
                    +91 9072783958
                  </a>
                </div>
                <div className="flex items-center space-x-2 text-sm text-gray-400">
                  <MapPin size={14} />
                  <span>Kochi, Kerala</span>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Copyright */}
        <div className={`${isMobile ? 'mt-6' : ''} border-t border-gray-800 pt-4 text-center`}>
          <p className="text-gray-500 text-xs">
            © 2024 Dual Nova Lab. All rights reserved.
          </p>
        </div>
      </div>
    </footer>
  );
};
