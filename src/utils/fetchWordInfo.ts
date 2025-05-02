export interface WordInfo {
    definition: string;
    partOfSpeech: string;
    example: string;
    exampleTranslation: string;
    relatedWords: string[];
  }
  
  // components/word-info/wordInfoService.ts - Server-side code
  export async function fetchWordInfo(word: string): Promise<WordInfo> {
    // 在實際應用中，這裡會調用詞典API或資料庫
    // 目前使用模擬數據
    await new Promise(resolve => setTimeout(resolve, 500)); // 模擬網絡延遲
    
    return {
      definition: `${word}的定義`,
      partOfSpeech: '名詞',
      example: `This is an example with ${word}.`,
      exampleTranslation: `這是一個包含「${word}」的例句`,
      relatedWords: ['語言', '單字', '詞彙'],
    };
  }