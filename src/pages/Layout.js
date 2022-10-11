import React, { lazy, Suspense } from 'react'

import { Route, Routes } from 'react-router-dom'

import Error404 from '../pages/Error404'

const Layout = () => {
  const Header = lazy(async () => await import('components/Header'))
  const AboutView = lazy(async () => await import('pages/About'))
  const ClientView = lazy(async () => await import('pages/Client'))
  const ClientListView = lazy(async () => await import('components/ClientList'))
  const ClientFormView = lazy(async () => await import('components/ClientForm'))
  const SideBarComponent = lazy(async () => await import('components/SideBar'))
  const ProviderView = lazy(async () => await import('pages/Provider'))

  const ProviderList = lazy(async () => await import('components/ProviderList'))
  const ProviderForm = lazy(async () => await import('components/ProviderForm'))

  const AccountsPayable = lazy(async () => await import('pages/AccountsPayable'))
  const AccountPayableForm = lazy(async () => await import('components/AccountPayableForm'))
  const AccountPayableList = lazy(async () => await import('components/AccountPayableList'))


  const Company = lazy(async () => await import('pages/Company'))

  return (
    <Suspense fallback={<div>loagind....</div>} >
      <div className='grid_container'>
        <Header />
        <SideBarComponent />
        <div className='main'>
          <Routes>
            <Route path='/about' element={<AboutView />} />
            <Route path='/client' element={<ClientView />}>
              <Route path='' element={<ClientListView />} />
              <Route path='add' element={<ClientFormView />} />
              <Route path='edit/:id' element={<ClientFormView />} />
            </Route>
            <Route path='/provider' element={<ProviderView />}>
              <Route
                path=''
                element={<ProviderList title='Listado de proveedores' />}
              />
              <Route path='add' element={<ProviderForm />} />
              <Route path='edit/:id' element={<ProviderForm />} />
            </Route>
            <Route path='/cxp' element={<AccountsPayable />}>
              <Route
                path=''
                element={
                  <AccountPayableList title='Listado de cuentas por pagar' />
                }
              />
              <Route path='add' element={<AccountPayableForm />} />
              <Route path='edit/:id' element={<AccountPayableForm />} />
            </Route>
            <Route path='/company' element={<Company />}></Route>
            <Route path='*' element={<Error404 />} />
          </Routes>
        </div>
      </div>
    </Suspense>
  )
}

export default Layout
