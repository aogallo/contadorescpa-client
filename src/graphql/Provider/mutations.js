import { gql } from '@apollo/client';

export const CREATE_PROVIDER = gql`
  mutation CreateProvider($provider: ProviderInput) {
    createProvider(provider: $provider) {
      id
      name
      nit
      address
      email
      phone
      creditDay
    }
  }
`;

export const DELETE_PROVIDER = gql`
  mutation DeleteProviderById($id: ID!) {
    deleteProviderById(id: $id)
  }
`;

export const UPDATE_PROVIDER = gql`
  mutation UpdateProvidder($provider: ProviderInput) {
    updateProvidder(provider: $provider)
  }
`;
