import SelectedCompany from 'pages/SelectedCompany/SelectedCompany'
import React, { lazy, Suspense, useEffect } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { isTokenExpired } from 'utils/token'
import MainLayout from 'components/MainLayout/MainLayout'
import SideBar from 'components/SideBar'

const Layout = () => {
  const { user, company } = useCustomContext()
  const navigate = useNavigate()
  const logged = isTokenExpired(user.token)

  useEffect(() => {
    if (!logged) {
      navigate('/login')
    }

    if (!company.id) {
      navigate('/selected-company')
    }
  }, [logged, company])

  // const Header = lazy(async () => await import('components/Header/Header'))
  // const SideBarComponent = lazy(async () => await import('components/SideBar'))

  return (
    <>
      <Routes>
        <Route
          path='/selected-company'
          element={
            <SelectedCompany />
          }
        />
      </Routes>
      <div className='grid_container'>
        {/* <Header /> */}
        <SideBar />
        {/* <Suspense fallback={<Loading />} > */}
        {/* </Suspense> */}
        <MainLayout />
      </div>
    </>
  )
}

export default Layout
