
import React from 'react';
import { Instagram, Linkedin, Youtube, Mail, Phone, MapPin } from 'lucide-react';

export const Footer = () => {
  const quickLinks = [
    { name: 'Home', href: '#' },
    { name: 'About', href: '#about' },
    { name: 'Projects', href: '#projects' },
    { name: 'Services', href: '#services' },
    { name: 'Contact', href: '#contact' },
  ];

  const socialLinks = [
    { icon: Instagram, href: '#', label: 'Instagram' },
    { icon: Youtube, href: '#', label: 'YouTube' },
    { icon: Linkedin, href: '#', label: 'LinkedIn' },
  ];

  return (
    <footer className="bg-[#0a0a0a] text-white pt-16 pb-8">
      <div className="max-w-7xl mx-auto px-6">
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
                    className="w-10 h-10 bg-gray-800 hover:bg-blue-600 rounded-full flex items-center justify-center transition-all duration-300 hover:scale-110"
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

        {/* Copyright */}
        <div className="border-t border-gray-800 pt-8 text-center">
          <p className="text-gray-400">
            © 2024 Dual Nova Lab. All rights reserved. Crafted with ❤️ in Kerala.
          </p>
        </div>
      </div>
    </footer>
  );
};
