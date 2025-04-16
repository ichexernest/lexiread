
interface WordInfoPanelProps {
  word: string;
}

export default async function VocCard({ word }: WordInfoPanelProps) {
  const fetchWordInfo = async (word: string) => {
    return {
      definition: `${word}的定義`,
      partOfSpeech: '名詞',
      example: `This is an example with ${word}.`,
      exampleTranslation: `這是一個包含「${word}」的例句`,
      relatedWords: ['語言', '單字', '詞彙'],
    }
  }

  const data = await fetchWordInfo(word);

  
  return (
    <div className="text-lg">
      <p className="font-bold text-xl mb-2">{word}</p>
      <p>詞性：{data.partOfSpeech}</p>
      <p>定義：{data.definition}</p>
      <p>例句：{data.example}</p>
      <p>翻譯：{data.exampleTranslation}</p>
      <p>相關詞彙：{data.relatedWords.join(', ')}</p>
    </div>
  );
}
