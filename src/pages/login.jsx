import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';

import AuthLayout from '../components/AuthLayout';
import { login } from '../services/auth';

export default function Login() {
  const navigate = useNavigate();

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  const handleLogin = async (e) => {
    e.preventDefault();

    setError('');

    if (!email || !password) {
      setError('Please enter both email and password');
      return;
    }

    try {
      setLoading(true);

      await login(email, password);

      navigate('/');
    } catch (err) {
      console.log(err);

      // 🔥 Firebase real error mapping
      const code = err?.code;

      if (code === 'auth/user-not-found') {
        setError('No account found with this email');
      } else if (code === 'auth/wrong-password') {
        setError('Incorrect password. Try again');
      } else if (code === 'auth/invalid-email') {
        setError('Invalid email format');
      } else if (code === 'auth/too-many-requests') {
        setError('Too many attempts. Try again later');
      } else {
        setError('Login failed. Please try again');
      }
    } finally {
      setLoading(false);
    }
  };

  return (
    <AuthLayout>
      <div className="auth-header">
        <h1>Welcome Back</h1>
        <p>Continue building discipline every day.</p>
      </div>

      {/* 🔥 ERROR DISPLAY */}
      {error && <div className="auth-error">{error}</div>}

      <form className="auth-form" onSubmit={handleLogin}>
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
            placeholder="Enter your password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
        </div>

        <button type="submit" className="primary-btn" disabled={loading}>
          {loading ? 'Signing in...' : 'Sign In'}
        </button>
      </form>

      <p className="auth-footer">
        Don't have an account? <Link to="/signup">Create one</Link>
      </p>
    </AuthLayout>
  );
}
