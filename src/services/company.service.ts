import api from './api';
import { Company } from 'types/company';
import { ApiResponse } from 'types/common';

export const companyService = {
  /**
   * Gets all companies
   * @returns Array of companies
   */
  getAll: async (): Promise<Company[]> => {
    const response = await api.get<ApiResponse<Company[]>>('/companies');
    return response.data.data;
  },

  /**
   * Gets a single company by ID
   * @param id - Company ID
   * @returns Company object
   */
  getById: async (id: number): Promise<Company> => {
    const response = await api.get<ApiResponse<Company>>(`/companies/${id}`);
    return response.data.data;
  },

  /**
   * Creates a new company
   * @param data - Company data
   * @returns Created company
   */
  create: async (data: Partial<Company>): Promise<Company> => {
    const response = await api.post<ApiResponse<Company>>('/companies', data);
    return response.data.data;
  },

  /**
   * Updates an existing company
   * @param id - Company ID
   * @param data - Updated company data
   * @returns Updated company
   */
  update: async (id: number, data: Partial<Company>): Promise<Company> => {
    const response = await api.put<ApiResponse<Company>>(`/companies/${id}`, data);
    return response.data.data;
  },

  /**
   * Deletes a company
   * @param id - Company ID
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/companies/${id}`);
  },
};

