import { gql } from '@apollo/client'

export const GET_ALL_ACCOUNTS_PAYABLE = gql`
  query GetAllAccountPayable {
    getAllAccountPayable {
      id
      documentType {
        id
        name
      }
      idProviderCompany
      provider {
        id
        name
      }
      company {
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
      idProviderCompany
      provider {
        id
        name
      }
      company {
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

export const GET_ACCOUNTS_PAYABLE_BY_ID_COMPANY = gql`
  query GetAccountPayableByIdCompany($id: ID) {
    getAccountPayableByIdCompany(id: $id) {
      id
      documentType {
        id
        name
      }
      idProviderCompany
      provider {
        id
        name
      }
      company {
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
