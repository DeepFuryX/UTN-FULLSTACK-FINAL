import { useEffect, useState } from 'react';
import { EventTask } from '@/types/TaskType';

function TaskForm({
  onSubmit,
  data,
  children,
}: {
  data: EventTask | null;
  onSubmit: any;
  children: any;
}) {
  const [title, setTitle] = useState('');
  const [description, setDescription] = useState('');
  const [eventDate, setEventDate] = useState('');
  const [eventTime, setEventTime] = useState('');
  const [status, setStatus] = useState('Todo');

  useEffect(() => {
    if (data) {
      setTitle(data?.title ?? '');
      setDescription(data?.description ?? '');
      setEventDate(data?.eventDate ?? '');
      setEventTime(data?.eventTime ?? '');
      setStatus(data?.status ?? 'Todo');
    }
  }, [data]);

  function onSubmitHandler(e: any) {
    e.preventDefault();
    onSubmit({
      title,
      description,
      eventDate,
      eventTime,
      status,
    });
  }

  return (
    <form onSubmit={(e) => onSubmitHandler(e)} id='task-form'>
      <p className='control'>
        <label htmlFor='Title'>Task Name</label>
        <input
          type='text'
          id='Title'
          name='Title'
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          required
        />
      </p>
      <p className='control'>
        <label htmlFor='description'>Description</label>
        <textarea
          id='description'
          name='description'
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          required
        ></textarea>
      </p>
      <div className='controls-row'>
        <p className='control'>
          <label htmlFor='date'>Date</label>
          <input
            type='date'
            id='eventDate'
            name='eventDate'
            onChange={(e) => setEventDate(e.target.value)}
            defaultValue={eventDate}
            required
          />
        </p>

        <p className='control'>
          <label htmlFor='time'>Time</label>
          <input
            type='time'
            id='eventTime'
            name='eventTime'
            onChange={(e) => setEventTime(e.target.value)}
            defaultValue={eventTime}
            required
          />
        </p>
      </div>
      <div className='control'>
        <label htmlFor='status'>Status</label>
        <select
          id='status'
          value={status}
          onChange={(e) => setStatus(e.target.value)}
          style={{ height: '40px', width: '300px', fontSize: '16px' }}
          required
        >
          <option value='Todo'>Todo</option>
          <option value='Running'>Running</option>
          <option value='Done'>Done</option>
        </select>
      </div>
      <p className='form-actions'>{children}</p>
    </form>
  );
}

export default TaskForm;
