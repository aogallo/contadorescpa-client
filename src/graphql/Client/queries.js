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

export const GET_CLIENT_BY_ID = gql`
  query getClientById($id: ID) {
    getClientById(id: $id) {
      id
      name
      nit
      address
      email
      phone
      company {
        id
        name
        nit
      }
    }
  }
`;
