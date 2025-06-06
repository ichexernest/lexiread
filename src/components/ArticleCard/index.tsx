import { Article } from "@/types";
import Link from "next/link";
import SaveButton from "../SaveButton";
import utils from "@/utils/utils";

interface ArticleCardProps {
  item: Article;
}


export default async function ArticleCard({ item }: ArticleCardProps) {


  return (
    <div className="flex flex-col items-stretch justify-stretch pb-8 py-5 min-w-full px-4 border-b hover:bg-primary-hover">
      <Link href={`/Article/${item.publicArticleId}`}>
        <img className="w-full rounded-xl" src={item.image} alt={item.title} />
        <div className="w-full text-start my-2">
          <p className="text-2xl font-bold">{item.title}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <p>{item.author}</p>
            <p>{utils.formatDateToLocalString(item.date)}</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-end">
        <SaveButton isSaved={item.userArticleId != null} saveId={item.publicArticleId} saveType="article" />
      </div>
    </div>
  );
}
