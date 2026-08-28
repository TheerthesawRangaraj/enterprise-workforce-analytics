import React, { useState } from 'react';
import { ShieldAlert, HeartPulse, Award, Flame, Filter, SlidersHorizontal, CheckCircle2 } from 'lucide-react';
import { RiskMatrixChart } from '../components/charts/RiskMatrixChart';
import { StatCard } from '../components/ui/StatCard';
import { Badge } from '../components/ui/Badge';
import { EmployeeDetailModal } from '../components/employees/EmployeeDetailModal';
import { mockEmployees } from '../data/mockData';
import { Employee } from '../types';

export const EmployeeRiskAnalysisPage: React.FC = () => {
  const [selectedDept, setSelectedDept] = useState('All');
  const [minRiskThreshold, setMinRiskThreshold] = useState(50);
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filtered = mockEmployees.filter((e) => {
    const matchesDept = selectedDept === 'All' || e.department === selectedDept;
    const matchesRisk = e.overallRiskScore >= minRiskThreshold;
    return matchesDept && matchesRisk;
  });

  const avgBurnout = Math.round(filtered.reduce((acc, e) => acc + e.burnoutIndex, 0) / (filtered.length || 1));
  const avgFlightRisk = Math.round(filtered.reduce((acc, e) => acc + e.flightRisk, 0) / (filtered.length || 1));

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Employee Risk & Attrition Analysis</h1>
          <p className="page-subtitle">Multi-factor flight risk, burnout evaluation, and skill vulnerability matrix.</p>
        </div>
      </div>

      {/* KPI Row */}
      <div className="stats-grid">
        <StatCard title="High Risk Employees Filtered" value={filtered.length} subtitle="Score >= threshold" icon={ShieldAlert} iconBg="var(--risk-critical-bg)" />
        <StatCard title="Average Flight Risk Score" value={`${avgFlightRisk}%`} subtitle="Market demand driven" icon={Flame} iconBg="var(--risk-high-bg)" />
        <StatCard title="Average Burnout Index" value={`${avgBurnout}%`} subtitle="Sprint velocity load" icon={HeartPulse} iconBg="var(--risk-medium-bg)" />
      </div>

      {/* Filters & Threshold Sliders */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Filter size={16} /> Filters:
        </div>

        <select className="filter-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Security & Compliance">Security & Compliance</option>
        </select>

        <div style={{ display: 'flex', alignItems: 'center', gap: '1rem', flex: 1, minWidth: '280px', background: 'var(--bg-tertiary)', padding: '0.4rem 1rem', borderRadius: 'var(--radius-md)' }}>
          <SlidersHorizontal size={16} color="var(--accent-primary)" />
          <span style={{ fontSize: '0.85rem', fontWeight: 600 }}>Min Risk Threshold: {minRiskThreshold}%</span>
          <input
            type="range"
            min="0"
            max="90"
            value={minRiskThreshold}
            onChange={(e) => setMinRiskThreshold(Number(e.target.value))}
            style={{ flex: 1, accentColor: 'var(--accent-primary)' }}
          />
        </div>
      </div>

      {/* 9-Box Matrix Chart */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <ShieldAlert color="var(--risk-critical)" size={20} />
            <span>9-Box Talent Vulnerability & Attrition Matrix</span>
          </div>
        </div>
        <RiskMatrixChart employees={filtered} onSelectEmployee={(emp) => setSelectedEmployee(emp)} />
      </div>

      {/* Detailed Risk Breakdown List */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Award color="var(--accent-primary)" size={20} />
            <span>Individual Risk Factor Breakdown & Mitigation Actions</span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>Employee</th>
                <th>Flight Risk</th>
                <th>Burnout Index</th>
                <th>Primary Drivers</th>
                <th>Recommended HR Action Plan</th>
              </tr>
            </thead>
            <tbody>
              {filtered.map((emp) => (
                <tr key={emp.id} style={{ cursor: 'pointer' }} onClick={() => setSelectedEmployee(emp)}>
                  <td>
                    <div className="user-info-cell">
                      <img src={emp.avatar} alt={emp.name} className="avatar-img" />
                      <div>
                        <div style={{ fontWeight: 700 }}>{emp.name}</div>
                        <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)' }}>{emp.role}</div>
                      </div>
                    </div>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: emp.flightRisk > 70 ? 'var(--risk-critical)' : 'var(--text-primary)' }}>
                      {emp.flightRisk}%
                    </span>
                  </td>
                  <td>
                    <span style={{ fontWeight: 800, color: emp.burnoutIndex > 70 ? 'var(--risk-high)' : 'var(--text-primary)' }}>
                      {emp.burnoutIndex}%
                    </span>
                  </td>
                  <td>
                    <div style={{ display: 'flex', flexDirection: 'column', gap: '0.2rem' }}>
                      {emp.riskFactors.map((rf, idx) => (
                        <span key={idx} style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>
                          • {rf.category} ({rf.impact})
                        </span>
                      ))}
                    </div>
                  </td>
                  <td style={{ fontSize: '0.85rem', fontWeight: 600, color: 'var(--accent-primary)' }}>
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem' }}>
                      <CheckCircle2 size={14} color="var(--risk-low)" />
                      {emp.suggestedAction}
                    </div>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <EmployeeDetailModal employee={selectedEmployee} isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
};
