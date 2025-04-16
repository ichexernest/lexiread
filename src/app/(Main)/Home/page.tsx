import ArticleCard from "@/components/ArticleCard";
import { fetchBbcArticles } from "@/utils/fetchBbcArticles";
import Link from "next/link";
import { Article } from "@/types/article";


export default async function HomePage() {
  console.log("HomePage");
  const result: Article[] = await fetchBbcArticles()

  //throw new Error("Error fetching news data"); // Simulate an error
 // await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay

  
  return (
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <p className="text-3xl text-black p-10">Today&apos;s news</p>
        {result.map((news) => (
          <Link key={news.id} href={`/Home/${news.id}`}><ArticleCard  item={news} /></Link>
        ))}
        
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      </div>
  );
}