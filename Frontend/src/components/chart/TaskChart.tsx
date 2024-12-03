import { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';

import { ChartType } from '@/types/ChartType';
import Header from '../ui/Header';
import TaskPieChart from './TaskPieChart';

import meetupImg from '../../assets/meetup.jpg';
import { LayoutDashboard } from 'lucide-react';
import { ErrorType } from '@/types/ErrorType';
import { getToken } from '@/utils/token';
import { API_URI_TASKS, getResponseError } from '@/api/actions';
import Loading from '../loading/Loading';
import ErrorBlock from '../ui/ErrorBlock';
import { Task } from '@/types/TaskType';

function TaskChart() {
  const [data, setData] = useState<ChartType[]>();
  const [error, setError] = useState<ErrorType>();
  const [loading, setLoading] = useState<boolean>(false);

  useEffect(() => {
    fetchTasks();
  }, []);

  const fetchTasks = async () => {
    setLoading(true);
    const token = getToken();
    fetch(API_URI_TASKS, {
      headers: {
        Authorization: `Bearer ${token}`,
        'content-type': 'application/json',
      },
    })
      .then((res) => res.json())
      .then((res) => {
        if (res.error) {
          console.log({ code: '401', message: res.msg });
          setError(getResponseError({ status: 401, msg: res.msg }));
        } else {
          const chartData = [];
          const newData = res.data.map((item: Task) => ({
            id: item.status,
            status: item.status,
          }));
          const todo = newData.filter((item: Task) => item.status === 'Todo');
          chartData.push({ id: 'todo', count: todo.length, fill: '#8884d8' });
          const running = newData.filter(
            (item: Task) => item.status === 'Running'
          );
          chartData.push({
            id: 'running',
            count: running.length,
            fill: '#d0ed57',
          });
          const done = newData.filter((item: Task) => item.status === 'Done');
          chartData.push({ id: 'done', count: done.length, fill: '#82ca9d' });
          setData(chartData);
        }
      })
      .then(() => setLoading(false))
      .catch((error) => setError(getResponseError(error)))
      .finally(() => setLoading(false));
  };

  return (
    <div
      style={{
        width: '100%',
        height: '100vh',
        textAlign: 'center',
        margin: '0 auto',
      }}
    >
      <Header>
        <Link to='/dashboard' className='button'>
          <LayoutDashboard />
          Go to Dashboard
        </Link>
      </Header>
      <section
        className='content-section'
        id='overview-section'
        style={{ backgroundImage: `url(${meetupImg})` }}
      >
        <h2>
          Connect your passion <br />
          <strong>please check your chart</strong>
        </h2>
        <p>Anyone can organize your day using React Tasks!</p>
      </section>
      <section style={{ display: 'flex', justifyContent: 'center' }}>
        <div>
          <p>{loading && <Loading color='#e30d7c' isLoading />}</p>
          <p>
            {error && <ErrorBlock title={error.code} message={error.message} />}
          </p>
          <p>
            {data && (
              <>
                <header>
                  <h2>React Tasks Chart</h2>
                </header>
                <TaskPieChart tasks={data} />
              </>
            )}
          </p>
        </div>
      </section>
    </div>
  );
}

export default TaskChart;
