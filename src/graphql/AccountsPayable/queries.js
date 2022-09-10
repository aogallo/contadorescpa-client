import { gql } from '@apollo/client'

export const GET_ALL_ACCOUNTS_PAYABLE = gql`
  query GetAllAccountPayable {
    getAllAccountPayable {
      id
      documentType {
        id
        name
      }
      provider {
        id
        name
      }
      account {
        id
        accountNumber
        name
      }
      serie
      documentNumber
      documentDate
      exento
      importation
      service
      asset
      subtotal
      iva
      total
    }
  }
`

export const GET_ACCOUNT_PAYABLE_BY_ID = gql`
  query GetAccountPayableById($id: ID) {
    getAccountPayableById(id: $id) {
      id
      documentType {
        id
        name
      }
      proveedor {
        id
        name
      }
      account {
        id
        accountNumber
        name
      }
      serie
      documentNumber
      documentDate
      exento
      importation
      service
      asset
      subtotal
      iva
      total
    }
  }
`
