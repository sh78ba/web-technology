import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './LoginPage.css';
import { collection, getDocs } from 'firebase/firestore';
import { db } from './firebase';
import { useUser } from './UserContext';

const LoginPage = () => {
  const { setUser } = useUser();
  const [email, setEmail] = useState(''); 
  const [password, setPassword] = useState('');
  const [role, setRole] = useState('user');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleLogin = async () => {
    // Validation
    if (!email || !password) {
      setError('Email and password are required');
      return;
    }

    // Custom email validation
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setError('Invalid email format');
      return;
    }

    // Custom password length validation
    if (password.length < 6) {
      setError('Password must be at least 6 characters long');
      return;
    }

    const collectionName = role === 'user' ? 'user' : 'guard';
    const userCollectionRef = collection(db, collectionName);
    const querySnapshot = await getDocs(userCollectionRef);
    const userList = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));

    const user = userList.find(user => user.email === email);

    if (!user) {
      setError('User not found');
      return;
    }

    if (user.password !== password) {
      setError('Incorrect password');
      return;
    }

    setUser(user); 
    navigate(`/${role}/dashboard`);
  };

  return (
    <div className='login'>
    <div className="login-container"> 
      <h2>Login</h2>
      {error && <div className="error-message">{error}</div>}
      <div>
        <label>
          Email:
          <input type="email" value={email} required onChange={(e) => setEmail(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Password:
          <input type="password" value={password} required onChange={(e) => setPassword(e.target.value)} />
        </label>
      </div>
      <div>
        <label>
          Role:
          <select value={role} onChange={(e) => setRole(e.target.value)}>
            <option value="user">User</option>
            <option value="guard">Guard</option>
          </select>
        </label>
      </div>
      <button onClick={handleLogin}>Login</button>
    </div>
    </div>
  );
};

export default LoginPage;
