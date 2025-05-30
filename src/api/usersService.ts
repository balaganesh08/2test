/**
 * Users service - handles all user-related operations
 * Following the Single Responsibility Principle - this service handles only user operations
 */
import { User, ApiResponse, PaginatedResponse } from '@/typeDefinitions/commonTypes';
import { apiService } from './apiClient';

// Type for creating a new user
export interface CreateUserDto {
  email: string;
  password: string;
  firstName: string;
  lastName: string;
}

// Type for updating an existing user
export interface UpdateUserDto {
  firstName?: string;
  lastName?: string;
  email?: string;
  password?: string;
}

class UsersService {
  /**
   * Get all users with pagination
   */
  async getUsers(page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<User>>> {
    return apiService.get<PaginatedResponse<User>>(`/users?page=${page}&pageSize=${pageSize}`);
  }
  
  /**
   * Get a single user by ID
   */
  async getUserById(id: string): Promise<ApiResponse<User>> {
    return apiService.get<User>(`/users/${id}`);
  }
  
  /**
   * Get current user profile
   */
  async getCurrentUser(): Promise<ApiResponse<User>> {
    return apiService.get<User>('/users/me');
  }
  
  /**
   * Create a new user
   */
  async createUser(userData: CreateUserDto): Promise<ApiResponse<User>> {
    return apiService.post<User>('/users', userData);
  }

  /**
   * Update an existing user
   */
  async updateUser(id: string, userData: UpdateUserDto): Promise<ApiResponse<User>> {
    return apiService.put<User>(`/users/${id}`, userData);
  }

  /**
   * Update current user profile
   */
  async updateProfile(userData: UpdateUserDto): Promise<ApiResponse<User>> {
    return apiService.put<User>('/users/me', userData);
  }

  /**
   * Delete a user
   */
  async deleteUser(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/users/${id}`);
  }
}

// Export as a singleton
export const usersService = new UsersService();
