'use client'

import React from 'react'
import { FullArticle } from '@/types/article'
import ArticleContent from '../ArticleContent'

interface ArticleAreaProps {
  article: FullArticle;
  onWordClick: (word: string) => void;
}

export default function ArticleArea({ article, onWordClick }: ArticleAreaProps) {
  return (
    <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
      <ArticleContent content={article.content} onWordClick={onWordClick} />
    </div>
  )
}