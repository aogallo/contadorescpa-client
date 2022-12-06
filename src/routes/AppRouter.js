import React, { useContext } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router-dom'

import { AppContext } from 'context/AppContext'

import Login from 'pages/Login/Login'
import PrivateRoute from './PrivateRoute'

import PublicRoute from './PublicRoute'
import Layout from 'pages/Layout/Layout'
import SelectedCompany from 'pages/SelectedCompany/SelectedCompany'

const AppRouter = () => {
  const { company } = useContext(AppContext)
  console.log('company', company)
  return (
    <BrowserRouter>
      <Routes>
        <Route
          path='/login'
          element={
            <PublicRoute>
              <Login />
            </PublicRoute>
          }
        />
        <Route
          path='/*'
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        />
      </Routes>
    </BrowserRouter>
  )
}

export default AppRouter
