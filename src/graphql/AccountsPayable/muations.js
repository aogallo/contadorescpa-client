import { gql } from '@apollo/client';

export const CREATE_ACCOUNT_PAYABLE = gql`
  mutation CreateAccountPayable($accountPayable: AccountPayableInput) {
    createAccountPayable(accountPayable: $accountPayable) {
      id
      documentType {
        id
        name
      }
      proveedor {
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
        }
      }
      account {
        accountNumber
        name
        id
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
`;

export const UPDATE_ACCOUNT_PAYABLE = gql`
  mutation UpdateAccountPayable($accountPayable: AccountPayableInput) {
    updateAccountPayable(accountPayable: $accountPayable)
  }
`;
