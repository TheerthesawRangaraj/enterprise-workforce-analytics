import React from 'react';
import { EmployeeSkill } from '../../types';

interface SkillRadarChartProps {
  skills: EmployeeSkill[];
  width?: number;
  height?: number;
}

export const SkillRadarChart: React.FC<SkillRadarChartProps> = ({ skills, width = 360, height = 300 }) => {
  if (!skills || skills.length === 0) return null;

  const center = width / 2;
  const radius = Math.min(width, height) / 2 - 40;
  const maxProficiency = 5;
  const numSkills = skills.length;
  const angleStep = (Math.PI * 2) / numSkills;

  // Helper to calculate coordinates
  const getCoordinates = (value: number, index: number) => {
    const angle = index * angleStep - Math.PI / 2;
    const r = (value / maxProficiency) * radius;
    const x = center + r * Math.cos(angle);
    const y = center + r * Math.sin(angle);
    return { x, y };
  };

  // Generate grid circles
  const gridLevels = [1, 2, 3, 4, 5];

  // Polygon points
  const actualPoints = skills.map((s, i) => getCoordinates(s.currentLevel, i));
  const requiredPoints = skills.map((s, i) => getCoordinates(s.requiredLevel, i));

  const actualPath = actualPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
  const requiredPath = requiredPoints.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';

  return (
    <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center' }}>
      <svg width={width} height={height} style={{ overflow: 'visible' }}>
        {/* Background Grid */}
        {gridLevels.map((lvl) => {
          const points = skills.map((_, i) => getCoordinates(lvl, i));
          const path = points.map((p, i) => `${i === 0 ? 'M' : 'L'} ${p.x} ${p.y}`).join(' ') + ' Z';
          return (
            <path
              key={lvl}
              d={path}
              fill="none"
              stroke="var(--border-color)"
              strokeDasharray={lvl === 5 ? 'none' : '3 3'}
            />
          );
        })}

        {/* Axis Lines & Labels */}
        {skills.map((s, i) => {
          const end = getCoordinates(5, i);
          const labelPos = getCoordinates(5.6, i);
          return (
            <g key={s.id}>
              <line x1={center} y1={center} x2={end.x} y2={end.y} stroke="var(--border-color)" />
              <text
                x={labelPos.x}
                y={labelPos.y}
                fill="var(--text-secondary)"
                fontSize="10"
                fontWeight="600"
                textAnchor="middle"
                dominantBaseline="middle"
              >
                {s.name.length > 14 ? `${s.name.slice(0, 12)}...` : s.name}
              </text>
            </g>
          );
        })}

        {/* Required Level Area (Outline) */}
        <path d={requiredPath} fill="rgba(99, 102, 241, 0.15)" stroke="#6366f1" strokeWidth="2" strokeDasharray="4 4" />

        {/* Actual Level Area (Solid Color) */}
        <path d={actualPath} fill="rgba(59, 130, 246, 0.35)" stroke="#3b82f6" strokeWidth="2.5" />

        {/* Actual Data Points */}
        {actualPoints.map((p, i) => (
          <circle key={i} cx={p.x} cy={p.y} r="4" fill="#3b82f6" stroke="#ffffff" strokeWidth="1.5" />
        ))}
      </svg>

      {/* Legend */}
      <div style={{ display: 'flex', gap: '1.5rem', marginTop: '1rem', fontSize: '0.8rem', fontWeight: 600 }}>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#3b82f6' }}>
          <span style={{ width: '12px', height: '12px', background: '#3b82f6', borderRadius: '3px' }}></span>
          Current Verified Level
        </div>
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: '#6366f1' }}>
          <span style={{ width: '12px', height: '12px', border: '2px dashed #6366f1', borderRadius: '3px' }}></span>
          Target Role Requirement
        </div>
      </div>
    </div>
  );
};
