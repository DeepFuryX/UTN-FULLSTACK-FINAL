import { useEffect, useState } from 'react';
import { Link, useNavigate, useParams } from 'react-router-dom';
import Modal from '../ui/Modal';
import { EventTask, Task } from '@/types/TaskType';
import TaskForm from '../form/TaskForm';

import { Save } from 'lucide-react';
import { API_URI_TASKS, getResponseError } from '@/api/actions';
import { getToken } from '@/utils/token';
import { ErrorType } from '@/types/ErrorType';
import ErrorBlock from '../ui/ErrorBlock';
import LoadingIndicators from '../loading/Loading-indicators';

const getEditData = (data: Task) => {
  const newFormatDate = data.eventDate;
  const date = newFormatDate.toString().split('T')[0];
  const time = newFormatDate.toString().split('T')[1].split('.')[0];
  return {
    _id: data._id,
    title: data.title,
    description: data.description,
    status: data.status,
    eventDate: date,
    eventTime: time,
  };
};

function EditTask() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [loading, setLoading] = useState<boolean>(false);
  const [error, setError] = useState<ErrorType>();
  const [editData, setEditData] = useState<EventTask>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  useEffect(() => {
    setLoading(true);
    if (id) {
      fetchTask(id);
    }
  }, [id]);

  const fetchTask = async (id: string) => {
    const token = getToken();
    await fetch(`${API_URI_TASKS}/${id}`, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        setEditData(getEditData(res.data[0]));
      })
      .then(() => setLoading(false))
      .catch((error) => setError(getResponseError(error)))
      .finally(() => setLoading(false));
  };

  const handleSubmit = async (formData: EventTask) => {
    setSubmitting(true);
    const token = getToken();
    const newDate = new Date(formData.eventDate + ' ' + formData.eventTime);
    const response = await fetch(`${API_URI_TASKS}/edit/${id}`, {
      method: 'PUT',
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
        title: formData.title,
        description: formData.description,
        status: formData.status,
        eventDate: newDate,
      }),
    });

    if (!response.ok) {
      const newError = getResponseError(response);
      setError(newError);
      setSubmitting(false);
    } else {
      const responseData = await response.json();
      if (responseData) {
        navigate('/home');
      }
    }
  };

  if (error) {
    return <ErrorBlock title={error.code} message={error.message} />;
  }

  if (loading) {
    return (
      <div
        style={{
          display: 'flex',
          justifyContent: 'center',
          alignContent: 'center',
          marginTop: '12rem',
        }}
      >
        <LoadingIndicators type='riple' color='#e30d7c' />
      </div>
    );
  }

  return (
    <Modal onClose={() => navigate('/home')}>
      <TaskForm onSubmit={handleSubmit} data={editData || null}>
        {submitting ? (
          <LoadingIndicators type='threedot' color='#e30d7c' />
        ) : (
          <>
            <button
              type='submit'
              className='button'
              style={{ marginTop: '2rem', marginBottom: '1rem' }}
            >
              <Save /> Edit task
            </button>
          </>
        )}

        {!submitting && (
          <Link to='/home' className='button-text'>
            Cancel
          </Link>
        )}
      </TaskForm>
    </Modal>
  );
}

export default EditTask;
