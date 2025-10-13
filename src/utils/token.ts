import { jwtDecode } from 'jwt-decode';

interface JwtPayload {
  exp: number;
  [key: string]: unknown;
}

/**
 * Checks if a JWT token is expired
 * @param token - The JWT token to check
 * @returns true if token is expired or invalid, false otherwise
 */
export const isTokenExpired = (token?: string): boolean => {
  if (!token) return true;

  try {
    const decoded = jwtDecode<JwtPayload>(token);
    const currentTime = Date.now();
    const expirationTime = decoded.exp * 1000;

    return currentTime >= expirationTime;
  } catch (error) {
    console.error('Error decoding token:', error);
    return true;
  }
};

/**
 * Decodes a JWT token and returns its payload
 * @param token - The JWT token to decode
 * @returns The decoded payload or null if invalid
 */
export const getTokenPayload = <T = JwtPayload>(token: string): T | null => {
  try {
    return jwtDecode<T>(token);
  } catch (error) {
    console.error('Error decoding token:', error);
    return null;
  }
};

/**
 * Gets the token from localStorage
 * @returns The token string or null
 */
export const getStoredToken = (): string | null => {
  try {
    const userStr = localStorage.getItem('user');
    if (!userStr) return null;

    const user = JSON.parse(userStr);
    return user?.token || null;
  } catch (error) {
    console.error('Error retrieving token from storage:', error);
    return null;
  }
};

/**
 * Checks if user is authenticated based on stored token
 * @returns true if user has valid token, false otherwise
 */
export const isAuthenticated = (): boolean => {
  const token = getStoredToken();
  if (!token) return false;

  return !isTokenExpired(token);
};

