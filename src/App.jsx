import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom';
import { supabase } from './supabase';

import Landing from './pages/Landing';
import Onboarding from './pages/Onboarding';
import Hub from './pages/Hub';
import Workspace from './pages/Workspace';
import Profile from './pages/Profile';
import Navbar from './components/Navbar';
import { userService } from './data/userService';

function App() {
  const [user, setUser] = useState(userService.getCurrentUser());

  async function checkConnection() {
    const { data, error } = await supabase
      .from('test')
      .select('*');

    console.log('SUPABASE DATA:', data);
    console.log('SUPABASE ERROR:', error);
  }

  useEffect(() => {
    const session = userService.getCurrentUser();
    if (session) {
      setUser(session);
    }
    
    // Supabase Connection Test
    checkConnection();
  }, []);

  return (
    <Router>
      <div className="app-container">
        <Navbar user={user} />
        <main>
          <Routes>
            <Route path="/" element={<Landing />} />
            <Route path="/onboarding" element={<Onboarding setUser={setUser} />} />
            <Route path="/hub" element={<Hub user={user} />} />
            <Route path="/workspace/:id" element={<Workspace />} />
            <Route path="/profile" element={<Profile />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;