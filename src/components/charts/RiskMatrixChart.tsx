import React from 'react';
import { Employee } from '../../types';
import { Badge } from '../ui/Badge';

interface RiskMatrixChartProps {
  employees: Employee[];
  onSelectEmployee?: (emp: Employee) => void;
}

export const RiskMatrixChart: React.FC<RiskMatrixChartProps> = ({ employees, onSelectEmployee }) => {
  // 9-Box Matrix Grid based on Flight Risk (Low, Med, High) vs Skill Shortage Risk (Low, Med, High)
  const getBoxEmployees = (flightCat: 'low' | 'med' | 'high', skillCat: 'low' | 'med' | 'high') => {
    return employees.filter(e => {
      const fLevel = e.flightRisk < 40 ? 'low' : e.flightRisk < 70 ? 'med' : 'high';
      const sLevel = e.skillShortageRisk < 40 ? 'low' : e.skillShortageRisk < 70 ? 'med' : 'high';
      return fLevel === flightCat && sLevel === skillCat;
    });
  };

  const matrixLayout = [
    { title: 'High Impact / High Flight Risk', flight: 'high', skill: 'high', riskClass: 'high-risk', badgeLevel: 'Critical' },
    { title: 'High Impact / Medium Risk', flight: 'med', skill: 'high', riskClass: 'high-risk', badgeLevel: 'High' },
    { title: 'High Impact / Low Flight Risk', flight: 'low', skill: 'high', riskClass: 'med-risk', badgeLevel: 'Medium' },
    
    { title: 'Medium Impact / High Risk', flight: 'high', skill: 'med', riskClass: 'high-risk', badgeLevel: 'High' },
    { title: 'Medium Impact / Medium Risk', flight: 'med', skill: 'med', riskClass: 'med-risk', badgeLevel: 'Medium' },
    { title: 'Medium Impact / Low Risk', flight: 'low', skill: 'med', riskClass: 'low-risk', badgeLevel: 'Low' },

    { title: 'Low Impact / High Risk', flight: 'high', skill: 'low', riskClass: 'med-risk', badgeLevel: 'Medium' },
    { title: 'Low Impact / Medium Risk', flight: 'med', skill: 'low', riskClass: 'low-risk', badgeLevel: 'Low' },
    { title: 'Low Impact / Stable', flight: 'low', skill: 'low', riskClass: 'low-risk', badgeLevel: 'Low' }
  ] as const;

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
      <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <span style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', fontWeight: 600 }}>
          Y-Axis: Skill Shortage Impact | X-Axis: Flight Risk Score
        </span>
      </div>

      <div className="matrix-grid">
        {matrixLayout.map((cell, idx) => {
          const list = getBoxEmployees(cell.flight, cell.skill);
          return (
            <div key={idx} className={`matrix-cell ${cell.riskClass}`}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <span style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)' }}>{cell.title}</span>
                <Badge level={cell.badgeLevel}>{list.length}</Badge>
              </div>
              
              <div style={{ display: 'flex', flexWrap: 'wrap', gap: '0.4rem', marginTop: '0.5rem' }}>
                {list.length === 0 ? (
                  <span style={{ fontSize: '0.75rem', color: 'var(--text-muted)', fontStyle: 'italic' }}>No employees</span>
                ) : (
                  list.map(emp => (
                    <button
                      key={emp.id}
                      onClick={() => onSelectEmployee && onSelectEmployee(emp)}
                      title={`${emp.name} (${emp.role}) - Overall Risk: ${emp.overallRiskScore}%`}
                      style={{
                        display: 'flex',
                        alignItems: 'center',
                        gap: '0.3rem',
                        padding: '0.2rem 0.5rem',
                        borderRadius: 'var(--radius-full)',
                        background: 'var(--bg-secondary)',
                        border: '1px solid var(--border-color)',
                        fontSize: '0.75rem',
                        color: 'var(--text-primary)',
                        cursor: 'pointer'
                      }}
                    >
                      <img src={emp.avatar} alt={emp.name} style={{ width: '16px', height: '16px', borderRadius: '50%' }} />
                      <span>{emp.name.split(' ')[0]}</span>
                    </button>
                  ))
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
