import { Employee, SkillGap, Recommendation, AlertNotification, ReportItem, User } from '../types';

export const mockCurrentUser: User = {
  id: 'usr-001',
  name: 'Sarah Jenkins',
  email: 's.jenkins@techcorp.com',
  role: 'HR Admin',
  avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
  department: 'People Operations'
};

export const demoUsers: User[] = [
  {
    id: 'usr-001',
    name: 'Sarah Jenkins (HR Admin)',
    email: 's.jenkins@techcorp.com',
    role: 'HR Admin',
    avatar: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80',
    department: 'People Operations'
  },
  {
    id: 'usr-002',
    name: 'Marcus Vance (Dept Manager)',
    email: 'm.vance@techcorp.com',
    role: 'Department Manager',
    avatar: 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80',
    department: 'Engineering'
  },
  {
    id: 'usr-003',
    name: 'Elena Rostova (Team Lead)',
    email: 'e.rostova@techcorp.com',
    role: 'Team Lead',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    department: 'AI & Data Science'
  },
  {
    id: 'usr-004',
    name: 'Alex Rivera (Employee)',
    email: 'a.rivera@techcorp.com',
    role: 'Employee',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    department: 'Cloud Infrastructure'
  }
];

export const mockEmployees: Employee[] = [
  {
    id: 'emp-101',
    name: 'Alex Rivera',
    email: 'a.rivera@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80',
    role: 'Senior Cloud Architect',
    department: 'Cloud Infrastructure',
    location: 'Austin, TX (Remote)',
    tenureMonths: 42,
    overallRiskScore: 88,
    riskLevel: 'Critical',
    flightRisk: 84,
    skillShortageRisk: 92,
    burnoutIndex: 78,
    assignedManager: 'Marcus Vance',
    joinDate: '2022-02-15',
    performanceRating: 4.8,
    projectsActive: 5,
    suggestedAction: 'Immediate 1-on-1 retention interview & project load reduction',
    skills: [
      { id: 'sk-1', name: 'Kubernetes Orchestration', category: 'Cloud & DevOps', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-06-10', verified: true },
      { id: 'sk-2', name: 'AWS Cloud Architecture', category: 'Cloud & DevOps', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-05-18', verified: true },
      { id: 'sk-3', name: 'Terraform IaC', category: 'Cloud & DevOps', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-04-20', verified: true },
      { id: 'sk-4', name: 'Go Microservices', category: 'Backend', currentLevel: 2, requiredLevel: 4, lastAssessed: '2026-03-01', verified: false },
      { id: 'sk-5', name: 'Team Mentorship', category: 'Soft Skills & Leadership', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-01-15', verified: true }
    ],
    riskFactors: [
      { category: 'Burnout', score: 85, impact: 'Critical', description: 'Over-allocated across 5 mission-critical production clusters for 6 consecutive months' },
      { category: 'Skill Gap', score: 72, impact: 'High', description: 'Deficient in new internal Go backend framework standard' },
      { category: 'Market Demand', score: 95, impact: 'Critical', description: 'High external recruiter outreach rate for Cloud Architect titles' },
      { category: 'Project Isolation', score: 65, impact: 'Medium', description: 'Sole subject matter expert for multi-region Kubernetes deployments' }
    ]
  },
  {
    id: 'emp-102',
    name: 'Priya Sharma',
    email: 'p.sharma@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80',
    role: 'Lead AI Engineer',
    department: 'AI & Data Science',
    location: 'San Francisco, CA',
    tenureMonths: 28,
    overallRiskScore: 76,
    riskLevel: 'High',
    flightRisk: 72,
    skillShortageRisk: 80,
    burnoutIndex: 68,
    assignedManager: 'Elena Rostova',
    joinDate: '2023-04-01',
    performanceRating: 4.9,
    projectsActive: 4,
    suggestedAction: 'Pair with Senior Data Engineer and sponsor LLM Fine-tuning Masterclass',
    skills: [
      { id: 'sk-6', name: 'PyTorch & Deep Learning', category: 'AI & Data Science', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-07-01', verified: true },
      { id: 'sk-7', name: 'LLM Fine-Tuning & RAG', category: 'AI & Data Science', currentLevel: 4, requiredLevel: 5, lastAssessed: '2026-06-15', verified: true },
      { id: 'sk-8', name: 'Vector DB Architecture', category: 'AI & Data Science', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-05-10', verified: false },
      { id: 'sk-9', name: 'Python Backend APIs', category: 'Backend', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-02-12', verified: true }
    ],
    riskFactors: [
      { category: 'Market Demand', score: 98, impact: 'Critical', description: 'AI Engineers in top 1% market salary growth category' },
      { category: 'Skill Gap', score: 68, impact: 'Medium', description: 'Requires advanced expertise in distributed vector database optimization' },
      { category: 'Burnout', score: 70, impact: 'High', description: 'High sprint velocity maintained continuously over past 4 quarters' }
    ]
  },
  {
    id: 'emp-103',
    name: 'David Chen',
    email: 'd.chen@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80',
    role: 'Full Stack Developer',
    department: 'Engineering',
    location: 'Seattle, WA',
    tenureMonths: 18,
    overallRiskScore: 45,
    riskLevel: 'Medium',
    flightRisk: 38,
    skillShortageRisk: 52,
    burnoutIndex: 40,
    assignedManager: 'Marcus Vance',
    joinDate: '2024-02-10',
    performanceRating: 4.2,
    projectsActive: 2,
    suggestedAction: 'Enroll in React 19 / Modern Frontend State Architecture workshop',
    skills: [
      { id: 'sk-10', name: 'React / TypeScript', category: 'Frontend', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-06-01', verified: true },
      { id: 'sk-11', name: 'Node.js Express', category: 'Backend', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-05-01', verified: true },
      { id: 'sk-12', name: 'PostgreSQL Database', category: 'Backend', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-04-12', verified: true },
      { id: 'sk-13', name: 'Docker Containers', category: 'Cloud & DevOps', currentLevel: 2, requiredLevel: 3, lastAssessed: '2026-01-20', verified: false }
    ],
    riskFactors: [
      { category: 'Skill Gap', score: 55, impact: 'Medium', description: 'Lacks senior-level design system architecture skills' },
      { category: 'Low Engagement', score: 40, impact: 'Low', description: 'Sub-optimal participation in cross-team tech huddles' }
    ]
  },
  {
    id: 'emp-104',
    name: 'Sofia Rodriguez',
    email: 's.rodriguez@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80',
    role: 'Cybersecurity Specialist',
    department: 'Security & Compliance',
    location: 'Chicago, IL',
    tenureMonths: 36,
    overallRiskScore: 82,
    riskLevel: 'High',
    flightRisk: 78,
    skillShortageRisk: 86,
    burnoutIndex: 75,
    assignedManager: 'Sarah Jenkins',
    joinDate: '2022-08-01',
    performanceRating: 4.7,
    projectsActive: 3,
    suggestedAction: 'Appoint Security Co-Lead and upgrade Zero-Trust certification allowance',
    skills: [
      { id: 'sk-14', name: 'SOC 2 & ISO 27001', category: 'Cybersecurity', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-07-10', verified: true },
      { id: 'sk-15', name: 'Penetration Testing', category: 'Cybersecurity', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-06-05', verified: true },
      { id: 'sk-16', name: 'Zero Trust Network Architecture', category: 'Cybersecurity', currentLevel: 3, requiredLevel: 5, lastAssessed: '2026-03-15', verified: false },
      { id: 'sk-17', name: 'Incident Response Protocol', category: 'Cybersecurity', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-05-22', verified: true }
    ],
    riskFactors: [
      { category: 'Project Isolation', score: 90, impact: 'Critical', description: 'Single point of failure for annual SOC 2 audit readiness' },
      { category: 'Burnout', score: 78, impact: 'High', description: 'On-call security incident rotations without backup lead' }
    ]
  },
  {
    id: 'emp-105',
    name: 'Michael Chang',
    email: 'm.chang@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1522075469751-3a6694fb2f61?w=150&auto=format&fit=crop&q=80',
    role: 'DevOps & Site Reliability Engineer',
    department: 'Cloud Infrastructure',
    location: 'Denver, CO (Remote)',
    tenureMonths: 12,
    overallRiskScore: 22,
    riskLevel: 'Low',
    flightRisk: 18,
    skillShortageRisk: 25,
    burnoutIndex: 20,
    assignedManager: 'Marcus Vance',
    joinDate: '2025-08-15',
    performanceRating: 4.4,
    projectsActive: 2,
    suggestedAction: 'On track. Assign as shadow mentor for upcoming junior SRE onboarding',
    skills: [
      { id: 'sk-18', name: 'Prometheus & Grafana', category: 'Cloud & DevOps', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-07-01', verified: true },
      { id: 'sk-19', name: 'CI/CD Pipelines (GitHub Actions)', category: 'Cloud & DevOps', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-06-20', verified: true },
      { id: 'sk-20', name: 'Kubernetes Orchestration', category: 'Cloud & DevOps', currentLevel: 3, requiredLevel: 4, lastAssessed: '2026-05-11', verified: true }
    ],
    riskFactors: [
      { category: 'Skill Gap', score: 25, impact: 'Low', description: 'Minor gap in advanced eBPF telemetry monitoring' }
    ]
  },
  {
    id: 'emp-106',
    name: 'Emma Watson',
    email: 'e.watson@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80',
    role: 'UX / UI Systems Designer',
    department: 'Product & Design',
    location: 'New York, NY',
    tenureMonths: 24,
    overallRiskScore: 34,
    riskLevel: 'Low',
    flightRisk: 28,
    skillShortageRisk: 32,
    burnoutIndex: 30,
    assignedManager: 'Sarah Jenkins',
    joinDate: '2024-08-01',
    performanceRating: 4.6,
    projectsActive: 3,
    suggestedAction: 'Sponsor Design Systems Accessibility (WCAG 2.2 AAA) certification',
    skills: [
      { id: 'sk-21', name: 'Figma Design Tokens', category: 'Frontend', currentLevel: 5, requiredLevel: 5, lastAssessed: '2026-07-05', verified: true },
      { id: 'sk-22', name: 'Design System Governance', category: 'Frontend', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-06-12', verified: true },
      { id: 'sk-23', name: 'User Research & Testing', category: 'Soft Skills & Leadership', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-04-18', verified: true }
    ],
    riskFactors: [
      { category: 'Market Demand', score: 45, impact: 'Low', description: 'Steady market demand for Design Systems leads' }
    ]
  },
  {
    id: 'emp-107',
    name: 'James Wilson',
    email: 'j.wilson@techcorp.com',
    avatar: 'https://images.unsplash.com/photo-1519085360753-af0119f7cbe7?w=150&auto=format&fit=crop&q=80',
    role: 'Data Scientist & ML Ops',
    department: 'AI & Data Science',
    location: 'Boston, MA',
    tenureMonths: 15,
    overallRiskScore: 68,
    riskLevel: 'High',
    flightRisk: 62,
    skillShortageRisk: 74,
    burnoutIndex: 58,
    assignedManager: 'Elena Rostova',
    joinDate: '2025-05-10',
    performanceRating: 4.1,
    projectsActive: 3,
    suggestedAction: 'Provide MLOps automation tools and reduce manual ETL data cleaning tasks',
    skills: [
      { id: 'sk-24', name: 'Python Data Science (Pandas/NumPy)', category: 'AI & Data Science', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-06-25', verified: true },
      { id: 'sk-25', name: 'MLflow & Pipeline Deployment', category: 'AI & Data Science', currentLevel: 2, requiredLevel: 4, lastAssessed: '2026-03-30', verified: false },
      { id: 'sk-26', name: 'SQL & Snowflake Data Warehouse', category: 'Backend', currentLevel: 4, requiredLevel: 4, lastAssessed: '2026-05-14', verified: true }
    ],
    riskFactors: [
      { category: 'Skill Gap', score: 75, impact: 'High', description: 'Gaps in modern automated ML model monitoring framework' },
      { category: 'Burnout', score: 60, impact: 'Medium', description: 'Spending 70% time on legacy data pipeline maintenance' }
    ]
  }
];

export const mockSkillGaps: SkillGap[] = [
  {
    id: 'gap-01',
    skillName: 'Go Microservices Architecture',
    category: 'Backend',
    department: 'Engineering',
    affectedEmployeesCount: 14,
    severity: 'Critical',
    gapScore: 86,
    businessImpact: 'Delays backend microservices migration for Q4 Enterprise SaaS Release',
    targetCompletionDate: '2026-11-30',
    status: 'In Training'
  },
  {
    id: 'gap-02',
    skillName: 'LLM Fine-Tuning & RAG Pipelines',
    category: 'AI & Data Science',
    department: 'AI & Data Science',
    affectedEmployeesCount: 8,
    severity: 'Critical',
    gapScore: 91,
    businessImpact: 'Limits AI assistant throughput and accuracy for customer portal feature',
    targetCompletionDate: '2026-10-15',
    status: 'Open'
  },
  {
    id: 'gap-03',
    skillName: 'Zero Trust Network Security',
    category: 'Cybersecurity',
    department: 'Security & Compliance',
    affectedEmployeesCount: 6,
    severity: 'High',
    gapScore: 78,
    businessImpact: 'Risk of non-compliance audit finding during upcoming SOC 2 recertification',
    targetCompletionDate: '2026-12-01',
    status: 'Open'
  },
  {
    id: 'gap-04',
    skillName: 'Kubernetes Multi-Cluster Management',
    category: 'Cloud & DevOps',
    department: 'Cloud Infrastructure',
    affectedEmployeesCount: 10,
    severity: 'High',
    gapScore: 72,
    businessImpact: 'High dependency on single architect (Alex Rivera) for cloud deployment',
    targetCompletionDate: '2026-09-30',
    status: 'In Training'
  },
  {
    id: 'gap-05',
    skillName: 'React 19 & Design Tokens',
    category: 'Frontend',
    department: 'Engineering',
    affectedEmployeesCount: 18,
    severity: 'Medium',
    gapScore: 54,
    businessImpact: 'Slower frontend component delivery speed and UI styling inconsistency',
    targetCompletionDate: '2027-01-15',
    status: 'Mitigated'
  }
];

export const mockRecommendations: Recommendation[] = [
  {
    id: 'rec-01',
    title: 'Advanced Kubernetes & IaC Masterclass',
    type: 'Certification',
    targetRoleOrSkill: 'Kubernetes Multi-Cluster Management',
    targetDepartment: 'Cloud Infrastructure',
    priority: 'High',
    estimatedDuration: '4 weeks (20 hrs)',
    provider: 'Linux Foundation / CNCF',
    recommendedForCount: 6,
    matchedEmployeeIds: ['emp-101', 'emp-105'],
    description: 'Cross-train SRE engineers to reduce sole-dependency flight risk on Senior Cloud Architects.'
  },
  {
    id: 'rec-02',
    title: 'Enterprise LLM Fine-Tuning & Vector DB Bootcamp',
    type: 'Course',
    targetRoleOrSkill: 'LLM Fine-Tuning & RAG Pipelines',
    targetDepartment: 'AI & Data Science',
    priority: 'High',
    estimatedDuration: '6 weeks (30 hrs)',
    provider: 'DeepLearning.AI',
    recommendedForCount: 8,
    matchedEmployeeIds: ['emp-102', 'emp-107'],
    description: 'Practical training on Llama 3 / Mistral fine-tuning, embedding optimization, and Qdrant/Pinecone scale.'
  },
  {
    id: 'rec-03',
    title: 'Internal Peer Mentorship: Cloud Infrastructure',
    type: 'Peer Mentorship',
    targetRoleOrSkill: 'AWS Cloud Architecture',
    targetDepartment: 'Cloud Infrastructure',
    priority: 'High',
    estimatedDuration: 'Ongoing (2 hrs/wk)',
    provider: 'Internal Mentorship Network',
    recommendedForCount: 4,
    matchedEmployeeIds: ['emp-101', 'emp-103'],
    description: 'Pair Alex Rivera (Expert) with David Chen and Michael Chang for weekly architecture shadowing.'
  },
  {
    id: 'rec-04',
    title: 'Zero Trust Architecture & PenTesting Track',
    type: 'Course',
    targetRoleOrSkill: 'Zero Trust Network Security',
    targetDepartment: 'Security & Compliance',
    priority: 'Medium',
    estimatedDuration: '5 weeks (25 hrs)',
    provider: 'SANS Institute',
    recommendedForCount: 3,
    matchedEmployeeIds: ['emp-104'],
    description: 'Prepare security staff for SOC 2 Type II audit and zero-trust cloud network deployment.'
  }
];

export const mockAlerts: AlertNotification[] = [
  {
    id: 'alt-01',
    title: 'Critical Flight Risk Flag: Alex Rivera',
    message: 'Alex Rivera (Senior Cloud Architect) flight risk score reached 84% due to extreme burnout and high external market demand.',
    timestamp: '10 minutes ago',
    type: 'Risk Alert',
    urgency: 'Critical',
    read: false,
    acknowledged: false,
    relatedEmployeeId: 'emp-101'
  },
  {
    id: 'alt-02',
    title: 'Urgent Skill Shortage: Go Microservices',
    message: 'Engineering department gap score risen to 86. 14 developers require Go certification before Q4 project kickoff.',
    timestamp: '2 hours ago',
    type: 'Gap Warning',
    urgency: 'High',
    read: false,
    acknowledged: false
  },
  {
    id: 'alt-03',
    title: 'Single Point of Failure Warning',
    message: 'Sofia Rodriguez is currently the only employee certified in Zero Trust SOC 2 Compliance protocols.',
    timestamp: '1 day ago',
    type: 'Risk Alert',
    urgency: 'High',
    read: true,
    acknowledged: true,
    relatedEmployeeId: 'emp-104'
  },
  {
    id: 'alt-04',
    title: 'Certification Expiration Notice',
    message: 'Priya Sharma PyTorch Specialist certification is due for recertification in 30 days.',
    timestamp: '2 days ago',
    type: 'Skill Expiration',
    urgency: 'Medium',
    read: true,
    acknowledged: false,
    relatedEmployeeId: 'emp-102'
  }
];

export const mockReports: ReportItem[] = [
  {
    id: 'rep-101',
    title: 'Q3 Enterprise Skill Gap & Vulnerability Audit',
    type: 'Skill Audit',
    generatedDate: '2026-08-01',
    author: 'Sarah Jenkins (HR Admin)',
    format: 'PDF',
    size: '3.4 MB',
    status: 'Ready'
  },
  {
    id: 'rep-102',
    title: 'Workforce Flight Risk & Retention Analysis 2026',
    type: 'Risk Summary',
    generatedDate: '2026-07-28',
    author: 'Marcus Vance (Dept Mgr)',
    format: 'PDF',
    size: '5.1 MB',
    status: 'Ready'
  },
  {
    id: 'rep-103',
    title: 'Annual Engineering & AI Upskilling Needs Analysis',
    type: 'Training Needs',
    generatedDate: '2026-07-15',
    author: 'Elena Rostova (Team Lead)',
    format: 'CSV',
    size: '890 KB',
    status: 'Ready'
  },
  {
    id: 'rep-104',
    title: 'Board Executive Summary: Talent Capabilities & Gaps',
    type: 'Executive Brief',
    generatedDate: '2026-06-30',
    author: 'Sarah Jenkins (HR Admin)',
    format: 'PDF',
    size: '2.8 MB',
    status: 'Ready'
  }
];
