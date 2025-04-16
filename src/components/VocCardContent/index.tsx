'use client'

import { useEffect, useState } from 'react'

interface WordInfo {
  definition: string
  partOfSpeech: string
  example: string
  exampleTranslation: string
  relatedWords: string[]
}

export default function VocCardContent({ word }: { word: string }) {
  const [data, setData] = useState<WordInfo | null>(null)
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    setLoading(true)
    const fetchData = async () => {
      const result: WordInfo = await new Promise((resolve) =>
        setTimeout(() => {
          resolve({
            definition: '某個詞語的定義',
            partOfSpeech: '名詞',
            example: 'This is an example.',
            exampleTranslation: '這是一個例句',
            relatedWords: ['語言', '單字', '詞彙'],
          })
        }, 1500)
      )
      setData(result)
      setLoading(false)
    }

    fetchData()
  }, [word])

  if (loading) return <p className="text-gray-500">查詢「{word}」中...</p>

  if (!data) return <p className="text-red-500">查詢失敗</p>

  return (
    <div>
      <p>詞性：{data.partOfSpeech}</p>
      <p>定義：{data.definition}</p>
      <p>例句：{data.example}</p>
      <p>翻譯：{data.exampleTranslation}</p>
      <p>相關詞彙：{data.relatedWords.join(', ')}</p>
    </div>
  )
}
