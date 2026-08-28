import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { Users, ShieldAlert, AlertTriangle, CheckCircle, ArrowRight, Filter, Plus, FileText, Sparkles } from 'lucide-react';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { TrendBarChart } from '../components/charts/TrendBarChart';
import { EmployeeDetailModal } from '../components/employees/EmployeeDetailModal';
import { mockEmployees, mockSkillGaps, mockAlerts } from '../data/mockData';
import { Employee } from '../types';

export const DashboardPage: React.FC = () => {
  const navigate = useNavigate();
  const [selectedDept, setSelectedDept] = useState<string>('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filteredEmployees = selectedDept === 'All'
    ? mockEmployees
    : mockEmployees.filter(e => e.department === selectedDept);

  const criticalEmployees = filteredEmployees.filter(e => e.riskLevel === 'Critical' || e.riskLevel === 'High');
  const totalEmployeesCount = filteredEmployees.length;
  const atRiskCount = filteredEmployees.filter(e => e.overallRiskScore >= 65).length;
  const criticalGapsCount = mockSkillGaps.filter(g => g.severity === 'Critical').length;

  const departmentCoverageData = [
    { label: 'Cloud Infrastructure', value: 84, subtitle: '10 Employees' },
    { label: 'AI & Data Science', value: 76, subtitle: '8 Employees', color: 'var(--risk-high)' },
    { label: 'Engineering', value: 68, subtitle: '18 Employees', color: 'var(--risk-medium)' },
    { label: 'Security & Compliance', value: 92, subtitle: '6 Employees', color: 'var(--risk-low)' },
    { label: 'Product & Design', value: 88, subtitle: '5 Employees' }
  ];

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      {/* Top Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>Executive Dashboard</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}>
              Live System Status
            </span>
          </h1>
          <p className="page-subtitle">Real-time overview of workforce skill health, retention risks, and capability gaps.</p>
        </div>

        <div style={{ display: 'flex', gap: '0.75rem', flexWrap: 'wrap' }}>
          <button className="btn btn-secondary" onClick={() => navigate('/reports')}>
            <FileText size={16} />
            <span>Generate Executive Brief</span>
          </button>
          <button className="btn btn-primary" onClick={() => navigate('/employees')}>
            <Plus size={16} />
            <span>Add New Employee</span>
          </button>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontSize: '0.875rem', fontWeight: 700, color: 'var(--text-secondary)' }}>
          <Filter size={16} /> Filter Scope:
        </div>

        <select
          className="filter-select"
          value={selectedDept}
          onChange={(e) => setSelectedDept(e.target.value)}
        >
          <option value="All">All Departments</option>
          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Security & Compliance">Security & Compliance</option>
          <option value="Product & Design">Product & Design</option>
        </select>
      </div>

      {/* Metric KPI Cards */}
      <div className="stats-grid">
        <StatCard
          title="Total Monitored Employees"
          value={totalEmployeesCount * 8}
          subtitle="Across 5 global offices"
          trend="+12% this quarter"
          trendType="up"
          icon={Users}
        />
        <StatCard
          title="Skill Readiness Index"
          value="78.4%"
          subtitle="Target threshold: 85%"
          trend="+3.2% vs last month"
          trendType="up"
          icon={CheckCircle}
          iconBg="var(--risk-low-bg)"
        />
        <StatCard
          title="High Flight Risk Talent"
          value={atRiskCount}
          subtitle="Requires retention interview"
          trend="+2 critical flags"
          trendType="down"
          icon={ShieldAlert}
          iconBg="var(--risk-critical-bg)"
        />
        <StatCard
          title="Critical Skill Deficiencies"
          value={criticalGapsCount}
          subtitle="Direct impact on Q4 delivery"
          trend="2 in progress"
          trendType="down"
          icon={AlertTriangle}
          iconBg="var(--risk-high-bg)"
        />
      </div>

      {/* Middle Grid: High Risk Employees + Skill Coverage Chart */}
      <div style={{ display: 'grid', gridTemplateColumns: '1.2fr 0.8fr', gap: '1.5rem' }}>
        {/* High Risk Employees Panel */}
        <div className="card">
          <div className="card-header">
            <div>
              <div className="card-title">
                <ShieldAlert color="var(--risk-critical)" size={20} />
                <span>Immediate Flight & Skill Risk Attention Needed</span>
              </div>
              <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.2rem' }}>
                Employees with high burnout indices or critical skill shortage dependency
              </p>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/risk-analysis')}>
              View Risk Matrix
            </button>
          </div>

          <div className="table-container">
            <table className="data-table">
              <thead>
                <tr>
                  <th>Employee</th>
                  <th>Department</th>
                  <th>Risk Score</th>
                  <th>Primary Factor</th>
                  <th>Action</th>
                </tr>
              </thead>
              <tbody>
                {criticalEmployees.map((emp) => (
                  <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(emp)}>
                    <td>
                      <div className="user-info-cell">
                        <img src={emp.avatar} alt={emp.name} className="avatar-img" />
                        <div>
                          <div style={{ fontWeight: 700 }}>{emp.name}</div>
                          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{emp.role}</div>
                        </div>
                      </div>
                    </td>
                    <td>{emp.department}</td>
                    <td>
                      <Badge level={emp.riskLevel}>{emp.overallRiskScore}% ({emp.riskLevel})</Badge>
                    </td>
                    <td style={{ fontSize: '0.825rem', color: 'var(--text-secondary)' }}>
                      {emp.riskFactors[0]?.category} ({emp.riskFactors[0]?.impact})
                    </td>
                    <td>
                      <button className="btn btn-secondary btn-sm" onClick={(e) => { e.stopPropagation(); setSelectedEmployee(emp); }}>
                        Inspect
                      </button>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Department Skill Readiness Progress */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Sparkles color="var(--accent-primary)" size={20} />
              <span>Skill Coverage by Department</span>
            </div>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Percentage of mandatory target skills verified per team
          </p>
          <TrendBarChart data={departmentCoverageData} />

          <div style={{ marginTop: '1.75rem', padding: '1rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.825rem' }}>
            <div style={{ fontWeight: 700, color: 'var(--text-primary)', marginBottom: '0.2rem' }}>AI Insight:</div>
            <div style={{ color: 'var(--text-secondary)' }}>
              Engineering department exhibits the highest skill deficit in Go Microservices. Training deployment recommended.
            </div>
          </div>
        </div>
      </div>

      {/* Bottom Grid: Critical Gaps & Recent Alerts */}
      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Top Skill Gaps Summary */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <AlertTriangle color="var(--risk-high)" size={20} />
              <span>Top Critical Capability Gaps</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/skill-gaps')}>
              Explore Gaps
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {mockSkillGaps.slice(0, 3).map((gap) => (
              <div
                key={gap.id}
                style={{
                  padding: '0.85rem',
                  border: '1px solid var(--border-color)',
                  borderRadius: 'var(--radius-md)',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'space-between'
                }}
              >
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>{gap.skillName}</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)', marginTop: '0.15rem' }}>
                    {gap.department} • {gap.affectedEmployeesCount} Employees Affected
                  </div>
                </div>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  <Badge level={gap.severity}>{gap.severity}</Badge>
                  <ArrowRight size={16} color="var(--text-muted)" />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Recent Alerts Widget */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <ShieldAlert color="var(--accent-primary)" size={20} />
              <span>Recent Risk & Skill Notifications</span>
            </div>
            <button className="btn btn-secondary btn-sm" onClick={() => navigate('/alerts')}>
              View All Alerts
            </button>
          </div>

          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.85rem' }}>
            {mockAlerts.slice(0, 3).map((alt) => (
              <div
                key={alt.id}
                style={{
                  padding: '0.85rem',
                  background: 'var(--bg-tertiary)',
                  borderRadius: 'var(--radius-md)',
                  fontSize: '0.85rem'
                }}
              >
                <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.2rem' }}>
                  <span style={{ fontWeight: 700, color: 'var(--text-primary)' }}>{alt.title}</span>
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>{alt.timestamp}</span>
                </div>
                <div style={{ color: 'var(--text-secondary)', fontSize: '0.8rem' }}>{alt.message}</div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Employee Inspection Modal */}
      <EmployeeDetailModal
        employee={selectedEmployee}
        isOpen={!!selectedEmployee}
        onClose={() => setSelectedEmployee(null)}
      />
    </div>
  );
};
