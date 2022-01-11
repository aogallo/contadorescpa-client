import { gql } from "@apollo/client";
export const GET_ALL_PROVIDERS = gql`
  query {
    getAllProviders {
      id
      name
      nit
      address
      email
      phone
    }
  }
`;
