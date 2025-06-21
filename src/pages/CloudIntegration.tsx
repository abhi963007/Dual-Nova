import React from 'react';
import { Cloud } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const CloudIntegration = () => {
  return (
    <ServiceDetailLayout
      title="Cloud Integration"
      subtitle="Seamless Cloud Solutions & Integration"
      description="We help businesses harness the power of cloud computing through seamless integration with leading cloud providers. Our cloud integration services enable scalability, reliability, and cost-effectiveness, allowing your organization to focus on innovation rather than infrastructure management."
      iconBg="bg-gradient-to-br from-indigo-500/20 to-sky-600/20 border border-indigo-500/30"
      icon={<Cloud size={28} className="text-indigo-400" />}
      image="https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=800&auto=format&fit=crop&q=60"
      features={[
        "Multi-Cloud Strategy Implementation",
        "Cloud Migration & Modernization",
        "Hybrid Cloud Architecture",
        "Cloud-Native Application Development",
        "Serverless Computing Solutions",
        "Infrastructure as Code (IaC)",
        "Cloud Security & Compliance",
        "Disaster Recovery & Business Continuity",
        "Cost Optimization & Management"
      ]}
      technologies={[
        {
          name: "Cloud Platforms",
          description: "AWS, Microsoft Azure, Google Cloud Platform, IBM Cloud, Oracle Cloud, DigitalOcean"
        },
        {
          name: "Containerization & Orchestration",
          description: "Docker, Kubernetes, AWS ECS, Azure Container Instances, Google Kubernetes Engine"
        },
        {
          name: "Infrastructure as Code",
          description: "Terraform, AWS CloudFormation, Azure Resource Manager, Pulumi, Ansible"
        },
        {
          name: "Serverless Technologies",
          description: "AWS Lambda, Azure Functions, Google Cloud Functions, Cloudflare Workers, Vercel"
        }
      ]}
      benefits={[
        "Increased business agility and faster time to market",
        "Improved scalability to handle varying workloads efficiently",
        "Significant cost reduction through optimized resource utilization",
        "Enhanced reliability and uptime for critical applications",
        "Better disaster recovery capabilities and business continuity",
        "Simplified management and maintenance of infrastructure"
      ]}
      caseStudies={[
        {
          title: "E-commerce Platform Cloud Migration",
          description: "Migrated a legacy e-commerce system to a cloud-native architecture, reducing infrastructure costs by 40% and improving performance.",
          image: "https://images.unsplash.com/photo-1535868463750-c78d9543614f?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Hybrid Cloud Solution for Finance",
          description: "Designed and implemented a secure hybrid cloud architecture for a financial services firm, ensuring compliance while leveraging cloud benefits.",
          image: "https://images.unsplash.com/photo-1558494949-ef010cbdcc31?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Serverless Media Processing Pipeline",
          description: "Built a scalable, event-driven media processing system using serverless technologies for a digital content provider.",
          image: "https://images.unsplash.com/photo-1451187580459-43490279c0fa?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "How can cloud integration benefit my business?",
          answer: "Cloud integration enables cost savings, improved scalability, enhanced operational efficiency, better disaster recovery, and faster innovation by leveraging best-in-class cloud services rather than managing hardware."
        },
        {
          question: "Is my data secure in the cloud?",
          answer: "Yes, we implement comprehensive security measures including encryption, access controls, network security, and compliance with industry regulations to ensure your data remains secure in cloud environments."
        },
        {
          question: "How long does a typical cloud migration take?",
          answer: "The timeline varies based on complexity, but most migrations range from 2-3 months for simpler applications to 6-12 months for large, complex enterprise systems with multiple dependencies."
        },
        {
          question: "Do you support multi-cloud or hybrid cloud strategies?",
          answer: "Absolutely. We help businesses implement multi-cloud and hybrid cloud strategies that leverage the strengths of different providers while avoiding vendor lock-in and optimizing for cost and performance."
        },
        {
          question: "How do you handle cloud cost optimization?",
          answer: "We implement continuous cost monitoring, right-sizing of resources, reserved instance planning, autoscaling configurations, and serverless architectures to optimize cloud spending."
        }
      ]}
      relatedServices={[
        { title: "DevOps Automation", href: "/services/devops-automation" },
        { title: "Performance Optimization", href: "/services/performance-optimization" },
        { title: "Full-Stack Solutions", href: "/services/full-stack-solutions" }
      ]}
    />
  );
};

export default CloudIntegration; 