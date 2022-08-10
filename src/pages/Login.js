import React, { useState, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from '../graphql/Login/mutations'

import { AppContext } from '../context/AppContext'
import { types } from '../types/types'
import { Formik, Form } from 'formik'

import LoginForm from '../components/LoginForm'
import './Login/Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [login, { data }] = useMutation(LOGIN)
  const [messageError, setMessageError] = useState('')
  const { dispatch } = useContext(AppContext)


  const validateFields = (valores) => {
    const errores = {}

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
        variables: { username: valores.username, password: valores.password }
      })

      if (data) {
        const user = {
          token: data.login.token,
          ...data.login.user
        }
        dispatch({
          type: types.login,
          payload: user
        })
        resetForm()
        navigate('/')
      }
    } catch (error) {
      setMessageError(error.message)
      setTimeout(() => {
        setMessageError('')
      }, 5000)
      console.log('error', error)
    }
  }

  return (
    <LoginForm />
  )
}

export default Login
