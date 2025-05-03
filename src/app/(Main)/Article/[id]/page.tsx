import { fetchBbcArticleBySlug } from "@/utils/fetchBbcArticleBySlug"
import ArticleViewer from "@/components/ArticleViewer"
import { notFound } from "next/navigation"

async function checkSaved(saveType: string, saveId: string): Promise<boolean> {
  console.log("checkSaved", saveId, saveType);
  await new Promise(res => setTimeout(res, 2000));
  return Math.random() > 0.5;
}


export default async function ArticleContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await fetchBbcArticleBySlug(id)
  const isSaved = await checkSaved("article", id);

  if (!article) return notFound()

  return <ArticleViewer article={article} isSaved={isSaved} />
}

