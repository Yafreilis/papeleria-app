// src/components/Login.js
import React, { useState } from 'react';
import { getUsers } from '../utils/storage';

function Login({ onLogin }) {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    const users = getUsers();
    const found = users.find(u => u.username === username && u.password === password);
    if (!found) {
      setError('Usuario o contraseña incorrectos');
      return;
    }
    onLogin({ username: found.username, role: found.role, name: found.name });
  };

  return (
    <div className="login-wrap">
      <div className="login-card">
        <h2 style={{marginTop:0}}>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <input placeholder="Usuario" value={username} onChange={e => setUsername(e.target.value)} />
          <input placeholder="Contraseña" type="password" value={password} onChange={e => setPassword(e.target.value)} />
          <div style={{display:'flex', gap:10}}>
            <button className="btn btn-primary" type="submit">Entrar</button>
            <button className="btn btn-secondary" type="button" onClick={() => { setUsername(''); setPassword(''); setError(''); }}>Limpiar</button>
          </div>
        </form>
        {error && <p style={{color:'red', marginTop:10}}>{error}</p>}
        <hr />
        <small>Usuario admin: <b>admin</b> / admin123 · Empleado: <b>empleado</b> / empleado123</small>
      </div>
    </div>
  );
}

export default Login;
