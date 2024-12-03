import { Route, Routes, useLocation } from 'react-router-dom';
import Home from './components/Home';
import Dashboard from './components/dashboard/Dashboard';
import TaskChart from './components/chart/TaskChart';
import CreateTask from './components/create/CreateTask';
import EditTask from './components/edit/EditTask';
import Login from './components/Login';
import { getToken } from './utils/token';
import './index.css';
import ErrorBlock from './components/ui/ErrorBlock';

function App() {
  const { pathname } = useLocation();
  const token = getToken();
  if (!token && pathname !== '/') {
    window.location.href = '/';
    return;
  }
  return (
    <Routes>
      <Route path='/' element={<Login />} />
      <Route path='/home' element={<Home />} />
      <Route path='/create' element={<CreateTask />} />
      <Route path='/dashboard' element={<Dashboard />} />
      <Route path='/chart' element={<TaskChart />} />
      <Route path='/edit/:id' element={<EditTask />} />
      <Route
        path='*'
        element={
          <ErrorBlock title='Unexpected error' message='Page not found' />
        }
      />
    </Routes>
  );
}

export default App;
