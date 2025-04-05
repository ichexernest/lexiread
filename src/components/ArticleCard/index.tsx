import { FaBookmark } from "react-icons/fa";
import { Article } from "@/types";

export default function ArticleCard({item}: {item: Article}) {
  
  return (
          <div  className="flex flex-col items-center justify-center pb-8 py-5 w-full px-4 border-b">
            <img className="w-full rounded-xl" src={item.image} alt={item.title} />
            <div className="w-full text-start my-2">
              <p className="text-2xl font-bold">{item.title}</p>
            </div>
            <div className="flex justify-between items-center w-full">
              <div className="flex gap-2">
                <p>{item.author}</p>
                <p>{item.date}</p>
              </div>
              <button className="p-5 rounded-full hover:bg-white"><FaBookmark /></button>
            </div>
          </div>
  );
}