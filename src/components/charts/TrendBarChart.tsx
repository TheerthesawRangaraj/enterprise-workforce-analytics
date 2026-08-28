import React from 'react';

interface BarDataItem {
  label: string;
  value: number;
  maxValue?: number;
  color?: string;
  subtitle?: string;
}

interface TrendBarChartProps {
  data: BarDataItem[];
  height?: number;
}

export const TrendBarChart: React.FC<TrendBarChartProps> = ({ data }) => {
  const maxVal = Math.max(...data.map(d => d.maxValue || d.value), 100);

  return (
    <div style={{ display: 'flex', flexDirection: 'column', gap: '1rem', width: '100%' }}>
      {data.map((item, idx) => {
        const percentage = Math.round((item.value / maxVal) * 100);
        const barColor = item.color || 'var(--accent-primary)';

        return (
          <div key={idx} style={{ display: 'flex', flexDirection: 'column', gap: '0.3rem' }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', fontSize: '0.85rem', fontWeight: 600 }}>
              <span style={{ color: 'var(--text-primary)' }}>{item.label}</span>
              <div style={{ display: 'flex', gap: '0.5rem', alignItems: 'center' }}>
                <span style={{ color: 'var(--text-secondary)' }}>{item.subtitle}</span>
                <span style={{ color: barColor, fontWeight: 700 }}>{item.value}%</span>
              </div>
            </div>
            <div
              style={{
                width: '100%',
                height: '10px',
                background: 'var(--bg-tertiary)',
                borderRadius: 'var(--radius-full)',
                overflow: 'hidden',
                position: 'relative'
              }}
            >
              <div
                style={{
                  width: `${percentage}%`,
                  height: '100%',
                  background: barColor,
                  borderRadius: 'var(--radius-full)',
                  transition: 'width 0.6s cubic-bezier(0.4, 0, 0.2, 1)'
                }}
              />
            </div>
          </div>
        );
      })}
    </div>
  );
};
