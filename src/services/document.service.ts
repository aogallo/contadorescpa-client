import { ApiResponse } from 'types/common';
import { DocumentType, Account } from 'types/document';

import api from './api';

export const documentService = {
  /**
   * Gets all document types
   * @returns Array of document types
   */
  getAllDocumentTypes: async (): Promise<DocumentType[]> => {
    const response = await api.get<ApiResponse<DocumentType[]>>('/document-types');
    return response.data.data;
  },

  /**
   * Gets a single document type by ID
   * @param id - Document type ID
   * @returns Document type object
   */
  getDocumentTypeById: async (id: number): Promise<DocumentType> => {
    const response = await api.get<ApiResponse<DocumentType>>(`/document-types/${id}`);
    return response.data.data;
  },

  /**
   * Gets all accounts
   * @returns Array of accounts
   */
  getAllAccounts: async (): Promise<Account[]> => {
    const response = await api.get<ApiResponse<Account[]>>('/accounts');
    return response.data.data;
  },

  /**
   * Gets a single account by ID
   * @param id - Account ID
   * @returns Account object
   */
  getAccountById: async (id: number): Promise<Account> => {
    const response = await api.get<ApiResponse<Account>>(`/accounts/${id}`);
    return response.data.data;
  },
};

