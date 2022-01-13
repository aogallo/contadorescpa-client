import { gql } from "@apollo/client";
export const GET_ALL_CLIENTS = gql`
  query {
    getAllClients {
      id
      name
      nit
      address
      email
      phone
    }
  }
`;
