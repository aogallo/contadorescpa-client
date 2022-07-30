import { gql } from '@apollo/client';

export const GET_ALL_ACCOUNTS = gql`
  query GetAllAccounts {
    getAllAccounts {
      id
      name
      accountNumber
      type
    }
  }
`;

export const GET_ACCOUNT_BY_ID = gql`
  query GetAccountById($id: ID) {
    getAccountById(id: $id) {
      id
      accountNumber
      name
      type
    }
  }
`;
