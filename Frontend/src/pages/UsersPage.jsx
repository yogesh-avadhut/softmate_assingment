
import { useEffect, useState } from 'react';

import { getAllUsers } from '../api/services';
import { Loading, Empty, RoleBadge, Avatar } from '../components/UI';


export default function UsersPage() {


  const [users, setUsers] = useState([]);

  const [loading, setLoad] = useState(true);
  const [error, setError] = useState('');

  const [search, setSearch] = useState('');


  const [roleFilter, setRole] = useState('');








  useEffect(() => {
    getAllUsers()
      .then((r) => {
        if (!r.data.error) setUsers(r.data.data || []);
        else setError(r.data.message);
      })

      .catch(() => setError('Failed to load users.'))

      .finally(() => setLoad(false));
  }, []);

  const filtered = users.filter((u) => {

    const matchSearch = u.name.toLowerCase().includes(search.toLowerCase()) ||
      u.email.toLowerCase().includes(search.toLowerCase());

    const matchRole = roleFilter ? u.role === roleFilter : true;

    return matchSearch && matchRole;
  });

  if (loading) return <Loading />;

  return (
    <div>

      <div className="page-header">

        <div>
          <div className="page-title">Users</div>
          <div className="page-subtitle">{filtered.length} user(s)</div>
        </div>

      </div>

      {error && <div className="alert alert-error">{error}</div>}

      <div className="toolbar">

        <input
          placeholder="Search by name or email…"
          value={search}
          onChange={(e) => setSearch(e.target.value)}
        />
        <select value={roleFilter} onChange={(e) => setRole(e.target.value)} style={{ maxWidth: 180 }}>

          <option value="">All Roles</option>
          <option value="manager">Manager</option>
          <option value="teamlead">Team Lead</option>
          <option value="employee">Employee</option>

        </select>
        {(search || roleFilter) && (
          <button className="btn btn-outline btn-sm" onClick={() => { setSearch(''); setRole(''); }}>
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
                <th>User</th>
                <th>Email</th>
                <th>Role</th>
                <th>Joined</th>

              </tr>
            </thead>

            <tbody>
              {filtered.length === 0 && (
                <tr>
                  <td colSpan={5}><Empty icon="👥" text="No users found." /></td>
                </tr>
              )}
              {filtered.map((u, i) => (
                <tr key={u.id}>
                  <td style={{ color: 'var(--muted)' }}>{i + 1}</td>
                  <td>

                    <div style={{ display: 'flex', alignItems: 'center', gap: 10 }}>
                      <Avatar src={u.profile_pic} name={u.name} />
                      <strong>{u.name}</strong>
                    </div>
                  </td>

                  <td>{u.email}</td>
                  <td><RoleBadge role={u.role} /></td>
                  <td>{u.created_at ? new Date(u.created_at).toLocaleDateString() : '—'}</td>

                </tr>
              ))}


            </tbody>

          </table>


        </div>
      </div>
    </div>
  );
}
