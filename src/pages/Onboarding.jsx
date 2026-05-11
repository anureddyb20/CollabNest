import React, { useState } from 'react';
import { motion, AnimatePresence } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { Lightbulb, Code, ChevronRight, CheckCircle2 } from 'lucide-react';
import { userService } from '../data/userService';

const Onboarding = ({ setUser }) => {
  const [step, setStep] = useState(0); // 0: Account, 1: Role, 2: Profile
  const [accountData, setAccountData] = useState({ name: '', email: '', password: '' });
  const [role, setRole] = useState(null);
  const navigate = useNavigate();

  const handleAccountSubmit = (e) => {
    e.preventDefault();
    if (accountData.name && accountData.email) {
      setStep(1);
    }
  };

  const handleRoleSelect = (selectedRole) => {
    setRole(selectedRole);
    setStep(2);
  };

  const handleFinish = () => {
    const finalUser = userService.registerOrLogin({ ...accountData, role });
    setUser(finalUser);
    navigate('/hub');
  };

  return (
    <div className="container" style={{ minHeight: '80vh', display: 'flex', alignItems: 'center', justifyContent: 'center', padding: '40px 20px' }}>
      <AnimatePresence mode="wait">
        {step === 0 ? (
          <motion.div 
            key="step0"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, y: -20 }}
            className="glass-panel"
            style={{ padding: '48px', maxWidth: '500px', width: '100%' }}
          >
            <div style={{ textAlign: 'center', marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Create Account</h2>
              <p style={{ color: 'var(--text-muted)' }}>Join the community of visionaries and builders.</p>
            </div>
            
            <form onSubmit={handleAccountSubmit}>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Full Name</label>
                <input 
                  type="text" 
                  required
                  value={accountData.name}
                  onChange={(e) => setAccountData({...accountData, name: e.target.value})}
                  placeholder="John Doe"
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '12px', color: 'white', fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '20px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Email Address</label>
                <input 
                  type="email" 
                  required
                  value={accountData.email}
                  onChange={(e) => setAccountData({...accountData, email: e.target.value})}
                  placeholder="john@example.com"
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '12px', color: 'white', fontSize: '1rem'
                  }}
                />
              </div>
              <div style={{ marginBottom: '32px' }}>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)' }}>Password</label>
                <input 
                  type="password" 
                  required
                  value={accountData.password}
                  onChange={(e) => setAccountData({...accountData, password: e.target.value})}
                  placeholder="••••••••"
                  style={{ 
                    width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                    borderRadius: '12px', padding: '12px', color: 'white', fontSize: '1rem'
                  }}
                />
              </div>
              <button 
                type="submit"
                className="btn-primary" 
                style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
              >
                Continue
                <ChevronRight size={20} />
              </button>
            </form>
          </motion.div>
        ) : step === 1 ? (
          <motion.div 
            key="step1"
            initial={{ opacity: 0, scale: 0.9 }}
            animate={{ opacity: 1, scale: 1 }}
            exit={{ opacity: 0, scale: 1.1 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{ padding: '48px', maxWidth: '800px', width: '100%', textAlign: 'center' }}
          >
            <h2 style={{ fontSize: '2rem', marginBottom: '1rem' }}>Welcome, {accountData.name.split(' ')[0]}!</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '3rem' }}>Choose your path to get started.</p>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', maxWidth: '900px', margin: '0 auto' }}>
              <div 
                className={`glass-card ${role === 'owner' ? 'active-role' : ''}`}
                style={{ 
                  padding: '40px', cursor: 'pointer', border: role === 'owner' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  position: 'relative', transition: 'all 0.3s ease'
                }}
                onClick={() => handleRoleSelect('owner')}
              >
                <div style={{ color: 'var(--secondary)', marginBottom: '20px' }}>
                  <Lightbulb size={48} />
                </div>
                <h3>I have an idea</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '0.9rem' }}>
                  I have a problem statement and need a team to build it.
                </p>
              </div>

              <div 
                className={`glass-card ${role === 'builder' ? 'active-role' : ''}`}
                style={{ 
                  padding: '40px', cursor: 'pointer', border: role === 'builder' ? '2px solid var(--primary)' : '1px solid var(--border)',
                  transition: 'all 0.3s ease'
                }}
                onClick={() => handleRoleSelect('builder')}
              >
                <div style={{ color: 'var(--accent)', marginBottom: '20px' }}>
                  <Code size={48} />
                </div>
                <h3>I want to build</h3>
                <p style={{ color: 'var(--text-muted)', marginTop: '12px', fontSize: '0.9rem' }}>
                  I have skills and I'm looking for meaningful problems to solve.
                </p>
              </div>
            </div>
          </motion.div>
        ) : (
          <motion.div 
            key="step2"
            initial={{ opacity: 0, x: 50 }}
            animate={{ opacity: 1, x: 0 }}
            exit={{ opacity: 0, x: -50 }}
            transition={{ duration: 0.3 }}
            className="glass-panel"
            style={{ padding: '48px', maxWidth: '700px', width: '100%' }}
          >
            <div style={{ marginBottom: '2rem' }}>
              <h2 style={{ fontSize: '1.8rem', marginBottom: '8px' }}>Professional Profiling</h2>
              <p style={{ color: 'var(--text-muted)' }}>Tell us about your background to help us find the best matches.</p>
            </div>
            
            <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '24px', marginBottom: '24px' }}>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Primary Expertise</label>
                <select className="custom-select">
                  <option>Frontend Developer</option>
                  <option>Backend Developer</option>
                  <option>Fullstack Developer</option>
                  <option>UI/UX Designer</option>
                  <option>Product Manager</option>
                  <option>Marketing Specialist</option>
                  <option>Data Scientist</option>
                </select>
              </div>
              <div>
                <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Experience Level</label>
                <select className="custom-select">
                  <option>Entry Level (0-2 years)</option>
                  <option>Intermediate (2-5 years)</option>
                  <option>Senior (5-8 years)</option>
                  <option>Expert (8+ years)</option>
                </select>
              </div>
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Key Skills</label>
              <input 
                type="text" 
                placeholder="e.g. React, Node.js, Figma, Python..."
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '12px', color: 'white', fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Portfolio / GitHub / LinkedIn</label>
              <input 
                type="text" 
                placeholder="https://..."
                style={{ 
                  width: '100%', background: 'rgba(255,255,255,0.05)', border: '1px solid var(--border)',
                  borderRadius: '12px', padding: '12px', color: 'white', fontSize: '1rem'
                }}
              />
            </div>

            <div style={{ marginBottom: '24px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>What motivates you most?</label>
              <div style={{ display: 'grid', gridTemplateColumns: '1fr 1fr', gap: '12px' }}>
                {[
                  "Building a Portfolio",
                  "Finding a Co-founder",
                  "Solving Social Problems",
                  "Learning New Tech",
                  "Side Project Growth",
                  "Networking"
                ].map(m => (
                  <label key={m} style={{ 
                    display: 'flex', alignItems: 'center', gap: '8px', 
                    background: 'rgba(255,255,255,0.03)', padding: '10px', 
                    borderRadius: '8px', border: '1px solid var(--border)',
                    cursor: 'pointer', fontSize: '0.85rem'
                  }}>
                    <input type="checkbox" style={{ accentColor: 'var(--primary)' }} />
                    {m}
                  </label>
                ))}
              </div>
            </div>

            <div style={{ marginBottom: '32px' }}>
              <label style={{ display: 'block', marginBottom: '8px', color: 'var(--text-muted)', fontSize: '0.9rem' }}>Weekly Commitment</label>
              <select className="custom-select">
                <option>Less than 5 hours / week</option>
                <option>5-10 hours / week</option>
                <option>10-20 hours / week</option>
                <option>20+ hours / week</option>
              </select>
            </div>

            <button 
              onClick={handleFinish}
              className="btn-primary" 
              style={{ width: '100%', justifyContent: 'center', padding: '16px' }}
            >
              Enter Problem Hub
              <ChevronRight size={20} />
            </button>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
};

export default Onboarding;
