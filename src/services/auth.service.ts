import { ApiResponse } from 'types/common';
import { User, LoginCredentials } from 'types/user';

import api from './api';

export const authService = {
  /**
   * Authenticates user with credentials
   * @param credentials - Username and password
   * @returns User object with token
   */
  login: async (credentials: LoginCredentials): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/auth/login', credentials);
    return response.data.data;
  },

  /**
   * Logs out current user
   */
  logout: async (): Promise<void> => {
    try {
      await api.post('/auth/logout');
    } finally {
      localStorage.removeItem('user');
    }
  },

  /**
   * Gets current authenticated user
   * @returns Current user
   */
  getCurrentUser: async (): Promise<User> => {
    const response = await api.get<ApiResponse<User>>('/auth/me');
    return response.data.data;
  },

  /**
   * Refreshes authentication token
   * @returns New user object with refreshed token
   */
  refreshToken: async (): Promise<User> => {
    const response = await api.post<ApiResponse<User>>('/auth/refresh');
    return response.data.data;
  },
};

