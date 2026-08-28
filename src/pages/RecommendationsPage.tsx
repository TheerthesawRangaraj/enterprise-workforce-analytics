import React, { useState } from 'react';
import { Lightbulb, BookOpen, Award, Users, ArrowRight, Filter, CheckCircle2, Sparkles } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { mockRecommendations, mockEmployees } from '../data/mockData';
import { Recommendation } from '../types';

export const RecommendationsPage: React.FC = () => {
  const [recs, setRecs] = useState<Recommendation[]>(mockRecommendations);
  const [selectedType, setSelectedType] = useState('All');
  const [enrolledMap, setEnrolledMap] = useState<Record<string, boolean>>({});

  const filtered = recs.filter((r) => selectedType === 'All' || r.type === selectedType);

  const handleEnroll = (id: string) => {
    setEnrolledMap((prev) => ({ ...prev, [id]: true }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">
            <span>AI Skill & Retention Recommendations</span>
            <span style={{ fontSize: '0.85rem', fontWeight: 600, padding: '0.2rem 0.6rem', borderRadius: 'var(--radius-full)', background: 'var(--accent-glow)', color: 'var(--accent-primary)' }}>
              AI Engine Active
            </span>
          </h1>
          <p className="page-subtitle">Automated upskilling plans, course assignments, and cross-functional peer mentorship pairings.</p>
        </div>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Filter size={16} /> Recommendation Category:
        </div>

        <select className="filter-select" value={selectedType} onChange={(e) => setSelectedType(e.target.value)}>
          <option value="All">All Categories</option>
          <option value="Certification">Certification</option>
          <option value="Course">Course</option>
          <option value="Peer Mentorship">Peer Mentorship</option>
          <option value="Role Mobility">Role Mobility</option>
        </select>
      </div>

      {/* Recommendations Cards */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
        {filtered.map((rec) => {
          const matchedEmps = mockEmployees.filter(e => rec.matchedEmployeeIds.includes(e.id));
          const isEnrolled = enrolledMap[rec.id];

          return (
            <div key={rec.id} className="card">
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1, minWidth: '280px' }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.5rem' }}>
                    <Badge level={rec.priority}>{rec.priority} Priority</Badge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700, padding: '0.15rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)' }}>
                      {rec.type}
                    </span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>Duration: {rec.estimatedDuration}</span>
                  </div>

                  <h3 style={{ fontSize: '1.3rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.4rem' }}>
                    {rec.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5, marginBottom: '1rem' }}>
                    {rec.description}
                  </p>

                  <div style={{ fontSize: '0.825rem', color: 'var(--text-muted)' }}>
                    Provider / Platform: <strong style={{ color: 'var(--text-primary)' }}>{rec.provider}</strong> • Target Skill: <strong style={{ color: 'var(--text-primary)' }}>{rec.targetRoleOrSkill}</strong>
                  </div>
                </div>

                <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'flex-end', gap: '0.85rem' }}>
                  {isEnrolled ? (
                    <div style={{ display: 'flex', alignItems: 'center', gap: '0.4rem', color: 'var(--risk-low)', fontWeight: 700, fontSize: '0.9rem' }}>
                      <CheckCircle2 size={18} /> Plan Deployed to Employees
                    </div>
                  ) : (
                    <button className="btn btn-primary" onClick={() => handleEnroll(rec.id)}>
                      <Sparkles size={16} />
                      <span>Enroll {rec.recommendedForCount} Matched Staff</span>
                    </button>
                  )}
                </div>
              </div>

              {/* Matched Employees Avatars */}
              <div style={{ marginTop: '1.25rem', paddingTop: '1rem', borderTop: '1px solid var(--border-color)', display: 'flex', alignItems: 'center', gap: '1rem' }}>
                <span style={{ fontSize: '0.8rem', fontWeight: 700, color: 'var(--text-muted)' }}>High-Match Candidates:</span>
                <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
                  {matchedEmps.map((e) => (
                    <div key={e.id} style={{ display: 'flex', alignItems: 'center', gap: '0.35rem', padding: '0.25rem 0.6rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-full)', fontSize: '0.775rem' }}>
                      <img src={e.avatar} alt={e.name} style={{ width: '18px', height: '18px', borderRadius: '50%' }} />
                      <span style={{ fontWeight: 600 }}>{e.name}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};
