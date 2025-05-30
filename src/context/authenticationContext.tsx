/**
 * AuthContext - Manages authentication state throughout the application
 * Following the Dependency Inversion Principle - high-level modules depend on abstractions
 */
'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { AuthState, User } from '@/typeDefinitions/commonTypes';
import { authService, LoginCredentials, RegisterData } from '@/api/authenticationService';

// Define the context interface
interface AuthContextType extends AuthState {
  login: (credentials: LoginCredentials) => Promise<boolean>;
  register: (data: RegisterData) => Promise<boolean>;
  logout: () => void;
  clearError: () => void;
}

// Create context with default values
const AuthContext = createContext<AuthContextType>({
  user: null,
  isAuthenticated: false,
  isLoading: false,
  error: null,
  login: async () => false,
  register: async () => false,
  logout: () => {},
  clearError: () => {},
});

// Custom hook for using the auth context
export const useAuth = () => useContext(AuthContext);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [state, setState] = useState<AuthState>({
    user: null,
    isAuthenticated: false,
    isLoading: true,
    error: null,
  });

  // Function to update state partially
  const updateState = (newState: Partial<AuthState>) => {
    setState(prevState => ({ ...prevState, ...newState }));
  };

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      try {
        if (authService.isAuthenticated()) {
          const response = await authService.getCurrentUser();
          if (response.status === 200) {
            updateState({
              user: response.data,
              isAuthenticated: true,
              isLoading: false,
            });
          } else {
            // Token is invalid or expired
            authService.logout();
            updateState({
              user: null,
              isAuthenticated: false,
              isLoading: false,
            });
          }
        } else {
          updateState({ isLoading: false });
        }
      } catch (error) {
        updateState({
          isLoading: false,
          isAuthenticated: false,
        });
      }
    };

    checkAuth();
  }, []);

  // Login function
  const login = async (credentials: LoginCredentials): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await authService.login(credentials);
      
      if (response.status === 200 && response.data) {
        const { user, token } = response.data;
        authService.setToken(token);
        
        updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Login failed',
        });
        return false;
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred during login',
      });
      return false;
    }
  };

  // Register function
  const register = async (data: RegisterData): Promise<boolean> => {
    updateState({ isLoading: true, error: null });
    
    try {
      const response = await authService.register(data);
      
      if (response.status === 201 && response.data) {
        const { user, token } = response.data;
        authService.setToken(token);
        
        updateState({
          user,
          isAuthenticated: true,
          isLoading: false,
        });
        
        return true;
      } else {
        updateState({
          isLoading: false,
          error: response.message || 'Registration failed',
        });
        return false;
      }
    } catch (error: any) {
      updateState({
        isLoading: false,
        error: error.message || 'An error occurred during registration',
      });
      return false;
    }
  };

  // Logout function
  const logout = () => {
    authService.logout();
    updateState({
      user: null,
      isAuthenticated: false,
    });
  };

  // Clear error
  const clearError = () => {
    updateState({ error: null });
  };

  const value = {
    ...state,
    login,
    register,
    logout,
    clearError,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};
