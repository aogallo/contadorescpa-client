import { lazy, Suspense } from 'react'
import { Route, Routes } from 'react-router-dom'

import Loading from 'components/Loading/Loading'

const MainLayout = () => {
  const ClientView = lazy(async () => await import('pages/Client/Client'))
  const ClientListView = lazy(async () => await import('components/ClientList/ClientList'))
  const ClientFormView = lazy(async () => await import('components/ClientForm'))

  const ProviderView = lazy(async () => await import('pages/Provider/Provider'))
  const ProviderList = lazy(async () => await import('components/ProviderList'))
  const ProviderEditor = lazy(async () => await import('components/Providers/ProviderEditor'))

  const AccountsPayable = lazy(async () => await import('pages/AccountsPayable/AccountsPayable'))
  const AccountPayableForm = lazy(async () => await import('components/AccountPayableForm'))
  const AccountPayableList = lazy(async () => await import('components/AccountPayableList'))

  const AccountsPayableReportView = lazy(async () => await import('pages/Reports/AccountPayableReport/AccountPayableReport'))
  const Company = lazy(async () => await import('pages/Company/Company'))

  const ErrorView = lazy(async () => await import('pages/Error/Error404'))

  return (
    <Suspense fallback={<Loading />}>
      <div className='main'>
        <Routes>
          <Route path='/client' element={<ClientView />}>
            <Route path='' element={<ClientListView />} />
            <Route path='add' element={<ClientFormView />} />
            <Route path='edit/:id' element={<ClientFormView />} />
          </Route>

          <Route path='/provider' element={<ProviderView />}>
            <Route path='' element={<ProviderList title='Listado de proveedores' />} />
            <Route path='add' element={<ProviderEditor />} />
            <Route path='edit/:id' element={<ProviderEditor />} />
          </Route>

          <Route path='/cxp' element={<AccountsPayable />}>
            <Route path='' element={<AccountPayableList title='Listado de cuentas por pagar' />} />
            <Route path='add' element={<AccountPayableForm />} />
            <Route path='edit/:id' element={<AccountPayableForm />} />
          </Route>

          <Route path='/report'>
            <Route path='cxp' element={<AccountsPayableReportView />} />
          </Route>

          <Route path='/company' element={<Company />} />
          <Route path='*' element={<ErrorView />} />
        </Routes>
      </div>
    </Suspense>
  )
}

export default MainLayout
