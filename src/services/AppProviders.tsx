'use client';

import React from 'react';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { AuthProvider } from '@/context/authenticationContext';
import { DealProvider } from '@/context/dealManagementContext';

// Create a client for React Query
const queryClient = new QueryClient({
  defaultOptions: {
    queries: {
      refetchOnWindowFocus: false,
      retry: 1,
      staleTime: 5 * 60 * 1000, // 5 minutes
    },
  },
});

interface AppProvidersProps {
  children: React.ReactNode;
}

/**
 * Component that wraps the application with all necessary providers
 * The order matters - providers that depend on other providers should be nested inside them
 */
export const AppProviders: React.FC<AppProvidersProps> = ({ children }) => {
  return (
    <QueryClientProvider client={queryClient}>
      <AuthProvider>
        <DealProvider>
          {children}
        </DealProvider>
      </AuthProvider>
    </QueryClientProvider>
  );
};
