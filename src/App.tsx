import React from 'react';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import { useEffect } from 'react';
import Index from './pages/Index';
import About from './pages/About';
import Projects from './pages/Projects';
import Services from './pages/Services';
import Contact from './pages/Contact';
import NotFound from './pages/NotFound';
import Dashboard from './pages/Dashboard';
import ProtectedRoute from './components/ProtectedRoute';
import Overview from './pages/Overview';
import Analytics from './pages/Analytics';
import Team from './pages/Team';
import Settings from './pages/Settings';
import OurStory from './pages/OurStory';
import WebDevelopment from './pages/WebDevelopment';
import MobileDevelopment from './pages/MobileDevelopment';
import FullStackSolutions from './pages/FullStackSolutions';
import ApiDevelopment from './pages/ApiDevelopment';
import UiUxDesign from './pages/UiUxDesign';
import PerformanceOptimization from './pages/PerformanceOptimization';
import CloudIntegration from './pages/CloudIntegration';
import AiMlSolutions from './pages/AiMlSolutions';
import DevOpsAutomation from './pages/DevOpsAutomation';
import InnovationDriven from './pages/InnovationDriven';
import ContinuousLearning from './pages/ContinuousLearning';
import ClientPartnership from './pages/ClientPartnership';
import QualityFirst from './pages/QualityFirst';
import Tasks from './pages/Tasks';
import Reports from './pages/Reports';
import Chat from './pages/Chat';

// ScrollToTop component that will reset scroll position on page navigation
function ScrollToTop() {
  const { pathname } = useLocation();

  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);

  return null;
}

function App() {
  return (
    <Router>
      <ScrollToTop />
      <div className="App">
        <Routes>
          <Route path="/" element={<Index />} />
          <Route path="/about" element={<About />} />
          <Route path="/projects" element={<Projects />} />
          <Route path="/services" element={<Services />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/dashboard" element={<ProtectedRoute><Dashboard /></ProtectedRoute>} />
          <Route path="/overview" element={<Overview />} />
          <Route path="/analytics" element={<Analytics />} />
          <Route path="/team" element={<Team />} />
          <Route path="/settings" element={<Settings />} />
          <Route path="/our-story" element={<OurStory />} />
          
          {/* Individual Service Pages */}
          <Route path="/services/web-development" element={<WebDevelopment />} />
          <Route path="/services/mobile-development" element={<MobileDevelopment />} />
          <Route path="/services/full-stack-solutions" element={<FullStackSolutions />} />
          <Route path="/services/api-development" element={<ApiDevelopment />} />
          <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
          <Route path="/services/performance-optimization" element={<PerformanceOptimization />} />
          <Route path="/services/cloud-integration" element={<CloudIntegration />} />
          <Route path="/services/ai-ml-solutions" element={<AiMlSolutions />} />
          <Route path="/services/devops-automation" element={<DevOpsAutomation />} />
          
          {/* Additional Pages */}
          <Route path="/innovation-driven" element={<InnovationDriven />} />
          <Route path="/continuous-learning" element={<ContinuousLearning />} />
          <Route path="/client-partnership" element={<ClientPartnership />} />
          <Route path="/quality-first" element={<QualityFirst />} />
          <Route path="/tasks" element={<Tasks />} />
          <Route path="/reports" element={<Reports />} />
          <Route path="/chat" element={<Chat />} />
          
          <Route path="*" element={<NotFound />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
