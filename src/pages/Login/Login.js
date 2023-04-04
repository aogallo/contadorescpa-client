import React, { useState, useEffect, useContext } from 'react'

import { useNavigate } from 'react-router-dom'
import { useMutation } from '@apollo/client'
import { LOGIN } from 'graphql/Login/mutations'

import { AppContext } from 'context/AppContext'
import { types } from 'types/types'

import LoginForm from 'components/LoginForm'
// import './Login/Login.css'

const Login = () => {
  const navigate = useNavigate()
  const [login, { data }] = useMutation(LOGIN)
  const [messageError, setMessageError] = useState('')
  const { dispatch } = useContext(AppContext)

  useEffect(() => {
    if (data) {
      const user = {
        token: data.login.token,
        ...data.login.user
      }
      dispatch({
        type: types.login,
        payload: user
      })
      navigate('/selected-company')
    }
  }, [data, navigate, dispatch])

  const handleLogin = async (valores) => {
    try {
      await login({
        variables: { username: valores.username, password: valores.password }
      })
    } catch (error) {
      setMessageError(error.message)
      setTimeout(() => {
        setMessageError('')
      }, 5000)
    }
  }

  return (
    <LoginForm handleLogin={handleLogin} messageError={messageError} />
  )
}

export default Login
