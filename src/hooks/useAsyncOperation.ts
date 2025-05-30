/**
 * useAsync - A hook for handling async functions with loading, error, and success states
 * Following the Single Responsibility Principle - handles only async state management
 */
import { useState, useCallback } from 'react';

interface AsyncState<T> {
  data: T | null;
  loading: boolean;
  error: Error | null;
}

type AsyncFn<T, Args extends any[]> = (...args: Args) => Promise<T>;

export function useAsync<T, Args extends any[] = any[]>(
  asyncFunction: AsyncFn<T, Args>,
  immediate = false,
  initialArgs: Args | null = null
) {
  const [state, setState] = useState<AsyncState<T>>({
    data: null,
    loading: immediate,
    error: null,
  });

  const execute = useCallback(
    (...args: Args) => {
      setState({ data: null, loading: true, error: null });
      return asyncFunction(...args)
        .then((data) => {
          setState({ data, loading: false, error: null });
          return data;
        })
        .catch((error) => {
          setState({ data: null, loading: false, error });
          return Promise.reject(error);
        });
    },
    [asyncFunction]
  );

  // Execute the function immediately if requested
  useState(() => {
    if (immediate && initialArgs) {
      execute(...initialArgs);
    }
  });

  return {
    ...state,
    execute,
    reset: () => setState({ data: null, loading: false, error: null }),
  };
}
