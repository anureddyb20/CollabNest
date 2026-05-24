import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, LayoutGrid as Hub, Layout, User, Zap, LogOut, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { userService } from '../data/userService';

const Navbar = ({ user }) => {
  const location = useLocation();
  const currentUser = user || userService.getCurrentUser();
  const myWorkspaces = userService.getJoinedProblems();
  const latestWorkspaceId = myWorkspaces.length > 0 ? myWorkspaces[myWorkspaces.length - 1].id : 1;

  const handleLogout = () => {
    userService.logout();
    window.location.href = '/';
  };

  const navLinks = [
    { path: '/hub', label: 'Problem Hub', icon: Hub },
    { path: '/builder', label: 'I Want to Build', icon: Hammer },
    { path: `/workspace/${latestWorkspaceId}`, label: 'Workspace', icon: Layout },
    { path: '/profile', label: 'Portfolio', icon: User },
  ];

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(255, 255, 255, 0.85)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid var(--border)',
      padding: '1rem 2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.6rem' }}>
          <svg width="34" height="34" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg" style={{ display: 'flex' }}>
            <defs>
              <linearGradient id="left-leg-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#8b5cf6" />
                <stop offset="100%" stop-color="#6366f1" />
              </linearGradient>
              <linearGradient id="diagonal-grad" x1="0" y1="0" x2="1" y2="1">
                <stop offset="0%" stop-color="#6366f1" />
                <stop offset="100%" stop-color="#4f46e5" stop-opacity="0.8" />
              </linearGradient>
              <linearGradient id="right-leg-grad" x1="0" y1="0" x2="0" y2="1">
                <stop offset="0%" stop-color="#4f46e5" />
                <stop offset="100%" stop-color="#3b82f6" />
              </linearGradient>
            </defs>
            <circle cx="5" cy="5" r="2.5" fill="#8b5cf6" />
            <rect x="3.5" y="10" width="3" height="11" rx="1.5" fill="url(#left-leg-grad)" />
            <rect x="14.5" y="10" width="3" height="11" rx="1.5" fill="url(#right-leg-grad)" />
            <line x1="5" y1="10" x2="16" y2="21" stroke="url(#diagonal-grad)" stroke-width="3" stroke-linecap="round" />
          </svg>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, display: 'flex', alignItems: 'center' }}>
            <span style={{ color: 'var(--primary)' }}>Collab</span><span style={{ color: 'var(--text-main)' }}>Nest</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = (location.pathname.startsWith('/workspace') && link.path.startsWith('/workspace'))
              ? true
              : location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                style={{ 
                  textDecoration: 'none', 
                  color: isActive ? 'var(--primary)' : 'var(--text-muted)',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 600,
                  transition: 'color 0.2s'
                }}
              >
                <Icon size={18} />
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: '-1rem', height: '2px', background: 'var(--primary)', width: '100%' }}
                  />
                )}
              </Link>
            );
          })}
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
            {currentUser ? (
              <div style={{ display: 'flex', gap: '1rem', alignItems: 'center' }}>
                <span style={{ fontSize: '0.9rem', color: 'var(--text-muted)', fontWeight: 600 }}>
                  Hi, {currentUser.name}
                </span>
                <button 
                  onClick={handleLogout}
                  className="btn-outline" 
                  style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
                >
                  <LogOut size={16} />
                  Log Out
                </button>
              </div>
            ) : (
              <Link to="/onboarding" className="btn-primary" style={{ padding: '8px 16px', fontSize: '0.9rem' }}>
                Get Started
                <Zap size={16} />
              </Link>
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
