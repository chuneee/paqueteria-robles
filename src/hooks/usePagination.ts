// ========================================
// HOOK PARA PAGINACIÓN
// ========================================

import { useState, useCallback } from 'react';
import { PAGINATION } from '@/config/constants';
import type { PaginationParams } from '@/types';

interface UsePaginationReturn {
  page: number;
  pageSize: number;
  setPage: (page: number) => void;
  setPageSize: (pageSize: number) => void;
  nextPage: () => void;
  previousPage: () => void;
  reset: () => void;
  getPaginationParams: () => PaginationParams;
}

/**
 * Hook para manejar paginación
 * 
 * @example
 * const { page, pageSize, setPage, getPaginationParams } = usePagination();
 * 
 * useEffect(() => {
 *   loadData(getPaginationParams());
 * }, [page, pageSize]);
 */
export function usePagination(
  initialPage = PAGINATION.DEFAULT_PAGE,
  initialPageSize = PAGINATION.DEFAULT_PAGE_SIZE
): UsePaginationReturn {
  const [page, setPage] = useState(initialPage);
  const [pageSize, setPageSize] = useState(initialPageSize);

  const nextPage = useCallback(() => {
    setPage((prev) => prev + 1);
  }, []);

  const previousPage = useCallback(() => {
    setPage((prev) => Math.max(1, prev - 1));
  }, []);

  const reset = useCallback(() => {
    setPage(initialPage);
    setPageSize(initialPageSize);
  }, [initialPage, initialPageSize]);

  const getPaginationParams = useCallback((): PaginationParams => {
    return { page, pageSize };
  }, [page, pageSize]);

  return {
    page,
    pageSize,
    setPage,
    setPageSize,
    nextPage,
    previousPage,
    reset,
    getPaginationParams,
  };
}
