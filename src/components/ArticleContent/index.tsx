'use client'

import React from 'react'
import ClickableWord from '@/components/ClickableWord'
import { Content } from '@/types'

interface ArticleContentProps {
  content: Content
  onWordClick: (word: string) => void
}

export default function ArticleContent({ content, onWordClick }: ArticleContentProps) {
  const renderClickableContent = (text: string) => {
    const paragraphs = text.split('\n\n').map(p => p.trim())

    return paragraphs.map((paragraph, pIndex) => {
      const words = paragraph.split(/\s+/)

      return (
        <p key={pIndex} className="mb-5 leading-8 text-neutral-800 text-pretty">
          {words.map((word, wordIndex) => (
            <React.Fragment key={`${pIndex}-${wordIndex}`}>
              <ClickableWord word={word} onClick={onWordClick} />
              {' '}
            </React.Fragment>
          ))}
        </p>
      )
    })
  }

  return <article className="text-lg px-4">{renderClickableContent(content.content)}</article>
}