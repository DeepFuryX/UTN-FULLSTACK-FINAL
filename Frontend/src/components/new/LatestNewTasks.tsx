import { useEffect, useState } from 'react';
import { Task } from '@/types/TaskType';
import TaskItem from '../ui/TaskItem';

import { getToken } from '@/utils/token';
import { ErrorType } from '@/types/ErrorType';
import { API_URI_TASKS, getResponseError } from '@/api/actions';

import ErrorBlock from '../ui/ErrorBlock';
import Loading from '../loading/Loading';

function LatestNewTasks() {
  const [loading, setLoading] = useState<boolean>(false);
  const [tasks, setTasks] = useState<Task[]>();
  const [error, setError] = useState<ErrorType>();

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const token = getToken();
    fetch(API_URI_TASKS, {
      headers: {
        'Authorization': `Bearer ${token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log({ code: '401', message: res.msg });
          setError(getResponseError({ status: 401, msg: res.msg }));
        } else {
          const newData = res.data.map((item: Task) => ({
            _id: item._id,
            title: item.title,
            description: item.description,
            status: item.status,
            createdAt: new Date(item.createdAt).getTime(),
            eventDate: item.eventDate,
          }));
          setTasks(newData);
        }
      })
      .then(() => setLoading(false))
      .catch((error) => setError(getResponseError(error)))
      .finally(() => setLoading(false));
  };

  const onDeleteTask = (id: string) => {
    setLoading(true);
    const token = getToken();
    fetch(`${API_URI_TASKS}/delete/${id}`, {
      method: 'DELETE',
      headers: {
        'Authorization': `Bearer ${token}`,
        'Content-type': 'application/json',
      },
      body: JSON.stringify({
        _id: id,
      }),
    })
      .then(() => setLoading(false))
      .catch((error) => setError(getResponseError(error)))
      .finally(() => fetchTasks());
  };

  if (error) {
    return <ErrorBlock title={error.code} message={error.message} />;
  }

  if (loading) {
    return <Loading color='#e30d7c' isLoading />;
  }

  const latestTasks = tasks
    ?.sort((x, y) => y.createdAt - x.createdAt)
    .slice(0, 4);

  return (
    <section className='content-section' id='new-tasks-section'>
      <header>
        <h2>Recently added tasks</h2>
      </header>
      <ul className='tasks-list'>
        {latestTasks &&
          latestTasks.map((task) => (
            <li key={task._id}>
              <TaskItem key={task._id} task={task} onDelete={onDeleteTask} />
            </li>
          ))}
      </ul>
    </section>
  );
}

export default LatestNewTasks;
