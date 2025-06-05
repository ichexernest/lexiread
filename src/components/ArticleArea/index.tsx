'use client'

import React from 'react'
import { Content } from '@/types/article'
import ArticleContent from '../ArticleContent'

interface ArticleAreaProps {
  content: Content;
  onWordClick: (word: string) => void;
}

export default function ArticleArea({ content, onWordClick }: ArticleAreaProps) {
  return (
    <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
      <ArticleContent content={content} onWordClick={onWordClick} />
    </div>
  )
}