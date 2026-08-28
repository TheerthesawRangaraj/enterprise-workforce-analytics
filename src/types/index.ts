export type UserRole = 'HR Admin' | 'Department Manager' | 'Team Lead' | 'Employee';

export interface User {
  id: string;
  name: string;
  email: string;
  role: UserRole;
  avatar: string;
  department: string;
}

export type SkillProficiency = 1 | 2 | 3 | 4 | 5; // 1: Novice, 2: Beginner, 3: Competent, 4: Proficient, 5: Expert

export interface EmployeeSkill {
  id: string;
  name: string;
  category: 'Frontend' | 'Backend' | 'Cloud & DevOps' | 'AI & Data Science' | 'Cybersecurity' | 'Soft Skills & Leadership';
  currentLevel: SkillProficiency;
  requiredLevel: SkillProficiency;
  lastAssessed: string;
  verified: boolean;
}

export type RiskLevel = 'Low' | 'Medium' | 'High' | 'Critical';

export interface RiskFactor {
  category: 'Burnout' | 'Skill Gap' | 'Market Demand' | 'Project Isolation' | 'Low Engagement';
  score: number; // 0 - 100
  impact: 'Low' | 'Medium' | 'High' | 'Critical';
  description: string;
}

export interface Employee {
  id: string;
  name: string;
  email: string;
  avatar: string;
  role: string;
  department: string;
  location: string;
  tenureMonths: number;
  overallRiskScore: number; // 0 - 100
  riskLevel: RiskLevel;
  flightRisk: number; // % probability
  skillShortageRisk: number; // % score
  burnoutIndex: number; // % score
  skills: EmployeeSkill[];
  riskFactors: RiskFactor[];
  suggestedAction: string;
  assignedManager: string;
  joinDate: string;
  performanceRating: number; // 1.0 - 5.0
  projectsActive: number;
}

export interface SkillGap {
  id: string;
  skillName: string;
  category: string;
  department: string;
  affectedEmployeesCount: number;
  severity: RiskLevel;
  gapScore: number; // 1 - 100
  businessImpact: string;
  targetCompletionDate: string;
  status: 'Open' | 'In Training' | 'Mitigated';
}

export interface Recommendation {
  id: string;
  title: string;
  type: 'Course' | 'Certification' | 'Peer Mentorship' | 'Project Allocation' | 'Role Mobility';
  targetRoleOrSkill: string;
  targetDepartment: string;
  priority: 'High' | 'Medium' | 'Low';
  estimatedDuration: string;
  provider: string;
  recommendedForCount: number;
  matchedEmployeeIds: string[];
  description: string;
}

export interface AlertNotification {
  id: string;
  title: string;
  message: string;
  timestamp: string;
  type: 'Risk Alert' | 'Skill Expiration' | 'Gap Warning' | 'System';
  urgency: 'Critical' | 'High' | 'Medium' | 'Info';
  read: boolean;
  acknowledged: boolean;
  relatedEmployeeId?: string;
}

export interface ReportItem {
  id: string;
  title: string;
  type: 'Skill Audit' | 'Risk Summary' | 'Training Needs' | 'Executive Brief';
  generatedDate: string;
  author: string;
  format: 'PDF' | 'CSV' | 'JSON';
  size: string;
  status: 'Ready' | 'Processing';
}
