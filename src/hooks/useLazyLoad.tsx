import { useState, useEffect, useRef, useCallback } from 'react';
import { useApi } from '@/hooks/useApi'; // 調整路徑

interface UseLazyLoadOptions {
  initialData?: unknown[];
  pageSize?: number;
  rootMargin?: string;
  threshold?: number;
  requireAuth?: boolean;
  autoLoad?: boolean; // 是否自動開始加載
}

interface UseLazyLoadReturn<T> {
  data: T[];
  loading: boolean;
  error: string | null;
  hasMore: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  loadMore: () => void;
  refresh: () => void;
  reset: () => void;
}

export function useLazyLoad<T = unknown>(
  apiEndpoint: string,
  options: UseLazyLoadOptions = {}
): UseLazyLoadReturn<T> {
  const {
    initialData = [],
    pageSize = 20,
    rootMargin = "200px",
    threshold = 0.1,
    requireAuth = true,
    autoLoad = true
  } = options;

  const [data, setData] = useState<T[]>(initialData as T[]);
  const [currentPage, setCurrentPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);
  const [hasTriggeredInitialLoad, setHasTriggeredInitialLoad] = useState(false);
  
  const observerRef = useRef<HTMLDivElement>(null);
  const { loading, error, execute, reset: resetApi } = useApi<T[]>();

  // Load more function
  const loadMore = useCallback(async () => {
    if (loading || !hasMore) return;

    try {
      const response = await execute({
        url: `${apiEndpoint}?page=${currentPage}&limit=${pageSize}`,
        requireAuth,
        method: 'GET'
      });

      if (response.ok && response.data) {
        const newData = response.data;
        
        if (newData.length < pageSize) {
          setHasMore(false);
        }

        setData(prevData => {
          // 防止重複數據（可選，根據你的需求）
          const existingIds = new Set(
            prevData.map((item: any) => item.id || item._id || JSON.stringify(item))
          );
          const filteredNewData = newData.filter((item: any) => 
            !existingIds.has(item.id || item._id || JSON.stringify(item))
          );
          
          return [...prevData, ...filteredNewData];
        });
        
        setCurrentPage(prev => prev + 1);
      } else {
        setHasMore(false);
      }
    } catch (err) {
      console.error('Error loading more data:', err);
      setHasMore(false);
    }
  }, [loading, hasMore, currentPage, pageSize, apiEndpoint, requireAuth, execute]);

  // Initial load
  useEffect(() => {
    if (autoLoad && currentPage === 1 && data.length === 0) {
      loadMore();
    }
  }, [autoLoad, currentPage, data.length, loadMore]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef || !hasMore || !autoLoad) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && !loading && hasMore) {
          // Prevent initial load trigger on mount if we have initial data
          if (!hasTriggeredInitialLoad && initialData.length > 0) {
            setHasTriggeredInitialLoad(true);
            return;
          }
          loadMore();
        }
      },
      { 
        rootMargin,
        threshold
      }
    );

    observer.observe(currentRef);

    return () => {
      observer.disconnect();
    };
  }, [loadMore, hasMore, loading, hasTriggeredInitialLoad, initialData.length, rootMargin, threshold, autoLoad]);

  // Refresh function to reset all data and reload from page 1
  const refresh = useCallback(() => {
    setData([]);
    setCurrentPage(1);
    setHasMore(true);
    setHasTriggeredInitialLoad(false);
    resetApi();
  }, [resetApi]);

  // Reset function to clear all data
  const reset = useCallback(() => {
    setData(initialData as T[]);
    setCurrentPage(1);
    setHasMore(true);
    setHasTriggeredInitialLoad(false);
    resetApi();
  }, [initialData, resetApi]);

  return {
    data,
    loading,
    error,
    hasMore,
    observerRef,
    loadMore,
    refresh,
    reset
  };
}
