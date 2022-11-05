import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import jwt from 'jwt-decode'

import { AppContext } from '../context/AppContext'

const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  const decode = user.token ? jwt(user.token) : { logged: false, exp: 0 }

  if (decode.exp < Date.now() / 1000) user.logged = false

  return user.logged ? children : <Navigate to='/login' />
  // return children
}
export default PrivateRoute
