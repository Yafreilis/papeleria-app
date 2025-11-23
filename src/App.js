import React, { useEffect, useState } from 'react';
import { initStorage, getSession, saveSession, clearSession } from './utils/storage';
import Login from './components/Login';
import Dashboard from './components/Dashboard';

function App() {
  const [user, setUser] = useState(null);

  useEffect(() => {
    initStorage();
    const s = getSession();
    if (s) setUser(s);
  }, []);

  const handleLogin = (userObj) => {
    setUser(userObj);
    saveSession(userObj);
  };

  const handleLogout = () => {
    setUser(null);
    clearSession();
  };

  return (
    <div className="app-root">
      {!user ? (
        <Login onLogin={handleLogin} />
      ) : (
        <Dashboard user={user} onLogout={handleLogout} />
      )}
    </div>
  );
}

export default App;
