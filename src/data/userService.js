import { problems } from './problems';

const USERS_KEY = 'cocreatex_users_list';
const SESSION_KEY = 'cocreatex_current_session';

const getAllUsers = () => {
  const stored = localStorage.getItem(USERS_KEY);
  return stored ? JSON.parse(stored) : {};
};

const saveUsers = (users) => {
  localStorage.setItem(USERS_KEY, JSON.stringify(users));
};

const getCurrentSession = () => {
  const stored = localStorage.getItem(SESSION_KEY);
  return stored ? JSON.parse(stored) : null;
};

const saveSession = (user) => {
  localStorage.setItem(SESSION_KEY, JSON.stringify(user));
};

const PROBLEMS_KEY = 'cocreatex_global_problems';

const getGlobalProblems = () => {
  const stored = localStorage.getItem(PROBLEMS_KEY);
  const userProblems = stored ? JSON.parse(stored) : [];
  
  // Combine static and dynamic problems, ensuring no duplicates by ID
  const allMap = new Map();
  problems.forEach(p => allMap.set(String(p.id), p));
  userProblems.forEach(p => allMap.set(String(p.id), p));
  
  return Array.from(allMap.values());
};

export const userService = {
  // Auth
  registerOrLogin: (userData) => {
    const users = getAllUsers();
    const email = userData.email.toLowerCase();
    
    if (users[email]) {
      // User exists, just save their email in session
      saveSession({ email });
      return users[email];
    } else {
      // New user - give them some starter data so it's not empty
      const newUser = {
        ...userData,
        email,
        joined: [1, 14], // Starter problems: Decentralized Carbon & AI Crop Diagnosis
        saved: [19], // AI Radiologist Assistant
        submissions: [7, 24], // AI Tutor & Smart Grid Optimizer
        reputation: 30
      };
      users[email] = newUser;
      saveUsers(users);
      saveSession({ email });
      return newUser;
    }
  },

  getCurrentUser: () => {
    const session = getCurrentSession();
    if (!session) return null;
    const users = getAllUsers();
    return users[session.email] || null;
  },

  logout: () => {
    localStorage.removeItem(SESSION_KEY);
  },

  // Problem Management
  getAllProblems: () => getGlobalProblems(),

  addProblem: (newProblem) => {
    const session = getCurrentSession();
    const stored = localStorage.getItem(PROBLEMS_KEY);
    const userProblems = stored ? JSON.parse(stored) : [];
    const problemId = Date.now();
    
    const problemWithId = {
      ...newProblem,
      id: problemId,
      team: { current: 1, total: 5 },
      status: 'Ideation',
      author: session?.email || 'Guest'
    };
    
    userProblems.push(problemWithId);
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(userProblems));

    // Automatically join and submit the creator's problem
    if (session) {
      const users = getAllUsers();
      const user = users[session.email];
      if (user) {
        if (!user.joined.includes(problemId)) {
          user.joined.push(problemId);
        }
        if (!user.submissions.includes(problemId)) {
          user.submissions.push(problemId);
        }
        user.reputation += 20; // Extra XP for posting
        saveUsers(users);
      }
    }
    
    return problemWithId;
  },

  deleteProblem: (problemId) => {
    const session = getCurrentSession();
    if (!session) return;
    
    // Remove from global list
    let allProblems = getGlobalProblems();
    allProblems = allProblems.filter(p => String(p.id) !== String(problemId));
    localStorage.setItem(PROBLEMS_KEY, JSON.stringify(allProblems));

    // Remove from all users' private lists
    const users = getAllUsers();
    Object.keys(users).forEach(email => {
      const u = users[email];
      if (u.joined) u.joined = u.joined.filter(id => String(id) !== String(problemId));
      if (u.saved) u.saved = u.saved.filter(id => String(id) !== String(problemId));
      if (u.submissions) u.submissions = u.submissions.filter(id => String(id) !== String(problemId));
    });
    saveUsers(users);
  },

  // Actions
  joinTeam: (problemId) => {
    const session = getCurrentSession();
    if (!session) return;
    
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return;
    
    if (!user.joined.includes(problemId)) {
      user.joined.push(problemId);
      user.reputation += 10;
      saveUsers(users);
    }
  },

  saveProblem: (problemId) => {
    const session = getCurrentSession();
    if (!session) return;
    
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return;
    
    if (!user.saved.includes(problemId)) {
      user.saved.push(problemId);
    } else {
      user.saved = user.saved.filter(id => id !== problemId);
    }
    saveUsers(users);
  },

  submitProposal: (problemId) => {
    const session = getCurrentSession();
    if (!session) return;
    
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return;
    
    if (!user.submissions.includes(problemId)) {
      user.submissions.push(problemId);
      saveUsers(users);
    }
  },

  // Getters
  getJoinedProblems: () => {
    const session = getCurrentSession();
    if (!session) return [];
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return [];
    
    const all = getGlobalProblems();
    return all.filter(p => user.joined.includes(p.id) || p.author === session.email);
  },

  getSavedProblems: () => {
    const session = getCurrentSession();
    if (!session) return [];
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return [];
    
    const all = getGlobalProblems();
    return all.filter(p => user.saved.includes(p.id));
  },

  getSubmissions: () => {
    const session = getCurrentSession();
    if (!session) return [];
    const users = getAllUsers();
    const user = users[session.email];
    if (!user) return [];
    
    const all = getGlobalProblems();
    return all.filter(p => user.submissions.includes(p.id) || p.author === session.email);
  }
};
