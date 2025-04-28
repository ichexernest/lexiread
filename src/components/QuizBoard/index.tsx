'use client'
import React, { use, useState, useEffect } from 'react'
import { UserVocabulary } from '@/types'
import { useRouter } from 'next/navigation'

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

  const currentItem = items[currentIndex]

  const handleReveal = () => setIsAnswerRevealed(true)

  const handleAnswer = async (word:string,result: 'remembered' | 'notSure' | 'forgotten') => {
    const resultItem = {
        word, result
    }
    setResults((prev) => [...prev, resultItem])
    setIsAnswerRevealed(false)
    if (currentIndex < items.length - 1) {
      setCurrentIndex((prev) => prev + 1)
    } else {
        // Quiz finished
        // post results to server or handle them as needed
        const learnedWords = [...results, { word, result }]
        .filter(item => item.result === 'remembered')
        .map(item => item.word)
      
        const query = new URLSearchParams()
        query.set('words', learnedWords.join(',')) // => "apple,banana"
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
          <div className="mt-4 text-lg italic">"{currentItem.example}"</div>

          {isAnswerRevealed && (
            <div className="mt-6 space-y-2 text-base">
              <div>詞性：{currentItem.partOfSpeech}</div>
              <div>解釋：{currentItem.definition}</div>
              <div>翻譯：{currentItem.localDefinition}</div>
              <div>發音：{currentItem.pronunciation}</div>
            </div>
          )}
        </div>
      </div>

      <div className="mt-6 px-4 py-4">
        {!isAnswerRevealed ? (
          <button
            onClick={handleReveal}
            className="w-full rounded-full text-white py-3  border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            Check the answer
          </button>
        ) : (
          <div className="flex gap-4">
                      <button
            onClick={() => handleAnswer(currentItem.word,'remembered')}
            className="flex-1 rounded-full text-white py-3  border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            ✅ I remember
          </button>
          <button
            onClick={() => handleAnswer(currentItem.word,'notSure')}
            className="flex-1 rounded-full text-white py-3  border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            ❓ I'm not sure
          </button>
          <button
            onClick={() => handleAnswer(currentItem.word,'forgotten')}
            className="flex-1 rounded-full text-white py-3  border border-solid border-transparent transition-colors flex items-center justify-center bg-foreground text-background gap-2 hover:bg-[#383838] dark:hover:bg-[#ccc] font-medium text-sm sm:text-base h-10 sm:h-12 px-4 sm:px-5"
          >
            ❌ I forgot
          </button>
          </div>
        )}
      </div>
    </div>
  )
}
