'use client'

import React, { useState } from 'react'
import { FullArticle } from '@/types/article'
import ArticleContent from '../ArticleContent'
import WordInfoSuspense from '../VocInfoSuspense'
import dynamic from 'next/dynamic'

// 使用動態導入來保持 Server Component
const VocCard = dynamic(() => import('../VocCard'), { ssr: true });

export default function ArticleViewer({ article }: { article: FullArticle }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);

  const handleWordClick = (word: string) => {
    setSelectedWord(word);
    console.log(`Word clicked: ${word}`);
  };

  return (
    <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
      <ArticleContent content={article.content} onWordClick={handleWordClick} />
      
      {selectedWord && (
        <WordInfoSuspense word={selectedWord} onClose={() => setSelectedWord(null)}>
          <VocCard word={selectedWord} />
        </WordInfoSuspense>
      )}
    </div>
  )}