import { gql } from '@apollo/client'

export const CREATE_ACCOUNT_PAYABLE = gql`
  mutation CreateAccountPayable($accountPayable: AccountPayableInput) {
    createAccountPayable(accountPayable: $accountPayable) {
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

export const UPDATE_ACCOUNT_PAYABLE = gql`
  mutation UpdateAccountPayable($accountPayable: AccountPayableInput) {
    updateAccountPayable(accountPayable: $accountPayable)
  }
`
