import React from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutDashboard,
  Users,
  ShieldAlert,
  Grid,
  AlertTriangle,
  Lightbulb,
  Bell,
  BarChart3,
  FileText,
  Settings,
  BrainCircuit,
  LogOut,
  ChevronLeft,
  ChevronRight,
  X
} from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { mockAlerts } from '../../data/mockData';

interface SidebarProps {
  collapsed: boolean;
  onToggleCollapse: () => void;
  mobileOpen?: boolean;
  onCloseMobile?: () => void;
}

export const Sidebar: React.FC<SidebarProps> = ({
  collapsed,
  onToggleCollapse,
  mobileOpen = false,
  onCloseMobile
}) => {
  const { logout, currentUser } = useAuth();
  const unreadAlertsCount = mockAlerts.filter(a => !a.read).length;

  const navItems = [
    { label: 'Dashboard', path: '/dashboard', icon: LayoutDashboard },
    { label: 'Employees', path: '/employees', icon: Users },
    { label: 'Risk Analysis', path: '/risk-analysis', icon: ShieldAlert },
    { label: 'Skill Mapping', path: '/skill-mapping', icon: Grid },
    { label: 'Skill Gaps', path: '/skill-gaps', icon: AlertTriangle },
    { label: 'Recommendations', path: '/recommendations', icon: Lightbulb },
    { label: 'Alerts', path: '/alerts', icon: Bell, badge: unreadAlertsCount },
    { label: 'Analytics', path: '/analytics', icon: BarChart3 },
    { label: 'Reports', path: '/reports', icon: FileText },
    { label: 'Settings', path: '/settings', icon: Settings }
  ];

  return (
    <aside className={`sidebar ${collapsed ? 'collapsed' : ''} ${mobileOpen ? 'mobile-open' : ''}`}>
      <div className="sidebar-header">
        <div className="sidebar-brand">
          <div className="brand-icon">
            <BrainCircuit size={22} />
          </div>
          {(!collapsed || mobileOpen) && (
            <span>SkillMatrix <span style={{ color: 'var(--accent-primary)', fontSize: '0.85rem' }}>AI</span></span>
          )}
        </div>

        {/* Desktop Collapse Toggle */}
        <button
          className="icon-btn desktop-collapse-btn"
          onClick={onToggleCollapse}
          title="Toggle Sidebar Width"
          aria-label="Toggle Sidebar Width"
        >
          {collapsed ? <ChevronRight size={18} /> : <ChevronLeft size={18} />}
        </button>

        {/* Mobile Close Button */}
        <button
          className="icon-btn mobile-close-btn"
          onClick={onCloseMobile}
          title="Close Menu"
          aria-label="Close Menu"
        >
          <X size={20} />
        </button>
      </div>

      <nav className="sidebar-nav">
        {navItems.map((item) => {
          const Icon = item.icon;
          return (
            <NavLink
              key={item.path}
              to={item.path}
              onClick={onCloseMobile}
              className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
              title={collapsed && !mobileOpen ? item.label : undefined}
            >
              <Icon size={20} />
              {(!collapsed || mobileOpen) && <span>{item.label}</span>}
              {(!collapsed || mobileOpen) && item.badge !== undefined && item.badge > 0 && (
                <span className="nav-badge">{item.badge}</span>
              )}
            </NavLink>
          );
        })}
      </nav>

      <div style={{ padding: '1rem 0.75rem', borderTop: '1px solid var(--border-color)' }}>
        {(!collapsed || mobileOpen) && currentUser && (
          <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', marginBottom: '1rem', padding: '0 0.5rem' }}>
            <img src={currentUser.avatar} alt={currentUser.name} className="avatar-img" />
            <div style={{ overflow: 'hidden' }}>
              <div style={{ fontSize: '0.85rem', fontWeight: 700, color: 'var(--text-primary)', whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}>
                {currentUser.name}
              </div>
              <div style={{ fontSize: '0.75rem', color: 'var(--accent-primary)', fontWeight: 600 }}>
                {currentUser.role}
              </div>
            </div>
          </div>
        )}

        <button
          onClick={logout}
          className="nav-item"
          style={{ width: '100%', color: 'var(--risk-critical)', justifyContent: (collapsed && !mobileOpen) ? 'center' : 'flex-start' }}
          title="Sign Out"
        >
          <LogOut size={20} />
          {(!collapsed || mobileOpen) && <span>Sign Out</span>}
        </button>
      </div>
    </aside>
  );
};

export default Sidebar;
