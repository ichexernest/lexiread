'use client'
import React, { useState, useEffect } from 'react'
import { Vocabulary } from '@/types'
import { useRouter } from 'next/navigation'
import PrimaryButton from '../PrimaryButton'
import { useApi } from '@/hooks/useApi'

interface QuizBoardProps {
  items: Vocabulary[]
}

type QuizResult = {
  userVocabularyId: string,
  word: string,
  result: 'remembered' | 'notSure' | 'forgotten'
}

export default function QuizBoard({ items }: QuizBoardProps) {
    const quizApi = useApi()
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [def, setDef] = useState<Vocabulary['definitions'][0] | null>(null)
  const [isSubmitting, setIsSubmitting] = useState(false)
  const [isCompleted, setIsCompleted] = useState(false) // 新增：標記測驗是否完成

  const currentItem = items[currentIndex]

  useEffect(() => {
    if (isCompleted) return // 如果測驗已完成，不執行後續邏輯
    
    const current = items[currentIndex]
    if (!current) return
    
    const defs = current.definitions
    if (defs && defs.length > 0) {
      const chosen = defs.length === 1
        ? defs[0]
        : defs[Math.floor(Math.random() * defs.length)]
      setDef(chosen)
    } else {
      setDef(null)
    }
  }, [currentIndex, items, isCompleted])

  const handleReveal = () => setIsAnswerRevealed(true)

  const handleAnswer = async (userVocabularyId: string, word: string, result: 'remembered' | 'notSure' | 'forgotten') => {
  
  if (quizApi.loading) return

  const resultItem = { userVocabularyId, word, result }
  setResults((prev) => [...prev, resultItem])
  setIsAnswerRevealed(false)

  if (currentIndex < items.length - 1) {
    setCurrentIndex((prev) => prev + 1)
  } else {
    setIsCompleted(true)
    
    try {
      const finalResult = [...results, resultItem]

      const response = await quizApi.execute({
        url: '/api/quiz',
        method: 'POST',
        body: JSON.stringify(finalResult),
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
      setIsCompleted(false)
    }
  }
}

  // 檢查是否有有效的 items
  if (!items || items.length === 0) {
    return <div>No vocabulary items available</div>
  }

  // 檢查 currentItem 是否存在
  if (!currentItem && !isCompleted) {
    return <div>Loading...</div>
  }

  // 測驗完成後顯示載入畫面
  if (isCompleted) {
    return (
      <div className="flex flex-col w-full max-w-[720px] mx-auto">
        <div className="flex-1 flex items-center justify-center">
          <div className="w-full h-[400px] bg-white rounded-xl p-6 shadow-md m-4 text-black flex flex-col items-center justify-center">
            <div className="text-2xl font-semibold mb-4">Quiz Completed! 🎉</div>
            <div className="text-lg text-gray-600 mb-4">Processing your results...</div>
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-500"></div>
          </div>
        </div>
      </div>
    )
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

      {isSubmitting && !isCompleted && (
        <div className="text-center mt-4 text-sm text-gray-600">
          Submitting results...
        </div>
      )}
    </div>
  )
}