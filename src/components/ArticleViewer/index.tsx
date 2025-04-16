'use client'

import { FullArticle } from "@/types/article"
import React, { useState } from "react"
import VocCard from "../VocCard"

// 可點擊單字元件
const ClickableWord = ({ word, onClick }: { word: string; onClick: (word: string) => void }) => (
  <span
    className="inline-block cursor-pointer hover:bg-blue-100 px-0.5 rounded transition-colors"
    onClick={() => onClick(word)}
  >
    {word}
  </span>
)

export default function ArticleViewer({ article }: { article: FullArticle }) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null)

  const handleWordClick = (word: string) => {
    setSelectedWord(word)
    console.log(`Word clicked: ${word}`)
  }

  const renderClickableContent = (content: string) => {
    const paragraphs = content.split('\n\n').map(p => p.trim())

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
                onClick={handleWordClick}
              />
            )
          })}
        </p>
      )
    })
  }

  return (
    <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
    <article className="text-lg">{renderClickableContent(article.content)}</article>
    {selectedWord && (
      <VocCard selectedWord={selectedWord} onClose={() => setSelectedWord(null)} />
    )}
  </div>
  )
}
