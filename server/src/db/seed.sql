-- ==============================================================================
-- SkillMatrix AI - PostgreSQL Production Seed Data
-- ==============================================================================

-- Seed Users
INSERT INTO users (id, name, email, role, avatar, department) VALUES
('usr-001', 'Sarah Jenkins (HR Admin)', 's.jenkins@techcorp.com', 'HR Admin', 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?w=150&auto=format&fit=crop&q=80', 'People Operations'),
('usr-002', 'Marcus Vance (Dept Manager)', 'm.vance@techcorp.com', 'Department Manager', 'https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=150&auto=format&fit=crop&q=80', 'Engineering'),
('usr-003', 'Elena Rostova (Team Lead)', 'e.rostova@techcorp.com', 'Team Lead', 'https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=150&auto=format&fit=crop&q=80', 'AI & Data Science'),
('usr-004', 'Alex Rivera (Employee)', 'a.rivera@techcorp.com', 'Employee', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Cloud Infrastructure')
ON CONFLICT (id) DO NOTHING;

-- Seed Employees
INSERT INTO employees (id, name, email, avatar, role, department, location, tenure_months, overall_risk_score, risk_level, flight_risk, skill_shortage_risk, burnout_index, assigned_manager, join_date, performance_rating, projects_active, suggested_action) VALUES
('emp-101', 'Alex Rivera', 'a.rivera@techcorp.com', 'https://images.unsplash.com/photo-1500648767791-00dcc994a43e?w=150&auto=format&fit=crop&q=80', 'Senior Cloud Architect', 'Cloud Infrastructure', 'Austin, TX (Remote)', 42, 88, 'Critical', 84, 92, 78, 'Marcus Vance', '2022-02-15', 4.80, 5, 'Immediate 1-on-1 retention interview & project load reduction'),
('emp-102', 'Priya Sharma', 'p.sharma@techcorp.com', 'https://images.unsplash.com/photo-1573496359142-b8d87734a5a2?w=150&auto=format&fit=crop&q=80', 'Lead AI Engineer', 'AI & Data Science', 'San Francisco, CA', 28, 76, 'High', 72, 80, 68, 'Elena Rostova', '2023-04-01', 4.90, 4, 'Pair with Senior Data Engineer and sponsor LLM Fine-tuning Masterclass'),
('emp-103', 'David Chen', 'd.chen@techcorp.com', 'https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?w=150&auto=format&fit=crop&q=80', 'Full Stack Developer', 'Engineering', 'Seattle, WA', 18, 45, 'Medium', 38, 52, 40, 'Marcus Vance', '2024-02-10', 4.20, 2, 'Enroll in React 19 / Modern Frontend State Architecture workshop'),
('emp-104', 'Sofia Rodriguez', 's.rodriguez@techcorp.com', 'https://images.unsplash.com/photo-1580489944761-15a19d654956?w=150&auto=format&fit=crop&q=80', 'Cybersecurity Specialist', 'Security & Compliance', 'Chicago, IL', 36, 82, 'High', 78, 86, 75, 'Sarah Jenkins', '2022-08-01', 4.70, 3, 'Appoint Security Co-Lead and upgrade Zero-Trust certification allowance')
ON CONFLICT (id) DO NOTHING;

-- Seed Skill Gaps
INSERT INTO skill_gaps (id, skill_name, category, department, affected_employees_count, severity, gap_score, business_impact, target_completion_date, status) VALUES
('gap-01', 'Go Microservices Architecture', 'Backend', 'Engineering', 14, 'Critical', 86, 'Delays backend microservices migration for Q4 Enterprise SaaS Release', '2026-11-30', 'In Training'),
('gap-02', 'LLM Fine-Tuning & RAG Pipelines', 'AI & Data Science', 'AI & Data Science', 8, 'Critical', 91, 'Limits AI assistant throughput and accuracy for customer portal feature', '2026-10-15', 'Open'),
('gap-03', 'Zero Trust Network Security', 'Cybersecurity', 'Security & Compliance', 6, 'High', 78, 'Risk of non-compliance audit finding during upcoming SOC 2 recertification', '2026-12-01', 'Open')
ON CONFLICT (id) DO NOTHING;

-- Seed Recommendations
INSERT INTO recommendations (id, title, type, target_role_or_skill, target_department, priority, estimated_duration, provider, recommended_for_count, description, matched_employee_ids) VALUES
('rec-01', 'Advanced Kubernetes & IaC Masterclass', 'Certification', 'Kubernetes Multi-Cluster Management', 'Cloud Infrastructure', 'High', '4 weeks (20 hrs)', 'Linux Foundation / CNCF', 6, 'Cross-train SRE engineers to reduce sole-dependency flight risk on Senior Cloud Architects.', '["emp-101", "emp-105"]'::jsonb),
('rec-02', 'Enterprise LLM Fine-Tuning & Vector DB Bootcamp', 'Course', 'LLM Fine-Tuning & RAG Pipelines', 'AI & Data Science', 'High', '6 weeks (30 hrs)', 'DeepLearning.AI', 8, 'Practical training on Llama 3 / Mistral fine-tuning, embedding optimization, and Qdrant/Pinecone scale.', '["emp-102", "emp-107"]'::jsonb)
ON CONFLICT (id) DO NOTHING;
