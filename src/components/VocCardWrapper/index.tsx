'use client';

import { Suspense } from 'react';
import dynamic from 'next/dynamic';

// 動態引入 Server Component
const VocCard = dynamic(() => import('@/components/VocCard'), { ssr: true });

interface VocCardWrapperProps {
  selectedWord: string;
  onClose: () => void;
}

export default function VocCardWrapper({ selectedWord, onClose }: VocCardWrapperProps) {
  return (
    <div className="fixed bottom-4 left-1/2 transform -translate-x-1/2 mt-4 py-12 px-4 shadow-lg rounded-xl bg-white/80 backdrop-blur-lg w-[90%] max-w-[680px] z-50">
      <button 
        className="absolute top-4 right-4 p-2 rounded-full hover:bg-gray-100" 
        onClick={onClose}
        aria-label="Close"
      >
        ✕
      </button>
      
      <Suspense fallback={<p className="text-gray-500">查詢「{selectedWord}」中...</p>}>
        <VocCard word={selectedWord} />
      </Suspense>
    </div>
  );
}