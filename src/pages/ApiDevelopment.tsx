import React from 'react';
import { Database } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const ApiDevelopment = () => {
  return (
    <ServiceDetailLayout
      title="API Development"
      subtitle="Robust & Scalable API Solutions"
      description="We design and build powerful, well-documented, and scalable APIs that serve as the backbone of your digital ecosystem. Our API development services enable seamless data exchange, efficient integrations, and create new opportunities for business growth and innovation."
      iconBg="bg-gradient-to-br from-cyan-500/20 to-cyan-600/20 border border-cyan-500/30"
      icon={<Database size={28} className="text-cyan-400" />}
      image="https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=800&auto=format&fit=crop&q=60"
      features={[
        "RESTful API Development",
        "GraphQL API Design & Implementation",
        "Microservices Architecture",
        "API Documentation (Swagger/OpenAPI)",
        "API Authentication & Authorization",
        "Rate Limiting & Throttling",
        "Webhook Integrations",
        "Real-time APIs (WebSockets)",
        "Third-party API Integration",
        "API Versioning & Lifecycle Management"
      ]}
      technologies={[
        {
          name: "API Architecture",
          description: "REST, GraphQL, gRPC, WebSockets, SOAP, Microservices"
        },
        {
          name: "Development Technologies",
          description: "Node.js (Express, NestJS), Python (Django, FastAPI), Ruby (Rails), PHP (Laravel), .NET Core"
        },
        {
          name: "API Management",
          description: "API Gateway, Kong, Apigee, AWS API Gateway, Azure API Management"
        },
        {
          name: "Documentation & Testing",
          description: "Swagger/OpenAPI, Postman, Insomnia, Pactum, Jest, Mocha, Supertest"
        }
      ]}
      benefits={[
        "Enable seamless integration between different systems",
        "Expand your product's capabilities through third-party services",
        "Create new revenue streams through API monetization",
        "Improve developer experience with well-documented APIs",
        "Increase security with robust authentication systems",
        "Future-proof your applications with scalable architecture",
        "Reduce complexity through standardized data exchange"
      ]}
      caseStudies={[
        {
          title: "Payment Processing API",
          description: "Developed a secure payment processing API integrating multiple payment providers with fraud detection capabilities.",
          image: "https://images.unsplash.com/photo-1563013544-824ae1b704d3?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "E-commerce Integration Platform",
          description: "Created an API hub connecting various e-commerce systems, inventory management, and shipping services.",
          image: "https://images.unsplash.com/photo-1563770660941-20978e870e26?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Social Media Aggregation API",
          description: "Built a unified API for collecting and analyzing data from multiple social media platforms in real-time.",
          image: "https://images.unsplash.com/photo-1611162617213-7d7a39e9b1d7?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "What's the difference between REST and GraphQL APIs?",
          answer: "REST APIs use standard HTTP methods and endpoints for each resource, while GraphQL provides a more flexible single-endpoint approach where clients can request exactly the data they need. We can help you choose the right approach based on your specific requirements."
        },
        {
          question: "How do you ensure API security?",
          answer: "We implement multiple security layers including OAuth2/JWT authentication, rate limiting, input validation, HTTPS encryption, API keys, IP whitelisting, and regular security audits to protect your data and systems."
        },
        {
          question: "Do you provide API documentation?",
          answer: "Yes, comprehensive API documentation is a core deliverable of our service. We use industry-standard tools like Swagger/OpenAPI to provide interactive documentation that helps developers quickly understand and implement your API."
        },
        {
          question: "Can you help with API versioning and maintenance?",
          answer: "Yes, we design APIs with versioning strategies built-in from the start and can help establish maintenance protocols, deprecation policies, and backward compatibility approaches to ensure smooth transitions as your API evolves."
        },
        {
          question: "How do you approach API testing?",
          answer: "We implement thorough testing strategies including unit tests, integration tests, load tests, and security tests to ensure your API functions correctly, handles errors gracefully, and performs well under load."
        }
      ]}
      relatedServices={[
        { title: "Web Development", href: "/services/web-development" },
        { title: "Full-Stack Solutions", href: "/services/full-stack-solutions" },
        { title: "Performance Optimization", href: "/services/performance-optimization" }
      ]}
    />
  );
};

export default ApiDevelopment; 