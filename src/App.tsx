import { Toaster } from "@/components/ui/toaster";
import { Toaster as Sonner } from "@/components/ui/sonner";
import { TooltipProvider } from "@/components/ui/tooltip";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { BrowserRouter, Routes, Route, useLocation } from "react-router-dom";
import { useEffect } from "react";
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

// Scroll to top on route change
function ScrollToTop() {
  const { pathname } = useLocation();
  
  useEffect(() => {
    window.scrollTo(0, 0);
  }, [pathname]);
  
  return null;
}

const queryClient = new QueryClient();

const App = () => (
  <QueryClientProvider client={queryClient}>
    <TooltipProvider>
      <Toaster />
      <Sonner />
      <BrowserRouter>
        <ScrollToTop />
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
          
          {/* ADD ALL CUSTOM ROUTES ABOVE THE CATCH-ALL "*" ROUTE */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </TooltipProvider>
  </QueryClientProvider>
);

export default App;
