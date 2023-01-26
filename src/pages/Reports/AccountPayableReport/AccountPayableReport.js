import React, { useState } from 'react'
import { useQuery } from '@apollo/client'

import CustomDatePicker from 'components/CustomDatePicker/CustomDatePicker'
import Title from 'components/Title'
import useCustomContext from 'hooks/useCustomContext'

import { GET_ALL_ACCOUNTS } from 'graphql/Account/queries'
import { CREATE_REPORT } from 'graphql/Report/queries'
import CustomInput from 'components/CustomInput/CustomInput'
import CreateFile from 'components/CreateFile/CreateFile'

const AccountPayableReport = () => {

  const { company } = useCustomContext()
  const [accounts, setAccounts] = useState([{ id: 0, name: 'Seleccionar cuenta' }])
  useQuery(GET_ALL_ACCOUNTS, {
    onCompleted: (data) => {
      if (data) {
        console.log(data)
        setAccounts((prevState) => prevState.concat(data.getAllAccounts))
      }
    }
  })
  const [reportState, setReportState] = useState({
    startDate: new Date(),
    endDate: new Date(),
    account: '',
    provider: ''
  })

  const handleOnChangeSelect = ({ value }, name) => {
    setReportState({ ...reportState, [name]: value })
  }

  return (
    <>
      <Title title='Reporte - Cuentas por Pagar' />
      <div className='container'>
        {/* <div className='form__grid--row'>*/}
        {/* Provider
        <CustomInput
          arrayToSelect={company.providers}
          changeStateSelected={handleOnChangeSelect}
          // errors={errors}
          label='Proveedor'
          name='provider'
          placeholder='Seleccionar proveedor'
          state={reportState}
          // touch={touched.provider}
          type='select'
          value={reportState.provider}
        />

            *}
        {/* Account
        <CustomInput
          arrayToSelect={accounts}
          changeStateSelected={handleOnChangeSelect}
          // errors={errors}
          label='Cuenta'
          name='account'
          placeholder='Seleccionar cuenta'
          state={reportState}
          // touch={touched.account}
          type='select'
          value={reportState.account}
        />
            *}
        {/* </div>*/}
        <div className='form__grid--row'>
          {/* Start Date*/}
          <CustomDatePicker
            changeDate={setReportState}
            label='Fecha de inicio'
            name='startDate'
            state={reportState}
            value={reportState.startDate}
          />

          {/* End Date*/}
          <CustomDatePicker
            changeDate={setReportState}
            label='Fecha de fin'
            name='endDate'
            state={reportState}
            value={reportState.endDate}
          />
        </div>
        <div className='form__buttons--group'>
          <CreateFile
            filename={`Facturas, ${company.name}.csv`}
            domain='accountPayable'
            format='csv'
            startDate={reportState.startDate}
            endDate={reportState.endDate}
            createReportQuery={CREATE_REPORT}
          />
        </div>
      </div>
    </>
  )
}

export default AccountPayableReport
