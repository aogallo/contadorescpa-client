import { describe, it, expect, vi, beforeEach } from 'vitest';

import { isTokenExpired, getTokenPayload, getStoredToken, isAuthenticated } from '../token';

describe('token utilities', () => {
  beforeEach(() => {
    // Clear all mocks before each test
    vi.clearAllMocks();
    localStorage.clear();
  });

  describe('isTokenExpired', () => {
    it('should return true for undefined token', () => {
      expect(isTokenExpired()).toBe(true);
    });

    it('should return true for empty string', () => {
      expect(isTokenExpired('')).toBe(true);
    });

    it('should return true for expired token', () => {
      // Token with exp in the past (January 1, 2020)
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Nzc4MzY4MDB9.5K6-y8Q6QqXhN9Z3f7rYH3x3L9R1bZH5Qh8Y5wX4cXw';
      expect(isTokenExpired(expiredToken)).toBe(true);
    });

    it('should return false for valid token', () => {
      // Create a token that expires in 1 hour
      const futureExp = Math.floor(Date.now() / 1000) + 3600;
      const payload = JSON.stringify({ exp: futureExp });
      const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(payload)}.signature`;

      expect(isTokenExpired(validToken)).toBe(false);
    });

    it('should return true for malformed token', () => {
      expect(isTokenExpired('invalid-token')).toBe(true);
    });

    it('should handle token without exp claim', () => {
      const payload = JSON.stringify({ userId: 1 });
      const tokenWithoutExp = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(payload)}.signature`;

      // Should return true because exp is undefined
      expect(isTokenExpired(tokenWithoutExp)).toBe(true);
    });
  });

  describe('getTokenPayload', () => {
    it('should decode valid token', () => {
      const payload = { userId: 1, exp: 1234567890, username: 'testuser' };
      const encodedPayload = btoa(JSON.stringify(payload));
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${encodedPayload}.signature`;

      const result = getTokenPayload(token);
      expect(result).toEqual(payload);
    });

    it('should return null for invalid token', () => {
      expect(getTokenPayload('invalid')).toBeNull();
    });

    it('should return null for malformed JWT', () => {
      expect(getTokenPayload('header.invalid-base64.signature')).toBeNull();
    });

    it('should handle custom type parameter', () => {
      interface CustomPayload {
        userId: number;
        role: string;
      }

      const payload: CustomPayload = { userId: 1, role: 'admin' };
      const encodedPayload = btoa(JSON.stringify(payload));
      const token = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${encodedPayload}.signature`;

      const result = getTokenPayload<CustomPayload>(token);
      expect(result).toEqual(payload);
      expect(result?.role).toBe('admin');
    });
  });

  describe('getStoredToken', () => {
    it('should return token from localStorage', () => {
      const mockUser = { token: 'test-token', username: 'testuser' };
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(JSON.stringify(mockUser));

      const token = getStoredToken();
      expect(token).toBe('test-token');
      expect(localStorage.getItem).toHaveBeenCalledWith('user');
    });

    it('should return null if no user in localStorage', () => {
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(null);

      const token = getStoredToken();
      expect(token).toBeNull();
    });

    it('should return null if user has no token', () => {
      const mockUser = { username: 'testuser' };
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(JSON.stringify(mockUser));

      const token = getStoredToken();
      expect(token).toBeNull();
    });

    it('should handle JSON parse errors', () => {
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue('invalid-json');

      const token = getStoredToken();
      expect(token).toBeNull();
    });
  });

  describe('isAuthenticated', () => {
    it('should return false if no token stored', () => {
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(null);

      expect(isAuthenticated()).toBe(false);
    });

    it('should return false if token is expired', () => {
      const expiredToken =
        'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJleHAiOjE1Nzc4MzY4MDB9.signature';
      const mockUser = { token: expiredToken };
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(JSON.stringify(mockUser));

      expect(isAuthenticated()).toBe(false);
    });

    it('should return true if token is valid', () => {
      const futureExp = Math.floor(Date.now() / 1000) + 3600;
      const payload = JSON.stringify({ exp: futureExp });
      const validToken = `eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.${btoa(payload)}.signature`;
      const mockUser = { token: validToken };
      (localStorage.getItem as ReturnType<typeof vi.fn>).mockReturnValue(JSON.stringify(mockUser));

      expect(isAuthenticated()).toBe(true);
    });
  });
});

