import React from 'react';
import { Navigation } from '../components/Navigation';
import { Footer } from '../components/Footer';
import { Link } from 'react-router-dom';

const NotFound = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      
      <div className="flex items-center justify-center min-h-screen px-6">
        <div className="text-center max-w-2xl mx-auto">
          <h1 className="text-6xl md:text-8xl font-black text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-cyan-400 mb-6">
            404
          </h1>
          <h2 className="text-3xl md:text-4xl font-bold mb-4 text-white">
            Page Not Found
          </h2>
          <p className="text-xl text-gray-400 mb-8 leading-relaxed">
            The page you're looking for doesn't exist or has been moved.
          </p>
          <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
            Go back to home
          </Link>
        </div>
      </div>
      
      <Footer />
    </div>
  );
};

export default NotFound;
