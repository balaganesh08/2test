/**
 * Common types used throughout the application
 */

// User related types
export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isVerified: boolean;
}

export enum UserRole {
  ADMIN = 'ADMIN',
  USER = 'USER',
}

// Authentication related types
export interface AuthState {
  user: User | null;
  isAuthenticated: boolean;
  isLoading: boolean;
  error: string | null;
}

// Deal related types
export interface Deal {
  id: string;
  title: string;
  description: string;
  price: number;
  discount: number;
  imageUrl: string;
  category: string;
  tags: string[];
  status: DealStatus;
  createdAt: string;
  expiresAt: string;
}

export enum DealStatus {
  ACTIVE = 'ACTIVE',
  EXPIRED = 'EXPIRED',
  UPCOMING = 'UPCOMING',
}

export interface DealFilter {
  category?: string;
  minPrice?: number;
  maxPrice?: number;
  tags?: string[];
  status?: DealStatus;
}

// API related types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message: string;
}

export interface PaginatedResponse<T> {
  items: T[];
  total: number;
  page: number;
  pageSize: number;
  totalPages: number;
}

// Component props
export interface ButtonProps {
  children: React.ReactNode;
  variant?: 'primary' | 'secondary' | 'outline' | 'text';
  size?: 'sm' | 'md' | 'lg';
  isLoading?: boolean;
  disabled?: boolean;
  onClick?: () => void;
  className?: string;
}
