import './LoadingLogin.css'
import { ThreeDot } from 'react-loading-indicators'

const LoadingLogin = () => {
  return (
    <div className='spinner-overlay'>
      <ThreeDot variant='pulsate' color='#e30d7c' size='large' text='Loading' textColor='#e30d7c' />
    </div>
  )
}

export default LoadingLogin
