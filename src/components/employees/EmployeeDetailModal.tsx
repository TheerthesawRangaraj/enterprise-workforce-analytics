import React from 'react';
import { Modal } from '../ui/Modal';
import { Badge } from '../ui/Badge';
import { SkillRadarChart } from '../charts/SkillRadarChart';
import { Employee } from '../../types';
import { Mail, MapPin, Calendar, Briefcase, Award, ShieldAlert, HeartPulse, CheckCircle2 } from 'lucide-react';

interface EmployeeDetailModalProps {
  employee: Employee | null;
  isOpen: boolean;
  onClose: () => void;
}

export const EmployeeDetailModal: React.FC<EmployeeDetailModalProps> = ({ employee, isOpen, onClose }) => {
  if (!employee) return null;

  return (
    <Modal isOpen={isOpen} onClose={onClose} title="Employee Profile & Risk Analysis">
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.5rem' }}>
        {/* Header Info */}
        <div style={{ display: 'flex', alignItems: 'center', gap: '1.25rem', paddingBottom: '1.25rem', borderBottom: '1px solid var(--border-color)' }}>
          <img src={employee.avatar} alt={employee.name} style={{ width: '72px', height: '72px', borderRadius: '50%', objectFit: 'cover', border: '3px solid var(--accent-primary)' }} />
          <div style={{ flex: 1 }}>
            <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
              <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>{employee.name}</h2>
              <Badge level={employee.riskLevel}>{employee.riskLevel} Risk ({employee.overallRiskScore}%)</Badge>
            </div>
            <div style={{ fontSize: '0.95rem', color: 'var(--accent-primary)', fontWeight: 600, marginTop: '0.2rem' }}>
              {employee.role} • {employee.department}
            </div>
            <div style={{ display: 'flex', gap: '1.25rem', marginTop: '0.5rem', fontSize: '0.85rem', color: 'var(--text-secondary)', flexWrap: 'wrap' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Mail size={14} /> {employee.email}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><MapPin size={14} /> {employee.location}</span>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}><Calendar size={14} /> Tenure: {employee.tenureMonths} mos</span>
            </div>
          </div>
        </div>

        {/* Risk Scores Grid */}
        <div style={{ display: 'grid', gridTemplateColumns: 'repeat(3, 1fr)', gap: '1rem' }}>
          <div className="card" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <ShieldAlert size={14} color="var(--risk-critical)" /> FLIGHT RISK
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: employee.flightRisk > 70 ? 'var(--risk-critical)' : 'var(--text-primary)' }}>
              {employee.flightRisk}%
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Award size={14} color="var(--risk-high)" /> SKILL GAP SCORE
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: employee.skillShortageRisk > 70 ? 'var(--risk-high)' : 'var(--text-primary)' }}>
              {employee.skillShortageRisk}%
            </div>
          </div>

          <div className="card" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <HeartPulse size={14} color="var(--risk-medium)" /> BURNOUT INDEX
            </div>
            <div style={{ fontSize: '1.6rem', fontWeight: 800, color: employee.burnoutIndex > 70 ? 'var(--risk-medium)' : 'var(--text-primary)' }}>
              {employee.burnoutIndex}%
            </div>
          </div>
        </div>

        {/* Suggested HR Action */}
        <div style={{ padding: '1rem', background: 'var(--accent-glow)', border: '1px solid var(--accent-primary)', borderRadius: 'var(--radius-md)' }}>
          <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--accent-primary)', textTransform: 'uppercase', marginBottom: '0.2rem' }}>
            Recommended AI Retention & Skill Action:
          </div>
          <div style={{ fontSize: '0.925rem', fontWeight: 600, color: 'var(--text-primary)' }}>
            {employee.suggestedAction}
          </div>
        </div>

        {/* Skills Radar & List */}
        <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Skill Proficiency Mapping</h3>
            <SkillRadarChart skills={employee.skills} width={300} height={250} />
          </div>

          <div>
            <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Skill Inventory Breakdown</h3>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.6rem' }}>
              {employee.skills.map((skill) => (
                <div key={skill.id} style={{ padding: '0.6rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', fontWeight: 600 }}>
                    <span>{skill.name}</span>
                    <span style={{ color: skill.currentLevel < skill.requiredLevel ? 'var(--risk-high)' : 'var(--risk-low)' }}>
                      Level {skill.currentLevel} / {skill.requiredLevel}
                    </span>
                  </div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.3rem', fontSize: '0.75rem', color: 'var(--text-muted)', marginTop: '0.2rem' }}>
                    {skill.verified && <CheckCircle2 size={12} color="var(--risk-low)" />}
                    <span>Assessed: {skill.lastAssessed}</span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        {/* Risk Factors Breakdown */}
        <div>
          <h3 style={{ fontSize: '1rem', fontWeight: 700, marginBottom: '0.75rem' }}>Identified Risk Drivers</h3>
          <div style={{ display: 'flex', flexDirection: 'column', gap: '0.5rem' }}>
            {employee.riskFactors.map((rf, idx) => (
              <div key={idx} style={{ padding: '0.75rem', border: '1px solid var(--border-color)', borderRadius: 'var(--radius-md)', display: 'flex', alignItems: 'flex-start', gap: '0.75rem' }}>
                <Badge level={rf.impact}>{rf.impact}</Badge>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.875rem' }}>{rf.category} (Risk Impact: {rf.score}%)</div>
                  <div style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginTop: '0.1rem' }}>{rf.description}</div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </Modal>
  );
};
