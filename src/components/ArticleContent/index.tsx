'use client'

import React from 'react'
import ClickableWord from '@/components/ClickableWord'

interface ArticleContentProps {
  content: string;
  onWordClick: (word: string) => void;
}

export default function ArticleContent({ content, onWordClick }: ArticleContentProps) {
  const renderClickableContent = (text: string) => {
    const paragraphs = text.split('\n\n').map(p => p.trim())

    return paragraphs.map((paragraph, pIndex) => {
      const parts = paragraph.split(/(\s+|[.,\"'\(\):;])/)
      return (
        <p key={pIndex} className="mb-4 leading-relaxed text-gray-800">
          {parts.map((part, partIndex) => {
            const isWhitespaceOrPunctuation = /^\s+$|^[.,\"'\(\):;]$/.test(part)
            return isWhitespaceOrPunctuation ? (
              <React.Fragment key={`${pIndex}-${partIndex}`}>{part}</React.Fragment>
            ) : (
              <ClickableWord
                key={`${pIndex}-${partIndex}`}
                word={part}
                onClick={onWordClick}
              />
            )
          })}
        </p>
      )
    })
  }

  return <article className="text-lg">{renderClickableContent(content)}</article>
}