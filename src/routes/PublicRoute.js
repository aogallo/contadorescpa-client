import React, { useContext } from 'react'
import { Navigate } from 'react-router-dom'
import { AppContext } from '../context/AppContext'

const PublicRoute = ({ children }) => {
  const { user } = useContext(AppContext)

  console.log('user', user)

  return user.logged ? <Navigate to='/' /> : children
}
export default PublicRoute
