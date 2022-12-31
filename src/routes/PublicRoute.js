import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

import { isTokenExpired } from 'utils/token'

const PublicRoute = ({ children }) => {
  const { user } = useContext(AppContext)
  const logged = isTokenExpired(user.token)

  return logged ? <Navigate to='/selected-company' /> : children
}
export default PublicRoute
