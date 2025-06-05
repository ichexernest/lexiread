'use client'
import React, { useState, useEffect } from 'react'
import { Vocabulary } from '@/types'
import { useRouter } from 'next/navigation'
import PrimaryButton from '../PrimaryButton'

interface QuizBoardProps {
  items: Vocabulary[]
}

type QuizResult = {
  userVocabularyId: string,
  word: string,
  result: 'remembered' | 'notSure' | 'forgotten'
}

export default function QuizBoard({ items }: QuizBoardProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [def, setDef] = useState<Vocabulary['definitions'][0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false) // 新增：防止重複提交

  const currentItem = items[currentIndex]

  useEffect(() => {
    const defs = currentItem.definitions
    if (defs && defs.length > 0) {
      const chosen = defs.length === 1
        ? defs[0]
        : defs[Math.floor(Math.random() * defs.length)]
      setDef(chosen)
    } else {
      setDef(null)
    }
  }, [currentIndex, currentItem]) // 修正：加入 currentItem 依賴

  const handleReveal = () => setIsAnswerRevealed(true)

  const handleAnswer = async (userVocabularyId: string, word: string, result: 'remembered' | 'notSure' | 'forgotten') => {
    if (isSubmitting) return // 防止重複點擊

    const resultItem = { userVocabularyId, word, result }
    setResults((prev) => [...prev, resultItem])
    setIsAnswerRevealed(false)

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      // 最後一題，提交結果
      setIsSubmitting(true)
      
      try {
        const finalResult = [...results, resultItem] // 修正：使用 resultItem 而不是重新建立物件

        // 修正：加入正確的 headers 和錯誤處理
        const response = await fetch('/api/quiz', { 
          method: 'POST', 
          headers: {
            'Content-Type': 'application/json',
          },
          body: JSON.stringify(finalResult) 
        })

        if (!response.ok) {
          throw new Error(`HTTP error! status: ${response.status}`)
        }
                const learnedWords = finalResult
          .filter(item => item.result === 'remembered')
          .map(item => item.word)

        const query = new URLSearchParams()
        query.set('words', learnedWords.join(','))
        router.push(`/Quiz/Result?${query.toString()}`)
      } catch (error) {
        console.error('Failed to submit quiz results:', error)
        // 可以加入錯誤處理，例如顯示錯誤訊息
        setIsSubmitting(false)
      }
    }
  }

  // 檢查是否有有效的 items
  if (!items || items.length === 0) {
    return <div>No vocabulary items available</div>
  }

  // 檢查 currentItem 是否存在
  if (!currentItem) {
    return <div>Loading...</div>
  }

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto">
      {/* 進度顯示 */}
      <div className="mb-4 text-center text-sm text-gray-600">
        {currentIndex + 1} / {items.length}
      </div>

      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] bg-white rounded-xl p-6 shadow-md m-4 text-black flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">{currentItem.word}</div>
          <div className="mt-4 text-lg italic">&quot;{def?.example ?? 'No example'}&quot;</div>

          {isAnswerRevealed && def && (
            <div className="mt-6 space-y-2 text-sm">
              <div>{def.partOfSpeech ?? 'N/A'}</div>
              <div>[{def.pronunciation ?? 'N/A'}]</div>
              <div>{def.definition ?? 'N/A'}</div>
              <div>{def.localDefinition ?? 'N/A'}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-4 py-4 flex items-center justify-center">
        {!isAnswerRevealed ? (
          <PrimaryButton onClick={handleReveal}>Check the answer</PrimaryButton>
        ) : (
          <div className="flex gap-4">
            <PrimaryButton 
              onClick={() => handleAnswer(currentItem.userVocabularyId!, currentItem.word, 'remembered')}
            >
              ✅ I remember
            </PrimaryButton>
            <PrimaryButton 
              onClick={() => handleAnswer(currentItem.userVocabularyId!, currentItem.word, 'notSure')}
            >
              ❓ I&apos;m not sure
            </PrimaryButton>
            <PrimaryButton 
              onClick={() => handleAnswer(currentItem.userVocabularyId!, currentItem.word, 'forgotten')}
            >
              ❌ I forgot
            </PrimaryButton>
          </div>
        )}
      </div>

      {isSubmitting && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Submitting results...
        </div>
      )}
    </div>
  )
}