import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { getToken } from '@/utils/token';
import { API_URI_TASKS, getResponseError } from '@/api/actions';
import TaskForm from '../form/TaskForm';
import Modal from '../ui/Modal';
import { Save } from 'lucide-react';
import { EventTask } from '@/types/TaskType';
import { ErrorType } from '@/types/ErrorType';

import ErrorBlock from '../ui/ErrorBlock';
import LoadingIndicators from '../loading/Loading-indicators';

function CreateTask() {
  const navigate = useNavigate();
  const [error, setError] = useState<ErrorType>();
  const [submitting, setSubmitting] = useState<boolean>(false);

  const handleSubmit = async (formData: EventTask) => {
    setSubmitting(true);
    const token = getToken();
    const newDate = new Date(formData.eventDate + ' ' + formData.eventTime);
    const response = await fetch(`${API_URI_TASKS}/create`, {
      method: 'POST',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
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

  return (
    <Modal onClose={() => navigate('/home')}>
      <TaskForm onSubmit={handleSubmit} data={null}>
        {submitting ? (
          <LoadingIndicators type='threedot' color='#e30d7c' />
        ) : (
          <>
            <button type='submit' className='button'>
              <Save /> Create task
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

export default CreateTask;
