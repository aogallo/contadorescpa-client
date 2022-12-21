import { gql } from '@apollo/client'

export const CREATE_PROVIDER_COMPANY = gql`
 mutation CreateProviderCompany($providerCompany: ProviderCompanyInput) {
  createProviderCompany(providerCompany: $providerCompany) {
    id
    company {
      id
      name
    }
    provider {
      id
      name
    }
  }
}
`
export const DELETE_PROVIDER_COMPANY_BY_ID = gql`
mutation DeleteProviderCompanyById($providerCompany: ProviderCompanyInput) {
  deleteProviderCompanyById(providerCompany: $providerCompany)
}
`
