import React, { useState, useContext, useEffect } from 'react'

import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/Login/mutations'

import { AppContext } from '../context/AppContext'
import { types } from '../types/types'
import { Formik, Form } from 'formik'

const Login = () => {
  const navigate = useNavigate()
  const [login, { data }] = useMutation(LOGIN)
  const [messageError, setMessageError] = useState('')
  const { dispatch } = useContext(AppContext)

  const initialValues = { username: '', password: '' }

  const validateFields = (valores) => {
    let errores = {}

    if (!valores.username) {
      errores.username = 'Por favor ingresa su usuario'
    }

    if (!valores.password) {
      errores.password = 'Por favor ingresa tu contraseña'
    }

    return errores
  }

  const handleLogin = async (valores, { resetForm }) => {
    try {
      await login({
        variables: { username: valores.username, password: valores.password },
      })

      if (data) {
        const user = {
          token: data.login.token,
          ...data.login.user,
        }
        dispatch({
          type: types.login,
          payload: user,
        })
        resetForm()
        navigate('/')
      }
    } catch (error) {
      setMessageError(error.message)
      setTimeout(() => {
        setMessageError('')
      }, 5000)
      console.log(`error`, error)
    }
  }

  return (
    <div id='layoutAuthentication'>
      <div id='layoutAuthentication_content'>
        <main>
          <div className='container'>
            <div className='row justify-content-center'>
              <div className='col-lg-5'>
                <div className='card shadow-lg border-0 rounded-lg mt-5'>
                  <div className='card-header'>
                    <h3 className='text-center  font-weight-light my-4'>
                      Ingresar
                    </h3>
                  </div>
                  <div className='card-body'>
                    {/* /* INICIO DE FORMULARIO */}
                    <Formik
                      initialValues={initialValues}
                      validate={validateFields}
                      onSubmit={handleLogin}>
                      {({
                        values,
                        touched,
                        handleChange,
                        handleBlur,
                        errors,
                      }) => (
                        <Form className='formulario'>
                          <div className='form-floating mb-3'>
                            <input
                              className='form-control'
                              name='username'
                              id='inputEmail'
                              type='text'
                              placeholder='Usuario'
                              value={values.username}
                              onChange={handleChange}
                              onBlur={handleBlur}
                              autoComplete='off'
                            />
                            {touched.username && errors.username && (
                              <div className='error' style={{ color: 'red' }}>
                                {errors.username}
                              </div>
                            )}
                            <label htmlFor='inputEmail'>Usuario</label>
                          </div>
                          <div className='form-floating mb-3'>
                            <input
                              className='form-control'
                              name='password'
                              id='inputPassword'
                              type='password'
                              placeholder='Password'
                              value={values.password}
                              onBlur={handleBlur}
                              onChange={handleChange}
                            />
                            {touched.password && errors.password && (
                              <div className='error' style={{ color: 'red' }}>
                                {errors.password}
                              </div>
                            )}
                            <label htmlFor='inputPassword'>Password</label>
                          </div>
                          <div className='d-flex align-items-center justify-content-between mt-4 mb-0'>
                            <a className='small' href='password.html'>
                              ¿ Has olvidado la contraseña ?
                            </a>
                            {/* <a className='btn btn-primary' href='index.html'>
                              Login
                            </a> */}
                            <button className='btn btn-primary' type='submit'>
                              Login
                            </button>
                          </div>
                        </Form>
                      )}
                    </Formik>
                    {/* /* /**FINAL DE FORMULARIO */}
                  </div>
                  <div className='card-footer text-center py-3'>
                    {messageError ? (
                      <p style={{ color: 'red' }}>{messageError}</p>
                    ) : null}
                  </div>
                </div>
              </div>
            </div>
          </div>
        </main>
      </div>
      <div id='layoutAuthentication_footer'>
        <footer className='py-4 bg-light mt-auto'>
          <div className='container-fluid px-4'>
            <div className='d-flex align-items-center justify-content-between small'>
              <div className='text-muted'>
                Copyright &copy Contadores CPA 2022
              </div>
              <div>
                <a href='#'></a>
                &middot
                <a href='#'></a>
              </div>
            </div>
          </div>
        </footer>
      </div>
    </div>
  )
}

export default Login
