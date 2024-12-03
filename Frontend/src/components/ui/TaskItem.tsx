import { Link } from 'react-router-dom';
import { Task } from '@/types/TaskType';
import { getFormattedDate } from '@/utils/formattedDate';
import { FilePenLine, Trash2 } from 'lucide-react';

function TaskItem({
  task,
  onDelete,
}: {
  task: Task;
  onDelete: (id: string) => void;
}) {
  return (
    <article className='task-item'>
      <div className='task-item-content'>
        <h2>{task.title}</h2>
        <h4 className='task-item-description'>{task.description}</h4>
        <p className='task-item-date'>
          {getFormattedDate({ eventDate: task.eventDate })}
        </p>
        <p>{task.status}</p>
      </div>
      <p style={{ display: 'flex', justifyContent: 'center' }}>
        <Link to={`/edit/${task._id}`} className='button'>
          <FilePenLine /> Edit task
        </Link>
        <button
          className='button'
          onClick={() => onDelete(task._id)}
          style={{ marginLeft: '10px' }}
        >
          <Trash2 />
        </button>
      </p>
    </article>
  );
}

export default TaskItem;
