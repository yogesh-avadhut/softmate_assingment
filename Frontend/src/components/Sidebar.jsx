import { NavLink, useNavigate } from 'react-router-dom';

import { useAuth } from '../context/AuthContext';

const MANAGER_LINKS = [

  { to: '/dashboard',  label: ' Dashboard' },
  { to: '/tasks',      label: ' Tasks' },
  { to: '/tasks/new',  label: ' Add Task' },

  { to: '/users',      label: ' Users' },

];

const EMPLOYEE_LINKS = [
  { to: '/dashboard',       label: ' Dashboard' },
  { to: '/my-tasks',        label: ' My Tasks' },
  { to: '/profile',         label: ' Profile' },
];

const TEAMLEAD_LINKS = [
  { to: '/dashboard',  label: ' Dashboard' },
  { to: '/tasks',      label: ' Tasks' },
  { to: '/tasks/new',  label: ' Add Task' },
  { to: '/users',      label: ' Users' },
  { to: '/profile',    label: ' Profile' },
];

function getLinks(role) {

  if (role === 'manager')  return MANAGER_LINKS;
  
  if (role === 'teamlead') return TEAMLEAD_LINKS;
  
  return EMPLOYEE_LINKS;
}

export default function Sidebar() {
  
  const { user, logout } = useAuth();
  
  const navigate = useNavigate();

  const handleLogout = () => {
  
    logout();
    navigate('/login');
  };

  const links = getLinks(user?.role);

  return (
  
  <aside className="sidebar">
      <div className="sidebar-logo">Task<span> Management</span></div>

      <nav className="sidebar-nav">
  
        {links.map((link) => (
          <NavLink
  
          key={link.to}
            to={link.to}
            className={({ isActive }) => `nav-item ${isActive ? 'active' : ''}`}
          >
            {link.label}
  
          </NavLink>
        ))}
      </nav>

      <div className="sidebar-footer">
  
        <div className="sidebar-user">
          <strong>{user?.name || 'User'}</strong>
          {user?.role}
  
        </div>
        <button className="btn btn-outline" style={{ width: '100%', fontSize: 12, color:'white' }} onClick={handleLogout}>
          Logout
        </button>
  
      </div>
    </aside>
  );
}
