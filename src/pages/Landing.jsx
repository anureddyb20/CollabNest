import React from 'react';
import { motion } from 'framer-motion';
import { useNavigate } from 'react-router-dom';
import { ArrowRight, Code, Lightbulb, Users, Shield, BarChart, Award } from 'lucide-react';

const Landing = () => {
  const navigate = useNavigate();

  const features = [
    { icon: Lightbulb, title: "Problem-First Approach", desc: "Start with meaningful problems, then build the team." },
    { icon: Users, title: "Smart Matching", desc: "AI-driven teammate and project recommendations." },
    { icon: Shield, title: "Reputation Layer", desc: "Earn trust through contribution, not just static profiles." },
    { icon: BarChart, title: "Structured Growth", desc: "Milestone-based tracking from idea to MVP." },
  ];

  return (
    <div className="landing-page">
      {/* Hero Section */}
      <section style={{ padding: '80px 0', textAlign: 'center' }}>
        <div className="container">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <span className="badge badge-primary" style={{ marginBottom: '1.5rem' }}>
              Solving the execution gap
            </span>
            <h1 style={{ fontSize: '4rem', lineHeight: 1.1, marginBottom: '1.5rem' }}>
              Where <span className="accent-gradient">Visionaries</span> find<br />
              the <span className="accent-gradient">Builders</span> they need.
            </h1>
            <p style={{ color: 'var(--text-muted)', fontSize: '1.25rem', maxWidth: '700px', margin: '0 auto 2.5rem' }}>
              A structured collaboration platform that guides you from a raw problem statement to a fully executed solution. 
              No ghosting, just building.
            </p>
            
            <div style={{ display: 'flex', gap: '1rem', justifyContent: 'center' }}>
              <button 
                onClick={() => navigate('/onboarding')}
                className="btn-primary" 
                style={{ padding: '16px 32px', fontSize: '1.1rem' }}
              >
                Start Collaborating
                <ArrowRight size={20} />
              </button>
              <button 
                onClick={() => navigate('/hub')}
                className="btn-outline" 
                style={{ padding: '16px 32px', fontSize: '1.1rem' }}
              >
                Explore Problem Hub
              </button>
            </div>
          </motion.div>

          {/* Stats/Social Proof */}
          <motion.div 
            initial={{ opacity: 0 }}
            whileInView={{ opacity: 1 }}
            style={{ marginTop: '60px', display: 'flex', justifyContent: 'center', gap: '40px' }}
          >
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>250+</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Active Problems</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>1.2k</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>Builders joined</div>
            </div>
            <div style={{ textAlign: 'center' }}>
              <div style={{ fontSize: '2rem', fontWeight: 700 }}>45</div>
              <div style={{ color: 'var(--text-muted)', fontSize: '0.9rem' }}>MVPs Shipped</div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* Features Grid */}
      <section style={{ padding: '100px 0', background: 'rgba(255,255,255,0.02)' }}>
        <div className="container">
          <div className="grid-auto">
            {features.map((f, i) => (
              <motion.div 
                key={i}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                transition={{ delay: i * 0.1 }}
                className="glass-card"
                style={{ padding: '32px' }}
              >
                <div style={{ 
                  width: '48px', height: '48px', 
                  borderRadius: '12px', background: 'rgba(108, 99, 255, 0.1)',
                  display: 'flex', alignItems: 'center', justifyContent: 'center',
                  marginBottom: '20px', color: 'var(--primary)'
                }}>
                  <f.icon size={24} />
                </div>
                <h3 style={{ marginBottom: '12px' }}>{f.title}</h3>
                <p style={{ color: 'var(--text-muted)', lineHeight: 1.6 }}>{f.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
};

export default Landing;
