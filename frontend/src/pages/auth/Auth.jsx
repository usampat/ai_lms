import { useState } from 'react'
import { toast } from 'react-toastify'
import './Auth.css'
import Navbar from '../../components/navbar/Navbar'

const demoUsers = {
  students: [
    { id: 1, username: 'student1', password: 'pwd1' },
    { id: 2, username: 'student2', password: 'pwd2' },
  ],
  teachers: [
    { id: 1, username: 'teacher1', password: 'pwd1' },
    { id: 2, username: 'teacher2', password: 'pwd2' },
  ],
}

function Auth() {
  const [isLogin, setIsLogin] = useState(true)
  const [username, setUsername] = useState('')
  const [password, setPassword] = useState('')
  const [role, setRole] = useState('student')

  function setLoggedInUser(user) {
    localStorage.setItem('loggedInUser', JSON.stringify({ user }))
  }

  const handleAuth = () => {
    if (isLogin) {
      const user = demoUsers[role === 'student' ? 'students' : 'teachers'].find(
        (user) => user.username === username && user.password === password
      )
      if (user) {
        setLoggedInUser({ username, role })
        toast.success('Login successful!')

      } else {
        toast.error('Invalid credentials')
      }
    } else {
      const newUser = { id: Date.now(), username, password }
      demoUsers[role === 'student' ? 'students' : 'teachers'].push(newUser)
      setLoggedInUser({ username, role })
      toast.success('Signup successful!')
    }
    setUsername('')
    setPassword('')
  }

  return (
    <div>
      <Navbar />
      
      <div className='page'>
        <div className='auth'>
          <h1>{isLogin ? 'Login' : 'Signup'}</h1>
          <form
            onSubmit={(e) => {
              e.preventDefault()
              handleAuth()
            }}
          >
            <div className='input-group'>
              <label htmlFor='role'>Role:</label>
              <select
                id='role'
                value={role}
                onChange={(e) => setRole(e.target.value)}
              >
                <option value='student'>Student</option>
                <option value='teacher'>Teacher</option>
              </select>
            </div>
            <div className='input-group'>
              <label htmlFor='username'>Username:</label>
              <input
                id='username'
                type='text'
                value={username}
                onChange={(e) => setUsername(e.target.value)}
                required
              />
            </div>
            <div className='input-group'>
              <label htmlFor='password'>Password:</label>
              <input
                id='password'
                type='password'
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
              />
            </div>
            <button type='submit'>{isLogin ? 'Login' : 'Signup'}</button>
          </form>
          <button onClick={() => setIsLogin(!isLogin)}>
            Switch to {isLogin ? 'Signup' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  )
}

export default Auth
