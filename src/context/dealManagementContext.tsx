/**
 * DealContext - Manages deal state throughout the application
 * Following the Dependency Inversion Principle - high-level modules depend on abstractions
 */
'use client';

import React, { createContext, useContext, useState, useCallback } from 'react';
import { Deal, DealFilter } from '@/typeDefinitions/commonTypes';
import { dealsService } from '@/api/dealsService';

interface DealState {
  deals: Deal[];
  featuredDeals: Deal[];
  categories: string[];
  popularTags: string[];
  currentDeal: Deal | null;
  filters: DealFilter;
  pagination: {
    page: number;
    pageSize: number;
    total: number;
    totalPages: number;
  };
  isLoading: boolean;
  error: string | null;
}

interface DealContextType extends DealState {
  fetchDeals: (page?: number, pageSize?: number) => Promise<void>;
  fetchDealById: (id: string) => Promise<Deal | null>;
  fetchFeaturedDeals: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  fetchPopularTags: () => Promise<void>;
  searchDeals: (query: string) => Promise<void>;
  updateFilters: (newFilters: Partial<DealFilter>) => void;
  clearFilters: () => void;
  setCurrentDeal: (deal: Deal | null) => void;
  clearError: () => void;
}

// Create context with default values
const DealContext = createContext<DealContextType>({
  deals: [],
  featuredDeals: [],
  categories: [],
  popularTags: [],
  currentDeal: null,
  filters: {},
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
    totalPages: 0,
  },
  isLoading: false,
  error: null,
  fetchDeals: async () => {},
  fetchDealById: async () => null,
  fetchFeaturedDeals: async () => {},
  fetchCategories: async () => {},
  fetchPopularTags: async () => {},
  searchDeals: async () => {},
  updateFilters: () => {},
  clearFilters: () => {},
  setCurrentDeal: () => {},
  clearError: () => {},
});

// Custom hook for using the deal context
export const useDeal = () => useContext(DealContext);

export const DealProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<DealState>({
    deals: [],
    featuredDeals: [],
    categories: [],
    popularTags: [],
    currentDeal: null,
    filters: {},
    pagination: {
      page: 1,
      pageSize: 10,
      total: 0,
      totalPages: 0,
    },
    isLoading: false,
    error: null,
  });

  // Function to update state partially
  const updateState = (newState: Partial<DealState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  // Fetch deals with pagination and filters
  const fetchDeals = useCallback(async (page = 1, pageSize = 10) => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await dealsService.getDeals(page, pageSize, state.filters);
      
      if (response.status === 200) {
        const paginatedResponse = response.data;
        
        updateState({
          deals: paginatedResponse.items,
          pagination: {
            page: paginatedResponse.page,
            pageSize: paginatedResponse.pageSize,
            total: paginatedResponse.total,
            totalPages: paginatedResponse.totalPages,
          },
          isLoading: false,
        });
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Failed to fetch deals',
        });
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred while fetching deals',
      });
    }
  }, [state.filters]);

  // Fetch a single deal by ID
  const fetchDealById = async (id: string): Promise<Deal | null> => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await dealsService.getDealById(id);
      
      if (response.status === 200) {
        const deal = response.data;
        updateState({
          currentDeal: deal,
          isLoading: false,
        });
        return deal;
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Failed to fetch deal',
        });
        return null;
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred while fetching the deal',
      });
      return null;
    }
  };

  // Fetch featured deals
  const fetchFeaturedDeals = async () => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await dealsService.getFeaturedDeals();
      
      if (response.status === 200) {
        updateState({
          featuredDeals: response.data,
          isLoading: false,
        });
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Failed to fetch featured deals',
        });
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred while fetching featured deals',
      });
    }
  };

  // Fetch categories
  const fetchCategories = async () => {
    try {
      const response = await dealsService.getCategories();
      
      if (response.status === 200) {
        updateState({
          categories: response.data,
        });
      }
    } catch (error: any) {
      console.error('Failed to fetch categories:', error);
    }
  };

  // Fetch popular tags
  const fetchPopularTags = async () => {
    try {
      const response = await dealsService.getPopularTags();
      
      if (response.status === 200) {
        updateState({
          popularTags: response.data,
        });
      }
    } catch (error: any) {
      console.error('Failed to fetch popular tags:', error);
    }
  };

  // Search deals
  const searchDeals = async (query: string) => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await dealsService.searchDeals(
        query, 
        state.pagination.page, 
        state.pagination.pageSize
      );
      
      if (response.status === 200) {
        const paginatedResponse = response.data;
        
        updateState({
          deals: paginatedResponse.items,
          pagination: {
            page: paginatedResponse.page,
            pageSize: paginatedResponse.pageSize,
            total: paginatedResponse.total,
            totalPages: paginatedResponse.totalPages,
          },
          isLoading: false,
        });
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Search failed',
        });
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred during search',
      });
    }
  };

  // Update filters
  const updateFilters = (newFilters: Partial<DealFilter>) => {
    updateState({
      filters: { ...state.filters, ...newFilters },
    });
    // Reset to page 1 when filters change
    fetchDeals(1, state.pagination.pageSize);
  };

  // Clear all filters
  const clearFilters = () => {
    updateState({ filters: {} });
    fetchDeals(1, state.pagination.pageSize);
  };

  // Set current deal
  const setCurrentDeal = (deal: Deal | null) => {
    updateState({ currentDeal: deal });
  };

  // Clear error
  const clearError = () => {
    updateState({ error: null });
  };

  const value = {
    ...state,
    fetchDeals,
    fetchDealById,
    fetchFeaturedDeals,
    fetchCategories,
    fetchPopularTags,
    searchDeals,
    updateFilters,
    clearFilters,
    setCurrentDeal,
    clearError,
  };

  return <DealContext.Provider value={value}>{children}</DealContext.Provider>;
};
