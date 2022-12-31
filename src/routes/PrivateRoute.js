import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from 'context/AppContext'

import { isTokenExpired } from 'utils/token'


const PrivateRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  const logged = isTokenExpired(user.token)

  return logged ? children : <Navigate to='/login' />
  // return children
}
export default PrivateRoute
