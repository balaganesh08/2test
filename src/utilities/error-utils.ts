/**
 * Error handling utility functions following the Single Responsibility Principle
 * Centralizes error handling to avoid code duplication
 */

import { ApiResponse } from '@/typeDefinitions/commonTypes';

/**
 * Standard error handler for API responses
 */
export function handleApiError<T>(error: any): ApiResponse<T> {
  return {
    data: {} as T,
    status: error.response?.status || 500,
    message: error.response?.data?.message || 'An error occurred',
  };
}

/**
 * Format error message for display
 */
export function formatErrorMessage(error: any): string {
  if (typeof error === 'string') {
    return error;
  }
  
  if (error instanceof Error) {
    return error.message;
  }
  
  if (error?.response?.data?.message) {
    return error.response.data.message;
  }
  
  return 'An unexpected error occurred';
}

/**
 * Log error with consistent format
 */
export function logError(error: any, context?: string): void {
  const message = formatErrorMessage(error);
  const contextPrefix = context ? `[${context}] ` : '';
  console.error(`${contextPrefix}Error: ${message}`, error);
}

/**
 * Check if error is a network error
 */
export function isNetworkError(error: any): boolean {
  return error?.message === 'Network Error' || !navigator.onLine;
}

/**
 * Check if error is an authentication error
 */
export function isAuthError(error: any): boolean {
  return error?.response?.status === 401;
}

/**
 * Check if error is a permission error
 */
export function isPermissionError(error: any): boolean {
  return error?.response?.status === 403;
}

/**
 * Check if error is a not found error
 */
export function isNotFoundError(error: any): boolean {
  return error?.response?.status === 404;
}

/**
 * Check if error is a validation error
 */
export function isValidationError(error: any): boolean {
  return error?.response?.status === 422;
}

/**
 * Get validation errors from response
 */
export function getValidationErrors(error: any): Record<string, string> {
  if (isValidationError(error) && error?.response?.data?.errors) {
    return error.response.data.errors;
  }
  return {};
}
