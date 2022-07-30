import { gql } from '@apollo/client';
export const GET_ALL_COMPANIES = gql`
  query getAllCompanies {
    getAllCompanies {
      id
      name
      nit
      dateBirth
      comercialActivity
    }
  }
`;
