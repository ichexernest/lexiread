import { fetchBbcArticleBySlug } from "@/utils/fetchBbcArticleBySlug"
import ArticleViewer from "@/components/ArticleViewer"
import { notFound } from "next/navigation"


export default async function ArticleContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
  const article = await fetchBbcArticleBySlug(id)

  if (!article) return notFound()

  return <ArticleViewer article={article} />
}

