import React, { useEffect, useState } from 'react'
import { useMutation, useQuery } from '@apollo/client'

import {
  GET_ALL_PROVIDERS
} from 'graphql/Provider/queries'
import CustomInput from 'components/CustomInput/CustomInput'
import { BiTrash } from 'react-icons/bi'
import Tabs from 'components/Tabs/Tabs'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import { CREATE_PROVIDER_COMPANY, DELETE_PROVIDER_COMPANY_BY_ID } from 'graphql/ProviderCompany/mutation'
import useCustomContext from 'hooks/useCustomContext'
import ProviderForm from './ProviderForm'
import { initialProviderData } from './utils/formatterData'

const ProviderEditor = () => {
  const [providerValues] = useState(initialProviderData)
  const { company, saveCompany } = useCustomContext()
  const { data: companiesData, loading: loadingCompanies, error: errorCompanies } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true
  })
  const [companies, setCompanies] = useState([])
  const [deleteProviderCompanyById] = useMutation(DELETE_PROVIDER_COMPANY_BY_ID)
  const [createProviderCompany, { reset: resetMutationCreateProviderCompany }] = useMutation(CREATE_PROVIDER_COMPANY)
  // const [getProviderById, { data }] = useLazyQuery(GET_PROVIDER_BY_ID)
  const [selectedCompany] = useState([])

  useEffect(() => {
    if (companiesData) {
      setCompanies([{ id: '0', name: 'Seleccionar compañia' }].concat(companiesData.getAllCompanies))
      if (company?.id !== 0) {
        const newCompanyData = companiesData.getAllCompanies.find(companyServer => companyServer.id === company.id)
        if (newCompanyData && newCompanyData.providers.length !== company.providers.length - 1) {
          saveCompany(newCompanyData)
        }
      }
    }
  }, [companiesData, loadingCompanies, errorCompanies])

  const handleRemoveCompany = async ({ id }) => {
    await deleteProviderCompanyById({
      variables: {
        providerCompany: {
          id: 0,
          idCompany: id,
          idProvider: providerValues.id
        }
      },
      refetchQueries: [
        {
          query: GET_ALL_PROVIDERS
        },
        {
          query: GET_ALL_COMPANIES
        }]
    })
  }

  const handleSelectedCompany = async ({ value: idCompany }, _name = '') => {
    const companyFind = providerValues.companies.filter(company => company.id === idCompany)
    if (companyFind.length === 0) {
      await createProviderCompany({
        variables: {
          providerCompany: {
            id: 0,
            idCompany,
            idProvider: providerValues.id
          }
        },
        refetchQueries: [{ query: GET_ALL_PROVIDERS }, { query: GET_ALL_COMPANIES }],
        awaitRefetchQueries: true
      })
      resetMutationCreateProviderCompany()
    }
  }

  const titles = ['Proveedor', 'Asociar compañia con proveedor']
  const content = [<ProviderForm key={1} />,
  <div className='container container--tabs' key={2}>
    {/* Company */}
    <CustomInput
      label='Compañia'
      name='company'
      placeholder='11'
      type='select'
      arrayToSelect={companies}
      changeStateSelected={handleSelectedCompany}
      value={selectedCompany.id}
    />
    <div className='badges'>
      {
        providerValues.companies && (
          providerValues.companies.map(company => (
            <span key={company.id} className='badge'>
              <span className='badge__name'>
                {company.name}
              </span>
              <span
                onClick={() => handleRemoveCompany(company)}
                className='btn__action btn__action-delete'
              >
                <BiTrash />
              </span>
            </span>
          )
          )
        )
      }
    </div>
  </div>
  ]

  return (
    <>
      <Tabs
        content={content}
        titles={titles}
      />
    </>
  )
}

export default ProviderEditor
