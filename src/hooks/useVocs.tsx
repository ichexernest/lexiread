
'use client';
import { useState, useCallback } from "react";
import { Vocabulary } from "@/types";

const ALL_VOCS: Vocabulary[] = []

const PAGE_SIZE = 20;

export function useVocs() {
  const [data, setData] = useState<Vocabulary[]>([]);
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const [page, setPage] = useState(1);

  // 新增設置初始數據的方法
  const setInitialData = useCallback((initialVocs: Vocabulary[]) => {
    setData(initialVocs);
    setPage(initialVocs.length > 0 ? 2 : 1); // 如果有初始數據，下次加載從第2頁開始
  }, []);

  const loadMore = useCallback(async () => {
    if (loading) return;
    
    setLoading(true);
    
    try {
      // 從 API 獲取更多數據
      //const response = await fetch(`/api/vocs?page=${page}&limit=10`);
      //      const newVocs = await response.json();
      const newVocs = ALL_VOCS.slice((page - 1) * PAGE_SIZE, page * PAGE_SIZE);
      
      if (newVocs.length === 0) {
        setHasMore(false);
      } else {
        setData(prev => [...prev, ...newVocs]);
        setPage(prev => prev + 1);
      }
    } catch (error) {
      console.error('Error loading more vocabularies:', error);
    } finally {
      setLoading(false);
    }
  }, [loading, page]);

  return {
    data,
    loading,
    loadMore,
    hasMore,
    setInitialData
  };
}
