/**
 * Storage utility functions following the Single Responsibility Principle
 * Centralizes all browser storage operations to avoid code duplication
 */

/**
 * Check if code is running in a browser environment
 */
export const isBrowser = (): boolean => {
  return typeof window !== 'undefined';
};

/**
 * Get an item from localStorage with type safety
 */
export const getStorageItem = <T>(key: string): T | null => {
  if (!isBrowser()) {
    return null;
  }
  
  try {
    const item = localStorage.getItem(key);
    return item ? JSON.parse(item) : null;
  } catch (error) {
    console.error(`Error getting item ${key} from localStorage:`, error);
    return null;
  }
};

/**
 * Set an item in localStorage with type safety
 */
export const setStorageItem = <T>(key: string, value: T): void => {
  if (!isBrowser()) {
    return;
  }
  
  try {
    localStorage.setItem(key, JSON.stringify(value));
  } catch (error) {
    console.error(`Error setting item ${key} in localStorage:`, error);
  }
};

/**
 * Remove an item from localStorage
 */
export const removeStorageItem = (key: string): void => {
  if (!isBrowser()) {
    return;
  }
  
  try {
    localStorage.removeItem(key);
  } catch (error) {
    console.error(`Error removing item ${key} from localStorage:`, error);
  }
};

/**
 * Clear all items from localStorage
 */
export const clearStorage = (): void => {
  if (!isBrowser()) {
    return;
  }
  
  try {
    localStorage.clear();
  } catch (error) {
    console.error('Error clearing localStorage:', error);
  }
};

// Constants for storage keys to avoid string duplication
export const STORAGE_KEYS = {
  AUTH_TOKEN: 'token',
  USER_DATA: 'userData',
  THEME: 'theme',
  LANGUAGE: 'language'
};
