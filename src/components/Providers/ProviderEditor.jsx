import React, { useEffect, useState } from 'react'
import { Formik, Form } from 'formik'
import { useNavigate, useParams } from 'react-router-dom'
import { useLazyQuery, useMutation, useQuery } from '@apollo/client'

import {
  GET_ALL_PROVIDERS,
  GET_PROVIDER_BY_ID
} from 'graphql/Provider/queries'
import {
  CREATE_PROVIDER,
  UPDATE_PROVIDER
} from 'graphql/Provider/mutations'
import CustomInput from 'components/CustomInput/CustomInput'
import { BiTrash } from 'react-icons/bi'
import Tabs from 'components/Tabs/Tabs'
import { GET_ALL_COMPANIES } from 'graphql/Company/queries'
import { CREATE_PROVIDER_COMPANY, DELETE_PROVIDER_COMPANY_BY_ID } from 'graphql/ProviderCompany/mutation'
import {
  initialProviderData,
  formatterData
} from 'components/Providers/utils/formatterData'
import useCustomContext from 'hooks/useCustomContext'
import ProviderForm from './ProviderForm'

const ProviderEditor = () => {
  const navigate = useNavigate()
  const params = useParams()
  const { company, saveCompany } = useCustomContext()
  const { data: companiesData, loading: loadingCompanies, error: errorCompanies, networkStatus } = useQuery(GET_ALL_COMPANIES, {
    fetchPolicy: 'network-only',
    nextFetchPolicy: 'network-only',
    notifyOnNetworkStatusChange: true,
  })
  const [companies, setCompanies] = useState([])
  const [message, setMessage] = useState(null)
  const [createProvider] = useMutation(CREATE_PROVIDER)
  const [deleteProviderCompanyById] = useMutation(DELETE_PROVIDER_COMPANY_BY_ID)
  const [createProviderCompany, { reset: resetMutationCreateProviderCompany }] = useMutation(CREATE_PROVIDER_COMPANY)
  const [updateProvider] = useMutation(UPDATE_PROVIDER)
  const [getProviderById, { data }] = useLazyQuery(GET_PROVIDER_BY_ID)
  const [selectedCompany] = useState([])

  useEffect(() => {
    if (companiesData) {
      setCompanies([{ id: '0', name: 'Seleccionar compañia' }].concat(companiesData.getAllCompanies))
      if (company?.id != 0) {
        const newCompanyData = companiesData.getAllCompanies.find(companyServer => companyServer.id === company.id)
        if (newCompanyData && newCompanyData.providers.length !== company.providers.length - 1) {
          saveCompany(newCompanyData)
        }
      }
    }

  }, [companiesData, loadingCompanies, errorCompanies])


  useEffect(() => {
    if (data) {
      setProviderValues(formatterData(data))
    }
  }, [data])

  const handleCancel = (e) => {
    e.preventDefault()
    navigate(-1)
  }

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

  const handleSelectedCompany = async ({ value: idCompany }, name = '') => {
    const companyFind = providerValues.companies.filter(company => company.id === idCompany)
    if (companyFind.length == 0) {
      await createProviderCompany({
        variables: {
          providerCompany: {
            id: 0,
            idCompany,
            idProvider: providerValues.id
          }
        },
        refetchQueries: [{ query: GET_ALL_PROVIDERS }, { query: GET_ALL_COMPANIES }],
        awaitRefetchQueries: true,
      })
      resetMutationCreateProviderCompany()
    }
  }

  const titles = ['Proveedor', 'Asociar compañia con proveedor']
  const content = [<ProviderForm />
    ,
  <div className='container container--tabs'>
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
    <div className='badges'
    >
      {
        providerValues.companies && (
          providerValues.companies.map(company => (
            <span key={company.id} className='badge'>
              <span className='badge__name'>
                {company.name}
              </span>
              <span
                onClick={() => handleRemoveCompany(company)}
                className='btn__action btn__action-delete'>
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
        titles={titles} />
    </>
  )
}

export default ProviderEditor
