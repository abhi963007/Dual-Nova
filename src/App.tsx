import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation, useNavigationType } from "react-router-dom";
import { useEffect, useState, Suspense } from "react";
import Loader from "./components/Loader";
import Index from "./pages/Index";
import About from "./pages/About";
import Projects from "./pages/Projects";
import Services from "./pages/Services";
import Contact from "./pages/Contact";
import OurStory from "./pages/OurStory";
import NotFound from "./pages/NotFound";

// Service detail pages
import WebDevelopment from "./pages/WebDevelopment";
import MobileDevelopment from "./pages/MobileDevelopment";
import FullStackSolutions from "./pages/FullStackSolutions";
import ApiDevelopment from "./pages/ApiDevelopment";
import UiUxDesign from "./pages/UiUxDesign";
import PerformanceOptimization from "./pages/PerformanceOptimization";

// Core value pages
import QualityFirst from "./pages/QualityFirst";
import ClientPartnership from "./pages/ClientPartnership";
import ContinuousLearning from "./pages/ContinuousLearning";
import InnovationDriven from "./pages/InnovationDriven";

// Scroll to top on route change
function ScrollToTopAndLoader() {
  const { pathname } = useLocation();
  const navigationType = useNavigationType();
  const [isLoading, setIsLoading] = useState(true);
  
  useEffect(() => {
    // Scroll to top
    window.scrollTo(0, 0);
    
    // Show loader on all navigation events
    setIsLoading(true);
    
    const timeout = setTimeout(() => {
      setIsLoading(false);
    }, 1000); // Adjust the timeout as needed
    
    return () => clearTimeout(timeout);
  }, [pathname, navigationType]);
  
  return <Loader isLoading={isLoading} />;
}

// Initial app loader to show on first load
function InitialLoader() {
  const [isFirstLoad, setIsFirstLoad] = useState(true);
  
  useEffect(() => {
    const timeout = setTimeout(() => {
      setIsFirstLoad(false);
    }, 2000); // Show loader for 2 seconds on initial load
    
    return () => clearTimeout(timeout);
  }, []);
  
  return <Loader isLoading={isFirstLoad} />;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <InitialLoader />
        <ScrollToTopAndLoader />
        <Suspense fallback={<Loader isLoading={true} />}>
          <Routes>
            <Route path="/" element={<Index />} />
            <Route path="/about" element={<About />} />
            <Route path="/projects" element={<Projects />} />
            <Route path="/services" element={<Services />} />
            <Route path="/contact" element={<Contact />} />
            <Route path="/our-story" element={<OurStory />} />

            {/* Service Detail Pages */}
            <Route path="/services/web-development" element={<WebDevelopment />} />
            <Route path="/services/mobile-development" element={<MobileDevelopment />} />
            <Route path="/services/full-stack-solutions" element={<FullStackSolutions />} />
            <Route path="/services/api-development" element={<ApiDevelopment />} />
            <Route path="/services/ui-ux-design" element={<UiUxDesign />} />
            <Route path="/services/performance-optimization" element={<PerformanceOptimization />} />
            
            {/* Core Value Pages */}
            <Route path="/values/quality-first" element={<QualityFirst />} />
            <Route path="/values/client-partnership" element={<ClientPartnership />} />
            <Route path="/values/continuous-learning" element={<ContinuousLearning />} />
            <Route path="/values/innovation-driven" element={<InnovationDriven />} />
            
            {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </Suspense>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
