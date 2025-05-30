/**
 * Auth service - handles all authentication related operations
 * Following the Single Responsibility Principle - this service handles only auth operations
 */
import { User, ApiResponse } from '@/typeDefinitions/commonTypes';
import { apiService } from './apiClient';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData extends LoginCredentials {
  firstName: string;
  lastName: string;
}

export interface AuthResponse {
  user: User;
  token: string;
}

class AuthService {
  /**
   * Log in a user with email and password
   */
  async login(credentials: LoginCredentials): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/login', credentials);
  }
  
  /**
   * Register a new user
   */
  async register(userData: RegisterData): Promise<ApiResponse<AuthResponse>> {
    return apiService.post<AuthResponse>('/auth/register', userData);
  }
  
  /**
   * Log out the current user
   */
  async logout(): Promise<void> {
    if (typeof window !== 'undefined') {
      localStorage.removeItem('token');
    }
  }
  
  /**
   * Get the current authenticated user
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/auth/me');
  }
  
  /**
   * Check if user is authenticated
   */
  isAuthenticated(): boolean {
    if (typeof window === 'undefined') {
      return false;
    }
    const token = localStorage.getItem('token');
    return !!token;
  }
  
  /**
   * Get authentication token
   */
  getToken(): string | null {
    if (typeof window === 'undefined') {
      return null;
    }
    return localStorage.getItem('token');
  }
  
  /**
   * Set authentication token
   */
  setToken(token: string): void {
    if (typeof window !== 'undefined') {
      localStorage.setItem('token', token);
    }
  }
}

// Export as a singleton
export const authService = new AuthService();
