'use client';

import { useState } from 'react';
import VocList from '../VocList';
import WordInfoSuspense from '../VocCard';
import LoadingAnimation from '../LoadingAnimation';
import { Vocabulary as VocItemType } from '@/types/';
import FinishLine from '../FinishLine';
import { useLazyLoad } from '@/hooks/useLazyLoad'; 

interface VocListContainerProps {
  initialVocs: VocItemType[];
}

export default function VocListContainer({ initialVocs }: VocListContainerProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);
  
  const {
    data: vocs,
    loading,
    error,
    hasMore,
    observerRef,
    refresh
  } = useLazyLoad<VocItemType>('/api/voc', {
    initialData: initialVocs,
    pageSize: 20,
    rootMargin: "200px",
    threshold: 0.1
  });

  const handleWordClick = (word: string) => setSelectedWord(word);

  if (error) {
    return (
      <div className="flex flex-col items-center justify-center py-8">
        <p className="text-red-500 mb-4">There were some errors, please try again</p>
        <button 
          onClick={refresh}
          className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          retry
        </button>
      </div>
    );
  }

  return (
    <>
      <VocList vocs={vocs} onItemClick={handleWordClick} />
      {loading && (
        <div className="flex justify-center items-center py-8 mt-10">
          <LoadingAnimation />
        </div>
      )}
      {selectedWord && (
        <WordInfoSuspense word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
      {hasMore && <div ref={observerRef} className="h-12" />}

      {!hasMore && <FinishLine className="w-full pt-10 pb-32" />}
    </>
  );
}