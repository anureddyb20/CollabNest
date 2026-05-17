import React from 'react';
import { Link, useLocation } from 'react-router-dom';
import { Rocket, LayoutGrid as Hub, Layout, User, Zap, LogOut, Hammer } from 'lucide-react';
import { motion } from 'framer-motion';
import { userService } from '../data/userService';

const Navbar = ({ user }) => {
  const location = useLocation();

  const handleLogout = () => {
    userService.logout();
    window.location.href = '/';
  };

  const navLinks = [
    { path: '/hub', label: 'Problem Hub', icon: Hub },
    { path: '/builder', label: 'I Want to Build', icon: Hammer },
    { path: '/workspace/1', label: 'Workspace', icon: Layout },
    { path: '/profile', label: 'Portfolio', icon: User },
  ];

  return (
    <nav className="navbar" style={{
      position: 'sticky',
      top: 0,
      zIndex: 100,
      background: 'rgba(2, 6, 23, 0.8)',
      backdropFilter: 'blur(12px)',
      borderBottom: '1px solid rgba(255,255,255,0.1)',
      padding: '1rem 2rem'
    }}>
      <div className="container" style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
        <Link to="/" style={{ textDecoration: 'none', display: 'flex', alignItems: 'center', gap: '0.5rem' }}>
          <div style={{ 
            background: 'linear-gradient(135deg, #8b5cf6, #0ea5e9)',
            padding: '8px',
            borderRadius: '12px',
            display: 'flex'
          }}>
            <Rocket size={24} color="white" />
          </div>
          <span style={{ fontSize: '1.5rem', fontWeight: 700, color: 'white' }}>
            CoCreate<span style={{ color: '#8b5cf6' }}>X</span>
          </span>
        </Link>

        <div style={{ display: 'flex', gap: '2rem', alignItems: 'center' }}>
          {navLinks.map((link) => {
            const Icon = link.icon;
            const isActive = location.pathname === link.path;
            return (
              <Link 
                key={link.path} 
                to={link.path} 
                style={{ 
                  textDecoration: 'none', 
                  color: isActive ? '#fff' : '#94a3b8',
                  display: 'flex',
                  alignItems: 'center',
                  gap: '0.5rem',
                  fontSize: '0.9rem',
                  fontWeight: 500,
                  transition: 'color 0.2s'
                }}
              >
                <Icon size={18} />
                {link.label}
                {isActive && (
                  <motion.div 
                    layoutId="nav-underline"
                    style={{ position: 'absolute', bottom: '-1rem', height: '2px', background: '#8b5cf6', width: '100%' }}
                  />
                )}
              </Link>
            );
          })}
          
          <div style={{ display: 'flex', gap: '1rem', alignItems: 'center', marginLeft: '1rem' }}>
            {location.pathname !== '/' ? (
              <button 
                onClick={handleLogout}
                className="btn-outline" 
                style={{ padding: '8px 16px', fontSize: '0.9rem', display: 'flex', alignItems: 'center', gap: '8px', cursor: 'pointer' }}
              >
                <LogOut size={16} />
                Log Out
              </button>
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
