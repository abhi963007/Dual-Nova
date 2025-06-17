import React from 'react';
import { Smartphone } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const MobileDevelopment = () => {
  return (
    <ServiceDetailLayout
      title="Mobile Development"
      subtitle="Native & Cross-Platform Mobile Solutions"
      description="We build powerful, feature-rich mobile applications for iOS and Android that deliver exceptional user experiences. Whether you need a native application with platform-specific optimizations or a cross-platform solution to reach users across multiple devices, our expert team creates mobile apps that drive engagement and business growth."
      iconBg="bg-gradient-to-br from-purple-500/20 to-purple-600/20 border border-purple-500/30"
      icon={<Smartphone size={28} className="text-purple-400" />}
      image="https://images.unsplash.com/photo-1596558450268-9c27524ba856?w=800&auto=format&fit=crop&q=60"
      features={[
        "Native iOS Development (Swift/Objective-C)",
        "Native Android Development (Kotlin/Java)",
        "Cross-Platform Development (React Native, Flutter)",
        "Mobile UI/UX Design",
        "App Store Optimization (ASO)",
        "Push Notification Systems",
        "Offline Functionality",
        "Mobile Payment Integration",
        "Location-Based Services",
        "AR/VR Mobile Features"
      ]}
      technologies={[
        {
          name: "Native iOS",
          description: "Swift, Objective-C, SwiftUI, UIKit, Core Data, TestFlight"
        },
        {
          name: "Native Android",
          description: "Kotlin, Java, Jetpack Compose, Android SDK, Room, Dagger"
        },
        {
          name: "Cross-Platform",
          description: "React Native, Flutter, Expo, Capacitor, Ionic"
        },
        {
          name: "Backend & APIs",
          description: "Firebase, AWS Amplify, GraphQL, REST APIs, WebSockets for real-time features"
        }
      ]}
      benefits={[
        "Reach users on their preferred mobile platforms",
        "Deliver consistent brand experiences across devices",
        "Access device-native features for enhanced functionality",
        "Improved user engagement with push notifications",
        "Generate additional revenue through in-app purchases",
        "Collect valuable user data for business insights",
        "Build customer loyalty through personalized mobile experiences"
      ]}
      caseStudies={[
        {
          title: "Fitness Tracking App",
          description: "Developed a cross-platform fitness app with workout tracking, social features, and health metrics integration.",
          image: "https://images.unsplash.com/photo-1510861320402-285a6c7639ea?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Restaurant Ordering System",
          description: "Built a native mobile ordering system for a restaurant chain with loyalty program and real-time order tracking.",
          image: "https://images.unsplash.com/photo-1428515613728-6b4607e44363?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "AR Shopping Experience",
          description: "Created an innovative shopping app with AR capabilities allowing users to visualize products in their home.",
          image: "https://images.unsplash.com/photo-1633536726481-9b95d93e6dd4?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "Should I build a native or cross-platform mobile app?",
          answer: "This depends on your requirements. Native apps offer the best performance and access to platform-specific features, while cross-platform solutions are more cost-effective and faster to market. We'll help you determine the best approach based on your business goals."
        },
        {
          question: "How long does it take to develop a mobile app?",
          answer: "Development timelines vary based on complexity, but typical projects range from 3-4 months for an MVP to 6-8 months for a feature-rich application with backend integration."
        },
        {
          question: "Do you handle app store submissions?",
          answer: "Yes, we manage the entire process of submitting your app to the Apple App Store and Google Play Store, including preparing all necessary materials and addressing any review requirements."
        },
        {
          question: "How do you approach mobile app testing?",
          answer: "We implement comprehensive testing including functional testing, UI/UX testing, performance testing, and security testing across multiple devices and OS versions to ensure quality and stability."
        },
        {
          question: "Can you update my existing mobile app?",
          answer: "Yes, we can take over development of existing applications, add new features, improve performance, and modernize the UI/UX while maintaining compatibility with your existing user base."
        }
      ]}
      relatedServices={[
        { title: "Web Development", href: "/services/web-development" },
        { title: "UI/UX Design", href: "/services/ui-ux-design" },
        { title: "Full-Stack Solutions", href: "/services/full-stack-solutions" }
      ]}
    />
  );
};

export default MobileDevelopment; 