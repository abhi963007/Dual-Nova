import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import Index from './pages/Index';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import WebDevelopment from './pages/services/WebDevelopment';
import MobileDevelopment from './pages/services/MobileDevelopment';
import UiUxDesign from './pages/services/UiUxDesign';
import ApiDevelopment from './pages/services/ApiDevelopment';
import PerformanceOptimization from './pages/services/PerformanceOptimization';
import FullStackSolutions from './pages/services/FullStackSolutions';
import OurStory from './pages/about/OurStory';
import InnovationDriven from './pages/about/InnovationDriven';
import QualityFirst from './pages/about/QualityFirst';
import ClientPartnership from './pages/about/ClientPartnership';
import ContinuousLearning from './pages/about/ContinuousLearning';
import Overview from './pages/Overview';
import Chat from './pages/Chat';
import Team from './pages/Team';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Settings from './pages/Settings';

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/chat" element={<Chat />} />
          <Route path="/team" element={<Team />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/settings" element={<Settings />} />
          
          {/* Service detail routes */}
          <Route path="/web-development" element={<WebDevelopment />} />
          <Route path="/mobile-development" element={<MobileDevelopment />} />
          <Route path="/ui-ux-design" element={<UiUxDesign />} />
          <Route path="/api-development" element={<ApiDevelopment />} />
          <Route path="/performance-optimization" element={<PerformanceOptimization />} />
          <Route path="/full-stack-solutions" element={<FullStackSolutions />} />
          
          {/* About detail routes */}
          <Route path="/our-story" element={<OurStory />} />
          <Route path="/innovation-driven" element={<InnovationDriven />} />
          <Route path="/quality-first" element={<QualityFirst />} />
          <Route path="/client-partnership" element={<ClientPartnership />} />
          <Route path="/continuous-learning" element={<ContinuousLearning />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
