
import React, { useEffect, useState } from 'react';
import { Navigation } from '../components/Navigation';
import { HeroSection } from '../components/HeroSection';
import { IntroSection } from '../components/IntroSection';
import { ServicesSection } from '../components/ServicesSection';
import { Footer } from '../components/Footer';

const Index = () => {
  return (
    <div className="min-h-screen bg-[#121212] text-white font-outfit">
      <Navigation />
      <HeroSection />
      <IntroSection />
      <ServicesSection />
      <Footer />
    </div>
  );
};

export default Index;
