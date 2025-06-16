import { useState, useEffect, useRef, useCallback } from 'react';
import useSWRInfinite from 'swr/infinite';

interface UseLazyLoadOptions {
  initialData?: unknown[];
  pageSize?: number;
  rootMargin?: string;
  threshold?: number;
}

interface UseLazyLoadReturn<T> {
  data: T[];
  loading: boolean;
  error: unknown;
  hasMore: boolean;
  observerRef: React.RefObject<HTMLDivElement | null>;
  mutate: () => void;
  refresh: () => void;
}

// SWR fetcher function
const fetcher = async (url: string) => {
  const res = await fetch(url);
  if (!res.ok) {
    throw new Error(`HTTP error! status: ${res.status}`);
  }
  return res.json();
};

// Generate key for SWR infinite
const getKey = (apiEndpoint: string, pageSize: number) => 
  (pageIndex: number, previousPageData: unknown[]) => {
    // If we've reached the end, return null to stop fetching
    if (previousPageData && previousPageData.length < pageSize) return null;
    
    // Return the URL for the current page
    return `${apiEndpoint}?page=${pageIndex + 1}`;
  };

export function useLazyLoad<T = unknown>(
  apiEndpoint: string,
  options: UseLazyLoadOptions = {}
): UseLazyLoadReturn<T> {
  const {
    initialData = [],
    pageSize = 20,
    rootMargin = "200px",
    threshold = 0.1
  } = options;

  const observerRef = useRef<HTMLDivElement>(null);
  const [hasTriggeredInitialLoad, setHasTriggeredInitialLoad] = useState(false);

  // Use SWR infinite for pagination
  const {
    data: pages,
    error,
    mutate,
    size,
    setSize,
    isLoading,
    isValidating
  } = useSWRInfinite(
    getKey(apiEndpoint, pageSize),
    fetcher,
    {
      revalidateFirstPage: false,
      revalidateOnFocus: false,
      fallbackData: initialData.length > 0 ? [initialData] : undefined,
    }
  );

  // Flatten the pages data
  const data = pages ? pages.flat() : initialData;
  
  // Determine if there's more data to load
  const hasMore = pages ? pages[pages.length - 1]?.length === pageSize : true;
  
  // Loading state
  const loading = isLoading || isValidating;

  // Load more function
  const loadMore = useCallback(() => {
    if (!loading && hasMore) {
      setSize(size + 1);
    }
  }, [loading, hasMore, size, setSize]);

  // Intersection Observer for lazy loading
  useEffect(() => {
    const currentRef = observerRef.current;
    if (!currentRef || !hasMore) return;

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
  }, [loadMore, hasMore, loading, hasTriggeredInitialLoad, initialData.length, rootMargin, threshold]);

  // Refresh function to reset all data
  const refresh = useCallback(() => {
    setSize(1);
    mutate();
  }, [setSize, mutate]);

  return {
    data,
    loading,
    error,
    hasMore,
    observerRef,
    mutate,
    refresh
  };
}