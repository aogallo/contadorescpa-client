import React, { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom'

import SideBar from '../components/SideBar'
import Header from '../components/Header'
import Provider from '../pages/Provider'
import ClientForm from '../components/ClientForm'
import Error404 from '../pages/Error404'
import ProviderList from '../components/ProviderList'
import ProviderForm from '../components/ProviderForm'
import AccountsPayable from '../pages/AccountsPayable'
import Home from './Home'
import AccountPayableForm from '../components/AccountPayableForm'
import AccountPayableList from '../components/AccountPayableList'

const Layout = () => {
  const AboutView = lazy(async () => await import('../pages/About'))
  const ClientView = lazy(async () => await import('../pages/Client'))
  const ClientListView = lazy(async () => await import('../components/ClientList'))
  return (
    <Suspense fallback={<div>loagind....</div>} >
      <div className='principal-content'>
        <SideBar />
        <section id='interface'>
          <Header />
          <h3 className='title-page'>Dashbord</h3>
          
          <div className='content'>
            Contenido principal
            <Routes>
              <Route path='/client' element={<ClientView />}>
                <Route path='' element={<ClientListView />} />
              </Route>
            </Routes>
          </div>
        </section>
      </div>
    </Suspense>
  )
}

export default Layout
