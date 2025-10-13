import { Client, ClientFormValues } from 'types/client';
import { ApiResponse } from 'types/common';

import api from './api';

export const clientService = {
  /**
   * Gets all clients
   * @returns Array of clients
   */
  getAll: async (): Promise<Client[]> => {
    const response = await api.get<ApiResponse<Client[]>>('/clients');
    return response.data.data;
  },

  /**
   * Gets a single client by ID
   * @param id - Client ID
   * @returns Client object
   */
  getById: async (id: number): Promise<Client> => {
    const response = await api.get<ApiResponse<Client>>(`/clients/${id}`);
    return response.data.data;
  },

  /**
   * Creates a new client
   * @param data - Client form data
   * @returns Created client
   */
  create: async (data: ClientFormValues): Promise<Client> => {
    const response = await api.post<ApiResponse<Client>>('/clients', data);
    return response.data.data;
  },

  /**
   * Updates an existing client
   * @param id - Client ID
   * @param data - Updated client data
   * @returns Updated client
   */
  update: async (id: number, data: ClientFormValues): Promise<Client> => {
    const response = await api.put<ApiResponse<Client>>(`/clients/${id}`, data);
    return response.data.data;
  },

  /**
   * Deletes a client
   * @param id - Client ID
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/clients/${id}`);
  },
};

