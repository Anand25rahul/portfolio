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
    title: 'GPS Tracking System',
    desc: '• Implemented live location tracking using GPS modules and integrated map visualization.\n• Enabled route history and location updates for better monitoring and analysis.\n• Focused on accuracy, real-time updates, and system reliability.',
    tags: ['GPS Modules', 'Map API Integration', 'Real-time Tracking', 'Location History'],
    category: 'web',
    icon: '🗺️',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'School Management System',
    desc: '• Designed modules for student registration, attendance, exams, fees, and results.\n• Implemented role-based access for Admin, Teachers, and Students.\n• Reduced manual work by digitizing daily school operations.',
    tags: ['Java', 'React.js', 'Role Access Control', 'Administrative Automation', 'SQL Database'],
    category: 'web',
    icon: '🏫',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Yatra Bus Reservation Portal',
    desc: '• Designed and developed a full-stack bus booking dashboard with role validations (Admins & Passengers).\n• Integrated dynamic multi-language translations across 8 Indian languages and custom light/dark theme variables.\n• Enabled ticket booking schedules, seat reservation matrix layouts, and dynamic ticket downloads.',
    tags: ['React.js', 'Express.js', 'MongoDB', 'i18next', 'Theme Toggle'],
    category: 'web',
    icon: '🚌',
    demoLink: '#',
    codeLink: '#'
  },
  {
    title: 'Developer Portfolio Website',
    desc: '• Designed and developed a premium glassmorphic single-page developer portfolio with responsive page graphics.\n• Integrated multi-language dictionaries (English/Hindi) and customized theme selectors (Dark/Light).\n• Connected with Express & MongoDB backend to serve CRUD API endpoints for dynamic projects, skills, timeline, and certifications loading.',
    tags: ['React.js', 'Vite', 'Express.js', 'MongoDB', 'Glassmorphism'],
    category: 'web',
    icon: '💻',
    demoLink: '#',
    codeLink: '#'
  }
];

const skills = [
  // Cloud & Databases
  { name: 'Amazon EC2 & S3', category: 'frontend', level: 90, icon: '☁️' },
  { name: 'AWS IAM & VPC Networks', category: 'frontend', level: 85, icon: '🛡️' },
  { name: 'AWS Lambda & RDS', category: 'frontend', level: 80, icon: '⚡' },
  { name: 'SQL & MySQL Databases', category: 'frontend', level: 88, icon: '📊' },
  { name: 'Google Cloud Platform (GCP)', category: 'frontend', level: 75, icon: '🌐' },
  
  // DevOps & Automation
  { name: 'Docker Containers', category: 'backend', level: 92, icon: '🐳' },
  { name: 'Kubernetes Orchestration', category: 'backend', level: 85, icon: '☸️' },
  { name: 'Terraform Infrastructure-as-Code', category: 'backend', level: 88, icon: '🛠️' },
  { name: 'Ansible Automation', category: 'backend', level: 80, icon: '🤖' },
  { name: 'Jenkins CI/CD Pipelines', category: 'backend', level: 85, icon: '🚀' },
  
  // Programming & Tools
  { name: 'Core Java & Spring Boot', category: 'tools', level: 90, icon: '☕' },
  { name: 'JavaScript & React.js', category: 'tools', level: 88, icon: '⚛️' },
  { name: 'Linux OS (Ubuntu CLI)', category: 'tools', level: 85, icon: '🐧' },
  { name: 'Git & GitHub Version Control', category: 'tools', level: 92, icon: '🐙' },
  { name: 'VS Code & Eclipse IDEs', category: 'tools', level: 90, icon: '💻' }
];

const timeline = [
  {
    year: 'Jan 2025 - Present',
    title: 'Software Developer',
    subtitle: 'Speedotrack GPS Pvt. Ltd., Ranchi',
    description: 'Designing and coding live GPS-based vehicle/user tracking interfaces. Building scalable School Administration Modules, working with corporate clients to compile requirements, and conducting system deployments.',
    order: 1
  },
  {
    year: 'Aug 2023 - Dec 2024',
    title: 'Java Full Stack Development Training',
    subtitle: 'JSpiders Academy',
    description: 'Underwent intensive developer specialization. Mastered Core Java, Spring Boot microservices, SQL databases, database integrations, and essential modern web markup and styling technologies.',
    order: 2
  },
  {
    year: '2019 - 2023',
    title: 'B.Tech in Computer Science',
    subtitle: 'Jai Narain College of Technology, Bhopal',
    description: 'Acquired core computing knowledge, scoring a CGPA of 7.93. Specialized in engineering mathematics, data structures, algorithms, operating systems, and object-oriented architectures.',
    order: 3
  }
];

const certifications = [
  {
    title: '[NEW] Ultimate AWS Certified Cloud Practitioner CLF-C02 2026',
    issuer: 'Udemy',
    icon: '☁️',
    url: 'https://ude.my/UC-01ff7934-4c2c-4dcb-9be4-1376a0cd846d',
    credentialId: 'UC-01ff7934-4c2c-4dcb-9be4-1376a0cd846d'
  },
  {
    title: '[NEW] Ultimate AWS Certified AI Practitioner AIF-C01',
    issuer: 'Udemy',
    icon: '🤖',
    url: 'https://ude.my/UC-7a86ce50-2ec3-492c-a475-266dde27eb11',
    credentialId: 'UC-7a86ce50-2ec3-492c-a475-266dde27eb11'
  },
  {
    title: 'Master DevOps with AWS, Docker, Kubernetes, GCP, GitHub Actions, ArgoCD, GitOps, Terraform, Monitoring & AI',
    issuer: 'Udemy',
    icon: '🚀',
    url: '#'
  },
  {
    title: 'Core Java',
    issuer: 'Coursera',
    icon: '☕',
    url: 'https://www.coursera.org/account/accomplishments/specialization/CQH492ZVGC3C',
    credentialId: 'CQH492ZVGC3C'
  },
  {
    title: 'SQL',
    issuer: 'Coursera',
    icon: '📊',
    url: 'https://www.coursera.org/account/accomplishments/verify/R45HQU44DEC3',
    credentialId: 'R45HQU44DEC3'
  }
];

const profileData = {
  name: 'RAHUL ANAND',
  title: 'Software Developer | DevOps & AWS Cloud Engineer',
  subTitle: 'Software Developer with 1+ years of experience in Java and React.js, actively seeking a DevOps & AWS Cloud Engineer role.',
  aboutBio: 'Software Developer with 1+ years of experience in Java and React.js, actively seeking a DevOps & AWS Cloud Engineer role. AWS-certified (CLF-C02 & AIF-C01) with hands-on exposure to Docker, Kubernetes, Terraform, Ansible, Jenkins, Linux, and Git — ready to drive cloud automation and CI/CD pipelines.',
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
