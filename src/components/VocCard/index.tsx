'use client'

import { FaTimes } from "react-icons/fa"
import { useEffect, useState } from 'react'

interface WordInfo {
  definition: string
  partOfSpeech: string
  example: string
  exampleTranslation: string
  relatedWords: string[]
}

export default function VocCard({ selectedWord, onClose }: { selectedWord: string, onClose: () => void }) {
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
    }, [selectedWord])
  
  return (
    <div className="sticky bottom-4 mt-4 py-24 px-4 shadow-lg rounded-xl bg-white/40 backdrop-blur-lg w-[720px] mx-auto relative">
      <button className="absolute top-4 right-4" onClick={onClose} type="button">
        <FaTimes />
      </button>
      { loading ? (
        <p className="text-gray-500">查詢「{selectedWord}」中...</p>
      ) : data ? (
        <div className="text-lg">
          <p className="font-bold text-xl mb-2">{selectedWord}</p>
          <p>詞性：{data.partOfSpeech}</p>
          <p>定義：{data.definition}</p>
          <p>例句：{data.example}</p>
          <p>翻譯：{data.exampleTranslation}</p>
          <p>相關詞彙：{data.relatedWords.join(', ')}</p>
        </div>
      ) : (
        <p className="text-red-500">查詢失敗</p>
      )}
    </div>
  );
}
