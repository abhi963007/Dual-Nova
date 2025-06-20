import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { IntroSection } from '../components/IntroSection';
import { ServicesSection } from '../components/ServicesSection';
import { Footer } from '../components/Footer';
import Loader from '../components/Loader';

const Index = () => {
  const [isLoading, setIsLoading] = useState(true);

  useEffect(() => {
    // Simulate content loading
    const timer = setTimeout(() => {
      setIsLoading(false);
    }, 2000);

    return () => clearTimeout(timer);
  }, []);

  return (
    <>
      <Loader isLoading={isLoading} />
      <div className={`min-h-screen bg-[#121212] text-white font-outfit transition-opacity duration-500 ${isLoading ? 'opacity-0' : 'opacity-100'}`}>
        <Navigation />
        <HeroSection />
        <IntroSection />
        <ServicesSection />
        <Footer />
      </div>
    </>
  );
};

export default Index;
