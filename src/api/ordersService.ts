/**
 * Orders service - handles all order-related operations
 * Following the Single Responsibility Principle - this service handles only order operations
 */
import { apiService } from './apiClient';
import { ApiResponse, PaginatedResponse } from '@/typeDefinitions/commonTypes';

// Order status enum
export enum OrderStatus {
  PENDING = 'PENDING',
  PROCESSING = 'PROCESSING',
  SHIPPED = 'SHIPPED',
  DELIVERED = 'DELIVERED',
  CANCELLED = 'CANCELLED',
  REFUNDED = 'REFUNDED'
}

// Order item interface
export interface OrderItem {
  productId: string;
  productName: string;
  quantity: number;
  price: number;
  discount: number;
  imageUrl?: string;
}

// Order interface
export interface Order {
  id: string;
  userId: string;
  items: OrderItem[];
  status: OrderStatus;
  totalAmount: number;
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
  paymentStatus: 'PAID' | 'PENDING' | 'FAILED';
  createdAt: string;
  updatedAt: string;
}

// Address interface
export interface Address {
  fullName: string;
  addressLine1: string;
  addressLine2?: string;
  city: string;
  state: string;
  postalCode: string;
  country: string;
  phoneNumber: string;
}

// Type for order filtering
export interface OrderFilter {
  status?: OrderStatus;
  startDate?: string;
  endDate?: string;
  minAmount?: number;
  maxAmount?: number;
}

// Type for creating a new order
export interface CreateOrderDto {
  items: {
    productId: string;
    quantity: number;
  }[];
  shippingAddress: Address;
  billingAddress: Address;
  paymentMethod: string;
}

// Type for updating an existing order
export interface UpdateOrderDto {
  status?: OrderStatus;
  shippingAddress?: Address;
  billingAddress?: Address;
  paymentStatus?: 'PAID' | 'PENDING' | 'FAILED';
}

class OrdersService {
  /**
   * Get all orders with optional filtering, pagination and sorting
   */
  async getOrders(
    page = 1, 
    pageSize = 10, 
    filters?: OrderFilter, 
    sort?: string
  ): Promise<ApiResponse<PaginatedResponse<Order>>> {
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
      if (filters.status) queryParams.append('status', filters.status);
      if (filters.startDate) queryParams.append('startDate', filters.startDate);
      if (filters.endDate) queryParams.append('endDate', filters.endDate);
      if (filters.minAmount) queryParams.append('minAmount', filters.minAmount.toString());
      if (filters.maxAmount) queryParams.append('maxAmount', filters.maxAmount.toString());
    }
    
    return apiService.get<PaginatedResponse<Order>>(`/orders?${queryParams.toString()}`);
  }
  
  /**
   * Get a single order by ID
   */
  async getOrderById(id: string): Promise<ApiResponse<Order>> {
    return apiService.get<Order>(`/orders/${id}`);
  }
  
  /**
   * Get orders for the current user
   */
  async getMyOrders(page = 1, pageSize = 10): Promise<ApiResponse<PaginatedResponse<Order>>> {
    return apiService.get<PaginatedResponse<Order>>(`/orders/me?page=${page}&pageSize=${pageSize}`);
  }
  
  /**
   * Create a new order
   */
  async createOrder(orderData: CreateOrderDto): Promise<ApiResponse<Order>> {
    return apiService.post<Order>('/orders', orderData);
  }

  /**
   * Update an existing order
   */
  async updateOrder(id: string, orderData: UpdateOrderDto): Promise<ApiResponse<Order>> {
    return apiService.put<Order>(`/orders/${id}`, orderData);
  }

  /**
   * Cancel an order
   */
  async cancelOrder(id: string): Promise<ApiResponse<Order>> {
    return apiService.post<Order>(`/orders/${id}/cancel`, {});
  }

  /**
   * Process a payment for an order
   */
  async processPayment(orderId: string, paymentDetails: any): Promise<ApiResponse<any>> {
    return apiService.post<any>(`/orders/${orderId}/payment`, paymentDetails);
  }

  /**
   * Delete an order (admin only)
   */
  async deleteOrder(id: string): Promise<ApiResponse<void>> {
    return apiService.delete<void>(`/orders/${id}`);
  }
}

// Export as a singleton
export const ordersService = new OrdersService();
