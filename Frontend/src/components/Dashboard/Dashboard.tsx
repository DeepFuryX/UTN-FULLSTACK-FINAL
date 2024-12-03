import { Link } from 'react-router-dom';
import TaskBoard from '../board/TaskBoard';
import Header from '../ui/Header';

import meetupImg from '../../assets/meetup.jpg';
import { ChartColumnBig, House } from 'lucide-react';

function Dashboard() {
  return (
    <div>
      <Header>
        <Link to='/home' className='button'>
          <House />
          Go to Home
        </Link>
        <Link to='/chart' className='button'>
          <ChartColumnBig />
          Go to Chart
        </Link>
      </Header>
      <section
        className='content-section'
        id='overview-section'
        style={{ backgroundImage: `url(${meetupImg})` }}
      >
        <h2>
          Connect your routine <br />
          by <strong>finding a new passion</strong>
        </h2>
        <p>Anyone can organize your day using React Tasks!</p>
      </section>
      <section style={{ textAlign: 'center', minHeight: '100vh' }}>
        <TaskBoard />
      </section>
    </div>
  );
}

export default Dashboard;
