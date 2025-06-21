import React from 'react';
import { Server } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const DevOpsAutomation = () => {
  return (
    <ServiceDetailLayout
      title="DevOps Automation"
      subtitle="Streamlined Development & Operations"
      description="We help businesses implement DevOps practices and automation pipelines that streamline software development, testing, and deployment. Our DevOps automation solutions accelerate delivery cycles, improve code quality, and ensure reliable, consistent deployments across your infrastructure."
      iconBg="bg-gradient-to-br from-teal-500/20 to-emerald-600/20 border border-teal-500/30"
      icon={<Server size={28} className="text-teal-400" />}
      image="https://images.unsplash.com/photo-1607743386760-88ac62b89b8a?w=800&auto=format&fit=crop&q=60"
      features={[
        "CI/CD Pipeline Implementation",
        "Infrastructure as Code (IaC)",
        "Containerization & Orchestration",
        "Configuration Management",
        "Environment Automation & Standardization",
        "Monitoring & Observability",
        "Security Automation (DevSecOps)",
        "Automated Testing Integration",
        "Deployment Strategies & Rollbacks"
      ]}
      technologies={[
        {
          name: "CI/CD Tools",
          description: "Jenkins, GitHub Actions, GitLab CI/CD, CircleCI, Azure DevOps, ArgoCD"
        },
        {
          name: "Infrastructure as Code",
          description: "Terraform, AWS CloudFormation, Pulumi, Ansible, Chef, Puppet"
        },
        {
          name: "Containerization & Orchestration",
          description: "Docker, Kubernetes, Docker Compose, Helm, OpenShift, AWS ECS"
        },
        {
          name: "Monitoring & Observability",
          description: "Prometheus, Grafana, ELK Stack, Datadog, New Relic, Dynatrace, SigNoz"
        }
      ]}
      benefits={[
        "Faster time to market with automated delivery pipelines",
        "Improved code quality through standardized testing and validation",
        "Consistent environments from development to production",
        "Enhanced collaboration between development and operations teams",
        "Reduced deployment risks and easier rollbacks",
        "Comprehensive visibility into application performance and health"
      ]}
      caseStudies={[
        {
          title: "Deployment Pipeline Modernization",
          description: "Transformed a manual deployment process into a fully automated CI/CD pipeline, reducing deployment time from days to minutes.",
          image: "https://images.unsplash.com/photo-1546900703-cf06143d1239?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Infrastructure as Code Implementation",
          description: "Implemented Terraform to manage cloud infrastructure, enabling version-controlled, reproducible environments and reducing provisioning time by 80%.",
          image: "https://images.unsplash.com/photo-1541185934-01b600ea069c?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Kubernetes Migration & Automation",
          description: "Migrated a monolithic application to containerized microservices with Kubernetes orchestration, improving scalability and reliability.",
          image: "https://images.unsplash.com/photo-1667372393119-3d4c48d07fc9?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "How can DevOps automation benefit my development team?",
          answer: "DevOps automation reduces manual tasks, standardizes processes, accelerates development cycles, improves code quality, enables faster feedback loops, and allows your team to focus on creating value rather than managing infrastructure."
        },
        {
          question: "How long does it take to implement a CI/CD pipeline?",
          answer: "A basic pipeline can be implemented in 2-4 weeks, while a comprehensive solution with extensive automation and integration may take 2-3 months, depending on your current infrastructure and requirements."
        },
        {
          question: "Can DevOps automation work with our existing tools and workflow?",
          answer: "Yes, we design DevOps solutions that integrate with your existing tools and workflows, gradually transforming them rather than requiring disruptive changes all at once."
        },
        {
          question: "How do you ensure security in automated deployments?",
          answer: "We implement DevSecOps practices, including automated security scanning, policy enforcement, secrets management, compliance validation, and secure configuration management throughout the CI/CD pipeline."
        },
        {
          question: "What metrics should we track to measure DevOps effectiveness?",
          answer: "Key metrics include deployment frequency, lead time for changes, change failure rate, mean time to recovery, and system availability. We help establish dashboards to monitor these metrics and drive continuous improvement."
        }
      ]}
      relatedServices={[
        { title: "Cloud Integration", href: "/services/cloud-integration" },
        { title: "Performance Optimization", href: "/services/performance-optimization" },
        { title: "AI & ML Solutions", href: "/services/ai-ml-solutions" }
      ]}
    />
  );
};

export default DevOpsAutomation; 