import React, { useState } from 'react';
import { Search, Bell, Sun, Moon, UserCheck, Shield, Menu } from 'lucide-react';
import { useAuth } from '../../context/AuthContext';
import { useTheme } from '../../context/ThemeContext';
import { useNavigate } from 'react-router-dom';
import { mockAlerts } from '../../data/mockData';

interface HeaderProps {
  onSearch?: (query: string) => void;
  onToggleMobileNav?: () => void;
  mobileNavOpen?: boolean;
}

export const Header: React.FC<HeaderProps> = ({ onSearch, onToggleMobileNav, mobileNavOpen }) => {
  const { currentUser, switchRole, availableDemoUsers } = useAuth();
  const { theme, toggleTheme } = useTheme();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');
  const [showRoleMenu, setShowRoleMenu] = useState(false);
  const unreadAlerts = mockAlerts.filter(a => !a.read);

  const handleSearchChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const val = e.target.value;
    setSearchQuery(val);
    if (onSearch) onSearch(val);
  };

  return (
    <header className="top-header">
      <div style={{ display: 'flex', alignItems: 'center', gap: '0.75rem', flex: 1, minWidth: 0 }}>
        {/* Mobile Hamburger Toggle */}
        <button
          className="icon-btn mobile-menu-btn"
          onClick={onToggleMobileNav}
          aria-label={mobileNavOpen ? 'Close Navigation Menu' : 'Open Navigation Menu'}
          title="Toggle Navigation Menu"
        >
          <Menu size={22} />
        </button>

        <div className="header-search">
          <Search className="search-icon" />
          <input
            type="text"
            className="search-input"
            placeholder="Search employees, skills, risks..."
            value={searchQuery}
            onChange={handleSearchChange}
          />
        </div>
      </div>

      <div className="header-actions">
        {/* Role Selector */}
        <div style={{ position: 'relative' }}>
          <button
            className="role-switcher-badge"
            onClick={() => setShowRoleMenu(!showRoleMenu)}
            title="Switch Simulated User Role"
          >
            <Shield size={16} />
            <span className="role-text">Role: {currentUser?.role}</span>
          </button>

          {showRoleMenu && (
            <div
              className="card animate-fade-in role-dropdown-menu"
              style={{
                position: 'absolute',
                right: 0,
                top: '110%',
                width: '240px',
                padding: '0.75rem',
                zIndex: 60
              }}
            >
              <div style={{ fontSize: '0.75rem', fontWeight: 700, color: 'var(--text-muted)', marginBottom: '0.5rem', textTransform: 'uppercase' }}>
                Simulate View As:
              </div>
              {availableDemoUsers.map((user) => (
                <button
                  key={user.id}
                  onClick={() => {
                    switchRole(user);
                    setShowRoleMenu(false);
                  }}
                  style={{
                    display: 'flex',
                    alignItems: 'center',
                    gap: '0.6rem',
                    width: '100%',
                    padding: '0.5rem',
                    borderRadius: 'var(--radius-md)',
                    background: currentUser?.id === user.id ? 'var(--bg-tertiary)' : 'transparent',
                    color: 'var(--text-primary)',
                    fontSize: '0.85rem',
                    textAlign: 'left'
                  }}
                >
                  <UserCheck size={16} color={currentUser?.id === user.id ? 'var(--accent-primary)' : 'var(--text-muted)'} />
                  <div>
                    <div style={{ fontWeight: 600 }}>{user.role}</div>
                    <div style={{ fontSize: '0.75rem', color: 'var(--text-secondary)' }}>{user.name.split(' ')[0]}</div>
                  </div>
                </button>
              ))}
            </div>
          )}
        </div>

        {/* Notifications Icon */}
        <button className="icon-btn" onClick={() => navigate('/alerts')} title="View Notifications" aria-label="Notifications">
          <Bell size={20} />
          {unreadAlerts.length > 0 && <span className="notification-dot" />}
        </button>

        {/* Theme Toggle */}
        <button className="icon-btn" onClick={toggleTheme} title={`Switch to ${theme === 'dark' ? 'Light' : 'Dark'} Mode`} aria-label="Toggle Theme">
          {theme === 'dark' ? <Sun size={20} /> : <Moon size={20} />}
        </button>
      </div>
    </header>
  );
};

export default Header;
