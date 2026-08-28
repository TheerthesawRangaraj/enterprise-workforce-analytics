import React from 'react';
import { RiskLevel } from '../../types';

interface BadgeProps {
  level: RiskLevel | string;
  children?: React.ReactNode;
}

export const Badge: React.FC<BadgeProps> = ({ level, children }) => {
  const getBadgeClass = (l: string) => {
    switch (l) {
      case 'Critical':
        return 'badge-critical';
      case 'High':
        return 'badge-high';
      case 'Medium':
        return 'badge-medium';
      case 'Low':
        return 'badge-low';
      default:
        return 'badge-medium';
    }
  };

  return (
    <span className={`badge ${getBadgeClass(level)}`}>
      {children || level}
    </span>
  );
};
