import React, {useState} from 'react'
import { useNavigate } from 'react-router-dom'

const LoginForm = (props) => {
  const navigate = useNavigate()
  const [username, setUserName] = useState('') 
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value} = e.target
    console.log(e.target.name)
    if (name === 'username') {
      setUserName(value)
    }
    
    if (name === 'password') {
      setPassword(value)
    }
    // navigate('/')
  }

  const handleSubmit = (e) => {
    e.preventDefault()
    props.handleLogin({
      username: username,
      password
    })
  }
  
  return (
    <div className='login-container'>
      <div className='logo-container'>
        <h2 className='logo-title'>Contadores Publicos y Auditores</h2>
      </div>
      <section className='title-container'>
        <h2 className='title'>Iniciar sesi&oacute;n en CPA</h2>
        <h3 className='sub-title'>Ingrese su usuaruio y contrase&ntilde;a</h3>
      </section>
      <form>
        <section className='form-group'>
          <label htmlFor='username' className='form-label'>Usuario</label>
          <input type='text' 
            className='form-control' 
            id='username' 
            name='username'
            value={username}
            onChange={handleChange}
            placeholder = 'Ingrese su usuario'/>
        </section>

        <section className='form-group'>
          <section className='two-label'>
            <label htmlFor='password' className='form-label'>Password</label>
            <label className='forgot-password'>Olivdo su contrase&ntilde;a</label>
          </section> 
          <input 
            type='password' 
            className='form-control' 
            id='password' 
            name='password'
            value={password}
            onChange={handleChange}
            placeholder='Ingrese su contraseña'/>
        </section>
        
        <section className='form-group'>
          <button type='submit' onClick={handleSubmit}>Ingresar</button>
        </section>
      </form>
    </div>
  )
}

export default LoginForm;
