import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { BrainCircuit, Lock, Mail, ArrowRight, CheckCircle2, Sparkles } from 'lucide-react';
import { useAuth } from '../context/AuthContext';
import { demoUsers } from '../data/mockData';

export const LoginPage: React.FC = () => {
  const { login } = useAuth();
  const navigate = useNavigate();

  const [email, setEmail] = useState('s.jenkins@techcorp.com');
  const [password, setPassword] = useState('••••••••••••');
  const [rememberMe, setRememberMe] = useState(true);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const matched = demoUsers.find(u => u.email.toLowerCase() === email.toLowerCase()) || demoUsers[0];
    login(matched);
    navigate('/dashboard');
  };

  const handleDemoLogin = (user: typeof demoUsers[0]) => {
    login(user);
    navigate('/dashboard');
  };

  return (
    <div
      style={{
        minHeight: '100vh',
        display: 'flex',
        alignItems: 'center',
        justifyContent: 'center',
        background: 'radial-gradient(circle at top right, rgba(59, 130, 246, 0.12), transparent 40%), radial-gradient(circle at bottom left, rgba(99, 102, 241, 0.12), transparent 40%), var(--bg-primary)',
        padding: '1.25rem'
      }}
    >
      <div
        className="card"
        style={{
          width: '100%',
          maxWidth: '960px',
          display: 'grid',
          gridTemplateColumns: 'repeat(auto-fit, minmax(320px, 1fr))',
          gap: '0',
          padding: '0',
          overflow: 'hidden'
        }}
      >
        {/* Left Info Panel */}
        <div
          style={{
            padding: '2.5rem',
            background: 'linear-gradient(135deg, rgba(37, 99, 235, 0.1), rgba(99, 102, 241, 0.1))',
            borderRight: '1px solid var(--border-color)',
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'space-between',
            gap: '2rem'
          }}
        >
          <div>
            <div className="sidebar-brand" style={{ marginBottom: '1.5rem' }}>
              <div className="brand-icon">
                <BrainCircuit size={24} />
              </div>
              <span style={{ fontSize: '1.35rem' }}>
                SkillMatrix <span style={{ color: 'var(--accent-primary)' }}>AI</span>
              </span>
            </div>

            <h1 style={{ fontSize: '1.75rem', fontWeight: 800, lineHeight: 1.2, marginBottom: '1rem', color: 'var(--text-primary)' }}>
              Workforce Intelligence & Risk Analytics
            </h1>
            <p style={{ color: 'var(--text-secondary)', fontSize: '0.925rem', lineHeight: 1.6, marginBottom: '1.5rem' }}>
              Map critical technical capabilities, identify high-flight risk talent early, and automate precision upskilling.
            </p>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '0.75rem' }}>
              {[
                'Predictive Flight & Burnout Risk Modeling',
                '5-Level Proficiency Skill Heatmaps',
                'AI-Powered Mentorship & Training Paths',
                'SOC 2 & Executive Audit Exporting'
              ].map((feat, i) => (
                <div key={i} style={{ display: 'flex', alignItems: 'center', gap: '0.6rem', fontSize: '0.85rem', fontWeight: 600, color: 'var(--text-primary)' }}>
                  <CheckCircle2 size={16} color="var(--accent-primary)" />
                  <span>{feat}</span>
                </div>
              ))}
            </div>
          </div>

          <div style={{ fontSize: '0.75rem', color: 'var(--text-muted)' }}>
            © 2026 SkillMatrix AI Platform • Production Edition
          </div>
        </div>

        {/* Right Form Panel */}
        <div style={{ padding: '2.5rem', display: 'flex', flexDirection: 'column', justifyContent: 'center' }}>
          <div style={{ marginBottom: '1.5rem' }}>
            <h2 style={{ fontSize: '1.4rem', fontWeight: 800, color: 'var(--text-primary)' }}>Sign In</h2>
            <p style={{ fontSize: '0.85rem', color: 'var(--text-secondary)', marginTop: '0.25rem' }}>
              Enter your corporate credentials or choose a demo persona below.
            </p>
          </div>

          <form onSubmit={handleSubmit} style={{ display: 'flex', flexDirection: 'column', gap: '1.1rem' }}>
            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Corporate Email Address
              </label>
              <div style={{ position: 'relative' }}>
                <Mail size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.75rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                  placeholder="name@company.com"
                />
              </div>
            </div>

            <div>
              <label style={{ display: 'block', fontSize: '0.825rem', fontWeight: 600, color: 'var(--text-secondary)', marginBottom: '0.35rem' }}>
                Password
              </label>
              <div style={{ position: 'relative' }}>
                <Lock size={18} style={{ position: 'absolute', left: '1rem', top: '50%', transform: 'translateY(-50%)', color: 'var(--text-muted)' }} />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  style={{
                    width: '100%',
                    padding: '0.65rem 1rem 0.65rem 2.75rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    outline: 'none',
                    fontSize: '0.875rem'
                  }}
                />
              </div>
            </div>

            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', fontSize: '0.825rem' }}>
              <label style={{ display: 'flex', alignItems: 'center', gap: '0.5rem', color: 'var(--text-secondary)', cursor: 'pointer' }}>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember me
              </label>
              <span style={{ color: 'var(--accent-primary)', fontWeight: 600, cursor: 'pointer' }}>Demo access</span>
            </div>

            <button type="submit" className="btn btn-primary" style={{ width: '100%', padding: '0.75rem' }}>
              <span>Sign In to Dashboard</span>
              <ArrowRight size={18} />
            </button>
          </form>

          {/* Quick Demo Sign Ins */}
          <div style={{ marginTop: '1.75rem', paddingTop: '1.25rem', borderTop: '1px solid var(--border-color)' }}>
            <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', textTransform: 'uppercase', marginBottom: '0.6rem', display: 'flex', alignItems: 'center', gap: '0.3rem' }}>
              <Sparkles size={14} color="var(--accent-primary)" /> One-Click Demo Personas:
            </div>
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '0.5rem' }}>
              {demoUsers.map((u) => (
                <button
                  key={u.id}
                  onClick={() => handleDemoLogin(u)}
                  style={{
                    padding: '0.5rem 0.75rem',
                    background: 'var(--bg-tertiary)',
                    border: '1px solid var(--border-color)',
                    borderRadius: 'var(--radius-md)',
                    color: 'var(--text-primary)',
                    fontSize: '0.775rem',
                    fontWeight: 600,
                    textAlign: 'left',
                    cursor: 'pointer'
                  }}
                >
                  <div style={{ color: 'var(--accent-primary)' }}>{u.role}</div>
                  <div style={{ color: 'var(--text-secondary)', fontSize: '0.7rem' }}>{u.name.split(' ')[0]}</div>
                </button>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginPage;
