'use client'

import { useEffect, useState } from 'react'
import { Vocabulary } from '@/types'
import { useApi } from '@/hooks/useApi' 
import SaveButton from '@/components/SaveButton'
import FamiliaritySign from '@/components/FamiliaritySign'

interface VocInfoProps {
  word: string;
}

export default function VocInfo({ word }: VocInfoProps) {
  const [isGenerating, setIsGenerating] = useState(false)
  const { data, loading, error, execute, reset } = useApi<Vocabulary>()

  useEffect(() => {
    reset()
    setIsGenerating(false)

    let timeoutId: NodeJS.Timeout
    let pollInterval: NodeJS.Timeout
    let isRequestCompleted = false

    const fetchWordInfo = async () => {
      timeoutId = setTimeout(() => {
        if (!isRequestCompleted) {
          setIsGenerating(true)
        }
      }, 3000)

      try {
        const response = await execute({
          url: `/api/voc/${word}`,
          requireAuth: false
        })

        isRequestCompleted = true
        clearTimeout(timeoutId)

        if (!response.ok) {
          setIsGenerating(true)
          startPolling()
        } else {
          setIsGenerating(false)
        }
      } catch (err) {
        isRequestCompleted = true
        clearTimeout(timeoutId)
        console.error('Error fetching word info:', err)
      }
    }

    const startPolling = () => {
      pollInterval = setInterval(async () => {
        try {
          const response = await execute({
            url: `/api/voc/${word}`,
            requireAuth: false
          })

          if (response.ok) {
            setIsGenerating(false)
            clearInterval(pollInterval)
          }
        } catch (error) {
          console.error('Error polling for generated data:', error)
        }
      }, 2000)
    }

    fetchWordInfo()

    return () => {
      clearTimeout(timeoutId)
      clearInterval(pollInterval)
    }
  }, [word]) 

  useEffect(() => {
    if (!isGenerating) return

    const pollInterval = setInterval(async () => {
      try {
        const response = await execute({
          url: `/api/voc/${word}`,
          requireAuth: false
        })

        if (response.ok) {
          setIsGenerating(false)
        }
      } catch (error) {
        console.error('Error polling for generated data:', error)
      }
    }, 2000)

    return () => clearInterval(pollInterval)
  }, [isGenerating, word])

  if (loading && !isGenerating) {
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

  if (error || !data) {
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