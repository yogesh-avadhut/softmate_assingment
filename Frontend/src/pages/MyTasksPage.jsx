
import { useEffect, useState } from 'react';

import { getTasksByUser, updateTaskStatus } from '../api/services';
import { useAuth } from '../context/AuthContext';

import { Loading, Empty, StatusBadge } from '../components/UI';



export default function MyTasksPage() {

  
  const { user } = useAuth();

  const [tasks, setTasks]   = useState([]);

  const [loading, setLoad]  = useState(true);

  const [error, setError]   = useState('');

  const [search, setSearch] = useState('');





const fetchTasks = async () => {
      setLoad(true);
    try {
      const res = await getTasksByUser(user.id);
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

  useEffect(() => { fetchTasks(); }, []);

  const handleStatusChange = async (id, status) => {
    try {
      await updateTaskStatus({ id, task_status: status });
      fetchTasks();
    }
    
    catch {
      setError('Status update failed.');
    }

  };


  const filtered = tasks.filter((t) =>
    t.title.toLowerCase().includes(search.toLowerCase())
  );

  if (loading) return <Loading />;

  return (
    <div>
    
      <div className="page-header">
        <div>
    
          <div className="page-title">My Tasks</div>
          <div className="page-subtitle">{filtered.length} task(s) assigned to you</div>
    
        </div>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">
    
        <input
          placeholder="Search tasks…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
      </div>

      {filtered.length === 0 && !loading ? (
    
    <Empty icon="" text="No tasks assigned to you." />
      ) : (
        <div className="card" style={{ padding: 0 }}>
          <div className="table-wrap">
            <table>
  
              <thead>

                <tr>
                  <th>#</th>
                  <th>Title</th>
                  <th>Description</th>
                  <th>Status</th>
                  <th>Deadline</th>
                </tr>

              </thead>
         
              <tbody>
                {filtered.map((t, i) => (
                  <tr key={t.id}>
                    <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                    <td><strong>{t.title}</strong></td>
                    <td style={{ maxWidth: 260, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
                      {t.description}
                    </td>
                    <td>
                      <select
                        value={t.task_status}
                        onChange={(e) => handleStatusChange(t.id, e.target.value)}
                        style={{ width: 'auto', padding: '4px 8px', fontSize: 12 }}
                      >
         
                        <option value="assigned">Assigned</option>
                        <option value="inProgress">In Progress</option>
                        <option value="completed">Completed</option>
                        <option value="cancelled">Cancelled</option>
         
                      </select>
                    </td>
                    <td>{t.deadline ? new Date(t.deadline).toLocaleDateString() : '—'}</td>
                  </tr>
                ))}
         
              </tbody>
            </table>
         
         
          </div>
        </div>
      )}
    </div>
  );
}
