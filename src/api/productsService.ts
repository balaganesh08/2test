/**
 * Products service - handles all product-related operations
 * Following the Single Responsibility Principle - this service handles only product operations
 */
import { apiService } from './apiClient';
import { ApiResponse, PaginatedResponse } from '@/typeDefinitions/commonTypes';

// Product interface
export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  inStock: boolean;
  quantity: number;
  createdAt: string;
  updatedAt: string;
}

// Type for product filtering
export interface ProductFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  inStock?: boolean;
}

// Type for creating a new product
export interface CreateProductDto {
  name: string;
  description: string;
  price: number;
  imageUrl: string;
  category: string;
  tags: string[];
  quantity: number;
}

// Type for updating an existing product
export interface UpdateProductDto {
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: string;
  tags?: string[];
  inStock?: boolean;
  quantity?: number;
}

class ProductsService {
  /**
   * Get all products with optional filtering, pagination and sorting
   */
  async getProducts(
    page = 1, 
    pageSize = 10, 
    filters?: ProductFilter, 
    sort?: string
  ): Promise<ApiResponse<PaginatedResponse<Product>>> {
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
      if (filters.inStock !== undefined) queryParams.append('inStock', filters.inStock.toString());
      if (filters.minPrice) queryParams.append('minPrice', filters.minPrice.toString());
      if (filters.maxPrice) queryParams.append('maxPrice', filters.maxPrice.toString());
      if (filters.tags && filters.tags.length) {
        filters.tags.forEach(tag => queryParams.append('tags', tag));
      }
    }
    
    return apiService.get<PaginatedResponse<Product>>(`/products?${queryParams.toString()}`);
  }
  
  /**
   * Get a single product by ID
   */
  async getProductById(id: string): Promise<ApiResponse<Product>> {
    return apiService.get<Product>(`/products/${id}`);
  }
  
  /**
   * Get products by category
   */
  async getProductsByCategory(category: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return apiService.get<PaginatedResponse<Product>>(
      `/products/category/${category}?page=${page}&pageSize=${pageSize}`
    );
  }
  
  /**
   * Get featured products
   */
  async getFeaturedProducts(): Promise<ApiResponse<Product[]>> {
    return apiService.get<Product[]>('/products/featured');
  }
  
  /**
   * Search products by query
   */
  async searchProducts(query: string, page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Product>>> {
    return apiService.get<PaginatedResponse<Product>>(
      `/products/search?q=${encodeURIComponent(query)}&page=${page}&pageSize=${pageSize}`
    );
  }
  
  /**
   * Get available product categories
   */
  async getCategories(): Promise<ApiResponse<string[]>> {
    return apiService.get<string[]>('/products/categories');
  }
  
  /**
   * Create a new product
   */
  async createProduct(productData: CreateProductDto): Promise<ApiResponse<Product>> {
    return apiService.post<Product>('/products', productData);
  }

  /**
   * Update an existing product
   */
  async updateProduct(id: string, productData: UpdateProductDto): Promise<ApiResponse<Product>> {
    return apiService.put<Product>(`/products/${id}`, productData);
  }

  /**
   * Delete a product
   */
  async deleteProduct(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/products/${id}`);
  }

  /**
   * Bulk delete multiple products
   */
  async bulkDeleteProducts(ids: string[]): Promise<ApiResponse<void>> {
    return apiService.post<void>('/products/bulk-delete', { ids });
  }
}

// Export as a singleton
export const productsService = new ProductsService();
