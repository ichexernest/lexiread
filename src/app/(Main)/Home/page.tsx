import ArticleCard from "@/components/ArticleCard";
import fetchService from "@/utils/fetch";
import { Article } from "@/types/article";
import Title from "@/components/Title"; 
import FinishLine from "@/components/FinishLine";


export default async function HomePage() {
  const result: Article[] = await fetchService.getTodayArticles()

  console.log(result)

  //throw new Error("Error fetching news data"); // Simulate an error
 // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

  
  return (
      <div className="flex flex-col items-center h-screen min-h-screen w-full max-w-[720px] mx-auto">
        <Title className="p-10">Today&apos;s news</Title>
        {result.map((news) => (
          <ArticleCard key={news.publicArticleId} item={news} />
        ))}
        <FinishLine className="w-full pt-10 pb-32" />
      </div>
  );
}