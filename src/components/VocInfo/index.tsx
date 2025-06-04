'use client'

import { useEffect, useState } from 'react'
import { Vocabulary } from '@/types'
import SaveButton from '../SaveButton'
import FamiliaritySign from '../FamiliaritySign'

interface VocInfoProps {
  word: string;
}

export default function VocInfo({ word }: VocInfoProps) {
  const [data, setData] = useState<Vocabulary | null>(null)
  const [loading, setLoading] = useState(true)

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

  const def = data.definitions?.[0] ?? null

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 text-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.word}</h1>
          <p className="text-sm text-gray-500">{data.publicVocabularyId}</p>
        </div>
        {data.familiarity !== undefined && <FamiliaritySign familiarity={data.familiarity} />}
      </div>
      {data.definitions?.length > 0 && (
        <div className="space-y-4">
          {data.definitions.map((d, index) => (
            <div key={index} className="space-y-1">
              <div className='flex justify-start items-center gap-2'>
                {d.partOfSpeech && (
                  <p className="text-sm text-gray-500">{d.partOfSpeech}</p>
                )}
                {d.localDefinition && (
                  <p className="text-sm text-gray-600">{d.localDefinition}</p>
                )}
              </div>

              <p className="text-sm">
                <span className="font-semibold">Definition:</span> {d.definition}
              </p>
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        {def?.pronunciation && <p><span className="font-semibold">Pronunciation：</span>[{def.pronunciation}]</p>}
        {def?.synonyms && <p><span className="font-semibold">Synonyms：</span>{def.synonyms}</p>}
        {def?.antonyms && <p><span className="font-semibold">Antonyms：</span>{def.antonyms}</p>}
      </div>

      {(def?.example || def?.exampleTranslation || data.customExample) && (
        <div className="space-y-1">
          <h2 className="text-sm font-semibold text-gray-700">Example</h2>
          {def.example && <p className="text-sm">「{def.example}」</p>}
          {def.exampleTranslation && <p className="text-sm text-gray-500">{def.exampleTranslation}</p>}
        </div>
      )}

      {data.customDefinition && <p className="text-sm text-secondary">✏️ {data.customDefinition}</p>}
      {data.customExample && <p className="text-sm text-secondary">✏️ {data.customExample}</p>}

      {data.personalNote && (
        <div className="bg-primary p-3 rounded-md text-sm border border-secondary">
          <p className="font-semibold mb-1 text-secondary">Note：</p>
          <p>{data.personalNote}</p>
        </div>
      )}

      <div className="w-full flex justify-end pt-3 border-t border-gray-200">
        <SaveButton isSaved={data.userVocabularyId !== null} saveId={data.publicVocabularyId} saveType="voc" />
      </div>
    </div>
  )
}
