import { Link, Outlet, useNavigate } from 'react-router-dom'
import Header from './ui/Header'

import meetupImg from '../assets/meetup.jpg'
import { LayoutDashboard, LogOut } from 'lucide-react'
import LatestNewTasks from './new/LatestNewTasks'

function Home() {
  const navigate = useNavigate()

  const handlerLogOut = () => {
    localStorage.removeItem('token')
    navigate('/login')
  }

  return (
    <div>
      <Outlet />
      <Header>
        <Link to='/dashboard' className='button'>
          <LayoutDashboard /> Go to Dashboard
        </Link>
        <button onClick={handlerLogOut} className='button'>
          <LogOut /> LogOut
        </button>
      </Header>
      <div>
        <section className='content-section' id='overview-section' style={{ backgroundImage: `url(${meetupImg})` }}>
          <h2>
            Enhance your daily routine <br />
            <strong>by discovering a new passion</strong>
          </h2>
          <p>
            With React Tasks, anyone can easily organize their day <br /> and stay on top of what matters most!
          </p>
          <p>
            <Link to='/create' className='button'>
              Create your first task
            </Link>
          </p>
        </section>
        <LatestNewTasks />
      </div>
    </div>
  )
}

export default Home
