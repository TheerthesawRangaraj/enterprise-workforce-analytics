-- ==============================================================================
-- SkillMatrix AI - PostgreSQL Production Schema DDL
-- Compatible with PostgreSQL 13, 14, 15, 16 (AWS RDS, Supabase, Neon, Railway)
-- ==============================================================================

CREATE EXTENSION IF NOT EXISTS "uuid-ossp";

-- 1. Users Table (Simulated & Real Corporate Logins)
CREATE TABLE IF NOT EXISTS users (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    role VARCHAR(64) NOT NULL,
    avatar TEXT,
    department VARCHAR(128) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Employees Table
CREATE TABLE IF NOT EXISTS employees (
    id VARCHAR(64) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    email VARCHAR(255) UNIQUE NOT NULL,
    avatar TEXT,
    role VARCHAR(128) NOT NULL,
    department VARCHAR(128) NOT NULL,
    location VARCHAR(128) NOT NULL,
    tenure_months INTEGER DEFAULT 0,
    overall_risk_score INTEGER DEFAULT 0,
    risk_level VARCHAR(32) NOT NULL,
    flight_risk INTEGER DEFAULT 0,
    skill_shortage_risk INTEGER DEFAULT 0,
    burnout_index INTEGER DEFAULT 0,
    assigned_manager VARCHAR(255),
    join_date DATE NOT NULL,
    performance_rating NUMERIC(3, 2) DEFAULT 4.0,
    projects_active INTEGER DEFAULT 1,
    suggested_action TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Employee Skills Table
CREATE TABLE IF NOT EXISTS employee_skills (
    id VARCHAR(64) PRIMARY KEY,
    employee_id VARCHAR(64) REFERENCES employees(id) ON DELETE CASCADE,
    name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    current_level INTEGER CHECK (current_level BETWEEN 1 AND 5),
    required_level INTEGER CHECK (required_level BETWEEN 1 AND 5),
    last_assessed DATE NOT NULL,
    verified BOOLEAN DEFAULT FALSE
);

-- 4. Employee Risk Factors Table
CREATE TABLE IF NOT EXISTS employee_risk_factors (
    id SERIAL PRIMARY KEY,
    employee_id VARCHAR(64) REFERENCES employees(id) ON DELETE CASCADE,
    category VARCHAR(64) NOT NULL,
    score INTEGER DEFAULT 0,
    impact VARCHAR(32) NOT NULL,
    description TEXT NOT NULL
);

-- 5. Skill Gaps Table
CREATE TABLE IF NOT EXISTS skill_gaps (
    id VARCHAR(64) PRIMARY KEY,
    skill_name VARCHAR(128) NOT NULL,
    category VARCHAR(64) NOT NULL,
    department VARCHAR(128) NOT NULL,
    affected_employees_count INTEGER DEFAULT 0,
    severity VARCHAR(32) NOT NULL,
    gap_score INTEGER DEFAULT 0,
    business_impact TEXT NOT NULL,
    target_completion_date DATE NOT NULL,
    status VARCHAR(32) DEFAULT 'Open',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Recommendations Table
CREATE TABLE IF NOT EXISTS recommendations (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    target_role_or_skill VARCHAR(128) NOT NULL,
    target_department VARCHAR(128) NOT NULL,
    priority VARCHAR(32) NOT NULL,
    estimated_duration VARCHAR(64) NOT NULL,
    provider VARCHAR(128) NOT NULL,
    recommended_for_count INTEGER DEFAULT 0,
    description TEXT NOT NULL,
    matched_employee_ids JSONB DEFAULT '[]'::jsonb,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 7. Alerts & Notifications Table
CREATE TABLE IF NOT EXISTS alerts (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    message TEXT NOT NULL,
    timestamp_label VARCHAR(64) NOT NULL,
    type VARCHAR(64) NOT NULL,
    urgency VARCHAR(32) NOT NULL,
    read BOOLEAN DEFAULT FALSE,
    acknowledged BOOLEAN DEFAULT FALSE,
    related_employee_id VARCHAR(64),
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 8. Audit Reports Table
CREATE TABLE IF NOT EXISTS reports (
    id VARCHAR(64) PRIMARY KEY,
    title VARCHAR(255) NOT NULL,
    type VARCHAR(64) NOT NULL,
    generated_date DATE NOT NULL,
    author VARCHAR(255) NOT NULL,
    format VARCHAR(16) NOT NULL,
    size VARCHAR(32) NOT NULL,
    status VARCHAR(32) DEFAULT 'Ready',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- Indices for rapid queries & filtering
CREATE INDEX IF NOT EXISTS idx_employees_department ON employees(department);
CREATE INDEX IF NOT EXISTS idx_employees_risk_level ON employees(risk_level);
CREATE INDEX IF NOT EXISTS idx_skills_employee_id ON employee_skills(employee_id);
CREATE INDEX IF NOT EXISTS idx_gaps_department ON skill_gaps(department);
CREATE INDEX IF NOT EXISTS idx_alerts_urgency ON alerts(urgency);
