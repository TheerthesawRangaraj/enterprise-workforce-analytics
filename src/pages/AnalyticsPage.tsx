import React from 'react';
import { BarChart3, PieChart, TrendingUp, Download, CheckCircle2, ShieldAlert } from 'lucide-react';
import { TrendBarChart } from '../components/charts/TrendBarChart';
import { StatCard } from '../components/ui/StatCard';
import { mockEmployees } from '../data/mockData';

export const AnalyticsPage: React.FC = () => {
  const skillCategoryData = [
    { label: 'Cloud & DevOps (K8s, IaC, Terraform)', value: 88, subtitle: '18 Certified' },
    { label: 'AI & Data Science (PyTorch, RAG)', value: 74, subtitle: '12 Certified', color: 'var(--risk-high)' },
    { label: 'Backend Architecture (Go, Express)', value: 65, subtitle: '24 Certified', color: 'var(--risk-medium)' },
    { label: 'Cybersecurity (SOC2, Zero Trust)', value: 92, subtitle: '8 Certified', color: 'var(--risk-low)' },
    { label: 'Frontend Systems (React, Design Tokens)', value: 82, subtitle: '16 Certified' }
  ];

  const deptRiskDistribution = [
    { label: 'Cloud Infrastructure', value: 88, subtitle: 'Critical Flight Risk: 1', color: 'var(--risk-critical)' },
    { label: 'AI & Data Science', value: 76, subtitle: 'High Market Demand', color: 'var(--risk-high)' },
    { label: 'Security & Compliance', value: 82, subtitle: 'Single Point of Failure', color: 'var(--risk-high)' },
    { label: 'Engineering', value: 45, subtitle: 'Stable Team Load', color: 'var(--risk-medium)' },
    { label: 'Product & Design', value: 34, subtitle: 'Low Risk', color: 'var(--risk-low)' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Workforce Analytics & Deep Insights</h1>
          <p className="page-subtitle">Macro-level intelligence on technical competencies, upskilling velocity, and risk distribution.</p>
        </div>

        <button className="btn btn-secondary" onClick={() => window.print()}>
          <Download size={16} />
          <span>Export Analytics View</span>
        </button>
      </div>

      <div className="stats-grid">
        <StatCard title="Average Competency Score" value="3.85 / 5.0" subtitle="Scale: Novice to Expert" trend="+0.4 YTD" trendType="up" icon={CheckCircle2} />
        <StatCard title="Quarterly Upskill Velocity" value="42 Courses" subtitle="Completed by workforce" trend="+18% YoY" trendType="up" icon={TrendingUp} iconBg="var(--risk-low-bg)" />
        <StatCard title="High Flight Vulnerability" value="28.5%" subtitle="Of key technical leads" trend="-2.5% vs Q2" trendType="up" icon={ShieldAlert} iconBg="var(--risk-critical-bg)" />
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Skill Category Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <BarChart3 color="var(--accent-primary)" size={20} />
              <span>Skill Coverage Index by Technical Domain</span>
            </div>
          </div>
          <TrendBarChart data={skillCategoryData} />
        </div>

        {/* Department Risk Distribution */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <PieChart color="var(--risk-high)" size={20} />
              <span>Departmental Risk Exposure & Vulnerability</span>
            </div>
          </div>
          <TrendBarChart data={deptRiskDistribution} />
        </div>
      </div>
    </div>
  );
};
