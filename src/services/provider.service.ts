import { ApiResponse } from 'types/common';
import { Provider, ProviderFormValues } from 'types/provider';

import api from './api';

export const providerService = {
  /**
   * Gets all providers
   * @returns Array of providers
   */
  getAll: async (): Promise<Provider[]> => {
    const response = await api.get<ApiResponse<Provider[]>>('/providers');
    return response.data.data;
  },

  /**
   * Gets a single provider by ID
   * @param id - Provider ID
   * @returns Provider object
   */
  getById: async (id: number): Promise<Provider> => {
    const response = await api.get<ApiResponse<Provider>>(`/providers/${id}`);
    return response.data.data;
  },

  /**
   * Creates a new provider
   * @param data - Provider form data
   * @returns Created provider
   */
  create: async (data: ProviderFormValues): Promise<Provider> => {
    const response = await api.post<ApiResponse<Provider>>('/providers', data);
    return response.data.data;
  },

  /**
   * Updates an existing provider
   * @param id - Provider ID
   * @param data - Updated provider data
   * @returns Updated provider
   */
  update: async (id: number, data: ProviderFormValues): Promise<Provider> => {
    const response = await api.put<ApiResponse<Provider>>(`/providers/${id}`, data);
    return response.data.data;
  },

  /**
   * Deletes a provider
   * @param id - Provider ID
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/providers/${id}`);
  },
};

