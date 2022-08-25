import React, { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom'

import Header from '../components/Header'
import Provider from '../pages/Provider'
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
  const ClientFormView = lazy(async () => await import('components/ClientForm'))
  const SideBarComponent = lazy(async () => await import('../components/SideBar'))
  return (
    <Suspense fallback={<div>loagind....</div>} >
      <div className='principal-content'>
        <SideBarComponent />
        <section id='interface'>
          <Header />
          
          <div className='content'>
            <Routes>
              <Route path='/about' element={<AboutView />} />
              <Route path='/client' element={<ClientView />}>
                <Route path='' element={<ClientListView />} />
                <Route path='add' element={<ClientFormView />} />
                <Route path='edit/:id' element={<ClientFormView />} />
              </Route>
            </Routes>
          </div>
        </section>
      </div>
    </Suspense>
  )
}

export default Layout
