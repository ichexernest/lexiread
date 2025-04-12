import ArticleCard from "@/components/ArticleCard";
import { Article } from "@/types";
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

export default async function HomePage() {
  
  // const fetchNews = async () => {
  //   return newsList;
  // }
  //throw new Error("Error fetching news data"); // Simulate an error
  await new Promise((resolve) => setTimeout(resolve, 2000)); // Simulate a delay
  
  const result = newsList;
  
  return (
      <div className="flex flex-col items-center h-screen max-w-[720px]">
        <p className="text-3xl text-black p-10">Today&apos;s news</p>
        {result.map((news) => (
          <ArticleCard key={news.id} item={news} />
        ))}
        
        <div className="flex justify-center items-center w-full pt-10 pb-32">
          <p className="text-lg">That&apos;s all</p>
        </div>
      </div>
  );
}