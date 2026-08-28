import express, { Request, Response, NextFunction } from 'express';
import cors from 'cors';
import helmet from 'helmet';
import dotenv from 'dotenv';
import db from './db/db';

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;
const CORS_ORIGIN = process.env.CORS_ORIGIN || '*';

// Security & Middleware
app.use(helmet({
  contentSecurityPolicy: false, // allow modern client-side integrations
  crossOriginResourcePolicy: { policy: 'cross-origin' }
}));

const allowedOrigins = CORS_ORIGIN === '*' ? '*' : CORS_ORIGIN.split(',').map(o => o.trim());
app.use(cors({
  origin: allowedOrigins,
  methods: ['GET', 'POST', 'PUT', 'PATCH', 'DELETE', 'OPTIONS'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());

// In-Memory dataset for instant out-of-the-box readiness
let memoryEmployees = [
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
      { id: 'sk-4', name: 'Go Microservices', category: 'Backend', currentLevel: 2, requiredLevel: 4, lastAssessed: '2026-03-01', verified: false }
    ],
    riskFactors: [
      { category: 'Burnout', score: 85, impact: 'Critical', description: 'Over-allocated across 5 mission-critical production clusters for 6 consecutive months' },
      { category: 'Skill Gap', score: 72, impact: 'High', description: 'Deficient in new internal Go backend framework standard' },
      { category: 'Market Demand', score: 95, impact: 'Critical', description: 'High external recruiter outreach rate for Cloud Architect titles' }
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
      { id: 'sk-7', name: 'LLM Fine-Tuning & RAG', category: 'AI & Data Science', currentLevel: 4, requiredLevel: 5, lastAssessed: '2026-06-15', verified: true }
    ],
    riskFactors: [
      { category: 'Market Demand', score: 98, impact: 'Critical', description: 'AI Engineers in top 1% market salary growth category' }
    ]
  }
];

let memoryGaps = [
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
  }
];

// ==========================================
// 1. Health-Check Endpoint
// ==========================================
app.get('/api/health', (req: Request, res: Response) => {
  res.status(200).json({
    status: 'healthy',
    timestamp: new Date().toISOString(),
    uptime: process.uptime(),
    database: db.isConnected() ? 'PostgreSQL Connected' : 'In-Memory Mode Active',
    environment: process.env.NODE_ENV || 'production',
    service: 'SkillMatrix AI REST Backend'
  });
});

// ==========================================
// 2. Employees Endpoints
// ==========================================
app.get('/api/employees', (req: Request, res: Response) => {
  res.status(200).json(memoryEmployees);
});

app.post('/api/employees', (req: Request, res: Response) => {
  const newEmp = { ...req.body, id: req.body.id || `emp-${Date.now()}` };
  memoryEmployees = [newEmp, ...memoryEmployees];
  res.status(201).json(newEmp);
});

// ==========================================
// 3. Skill Gaps Endpoints
// ==========================================
app.get('/api/skill-gaps', (req: Request, res: Response) => {
  res.status(200).json(memoryGaps);
});

app.post('/api/skill-gaps', (req: Request, res: Response) => {
  const newGap = { ...req.body, id: req.body.id || `gap-${Date.now()}` };
  memoryGaps = [newGap, ...memoryGaps];
  res.status(201).json(newGap);
});

app.patch('/api/skill-gaps/:id', (req: Request, res: Response) => {
  const { id } = req.params;
  const { status } = req.body;
  memoryGaps = memoryGaps.map(g => g.id === id ? { ...g, status: status || g.status } : g);
  const found = memoryGaps.find(g => g.id === id);
  if (found) {
    res.status(200).json(found);
  } else {
    res.status(404).json({ error: 'Skill gap not found' });
  }
});

// 404 Handler
app.use((req: Request, res: Response) => {
  res.status(404).json({ error: 'API endpoint not found', path: req.path });
});

// Production Error Handler
app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error('Unhandled Server Error:', err);
  res.status(500).json({
    error: 'Internal Server Error',
    message: process.env.NODE_ENV === 'production' ? 'An unexpected error occurred' : err.message
  });
});

if (process.env.NODE_ENV !== 'test') {
  app.listen(PORT, () => {
    console.log(`⚡ SkillMatrix AI Backend Server running on port ${PORT}`);
    console.log(`Health check: http://localhost:${PORT}/api/health`);
  });
}

export default app;
