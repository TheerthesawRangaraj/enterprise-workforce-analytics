import React, { useState } from 'react';
import { Grid, Filter, CheckCircle2, AlertCircle, Award } from 'lucide-react';
import { mockEmployees } from '../data/mockData';
import { EmployeeSkill } from '../types';

export const SkillMappingPage: React.FC = () => {
  const [selectedCategory, setSelectedCategory] = useState<string>('All');
  const [selectedDept, setSelectedDept] = useState<string>('All');

  const categories = ['All', 'Frontend', 'Backend', 'Cloud & DevOps', 'AI & Data Science', 'Cybersecurity', 'Soft Skills & Leadership'];

  const filteredEmployees = mockEmployees.filter(e => selectedDept === 'All' || e.department === selectedDept);

  const getLevelLabel = (level: number) => {
    switch (level) {
      case 1: return '1 - Novice';
      case 2: return '2 - Beginner';
      case 3: return '3 - Competent';
      case 4: return '4 - Proficient';
      case 5: return '5 - Expert';
      default: return `${level}`;
    }
  };

  const getLevelColor = (current: number, required: number) => {
    if (current >= required) return 'var(--risk-low)';
    if (current === required - 1) return 'var(--risk-medium)';
    return 'var(--risk-critical)';
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Workforce Skill Mapping Matrix</h1>
          <p className="page-subtitle">Standardized 5-level proficiency ratings and target role capability comparisons.</p>
        </div>
      </div>

      {/* Category & Department Filters */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Filter size={16} /> Skill Taxonomy Category:
        </div>

        <select className="filter-select" value={selectedCategory} onChange={(e) => setSelectedCategory(e.target.value)}>
          {categories.map((c) => (
            <option key={c} value={c}>{c}</option>
          ))}
        </select>

        <select className="filter-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Engineering">Engineering</option>
          <option value="Security & Compliance">Security & Compliance</option>
        </select>
      </div>

      {/* 5-Level Scale Legend */}
      <div className="card" style={{ padding: '1rem', background: 'var(--bg-tertiary)' }}>
        <div style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.5rem' }}>
          Proficiency Scale Taxonomy Reference:
        </div>
        <div style={{ display: 'flex', gap: '1rem', flexWrap: 'wrap', fontSize: '0.825rem', fontWeight: 600 }}>
          {[1, 2, 3, 4, 5].map((lvl) => (
            <div key={lvl} style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-sm)', background: 'var(--bg-secondary)', border: '1px solid var(--border-color)' }}>
              <span style={{ fontWeight: 800, color: 'var(--accent-primary)' }}>L{lvl}</span>
              <span>{getLevelLabel(lvl).split('- ')[1]}</span>
            </div>
          ))}
        </div>
      </div>

      {/* Employees Skill Matrix Grid */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filteredEmployees.map((emp) => {
          const displayedSkills = selectedCategory === 'All'
            ? emp.skills
            : emp.skills.filter(s => s.category === selectedCategory);

          if (displayedSkills.length === 0) return null;

          return (
            <div key={emp.id} className="card">
              <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginBottom: '1rem', paddingBottom: '0.75rem', borderBottom: '1px solid var(--border-color)' }}>
                <div style={{ display: 'flex', alignItems: 'center', gap: '1rem' }}>
                  <img src={emp.avatar} alt={emp.name} className="avatar-img" />
                  <div>
                    <h3 style={{ fontSize: '1.1rem', fontWeight: 800 }}>{emp.name}</h3>
                    <div style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                      {emp.role} • {emp.department}
                    </div>
                  </div>
                </div>
              </div>

              <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(280px, 1fr))', gap: '1rem' }}>
                {displayedSkills.map((skill) => (
                  <div
                    key={skill.id}
                    style={{
                      padding: '0.85rem',
                      background: 'var(--bg-tertiary)',
                      borderRadius: 'var(--radius-md)',
                      borderLeft: `4px solid ${getLevelColor(skill.currentLevel, skill.requiredLevel)}`
                    }}
                  >
                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontWeight: 700, fontSize: '0.875rem' }}>
                      <span>{skill.name}</span>
                      {skill.verified && <span title="Verified Skill"><CheckCircle2 size={16} color="var(--risk-low)" /></span>}
                    </div>

                    <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)', margin: '0.2rem 0' }}>
                      Category: {skill.category}
                    </div>

                    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginTop: '0.5rem', fontSize: '0.85rem' }}>
                      <span>Rating: <strong style={{ color: getLevelColor(skill.currentLevel, skill.requiredLevel) }}>L{skill.currentLevel} ({getLevelLabel(skill.currentLevel).split('- ')[1]})</strong></span>
                      <span style={{ color: 'var(--text-muted)' }}>Target: L{skill.requiredLevel}</span>
                    </div>

                    {/* Progress Bar */}
                    <div style={{ width: '100%', height: '6px', background: 'var(--bg-secondary)', borderRadius: 'var(--radius-full)', marginTop: '0.4rem', overflow: 'hidden' }}>
                      <div
                        style={{
                          width: `${(skill.currentLevel / 5) * 100}%`,
                          height: '100%',
                          background: getLevelColor(skill.currentLevel, skill.requiredLevel)
                        }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
