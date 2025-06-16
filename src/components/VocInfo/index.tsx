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
  const [isGenerating, setIsGenerating] = useState(false)


  useEffect(() => {
    // 重置所有狀態
    setData(null)
    setLoading(true)
    setIsGenerating(false)


    const controller = new AbortController()
    let isRequestCompleted = false

    const timeoutId = setTimeout(() => {
      if (!isRequestCompleted) {

        setLoading(false)
        setIsGenerating(true)
      }
    }, 3000)

    const fetchWordInfo = async () => {
      try {
        const response = await fetch(`/api/voc/${word}`, {
          signal: controller.signal
        })

        if (!response.ok) throw new Error('Failed to fetch data')
        const json = await response.json()

        // 請求完成，更新狀態
        isRequestCompleted = true
        clearTimeout(timeoutId)
        setData(json)
        setLoading(false)
        setIsGenerating(false)


      } catch (error) {
        if (error instanceof Error && error.name !== 'AbortError') {
          console.error('Error fetching word info:', error)
          isRequestCompleted = true
          clearTimeout(timeoutId)
          setLoading(false)
          setIsGenerating(false)
        }
      }
    }

    fetchWordInfo()

    return () => {
      controller.abort()
      clearTimeout(timeoutId)
    }
  }, [word])

  useEffect(() => {
    if (!isGenerating) return

    const pollInterval = setInterval(async () => {
      try {
        const response = await fetch(`/api/voc/${word}`)
        if (response.ok) {
          const json = await response.json()
          setData(json)
          setIsGenerating(false)
          clearInterval(pollInterval)
        }
      } catch (error) {
        console.error('Error polling for generated data:', error)
      }
    }, 2000)

    return () => clearInterval(pollInterval)
  }, [isGenerating, word])

  if (loading) {
    return (
      <div className="text-gray-500">
        <p>Searching for 「{word}」...</p>

      </div>
    )
  }

  if (isGenerating) {
    return (
      <div className="text-gray-500">
        <p>Cannot find definition for「{word}」, AI is generating, it will take 5-10 seconds...</p>

      </div>
    )
  }

  if (!data) {
    return (
      <div className="text-gray-500">
        <p>Cannot find definition for「{word}」</p>

      </div>
    )
  }

  const def = data.definitions?.[0] ?? null

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-4 text-gray-800">
      <div className="flex justify-between items-start">
        <div>
          <h1 className="text-2xl font-bold">{data.word}</h1>
          {def?.pronunciation && <p>[{def.pronunciation}]</p>}

          {/* <p className="text-sm text-gray-500">{data.publicVocabularyId}</p> */}
        </div>
        {data.familiarity !== undefined && <FamiliaritySign familiarity={data.familiarity} />}
      </div>
      {data.definitions?.length > 0 && (
        <div className="space-y-4">
          {data.definitions.map((d, index) => (
            <div key={index} className="space-y-1">
              <div className='flex justify-start items-center gap-2'>
                {d.partOfSpeech && (
                  <p className="text-sm font-semibold text-secondary">{d.partOfSpeech}</p>
                )}
                <p className="text-sm">{d.definition}</p>
              </div>

              {d.localDefinition && (
                <p className="text-sm text-gray-600">{d.localDefinition}</p>
              )}
            </div>
          ))}
        </div>
      )}

      <div className="grid grid-cols-2 gap-2 text-sm">
        {def?.synonyms && <p><span className="font-semibold">Synonyms：</span>{def.synonyms}</p>}
        {def?.antonyms && <p><span className="font-semibold">Antonyms：</span>{def.antonyms}</p>}
      </div>

      {(def?.example || def?.exampleTranslation || data.customExample) && (
        <div className="space-y-1">
          {def.example && <p className="text-sm">&ldquo;{def.example}&rdquo;</p>}
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
        <SaveButton isSaved={data.userVocabularyId != null} saveId={data.publicVocabularyId} saveType="voc" />
      </div>
    </div>
  )
}