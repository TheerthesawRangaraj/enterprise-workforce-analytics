import React, { useState } from 'react';
import { AlertTriangle, CheckCircle, Clock, Filter, Plus, ArrowUpRight } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { Modal } from '../components/ui/Modal';
import { mockSkillGaps } from '../data/mockData';
import { SkillGap } from '../types';

export const SkillGapsPage: React.FC = () => {
  const [gaps, setGaps] = useState<SkillGap[]>(mockSkillGaps);
  const [selectedDept, setSelectedDept] = useState('All');
  const [selectedSeverity, setSelectedSeverity] = useState('All');

  // Modal State
  const [isAddOpen, setIsAddOpen] = useState(false);
  const [newSkillName, setNewSkillName] = useState('');
  const [newDept, setNewDept] = useState('Engineering');
  const [newImpact, setNewImpact] = useState('');

  const filtered = gaps.filter((g) => {
    const matchesDept = selectedDept === 'All' || g.department === selectedDept;
    const matchesSeverity = selectedSeverity === 'All' || g.severity === selectedSeverity;
    return matchesDept && matchesSeverity;
  });

  const handleCreateGap = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newSkillName) return;

    const newGap: SkillGap = {
      id: `gap-${Date.now()}`,
      skillName: newSkillName,
      category: 'Software Engineering',
      department: newDept,
      affectedEmployeesCount: 5,
      severity: 'High',
      gapScore: 75,
      businessImpact: newImpact || 'Impacts roadmap velocity and operational efficiency',
      targetCompletionDate: '2026-11-30',
      status: 'Open'
    };

    setGaps([newGap, ...gaps]);
    setIsAddOpen(false);
    setNewSkillName('');
    setNewImpact('');
  };

  const toggleGapStatus = (gapId: string) => {
    setGaps(gaps.map(g => {
      if (g.id === gapId) {
        const nextStatus = g.status === 'Open' ? 'In Training' : g.status === 'In Training' ? 'Mitigated' : 'Open';
        return { ...g, status: nextStatus };
      }
      return g;
    }));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Workforce Skill Deficiencies & Gap Analysis</h1>
          <p className="page-subtitle">Identify critical skill shortages threatening product roadmaps and strategic goals.</p>
        </div>

        <button className="btn btn-primary" onClick={() => setIsAddOpen(true)}>
          <Plus size={16} />
          <span>Identify New Skill Gap</span>
        </button>
      </div>

      {/* Filter Toolbar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Filter size={16} /> Filter Gaps:
        </div>

        <select className="filter-select" value={selectedDept} onChange={(e) => setSelectedDept(e.target.value)}>
          <option value="All">All Departments</option>
          <option value="Engineering">Engineering</option>
          <option value="AI & Data Science">AI & Data Science</option>
          <option value="Cloud Infrastructure">Cloud Infrastructure</option>
          <option value="Security & Compliance">Security & Compliance</option>
        </select>

        <select className="filter-select" value={selectedSeverity} onChange={(e) => setSelectedSeverity(e.target.value)}>
          <option value="All">All Severities</option>
          <option value="Critical">Critical</option>
          <option value="High">High</option>
          <option value="Medium">Medium</option>
        </select>
      </div>

      {/* Skill Gaps Cards */}
      <div style={{ display: 'grid', gridTemplateColumns: 'repeat(auto-fill, minmax(360px, 1fr))', gap: '1.25rem' }}>
        {filtered.map((gap) => (
          <div key={gap.id} className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '0.75rem' }}>
                <Badge level={gap.severity}>{gap.severity} (Score: {gap.gapScore})</Badge>
                <button
                  onClick={() => toggleGapStatus(gap.id)}
                  style={{
                    fontSize: '0.75rem',
                    fontWeight: 700,
                    padding: '0.2rem 0.6rem',
                    borderRadius: 'var(--radius-full)',
                    background: gap.status === 'Mitigated' ? 'var(--risk-low-bg)' : gap.status === 'In Training' ? 'var(--risk-medium-bg)' : 'var(--bg-tertiary)',
                    color: gap.status === 'Mitigated' ? 'var(--risk-low)' : gap.status === 'In Training' ? 'var(--risk-medium)' : 'var(--text-secondary)',
                    border: '1px solid var(--border-color)',
                    cursor: 'pointer'
                  }}
                >
                  Status: {gap.status}
                </button>
              </div>

              <h3 style={{ fontSize: '1.2rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.25rem' }}>
                {gap.skillName}
              </h3>
              <div style={{ fontSize: '0.825rem', color: 'var(--accent-primary)', fontWeight: 600, marginBottom: '0.75rem' }}>
                {gap.department} • {gap.affectedEmployeesCount} Employees Deficient
              </div>

              <div style={{ padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)', fontSize: '0.85rem', color: 'var(--text-secondary)', marginBottom: '1rem' }}>
                <strong style={{ color: 'var(--text-primary)' }}>Business Impact:</strong> {gap.businessImpact}
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.8rem', color: 'var(--text-muted)', borderTop: '1px solid var(--border-color)', paddingTop: '0.75rem' }}>
              <span style={{ display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                <Clock size={14} /> Target Resolution: {gap.targetCompletionDate}
              </span>
              <button
                className="btn btn-secondary btn-sm"
                onClick={() => toggleGapStatus(gap.id)}
              >
                Update Status
              </button>
            </div>
          </div>
        ))}
      </div>

      {/* Modal: Add New Skill Gap */}
      <Modal isOpen={isAddOpen} onClose={() => setIsAddOpen(false)} title="Register Critical Skill Defect">
        <form onSubmit={handleCreateGap} style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Missing Skill Title</label>
            <input type="text" required className="search-input" placeholder="e.g. eBPF Telemetry Monitoring" value={newSkillName} onChange={(e) => setNewSkillName(e.target.value)} />
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Department Impacted</label>
            <select className="filter-select" style={{ width: '100%' }} value={newDept} onChange={(e) => setNewDept(e.target.value)}>
              <option value="Engineering">Engineering</option>
              <option value="Cloud Infrastructure">Cloud Infrastructure</option>
              <option value="AI & Data Science">AI & Data Science</option>
              <option value="Security & Compliance">Security & Compliance</option>
            </select>
          </div>

          <div>
            <label style={{ display: 'block', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>Business Impact Description</label>
            <textarea
              className="search-input"
              style={{ width: '100%', height: '80px', borderRadius: 'var(--radius-md)' }}
              placeholder="Describe risk to project deliverables..."
              value={newImpact}
              onChange={(e) => setNewImpact(e.target.value)}
            />
          </div>

          <div style={{ display: 'flex', justifyContent: 'flex-end', gap: '0.75rem', marginTop: '1rem' }}>
            <button type="button" className="btn btn-secondary" onClick={() => setIsAddOpen(false)}>Cancel</button>
            <button type="submit" className="btn btn-primary">Save Skill Gap Entry</button>
          </div>
        </form>
      </Modal>
    </div>
  );
};
