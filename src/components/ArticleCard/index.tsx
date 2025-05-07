import { Article } from "@/types";
import Link from "next/link";
import SaveButton from "../SaveButton";

async function checkSaved(saveType: string, saveId: string): Promise<boolean> {
  console.log("checkSaved", saveId, saveType);
  await new Promise(res => setTimeout(res, 2000));
  return Math.random() > 0.5;
}

export default async function ArticleCard({ item }: { item: Article }) {
  const isSaved = await checkSaved("article", item.id);

  return (
    <div className="flex flex-col items-stretch justify-stretch pb-8 py-5 min-w-full px-4 border-b hover:bg-primary-hover">
      <Link href={`/Article/${item.id}`}>
        <img className="w-full rounded-xl" src={item.image} alt={item.title} />
        <div className="w-full text-start my-2">
          <p className="text-2xl font-bold">{item.title}</p>
        </div>
        <div className="flex justify-between items-center w-full">
          <div className="flex gap-2">
            <p>{item.author}</p>
            <p>{item.date}</p>
          </div>
        </div>
      </Link>
      <div className="flex justify-end">
        <SaveButton isSaved={isSaved} saveId={item.id} saveType="article" />
      </div>
    </div>
  );
}
