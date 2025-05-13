import { use } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
import Title from "@/components/Title"; 
import FinishLine from "@/components/FinishLine";
import fetchService from "@/utils/fetch";

export default async function ArticlePage() {
  const result: Article[] = await fetchService.getArticles()
  
  return (
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <Title className="p-10">Saved articles</Title>
        {result.map((news) => (
          <ArticleCard key={news.id} item={news} />
        ))}
        <FinishLine className="w-full pt-10 pb-32" />
      </div>
  );
}