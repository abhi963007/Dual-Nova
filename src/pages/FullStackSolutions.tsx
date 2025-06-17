import React from 'react';
import { Globe } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const FullStackSolutions = () => {
  return (
    <ServiceDetailLayout
      title="Full-Stack Solutions"
      subtitle="End-to-End Development Services"
      description="We provide comprehensive full-stack development solutions that cover everything from frontend user interfaces to backend infrastructure. Our integrated approach ensures seamless data flow, optimal performance, and cohesive user experiences across all layers of your application."
      iconBg="bg-gradient-to-br from-green-500/20 to-emerald-600/20 border border-green-500/30"
      icon={<Globe size={28} className="text-green-400" />}
      image="https://images.unsplash.com/photo-1581092335397-9583eb92d232?w=800&auto=format&fit=crop&q=60"
      features={[
        "Frontend & Backend Integration",
        "Database Design & Optimization",
        "API Development & Documentation",
        "Authentication & Authorization Systems",
        "Cloud Infrastructure Setup",
        "DevOps & CI/CD Implementation",
        "Scalable Architecture Design",
        "Performance Monitoring & Optimization",
        "Security Implementation"
      ]}
      technologies={[
        {
          name: "Frontend Stack",
          description: "React, Vue.js, Angular, Next.js, TypeScript, Redux, GraphQL clients"
        },
        {
          name: "Backend Stack",
          description: "Node.js, Python/Django, Ruby on Rails, .NET, Java Spring, Express, NestJS"
        },
        {
          name: "Database Technologies",
          description: "PostgreSQL, MySQL, MongoDB, Redis, Elasticsearch, DynamoDB, Neo4j"
        },
        {
          name: "DevOps & Infrastructure",
          description: "Docker, Kubernetes, AWS, GCP, Azure, GitHub Actions, Jenkins, Terraform"
        }
      ]}
      benefits={[
        "Unified development approach reduces integration issues",
        "Consistent coding standards across the entire application",
        "Optimized data flow between frontend and backend",
        "Improved application performance and user experience",
        "Scalable architecture that grows with your business",
        "Reduced development time and maintenance costs",
        "Enhanced security across all application layers"
      ]}
      caseStudies={[
        {
          title: "Enterprise Resource Planning System",
          description: "Developed a complete ERP solution with inventory management, HR, and financial reporting modules.",
          image: "https://images.unsplash.com/photo-1460925895917-afdab827c52f?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Real Estate Marketplace",
          description: "Built a full-stack platform connecting buyers, sellers, and agents with advanced search and listing features.",
          image: "https://images.unsplash.com/photo-1560518883-ce09059eeffa?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Healthcare Management System",
          description: "Created a comprehensive platform for patient management, scheduling, and medical records with HIPAA compliance.",
          image: "https://images.unsplash.com/photo-1587370560942-ad2a04eabb6d?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "What are the advantages of choosing a full-stack solution?",
          answer: "A full-stack approach ensures seamless integration between frontend and backend, consistent development practices, reduced communication overhead, and optimized performance across all layers of your application."
        },
        {
          question: "How do you ensure scalability in full-stack applications?",
          answer: "We architect applications with scalability in mind from the start, using microservices when appropriate, implementing caching strategies, optimizing database queries, and setting up cloud infrastructure that can scale horizontally."
        },
        {
          question: "Can you integrate with our existing systems?",
          answer: "Yes, we can design full-stack solutions that integrate with your existing infrastructure, databases, and third-party services, ensuring a smooth transition and minimal disruption."
        },
        {
          question: "Do you provide documentation for the codebase?",
          answer: "Absolutely. We deliver comprehensive documentation covering architecture decisions, API specifications, database schemas, deployment procedures, and maintenance guides to ensure your team can effectively maintain and extend the application."
        },
        {
          question: "How do you handle security in full-stack applications?",
          answer: "We implement security at every layer: secure authentication and authorization, data encryption, input validation, protection against common vulnerabilities, API security, and regular security audits to maintain your application's integrity."
        }
      ]}
      relatedServices={[
        { title: "Web Development", href: "/services/web-development" },
        { title: "API Development", href: "/services/api-development" },
        { title: "Performance Optimization", href: "/services/performance-optimization" }
      ]}
    />
  );
};

export default FullStackSolutions; 