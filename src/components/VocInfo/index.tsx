'use client'

import { useEffect, useState } from 'react'
import { UserVocabulary } from '@/types'
import SaveButton from '../SaveButton'
import FamiliaritySign from '../FamiliaritySign'

export default function VocInfo({ word }: { word: string }) {
  const [data, setData] = useState<UserVocabulary | null>(null)
  const [loading, setLoading] = useState(true)

  word = 'wind' // for testing

  useEffect(() => {
    const fetchWordInfo = async () => {
      try {
        const response = await fetch(`/api/voc/${word}`)
        if (!response.ok) throw new Error('Failed to fetch data')
        const json = await response.json()
        setData(json)
      } catch (error) {
        console.error('Error fetching word info:', error)
      } finally {
        setLoading(false)
      }
    }

    fetchWordInfo()
  }, [word])

  if (loading) return <p className="text-gray-500">Loading...</p>
  if (!data) return <p className="text-red-500">找不到「{word}」的資料。</p>

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 text-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.word}</h1>
          <p className="text-sm text-gray-500">{data.partOfSpeech}</p>
        </div>
        {data.familiarity && <FamiliaritySign familiarity={data.familiarity} />}
      </div>

      <div className="space-y-1">
        <p className="text-sm"><span className="font-semibold">Definition:</span> {data.definition}</p>
        {data.localDefinition && <p className="text-sm text-gray-600">{data.localDefinition}</p>}
        {data.customDefinition && <p className="text-sm text-[#d89024]">✏️ {data.customDefinition}</p>}
      </div>

      {(data.example || data.customExample || data.exampleTranslation) && (
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-700">Example</h2>
          {data.example && <p className="text-sm">「{data.example}」</p>}
          {data.exampleTranslation && <p className="text-sm text-gray-500">翻譯：{data.exampleTranslation}</p>}
          {data.customExample && <p className="text-sm text-[#d89024]">✏️ {data.customExample}</p>}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        {data.pronunciation && <p><span className="font-semibold">Pronunciation：</span>[{data.pronunciation}]</p>}
        {data.synonyms && <p><span className="font-semibold">Synonyms：</span>{data.synonyms}</p>}
        {data.antonyms && <p><span className="font-semibold">Antonyms：</span>{data.antonyms}</p>}
      </div>

      {data.personalNote && (
        <div className="bg-[#EEE4D8] p-3 rounded-md text-sm border border-[#d89024]">
          <p className="font-semibold mb-1 text-[#d89024]">Note：</p>
          <p>{data.personalNote}</p>
        </div>
      )}

      <div className="w-full flex justify-end pt-3 border-t border-gray-200">
        <SaveButton isSaved={!!data.addedAt} saveId={word} saveType="voc" />
      </div>
    </div>
  )
}
