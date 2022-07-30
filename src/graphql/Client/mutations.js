import { gql } from '@apollo/client';

export const CREATE_CLIENT = gql`
  mutation CreateClient($client: ClientInput) {
    createClient(client: $client) {
      id
      name
      nit
      address
      email
      phone
      company {
        id
        name
      }
    }
  }
`;

export const UPDATE_CLIENT = gql`
  mutation Mutation($client: ClientInput) {
    updateClient(client: $client)
  }
`;

export const DELETE_CLIENT = gql`
  mutation DeleteClientById($id: ID!) {
    deleteClientById(id: $id)
  }
`;
