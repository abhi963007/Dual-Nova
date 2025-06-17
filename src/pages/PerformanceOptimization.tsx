import React from 'react';
import { Zap } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const PerformanceOptimization = () => {
  return (
    <ServiceDetailLayout
      title="Performance Optimization"
      subtitle="Lightning-Fast Digital Experiences"
      description="We transform slow, underperforming applications into lightning-fast experiences that delight users and drive business results. Our comprehensive optimization approach addresses frontend rendering, backend processing, database queries, network requests, and infrastructure to deliver maximum performance and efficiency."
      iconBg="bg-gradient-to-br from-yellow-500/20 to-orange-600/20 border border-yellow-500/30"
      icon={<Zap size={28} className="text-yellow-400" />}
      image="https://images.unsplash.com/photo-1550751827-4bd374c3f58b?w=800&auto=format&fit=crop&q=60"
      features={[
        "Frontend Performance Optimization",
        "Backend & API Optimization",
        "Database Query Optimization",
        "Caching Strategies Implementation",
        "Image & Asset Optimization",
        "Code Splitting & Lazy Loading",
        "Server Response Time Improvement",
        "Core Web Vitals Optimization",
        "Infrastructure & Hosting Optimization",
        "Performance Monitoring & Analytics"
      ]}
      technologies={[
        {
          name: "Frontend Optimization",
          description: "Webpack, Lighthouse, Chrome DevTools, Code splitting, Bundle analysis, Tree shaking, Service workers"
        },
        {
          name: "Backend Optimization",
          description: "Query optimization, N+1 query elimination, Memory profiling, Async processing, Horizontal scaling"
        },
        {
          name: "Caching & CDN",
          description: "Redis, Memcached, Varnish, Cloudflare, AWS CloudFront, Content Delivery Networks"
        },
        {
          name: "Monitoring & Analytics",
          description: "New Relic, Datadog, Firebase Performance, Google PageSpeed Insights, WebPageTest"
        }
      ]}
      benefits={[
        "Faster page load times and improved user engagement",
        "Higher conversion rates and reduced bounce rates",
        "Better search engine rankings (SEO)",
        "Reduced infrastructure and bandwidth costs",
        "Improved mobile user experience",
        "Enhanced application stability under load",
        "Increased customer satisfaction and retention",
        "Competitive advantage through superior performance"
      ]}
      caseStudies={[
        {
          title: "E-commerce Site Speed Boost",
          description: "Optimized a high-traffic e-commerce site, reducing load times by 67% and increasing conversions by 23%.",
          image: "https://images.unsplash.com/photo-1607083206869-4c7672e72a8a?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Enterprise Application Scaling",
          description: "Rebuilt backend architecture for a SaaS platform to handle 10x user growth while maintaining response times.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Media Site Performance Revamp",
          description: "Optimized a news platform with millions of monthly visitors, improving Core Web Vitals scores to the 90th percentile.",
          image: "https://images.unsplash.com/photo-1504868584819-f8e8b4b6d7e3?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "How do you approach performance optimization?",
          answer: "We start with comprehensive performance auditing to identify bottlenecks using tools like Lighthouse, WebPageTest, and profiling tools. We then prioritize optimizations based on impact and implement them methodically, measuring results at each stage."
        },
        {
          question: "What performance metrics do you focus on?",
          answer: "We focus on Core Web Vitals (LCP, FID, CLS) and other key metrics like Time to Interactive, Total Blocking Time, and First Contentful Paint. For backend and API optimization, we measure response times, throughput, and resource utilization."
        },
        {
          question: "How much improvement can I expect?",
          answer: "While results vary by project, our optimizations typically yield 40-70% improvements in load times and other key metrics. For complex applications with significant performance issues, improvements can be even more dramatic."
        },
        {
          question: "Do you optimize for mobile devices?",
          answer: "Yes, mobile optimization is a core focus. We implement mobile-specific optimizations, test on various devices and networks, and ensure your application performs well even on slower connections and less powerful devices."
        },
        {
          question: "Do you provide ongoing performance monitoring?",
          answer: "Yes, we can set up continuous performance monitoring tools and create dashboards to track key metrics over time. We can also establish performance budgets and alerts to maintain optimal performance as your application evolves."
        }
      ]}
      relatedServices={[
        { title: "Web Development", href: "/services/web-development" },
        { title: "Full-Stack Solutions", href: "/services/full-stack-solutions" },
        { title: "API Development", href: "/services/api-development" }
      ]}
    />
  );
};

export default PerformanceOptimization; 