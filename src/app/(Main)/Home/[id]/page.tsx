import { fetchBbcArticleBySlug } from "@/utils/fetchBbcArticleBySlug"
import ArticleViewer from "@/components/ArticleViewer"
import { notFound } from "next/navigation"
import MainFunctionBar from "@/components/MainFunctionBar"
import { FaBookmark } from "react-icons/fa6"

export default async function HomeArticle({ params }: { params: { id: string } }) {
  const article = await fetchBbcArticleBySlug(params.id)

  if (!article) return notFound()

  return  <div className="relative flex justify-center items-start w-screen h-screen overflow-y-auto">
        <MainFunctionBar />
        <div className="flex flex-col items-center h-screen max-w-[720px]">
          <div className="flex justify-start items-center w-full pt-10 px-5 md:px-0">
            <h1 className="text-3xl font-bold text-black">{article.title}</h1>
          </div>
          <div className="flex justify-between items-center w-full px-5 md:px-0">
            <div className="flex gap-2">
              <p>{article.author}</p>
              <p>{article.date}</p>
            </div>
            <button className="p-5 rounded-full hover:bg-white">
              <FaBookmark />
            </button>
          </div>
          <div className="w-full pt-5 px-5 md:px-0 prose prose-lg max-w-none">
            <img className="w-full rounded-xl my-5" src={article.image} alt={article.title} />
          </div>
          <ArticleViewer article={article} />
          <div className="flex justify-center items-center w-full pt-10 pb-32">
            <p className="text-lg">That&apos;s all</p>
          </div>
        </div>
      </div>
}
