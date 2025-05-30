import { Vocabulary, UserVocabulary } from '@/types/vocabulary'
import { OpenAI } from 'openai'
import { customAlphabet } from 'nanoid'
import { addVocabularyToPublic, searchPublicVocabulary } from '@/prisma-db'
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

export async function GET(
  _req: Request,
  context: { params: Promise<{ word: string }> }
) {
  const { word } = await context.params
  const decodedWord = decodeURIComponent(word).toLowerCase()
  console.log('word', decodedWord)
 // const result = mockVocabularies.find(v => v.word.toLowerCase() === decodedWord)
 const existingVoc = await searchPublicVocabulary(decodedWord)
 if (existingVoc.length > 0) {
  //TODO: add UserVocabulary check
   return new Response(JSON.stringify(existingVoc[0]))
 }else{
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
  await addVocabularyToPublic(voc as UserVocabulary)


  return new Response(JSON.stringify(voc), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
 }

}

