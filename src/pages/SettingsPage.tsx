import React, { useState } from 'react';
import { Settings, Shield, Sliders, Bell, Moon, Sun, CheckCircle2, Plus, Save } from 'lucide-react';
import { useTheme } from '../context/ThemeContext';

export const SettingsPage: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  // Algorithm Weights state
  const [flightWeight, setFlightWeight] = useState(40);
  const [burnoutWeight, setBurnoutWeight] = useState(30);
  const [skillGapWeight, setSkillGapWeight] = useState(30);
  const [savedSuccess, setSavedSuccess] = useState(false);

  // Notification Preferences
  const [emailAlerts, setEmailAlerts] = useState(true);
  const [weeklyDigest, setWeeklyDigest] = useState(true);
  const [criticalPush, setCriticalPush] = useState(true);

  const handleSaveWeights = (e: React.FormEvent) => {
    e.preventDefault();
    setSavedSuccess(true);
    setTimeout(() => setSavedSuccess(false), 3000);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1.75rem' }}>
      <div className="page-header">
        <div>
          <h1 className="page-title">Platform & Algorithm Settings</h1>
          <p className="page-subtitle">Configure risk weighting thresholds, skill taxonomy categories, and role permissions.</p>
        </div>
      </div>

      <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '1.5rem' }}>
        {/* Risk Algorithm Configuration */}
        <div className="card">
          <div className="card-header">
            <div className="card-title">
              <Sliders color="var(--accent-primary)" size={20} />
              <span>Risk Score Weighting Algorithm</span>
            </div>
          </div>
          <p style={{ fontSize: '0.825rem', color: 'var(--text-secondary)', marginBottom: '1.25rem' }}>
            Adjust how individual risk components calculate the overall employee risk score (Total must equal 100%).
          </p>

          <form onSubmit={handleSaveWeights} style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <span>Flight Risk & Market Demand Weight</span>
                <span style={{ color: 'var(--accent-primary)' }}>{flightWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={flightWeight}
                onChange={(e) => setFlightWeight(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <span>Burnout Index Weight</span>
                <span style={{ color: 'var(--accent-primary)' }}>{burnoutWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={burnoutWeight}
                onChange={(e) => setBurnoutWeight(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>

            <div>
              <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600, marginBottom: '0.3rem' }}>
                <span>Skill Shortage & Role Gap Weight</span>
                <span style={{ color: 'var(--accent-primary)' }}>{skillGapWeight}%</span>
              </div>
              <input
                type="range"
                min="10"
                max="70"
                value={skillGapWeight}
                onChange={(e) => setSkillGapWeight(Number(e.target.value))}
                style={{ width: '100%', accentColor: 'var(--accent-primary)' }}
              />
            </div>

            <div style={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', marginTop: '0.5rem' }}>
              {savedSuccess ? (
                <span style={{ fontSize: '0.85rem', color: 'var(--risk-low)', fontWeight: 700, display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
                  <CheckCircle2 size={16} /> Saved Successfully
                </span>
              ) : <span />}

              <button type="submit" className="btn btn-primary">
                <Save size={16} />
                <span>Save Algorithm Rule</span>
              </button>
            </div>
          </form>
        </div>

        {/* Display & Notification Preferences */}
        <div className="card" style={{ display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
          <div>
            <div className="card-header">
              <div className="card-title">
                <Bell color="var(--accent-primary)" size={20} />
                <span>Notification & Theme Preferences</span>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '1.25rem' }}>
              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', padding: '0.75rem', background: 'var(--bg-tertiary)', borderRadius: 'var(--radius-md)' }}>
                <div>
                  <div style={{ fontWeight: 700, fontSize: '0.9rem' }}>Appearance Mode</div>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-secondary)' }}>Current theme: {theme}</div>
                </div>
                <button className="btn btn-secondary btn-sm" onClick={toggleTheme}>
                  {theme === 'dark' ? <Sun size={16} /> : <Moon size={16} />}
                  <span>Toggle Theme</span>
                </button>
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Critical Flight Risk Email Alerts</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Instant notification when an employee score exceeds 80%</div>
                </div>
                <input type="checkbox" checked={emailAlerts} onChange={(e) => setEmailAlerts(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              </div>

              <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                <div>
                  <div style={{ fontWeight: 600, fontSize: '0.9rem' }}>Weekly Skill Audit Digest</div>
                  <div style={{ fontSize: '0.8rem', color: 'var(--text-secondary)' }}>Summary report sent every Monday morning</div>
                </div>
                <input type="checkbox" checked={weeklyDigest} onChange={(e) => setWeeklyDigest(e.target.checked)} style={{ width: '18px', height: '18px' }} />
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Role & Permissions Table */}
      <div className="card">
        <div className="card-header">
          <div className="card-title">
            <Shield color="var(--accent-primary)" size={20} />
            <span>Role-Based Access Control (RBAC) Permissions</span>
          </div>
        </div>

        <div className="table-container">
          <table className="data-table">
            <thead>
              <tr>
                <th>User Role</th>
                <th>Employee Directory</th>
                <th>Risk Matrix & Flight Score</th>
                <th>Skill Gap & Mapping</th>
                <th>Report Generation</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>HR Admin</td>
                <td>Full Access (Read / Write)</td>
                <td>Full Access (Read / Write)</td>
                <td>Full Access (Read / Write)</td>
                <td>Full Access (Read / Write)</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Department Manager</td>
                <td>Dept Only (Read / Write)</td>
                <td>Dept Only (Read / Write)</td>
                <td>Full Access (Read)</td>
                <td>Dept Summary Reports</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Team Lead</td>
                <td>Team Only (Read)</td>
                <td>Team Only (Read)</td>
                <td>Team Only (Read / Edit)</td>
                <td>Read Only</td>
              </tr>
              <tr>
                <td style={{ fontWeight: 700, color: 'var(--accent-primary)' }}>Employee</td>
                <td>Self Profile Only</td>
                <td>Restricted</td>
                <td>Self Skill Matrix Only</td>
                <td>Restricted</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};
