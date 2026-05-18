import React from 'react';
import { motion } from 'framer-motion';
import { Award, Shield, Star, Share2, Download, Briefcase, Zap, ExternalLink } from 'lucide-react';
import { userService } from '../data/userService';
import { Link } from 'react-router-dom';

const Profile = () => {
  const currentUser = userService.getCurrentUser();
  const joinedProblems = userService.getJoinedProblems();

  const user = {
    name: currentUser?.name || "Guest Builder",
    role: currentUser?.role === 'owner' ? "Visionary / Product Owner" : currentUser?.role === 'builder' ? "Full Stack Builder" : "Explorer",
    reputation: (currentUser?.joined?.length || 0) * 10 + (currentUser?.reputation || 30),
    consistency: "98%",
    skills: currentUser?.skills && currentUser.skills.length > 0 ? currentUser.skills : ["React", "Node.js", "UI/UX", "Python"],
    badges: currentUser?.role === 'owner' ? ["Top Visionary", "Community Lead"] : ["Top Collaborator", "Early Adopter", "MVP Shipper"],
    projects: joinedProblems.map(p => ({
      id: p.id,
      title: p.title,
      role: p.author === currentUser?.email ? "Owner / Author" : "Contributor",
      status: p.status || "In Progress",
      impact: p.impact || "High"
    })),
    reviews: [
      { from: "Sam", rating: 5, comment: "Amazing technical skills and great communication." },
      { from: "Jo", rating: 5, comment: "Always delivers on time. High accountability." }
    ]
  };

  const initials = user.name
    .split(' ')
    .map(n => n[0])
    .join('')
    .slice(0, 2)
    .toUpperCase();

  return (
    <div className="container" style={{ padding: '40px 0' }}>
      <div style={{ display: 'grid', gridTemplateColumns: '350px 1fr', gap: '40px' }}>
        {/* Profile Info Sidebar */}
        <aside>
          <div className="glass-panel" style={{ padding: '32px', textAlign: 'center', marginBottom: '24px' }}>
            <div style={{ 
              width: '120px', height: '120px', borderRadius: '50%', 
              background: 'linear-gradient(135deg, var(--primary), var(--accent))',
              margin: '0 auto 20px', display: 'flex', alignItems: 'center', justifyContent: 'center',
              fontSize: '3rem', fontWeight: 700, color: 'white',
              boxShadow: '0 0 20px var(--primary-glow)'
            }}>
              {initials}
            </div>
            <h2 style={{ fontSize: '1.5rem', marginBottom: '4px' }}>{user.name}</h2>
            <p style={{ color: 'var(--text-muted)', marginBottom: '20px' }}>{user.role}</p>
            
            <div style={{ display: 'flex', justifyContent: 'center', gap: '12px', marginBottom: '24px' }}>
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--primary)' }}>{user.reputation}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Reputation</div>
              </div>
              <div style={{ width: '1px', background: 'var(--border)' }} />
              <div style={{ textAlign: 'center' }}>
                <div style={{ fontSize: '1.1rem', fontWeight: 700, color: 'var(--secondary)' }}>{user.consistency}</div>
                <div style={{ fontSize: '0.7rem', color: 'var(--text-dim)', textTransform: 'uppercase' }}>Consistency</div>
              </div>
            </div>

            <div style={{ display: 'flex', flexDirection: 'column', gap: '10px' }}>
              <button className="btn-primary" style={{ width: '100%', justifyContent: 'center' }}>
                <Share2 size={18} /> Share Portfolio
              </button>
              <button className="btn-outline" style={{ width: '100%', justifyContent: 'center' }}>
                <Download size={18} /> Download CV
              </button>
            </div>
          </div>

          <div className="glass-card" style={{ padding: '24px' }}>
            <h3 style={{ fontSize: '1rem', marginBottom: '16px', display: 'flex', alignItems: 'center', gap: '8px' }}>
              <Shield size={18} color="var(--primary)" />
              Reputation Badges
            </h3>
            <div style={{ display: 'flex', flexWrap: 'wrap', gap: '8px' }}>
              {user.badges.map(b => (
                <span key={b} className="badge badge-primary" style={{ fontSize: '0.65rem' }}>{b}</span>
              ))}
            </div>
          </div>
        </aside>

        {/* Portfolio Content */}
        <div>
          <section style={{ marginBottom: '40px' }}>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Briefcase size={24} color="var(--accent)" />
              Project Portfolio
            </h2>
            <div className="grid-auto">
              {user.projects.map(p => (
                <motion.div 
                  key={p.id}
                  whileHover={{ scale: 1.02 }}
                  className="glass-card" 
                  style={{ padding: '24px' }}
                >
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '16px' }}>
                    <span className="badge badge-success" style={{ fontSize: '0.6rem' }}>{p.status}</span>
                    <ExternalLink size={16} color="var(--text-dim)" />
                  </div>
                  <h3 style={{ fontSize: '1.1rem', marginBottom: '8px' }}>{p.title}</h3>
                  <div style={{ fontSize: '0.85rem', color: 'var(--text-muted)', marginBottom: '12px' }}>Role: {p.role}</div>
                  <div style={{ display: 'flex', alignItems: 'center', gap: '6px', color: 'var(--primary)', fontSize: '0.8rem', fontWeight: 600 }}>
                    <Zap size={14} /> {p.impact} Impact Contribution
                  </div>
                </motion.div>
              ))}
            </div>
          </section>

          <section>
            <h2 style={{ fontSize: '1.8rem', marginBottom: '24px', display: 'flex', alignItems: 'center', gap: '12px' }}>
              <Star size={24} color="var(--secondary)" />
              Peer Reviews
            </h2>
            <div style={{ display: 'flex', flexDirection: 'column', gap: '16px' }}>
              {user.reviews.map((r, i) => (
                <div key={i} className="glass-card" style={{ padding: '20px' }}>
                  <div style={{ display: 'flex', justifyContent: 'space-between', marginBottom: '10px' }}>
                    <div style={{ fontWeight: 600 }}>{r.from}</div>
                    <div style={{ display: 'flex', gap: '2px' }}>
                      {[...Array(r.rating)].map((_, i) => <Star key={i} size={12} fill="var(--primary)" color="var(--primary)" />)}
                    </div>
                  </div>
                  <p style={{ color: 'var(--text-muted)', fontSize: '0.9rem', fontStyle: 'italic' }}>"{r.comment}"</p>
                </div>
              ))}
            </div>
          </section>
        </div>
      </div>
    </div>
  );
};

export default Profile;
