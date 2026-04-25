import { useEffect, useState } from 'react';
import { useAuth } from '../context/AuthContext';
import { getAllTasks, getTasksByUser } from '../api/services';
import { Loading, StatusBadge } from '../components/UI';
import { Link } from 'react-router-dom';

export default function Dashboard() {
  
  const { user } = useAuth();
  
  const [tasks, setTasks]   = useState([]);
  
  const [loading, setLoad]  = useState(true);
  
  const [error, setError]   = useState('');

  
  
  const isPrivileged = user?.role === 'manager' || user?.role === 'teamlead';

  useEffect(() => {
    const fetch = async () => {
  
      try {
        let res;
        if (isPrivileged) {
          res = await getAllTasks();
        }
         else {
          res = await getTasksByUser(user.id);
        }

        if (!res.data.error) setTasks(res.data.data || []);
        else setError(res.data.message);
      } 
      catch {
        setError('Failed to load tasks.');
      }
      
      finally {
        setLoad(false);
      }
    };
    fetch();
  }, []);

  const count = (status) => tasks.filter((t) => t.task_status === status).length;

  if (loading) return <Loading />;

  return (
    <div>
      
      <div className="page-header">
        <div>
      
          <div className="page-title"> Hello, {user?.name || user?.role}</div>
          <div className="page-subtitle">{new Date().toDateString()}</div>
      
        </div>
        {isPrivileged && (
          <Link to="/tasks/new" className="btn btn-accent">Add New Task</Link>
        )}
      </div>

      {error && <div className="alert alert-error">{error}</div>}


      <div className="stats-grid">
      
        <div className="stat-card">
          <div className="stat-label">Total Tasks</div>
      
          <div className="stat-value">{tasks.length}</div>
        </div>
      
        <div className="stat-card">
          <div className="stat-label">Assigned</div>
          <div className="stat-value" style={{ color: 'var(--accent)' }}>{count('assigned')}</div>
      
        </div>
        <div className="stat-card">
      
          <div className="stat-label">In Progress</div>
          <div className="stat-value" style={{ color: 'var(--warning)' }}>{count('inProgress')}</div>
      
        </div>
        <div className="stat-card">
      
          <div className="stat-label">Completed</div>
          <div className="stat-value" style={{ color: 'var(--success)' }}>{count('completed')}</div>
      
        </div>
        <div className="stat-card">
      
          <div className="stat-label">Cancelled</div>
          <div className="stat-value" style={{ color: 'var(--danger)' }}>{count('cancelled')}</div>
        </div>
      </div>

      <div className="card">
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: 14 }}>
          <strong>Recent Tasks</strong>
      
          <Link to={isPrivileged ? '/tasks' : '/my-tasks'} style={{ fontSize: 12, color: 'var(--accent)' }}>
            View all →
          </Link>
      
        </div>
        <div className="table-wrap">
      
          <table>
            <thead>
              
              <tr>
                <th>Title</th>
                <th>Status</th>
                <th>Deadline</th>
              </tr>

            </thead>
            <tbody>
              
              {tasks.slice(0, 5).map((t) => (
              
              <tr key={t.id}>
                  <td>{t.title}</td>
                  <td><StatusBadge status={t.task_status} /></td>
                  <td>{t.deadline ? new Date(t.deadline).toLocaleDateString() : '—'}</td>
              
                </tr>
              ))}
              
              {tasks.length === 0 && (
              
              <tr><td colSpan={3} style={{ textAlign: 'center', color: 'var(--muted)', padding: 24 }}>No tasks yet.</td></tr>
              
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
