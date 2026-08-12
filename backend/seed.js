const mongoose = require('mongoose');
require('dotenv').config();

const Project = require('./models/Project');
const Skill = require('./models/Skill');
const Timeline = require('./models/Timeline');
const Certification = require('./models/Certification');
const Profile = require('./models/Profile');
const User = require('./models/User');

const MONGO_URI = process.env.MONGO_URI || 'mongodb://localhost:27017/portfolio';

const projects = [
  {
    title: 'CI/CD Pipeline for a Spring Boot Application',
    desc: '• Built an end-to-end Jenkins pipeline that pulls code from GitHub, builds and tests it, packages it into a Docker image, and deploys it to an EC2 instance.\n• Used a multi-stage Dockerfile and webhook-triggered builds so every push to main deploys automatically, eliminating manual release steps.',
    tags: ['Jenkins', 'Docker', 'GitHub', 'AWS EC2', 'Spring Boot', 'CI/CD'],
    category: 'web',
    icon: '🚀',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Infrastructure as Code on AWS',
    desc: '• Wrote modular Terraform configurations to provision a VPC, EC2 instances, S3 buckets, and IAM roles/policies from code instead of the console.\n• Used remote state and variables to make the setup repeatable across environments, and destroyed/re-created the stack to validate idempotency.',
    tags: ['Terraform', 'AWS (VPC, EC2, S3, IAM)', 'Infrastructure as Code'],
    category: 'web',
    icon: '🏗️',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Automated Server Configuration',
    desc: '• Wrote Ansible playbooks and roles to configure EC2 instances automatically — installing Docker, Nginx, and monitoring agents in place of manual setup.\n• Used Python scripts alongside Ansible for pre-flight checks (connectivity, disk space) and to parse/report playbook run results.',
    tags: ['Ansible', 'Python', 'AWS EC2', 'Nginx', 'Automation'],
    category: 'web',
    icon: '🤖',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Containerized Microservices on Kubernetes',
    desc: '• Dockerized a set of Java and Node.js services and deployed them to a local Kubernetes cluster (Deployments, Services, ConfigMaps).\n• Practiced rolling updates, scaling, and pod-level troubleshooting to build hands-on Kubernetes operations experience with zero downtime deploys.',
    tags: ['Docker', 'Kubernetes (Minikube)', 'kubectl', 'GCP', 'Microservices'],
    category: 'web',
    icon: '☸️',
    demoLink: '#',
    codeLink: '#'
  }
];

const skills = [
  // Cloud & Databases
  { name: 'AWS Cloud (EC2, S3, IAM, VPC, CloudWatch, Lambda, RDS)', category: 'frontend', level: 92, icon: '☁️' },
  { name: 'Amazon EC2 & S3', category: 'frontend', level: 92, icon: '☁️' },
  { name: 'AWS IAM, VPC & CloudWatch', category: 'frontend', level: 90, icon: '🛡️' },
  { name: 'AWS Lambda & RDS', category: 'frontend', level: 85, icon: '⚡' },
  { name: 'Prometheus & Grafana (Monitoring)', category: 'frontend', level: 82, icon: '📈' },
  { name: 'SQL & MySQL Databases', category: 'frontend', level: 88, icon: '📊' },

  // DevOps & Automation
  { name: 'Docker Containers', category: 'backend', level: 92, icon: '🐳' },
  { name: 'Kubernetes Orchestration (kubectl / Minikube)', category: 'backend', level: 88, icon: '☸️' },
  { name: 'Terraform Infrastructure-as-Code', category: 'backend', level: 90, icon: '🛠️' },
  { name: 'Ansible Automation', category: 'backend', level: 85, icon: '🤖' },
  { name: 'Jenkins & GitHub Actions CI/CD', category: 'backend', level: 90, icon: '🚀' },
  { name: 'Google Cloud Platform (GCP)', category: 'backend', level: 80, icon: '🌐' },

  // Programming & Tools
  { name: 'Python & Bash Scripting', category: 'tools', level: 88, icon: '🐍' },
  { name: 'Java & JavaScript', category: 'tools', level: 90, icon: '☕' },
  { name: 'Linux OS (Ubuntu CLI)', category: 'tools', level: 90, icon: '🐧' },
  { name: 'Git & GitHub Version Control', category: 'tools', level: 92, icon: '🐙' },
  { name: 'VS Code & Postman', category: 'tools', level: 90, icon: '💻' }
];

const timeline = [
  {
    year: 'Jan 2025 – Present',
    title: 'DevOps Engineer',
    subtitle: 'Speedotrack GPS Pvt. Ltd., Ranchi',
    description: '• Managed build, release, and deployment workflows for a real-time GPS tracking platform, using Git for version control and coordinating rollouts across multiple client environments.\n• Deployed and maintained a School Management System (Edusoft) across several client environments, handling environment configuration, release scheduling, and post-deployment checks.\n• Partnered directly with clients to gather infrastructure and release requirements, translating them into deployment plans and configuration changes.\n• Owned the release lifecycle end-to-end — build, test, deploy, and monitor — across parallel production environments, reducing manual release effort.',
    order: 1
  },
  {
    year: 'Aug 2023 – Dec 2024',
    title: 'Java Full Stack Development Training',
    subtitle: 'JSpiders Academy',
    description: 'Underwent intensive developer specialization. Mastered Core Java, Spring Boot microservices, SQL databases, database integrations, and essential modern web markup and styling technologies.',
    order: 2
  },
  {
    year: '2019 – 2023',
    title: 'B.Tech in Computer Science',
    subtitle: 'Jai Narain College of Technology, Bhopal',
    description: 'Acquired core computing knowledge, scoring a CGPA of 7.93. Specialized in engineering mathematics, data structures, algorithms, operating systems, and object-oriented architectures.',
    order: 3
  }
];

const certifications = [
  {
    title: 'AWS Certified Cloud Practitioner (CLF-C02)',
    issuer: 'AWS',
    icon: '☁️',
    url: 'https://ude.my/UC-01ff7934-4c2c-4dcb-9be4-1376a0cd846d',
    credentialId: 'CLF-C02'
  },
  {
    title: 'AWS Certified AI Practitioner (AIF-C01)',
    issuer: 'AWS',
    icon: '🤖',
    url: 'https://ude.my/UC-7a86ce50-2ec3-492c-a475-266dde27eb11',
    credentialId: 'AIF-C01'
  },
  {
    title: 'Master DevOps with AWS, Docker, Kubernetes, GCP, GitHub Actions, ArgoCD, GitOps, Terraform & Monitoring',
    issuer: 'Udemy',
    icon: '🚀',
    url: '#'
  },
  {
    title: 'Core Java',
    issuer: 'Coursera / JSpiders',
    icon: '☕',
    url: 'https://www.coursera.org/account/accomplishments/specialization/CQH492ZVGC3C',
    credentialId: 'CQH492ZVGC3C'
  },
  {
    title: 'SQL',
    issuer: 'Coursera / JSpiders',
    icon: '📊',
    url: 'https://www.coursera.org/account/accomplishments/verify/R45HQU44DEC3',
    credentialId: 'R45HQU44DEC3'
  }
];

const profileData = {
  name: 'RAHUL ANAND',
  title: 'DevOps Engineer | AWS Cloud & Automation',
  subTitle: 'AWS-certified DevOps & Cloud Engineer with 1+ years of experience automating deployments, managing CI/CD release pipelines, and provisioning cloud infrastructure for production systems.',
  aboutBio: 'AWS-certified DevOps & Cloud Engineer with 1+ years of experience automating deployments, managing CI/CD release pipelines, and provisioning cloud infrastructure for production systems. Hands-on with Docker, Kubernetes, Terraform, Ansible, Jenkins, AWS, and GCP, having built and operated end-to-end infrastructure-automation and CI/CD projects. Focused on reliability, automation, and streamlined cloud operations.',
  email: 'anaashutosh888@gmail.com',
  linkedinUrl: 'https://linkedin.com/in/rahul-anand-22a546218',
  githubUrl: 'https://github.com/Anand25rahul',
  profilePhoto: '/profile.jpg',
  cvPdf: '/RAHUL_ANAND_CV.pdf'
};

const userData = {
  username: 'anand',
  password: '123456'
};

async function seed() {
  try {
    await mongoose.connect(MONGO_URI);
    console.log('✅ Connected to MongoDB');

    // Clear existing data
    await Project.deleteMany({});
    await Skill.deleteMany({});
    await Timeline.deleteMany({});
    await Certification.deleteMany({});
    await Profile.deleteMany({});
    try {
      await User.collection.drop();
    } catch (err) {
      // Collection might not exist yet, ignore
    }
    console.log('🗑️  Cleared existing data');

    // Insert seed data
    await Project.insertMany(projects);
    console.log(`📁 Seeded ${projects.length} projects`);

    await Skill.insertMany(skills);
    console.log(`⚙️  Seeded ${skills.length} skills`);

    await Timeline.insertMany(timeline);
    console.log(`📅 Seeded ${timeline.length} timeline entries`);

    await Certification.insertMany(certifications);
    console.log(`📜 Seeded ${certifications.length} certifications`);

    await Profile.create(profileData);
    console.log(`👤 Seeded profile settings`);

    await User.create(userData);
    console.log(`👤 Seeded default admin user`);

    console.log('\n🎉 Database seeded successfully!');
    process.exit(0);
  } catch (err) {
    console.error('❌ Seed failed:', err.message);
    process.exit(1);
  }
}

seed();
