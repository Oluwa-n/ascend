import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { signup } from '../services/auth';

export default function Signup() {
  const navigate = useNavigate();

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleSignup = async (e) => {
    e.preventDefault();
    setError('');

    // 🔥 basic validation
    if (!name || !email || !password) {
      setError('Please fill in all fields');
      return;
    }

    if (password.length < 6) {
      setError('Password must be at least 6 characters');
      return;
    }

    try {
      setLoading(true);

      await signup(name, email, password);

      navigate('/home');
    } catch (err) {
      console.log(err);

      const code = err?.code;

      if (code === 'auth/email-already-in-use') {
        setError('Email already in use');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (code === 'auth/weak-password') {
        setError('Password is too weak');
      } else {
        setError('Signup failed. Try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1>Create Account</h1>
        <p>Start your discipline journey today.</p>
      </div>

      {/* 🔥 ERROR UI */}
      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleSignup}>
        <div className="input-group">
          <label>Full Name</label>
          <input
            type="text"
            placeholder="John Doe"
            value={name}
            onChange={(e) => setName(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Email</label>
          <input
            type="email"
            placeholder="Enter your email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
          />
        </div>

        <div className="input-group">
          <label>Password</label>
          <input
            type="password"
            placeholder="Create password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Creating...' : 'Create Account'}
        </button>
      </form>

      <p className="auth-footer">
        Already have an account? <Link to="/login">Sign in</Link>
      </p>
    </AuthLayout>
  );
}
