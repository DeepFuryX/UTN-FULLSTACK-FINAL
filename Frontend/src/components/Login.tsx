import { useEffect, useRef, useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { setToken } from '@/utils/token'
import './Login.css'
import LoadingLogin from './loading/LoadingLogin'

const Login = () => {
  const navigate = useNavigate()
  const [isRegister, SetRegister] = useState<boolean>(false)
  const [isLoading, SetLoading] = useState<boolean>(false)

  const refEmail = useRef<HTMLInputElement | null>(null)
  const refPassword = useRef<HTMLInputElement | null>(null)
  const refUsername = useRef<HTMLInputElement | null>(null)
  const refEmailLogin = useRef<HTMLInputElement | null>(null)
  const refPasswordLogin = useRef<HTMLInputElement | null>(null)

  useEffect(() => {
    if (isRegister) {
      document.getElementById('container')?.classList.add('right-panel-active')
    } else {
      document.getElementById('container')?.classList.remove('right-panel-active')
    }
  }, [isRegister])

  const onSubmitRegister = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SetLoading(true)
    const url = 'https://api-tasks-wmh4.onrender.com/api/auth/register'
    const payload = {
      username: refUsername.current?.value,
      email: refEmail.current?.value,
      password: refPassword.current?.value
    }

    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const json = await res.json()
      if (!json.error) {
        if (refUsername.current) refUsername.current.value = ''
        if (refEmail.current) refEmail.current.value = ''
        if (refPassword.current) refPassword.current.value = ''

        SetLoading(false)
        SetRegister(false)
      }
    } catch (error) {
      console.error('Server error', error)
    }
  }
  const onSubmitLogin = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    SetLoading(true)
    const url = 'https://api-tasks-wmh4.onrender.com/api/auth/login'
    const payload = {
      email: refEmailLogin.current?.value,
      password: refPasswordLogin.current?.value
    }
    try {
      const res = await fetch(url, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      })

      const json = await res.json()
      if (!json.ok) {
        localStorage.removeItem('token')
        SetLoading(false)
      }

      if (json.token) {
        setToken(json.token)
        SetLoading(false)
        navigate('/home')
      }
    } catch (error) {
      localStorage.removeItem('token')
      SetLoading(false)
      console.error('Server error', error)
    }
  }

  return (
    <div className='body-container'>
      {isLoading ? <LoadingLogin /> : null}
      <div className='container' id='container'>
        <div className='form-container register-container'>
          <form onSubmit={onSubmitRegister}>
            <h1>Register here</h1>
            <div className='form-control'>
              <input ref={refUsername} type='text' id='username' required placeholder='Name' />
              <small id='username-error'></small>
              <span></span>
            </div>
            <div className='form-control'>
              <input ref={refEmail} type='email' id='email' required placeholder='Email' />
              <small id='email-error'></small>
              <span></span>
            </div>
            <div className='form-control'>
              <input ref={refPassword} type='password' id='password' placeholder='Password' required />
              <small id='password-error'></small>
              <span></span>
            </div>
            <button type='submit' value='submit'>
              Register
            </button>
          </form>
        </div>

        <div className='form-container login-container'>
          <form className='form-lg' onSubmit={onSubmitLogin}>
            <h1>Log in here</h1>
            <div className='form-control2'>
              <label htmlFor='loginEmail'></label>
              <input ref={refEmailLogin} id='loginEmail' type='email' required className='email-2' placeholder='Email' />
              <small className='email-error-2'></small>
              <span></span>
            </div>
            <div className='form-control2'>
              <label htmlFor='loginPassword'></label>
              <input ref={refPasswordLogin} id='loginPassword' type='password' required className='password-2' placeholder='Password' />
              <small className='password-error-2'></small>
              <span></span>
            </div>
            <button type='submit' value='submit'>
              Login
            </button>
          </form>
        </div>

        <div className='overlay-container'>
          <div className='overlay'>
            <div className='overlay-panel overlay-left'>
              <h2 className='title title-2'>
                Enhance your daily routine <br />
                <strong>by discovering a new passion</strong>
              </h2>
              <p>Prepare to have a wonderful trip!</p>

              <button onClick={() => SetRegister(false)} className='ghost' id='login'>
                Login
                <i className='fa-solid fa-arrow-left'></i>
              </button>
            </div>

            <div className='overlay-panel overlay-right'>
              <h2 className='title'>
                Connect your routine <br />
                by <strong>finding a new passion</strong>
              </h2>
              <p>If you don't have an account yet, create one now!</p>
              <button onClick={() => SetRegister(true)} className='ghost' id='register'>
                Register
                <i className='fa-solid fa-arrow-right'></i>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  )
}

export default Login
