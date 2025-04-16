'use client';

import { useState, useEffect, useRef } from 'react';
import { useVocs } from '@/hooks/useVocs';
import VocList from '../VocList';
import VocCardWrapper from '../VocCardWrapper';
import { FaSpinner } from 'react-icons/fa';
import { Vocabulary as VocItemType } from '@/types/'; // 假設的類型定義

interface VocListContainerProps {
  initialVocs: VocItemType[];
}

export default function VocListContainer({ initialVocs }: VocListContainerProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  const { 
    data: vocs, 
    loading, 
    loadMore, 
    hasMore, 
    setInitialData 
  } = useVocs();
  const observerRef = useRef<HTMLDivElement>(null);

  // 設置初始數據
  useEffect(() => {
    setInitialData(initialVocs);
  }, [initialVocs, setInitialData]);

  // IntersectionObserver → 當元素出現在畫面中就觸發 loadMore()
  useEffect(() => {
    if (!hasMore) return;

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          loadMore();
        }
      },
      {
        rootMargin: "200px", // 提前觸發
      }
    );

    if (observerRef.current) observer.observe(observerRef.current);

    return () => {
      if (observerRef.current) observer.unobserve(observerRef.current);
    };
  }, [observerRef.current, hasMore, loadMore]);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
  };

  return (
    <>
      <VocList 
        vocs={vocs || []} 
        onItemClick={handleWordClick} 
      />
      
      {loading && (
        <div>
          <FaSpinner className="animate-spin text-4xl my-5 text-gray-500" />
        </div>
      )}
      
      {selectedWord && (
        <VocCardWrapper 
          selectedWord={selectedWord} 
          onClose={() => setSelectedWord(null)} 
        />
      )}
      
      <div ref={observerRef} className="h-12" />
      
      {!hasMore && (
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      )}
    </>
  );
}