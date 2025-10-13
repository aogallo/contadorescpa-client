import api from './api';
import { AccountPayable, AccountPayableFormValues } from 'types/accountPayable';
import { ApiResponse } from 'types/common';

export const accountPayableService = {
  /**
   * Gets all accounts payable
   * @returns Array of accounts payable
   */
  getAll: async (): Promise<AccountPayable[]> => {
    const response = await api.get<ApiResponse<AccountPayable[]>>('/accounts-payable');
    return response.data.data;
  },

  /**
   * Gets accounts payable by company
   * @param companyId - Company ID
   * @returns Array of accounts payable for the company
   */
  getByCompany: async (companyId: number): Promise<AccountPayable[]> => {
    const response = await api.get<ApiResponse<AccountPayable[]>>(
      `/accounts-payable/company/${companyId}`
    );
    return response.data.data;
  },

  /**
   * Gets a single account payable by ID
   * @param id - Account payable ID
   * @returns Account payable object
   */
  getById: async (id: number): Promise<AccountPayable> => {
    const response = await api.get<ApiResponse<AccountPayable>>(`/accounts-payable/${id}`);
    return response.data.data;
  },

  /**
   * Creates a new account payable
   * @param data - Account payable form data
   * @returns Created account payable
   */
  create: async (data: AccountPayableFormValues): Promise<AccountPayable> => {
    const response = await api.post<ApiResponse<AccountPayable>>('/accounts-payable', data);
    return response.data.data;
  },

  /**
   * Updates an existing account payable
   * @param id - Account payable ID
   * @param data - Updated account payable data
   * @returns Updated account payable
   */
  update: async (id: number, data: AccountPayableFormValues): Promise<AccountPayable> => {
    const response = await api.put<ApiResponse<AccountPayable>>(
      `/accounts-payable/${id}`,
      data
    );
    return response.data.data;
  },

  /**
   * Deletes an account payable
   * @param id - Account payable ID
   */
  delete: async (id: number): Promise<void> => {
    await api.delete(`/accounts-payable/${id}`);
  },
};

