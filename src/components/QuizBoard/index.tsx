'use client'
import React, { useState, useEffect } from 'react'
import { UserVocabulary } from '@/types'
import { useRouter } from 'next/navigation'
import PrimaryButton from '../PrimaryButton'

interface QuizBoardProps {
  items: UserVocabulary[]
}

type QuizResult = {
  word: string
  result: 'remembered' | 'notSure' | 'forgotten'
}

export default function QuizBoard({ items }: QuizBoardProps) {
  const router = useRouter()
  const [currentIndex, setCurrentIndex] = useState(0)
  const [isAnswerRevealed, setIsAnswerRevealed] = useState(false)
  const [results, setResults] = useState<QuizResult[]>([])
  const [def, setDef] = useState<UserVocabulary['definitions'][0] | null>(null)

  const currentItem = items[currentIndex]

  // 選出 definitions 中的隨機一筆
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
  }, [currentIndex])

  const handleReveal = () => setIsAnswerRevealed(true)

  const handleAnswer = async (word: string, result: 'remembered' | 'notSure' | 'forgotten') => {
    const resultItem = { word, result }
    setResults((prev) => [...prev, resultItem])
    setIsAnswerRevealed(false)

    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
      const learnedWords = [...results, { word, result }]
        .filter(item => item.result === 'remembered')
        .map(item => item.word)

      const query = new URLSearchParams()
      query.set('words', learnedWords.join(','))
      router.push(`/Quiz/Result?${query.toString()}`)
    }
  }

  useEffect(() => {
    fetch('/api/quiz', { method: 'POST' })
  }, [])

  return (
    <div className="flex flex-col w-full max-w-[720px] mx-auto">
      <div className="flex-1 flex items-center justify-center">
        <div className="w-full h-[400px] bg-white rounded-xl p-6 shadow-md text-black flex flex-col items-center justify-center">
          <div className="text-2xl font-semibold">{currentItem.word}</div>
          <div className="mt-4 text-lg italic">&quot;{def?.example ?? 'No example'}&quot;</div>

          {isAnswerRevealed && def && (
            <div className="mt-6 space-y-2 text-base">
              <div>詞性：{def.partOfSpeech ?? 'N/A'}</div>
              <div>解釋：{def.definition ?? 'N/A'}</div>
              <div>翻譯：{def.localDefinition ?? 'N/A'}</div>
              <div>發音：{def.pronunciation ?? 'N/A'}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-4 py-4">
        {!isAnswerRevealed ? (
          <PrimaryButton onClick={handleReveal}>Check the answer</PrimaryButton>
        ) : (
          <div className="flex gap-4">
            <PrimaryButton onClick={() => handleAnswer(currentItem.word, 'remembered')}>✅ I remember</PrimaryButton>
            <PrimaryButton onClick={() => handleAnswer(currentItem.word, 'notSure')} >❓ I&apos;m not sure</PrimaryButton>
            <PrimaryButton onClick={() => handleAnswer(currentItem.word, 'forgotten')}>❌ I forgot</PrimaryButton>
          </div>
        )}
      </div>
    </div>
  )
}
