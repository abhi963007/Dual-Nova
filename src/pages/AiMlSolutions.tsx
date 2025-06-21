import React from 'react';
import { Cpu } from 'lucide-react';
import { ServiceDetailLayout } from '../components/ServiceDetailLayout';

const AiMlSolutions = () => {
  return (
    <ServiceDetailLayout
      title="AI & ML Solutions"
      subtitle="Intelligent Data-Driven Applications"
      description="We help businesses leverage the power of artificial intelligence and machine learning to extract valuable insights from data, automate processes, and create intelligent features that enhance user experience. Our AI & ML solutions are designed to solve real business problems and drive innovation across your organization."
      iconBg="bg-gradient-to-br from-fuchsia-500/20 to-pink-600/20 border border-fuchsia-500/30"
      icon={<Cpu size={28} className="text-fuchsia-400" />}
      image="https://images.unsplash.com/photo-1555255707-c07966088b7b?w=800&auto=format&fit=crop&q=60"
      features={[
        "Predictive Analytics & Forecasting",
        "Natural Language Processing (NLP)",
        "Computer Vision Solutions",
        "Recommendation Systems",
        "Anomaly Detection & Fraud Prevention",
        "Sentiment Analysis & Opinion Mining",
        "Intelligent Process Automation",
        "Machine Learning Operations (MLOps)",
        "AI-powered Business Intelligence"
      ]}
      technologies={[
        {
          name: "Machine Learning Frameworks",
          description: "TensorFlow, PyTorch, Scikit-learn, Keras, XGBoost, LightGBM, Fast.ai"
        },
        {
          name: "Data Processing & Analytics",
          description: "Pandas, NumPy, Spark, Dask, Apache Beam, Databricks"
        },
        {
          name: "Big Data Technologies",
          description: "Hadoop, Kafka, Elasticsearch, Snowflake, BigQuery, Redshift"
        },
        {
          name: "AI/ML Cloud Services",
          description: "AWS SageMaker, Google AI Platform, Azure ML, OpenAI API, Hugging Face"
        }
      ]}
      benefits={[
        "Enhanced decision-making through data-driven insights",
        "Increased operational efficiency and cost reduction",
        "Improved customer experience with personalized interactions",
        "Early detection of business anomalies and potential issues",
        "Competitive advantage through intelligent automation",
        "Unlocked value from previously underutilized data assets"
      ]}
      caseStudies={[
        {
          title: "Predictive Maintenance System",
          description: "Developed an ML system for a manufacturing client that predicts equipment failures before they occur, reducing downtime by 35%.",
          image: "https://images.unsplash.com/photo-1581092335878-2d9ff86ca2bf?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Customer Sentiment Analysis Platform",
          description: "Created an NLP-powered platform that analyzes customer feedback across multiple channels for a retail brand, improving satisfaction scores.",
          image: "https://images.unsplash.com/photo-1553877522-43269d4ea984?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        },
        {
          title: "Intelligent Product Recommendation Engine",
          description: "Built a personalized recommendation system for an e-commerce platform, increasing average order value by 28%.",
          image: "https://images.unsplash.com/photo-1567359781514-3b964e2b04d6?w=500&auto=format&fit=crop&q=60",
          link: "/projects"
        }
      ]}
      faq={[
        {
          question: "How can AI & ML benefit my specific business?",
          answer: "AI & ML can improve operations through automation, enhance customer experiences with personalization, uncover insights from your data, optimize resource allocation, detect anomalies, and create new product features that differentiate your business."
        },
        {
          question: "Do we need massive amounts of data to implement AI solutions?",
          answer: "Not necessarily. While more quality data generally leads to better models, we can implement effective solutions with limited data using techniques like transfer learning, data augmentation, and by leveraging pre-trained models."
        },
        {
          question: "How long does it take to develop and deploy an AI/ML solution?",
          answer: "Timelines vary based on complexity and scope, but typical projects range from 3-4 months for initial deployment, with continuous improvement over time as more data becomes available."
        },
        {
          question: "How do you ensure AI models are explainable and trustworthy?",
          answer: "We implement explainable AI techniques, rigorous testing for bias, performance monitoring, and transparent documentation to ensure models are understandable, fair, and trustworthy."
        },
        {
          question: "What's your approach to maintaining and updating ML models?",
          answer: "We establish MLOps practices for continuous monitoring, automated retraining schedules, performance evaluation, version control, and seamless deployment to ensure models remain accurate and effective over time."
        }
      ]}
      relatedServices={[
        { title: "Data Science & Analytics", href: "/services/data-science" },
        { title: "Cloud Integration", href: "/services/cloud-integration" },
        { title: "Big Data Solutions", href: "/services/big-data" }
      ]}
    />
  );
};

export default AiMlSolutions; 