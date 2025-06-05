import fetchService from "@/utils/fetch";
import ArticleViewer from "@/components/ArticleViewer"
import { notFound } from "next/navigation"
import { currentUser } from '@clerk/nextjs/server';

export default async function ArticleContentPage({ params }: { params: Promise<{ id: string }> }) {
  const { id } = await params
      const clerkUser = await currentUser();
  const userId = clerkUser?.id
  console.log(`ArticleContentPage`,userId, id)
  const article = await fetchService.getArticlesById(id, userId)
  const content = await fetchService.getContent(id)
  if (!article || !content) return notFound()

  return <ArticleViewer article={article} content={content} />
}

