import { use } from "react";
import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
import MainFunctionBar from "@/components/MainFunctionBar";

const newsList: Article[] = [
  { 
    id:"1sdf",
    title: "Richard Chamberlain, Shogun star, dies aged 90.", 
    date: "2023-10-01",
    author: "John Doe",
    image: "https://picsum.photos/800/600"
  },
  { 
    id:"2sdf",
    title: "Richard Chamberlain, Shogun star, dies aged 90.", 
    date: "2023-10-01",
    author: "John Doe",
    image: "https://picsum.photos/800/600"
  },
  { 
    id:"3sdf",
    title: "Richard Chamberlain, Shogun star, dies aged 90.", 
    date: "2023-10-01",
    author: "John Doe",
    image: "https://picsum.photos/800/600"
  },
  { 
    id:"4sdf",
    title: "Richard Chamberlain, Shogun star, dies aged 90.", 
    date: "2023-10-01",
    author: "John Doe",
    image: "https://picsum.photos/800/600"
  },
  { 
    id:"5sdf",
    title: "Richard Chamberlain, Shogun star, dies aged 90.", 
    date: "2023-10-01",
    author: "John Doe",
    image: "https://picsum.photos/800/600"
  },
]

export default function ArticlePage() {
  const fetchNews = async () => {
    return newsList;
  }
  
  const result = use(fetchNews());
  
  return (
    <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
      <MainFunctionBar />
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <p className="text-3xl text-black p-10">Saved articles</p>
        {result.map((news) => (
          <ArticleCard key={news.id} item={news} />
        ))}
        
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      </div>
    </div>
  );
}