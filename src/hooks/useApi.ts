// ========================================
// HOOK PARA MANEJO DE LLAMADAS API
// ========================================

import { useState, useCallback } from 'react';
import type { ApiError } from '@/types';

interface UseApiState<T> {
  data: T | null;
  error: ApiError | null;
  isLoading: boolean;
}

interface UseApiReturn<T> extends UseApiState<T> {
  execute: (...args: any[]) => Promise<T | null>;
  reset: () => void;
}

/**
 * Hook para manejar llamadas a API con estado de loading y error
 * 
 * @example
 * const { data, isLoading, error, execute } = useApi(empresaService.getClientes);
 * 
 * useEffect(() => {
 *   execute({ page: 1, pageSize: 10 });
 * }, []);
 */
export function useApi<T>(
  apiFunction: (...args: any[]) => Promise<T>
): UseApiReturn<T> {
  const [state, setState] = useState<UseApiState<T>>({
    data: null,
    error: null,
    isLoading: false,
  });

  const execute = useCallback(
    async (...args: any[]): Promise<T | null> => {
      setState((prev) => ({ ...prev, isLoading: true, error: null }));

      try {
        const result = await apiFunction(...args);
        setState({ data: result, error: null, isLoading: false });
        return result;
      } catch (error) {
        const apiError = error as ApiError;
        setState({ data: null, error: apiError, isLoading: false });
        return null;
      }
    },
    [apiFunction]
  );

  const reset = useCallback(() => {
    setState({ data: null, error: null, isLoading: false });
  }, []);

  return {
    ...state,
    execute,
    reset,
  };
}
