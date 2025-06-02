import { Vocabulary, VocabularyDefinition } from '@/types/vocabulary'
import { OpenAI } from 'openai'
import { customAlphabet } from 'nanoid'
import { addVocabularyToPublic, searchPublicVocabulary } from '@/prisma-db'
const openai = new OpenAI({apiKey: process.env.OPENAI_API_KEY,})

function parseIntoVoc(jsonText: string): Vocabulary | null {
  try {
    const obj = JSON.parse(jsonText);
    const nanoid = customAlphabet('1234567890abcdef', 12);
    const id = `pvoc_${nanoid()}`;

    if (!obj.word || !Array.isArray(obj.definitions) || obj.definitions.length === 0) return null;

    const definitions = obj.definitions.map((def: VocabularyDefinition) => ({
      id: `def_${nanoid()}`,
      partOfSpeech: def.partOfSpeech ?? 'N/A',
      definition: def.definition ?? 'N/A',
      localDefinition: def.localDefinition ?? 'N/A',
      example: def.example ?? 'N/A',
      exampleTranslation: def.exampleTranslation ?? 'N/A',
      pronunciation: def.pronunciation ?? 'N/A',
      synonyms: def.synonyms ?? 'N/A',
      antonyms: def.antonyms ?? 'N/A',
    }));

    return {
      id,
      word: obj.word,
      definitions,
    };
  } catch (err) {
    console.error('Failed to parse vocabulary JSON:', err);
    return null;
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
   const prompt =`Please provide the vocabulary information for the word "${decodedWord}" in the following JSON format only, without any extra explanation or commentary.

Format:

{
  "word": "string",
  "definitions": [
    {
      "partOfSpeech": "string",
      "definition": "string",
      "localDefinition": "string (in Traditional Chinese)",
      "example": "string",
      "exampleTranslation": "string (in Traditional Chinese)",
      "pronunciation": "string",
      "synonyms": "string (comma-separated)",
      "antonyms": "string (comma-separated)"
    }
  ]
}

Requirements:
- Provide at least one definition object in the "definitions" array.
- If a word has multiple parts of speech (e.g., noun, verb, adjective), provide at least one definition object for each of them.
- Ensure all fields are filled, even optional ones (use "N/A" if nothing fits).
- Make sure that:
  - "localDefinition" and "exampleTranslation" are written only in Traditional Chinese, not Simplified Chinese.
  - The entire response is valid JSON. 
  - All values are strings, even if they're empty or not applicable.
- Return only the JSON, no markdown formatting, no commentary.
`;
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

  if (!voc.word || !voc.definitions) {
    return new Response(JSON.stringify({ error: 'Invalid data format' }), {
      status: 500,
      headers: { 'Content-Type': 'application/json' }
    })
  }
  await addVocabularyToPublic({
    word: voc.word,
    definitions: voc.definitions,
  });


  return new Response(JSON.stringify(voc), {
    status: 200,
    headers: { 'Content-Type': 'application/json' }
  })
 }

}

