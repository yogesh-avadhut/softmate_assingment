import { useState } from 'react';

import { useNavigate, Link } from 'react-router-dom';

import { registerUser } from '../api/services';
import { Alert } from '../components/UI';



export default function Register() {
  const navigate = useNavigate();

  const [form, setForm]     = useState({ name: '', email: '', password: '', role: 'employee' });

  const [error, setError]   = useState('');
  const [success, setSuccess] = useState('');

  const [loading, setLoad]  = useState(false);





  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    if (!form.name || !form.email || !form.password || !form.role) {
      setError('All fields are required.');
      return;
    }

    if (form.password.length < 6) {
      setError('Password must be at least 6 characters.');
      return;
    }

    setLoad(true);
    try {
      const res  = await registerUser(form);
      const data = res.data;

      if (data.error) {
        setError(data.message || 'Registration failed.');
        return;
      }

      setSuccess('Account created! Redirecting to login…');
      setTimeout(() => navigate('/login'), 1500);
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
      
        <div className="auth-title">Create Account</div>
        <div className="auth-subtitle">Join TaskFlow</div>

        <Alert type="error"   message={error} />
        <Alert type="success" message={success} />

        <form onSubmit={handleSubmit}>
          <div className="field">
      
            <label>Full Name</label>
            <input name="name" value={form.name} onChange={handleChange} placeholder="John Doe" autoFocus />
          </div>

          <div className="field">
            <label>Email</label>
            <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="you@company.com" />
          </div>

          <div className="field">
            <label>Password</label>
            <input type="password" name="password" value={form.password} onChange={handleChange} placeholder="Min 6 chars" />
          </div>

          <div className="field">
            <label>Role</label>
      
            <select name="role" value={form.role} onChange={handleChange}>
      
              <option value="employee">Employee</option>
              <option value="teamlead">Team Lead</option>
              <option value="manager">Manager</option>
      
            </select>
          </div>

          <button className="btn btn-primary" type="submit" disabled={loading} style={{ width: '100%' }}>
            {loading ? 'Creating…' : 'Create Account'}
          </button>
        </form>

        <div className="auth-link">
          Already have an account? <Link to="/login">Sign In</Link>
        </div>
      </div>
    </div>
  );
}
