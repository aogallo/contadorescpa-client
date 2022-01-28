import { gql } from "@apollo/client";

export const GET_ALL_DOCUMENT_TYPES = gql`
  query GetAllDocumentTypes {
    getAllDocumentTypes {
      id
      name
    }
  }
`;

export const GET_ALL_DOCUMENT_BY_ID = gql`
  query GetDocumentTypeById($id: ID) {
    getDocumentTypeById(id: $id) {
      id
      name
    }
  }
`;
