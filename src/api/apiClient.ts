/**
 * Base API service for making HTTP requests
 * Following the Single Responsibility Principle - this service handles only HTTP communication
 */
import axios, { AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios';
import { ApiResponse } from '@/typeDefinitions/commonTypes';

class ApiService {
  private api: AxiosInstance;
  
  constructor() {
    this.api = axios.create({
      baseURL: process.env.NEXT_PUBLIC_API_URL || 'http://localhost:3001/api',
      headers: {
        'Content-Type': 'application/json',
      },
      timeout: 10000,
    });
    
    // Request interceptor - adds auth token
    this.api.interceptors.request.use(
      (config) => {
        const token = typeof window !== 'undefined' ? localStorage.getItem('token') : null;
        if (token) {
          config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
      },
      (error) => Promise.reject(error)
    );
    
    // Response interceptor - handles error responses
    this.api.interceptors.response.use(
      (response) => response,
      (error) => {
        // Handle token expiration
        if (error.response?.status === 401) {
          if (typeof window !== 'undefined') {
            localStorage.removeItem('token');
            window.location.href = '/login';
          }
        }
        return Promise.reject(error);
      }
    );
  }
  
  /**
   * Make a GET request
   */
  async get<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.api.get(url, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }
  
  /**
   * Make a POST request
   */
  async post<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.api.post(url, data, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }
  
  /**
   * Make a PUT request
   */
  async put<T>(url: string, data?: any, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.api.put(url, data, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }
  
  /**
   * Make a DELETE request
   */
  async delete<T>(url: string, config?: AxiosRequestConfig): Promise<ApiResponse<T>> {
    try {
      const response: AxiosResponse = await this.api.delete(url, config);
      return {
        data: response.data,
        status: response.status,
        message: 'Success',
      };
    } catch (error: any) {
      return this.handleError<T>(error);
    }
  }
  
  /**
   * Handle API errors consistently
   */
  private handleError<T>(error: any): ApiResponse<T> {
    return {
      data: {} as T,
      status: error.response?.status || 500,
      message: error.response?.data?.message || 'An error occurred',
    };
  }
}

// Export as a singleton to maintain a single instance across the app
export const apiService = new ApiService();
