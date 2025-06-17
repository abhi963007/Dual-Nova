import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';
import { useIsMobile } from '@/hooks/use-mobile';

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
    { icon: Instagram, href: '#', label: 'Instagram', color: 'hover:bg-gradient-to-br hover:from-purple-500 hover:to-pink-500' },
    { icon: Youtube, href: '#', label: 'YouTube', color: 'hover:bg-gradient-to-br hover:from-red-500 hover:to-red-600' },
    { icon: Linkedin, href: '#', label: 'LinkedIn', color: 'hover:bg-gradient-to-br hover:from-blue-500 hover:to-blue-600' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-12 sm:pt-16 pb-6 sm:pb-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6">
        {/* Mobile Footer - Simplified and Optimized */}
        {isMobile ? (
          <div className="space-y-10">
            {/* Company Info + Social */}
            <div className="flex flex-col items-center text-center">
              <h3 className="text-xl font-bold mb-3">DUAL NOVA LAB</h3>
              <p className="text-gray-400 mb-5 leading-relaxed max-w-xs">
                Crafting smart digital solutions with passion and precision.
              </p>
              <div className="flex space-x-4 mb-2">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 ${social.color} shadow-md`}
                      aria-label={social.label}
                    >
                      <Icon size={18} className="text-white" />
                    </a>
                  );
                })}
              </div>
            </div>
            
            {/* Contact Info */}
            <div className="bg-[#121212] rounded-2xl p-5 shadow-lg border border-gray-800/50">
              <h4 className="text-md font-semibold mb-4 text-blue-400 text-center">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3 justify-center">
                  <div className="w-8 h-8 rounded-full bg-green-900/30 flex items-center justify-center">
                    <MapPin size={16} className="text-green-400" />
                  </div>
                  <span className="text-gray-300">Kochi, Kerala, India</span>
                </div>
                <div className="flex items-center space-x-3 justify-center">
                  <div className="w-8 h-8 rounded-full bg-blue-900/30 flex items-center justify-center">
                    <Mail size={16} className="text-blue-400" />
                  </div>
                  <span className="text-gray-300">hello@codepiece.dev</span>
                </div>
                <div className="flex items-center space-x-3 justify-center">
                  <div className="w-8 h-8 rounded-full bg-purple-900/30 flex items-center justify-center">
                    <Phone size={16} className="text-purple-400" />
                  </div>
                  <span className="text-gray-300">+91 98765 43210</span>
                </div>
              </div>
            </div>
            
            {/* Quick Links - Mobile Horizontal */}
            <div>
              <h4 className="text-md font-semibold mb-4 text-blue-400 text-center">Quick Links</h4>
              <div className="flex flex-wrap justify-center gap-4">
                {quickLinks.map((link) => (
                  <a
                    key={link.name}
                    href={link.href}
                    className="px-4 py-2 bg-gray-800/60 rounded-full text-gray-300 hover:bg-blue-600/20 hover:text-white transition-all duration-200 border border-gray-700/30 text-sm"
                  >
                    {link.name}
                  </a>
                ))}
              </div>
            </div>

            {/* Newsletter - Mobile Version */}
            <div>
              <h4 className="text-md font-semibold mb-3 text-blue-400 text-center">Stay Updated</h4>
              <div className="flex max-w-xs mx-auto">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white"
                />
                <button className="px-5 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        ) : (
          /* Desktop Version - Original Layout */
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
            {/* Company Info */}
            <div className="lg:col-span-1">
              <h3 className="text-2xl font-bold mb-4">DUAL NOVA LAB</h3>
              <p className="text-gray-400 mb-6 leading-relaxed">
                Crafting smart digital solutions with passion and precision. 
                Your vision, our expertise.
              </p>
              <div className="flex space-x-4">
                {socialLinks.map((social, index) => {
                  const Icon = social.icon;
                  return (
                    <a
                      key={index}
                      href={social.href}
                      className={`w-10 h-10 bg-gray-800 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110 ${social.color}`}
                      aria-label={social.label}
                    >
                      <Icon size={18} className="text-white" />
                    </a>
                  );
                })}
              </div>
            </div>

            {/* Quick Links */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Quick Links</h4>
              <ul className="space-y-3">
                {quickLinks.map((link) => (
                  <li key={link.name}>
                    <a
                      href={link.href}
                      className="text-gray-400 hover:text-white transition-colors duration-200 hover:translate-x-1 inline-block"
                    >
                      {link.name}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Contact Info */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Contact Info</h4>
              <div className="space-y-4">
                <div className="flex items-center space-x-3">
                  <MapPin size={18} className="text-green-400" />
                  <span className="text-gray-400">Kochi, Kerala, India</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Mail size={18} className="text-blue-400" />
                  <span className="text-gray-400">hello@codepiece.dev</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Phone size={18} className="text-purple-400" />
                  <span className="text-gray-400">+91 98765 43210</span>
                </div>
              </div>
            </div>

            {/* Newsletter */}
            <div>
              <h4 className="text-lg font-semibold mb-6 text-blue-400">Stay Updated</h4>
              <p className="text-gray-400 mb-4">
                Subscribe to our newsletter for the latest updates and insights.
              </p>
              <div className="flex">
                <input
                  type="email"
                  placeholder="Your email"
                  className="flex-1 px-4 py-2 bg-gray-800 border border-gray-700 rounded-l-lg focus:outline-none focus:border-blue-500 text-white"
                />
                <button className="px-6 py-2 bg-blue-600 hover:bg-blue-700 rounded-r-lg transition-colors duration-200">
                  <Mail size={18} />
                </button>
              </div>
            </div>
          </div>
        )}

        {/* Copyright - Same for both mobile and desktop */}
        <div className={`${isMobile ? 'mt-10' : ''} border-t border-gray-800 pt-6 text-center`}>
          <p className="text-gray-400 text-sm">
            © 2024 Dual Nova Lab. All rights reserved. Crafted with ❤️ in Kerala.
          </p>
        </div>
      </div>
    </footer>
  );
};
