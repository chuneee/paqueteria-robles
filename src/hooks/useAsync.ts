// ========================================
// HOOK PARA OPERACIONES ASÍNCRONAS
// ========================================

import { useState, useEffect, useCallback } from 'react';
import type { ApiError } from '@/types';

interface UseAsyncOptions {
  immediate?: boolean;
}

interface UseAsyncReturn<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook para manejar operaciones asíncronas con ejecución automática
 * 
 * @example
 * const { data, isLoading, error } = useAsync(
 *   () => empresaService.getClientes({ page: 1 }),
 *   { immediate: true }
 * );
 */
export function useAsync<T>(
  asyncFunction: (...args: any[]) => Promise<T>,
  options: UseAsyncOptions = { immediate: true }
): UseAsyncReturn<T> {
  const [data, setData] = useState<T | null>(null);
  const [error, setError] = useState<ApiError | null>(null);
  const [isLoading, setIsLoading] = useState(false);

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setIsLoading(true);
      setError(null);

      try {
        const result = await asyncFunction(...args);
        setData(result);
        setIsLoading(false);
        return result;
      } catch (err) {
        const apiError = err as ApiError;
        setError(apiError);
        setIsLoading(false);
        return null;
      }
    },
    [asyncFunction]
  );

  const reset = useCallback(() => {
    setData(null);
    setError(null);
    setIsLoading(false);
  }, []);

  useEffect(() => {
    if (options.immediate) {
      execute();
    }
  }, [execute, options.immediate]);

  return {
    data,
    error,
    isLoading,
    execute,
    reset,
  };
}
