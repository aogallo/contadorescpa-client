import React, { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import Message from './Message/Message'

const LoginForm = (props) => {
  const navigate = useNavigate()
  const [username, setUserName] = useState('')
  const [password, setPassword] = useState('')

  const handleChange = (e) => {
    e.preventDefault()
    const { name, value } = e.target
    console.log(e.target.name)
    if (name === 'username') {
      setUserName(value)
    }

    if (name === 'password') {
      setPassword(value)
    }
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
      <div className='login-content'>
        <section className='login-header'>
          <h2 className='login-header__heading'>Contadores Publicos y Auditores</h2>
          <h3 className='login-header__heading'>Iniciar sesi&oacute;n en CPA</h3>
          <h3 className='login-header__heading'>Ingrese su usuaruio y contrase&ntilde;a</h3>
        </section>
        <form onSubmit={handleSubmit} className="form">
          <section className='form__group'>
            <label htmlFor='username' className='form__label'>Usuario</label>
            <input type='text'
              className='form__input'
              id='username'
              name='username'
              value={username}
              required
              onChange={handleChange}
              placeholder='Ingrese su usuario' />
          </section>

          <section className='form__group'>
            <label htmlFor='password' className='form__label'>Password</label>
            <input
              type='password'
              className='form__input'
              id='password'
              name='password'
              value={password}
              required
              onChange={handleChange}
              placeholder='Ingrese su contraseña' />
          </section>

          <div className='form__buttons'>
            <button className='btn form__submit' type='submit'>Ingresar</button>
            <label className='form__label form__label-right'>Olvido su contrase&ntilde;a</label>
            {
              props.messageError && <Message message={props.messageError} />
            }
          </div>
        </form>
      </div>
    </div>
  )
}

export default LoginForm;
