/**
 * Data fetching utility functions following the Single Responsibility Principle
 * Centralizes data fetching utilities to avoid code duplication
 */

import React from 'react';
import { ApiResponse } from '@/typeDefinitions/commonTypes';

// Define a more specific PaginatedResponse interface for our utility
export interface PaginatedData<T> {
  items: T[];
  currentPage: number;
  pageSize: number;
  totalItems: number;
  totalPages: number;
}
import { useAsync } from '@/hooks/useAsyncOperation';

/**
 * Helper to handle paginated data
 */
export function usePaginatedData<T>(
  fetchFunction: (page: number, pageSize: number, ...args: any[]) => Promise<ApiResponse<PaginatedData<T>>>,
  initialPage = 1,
  initialPageSize = 10,
  ...additionalArgs: any[]
) {
  const {
    data,
    loading,
    error,
    execute: fetchData
  } = useAsync<ApiResponse<PaginatedData<T>>>(
    async (page: number, pageSize: number, ...args: any[]) => 
      fetchFunction(page, pageSize, ...args),
    true,
    [initialPage, initialPageSize, ...additionalArgs]
  );

  const handlePageChange = (newPage: number) => {
    fetchData(newPage, data?.data?.pageSize || initialPageSize, ...additionalArgs);
  };

  const handlePageSizeChange = (newPageSize: number) => {
    fetchData(1, newPageSize, ...additionalArgs);
  };

  return {
    items: data?.data?.items || [],
    pagination: {
      currentPage: data?.data?.currentPage || initialPage,
      pageSize: data?.data?.pageSize || initialPageSize,
      totalItems: data?.data?.totalItems || 0,
      totalPages: data?.data?.totalPages || 0,
    },
    loading,
    error,
    handlePageChange,
    handlePageSizeChange,
    refetch: fetchData,
  };
}

/**
 * Helper to handle data filtering
 */
export function useFilteredData<T, F>(
  fetchFunction: (filters: F) => Promise<ApiResponse<T[]>>,
  initialFilters: F
) {
  const {
    data,
    loading,
    error,
    execute: fetchData
  } = useAsync<ApiResponse<T[]>>(
    async (filters: F) => fetchFunction(filters),
    true,
    [initialFilters]
  );

  const handleFilterChange = (newFilters: F) => {
    fetchData(newFilters);
  };

  return {
    items: data?.data || [],
    loading,
    error,
    filters: initialFilters,
    handleFilterChange,
    refetch: fetchData,
  };
}

/**
 * Helper to handle data sorting
 */
export function useSortedData<T>(
  items: T[],
  initialSortField: keyof T,
  initialSortDirection: 'asc' | 'desc' = 'asc'
) {
  const [sortField, setSortField] = React.useState<keyof T>(initialSortField);
  const [sortDirection, setSortDirection] = React.useState<'asc' | 'desc'>(initialSortDirection);

  const sortedItems = React.useMemo(() => {
    return [...items].sort((a, b) => {
      if (a[sortField] < b[sortField]) {
        return sortDirection === 'asc' ? -1 : 1;
      }
      if (a[sortField] > b[sortField]) {
        return sortDirection === 'asc' ? 1 : -1;
      }
      return 0;
    });
  }, [items, sortField, sortDirection]);

  const handleSort = (field: keyof T) => {
    if (field === sortField) {
      setSortDirection(sortDirection === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDirection('asc');
    }
  };

  return {
    items: sortedItems,
    sortField,
    sortDirection,
    handleSort,
  };
}
