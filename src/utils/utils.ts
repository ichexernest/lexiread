import { Vocabulary, VocabularyDefinition, validateVocabulary, GPTVocabularyResponse } from '@/types'
import { OpenAI } from 'openai'
import { customAlphabet } from 'nanoid'

const openai = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

const utils = {
  generateSlug: (title: string) => {
    return title.toLowerCase().replace(/[^a-z0-9]+/g, '-').slice(0, 40)
  },

  parseGPTResponseToVocabulary: (jsonText: string): Vocabulary | null => {
    try {
      const obj: GPTVocabularyResponse = JSON.parse(jsonText);
      const nanoid = customAlphabet('1234567890abcdef', 12);

      // 驗證必要欄位
      if (!obj.word || !Array.isArray(obj.definitions) || obj.definitions.length === 0) {
        console.error('Invalid GPT response structure:', obj);
        return null;
      }

      // 轉換定義格式，添加 id 並處理 undefined 值
      const definitions: VocabularyDefinition[] = obj.definitions.map((def) => ({
        id: `def_${nanoid()}`,
        partOfSpeech: def.partOfSpeech || 'N/A',
        definition: def.definition || 'N/A',
        localDefinition: def.localDefinition === 'N/A' ? undefined : def.localDefinition,
        example: def.example === 'N/A' ? undefined : def.example,
        exampleTranslation: def.exampleTranslation === 'N/A' ? undefined : def.exampleTranslation,
        pronunciation: def.pronunciation === 'N/A' ? undefined : def.pronunciation,
        synonyms: def.synonyms === 'N/A' ? undefined : def.synonyms,
        antonyms: def.antonyms === 'N/A' ? undefined : def.antonyms,
      }));

      const vocabulary: Vocabulary = {
        publicVocabularyId: `pvoc_${nanoid()}`,
        word: obj.word.toLowerCase(),
        definitions,
      };

      // 使用 Zod 驗證數據格式
      return validateVocabulary(vocabulary);
    } catch (err) {
      console.error('Failed to parse vocabulary JSON:', err);
      return null;
    }
  },

  fetchVocabularyFromGPT: async (word: string): Promise<Vocabulary | null> => {
    try {
      const prompt = `Please provide the vocabulary information for the word "${word}" in the following JSON format only, without any extra explanation or commentary.

Format:
{
  "word": "${word}",
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
- Return only the JSON, no markdown formatting, no commentary.`;

      const response = await openai.chat.completions.create({
        model: 'gpt-3.5-turbo',
        messages: [
          {
            role: 'system',
            content: 'You are a professional English teacher. Please respond with properly formatted JSON only.'
          },
          { role: 'user', content: prompt }
        ],
        temperature: 0.3, // 降低溫度以獲得更一致的回應
        max_tokens: 1000,
      });

      const result = response.choices[0].message.content;

      if (!result) {
        console.error('Empty GPT response');
        return null;
      }

      console.log('GPT response:', result);
      return utils.parseGPTResponseToVocabulary(result);
    } catch (error) {
      console.error('Error fetching from GPT:', error);
      return null;
    }
  }
}

export default utils;