import { Vocabulary, UserVocabulary } from '@/types/vocabulary'
import { OpenAI } from 'openai'
import { customAlphabet } from 'nanoid'
import { CiCoins1 } from 'react-icons/ci'
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,})

function parseIntoVoc(jsonText: string): Vocabulary | null {
  try {
    const obj = JSON.parse(jsonText)
    const nanoid = customAlphabet('1234567890abcdef', 12)

    const voc: Vocabulary = {
      id: `pvoc_${nanoid()}`,
      word: obj.word ?? '',
      partOfSpeech: obj.partOfSpeech ?? '',
      definition: obj.definition ?? '',
      localDefinition: obj.localDefinition ?? '',
      example: obj.example ?? '',
      exampleTranslation: obj.exampleTranslation ?? '',
      pronunciation: obj.pronunciation ?? '',
      synonyms: obj.synonyms ?? '',
      antonyms: obj.antonyms ?? ''
    }

    return voc
  } catch (err) {
    console.error('Failed to parse vocabulary JSON:', err)
    return null
  }
}

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
 // const result = mockVocabularies.find(v => v.word.toLowerCase() === decodedWord)

 const prompt = `Please provide the vocabulary information for the word "${decodedWord}" in the following JSON format only, without any explanation:

 {
   "word": "string",
   "partOfSpeech": "string",
   "definition": "string",
   "localDefinition": "string (in Traditional Chinese)",
   "example": "string",
   "exampleTranslation": "string (in Traditional Chinese)",
   "pronunciation": "string",
   "synonyms": "string (comma-separated)",
   "antonyms": "string (comma-separated)"
 }
 Please make sure all values are filled, especially [localDefinition] and [exampleTranslation] in Traditional Chinese, not Simplified chinese. Avoid leaving them empty.
 Ensure all keys are present.
 Return only a single JSON object.
 `

const response = await openai.chat.completions.create({
  model: 'gpt-3.5-turbo',
  messages: [
    { role:'system',content: 'you are a professional English teacher, please answer with clear format.'},
    { role: 'user', content: prompt }
  ],
  temperature: 0.5})
  const result = response.choices[0].message.content
  if (!result) {
    return new Response(JSON.stringify({ error: 'Empty GPT response' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' },
    })
  }
  console.log('GPT response:', result)
  const voc = parseIntoVoc(result)
  if (!voc) {
    return new Response(JSON.stringify({ error: 'Failed to parse vocabulary data' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }

  if (!voc.word || !voc.definition) {
    return new Response(JSON.stringify({ error: 'Invalid data format' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  

  return new Response(JSON.stringify(voc), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
}

