// Alert
export function Alert({ type = 'error', message }) {
  if (!message) return null;
  return <div className={`alert alert-${type}`}>{message}</div>;
}

// Badge for task status
export function StatusBadge({ status }) {
  const map = {

    assigned:   'badge-assigned',
    inProgress: 'badge-inProgress',
    completed:  'badge-completed',
    cancelled:  'badge-cancelled',

  };

  return <span className={`badge ${map[status] || ''}`}>{status}</span>;
}

// Badge for user role

export function RoleBadge({ role }) {

  const map = {
    manager:  'badge-manager',
    teamlead: 'badge-teamlead',
    employee: 'badge-employee',

  };
  return <span className={`badge ${map[role] || ''}`}>{role}</span>;
}

// Avatar
export function Avatar({ src, name }) {

  if (src) {
    return <img className="avatar" src={`http://localhost:3000/uploads/${src}`} alt={name} />;
  }

  return (
    <span className="avatar-placeholder">
      {name ? name[0].toUpperCase() : '?'}
    </span>
  );
}

// Loading spinner
export function Loading() {

  return <div className="loading">Loading…</div>;
}

// Empty state
export function Empty({ icon = '📭', text = 'Nothing here yet.' }) {

  return (
    <div className="empty">

      <div className="empty-icon">{icon}</div>
      {text}
    </div>
  );
}

// Confirm delete modal
export function ConfirmModal({ message, onConfirm, onCancel, loading }) {
  return (
    <div className="modal-overlay">
     
      <div className="modal" style={{ maxWidth: 380 }}>
     
        <div className="modal-header">
          <span className="modal-title">Confirm</span>
          <button className="modal-close" onClick={onCancel}>×</button>
        </div>
        <p style={{ fontSize: 13, color: 'var(--muted)' }}>{message}</p>
     
        <div className="modal-footer">
          <button className="btn btn-outline" onClick={onCancel}>Cancel</button>
          <button className="btn btn-danger" onClick={onConfirm} disabled={loading}>
            {loading ? 'Deleting…' : 'Delete'}
          </button>
     
        </div>
      </div>
    </div>
  );
}
