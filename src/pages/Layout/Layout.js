import SelectedCompany from 'pages/SelectedCompany/SelectedCompany'
import React, { lazy, Suspense, useEffect } from 'react'

import { Route, Routes, useNavigate } from 'react-router-dom'

import useCustomContext from 'hooks/useCustomContext'
import { isTokenExpired } from 'utils/token'

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
  const ClientView = lazy(async () => await import('pages/Client/Client'))
  const ClientListView = lazy(async () => await import('components/ClientList'))
  const ClientFormView = lazy(async () => await import('components/ClientForm'))
  const SideBarComponent = lazy(async () => await import('components/SideBar'))

  const ProviderView = lazy(async () => await import('pages/Provider/Provider'))
  const ProviderList = lazy(async () => await import('components/ProviderList'))
  const ProviderForm = lazy(async () => await import('components/ProviderForm'))

  const AccountsPayable = lazy(async () => await import('pages/AccountsPayable/AccountsPayable'))
  const AccountPayableForm = lazy(async () => await import('components/AccountPayableForm'))
  const AccountPayableList = lazy(async () => await import('components/AccountPayableList'))


  const Company = lazy(async () => await import('pages/Company/Company'))

  const ErrorView = lazy(async () => await import('pages/Error/Error404'))

  return (
    <Suspense fallback={<div>loagind....</div>} >
      {
        company?.id ?
          <>
            <div className='grid_container'>
              {/*<Header />*/}
              <SideBarComponent />
              <div className='main'>
                <Routes>
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
                  <Route path='*' element={<ErrorView />} />
                </Routes>
              </div>
            </div>
          </> :
          <Routes>
            <Route path='/selected-company' element={<SelectedCompany />}></Route>
          </Routes>

      }
    </Suspense>
  )
}

export default Layout
