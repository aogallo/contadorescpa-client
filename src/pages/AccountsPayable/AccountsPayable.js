import React from 'react'
import { Outlet } from 'react-router-dom'
import Title from 'components/Title'

const AccountsPayable = () => {
  return (
    <>
      <Title title='Cuentas por Pagar' />
      <Outlet />
    </>
  )
}

export default AccountsPayable
