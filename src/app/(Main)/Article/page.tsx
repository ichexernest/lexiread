import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
import Title from "@/components/Title"; 
import FinishLine from "@/components/FinishLine";
import fetchService from "@/utils/fetch";
import { currentUser } from '@clerk/nextjs/server';

export default async function ArticlePage() {
  const clerkUser = await currentUser();
  const result: Article[] = await fetchService.getUsersArticles(clerkUser!.id);
  
  return (
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <Title className="p-10">Saved articles</Title>
        { result.length === 0 ? (
        <p className="text-center text-gray-500">No article saved yet. Start adding some!</p>
      ) : (
        result.map((news) => (
          <ArticleCard key={news.publicArticleId} item={news} />
        ))
      )}
        <FinishLine className="w-full pt-10 pb-32" />
      </div>
  );
}