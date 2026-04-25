import { useNavigate } from 'react-router-dom';
import TaskFormModal from '../components/TaskFormModal';

export default function AddTaskPage() {
  const navigate = useNavigate();

  return (
    <div>
      <div className="page-header">
       
        <div className="page-title">New Task</div>
      
      </div>
      <TaskFormModal
      
      task={null}
        onClose={() => navigate('/tasks')}
        onSaved={() => navigate('/tasks')}
        inline
      />
    
    </div>
  );
}
