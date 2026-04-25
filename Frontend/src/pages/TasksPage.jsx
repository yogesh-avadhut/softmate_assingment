
import { useEffect, useState } from 'react';
import { getAllTasks, deleteTask, updateTaskStatus } from '../api/services';

import { Loading, Empty, StatusBadge, ConfirmModal } from '../components/UI';
import TaskFormModal from '../components/TaskFormModal';


export default function TasksPage() {


  const [tasks, setTasks]       = useState([]);
  const [filtered, setFiltered] = useState([]);

  const [loading, setLoad]      = useState(true);
  const [error, setError]       = useState('');

  const [search, setSearch]     = useState('');
  const [statusFilter, setStatus] = useState('');


  const [showForm, setShowForm]     = useState(false);
  
  const [editTask, setEditTask]     = useState(null);
  
  const [deleteId, setDeleteId]     = useState(null);
  
  const [deleting, setDeleting]     = useState(false);

  
  
  
  
  
  
  const fetchTasks = async () => {
    setLoad(true);
    try {
      const res = await getAllTasks();
      if (!res.data.error) {
        setTasks(res.data.data || []);
      }
       else {
        setError(res.data.message);
      }
    } 
    
    catch {
      setError('Failed to load tasks.');
    }
    
    finally {
      setLoad(false);
    }
  };

  useEffect(() => { fetchTasks(); }, []);


  useEffect(() => {
    let list = [...tasks];

    if (search)       list = list.filter((t) => t.title.toLowerCase().includes(search.toLowerCase()));
    if (statusFilter) list = list.filter((t) => t.task_status === statusFilter);

    setFiltered(list);
  }, [tasks, search, statusFilter]);

  const handleDelete = async () => {

    setDeleting(true);
    
    try {
      await deleteTask(deleteId);
      setDeleteId(null);
      fetchTasks();
    }
     catch {
      setError('Delete failed.');
    }
    
    finally {
      setDeleting(false);
    }
  };

  const handleStatusChange = async (id, status) => {
    
    try {
      await updateTaskStatus({ id, task_status: status });
      fetchTasks();
    }
    
    catch {
      setError('Status update failed.');
    }
  };

  if (loading) return <Loading />;

  return (
    <div>
    
      <div className="page-header">
        <div>
          <div className="page-title">Tasks</div>
          <div className="page-subtitle">{filtered.length} task(s)</div>
        </div>
        <button className="btn btn-accent" onClick={() => { setEditTask(null); setShowForm(true); }}>
           New Task
        </button>
      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">
        <input
          placeholder="Search by title…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />

        <select value={statusFilter} onChange={(e) => setStatus(e.target.value)} style={{ maxWidth: 180 }}>
        
          <option value="">All Statuses</option>
          <option value="assigned">Assigned</option>
          <option value="inProgress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        
        </select>
        {(search || statusFilter) && (
          
          <button className="btn btn-outline btn-sm" onClick={() => { setSearch(''); setStatus(''); }}>
            Clear
          </button>
        )}
      </div>

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
                <th>Assigned To</th>
              <th>Actions</th>
              </tr>
      
            </thead>
            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={7}><Empty icon="📋" text="No tasks found." /></td>
                </tr>
              )}
      
              {filtered.map((t, i) => (
                <tr key={t.id}>
                  <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                  <td><strong>{t.title}</strong></td>
                  <td style={{ maxWidth: 220, overflow: 'hidden', textOverflow: 'ellipsis', whiteSpace: 'nowrap' }}>
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
                  <td>{t.userId}</td>
                  <td>
      
                    <div style={{ display: 'flex', gap: 6 }}>
                      <button
                        className="btn btn-outline btn-sm"
                        onClick={() => { setEditTask(t); setShowForm(true); }}
                      >
                        Edit
                      </button>
      
                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => setDeleteId(t.id)}
                      >
                        Delete
                      </button>
      
                    </div>
                  </td>
                </tr>
              ))}
      
      
            </tbody>
          </table>
      
        </div>
      </div>

      {showForm && (
      
      <TaskFormModal
          task={editTask}
          onClose={() => { setShowForm(false); setEditTask(null); }}
          onSaved={() => { setShowForm(false); setEditTask(null); fetchTasks(); }}
        />
      )}

      {deleteId && (
        <ConfirmModal
          message="Are you sure you want to delete this task? This cannot be undone."
      
          onConfirm={handleDelete}
          onCancel={() => setDeleteId(null)}
          loading={deleting}
        />
      )}


    </div>
  );
}
