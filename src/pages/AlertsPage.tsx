import React, { useState } from 'react';
import { Bell, ShieldAlert, CheckCircle, Filter, Eye, AlertOctagon } from 'lucide-react';
import { Badge } from '../components/ui/Badge';
import { EmployeeDetailModal } from '../components/employees/EmployeeDetailModal';
import { mockAlerts, mockEmployees } from '../data/mockData';
import { AlertNotification, Employee } from '../types';

export const AlertsPage: React.FC = () => {
  const [alerts, setAlerts] = useState<AlertNotification[]>(mockAlerts);
  const [filter, setFilter] = useState<'All' | 'Unread' | 'Critical'>('All');
  const [selectedEmployee, setSelectedEmployee] = useState<Employee | null>(null);

  const filtered = alerts.filter((a) => {
    if (filter === 'Unread') return !a.read;
    if (filter === 'Critical') return a.urgency === 'Critical';
    return true;
  });

  const markAllRead = () => {
    setAlerts(alerts.map(a => ({ ...a, read: true })));
  };

  const toggleAcknowledge = (id: string) => {
    setAlerts(alerts.map(a => a.id === id ? { ...a, acknowledged: !a.acknowledged, read: true } : a));
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">System Risk & Skill Notifications</h1>
          <p className="page-subtitle">Real-time alerts for critical flight risks, expiring certifications, and gap escalations.</p>
        </div>

        <button className="btn btn-secondary" onClick={markAllRead}>
          <CheckCircle size={16} />
          <span>Mark All as Read</span>
        </button>
      </div>

      {/* Filter Bar */}
      <div className="filter-bar">
        <div style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', fontWeight: 700 }}>
          <Filter size={16} /> Filter Notifications:
        </div>

        <div style={{ display: 'flex', gap: '0.5rem' }}>
          {(['All', 'Unread', 'Critical'] as const).map((f) => (
            <button
              key={f}
              onClick={() => setFilter(f)}
              style={{
                padding: '0.4rem 0.85rem',
                borderRadius: 'var(--radius-full)',
                background: filter === f ? 'var(--accent-primary)' : 'var(--bg-tertiary)',
                color: filter === f ? '#ffffff' : 'var(--text-secondary)',
                fontSize: '0.85rem',
                fontWeight: 600
              }}
            >
              {f}
            </button>
          ))}
        </div>
      </div>

      {/* Alerts Stream */}
      <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem' }}>
        {filtered.map((alt) => {
          const emp = alt.relatedEmployeeId ? mockEmployees.find(e => e.id === alt.relatedEmployeeId) : null;

          return (
            <div
              key={alt.id}
              className="card"
              style={{
                borderLeft: `4px solid ${alt.urgency === 'Critical' ? 'var(--risk-critical)' : alt.urgency === 'High' ? 'var(--risk-high)' : 'var(--accent-primary)'}`,
                background: !alt.read ? 'rgba(59, 130, 246, 0.05)' : 'var(--bg-secondary)'
              }}
            >
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: '1rem' }}>
                <div style={{ flex: 1 }}>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', marginBottom: '0.4rem' }}>
                    <Badge level={alt.urgency}>{alt.urgency}</Badge>
                    <span style={{ fontSize: '0.8rem', color: 'var(--accent-primary)', fontWeight: 700 }}>{alt.type}</span>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-muted)' }}>• {alt.timestamp}</span>
                  </div>

                  <h3 style={{ fontSize: '1.15rem', fontWeight: 800, color: 'var(--text-primary)', marginBottom: '0.3rem' }}>
                    {alt.title}
                  </h3>

                  <p style={{ color: 'var(--text-secondary)', fontSize: '0.9rem', lineHeight: 1.5 }}>
                    {alt.message}
                  </p>
                </div>

                <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem' }}>
                  {emp && (
                    <button className="btn btn-secondary btn-sm" onClick={() => setSelectedEmployee(emp)}>
                      <Eye size={14} /> View Employee Profile
                    </button>
                  )}

                  <button
                    className={`btn btn-sm ${alt.acknowledged ? 'btn-secondary' : 'btn-primary'}`}
                    onClick={() => toggleAcknowledge(alt.id)}
                  >
                    {alt.acknowledged ? 'Acknowledged' : 'Acknowledge Flag'}
                  </button>
                </div>
              </div>
            </div>
          );
        })}
      </div>

      <EmployeeDetailModal employee={selectedEmployee} isOpen={!!selectedEmployee} onClose={() => setSelectedEmployee(null)} />
    </div>
  );
};
