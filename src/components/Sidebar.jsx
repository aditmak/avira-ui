import React, { useState, useEffect, useRef } from 'react';
import { NavLink } from 'react-router-dom';
import {
  LayoutGrid, GitBranch, Clock, BookOpen, Settings,
  HelpCircle, PanelLeftClose, PanelLeftOpen, LogOut, ChevronUp, ChevronDown,
} from 'lucide-react';
import { useLanguage } from '../App';
import { useAuth } from '../contexts/AuthContext';

const Sidebar = ({ isCollapsed, setIsCollapsed }) => {
  const { lang, t } = useLanguage();
  const { user, logout } = useAuth();
  const [isUserMenuOpen, setIsUserMenuOpen] = useState(false);
  const userMenuRef = useRef(null);

  // Close menu when clicking outside
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (userMenuRef.current && !userMenuRef.current.contains(event.target)) {
        setIsUserMenuOpen(false);
      }
    };

    if (isUserMenuOpen) {
      document.addEventListener('mousedown', handleClickOutside);
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [isUserMenuOpen]);

  return (
    <aside className={`sidebar ${isCollapsed ? 'collapsed' : ''}`}>
      {/* Header: Logo */}
      <div style={{ display: 'flex', alignItems: 'center', justifyContent: isCollapsed ? 'center' : 'flex-start', marginBottom: '8px', padding: isCollapsed ? '0' : '0 4px' }}>
        {!isCollapsed && (
          <div className="logo" style={{ margin: 0, padding: 0 }}>
            <div className="logo-icon">A</div>
            <span className="logo-text">Avira</span>
          </div>
        )}
        {isCollapsed && (
          <div className="logo-icon" style={{ flexShrink: 0 }}>A</div>
        )}
      </div>

      {!isCollapsed && (
        <div className="logo-subtitle">{lang === 'de' ? 'Medizinischer Co-Pilot' : 'Medical Co-Pilot'}</div>
      )}

      {/* Navigation */}
      <nav className="nav-section" style={{ marginTop: isCollapsed ? '12px' : '0' }}>
        {!isCollapsed && (
          <div className="nav-section-title">{lang === 'de' ? 'Hauptmenü' : 'Main Menu'}</div>
        )}
        <NavLink
          to="/"
          end
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={isCollapsed ? t.nav.assistant : undefined}
        >
          <LayoutGrid className="nav-icon" />
          {!isCollapsed && <span className="nav-label">{t.nav.assistant}</span>}
        </NavLink>
        <NavLink
          to="/workflows"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={isCollapsed ? t.nav.workflows : undefined}
        >
          <GitBranch className="nav-icon" />
          {!isCollapsed && <span className="nav-label">{t.nav.workflows}</span>}
        </NavLink>
        <NavLink
          to="/history"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={isCollapsed ? t.nav.history : undefined}
        >
          <Clock className="nav-icon" />
          {!isCollapsed && <span className="nav-label">{t.nav.history}</span>}
        </NavLink>
        <NavLink
          to="/guidelines"
          className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          title={isCollapsed ? t.nav.guidelines : undefined}
        >
          <BookOpen className="nav-icon" />
          {!isCollapsed && <span className="nav-label">{t.nav.guidelines}</span>}
        </NavLink>
      </nav>

      {/* Footer */}
      <div className="sidebar-footer">
        <div
          className="nav-item"
          style={{ cursor: 'default' }}
          title={isCollapsed ? t.nav.help : undefined}
        >
          <HelpCircle className="nav-icon" />
          {!isCollapsed && <span className="nav-label">{t.nav.help}</span>}
        </div>

        {/* Collapse Toggle */}
        <button
          onClick={() => setIsCollapsed(!isCollapsed)}
          title={isCollapsed ? 'Expand sidebar' : 'Collapse sidebar'}
          className="nav-item"
          style={{
            background: 'none',
            border: 'none',
            cursor: 'pointer',
            color: 'var(--color-text-muted)',
            display: 'flex',
            alignItems: 'center',
            justifyContent: isCollapsed ? 'center' : 'flex-start',
            padding: '10px',
            borderRadius: '6px',
            transition: 'background 0.15s, color 0.15s',
            width: '100%',
            marginTop: '8px',
          }}
          onMouseEnter={e => { e.currentTarget.style.background = 'var(--color-bg)'; e.currentTarget.style.color = 'var(--color-text)'; }}
          onMouseLeave={e => { e.currentTarget.style.background = 'none'; e.currentTarget.style.color = 'var(--color-text-muted)'; }}
        >
          {isCollapsed ? (
            <PanelLeftOpen className="nav-icon" />
          ) : (
            <>
              <PanelLeftClose className="nav-icon" />
              <span className="nav-label">{lang === 'de' ? 'Einklappen' : 'Collapse'}</span>
            </>
          )}
        </button>

        {/* User info + Settings + Logout */}
        {!isCollapsed ? (
          <div
            ref={userMenuRef}
            style={{
              marginTop: '12px',
              padding: '12px',
              background: 'var(--color-bg)',
              borderRadius: '8px',
              position: 'relative',
            }}
          >
            <div 
              style={{ 
                display: 'flex', 
                alignItems: 'center', 
                gap: '10px', 
                cursor: 'pointer',
              }}
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  flexShrink: 0,
                }}
              >
                {user?.initials || 'AA'}
              </div>
              <div className="sidebar-user-info" style={{ flex: 1, minWidth: 0 }}>
                <div style={{ fontSize: '13px', fontWeight: '600', color: 'var(--color-text)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.name || 'Admin'}
                </div>
                <div style={{ fontSize: '11px', color: 'var(--color-text-muted)', overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                  {user?.email || ''}
                </div>
              </div>
              {isUserMenuOpen ? (
                <ChevronUp 
                  size={14} 
                  style={{ 
                    color: 'var(--color-text-muted)', 
                    flexShrink: 0,
                  }} 
                />
              ) : (
                <ChevronDown 
                  size={14} 
                  style={{ 
                    color: 'var(--color-text-muted)', 
                    flexShrink: 0,
                  }} 
                />
              )}
            </div>
            {isUserMenuOpen && (
              <ul
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: 0,
                  right: 0,
                  marginBottom: '8px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '4px',
                  listStyle: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 50,
                }}
              >
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{ marginBottom: '4px' }}
                  >
                    <Settings className="nav-icon" />
                    <span className="nav-label">{t.nav.settings}</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => { setIsUserMenuOpen(false); logout(); }}
                    className="nav-item"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                  >
                    <LogOut className="nav-icon" />
                    <span className="nav-label">{lang === 'de' ? 'Abmelden' : 'Sign out'}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        ) : (
          <div ref={userMenuRef} style={{ position: 'relative', marginTop: '8px' }}>
            <button
              onClick={() => setIsUserMenuOpen(!isUserMenuOpen)}
              className="nav-item"
              title={user?.email || 'User'}
              style={{ 
                background: 'none', 
                border: 'none', 
                cursor: 'pointer', 
                width: '100%', 
                justifyContent: 'center',
                position: 'relative',
              }}
            >
              <div
                style={{
                  width: '32px',
                  height: '32px',
                  background: 'var(--color-primary)',
                  color: 'var(--color-primary-foreground)',
                  borderRadius: '50%',
                  display: 'flex',
                  alignItems: 'center',
                  justifyContent: 'center',
                  fontSize: '12px',
                  fontWeight: '600',
                  margin: '0 auto',
                }}
              >
                {user?.initials || 'AA'}
              </div>
            </button>
            {isUserMenuOpen && (
              <ul
                style={{
                  position: 'absolute',
                  bottom: '100%',
                  left: '100%',
                  marginLeft: '8px',
                  marginBottom: '4px',
                  background: 'var(--color-surface)',
                  border: '1px solid var(--color-border)',
                  borderRadius: '8px',
                  padding: '4px',
                  minWidth: '160px',
                  listStyle: 'none',
                  boxShadow: '0 4px 12px rgba(0,0,0,0.15)',
                  zIndex: 50,
                }}
              >
                <li>
                  <NavLink
                    to="/settings"
                    className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
                    onClick={() => setIsUserMenuOpen(false)}
                    style={{ marginBottom: '4px' }}
                  >
                    <Settings className="nav-icon" />
                    <span className="nav-label">{t.nav.settings}</span>
                  </NavLink>
                </li>
                <li>
                  <button
                    onClick={() => { setIsUserMenuOpen(false); logout(); }}
                    className="nav-item"
                    style={{
                      background: 'none',
                      border: 'none',
                      cursor: 'pointer',
                      color: 'var(--color-text-muted)',
                      display: 'flex',
                      alignItems: 'center',
                      width: '100%',
                      padding: '10px',
                      borderRadius: '6px',
                    }}
                    onMouseEnter={e => { e.currentTarget.style.color = 'var(--color-text)'; }}
                    onMouseLeave={e => { e.currentTarget.style.color = 'var(--color-text-muted)'; }}
                  >
                    <LogOut className="nav-icon" />
                    <span className="nav-label">{lang === 'de' ? 'Abmelden' : 'Sign out'}</span>
                  </button>
                </li>
              </ul>
            )}
          </div>
        )}
      </div>
    </aside>
  );
};

export default Sidebar;
