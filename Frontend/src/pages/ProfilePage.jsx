import { useState, useRef } from 'react';

import { useAuth } from '../context/AuthContext';

import { uploadProfilePic } from '../api/services';

import { Alert, Avatar } from '../components/UI';

export default function ProfilePage() {

  const { user, login, token } = useAuth();
  const fileRef = useRef();

  const [preview, setPreview] = useState(null);

  const [file, setFile]       = useState(null);
  
  const [loading, setLoad]    = useState(false);


  const [error, setError]     = useState('');
  
  const [success, setSuccess] = useState('');

  
  
  
  
  
  const handleFileChange = (e) => {
    const f = e.target.files[0];
    if (!f) return;
    setFile(f);
    setPreview(URL.createObjectURL(f));
  };

  const handleUpload = async () => {
  
    if (!file) { setError('Please select a file first.'); return; }
    setError(''); setSuccess('');
    setLoad(true);
    try
     {
      const form = new FormData();
      form.append('profile_pic', file);
      const res = await uploadProfilePic(user.id, form);
      if (res.data.error) {
        setError(res.data.errormessage || 'Upload failed.');
        return;
      }
      setSuccess('Profile picture updated!');
    

      const updated = { ...user, profile_pic: res.data.file };
      login(token, updated);
      setFile(null);
    } 
    catch {
      setError('Upload failed.');
    } 
    
    finally {
      setLoad(false);
    }
  };

  return (
    <div>
    
      <div className="page-header">
        <div className="page-title">Profile</div>
      </div>

      <div className="card" style={{ maxWidth: 480 }}>
    
        <Alert type="error"   message={error} />
        <Alert type="success" message={success} />

        <div style={{ display: 'flex', alignItems: 'center', gap: 18, marginBottom: 24 }}>
          {preview ? (
            <img src={preview} alt="preview" className="avatar" style={{ width: 64, height: 64 }} />
          ) : (
            <Avatar src={user?.profile_pic} name={user?.name} />
          )}
    
          <div>
            <strong style={{ fontSize: 16 }}>{user?.name}</strong>
            <div style={{ fontSize: 12, color: 'var(--muted)', marginTop: 2 }}>{user?.role} · ID #{user?.id}</div>
          </div>
    
        </div>

        <div className="field">
          <label>Update Profile Picture</label>
    
          <input
            ref={fileRef}
            type="file"
            accept="image/*"
            onChange={handleFileChange}
            style={{ border: 'none', padding: 0 }}
          />
        </div>

        <button
          className="btn btn-primary"
    
          onClick={handleUpload}
          disabled={loading || !file}
        >
          {loading ? 'Uploading…' : 'Upload Photo'}
        </button>
    
      </div>
    </div>
  );
}
