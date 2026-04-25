import { useState, useEffect } from 'react';

import { Alert } from './UI';
import { addTask, updateTask, getAllUsers } from '../api/services';

const EMPTY = { title: '', description: '', task_status: 'assigned', deadline: '', userId: '' };

export default function TaskFormModal({ task, onClose, onSaved }) {
  
  const isEdit = Boolean(task);

  const [form, setForm]     = useState(isEdit ? {
  
    id:          task.id,
    title:       task.title,
    description: task.description,
    task_status: task.task_status,
    deadline:    task.deadline ? task.deadline.slice(0, 10) : '',
    userId:      task.userId,

  } : EMPTY);

  const [users, setUsers]   = useState([]);
  
  const [error, setError]   = useState('');
  const [loading, setLoad]  = useState(false);


  useEffect(() => {
  
    getAllUsers()
      .then((r) => { if (!r.data.error) setUsers(r.data.data || []); })
      .catch(() => {});
  }, []);

  
  const handleChange = (e) => setForm({ ...form, [e.target.name]: e.target.value });

  const handleSubmit = async (e) => {
  
    e.preventDefault();
    setError('');

    const { title, description, task_status, deadline, userId } = form;
  
    if (!title || !description || !task_status || !deadline || !userId) {
  
      setError('All fields are required.');
      return;
    }

  
  setLoad(true);

  try {
      let res;
      if (isEdit) {
        res = await updateTask(form);
      } else {
        res = await addTask({ title, description, task_status, deadline, userId });
      }

      if (res.data.error) {
        setError(res.data.message || 'Failed.');
        return;
      }

      onSaved();
    }
    
    catch (err) {
      setError(err.response?.data?.message || 'Server error.');
    }
    
    finally {
      setLoad(false);
    }
  };

  return (
    
    <div className="modal-overlay">
    
      <div className="modal">
        <div className="modal-header">
    
          <span className="modal-title">{isEdit ? 'Edit Task' : 'Add New Task'}</span>
          <button className="modal-close" onClick={onClose}>×</button>
    
        </div>

        <Alert type="error" message={error} />

        <form onSubmit={handleSubmit}>
    
          <div className="form-grid">
            <div className="field full">
              <label>Title</label>
              <input name="title" value={form.title} onChange={handleChange} placeholder="Task title" />
            </div>

            <div className="field full">
    
              <label>Description</label>
              <textarea name="description" value={form.description} onChange={handleChange} placeholder="Describe the task…" />
            </div>

            <div className="field">
    
              <label>Status</label>
    
              <select name="task_status" value={form.task_status} onChange={handleChange}>
                <option value="assigned">Assigned</option>
                <option value="inProgress">In Progress</option>
                <option value="completed">Completed</option>
                <option value="cancelled">Cancelled</option>
              </select>
    
            </div>

            <div className="field">
    
              <label>Deadline</label>
              <input type="date" name="deadline" value={form.deadline} onChange={handleChange} />
            </div>

            <div className="field full">
    
              <label>Assign To</label>
              <select name="userId" value={form.userId} onChange={handleChange}>
    
                <option value="">— Select user —</option>
                {users.map((u) => (
                  <option key={u.id} value={u.id}>{u.name} ({u.role})</option>
    
    ))}
              </select>
            </div>
          </div>

          <div className="modal-footer">
    
            <button type="button" className="btn btn-outline" onClick={onClose}>Cancel</button>
    
            <button type="submit" className="btn btn-primary" disabled={loading}>
              {loading ? 'Saving…' : isEdit ? 'Update Task' : 'Create Task'}
            </button>
    
          </div>
        </form>
      </div>
    </div>
  );
}
