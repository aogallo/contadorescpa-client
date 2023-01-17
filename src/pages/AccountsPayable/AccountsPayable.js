import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from 'components/Title'

const AccountsPayable = () => {
  const groupButtons = [
    {
      name: 'Agregar Cuenta por pagar',
      path: '/cxp/add',
      class: 'title__button--blue'
    }
  ]
  return (
    <>
      <Title title='Cuentas por Pagar' groupButtons={groupButtons} />
      <Outlet />
    </>
  )
}

export default AccountsPayable
