import React from 'react';
import { LucideIcon, TrendingUp, TrendingDown } from 'lucide-react';

interface StatCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  trend?: string;
  trendType?: 'up' | 'down';
  icon: LucideIcon;
  iconBg?: string;
}

export const StatCard: React.FC<StatCardProps> = ({
  title,
  value,
  subtitle,
  trend,
  trendType = 'up',
  icon: Icon,
  iconBg = 'var(--accent-glow)'
}) => {
  return (
    <div className="card stat-card">
      <div className="stat-header">
        <span>{title}</span>
        <div
          style={{
            width: '38px',
            height: '38px',
            borderRadius: '10px',
            background: iconBg,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            color: 'var(--accent-primary)'
          }}
        >
          <Icon size={20} />
        </div>
      </div>
      <div className="stat-value">{value}</div>
      <div className="stat-footer">
        {trend && (
          <span className={`trend-indicator ${trendType === 'up' ? 'trend-up' : 'trend-down'}`} style={{ display: 'flex', alignItems: 'center', gap: '0.2rem' }}>
            {trendType === 'up' ? <TrendingUp size={16} /> : <TrendingDown size={16} />}
            {trend}
          </span>
        )}
        {subtitle && <span style={{ color: 'var(--text-muted)' }}>{subtitle}</span>}
      </div>
    </div>
  );
};
