import { Vocabulary, UserVocabulary } from '@/types/vocabulary'
const mockVocabularies: (Vocabulary | UserVocabulary)[] = [
  // 第一筆：Vocabulary 型別 - 'cloud'
  {
    id: '1',
    word: 'cloud',
    partOfSpeech: 'noun',
    definition: 'A visible mass of condensed water vapor floating in the atmosphere.',
    localDefinition: '雲；在空中漂浮的水蒸氣凝結形成的可見團塊',
    example: 'The sky was filled with dark clouds before the storm.',
    exampleTranslation: '暴風雨前，天空佈滿了烏雲。',
    pronunciation: 'klaʊd',
    synonyms: 'mist, vapor',
    antonyms: 'sunshine, clarity'
  },

  // 第二筆：UserVocabulary 型別 - 'wind'
  {
    id: '2',
    word: 'wind',
    partOfSpeech: 'noun',
    definition: 'The perceptible natural movement of the air.',
    localDefinition: '風；自然界中可感知的空氣流動',
    example: 'The wind howled through the trees.',
    exampleTranslation: '風在樹林間呼嘯而過。',
    pronunciation: 'wɪnd',
    synonyms: 'breeze, gale',
    antonyms: 'stillness, calm',
    
    // UserVocabulary 特有欄位
    addedAt: '2024-05-01T10:00:00Z',
    familiarity: 4,
    userId: 'user_abc123',
    personalNote: '我每次在海邊散步都會想起這個字',
    customDefinition: '風是一種自然力量，可以很溫柔也可以很強烈',
    customExample: 'The wind gently pushed the leaves across the ground.'
  }
]
export async function GET(
  _req: Request,
  context: { params: Promise<{ word: string }> }
) {
  const { word } = await context.params
  const decodedWord = decodeURIComponent(word).toLowerCase()
  console.log('word', decodedWord)
  const result = mockVocabularies.find(v => v.word.toLowerCase() === decodedWord)

  if (!result) {
    return new Response(JSON.stringify({ error: 'Word not found' }), {
      status: 404,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  return new Response(JSON.stringify(result), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

