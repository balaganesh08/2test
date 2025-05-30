/**
 * Deals service - handles all deal-related operations
 * Following the Single Responsibility Principle - this service handles only deal operations
 */
import { Deal, DealFilter, ApiResponse, PaginatedResponse } from '@/typeDefinitions/commonTypes';
import { apiService } from './apiClient';

// Type for creating a new deal
export interface CreateDealDto {
  title: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
  category: string;
  tags: string[];
  expiresAt: string;
}

// Type for updating an existing deal
export interface UpdateDealDto {
  title?: string;
  description?: string;
  price?: number;
  discount?: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  status?: string;
  expiresAt?: string;
}

class DealsService {
  /**
   * Get all deals with optional filtering, pagination and sorting
   */
  async getDeals(
    page = 1, 
    pageSize = 10, 
    filters?: DealFilter, 
    sort?: string
  ): Promise<ApiResponse<PaginatedResponse<Deal>>> {
    const queryParams = new URLSearchParams();
    
    // Add pagination params
    queryParams.append('page', page.toString());
    queryParams.append('pageSize', pageSize.toString());
    
    // Add sorting if provided
    if (sort) {
      queryParams.append('sort', sort);
    }
    
    // Add filters if provided
    if (filters) {
      if (filters.category) queryParams.append('category', filters.category);
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.tags && filters.tags.length) {
        filters.tags.forEach(tag => queryParams.append('tags', tag));
      }
    }
    
    return apiService.get<PaginatedResponse<Deal>>(`/deals?${queryParams.toString()}`);
  }
  
  /**
   * Get a single deal by ID
   */
  async getDealById(id: string): Promise<ApiResponse<Deal>> {
    return apiService.get<Deal>(`/deals/${id}`);
  }
  
  /**
   * Get deals by category
   */
  async getDealsByCategory(category: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Deal>>> {
    return apiService.get<PaginatedResponse<Deal>>(
      `/deals/category/${category}?page=${page}&pageSize=${pageSize}`
    );
  }
  
  /**
   * Get featured deals
   */
  async getFeaturedDeals(): Promise<ApiResponse<Deal[]>> {
    return apiService.get<Deal[]>('/deals/featured');
  }
  
  /**
   * Search deals by query
   */
  async searchDeals(query: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Deal>>> {
    return apiService.get<PaginatedResponse<Deal>>(
      `/deals/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
  }
  
  /**
   * Get available deal categories
   */
  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/deals/categories');
  }
  
  /**
   * Get popular tags
   */
  async getPopularTags(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/deals/tags');
  }

  /**
   * Create a new deal
   */
  async createDeal(dealData: CreateDealDto): Promise<ApiResponse<Deal>> {
    return apiService.post<Deal>('/deals', dealData);
  }

  /**
   * Update an existing deal
   */
  async updateDeal(id: string, dealData: UpdateDealDto): Promise<ApiResponse<Deal>> {
    return apiService.put<Deal>(`/deals/${id}`, dealData);
  }

  /**
   * Delete a deal
   */
  async deleteDeal(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/deals/${id}`);
  }

  /**
   * Bulk delete multiple deals
   */
  async bulkDeleteDeals(ids: string[]): Promise<ApiResponse<void>> {
    return apiService.post<void>('/deals/bulk-delete', { ids });
  }
}

// Export as a singleton
export const dealsService = new DealsService();
