'use client'
import MainFunctionBar from "@/components/MainFunctionBar"
import FinishLine from "@/components/FinishLine"
import VocCard from "@/components/VocCard"
import { useState,useMemo } from "react"
import { Article, Content } from "@/types"
import SaveButton from "@/components/SaveButton"
import utils from "@/utils/utils"
import ArticleContent from "../ArticleContent"

interface ArticleViewerProps {
  article: Article, 
  content: Content,
}


export default function ArticleViewer({ article, content }: ArticleViewerProps) {
  const [selectedWord, setSelectedWord] = useState<string | null>(null);


  const handleWordClick = useMemo(
  () =>
    utils.debounce<(word: string | null) => void>((word) => {
      const cleanedWord = utils.cleanWord(word!)
      setSelectedWord(cleanedWord);
    }, 1000),
  []
);

  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      <div className="relative flex flex-col items-center h-screen max-w-[720px]">
        <div className="flex justify-start items-center w-full pt-10 px-5 md:px-0">
          <h1 className="text-3xl font-bold text-black">{article.title}</h1>
        </div>
        <div className="flex justify-between items-center w-full px-5 md:px-0">
          <div className="flex gap-2">
            <p>{article.author}</p>
            <p>{utils.formatDateToLocalString(article.date)}</p>
          </div>
          <SaveButton isSaved={article.userArticleId != null} saveId={article.publicArticleId} saveType="article" />
        </div>
        <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
          <img className="w-full rounded-xl my-5" src={article.image} alt={article.title} />
        </div>
        <ArticleContent content={content} onWordClick={handleWordClick} />
        <FinishLine className="w-full pt-10 pb-32" />
      </div>
      
      {/* Render WordInfoSuspense at the page level */}
      {selectedWord && (
        <VocCard word={selectedWord} onClose={() => setSelectedWord(null)} />
      )}
    </div>
  )
}