import { gql } from '@apollo/client'
export const GET_ALL_PROVIDERS = gql`
  query {
    getAllProviders {
      id
      name
      nit
      address
      email
      phone
      creditDay
      companies {
        id
        name
        nit
        dateBirth
        comercialActivity
      }
    }
  }
`

export const GET_PROVIDER_BY_ID = gql`
  query Query($id: ID) {
    getProviderById(id: $id) {
      id
      name
      nit
      address
      email
      phone
      creditDay
      company {
        id
        name
        nit
        dateBirth
        comercialActivity
      }
    }
  }
`
