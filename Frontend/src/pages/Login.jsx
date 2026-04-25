

import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';
import { loginUser } from '../api/services';

import { useAuth } from '../context/AuthContext';
import { Alert } from '../components/UI';

import { jwtDecode } from '../utils/jwt';







export default function Login() {

  const { login } = useAuth();
  
  const navigate  = useNavigate();

  const [form, setForm]     = useState({ email: '', password: '' });
  
  const [error, setError]   = useState('');
  
  const [loading, setLoad]  = useState(false);

  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  
  
  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!form.email || !form.password) {
  
      setError('Email and password are required.');
      return;
    }

    setLoad(true);
    try {
      const res = await loginUser(form);
      const data = res.data;

      if (data.error) {
  
        setError(data.errormessage || 'Login failed.');
        return;
      }


  
      const decoded = jwtDecode(data.token);
  
      login(data.token, { id: decoded.id, role: decoded.role, name: decoded.name || '' });
      navigate('/dashboard');
    } 
    
    catch (err) {
      setError(err.response?.data?.message || 'Server error.');
    }
    
    finally {
      setLoad(false);
    }
  };

  return (
    <div className="auth-page">
    
      <div className="auth-box">
        <div className="auth-title">TaskFlow</div>
        <div className="auth-subtitle">Sign in to your account</div>

        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit}>
     
          <div className="field">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={form.email}
              onChange={handleChange}
              placeholder="you@company.com"
              autoFocus
            />
          </div>

          <div className="field">
     
            <label>Password</label>
            <input
              type="password"
              name="password"
              value={form.password}
              onChange={handleChange}
              placeholder="••••••••"
            />
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
     
            {loading ? 'Signing in…' : 'Sign In'}
          </button>
        </form>

        <div className="auth-link">
          Don't have an account? <Link to="/register">Register</Link>
     
        </div>
      </div>
    </div>
  );
}
