import React from 'react';
import { Code } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const WebDevelopment = () => {
  return (
    <ServiceDetailLayout
      title="Web Development"
      subtitle="Custom Web Application Development"
      description="We create modern, responsive, and high-performing web applications tailored to your specific business needs. Our web development solutions are built with scalability, security, and user experience in mind, ensuring your application stands out in today's competitive digital landscape."
      iconBg="bg-gradient-to-br from-blue-500/20 to-blue-600/20 border border-blue-500/30"
      icon={<Code size={28} className="text-blue-400" />}
      image="https://images.unsplash.com/photo-1618477247222-acbdb0e159b3?w=800&auto=format&fit=crop&q=60"
      features={[
        "Responsive Design for All Devices",
        "Progressive Web Applications (PWAs)",
        "Custom Content Management Systems",
        "E-commerce Solutions",
        "API Development and Integration",
        "Single Page Applications (SPAs)",
        "Real-time Web Applications",
        "Secure User Authentication Systems",
        "Payment Gateway Integration"
      ]}
      technologies={[
        {
          name: "Frontend Technologies",
          description: "React, Vue.js, Angular, Next.js, TypeScript, Tailwind CSS, HTML5/CSS3/JavaScript"
        },
        {
          name: "Backend Technologies",
          description: "Node.js, Django, Ruby on Rails, PHP/Laravel, ASP.NET, Express.js, NestJS"
        },
        {
          name: "Databases",
          description: "MongoDB, PostgreSQL, MySQL, Firebase, Redis, ElasticSearch, DynamoDB"
        },
        {
          name: "Cloud Services",
          description: "AWS, Google Cloud Platform, Microsoft Azure, Netlify, Vercel, Heroku"
        }
      ]}
      benefits={[
        "Increased online presence and user engagement",
        "Improved conversion rates through optimized user experience",
        "Reduced maintenance costs with clean, scalable code",
        "Faster time-to-market with agile development methodologies",
        "Enhanced security with best practices and regular updates",
        "Seamless integration with existing systems and third-party services"
      ]}
      caseStudies={[
        {
          title: "E-commerce Platform Redesign",
          description: "Rebuilt an outdated online store into a modern e-commerce platform, resulting in 45% increase in conversions.",
          image: "https://images.unsplash.com/photo-1561997968-aa846c2bf255?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "SaaS Dashboard Application",
          description: "Developed a complex analytics dashboard for a SaaS product with real-time data visualization.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Healthcare Patient Portal",
          description: "Created a secure, HIPAA-compliant patient portal for a healthcare provider with telemedicine features.",
          image: "https://images.unsplash.com/photo-1576091160550-2173dba999ef?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "How long does it typically take to build a custom web application?",
          answer: "The timeline varies based on complexity and scope, but most projects range from 8-12 weeks for an MVP (Minimum Viable Product) to 3-6 months for a full-featured application."
        },
        {
          question: "Do you provide ongoing maintenance and support?",
          answer: "Yes, we offer various maintenance and support packages to ensure your application remains secure, up-to-date, and continues to perform optimally after launch."
        },
        {
          question: "Can you help with SEO and making our web application discoverable?",
          answer: "Absolutely. We build applications with SEO best practices in mind and can implement specific SEO strategies tailored to your business goals and target audience."
        },
        {
          question: "What's your approach to web application security?",
          answer: "We implement industry-standard security measures including secure authentication, data encryption, regular security audits, and protection against common vulnerabilities like XSS and CSRF attacks."
        },
        {
          question: "Can you integrate my web application with existing systems or third-party services?",
          answer: "Yes, we specialize in API development and integration with CRM systems, payment processors, marketing tools, and various third-party services to create a cohesive ecosystem."
        }
      ]}
      relatedServices={[
        { title: "Mobile Development", href: "/services/mobile-development" },
        { title: "UI/UX Design", href: "/services/ui-ux-design" },
        { title: "API Development", href: "/services/api-development" }
      ]}
    />
  );
};

export default WebDevelopment; 