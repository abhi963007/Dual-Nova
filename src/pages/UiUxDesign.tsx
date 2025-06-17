import React from 'react';
import { Palette } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const UiUxDesign = () => {
  return (
    <ServiceDetailLayout
      title="UI/UX Design"
      subtitle="Beautiful & Intuitive User Experiences"
      description="We create visually stunning and highly functional user interfaces that connect with your audience and drive engagement. Our UX-focused design approach ensures intuitive experiences that solve real problems and meet user needs while aligning with your business goals."
      iconBg="bg-gradient-to-br from-pink-500/20 to-rose-600/20 border border-pink-500/30"
      icon={<Palette size={28} className="text-pink-400" />}
      image="https://images.unsplash.com/photo-1561070791-2526d30994b5?w=800&auto=format&fit=crop&q=60"
      features={[
        "User Research & Personas",
        "Wireframing & Prototyping",
        "Visual Design & Branding",
        "Interaction Design",
        "Usability Testing",
        "Information Architecture",
        "Responsive & Mobile Design",
        "Design Systems & Components",
        "Accessibility Compliance (WCAG)",
        "Animation & Motion Design"
      ]}
      technologies={[
        {
          name: "Design Tools",
          description: "Figma, Adobe XD, Sketch, Photoshop, Illustrator, InVision, Marvel, Framer"
        },
        {
          name: "Prototyping",
          description: "Figma Prototyping, Principle, ProtoPie, Adobe XD, InVision Studio"
        },
        {
          name: "UI Libraries & Frameworks",
          description: "Material Design, iOS Human Interface Guidelines, Tailwind CSS, Bootstrap"
        },
        {
          name: "Research & Testing",
          description: "UserTesting, Hotjar, Optimal Workshop, Lookback, Maze"
        }
      ]}
      benefits={[
        "Increased user engagement and satisfaction",
        "Improved conversion rates and reduced bounce rates",
        "Stronger brand identity and recognition",
        "Reduced development costs through proper planning",
        "More efficient user workflows and task completion",
        "Competitive advantage through superior user experience",
        "Universal accessibility and inclusion for all users",
        "Consistent look and feel across platforms"
      ]}
      caseStudies={[
        {
          title: "Financial Dashboard Redesign",
          description: "Reimagined a complex financial platform, resulting in 60% improvement in task completion rates and 40% reduction in support requests.",
          image: "https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "E-commerce Mobile Experience",
          description: "Designed an intuitive shopping experience for a fashion retailer, increasing mobile conversion rates by 35%.",
          image: "https://images.unsplash.com/photo-1552374196-1ab2a1c593e8?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Healthcare Patient Portal",
          description: "Created an accessible, user-friendly healthcare portal that improved patient engagement and satisfaction scores.",
          image: "https://images.unsplash.com/photo-1576091160399-112ba8d25d1d?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "What's the difference between UI and UX design?",
          answer: "UI (User Interface) design focuses on the visual elements users interact with—like buttons, icons, and layout. UX (User Experience) design addresses the entire user journey, including research, wireframing, and testing. We combine both to create interfaces that are both beautiful and functional."
        },
        {
          question: "How do you approach the design process?",
          answer: "We follow a user-centered design process that begins with research to understand your users, business goals, and industry context. We then move through wireframing, prototyping, visual design, and usability testing in an iterative approach, refining designs based on feedback."
        },
        {
          question: "Do you create design systems?",
          answer: "Yes, we create comprehensive design systems with reusable components and clear guidelines that ensure consistency across your digital products and make future development more efficient. This includes typography, color schemes, spacing rules, and component libraries."
        },
        {
          question: "How do you ensure designs are accessible?",
          answer: "We design with accessibility in mind from the beginning, following WCAG guidelines for color contrast, text size, navigation, and screen reader compatibility. We also conduct accessibility audits to ensure all users, including those with disabilities, can use your product effectively."
        },
        {
          question: "Can you work with our development team?",
          answer: "Absolutely. We collaborate closely with development teams to ensure designs are implemented accurately. We provide detailed specifications, assets, and documentation, and can assist during the development phase to address any design-related questions."
        }
      ]}
      relatedServices={[
        { title: "Web Development", href: "/services/web-development" },
        { title: "Mobile Development", href: "/services/mobile-development" },
        { title: "Performance Optimization", href: "/services/performance-optimization" }
      ]}
    />
  );
};

export default UiUxDesign; 